/**
 * Prov 2: måndag 7 december 2026. Parts are added with /ny-del as the lessons are given.
 * The course document for Prov 2 ("Begrepp, läsanvisningar och frågor") has not been published
 * yet (2026-11-17). Until it is:
 *   - the reading list is the book pages the slides name (Cellbiologi del 1, bild 23 and 35;
 *     Cellens struktur och kommunikation, bild 1);
 *   - there are no concept-list themes, so `themes` is not set and the glossary groups terms by part;
 *   - the study questions are the seven questions on the group task "Bygg en modell av
 *     cellandningen" (docx), with model answers written from Del 7.
 * When the document arrives, replace the reading list, add `themes` and the document's questions
 * (continue the numbering, never renumber or reuse an id).
 */
import type { Exam } from "../../../src/types.ts";

export const prov2: Exam = {
  id: "prov2",
  title: "Prov 2",
  topic: "Cellbiologi",
  date: "2026-12-07",
  status: "upcoming",
  readingList: ["s. 44–46", "s. 68–80", "s. 90–98"],
  lectures: ["Cellbiologi del 1", "Cellens struktur och kommunikation"],
  corrections: [
    {
      where: "Cellandningens tre steg (Cellbiologi del 1, bild 24)",
      material: "ATP bildas i alla tre reaktionsförloppen, ”även koldioxid”.",
      corrected: "ATP bildas i alla tre stegen, men koldioxid avges bara när pyrodruvsyran blir acetyl-CoA och i citronsyracykeln, inte i glykolysen eller andningskedjan. Så visar också bilden på samma bild, och bild 26, 28 och 32.",
    },
    {
      where: "Aktiveringsenergi (Cellbiologi del 1, bild 16–17)",
      material: "Reaktioner där produkterna har mer energi kräver aktiveringsenergi, ”i cellen i form av ATP”. Reaktioner där utgångsämnena har mer energi kräver ingen aktiveringsenergi.",
      corrected: "Alla reaktioner behöver aktiveringsenergi för att starta, även de som frigör energi. Jämför tändstickan som tänder veden på bild 18. Bilderna på bild 19 visar samma sak, och där sänker enzymet aktiveringsenergin. ATP ger den energi som reaktioner behöver när produkterna har mer energi än utgångsämnena.",
    },
    {
      where: "Elektrontransporten (Cellbiologi del 1, bild 32)",
      material: "Vätejoner och energirika elektroner ”reagerar med syre och bildar ATP från ADP”.",
      corrected: "Syret tar emot elektronerna i slutet av andningskedjan och bildar vatten. ATP bildas av ATP-syntas, som drivs av vätejonerna som strömmar tillbaka in i matrix. Så visar också bilderna på bild 30–31.",
    },
  ],
  studyQuestions: [
    {
      id: "prov2-iq01",
      n: 1,
      level: "E",
      q: "Vad är syftet med cellandningen?",
      refs: ["d7-l3", "d7-l4"],
      modelAnswer: `Syftet med cellandningen är att bilda **ATP**. Cellen bryter ner **glukos** med hjälp av **syre** till koldioxid och vatten och tar vara på energin i ATP.

ATP behövs för att ge energi åt cellens arbete, till exempel reaktioner där produkterna har mer energi än utgångsämnena. När ATP blir ADP och fosfat frigörs energi.

Koldioxiden är en biprodukt. I laborationen jäste jästen i stället, men även där var koldioxiden en biprodukt och målet ATP.`,
    },
    {
      id: "prov2-iq02",
      n: 2,
      level: "E",
      q: "Var i cellen sker de olika delarna av processen?",
      refs: ["d7-l4", "d7-l5"],
      modelAnswer: `| Del | Var |
| --- | --- |
| **Glykolysen** | i cytoplasman |
| Pyrodruvsyra blir **acetyl-CoA** | när den tar sig in i mitokondrien |
| **Citronsyracykeln** | i mitokondrien |
| **Andningskedjan** och **ATP-syntas** | i mitokondriens inre membran |

Mitokondrien har ett yttre och ett inre membran. Det inre membranet är veckat i cristae, och innanför det finns matrix med enzymer för cellandningen. Vätejonerna pumpas ut till utrymmet mellan membranen.

Om syre saknas sker **jäsning** i cytoplasman i stället för citronsyracykeln och andningskedjan.`,
    },
    {
      id: "prov2-iq03",
      n: 3,
      level: "C",
      q: "Vad händer med glukoset?",
      refs: ["d7-l4", "d7-l6"],
      modelAnswer: `1. I **glykolysen** i cytoplasman bryts glukos (6 kol) ner till två **pyrodruvsyra** (3 kol). 2 ATP och 2 NADH bildas.
2. Pyrodruvsyran tar sig in i mitokondrien. Den avger **koldioxid**, lämnar väte till en vätebärare och binds till coenzym A. **Acetyl-CoA** bildas, som för 2 kol vidare.
3. I **citronsyracykeln** reagerar acetyl-CoA med oxalättiksyra till citronsyra. Under varvet avges två koldioxid, och NADH, FADH~2~ och ATP bildas.
4. Vätebärarna lämnar elektronerna till **andningskedjan**. Där bildas mer ATP med ATP-syntas, och syre tar emot elektronerna så att vatten bildas.

Glukosens kol hamnar alltså i koldioxid, och energin tas tillvara i ATP.

Utan syre stannar nedbrytningen efter glykolysen, och pyrodruvsyran jäses: jäst bildar **etanol och koldioxid**, muskelceller bildar **mjölksyra**.`,
    },
    {
      id: "prov2-iq04",
      n: 4,
      level: "C",
      q: "Varför behövs syre?",
      refs: ["d7-l5", "d7-l6"],
      modelAnswer: `Syre behövs i slutet av **andningskedjan** i mitokondriens inre membran. Där tar syret emot elektronerna och bildar **vatten** med vätejoner:

= O~2~ + 4 H^+^ + 4 e^–^ -> 2 H~2~O

Elektronerna kommer från vätebärarna NADH och FADH~2~. På vägen genom kedjan används deras energi för att pumpa ut protoner mellan membranen. Protongradienten driver **ATP-syntaset**, som bildar ATP.

Utan syre finns ingen som tar emot elektronerna. Då används inte andningskedjan och citronsyracykeln. Cellen får bara ATP från glykolysen och gör **jäsning**, som ger mycket mindre ATP.`,
    },
    {
      id: "prov2-iq05",
      n: 5,
      level: "A",
      q: "Vad händer med kolatomerna?",
      refs: ["d7-l4", "d7-l6"],
      modelAnswer: `Glukos har **6 kol**.

1. I glykolysen blir glukosen två **pyrodruvsyra** med **3 kol** var. Inga kol försvinner här.
2. På vägen in i mitokondrien avger varje pyrodruvsyra **ett kol som koldioxid**. Kvar blir **acetyl-CoA**, vars acetylgrupp har **2 kol**.
3. I citronsyracykeln binds de 2 kolen till oxalättiksyra (4 kol), så att citronsyra (6 kol) bildas. Under varvet avges **två koldioxid**, och oxalättiksyra (4 kol) bildas igen.

Per glukos blir det 2 koldioxid på vägen in i mitokondrien och 4 i citronsyracykeln: **6 koldioxid**, ett för varje kol i glukosen. Kolet lämnar cellen som koldioxid.

Vid jäsning hos jäst avges en del av kolet som koldioxid, och resten hamnar i **etanol**.`,
    },
    {
      id: "prov2-iq06",
      n: 6,
      level: "C",
      q: "Var bildas ATP och varför är ATP viktig?",
      refs: ["d7-l3", "d7-l4", "d7-l5", "d8-l2", "d8-l4"],
      modelAnswer: `**Var:** ATP bildas i cellandningens alla tre steg:

- i **glykolysen** i cytoplasman (2 ATP netto per glukos),
- i **citronsyracykeln** i mitokondrien,
- av **ATP-syntas** i mitokondriens inre membran, när vätejoner strömmar tillbaka in i matrix.

**Varför:** ATP (adenosintrifosfat) är cellens sätt att hantera energi. När ATP blir ADP och fosfat frigörs energi, och när ADP och fosfat blir ATP tas energi upp. Energin från ATP driver reaktioner där produkterna har mer energi än utgångsämnena. ATP behövs också när myosin och dynein rör sig och vid aktiv transport, se Del 8.`,
    },
    {
      id: "prov2-iq07",
      n: 7,
      level: "C",
      q: "Vilken roll har NADH och FADH~2~?",
      refs: ["d7-l4", "d7-l5"],
      modelAnswer: `NADH och FADH~2~ är **vätebärare**, byggda av nukleotider. De bär väte och **energirika elektroner**.

- **NAD^+^** tar upp väte i glykolysen, när pyrodruvsyra blir acetyl-CoA och i citronsyracykeln, och blir **NADH**.
- **FAD** tar upp väte i citronsyracykeln och blir **FADH~2~**.

Vätebärarna för elektronerna till **andningskedjan** i mitokondriens inre membran. Elektronernas energi pumpar ut protoner mellan membranen, och protongradienten driver ATP-syntaset. Till sist tar syre emot elektronerna och bildar vatten. Vätebärarna kan sedan användas igen.

Vid jäsning lämnar NADH ifrån sig sitt väte när etanol eller mjölksyra bildas, så att NAD^+^ kan användas i glykolysen igen.`,
    },
  ],
};
