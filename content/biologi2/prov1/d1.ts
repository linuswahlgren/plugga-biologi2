/**
 * Del 1 · Växtcellen och transport över membran
 * Sources: Intro kurs, transport över membran, bild 4–20; Växtfysiologi del 1, bild 2–3.
 * Phase 1: the first two lessons, written in full as a test of the platform.
 */
import type { Week } from "../../../src/types.ts";

export const d1: Week = {
  id: "d1",
  exam: "prov1",
  title: "Växtcellen och transport över membran",
  summary:
    "Hur växtcellen skiljer sig från djurcellen, hur cellmembranet är byggt och hur ämnen och vatten tar sig in i och ut ur cellen.",
  goals: [
    "beskriva likheter och skillnader mellan en växtcell och en djurcell",
    "förklara hur cellmembranet är uppbyggt av fosfolipider",
    "förklara diffusion, koncentrationsgradient och osmos",
    "beskriva vad som händer med en växtcell i hypoton, isoton och hyperton lösning",
  ],
  lessons: [
    {
      id: "d1-l1",
      title: "Växtcellen och djurcellen",
      minutes: 6,
      source: "Intro kurs, transport över membran, bild 5–6",
      body: `Växtcellen och djurcellen har mycket gemensamt. Men några delar finns bara i växtcellen, och de förklarar mycket av det du lär dig om växter i den här kursen.

## Det som cellerna har gemensamt

Båda celltyperna omges av ett **cellmembran**, en tunn hinna som styr vad som kommer in i och ut ur cellen. Innanför membranet finns **cytoplasman**, där cellens organeller ligger. Exempel på organeller som finns i båda celltyperna är **cellkärnan** och **mitokondrierna**.

## Det som bara växtcellen har

- **Kloroplaster** är organeller där fotosyntesen sker. Därför kan växten själv bygga socker.
- **Cellväggen** ligger utanför cellmembranet. Den är byggd av **cellulosa** och **hemicellulosa** och ger cellen stadga.
- **Lignin** kan lagras in i cellväggen och gör den hård och vedartad.
- **Plasmodesmer** är små kanaler genom cellväggen som förbinder grannceller med varandra.
- Den **stora vakuolen** är en vattenfylld blåsa som tar upp en stor del av cellen.

> Växtcellen har kloroplaster, cellvägg, plasmodesmer och en stor vakuol. Det har inte djurcellen.

## Varför det spelar roll

Cellväggen och vakuolen arbetar tillsammans. När vatten strömmar in i växtcellen fylls vakuolen och trycker mot cellväggen, men cellen spricker inte. Det kommer tillbaka när du lär dig om osmos och turgor.

+> **Plastider** är en grupp organeller med dubbelt membran som finns i växtceller men inte i djurceller. Kloroplasten är en plastid. Andra exempel är **leukoplaster**, som är färglösa och lagrar näring, **amyloplaster**, som lagrar stärkelse, och **kromoplaster**, som ger färg åt blommor och frukter. Alla utvecklas ur små **proplastider** i växtens delningsvävnad.`,
      check: {
        id: "d1-l1-k",
        q: "Vilken av de här delarna finns i växtcellen men **inte** i djurcellen?",
        options: ["Cellmembran", "Cellvägg", "Mitokondrie", "Cellkärna"],
        answer: "Cellvägg",
        explain:
          "Cellväggen av cellulosa finns bara i växtcellen. Cellmembran, mitokondrier och cellkärna finns i båda celltyperna.",
        lesson: "d1-l1",
      },
    },
    {
      id: "d1-l2",
      title: "Cellmembranet och fosfolipiderna",
      minutes: 7,
      source: "Intro kurs, transport över membran, bild 7–11",
      body: `Allt som ska in i eller ut ur en cell måste passera cellmembranet. Därför är membranets byggnad nyckeln till hela kapitlet om transport.

## Cellens gränskontroll

**Cellmembranet** kontrollerar trafiken in i och ut ur cellen. Det är **semipermeabelt**, det vill säga halvgenomsläppligt: vissa ämnen går igenom lättare än andra.

Membranet består av **fosfolipider**, **proteiner** och andra stora molekyler, så kallade makromolekyler.

## Fosfolipiden har två sidor

En **fosfolipid** är en fettmolekyl med två delar:

- ett **fosfatgrupphuvud**, som är **hydrofilt**. Det betyder vattenvänligt. Huvudet är polärt.
- två **fettsyrasvansar**, som är **hydrofoba**. Det betyder vattenskygga. Svansarna är opolära.

## Ett dubbelt lager

Fosfolipiderna ordnar sig i två lager, ett **dubbelmembran**. Huvudena vänder sig utåt mot vattnet på båda sidor om membranet. Svansarna hamnar inuti, mellan de två lagren.

> Dubbelmembranet sluter sig till en sfär. På så sätt får de hydrofoba svansarna aldrig kontakt med vatten.

!> Det är inte svansarna som vänder sig mot vattnet. Svansarna är hydrofoba och gömmer sig inuti membranet, medan de hydrofila huvudena vänder sig utåt.`,
      check: {
        id: "d1-l2-k",
        q: "Vilken del av fosfolipiden är hydrofob?",
        options: ["Fosfatgrupphuvudet", "Fettsyrasvansarna", "Både huvudet och svansarna"],
        answer: "Fettsyrasvansarna",
        explain:
          "Fettsyrasvansarna är hydrofoba, alltså vattenskygga, och hamnar inuti membranet. Fosfatgrupphuvudet är hydrofilt och vänder sig mot vattnet.",
        lesson: "d1-l2",
      },
    },
  ],
  cards: [],
  quiz: [],
  practice: [],
  keyPoints: [
    "Växtcellen har **kloroplaster**, **cellvägg**, **plasmodesmer** och en **stor vakuol**. Det har inte djurcellen.",
    "Cellväggen består av **cellulosa** och **hemicellulosa**. **Lignin** gör den hård.",
    "Cellmembranet är **semipermeabelt** och består av fosfolipider, proteiner och andra makromolekyler.",
    "Fosfolipidens huvud är **hydrofilt**, svansarna är **hydrofoba**. De bildar ett **dubbelmembran**.",
  ],
};
