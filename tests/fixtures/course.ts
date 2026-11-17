/**
 * Test course for the e2e build (vite --mode e2e -> dist/e2e, served on :4174). Never shipped.
 * It keeps the real course's settings, exams and Del 1 lessons, and replaces the parts' items with a
 * fixed set so the learning features can be tested while the real items are still being written
 * (Phase 3). It also adds a Prov 2 part, to test that it moves into "Aktuellt".
 * Facts in the items restate Del 1's two written lessons; the extra parts are test-only.
 */
import type { Course, Exam, PracticeItem, QuizItem, Term, Week } from "../../src/types.ts";
import { course as real } from "../../content/biologi2/course.ts";
import { d1 } from "../../content/biologi2/prov1/d1.ts";

const quiz1: QuizItem[] = [
  { id: "d1-xq01", level: "E", lesson: "d1-l1", q: "Var sker fotosyntesen i växtcellen?", options: ["I mitokondrierna", "I kloroplasterna", "I cellkärnan", "I vakuolen"], answer: "I kloroplasterna", explain: "Fotosyntesen sker i kloroplasterna. Mitokondrierna finns i både växtceller och djurceller." },
  { id: "d1-xq02", level: "E", lesson: "d1-l1", q: "Vad är cellväggen byggd av?", options: ["Fosfolipider och proteiner", "Lignin och kitin", "Cellulosa och hemicellulosa", "Stärkelse och socker"], answer: "Cellulosa och hemicellulosa", explain: "Cellväggen är byggd av cellulosa och hemicellulosa. Fosfolipider och proteiner bygger upp cellmembranet." },
  { id: "d1-xq03", level: "E", lesson: "d1-l1", q: "Vad gör plasmodesmerna?", options: ["Förbinder grannceller genom cellväggen", "Lagrar vatten i cellen", "Tillverkar socker", "Gör cellväggen hård"], answer: "Förbinder grannceller genom cellväggen", explain: "Plasmodesmer är små kanaler genom cellväggen som förbinder grannceller med varandra." },
  { id: "d1-xq04", level: "E", lesson: "d1-l1", q: "Vilket ämne gör cellväggen hård och vedartad?", options: ["Cellulosa", "Hemicellulosa", "Fosfolipid", "Lignin"], answer: "Lignin", explain: "Lignin kan lagras in i cellväggen och gör den hård. Cellulosa och hemicellulosa finns i alla cellväggar." },
  { id: "d1-xq05", level: "E", lesson: "d1-l2", q: "Vad betyder det att cellmembranet är semipermeabelt?", options: ["Att det släpper igenom allt", "Att vissa ämnen går igenom lättare än andra", "Att det inte släpper igenom något", "Att det bara släpper igenom vatten"], answer: "Att vissa ämnen går igenom lättare än andra", explain: "Semipermeabel betyder halvgenomsläpplig. Membranet släpper igenom vissa ämnen lättare än andra." },
  { id: "d1-xq06", level: "E", lesson: "d1-l2", q: "Vilken del av fosfolipiden är hydrofil?", options: ["Fettsyrasvansarna", "Hela molekylen", "Fosfatgrupphuvudet", "Ingen del"], answer: "Fosfatgrupphuvudet", explain: "Huvudet är hydrofilt, alltså vattenvänligt. Svansarna är hydrofoba." },
  { id: "d1-xq07", level: "C", lesson: "d1-l1", q: "Varför spricker inte en växtcell när vakuolen fylls med vatten?", options: ["Vakuolen släpper ut vattnet direkt", "Cellmembranet är för tjockt", "Cytoplasman tar upp vattnet", "Cellväggen håller emot trycket"], answer: "Cellväggen håller emot trycket", explain: "Vakuolen trycker mot cellväggen, som ger stadga och håller emot." },
  { id: "d1-xq08", level: "C", lesson: "d1-l2", q: "Hur ordnar sig fosfolipiderna i cellmembranet?", options: ["I ett dubbelt lager med huvudena utåt", "I ett enkelt lager med svansarna utåt", "I ett dubbelt lager med svansarna utåt", "Utan någon ordning"], answer: "I ett dubbelt lager med huvudena utåt", explain: "Huvudena vänder sig mot vattnet på båda sidor. Svansarna hamnar inuti, mellan lagren." },
  { id: "d1-xq09", level: "C", lesson: "d1-l2", q: "Varför hamnar fettsyrasvansarna inuti membranet?", options: ["De är hydrofila och söker vatten", "De är hydrofoba och undviker vatten", "De är tyngre än huvudena", "De binder till cellväggen"], answer: "De är hydrofoba och undviker vatten", explain: "Svansarna är hydrofoba, vattenskygga. Inuti membranet får de ingen kontakt med vatten." },
  { id: "d1-xq10", level: "C", lesson: "d1-l1", q: "Vilka delar har växtcellen men **inte** djurcellen?", options: ["Cellkärna och mitokondrier", "Cellmembran och cytoplasma", "Kloroplaster och cellvägg", "Mitokondrier och cellmembran"], answer: "Kloroplaster och cellvägg", explain: "Kloroplaster och cellvägg finns bara i växtceller. Cellkärna, mitokondrier, cellmembran och cytoplasma finns i båda." },
  { id: "d1-xq11", level: "A", lesson: "d1-l2", q: "Ett ämne passerar lätt genom ett cellmembran medan ett annat stoppas. Vilken egenskap hos membranet förklarar det?", options: ["Att det är semipermeabelt", "Att det har en cellvägg", "Att det innehåller kloroplaster", "Att det är byggt av cellulosa"], answer: "Att det är semipermeabelt", explain: "Ett semipermeabelt membran släpper igenom vissa ämnen lättare än andra." },
  { id: "d1-xq12", level: "A", lesson: "d1-l1", q: "Vad skulle hända med en växtcell om cellväggen saknades?", options: ["Den skulle få mer stadga", "Ingenting skulle hända", "Den skulle fotosyntetisera mer", "Den skulle tappa mycket av sin stadga"], answer: "Den skulle tappa mycket av sin stadga", explain: "Cellväggen ger växtcellen stadga. Utan den finns inget som håller emot när vakuolen trycker utåt." },
];

const cards1: Week["cards"] = ([
  ["Cellmembran", "Tunn hinna runt cellen som styr vad som kommer in och ut.", "d1-l1"],
  ["Cytoplasma", "Det som finns innanför cellmembranet, där organellerna ligger.", "d1-l1"],
  ["Kloroplast", "Organell där fotosyntesen sker. Finns bara i växtceller.", "d1-l1"],
  ["Cellvägg", "Vägg utanför cellmembranet av cellulosa och hemicellulosa. Ger stadga.", "d1-l1"],
  ["Lignin", "Ämne som lagras in i cellväggen och gör den hård och vedartad.", "d1-l1"],
  ["Plasmodesmer", "Små kanaler genom cellväggen som förbinder grannceller.", "d1-l1"],
  ["Vakuol", "Stor vattenfylld blåsa som tar upp en stor del av växtcellen.", "d1-l1"],
  ["Semipermeabel", "Halvgenomsläpplig. Vissa ämnen går igenom lättare än andra.", "d1-l2"],
  ["Fosfolipid", "Fettmolekyl med ett hydrofilt huvud och två hydrofoba svansar.", "d1-l2"],
  ["Hydrofil", "Vattenvänlig. Fosfolipidens huvud är hydrofilt.", "d1-l2"],
  ["Hydrofob", "Vattenskygg. Fosfolipidens svansar är hydrofoba.", "d1-l2"],
  ["Dubbelmembran", "Två lager fosfolipider med huvudena utåt och svansarna inåt.", "d1-l2"],
] as [string, string, string][]).map(([front, back, lesson], i) => ({ id: `d1-xk${String(i + 1).padStart(2, "0")}`, front, back, lesson }));

const practice1: PracticeItem[] = [
  { id: "d1-xp1", kind: "text", level: "E", lesson: "d1-l1", q: "Vad heter ämnet som alla cellväggar är byggda av? Skriv ett ord.", answer: ["cellulosa"], hint: "Ordet börjar på c.", solution: "Cellväggen är byggd av **cellulosa** och hemicellulosa." },
  { id: "d1-xp2", kind: "number", level: "E", lesson: "d1-l2", q: "Hur många fettsyrasvansar har en fosfolipid?", answer: 2, solution: "En fosfolipid har ett fosfatgrupphuvud och två fettsyrasvansar." },
  { id: "d1-xp3", kind: "self", level: "C", lesson: "d1-l2", q: "Förklara varför fosfolipiderna bildar ett dubbelt lager i vatten.", solution: "Huvudena är **hydrofila** och vänder sig mot vattnet på båda sidor. Svansarna är **hydrofoba** och gömmer sig inuti, mellan lagren. Så får svansarna ingen kontakt med vatten." },
  { id: "d1-xp4", kind: "order", level: "C", lesson: "d1-l1", q: "Sätt delarna i ordning, från växtcellens utsida och inåt.", steps: ["Cellvägg", "Cellmembran", "Cytoplasma", "Vakuol"], explain: "Cellväggen ligger utanför cellmembranet. Innanför membranet finns cytoplasman, och i den ligger vakuolen." },
  {
    id: "d1-xp5", kind: "label", level: "E", lesson: "d1-l1", diagram: "cell", q: "Namnge delarna i växtcellen.",
    markers: [
      { n: 1, answer: "Cellvägg" }, { n: 2, answer: "Cellmembran" }, { n: 3, answer: "Kloroplast" }, { n: 4, answer: "Vakuol" },
      { n: 5, answer: "Cellkärna" }, { n: 6, answer: "Mitokondrie" }, { n: 7, answer: "Cytoplasma" }, { n: 8, answer: "Plasmodesm" },
    ],
    distractors: ["Fosfolipid"],
  },
];

const fixtureD1: Week = { ...d1, cards: cards1, quiz: quiz1, practice: practice1 };

const fixtureD2: Week = {
  id: "d2",
  exam: "prov1",
  title: "Bladet, kloroplasten och blomman",
  summary: "En testdel som bara finns i testkursen. Den prövar bilderna i övningarna.",
  lessons: [{ id: "d2-l1", title: "Tre bilder att namnge", minutes: 4, source: "Testkursen", body: "Den här delen finns bara i testkursen. Den används för att pröva bilderna i övningarna." }],
  cards: [
    { id: "d2-xk01", front: "Granum", back: "En stapel av tylakoider i kloroplasten.", lesson: "d2-l1" },
    { id: "d2-xk02", front: "Klyvöppning", back: "Öppning i bladets undre överhud, omgiven av två läppceller.", lesson: "d2-l1" },
    { id: "d2-xk03", front: "Märke", back: "Pistillens topp, där pollenkornen fastnar.", lesson: "d2-l1" },
  ],
  quiz: [
    { id: "d2-xq01", level: "E", lesson: "d2-l1", q: "Vad omger en klyvöppning?", options: ["Två läppceller", "Två kloroplaster", "Ett granum", "En vakuol"], answer: "Två läppceller", explain: "Klyvöppningen omges av två läppceller." },
    { id: "d2-xq02", level: "E", lesson: "d2-l1", q: "Vad kallas en stapel av tylakoider?", options: ["Stroma", "Granum", "Lumen", "Kutikula"], answer: "Granum", explain: "En stapel av tylakoider kallas granum." },
    { id: "d2-xq03", level: "E", lesson: "d2-l1", q: "Vilken del av blomman tar emot pollen?", options: ["Knappen", "Strängen", "Märket", "Fröämnet"], answer: "Märket", explain: "Pollenkornen fastnar på märket." },
    { id: "d2-xq04", level: "C", lesson: "d2-l1", q: "Var bildas pollen?", options: ["I fröämnet", "I märket", "I stiftet", "I knappen"], answer: "I knappen", explain: "Pollen bildas i ståndarnas knappar." },
  ],
  practice: [
    {
      id: "d2-xp1", kind: "label", lesson: "d2-l1", diagram: "leaf", q: "Namnge delarna i bladets tvärsnitt.",
      markers: [
        { n: 1, answer: "Kutikula" }, { n: 2, answer: "Övre överhud" }, { n: 3, answer: "Palissadvävnad" }, { n: 4, answer: "Svampvävnad" }, { n: 5, answer: "Xylem" },
        { n: 6, answer: "Floem" }, { n: 7, answer: "Undre överhud" }, { n: 8, answer: "Klyvöppning" }, { n: 9, answer: "Läppcell" },
      ],
    },
    {
      id: "d2-xp2", kind: "label", lesson: "d2-l1", diagram: "chloroplast", q: "Namnge delarna i kloroplasten.",
      markers: [{ n: 1, answer: "Yttre membran" }, { n: 2, answer: "Inre membran" }, { n: 3, answer: "Granum" }, { n: 4, answer: "Tylakoid" }, { n: 5, answer: "Lumen" }, { n: 6, answer: "Stroma" }],
    },
    {
      id: "d2-xp3", kind: "label", lesson: "d2-l1", diagram: "flower", q: "Namnge delarna i blomman.",
      markers: [
        { n: 1, answer: "Kronblad" }, { n: 2, answer: "Foderblad" }, { n: 3, answer: "Knapp" }, { n: 4, answer: "Sträng" },
        { n: 5, answer: "Märke" }, { n: 6, answer: "Stift" }, { n: 7, answer: "Fruktämne" }, { n: 8, answer: "Fröämne" },
      ],
    },
  ],
  keyPoints: ["Den här delen finns bara i testkursen."],
};

const fixtureD7: Week = {
  id: "d7",
  exam: "prov2",
  title: "Cellens byggnad",
  summary: "En testdel för prov 2. Den finns bara i testkursen.",
  lessons: [{ id: "d7-l1", title: "Testlektion för prov 2", minutes: 5, source: "Testkursen", body: "Den här lektionen finns bara i testkursen." }],
  cards: [
    { id: "d7-xk01", front: "Cellkärna", back: "Organell som innehåller cellens arvsmassa.", lesson: "d7-l1" },
    { id: "d7-xk02", front: "Cellmembran", back: "Hinnan som omger alla celler.", lesson: "d7-l1" },
  ],
  quiz: [
    { id: "d7-xq01", level: "E", lesson: "d7-l1", q: "Vilken organell innehåller cellens arvsmassa?", options: ["Cellkärnan", "Vakuolen", "Kloroplasten", "Cellväggen"], answer: "Cellkärnan", explain: "Arvsmassan finns i cellkärnan." },
    { id: "d7-xq02", level: "E", lesson: "d7-l1", q: "Vad omger alla celler?", options: ["En cellvägg", "Ett cellmembran", "En kloroplast", "En vakuol"], answer: "Ett cellmembran", explain: "Alla celler omges av ett cellmembran. Bara vissa har cellvägg." },
  ],
  // One label item per Prov 2 diagram, so "uses every diagram" covers them.
  practice: [
    {
      id: "d7-xp1", kind: "label", level: "E", lesson: "d7-l1", diagram: "mitochondrion", q: "Namnge delarna i mitokondrien.",
      markers: [{ n: 1, answer: "Yttre membran" }, { n: 2, answer: "Inre membran" }, { n: 4, answer: "Matrix" }, { n: 5, answer: "Cristae" }],
    },
    {
      id: "d7-xp2", kind: "label", level: "E", lesson: "d7-l1", diagram: "animalcell", q: "Namnge delarna i djurcellen.",
      markers: [{ n: 1, answer: "Cellmembran" }, { n: 3, answer: "Cellkärna" }, { n: 6, answer: "Golgiapparaten" }, { n: 7, answer: "Mitokondrie" }],
    },
  ],
  keyPoints: [],
};

const prov1 = real.exams.find((e) => e.id === "prov1")!;
// Its own upcoming Prov 2, so the tests don't change when the real one gets parts, study
// questions or is done (README: "När prov 2 är skrivet").
const fixtureProv2: Exam = { id: "prov2", title: "Prov 2", date: "2026-12-07", status: "upcoming" };
const fixtureProv1: Exam = {
  ...prov1,
  studyQuestions: [
    { id: "prov1-xiq01", n: 1, q: "Beskriv skillnaderna mellan en växtcell och en djurcell.", refs: ["d1-l1"], level: "E", modelAnswer: "Båda celltyperna har cellmembran, cytoplasma, cellkärna och mitokondrier. Bara växtcellen har **kloroplaster**, en **cellvägg** av cellulosa och hemicellulosa, **plasmodesmer** och en **stor vakuol**." },
    { id: "prov1-xiq02", n: 2, q: "Hur är cellmembranet uppbyggt?", refs: ["d1-l2", "d1"], level: "C", modelAnswer: "Cellmembranet består av **fosfolipider**, proteiner och andra makromolekyler. Fosfolipiderna bildar ett dubbelt lager med de hydrofila huvudena utåt och de hydrofoba svansarna inåt." },
  ],
};

// A fixed glossary, so the tests do not change when the real one grows.
const glossary: Term[] = [
  { id: "t-vakuol", term: "Vakuol", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Stor vattenfylld blåsa i växtcellen. När den fylls trycker den mot cellväggen." },
  { id: "t-cellvagg", term: "Cellvägg", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Vägg utanför cellmembranet av cellulosa och hemicellulosa som ger växtcellen stadga." },
  { id: "t-cellulosa", term: "Cellulosa", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Ämnet som alla växtcellers cellväggar är byggda av." },
  { id: "t-lignin", term: "Lignin", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Ämne som kan lagras in i cellväggen och gör den hård och vedartad." },
  { id: "t-plasmodesmer", term: "Plasmodesmer", theme: "Växtceller", week: "d1", lesson: "d1-l1", definition: "Små kanaler genom cellväggen som förbinder grannceller med varandra." },
  { id: "t-plastider", term: "Plastider", theme: "Växtceller", week: "d1", lesson: "d1-l1", supplement: true, definition: "Organeller med dubbelt membran i växtceller, till exempel kloroplaster, leukoplaster, amyloplaster och kromoplaster." },
  { id: "t-semipermeabel", term: "Semipermeabel", theme: "Växtceller", week: "d1", lesson: "d1-l2", extra: true, definition: "Halvgenomsläpplig. Släpper igenom vissa ämnen lättare än andra." },
  { id: "t-fosfolipid", term: "Fosfolipid", theme: "Växtceller", week: "d1", lesson: "d1-l2", extra: true, definition: "Fettmolekyl med ett hydrofilt huvud och två hydrofoba svansar. Byggsten i cellmembranet." },
  { id: "t-granum-x", term: "Granum", theme: "Fotosyntes", week: "d2", lesson: "d2-l1", definition: "En stapel av tylakoider i kloroplasten." },
];

export const course: Course = {
  ...real,
  currentExam: "prov2",
  exams: [fixtureProv2, fixtureProv1],
  weeks: [fixtureD1, fixtureD2, fixtureD7],
  glossary,
};
