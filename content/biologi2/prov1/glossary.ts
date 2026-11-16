/**
 * Prov 1 glossary: every term from the course document's concept list, grouped by its theme,
 * plus a few terms the lessons need that are not on the list (extra: true).
 * Phase 1 holds the terms taught by Del 1's first two lessons; the rest arrive in Phase 3.
 */
import type { Term } from "../../../src/types.ts";

export const glossary: Term[] = [
  { id: "t-vakuol", term: "Vakuol", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Stor vattenfylld blåsa i växtcellen. När den fylls trycker den mot cellväggen." },
  { id: "t-cellvagg", term: "Cellvägg", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Vägg utanför cellmembranet av cellulosa och hemicellulosa som ger växtcellen stadga." },
  { id: "t-cellulosa", term: "Cellulosa", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Ämnet som alla växtcellers cellväggar är byggda av." },
  { id: "t-lignin", term: "Lignin", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Ämne som kan lagras in i cellväggen och gör den hård och vedartad." },
  { id: "t-plasmodesmer", term: "Plasmodesmer", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Små kanaler genom cellväggen som förbinder grannceller med varandra." },
  { id: "t-plastider", term: "Plastider", theme: "Växtceller", week: "d1", lesson: "d1-l1", supplement: true, definition: "Organeller med dubbelt membran i växtceller, till exempel kloroplaster, leukoplaster, amyloplaster och kromoplaster." },
  { id: "t-semipermeabel", term: "Semipermeabel", theme: "Växtceller", week: "d1", lesson: "d1-l2", extra: true, definition: "Halvgenomsläpplig. Släpper igenom vissa ämnen lättare än andra." },
  { id: "t-fosfolipid", term: "Fosfolipid", theme: "Växtceller", week: "d1", lesson: "d1-l2", extra: true, definition: "Fettmolekyl med ett hydrofilt huvud och två hydrofoba svansar. Byggsten i cellmembranet." },
];
