/**
 * Course schema (BUILD.md §6.1). Extends the earlier Study Kit schema and stays
 * backward compatible with it: units are still called `weeks` in data and "Del" in the UI.
 * The code never names a subject; everything subject-specific lives in content/.
 */

export type Accent = "green" | "blue" | "teal" | "plum" | "slate";
export type Level = "E" | "C" | "A";

export interface Course {
  /** Progress key. Never change it once the platform has been shared. */
  id: string;
  subject: string;
  /** First breadcrumb, e.g. "Biologi 2". */
  title: string;
  area: string;
  teacher?: string;
  /** The published address, used for sharing links from the backup file. Never change it once shared. Additive field. */
  url?: string;
  accent: Accent;
  currentExam: string;
  /** Newest first. */
  exams: Exam[];
  /** All parts, each tied to an exam. */
  weeks: Week[];
  glossary?: Term[];
}

export interface Correction {
  where: string;
  material: string;
  corrected: string;
}

export interface Exam {
  id: string;
  title: string;
  topic?: string;
  /** ISO date, "2026-12-07". */
  date?: string;
  /** done → its parts are shown as "Repetera". */
  status: "done" | "upcoming";
  /** Book pages, verbatim from the course document. */
  readingList?: string[];
  /** Lesson presentations listed in the course document ("Genomgångar"). Additive field. */
  lectures?: string[];
  /** The concept-list themes in their original order. Additive field. */
  themes?: string[];
  studyQuestions?: StudyQuestion[];
  corrections?: Correction[];
}

export interface Week {
  id: string;
  exam: string;
  title: string;
  dates?: string;
  summary?: string;
  goals?: string[];
  lessons: Lesson[];
  cards: Card[];
  quiz: QuizItem[];
  practice: PracticeItem[];
  keyPoints: string[];
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  body: string;
  /** Snabbkoll: one inline question that doesn't count toward the quiz score. */
  check?: QuizItem;
  source?: string;
  supplement?: boolean;
}

export interface CardObject {
  id: string;
  front: string;
  back: string;
  lesson?: string;
  supplement?: boolean;
}

/** The legacy tuple form is still accepted. */
export type Card = [string, string] | CardObject;

export interface QuizItem {
  id: string;
  q: string;
  options: string[];
  answer: string;
  explain: string;
  level?: Level;
  lesson?: string;
  source?: string;
  supplement?: boolean;
}

export interface PracticeBase {
  id: string;
  q: string;
  hint?: string;
  level?: Level;
  lesson?: string;
  supplement?: boolean;
}

export type PracticeItem =
  | (PracticeBase & { kind: "text"; answer: string | string[]; solution?: string })
  | (PracticeBase & { kind: "number"; answer: number; tolerance?: number; unit?: string; solution?: string })
  | (PracticeBase & { kind: "self"; solution: string })
  | (PracticeBase & { kind: "order"; steps: string[]; explain?: string })
  | (PracticeBase & {
      kind: "label";
      diagram: string;
      markers: { n: number; answer: string }[];
      distractors?: string[];
      explain?: string;
    });

/** Legacy practice items without `kind`; inferred when the course is loaded. */
export interface LegacyPracticeItem {
  id?: string;
  q: string;
  answer?: string | string[] | number;
  hint?: string;
  solution?: string;
  level?: Level;
  lesson?: string;
}

export interface StudyQuestion {
  id: string;
  n: number;
  q: string;
  modelAnswer: string;
  /** Lesson or part ids where the answer is taught. */
  refs: string[];
  level?: Level;
}

export interface Term {
  id: string;
  term: string;
  definition: string;
  /** One of the themes in that exam's concept list. */
  theme: string;
  week: string;
  lesson?: string;
  card?: string;
  supplement?: boolean;
  /** Needed by the lessons but not on the official concept list. Additive field. */
  extra?: boolean;
}
