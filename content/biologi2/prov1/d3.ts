/**
 * Del 3 · Fotosyntesen
 * Sources: Växtfysiologi del 2, bild 4–22 (bild 6 and 14 show how the light reactions and the
 * Calvin cycle exchange ATP/NADPH and ADP/NADP^+^, and the cycle in the stroma).
 * Corrections applied (BUILD §8.4): both reaction centres hold chlorophyll a (P680, P700),
 * chlorophyll b and carotenoids sit in the antennas, 680 nm; PEP-karboxylas.
 * Supplementary: cellular respiration, why photosystem II comes first.
 */
import type { Week } from "../../../src/types.ts";

export const d3: Week = {
  id: "d3",
  exam: "prov1",
  title: "Fotosyntesen",
  summary:
    "Hur kloroplasten fångar ljus i två fotosystem och bildar ATP och NADPH, hur Calvincykeln bygger socker av koldioxid, och hur C3-, C4- och CAM-växter anpassar fotosyntesen.",
  goals: [
    "beskriva kloroplastens uppbyggnad och fotosyntesens två steg",
    "förklara vad som händer i fotosystem II, elektrontransportkedjan och fotosystem I",
    "förklara hur ljusreaktionerna och Calvincykeln samverkar",
    "jämföra C3-, C4- och CAM-växter",
  ],
  lessons: [
    {
      id: "d3-l1",
      title: "Kloroplasten och fotosyntesens två steg",
      minutes: 6,
      source: "Växtfysiologi del 2, bild 5–6, 14",
      body: `Fotosyntesen driver livet: den binder koldioxid och producerar syre. Allt det sker i kloroplasten.

## Kloroplasten

**Kloroplasten** är en organell som har sina rötter i **blågröna alger**. Den har ett **dubbelt membran**, ett yttre och ett inre. Innanför finns **tylakoider**, platta membranblåsor. En stapel av tylakoider kallas **granum**. Insidan av en tylakoid kallas **lumen**, och vätskan runt tylakoiderna kallas **stroma**.

Kloroplasten innehåller pigmenten **klorofyll** och **karoten**.

- Klorofyll innehåller magnesium och kväve.
- Karoten innehåller kol och väte.

## Två steg

1. **Ljusreaktionerna** sker i tylakoiderna. De
   - delar upp vatten, så att syrgas bildas,
   - kombinerar elektroner och vätejoner med bärarmolekylen **NADP^+^**, så att **NADPH** bildas,
   - bildar **ATP**, som behövs för att omvandla koldioxid till socker.
2. **Koldioxidfixeringen**, som också kallas **mörkerreaktionen** eller **Calvincykeln**, sker i stroma. Den omvandlar koldioxid till socker med energi från ljusreaktionerna.

> Ljusreaktionerna fångar ljusets energi i ATP och NADPH. Calvincykeln använder den energin för att bygga socker av koldioxid.

!> Namnet mörkerreaktionen är missvisande. Den behöver inte ljus direkt, men den behöver ATP och NADPH från ljusreaktionerna. I praktiken sker den alltså när det är ljust.`,
      check: {
        id: "d3-l1-k",
        q: "Vad kallas vätskan runt tylakoiderna i kloroplasten?",
        options: ["Lumen", "Granum", "Stroma", "Cytoplasma"],
        answer: "Stroma",
        explain: "Stroma är vätskan runt tylakoiderna. Lumen är insidan av en tylakoid, och ett granum är en stapel av tylakoider.",
        lesson: "d3-l1",
      },
    },
    {
      id: "d3-l2",
      title: "Fotosystem II, elektrontransportkedjan och fotosystem I",
      minutes: 9,
      source: "Växtfysiologi del 2, bild 7–10, 15",
      body: `Ljusreaktionerna är fotosyntesens motor. Här blir ljus till kemisk energi.

## Fotosystemen

Ljusreaktionerna sker i **tylakoidmembranet** och i tylakoidens insida, **lumen**. Där finns två **fotosystem**: komplex av proteiner och klorofyll, med ett **reaktionscentrum** som omges av ljusinfångande **antenner** av pigmentmolekyler. De heter **fotosystem II** och **fotosystem I**.

+> Båda reaktionscentrumen innehåller **klorofyll a**. De kallas P680 och P700 efter den våglängd de tar upp bäst. **Klorofyll b** och karotenoider sitter i antennerna. Lektionsmaterialet säger något annat här, se Om materialet.

## Fotosystem II – 680 nm

1. Klorofyll a i reaktionscentret tar upp ljus, bäst vid våglängden 680 nm. Ljusenergin flyttar bort två elektroner från reaktionscentret till en **elektronacceptor**.
2. Reaktionscentret tar nya elektroner från vatten, med hjälp av ett manganhaltigt protein. Vattnet spjälkas:

= H~2~O -> ½ O~2~ + 2 H^+^ + 2 e^–^

3. **Syrgas** bildas, och vätejonkoncentrationen i lumen ökar.

## Elektrontransportkedjan

Elektronerna från fotosystem II går via **elektrontransportkedjan** i tylakoidmembranet till fotosystem I. På vägen för de in fler vätejoner (protoner) i lumen. Koncentrationsskillnaden över membranet ökar.

## Fotosystem I – 700 nm

1. För att bilda vätebäraren **NADPH** krävs ytterligare ljusenergi. Klorofyll a i fotosystem I tar upp ljus, bäst vid våglängden 700 nm.
2. Ljusenergin flyttar elektroner från reaktionscentret till en elektronacceptor.
3. Elektronacceptorn för elektronerna till **NADP^+^** i stroma, som reduceras till **NADPH**. NADPH används i Calvincykeln.

> Fotosystem II spjälkar vatten och skickar elektroner via elektrontransportkedjan till fotosystem I. Fotosystem I ger elektronerna ny energi och bildar NADPH.

!> Elektronerna går först genom fotosystem II och sedan genom fotosystem I, trots numren.

+> Fotosystemen är numrerade efter när de upptäcktes, inte efter ordningen i ljusreaktionerna.`,
      check: {
        id: "d3-l2-k",
        q: "Vad händer med vatten vid fotosystem II?",
        options: ["Vattnet spjälkas och syrgas bildas", "Vattnet binds till socker", "Vattnet pumpas ut ur kloroplasten", "Vattnet bildar NADPH"],
        answer: "Vattnet spjälkas och syrgas bildas",
        explain: "Reaktionscentret i fotosystem II tar elektroner från vatten. Vattnet spjälkas till syrgas, vätejoner och elektroner. NADPH bildas först i fotosystem I.",
        lesson: "d3-l2",
      },
    },
    {
      id: "d3-l3",
      title: "ATP-syntas och hur stegen samverkar",
      minutes: 6,
      source: "Växtfysiologi del 2, bild 9, 11, 14–15",
      body: `Ljusreaktionerna bildar två energirika molekyler: NADPH och ATP. Så här bildas ATP, och så här hänger stegen ihop.

## ATP bildas av en koncentrationsskillnad

Ljusreaktionerna för in vätejoner i lumen, både när vattnet spjälkas och när elektronerna passerar elektrontransportkedjan. Då blir det mycket fler vätejoner i lumen än i stroma. Skillnaden bygger upp en **membranpotential** över tylakoidmembranet.

Vätejonerna dras tillbaka ut genom ett enzym i membranet, **ATP-syntas** (i bildtexten: ATP-syntetas). Flödet av vätejoner driver enzymet, och **ATP** bildas. ATP används sedan i Calvincykeln.

> ATP bildas när vätejoner strömmar från lumen, där de är många, ut genom ATP-syntaset.

## Cirkeln är sluten

Ljusreaktionerna och Calvincykeln behöver varandra:

- Ljusreaktionerna ger **ATP** och **NADPH** till Calvincykeln.
- Calvincykeln använder dem och lämnar tillbaka **ADP** och **NADP^+^**, som ljusreaktionerna laddar igen.
- In i kloroplasten går vatten och koldioxid. Ut kommer syrgas och socker.

!> Syrgasen kommer inte från koldioxiden. Den kommer från vattnet som spjälkas i fotosystem II.`,
      check: {
        id: "d3-l3-k",
        q: "Vad driver ATP-syntaset?",
        options: ["Solljus direkt på enzymet", "Flödet av vätejoner ut ur lumen", "Socker från Calvincykeln", "Syrgas från vattnet"],
        answer: "Flödet av vätejoner ut ur lumen",
        explain: "Ljusreaktionerna samlar vätejoner i lumen. När de strömmar ut genom ATP-syntaset bildas ATP.",
        lesson: "d3-l3",
      },
    },
    {
      id: "d3-l4",
      title: "Calvincykeln och rubisco",
      minutes: 7,
      source: "Växtfysiologi del 2, bild 6, 12–14",
      body: `I Calvincykeln blir koldioxid från luften till socker. Det är här växten bygger sin biomassa.

## Koldioxid blir socker

1. Enzymet **rubisco** (stavas också rubisko) kombinerar en sockermolekyl med **5 kolatomer** med en **koldioxid**molekyl.
2. Den nya molekylen faller sönder till **två molekyler med 3 kolatomer** var.
3. Med hjälp av väte från bärarmolekylerna (NADPH) och energi från ATP ombildas molekylerna till **socker med 6 kolatomer**.
4. En del av molekylerna används för att bilda 5-kolsockret igen. Därför är det en cykel.

Eftersom koldioxid binds in kallas steget **koldioxidfixering**. Calvincykeln sker i kloroplastens **stroma**.

> Rubisco binder koldioxid till ett 5-kolsocker. Med ATP och NADPH från ljusreaktionerna blir det till slut socker med 6 kolatomer.

!> Calvincykeln bildar ingen syrgas. Den använder koldioxid och bildar socker.

+> **Cellandning**: växten använder sockret från fotosyntesen som energikälla. I **mitokondrierna** bryts sockret ner med hjälp av syre till koldioxid och vatten, och energin lagras i ATP. Cellandningen pågår hela tiden i växtens celler, både i ljus och i mörker.`,
      check: {
        id: "d3-l4-k",
        q: "Vad gör enzymet rubisco?",
        options: ["Spjälkar vatten till syrgas och elektroner", "Bildar ATP när vätejoner strömmar ut", "Binder koldioxid till ett socker med 5 kolatomer", "Bryter ner socker till koldioxid och vatten"],
        answer: "Binder koldioxid till ett socker med 5 kolatomer",
        explain: "Rubisco fixerar koldioxid i Calvincykeln genom att binda den till ett 5-kolsocker. Vatten spjälkas i fotosystem II, och ATP bildas i ATP-syntaset.",
        lesson: "d3-l4",
      },
    },
    {
      id: "d3-l5",
      title: "C3-, C4- och CAM-växter",
      minutes: 8,
      source: "Växtfysiologi del 2, bild 17–22",
      body: `Växter lever under olika förutsättningar: solljus, vatten, värme och koldioxid varierar. Därför använder olika växttyper fotosyntesen på lite olika sätt.

## C3-växter

- Använder bara **Calvincykeln** för koldioxidfixeringen.
- Behöver mycket koldioxid och klarar inte höga temperaturer.
- Är de vanliga växterna, med många utspridda klyvöppningar över hela bladen.
- Stänger vanligtvis klyvöppningarna på natten, när ljusreaktionen inte kan ske.

## C4-växter

- Behöver mycket solljus, klarar höga temperaturer och klarar låga koldioxidhalter.
- Har ett extra steg före Calvincykeln, i olika celler:
  1. De yttre cellerna, **mesofyllcellerna**, tar upp koldioxid med en förening som har 3 kolatomer. Det blir en molekyl med **4 kolatomer**, och därav namnet C4.
  2. I de inre cellerna, **bundle sheath-cellerna**, tas koldioxiden loss och förs in i Calvincykeln. Det kräver ATP.
- Processen kräver enzymen **PEP-karboxylas** och **rubisco**.

## CAM-växter

- Klarar mycket torra och varma klimat.
- Har få klyvöppningar, och de öppnas bara på **natten**.
- På natten lagras koldioxiden i **vakuolen** i form av **äppelsyra** (malat).
- På dagen används koldioxiden från äppelsyran i Calvincykeln.

> C4-växter skiljer koldioxidupptaget och Calvincykeln åt i olika celler. CAM-växter skiljer dem åt i tid: natt och dag.

!> CAM-växter har inte klyvöppningarna öppna på dagen. Det är just därför de klarar torra och varma klimat: de förlorar mindre vatten.`,
      check: {
        id: "d3-l5-k",
        q: "När öppnar CAM-växter sina klyvöppningar?",
        options: ["Bara på dagen", "Hela dygnet", "Bara på natten", "Aldrig"],
        answer: "Bara på natten",
        explain: "CAM-växter öppnar klyvöppningarna på natten och lagrar koldioxiden som äppelsyra. På dagen är de stängda, och koldioxiden från äppelsyran används i Calvincykeln.",
        lesson: "d3-l5",
      },
    },
  ],
  cards: [
    { id: "d3-k01", front: "Kloroplast", back: "Organell med dubbelt membran där fotosyntesen sker. Har sina rötter i blågröna alger.", lesson: "d3-l1" },
    { id: "d3-k02", front: "Tylakoider", back: "Platta membranblåsor inne i kloroplasten där ljusreaktionerna sker.", lesson: "d3-l1" },
    { id: "d3-k03", front: "Granum", back: "En stapel av tylakoider.", lesson: "d3-l1" },
    { id: "d3-k04", front: "Lumen", back: "Insidan av en tylakoid. Hit förs vätejoner i ljusreaktionerna.", lesson: "d3-l1" },
    { id: "d3-k05", front: "Stroma", back: "Vätskan runt tylakoiderna i kloroplasten. Här sker Calvincykeln.", lesson: "d3-l1" },
    { id: "d3-k06", front: "Klorofyll och karoten", back: "Pigment i kloroplasten. Klorofyll innehåller magnesium och kväve, karoten kol och väte.", lesson: "d3-l1" },
    { id: "d3-k07", front: "Fotosyntesens två steg", back: "Ljusreaktionerna och koldioxidfixeringen (Calvincykeln, mörkerreaktionen).", lesson: "d3-l1" },
    { id: "d3-k08", front: "Vad bildar ljusreaktionerna?", back: "Syrgas från vatten, NADPH och ATP.", lesson: "d3-l1" },
    { id: "d3-k09", front: "Fotosystem", back: "Komplex av proteiner och klorofyll med ett reaktionscentrum och ljusinfångande antenner.", lesson: "d3-l2" },
    { id: "d3-k10", front: "Fotosystem II", back: "Tar upp ljus vid 680 nm, spjälkar vatten till syrgas och skickar elektroner vidare.", lesson: "d3-l2" },
    { id: "d3-k11", front: "Fotosystem I", back: "Tar upp ljus vid 700 nm och använder elektronerna för att bilda NADPH.", lesson: "d3-l2" },
    { id: "d3-k12", front: "Elektrontransportkedjan", back: "För elektroner från fotosystem II till fotosystem I och för in vätejoner i lumen.", lesson: "d3-l2" },
    { id: "d3-k13", front: "Var kommer syrgasen från i fotosyntesen?", back: "Från vattnet som spjälkas i fotosystem II.", lesson: "d3-l2" },
    { id: "d3-k14", front: "NADPH", back: "Vätebärare som bildas med hjälp av fotosystem I och lämnar väte till Calvincykeln.", lesson: "d3-l2" },
    { id: "d3-k15", front: "ATP-syntas", back: "Enzym i tylakoidmembranet. ATP bildas när vätejoner strömmar ut ur lumen genom det.", lesson: "d3-l3" },
    { id: "d3-k16", front: "Rubisco", back: "Enzymet som binder koldioxid till ett socker med 5 kolatomer i Calvincykeln.", lesson: "d3-l4" },
    { id: "d3-k17", front: "Calvincykeln", back: "Bygger socker av koldioxid med ATP och NADPH från ljusreaktionerna. Sker i stroma.", lesson: "d3-l4" },
    { id: "d3-k18", front: "Koldioxidfixering", back: "När koldioxid binds in i en organisk molekyl, i Calvincykeln.", lesson: "d3-l4" },
    { id: "d3-k19", front: "Hur samverkar ljusreaktionerna och Calvincykeln?", back: "Ljusreaktionerna ger ATP och NADPH. Calvincykeln använder dem och lämnar tillbaka ADP och NADP^+^.", lesson: "d3-l3" },
    { id: "d3-k20", front: "Cellandning", back: "Socker bryts ner med syre till koldioxid och vatten, och energin lagras i ATP.", lesson: "d3-l4", supplement: true },
    { id: "d3-k21", front: "C3-växter", back: "De vanliga växterna. Använder bara Calvincykeln, behöver mycket koldioxid och klarar inte hög värme.", lesson: "d3-l5" },
    { id: "d3-k22", front: "C4-växter", back: "Mesofyllceller binder koldioxid i en 4-kolsmolekyl. I inre celler tas koldioxiden loss och förs in i Calvincykeln.", lesson: "d3-l5" },
    { id: "d3-k23", front: "PEP-karboxylas", back: "Enzymet som C4-växter använder, tillsammans med rubisco.", lesson: "d3-l5" },
    { id: "d3-k24", front: "CAM-växter", back: "Öppnar klyvöppningarna på natten och lagrar koldioxiden som äppelsyra i vakuolen.", lesson: "d3-l5" },
    { id: "d3-k25", front: "Äppelsyra (malat)", back: "Föreningen som CAM-växter lagrar koldioxid i under natten.", lesson: "d3-l5" },
  ],
  quiz: [
    {
      id: "d3-q01", level: "E", lesson: "d3-l1",
      q: "Vad kallas en stapel av tylakoider?",
      options: ["Granum", "Stroma", "Lumen", "Mesofyll"],
      answer: "Granum",
      explain: "En stapel av tylakoider kallas granum. Stroma är vätskan runt tylakoiderna, och lumen är insidan av en tylakoid.",
    },
    {
      id: "d3-q02", level: "E", lesson: "d3-l1",
      q: "Vilka grundämnen innehåller klorofyll, enligt lektionen?",
      options: ["Järn och svavel", "Magnesium och kväve", "Kalcium och fosfor", "Bara kol och väte"],
      answer: "Magnesium och kväve",
      explain: "Klorofyll innehåller magnesium och kväve. Det är karoten som består av kol och väte.",
    },
    {
      id: "d3-q03", level: "E", lesson: "d3-l1",
      q: "Vad bildas **inte** i ljusreaktionerna?",
      options: ["Syrgas", "ATP", "Socker", "NADPH"],
      answer: "Socker",
      explain: "Ljusreaktionerna bildar syrgas, ATP och NADPH. Sockret bildas i Calvincykeln.",
    },
    {
      id: "d3-q04", level: "E", lesson: "d3-l2",
      q: "Var sker ljusreaktionerna?",
      options: ["I mitokondriernas inre membran", "I cellkärnan och cytoplasman", "I vakuolen och i cellväggen", "I tylakoidmembranet och lumen"],
      answer: "I tylakoidmembranet och lumen",
      explain: "Ljusreaktionerna sker i tylakoidmembranet och i tylakoidens insida, lumen. Calvincykeln sker i stroma.",
    },
    {
      id: "d3-q05", level: "E", lesson: "d3-l2",
      q: "Vid vilken våglängd tar fotosystem II upp ljus bäst?",
      options: ["680 nm", "700 nm", "450 nm", "550 nm"],
      answer: "680 nm",
      explain: "Fotosystem II tar upp ljus bäst vid 680 nm (P680). Fotosystem I tar upp bäst vid 700 nm (P700).",
    },
    {
      id: "d3-q06", level: "E", lesson: "d3-l2",
      q: "Vad bildas när vatten spjälkas i fotosystem II?",
      options: ["Koldioxid, socker och vatten", "Syrgas, vätejoner och elektroner", "ATP, ADP och fosfatjoner", "NADPH, glukos och koldioxid"],
      answer: "Syrgas, vätejoner och elektroner",
      explain: "Vattnet spjälkas till syrgas, vätejoner och elektroner. Elektronerna ersätter de som ljuset flyttat bort från reaktionscentret.",
    },
    {
      id: "d3-q07", level: "E", lesson: "d3-l2",
      q: "Vilken molekyl bildas med hjälp av fotosystem I?",
      options: ["Syrgas", "Äppelsyra", "NADPH", "Koldioxid"],
      answer: "NADPH",
      explain: "Elektronerna från fotosystem I förs till NADP^+^, som reduceras till NADPH. Syrgas bildas i fotosystem II.",
    },
    {
      id: "d3-q08", level: "E", lesson: "d3-l4",
      q: "Vilket enzym binder koldioxid i Calvincykeln?",
      options: ["ATP-syntas", "PEP-karboxylas", "Amylas", "Rubisco"],
      answer: "Rubisco",
      explain: "Rubisco binder koldioxid till ett socker med 5 kolatomer. PEP-karboxylas används i C4-växternas extra steg.",
    },
    {
      id: "d3-q09", level: "E", lesson: "d3-l5",
      q: "Vilka växter använder bara Calvincykeln och kallas de vanliga växterna?",
      options: ["C3-växter", "C4-växter", "CAM-växter", "Lavar"],
      answer: "C3-växter",
      explain: "C3-växterna använder bara Calvincykeln för koldioxidfixeringen. C4- och CAM-växter har ett extra steg.",
    },
    {
      id: "d3-q10", level: "E", lesson: "d3-l5",
      q: "Var lagrar CAM-växter koldioxid under natten?",
      options: ["I kloroplastens stroma", "I vakuolen, som äppelsyra", "I floemet, som socker", "I klyvöppningarna"],
      answer: "I vakuolen, som äppelsyra",
      explain: "CAM-växter lagrar koldioxiden som äppelsyra (malat) i vakuolen på natten och använder den i Calvincykeln på dagen.",
    },
    {
      id: "d3-q11", level: "C", lesson: "d3-l2",
      q: "Varför tar fotosystem I upp ljusenergi en gång till?",
      options: ["För att spjälka mer vatten och bilda mer syrgas", "För att bilda koldioxid som Calvincykeln behöver", "För att elektronerna ska få energi nog att bilda NADPH", "För att stänga klyvöppningarna när det blir varmt"],
      answer: "För att elektronerna ska få energi nog att bilda NADPH",
      explain: "För att bilda vätebäraren NADPH krävs ytterligare ljusenergi. Vattnet spjälkas i fotosystem II, inte i fotosystem I.",
    },
    {
      id: "d3-q12", level: "C", lesson: "d3-l3",
      q: "Hur bildas ATP i kloroplasten?",
      options: ["Rubisco bildar ATP när det binder koldioxid", "Syrgas från vattnet omvandlas direkt till ATP", "Calvincykeln bildar ATP när socker byggs upp", "Vätejoner strömmar ut ur lumen genom ATP-syntas"],
      answer: "Vätejoner strömmar ut ur lumen genom ATP-syntas",
      explain: "Ljusreaktionerna samlar vätejoner i lumen. Flödet ut genom ATP-syntaset driver bildningen av ATP. Calvincykeln använder ATP, den bildar inget.",
    },
    {
      id: "d3-q13", level: "C", lesson: "d3-l3",
      q: "Hur hänger ljusreaktionerna och Calvincykeln ihop?",
      options: ["Calvincykeln ger syrgas och socker till ljusreaktionerna", "Ljusreaktionerna ger ATP och NADPH som Calvincykeln använder", "De sker oberoende av varandra i olika delar av cellen", "Calvincykeln ger ljusenergi som fotosystemen använder"],
      answer: "Ljusreaktionerna ger ATP och NADPH som Calvincykeln använder",
      explain: "Ljusreaktionerna laddar ATP och NADPH. Calvincykeln använder dem för att bilda socker och lämnar tillbaka ADP och NADP^+^.",
    },
    {
      id: "d3-q14", level: "C", lesson: "d3-l2",
      q: "Varför ökar koncentrationen av vätejoner i lumen?",
      options: ["Vatten spjälkas där, och elektronerna för in vätejoner på vägen", "Calvincykeln pumpar in vätejoner från stroma med ATP", "Rubisco frigör vätejoner när koldioxid binds in", "Vätejoner diffunderar in från cytoplasman genom membranet"],
      answer: "Vatten spjälkas där, och elektronerna för in vätejoner på vägen",
      explain: "När vatten spjälkas frigörs vätejoner i lumen, och elektronerna i elektrontransportkedjan för in fler. Det bygger upp en koncentrationsskillnad.",
    },
    {
      id: "d3-q15", level: "C", lesson: "d3-l1",
      q: "Varför sker mörkerreaktionen i praktiken när det är ljust?",
      options: ["Den behöver solvärme", "Rubisco förstörs i mörker", "Den behöver ATP och NADPH från ljusreaktionerna", "Koldioxid finns bara i luften på dagen"],
      answer: "Den behöver ATP och NADPH från ljusreaktionerna",
      explain: "Calvincykeln behöver inte ljus direkt, men den drivs av ATP och NADPH från ljusreaktionerna. Utan ljus tar de slut.",
    },
    {
      id: "d3-q16", level: "C", lesson: "d3-l5",
      q: "Hur tar C4-växter upp koldioxid?",
      options: ["De binder koldioxid bara via Calvincykeln i alla celler", "Mesofyllceller binder koldioxid i en 4-kolsmolekyl som förs till inre celler", "De lagrar koldioxid som äppelsyra i vakuolen på natten", "De tar upp koldioxid genom rötterna och leder den i xylemet"],
      answer: "Mesofyllceller binder koldioxid i en 4-kolsmolekyl som förs till inre celler",
      explain: "I C4-växter binder de yttre mesofyllcellerna koldioxid, och den förs till inre celler där Calvincykeln sker. Att lagra äppelsyra på natten är CAM.",
    },
    {
      id: "d3-q17", level: "C", lesson: "d3-l4",
      q: "Vad händer efter att rubisco har bundit koldioxid till 5-kolsockret?",
      options: ["Molekylen faller sönder till två 3-kolsmolekyler", "Syrgas frigörs och lämnar kloroplasten", "Vatten spjälkas till vätejoner och elektroner", "NADPH bildas av elektroner från fotosystem I"],
      answer: "Molekylen faller sönder till två 3-kolsmolekyler",
      explain: "Den nya molekylen faller sönder till två molekyler med 3 kolatomer. Med ATP och NADPH ombildas de sedan till socker med 6 kolatomer.",
    },
    {
      id: "d3-q18", level: "A", lesson: "d3-l5",
      q: "En växt lever i en öken där det är mycket varmt och torrt. Vilken sorts fotosyntes är mest sannolik?",
      options: ["C3", "C4", "CAM", "Ingen fotosyntes alls"],
      answer: "CAM",
      explain: "CAM-växter klarar mycket torra och varma klimat. De öppnar klyvöppningarna bara på natten och förlorar mindre vatten. Det är CAM-växterna som enligt materialet klarar väldigt torra och varma klimat.",
    },
    {
      id: "d3-q19", level: "A", lesson: "d3-l2",
      q: "Vad skulle hända om fotosystem II slutade spjälka vatten?",
      options: ["Fotosystem I skulle få fler elektroner och bilda mer NADPH", "Calvincykeln skulle gå snabbare eftersom mer energi blir över", "Mer syrgas skulle bildas när vattnet inte används", "Elektronflödet skulle stanna, så ingen NADPH skulle bildas"],
      answer: "Elektronflödet skulle stanna, så ingen NADPH skulle bildas",
      explain: "Vattnet ersätter elektronerna som ljuset flyttar bort. Utan nya elektroner stannar kedjan till fotosystem I, och ingen NADPH, eller syrgas, bildas.",
    },
    {
      id: "d3-q20", level: "A", lesson: "d3-l5",
      q: "I ett område är det varmt, soligt och koldioxidhalten är låg. Vilka växter klarar sig bäst?",
      options: ["C3-växter", "Lavar", "Inga växter alls", "C4-växter"],
      answer: "C4-växter",
      explain: "C4-växter behöver mycket solljus, klarar höga temperaturer och klarar låga koldioxidhalter. C3-växter behöver mycket koldioxid och klarar inte värme.",
    },
  ],
  practice: [
    {
      id: "d3-p1", kind: "label", level: "E", lesson: "d3-l1", diagram: "chloroplast",
      q: "Namnge delarna i kloroplasten.",
      markers: [
        { n: 1, answer: "Yttre membran" },
        { n: 2, answer: "Inre membran" },
        { n: 3, answer: "Granum" },
        { n: 4, answer: "Tylakoid" },
        { n: 5, answer: "Lumen" },
        { n: 6, answer: "Stroma" },
      ],
      distractors: ["Vakuol", "Cytoplasma"],
      hint: "Lumen är insidan av en tylakoid. Stroma är vätskan runt tylakoiderna.",
    },
    {
      id: "d3-p2", kind: "order", level: "C", lesson: "d3-l2",
      q: "Sätt ljusreaktionens steg i ordning.",
      steps: [
        "Ljus tas upp i fotosystem II och elektroner flyttas bort",
        "Vatten spjälkas till syrgas, vätejoner och elektroner",
        "Elektronerna går genom elektrontransportkedjan och för in vätejoner i lumen",
        "Ljus tas upp i fotosystem I och elektronerna får ny energi",
        "Elektronerna förs till NADP^+^, som blir NADPH",
      ],
      explain: "Fotosystem II kommer först och tar elektroner från vatten. Elektrontransportkedjan för dem till fotosystem I, som bildar NADPH. Vätejonerna i lumen används sedan för att bilda ATP.",
    },
    {
      id: "d3-p3", kind: "order", level: "C", lesson: "d3-l4",
      q: "Sätt Calvincykelns steg i ordning.",
      steps: [
        "Rubisco binder koldioxid till ett socker med 5 kolatomer",
        "Molekylen faller sönder till två molekyler med 3 kolatomer",
        "ATP och NADPH från ljusreaktionerna används",
        "Socker med 6 kolatomer bildas",
      ],
      explain: "Rubisco fixerar koldioxiden. Molekylen delas, och med energi och väte från ljusreaktionerna byggs socker med 6 kolatomer.",
    },
    {
      id: "d3-p4", kind: "self", level: "C", lesson: "d3-l3",
      q: "Förklara hur ljusreaktionerna och Calvincykeln samverkar.",
      hint: "Vilka molekyler går åt vilket håll?",
      solution: `**Ljusreaktionerna** sker i tylakoiderna. De fångar ljus, spjälkar vatten till syrgas och bildar **ATP** och **NADPH**.

**Calvincykeln** sker i stroma. Den använder ATP och NADPH för att bygga socker av koldioxid: rubisco binder koldioxiden, och med väte från NADPH och energi från ATP bildas socker med 6 kolatomer.

Calvincykeln lämnar tillbaka **ADP** och **NADP^+^** till ljusreaktionerna, som laddar dem igen. Cirkeln är sluten. Därför sker även mörkerreaktionen i praktiken när det är ljust.`,
    },
    {
      id: "d3-p5", kind: "self", level: "A", lesson: "d3-l5",
      q: "Jämför hur C4-växter och CAM-växter klarar varma klimat.",
      solution: `**C4-växter** behöver mycket solljus och klarar höga temperaturer och låga koldioxidhalter. De yttre mesofyllcellerna binder koldioxid i en molekyl med 4 kolatomer (med PEP-karboxylas). I de inre cellerna tas koldioxiden loss och förs in i Calvincykeln. Stegen är alltså **åtskilda i olika celler**.

**CAM-växter** klarar mycket torra och varma klimat. De har få klyvöppningar som bara öppnas på natten. Då lagras koldioxiden som äppelsyra i vakuolen, och på dagen används den i Calvincykeln. Stegen är **åtskilda i tid**, och växten förlorar mindre vatten.

C3-växter har inget sådant extra steg. De behöver mycket koldioxid och klarar inte höga temperaturer.`,
    },
    {
      id: "d3-p6", kind: "number", level: "E", lesson: "d3-l4",
      q: "Hur många kolatomer har sockermolekylen som rubisco binder koldioxid till?",
      answer: 5,
      solution: "Rubisco binder koldioxid till ett socker med **5 kolatomer**. Det faller sedan sönder till två molekyler med 3 kolatomer.",
    },
    {
      id: "d3-p7", kind: "text", level: "E", lesson: "d3-l2",
      q: "Vilken vätebärare bildas med hjälp av fotosystem I?",
      answer: ["NADPH"],
      solution: "Med hjälp av fotosystem I reduceras NADP^+^ till **NADPH** i stroma.",
    },
    {
      id: "d3-p8", kind: "text", level: "E", lesson: "d3-l4",
      q: "Vad heter enzymet som binder koldioxid i Calvincykeln?",
      answer: ["rubisco", "rubisko"],
      solution: "Enzymet heter **rubisco**.",
    },
    {
      id: "d3-p9", kind: "text", level: "E", lesson: "d3-l5",
      q: "I vilken förening lagrar CAM-växter koldioxid under natten?",
      answer: ["äppelsyra", "malat"],
      solution: "CAM-växter lagrar koldioxiden som **äppelsyra** (malat) i vakuolen.",
    },
  ],
  keyPoints: [
    "Kloroplasten har dubbelt membran. Inuti finns **tylakoider**, staplade i **grana** (plural av granum), med **lumen** på insidan och **stroma** runt omkring.",
    "Fotosyntesen har två steg: **ljusreaktionerna** i tylakoiderna och **Calvincykeln** (koldioxidfixering, mörkerreaktion) i stroma.",
    "**Fotosystem II** (680 nm) spjälkar vatten: syrgas bildas och vätejoner hamnar i lumen.",
    "**Elektrontransportkedjan** för elektronerna till **fotosystem I** (700 nm), som bildar **NADPH**.",
    "Vätejoner strömmar ut ur lumen genom **ATP-syntas**, och **ATP** bildas.",
    "**Rubisco** binder CO~2~ till ett 5-kolsocker. Med ATP och NADPH bildas socker med 6 kolatomer.",
    "Ljusreaktionerna ger ATP och NADPH till Calvincykeln, som lämnar tillbaka ADP och NADP^+^.",
    "**C4-växter** binder CO~2~ med **PEP-karboxylas** i mesofyllceller. **CAM-växter** öppnar klyvöppningarna på natten och lagrar CO~2~ som **äppelsyra**.",
  ],
};
