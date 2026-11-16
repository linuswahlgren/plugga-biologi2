/**
 * Prov 1 (already written, shown as "Repetera"). Reading list and lectures are verbatim from
 * "Begrepp, läsanvisningar och frågor inför prov 2026". Study questions arrive in Phase 3.
 */
import type { Exam } from "../../../src/types.ts";

export const PROV1_THEMES = [
  "Växtceller",
  "Växtens vävnader, organ och organsystem",
  "Fotosyntes",
  "Växternas livscykel",
  "Svampar",
  "Hållbar utveckling",
] as const;

export const prov1: Exam = {
  id: "prov1",
  title: "Prov 1",
  topic: "Växtfysiologi och hållbar utveckling",
  status: "done",
  readingList: ["s. 47–51", "s. 150–154", "s. 155–156", "s. 159–163", "s. 165–167", "s. 171–177", "s. 178–180", "s. 183–190", "Kapitel 11, s. 215–245"],
  lectures: [
    "Intro av kurs, transport över membran",
    "Växtfysiologi del 1",
    "Växtfysiologi del 2",
    "Växtfysiologi del 3",
    "Växtfysiologi och hållbar utveckling",
  ],
  themes: [...PROV1_THEMES],
  corrections: [
    {
      where: "Fotosystem I och II (Växtfysiologi del 2, bild 9 och 15)",
      material: "Fotosystem I innehåller klorofyll b. Fotosystem II anges till 677 nm.",
      corrected: "Båda reaktionscentrumen innehåller klorofyll a (P680 och P700). Klorofyll b och karotenoider sitter i antennerna. Fotosystem II tar bäst upp ljus vid 680 nm.",
    },
    {
      where: "C4-växter (Växtfysiologi del 2, bild 19)",
      material: "Processen kräver ”PEP-karboxylsyra”.",
      corrected: "Enzymet heter PEP-karboxylas.",
    },
    {
      where: "Självpollinering (Växtfysiologi del 3, bild 14)",
      material: "Otydlig formulering om att hanliga och honliga delar utvecklas vid skilda tidpunkter.",
      corrected: "Att hanliga och honliga delar mognar vid olika tidpunkter **motverkar** självpollinering.",
    },
    {
      where: "Albedo (Växtfysiologi och hållbar utveckling, bild 14)",
      material: "Isarna reflekterar värmestrålning.",
      corrected: "Albedo är hur stor del av det inkommande solljuset som reflekteras. Is och snö reflekterar en stor del av solljuset.",
    },
    {
      where: "Växthuseffekten (Växtfysiologi och hållbar utveckling, bild 11)",
      material: "Värmestrålningen ”reflekteras” tillbaka till rymden.",
      corrected: "Jorden **sänder ut** värmestrålning. Växthusgaserna tar upp en del av den och strålar ut den igen, så att en del av värmen stannar kvar.",
    },
  ],
};
