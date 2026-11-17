/**
 * Biologi 2 – Växtfysiologi och cellbiologi (HT 2026).
 * The course id is the progress key: never change it once the platform has been shared.
 * Exams are listed newest first. Prov 2 parts are added by /ny-del (content/biologi2/prov2/).
 */
import type { Course } from "../../src/types.ts";
import { prov1 } from "./prov1/hub.ts";
import { prov1Parts } from "./prov1/index.ts";
import { prov2 } from "./prov2/hub.ts";
import { prov2Parts } from "./prov2/index.ts";
import { glossary } from "./prov1/glossary.ts";
import { prov2Glossary } from "./prov2/glossary.ts";

/** Optional; not shown when empty. */
const TEACHER = "";

export const course: Course = {
  id: "bio2-vaxtfys-cellbio-ht26",
  subject: "Biologi",
  title: "Biologi 2",
  area: "Växtfysiologi och cellbiologi",
  teacher: TEACHER || undefined,
  // The permanent address. Progress is stored per address: never change it.
  url: "https://linuswahlgren.github.io/plugga-biologi2/",
  accent: "green",
  currentExam: "prov2",
  exams: [prov2, prov1],
  weeks: [...prov1Parts, ...prov2Parts],
  glossary: [...glossary, ...prov2Glossary],
};
