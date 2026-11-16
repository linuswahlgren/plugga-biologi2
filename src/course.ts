/**
 * Loads a Course into an indexed, normalized model.
 * - Legacy cards ([front, back]) get a hash-based id.
 * - Legacy practice items without `kind` are inferred: number answer -> number,
 *   text or list answer -> text, no answer -> self.
 */
import type { Course, Exam, Lesson, PracticeItem, QuizItem, Term, Week, CardObject, LegacyPracticeItem, StudyQuestion } from "./types.ts";

export interface NCard extends CardObject {
  partId: string;
  /** True when the id was generated because the content had none. */
  generatedId?: boolean;
}

export type NPractice = PracticeItem & { partId: string; generatedId?: boolean };
export type NQuiz = QuizItem & { partId: string };

export interface NPart extends Omit<Week, "cards" | "practice" | "quiz"> {
  /** Display number, "Del N" (1-based position in the course). */
  n: number;
  examRef: Exam | undefined;
  cards: NCard[];
  quiz: NQuiz[];
  practice: NPractice[];
}

export interface NCourse {
  raw: Course;
  id: string;
  title: string;
  area: string;
  subject: string;
  teacher?: string;
  accent: Course["accent"];
  exams: Exam[];
  currentExam: Exam | undefined;
  parts: NPart[];
  glossary: Term[];
  partById: Map<string, NPart>;
  examById: Map<string, Exam>;
  lessonById: Map<string, { lesson: Lesson; part: NPart }>;
  quizById: Map<string, NQuiz>;
  cardById: Map<string, NCard>;
  practiceById: Map<string, NPractice>;
  studyById: Map<string, { q: StudyQuestion; exam: Exam }>;
  partsOf(examId: string): NPart[];
  termsOf(partId: string): Term[];
}

/** FNV-1a, base36. Stable across runs. */
export function hashId(prefix: string, text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${prefix}-${h.toString(36)}`;
}

function normalizeCard(card: Week["cards"][number], partId: string): NCard {
  if (Array.isArray(card)) {
    const [front, back] = card;
    return { id: hashId(`${partId}-k`, `${front}\u0000${back}`), front, back, partId, generatedId: true };
  }
  if (!card.id) return { ...card, id: hashId(`${partId}-k`, `${card.front}\u0000${card.back}`), partId, generatedId: true };
  return { ...card, partId };
}

function normalizePractice(item: PracticeItem | LegacyPracticeItem, partId: string): NPractice {
  const anyItem = item as PracticeItem & LegacyPracticeItem;
  const generatedId = !anyItem.id;
  const id = anyItem.id || hashId(`${partId}-p`, anyItem.q);
  if ("kind" in anyItem && anyItem.kind) return { ...(anyItem as PracticeItem), id, partId, generatedId };
  const legacy = anyItem as LegacyPracticeItem;
  const base = { id, q: legacy.q, hint: legacy.hint, level: legacy.level, lesson: legacy.lesson, partId, generatedId };
  if (typeof legacy.answer === "number") return { ...base, kind: "number", answer: legacy.answer, solution: legacy.solution };
  if (typeof legacy.answer === "string" || Array.isArray(legacy.answer)) return { ...base, kind: "text", answer: legacy.answer, solution: legacy.solution };
  return { ...base, kind: "self", solution: legacy.solution ?? "" };
}

export function loadCourse(course: Course): NCourse {
  const examById = new Map(course.exams.map((e) => [e.id, e]));
  const parts: NPart[] = course.weeks.map((w, i) => ({
    ...w,
    n: i + 1,
    examRef: examById.get(w.exam),
    cards: (w.cards ?? []).map((c) => normalizeCard(c, w.id)),
    quiz: (w.quiz ?? []).map((q) => ({ ...q, partId: w.id })),
    practice: (w.practice ?? []).map((p) => normalizePractice(p, w.id)),
    lessons: w.lessons ?? [],
    keyPoints: w.keyPoints ?? [],
  }));

  const partById = new Map(parts.map((p) => [p.id, p]));
  const lessonById = new Map<string, { lesson: Lesson; part: NPart }>();
  const quizById = new Map<string, NQuiz>();
  const cardById = new Map<string, NCard>();
  const practiceById = new Map<string, NPractice>();
  for (const p of parts) {
    for (const l of p.lessons) lessonById.set(l.id, { lesson: l, part: p });
    for (const q of p.quiz) quizById.set(q.id, q);
    for (const c of p.cards) cardById.set(c.id, c);
    for (const x of p.practice) practiceById.set(x.id, x);
  }
  const studyById = new Map<string, { q: StudyQuestion; exam: Exam }>();
  for (const e of course.exams) for (const q of e.studyQuestions ?? []) studyById.set(q.id, { q, exam: e });

  const glossary = course.glossary ?? [];
  const byExam = new Map<string, NPart[]>();
  for (const p of parts) {
    const list = byExam.get(p.exam) ?? [];
    list.push(p);
    byExam.set(p.exam, list);
  }
  const termsByPart = new Map<string, Term[]>();
  for (const t of glossary) {
    const list = termsByPart.get(t.week) ?? [];
    list.push(t);
    termsByPart.set(t.week, list);
  }

  return {
    raw: course,
    id: course.id,
    title: course.title,
    area: course.area,
    subject: course.subject,
    teacher: course.teacher || undefined,
    accent: course.accent,
    exams: course.exams,
    currentExam: examById.get(course.currentExam),
    parts,
    glossary,
    partById,
    examById,
    lessonById,
    quizById,
    cardById,
    practiceById,
    studyById,
    partsOf: (examId) => byExam.get(examId) ?? [],
    termsOf: (partId) => termsByPart.get(partId) ?? [],
  };
}

/** The exams whose parts are shown as "Repetera", newest first. */
export function doneExams(c: NCourse): Exam[] {
  return c.exams.filter((e) => e.status === "done");
}

/** The upcoming exam the class is working towards (currentExam if upcoming). */
export function upcomingExam(c: NCourse): Exam | undefined {
  if (c.currentExam?.status === "upcoming") return c.currentExam;
  return c.exams.find((e) => e.status === "upcoming");
}
