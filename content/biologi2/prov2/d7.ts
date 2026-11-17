/**
 * Del 7 · Cellens molekyler och cellandningen (Prov 2, v. 46)
 * Sources: Cellbiologi del 1, bild 1–39. The deck follows a yeast lab (yeast blew up balloons),
 * and so do the lessons. Slide pictures used for facts: bild 10 (sugars), 11 (nucleotide), 13
 * (steroid rings), 21 (glucose + O2 -> CO2 + H2O + ATP), 24 (where CO2 and ATP form), 25, 29, 30,
 * 32, 33 (the mitochondrion with Swedish labels), 36–39 (fermentation, Cori cycle, Crabtree and
 * Warburg).
 * Corrections (shown on the Prov 2 hub's "Om materialet"):
 *   - bild 24 says CO2 forms in all three steps; it forms when pyruvic acid becomes acetyl-CoA and
 *     in the citric acid cycle (the slide's own picture, bild 26 and 28).
 *   - bild 16–17 say energy-releasing reactions need no activation energy and that ATP is the
 *     cell's activation energy; every reaction needs activation energy (bild 18), enzymes lower it
 *     (bild 19), and ATP supplies the energy that energy-requiring reactions need.
 *   - bild 32 says hydrogen ions and electrons react with oxygen and form ATP; ATP synthase makes
 *     ATP, driven by the proton gradient (bild 30–31).
 * Small fixes: O2 + 4H+ + 4e- -> 2H2O (bild 30); hemoglobin has four globular proteins (bild 9 says
 * "fyra olika"); 2 ATP net in glycolysis; omättad = at least one double bond (bild 12 says "fåtal");
 * spelling oxalättiksyra. Supplementary note: endergon/exergon next to the slide's endoterm/exoterm.
 */
import type { Week } from "../../../src/types.ts";

export const d7: Week = {
  id: "d7",
  exam: "prov2",
  title: "Cellens molekyler och cellandningen",
  dates: "v. 46",
  summary:
    "Vilka molekyler cellen är byggd av, hur ATP och enzymer styr cellens energi, och hur glukos blir till ATP i cellandningen och i jäsningen.",
  goals: [
    "beskriva de fyra grupperna av biomolekyler och vad de gör i cellen",
    "förklara hur ATP tar upp och frigör energi och hur enzymer sänker aktiveringsenergin",
    "beskriva cellandningens tre steg, var de sker och vad som bildas",
    "jämföra cellandning och jäsning",
  ],
  lessons: [
    {
      id: "d7-l1",
      title: "Proteiner och aminosyror",
      minutes: 7,
      source: "Cellbiologi del 1, bild 1–2, 6–9",
      body: `I laborationen blåste jästen upp ballongerna med koldioxid från socker. För att förstå vad som hände inne i cellen börjar vi med cellens molekyler.

## Fyra grupper av biomolekyler

Cellens molekyler kallas **biomolekyler**. De delas in i fyra stora grupper:

1. **Proteiner** och deras byggstenar **aminosyror**, cellens byggstenar.
2. **Kolhydrater**, sockerarter av kol, väte och syre.
3. **Lipider**, till exempel fosfolipider, steroider, klorofyll och karotenoider.
4. **Nukleotider** och **nukleinsyror** (DNA och RNA).

Sockret i laborationen är en kolhydrat.

## Från aminosyror till proteiner

Aminosyror binds ihop med varandra genom en **peptidbindning**. Kedjorna bildar **peptider**, **polypeptider** och **proteiner**.

Alla levande organismer använder **20 olika aminosyror**. Ett proteins egenskaper bestäms av **vilka** aminosyror det består av och i **vilken ordning** de sitter. Proteinerna sköter otroligt mycket i cellerna.

- Långa proteinkedjor bildar **fiberproteiner**.
- Ihopkrullade proteinkedjor bildar **globulära proteiner**.

> Ett proteins egenskaper bestäms av vilka aminosyror det består av och i vilken ordning de sitter.

!> Det räcker inte att veta vilka aminosyror ett protein har. Samma aminosyror i en annan ordning ger ett protein med andra egenskaper.

## Enzymer är proteiner

Jästen kunde inte omvandla socker till koldioxid utan hjälp av **enzymer**, och enzymer är proteiner.

## Proteiner med mer än aminosyror

Ett protein behöver inte bara bestå av aminosyror. **Hemoglobin**, som behövs för syretransporten, består av fyra globulära proteiner. Vart och ett innehåller en **hemgrupp** med en **järnatom**. Hemgruppen är ett exempel på en **prostetisk grupp**. Järnatomen sitter alltid där, och den är nödvändig för syretransporten.`,
      check: {
        id: "d7-l1-k",
        q: "Vad bestämmer ett proteins egenskaper?",
        options: ["Hur många fosfatgrupper det har", "Vilka aminosyror det har och i vilken ordning", "Vilket socker det är byggt av", "Hur mycket vatten det innehåller"],
        answer: "Vilka aminosyror det har och i vilken ordning",
        explain: "Proteinets egenskaper bestäms av vilka aminosyror det består av och i vilken ordning de sitter. Fosfatgrupper och socker hör till nukleotider och kolhydrater.",
        lesson: "d7-l1",
      },
    },
    {
      id: "d7-l2",
      title: "Kolhydrater, nukleotider och lipider",
      minutes: 8,
      source: "Cellbiologi del 1, bild 10–13",
      body: `Kolhydraterna är cellens bränsle, nukleotiderna bär energi och väte, och lipiderna bygger membranen. Alla tre behövs för att förstå cellandningen.

## Kolhydrater: cellens bränsle

**Kolhydrater** är sockerarter. De består av kol, väte och syre. Exempel:

- **druvsocker (glukos)** och **fruktsocker (fruktos)**,
- **galaktos**,
- **rörsocker (sackaros**, även kallat **sukros)**, som är byggt av en glukos och en fruktos,
- **stärkelse**, långa kedjor av glukos.

Varför bryter celler ner glukos? För att få ut energi. Det är vad resten av den här delen handlar om.

## Nukleotider

En **nukleotid** består av tre delar: en **kvävebas**, en **sockermolekyl med fem kol (pentos)** och en eller flera **fosfatgrupper**. Nukleotider har flera uppgifter:

- **ATP** sköter cellens energiomsättning.
- **Vätebärarna NADH och FADH~2~** bär väte.
- I långa kedjor bildar nukleotiderna **nukleinsyror**. Nukleotider med **deoxiribos** bygger upp **DNA**, och nukleotider med **ribos** bygger upp **RNA**.

> Jästen i laborationen bildade koldioxid, men det var inte målet. Målet för jästcellen var att bilda ATP.

## Lipider

**Lipider** är **olösliga i vatten**. De har långa kolkedjor med få syreatomer. Lipiderna är centrala för att förstå cellmembranet.

Fettsyror delas in efter hur många **dubbelbindningar** de har:

| Fettsyra | Dubbelbindningar |
| --- | --- |
| **Mättad** | inga |
| **Omättad** | minst en |
| **Fleromättad** | flera (en sorts omättad fettsyra) |

**Steroider** är en grupp lipider som inte är vattenlösliga. De är uppbyggda av sammanbundna ringar av kolatomer.

- Många **hormoner** är steroider, bland annat **östrogen** och **testosteron**.
- **Kolesterol** är viktigt i cellmembranet. Men kolesterol kan också göra att fett fastnar i blodkärlen när det transporteras.

!> En mättad fettsyra har **inga** dubbelbindningar. En fleromättad fettsyra är också omättad, den har bara fler dubbelbindningar.`,
      check: {
        id: "d7-l2-k",
        q: "Vilka tre delar består en nukleotid av?",
        options: ["En aminosyra, en fettsyra och en fosfatgrupp", "Glukos, fruktos och galaktos", "En kvävebas, en pentos och fosfat", "En hemgrupp, en järnatom och ett protein"],
        answer: "En kvävebas, en pentos och fosfat",
        explain: "En nukleotid har en kvävebas, en sockermolekyl med fem kol (pentos) och en eller flera fosfatgrupper. Glukos, fruktos och galaktos är kolhydrater.",
        lesson: "d7-l2",
      },
    },
    {
      id: "d7-l3",
      title: "ATP, aktiveringsenergi och enzymer",
      minutes: 8,
      source: "Cellbiologi del 1, bild 14–21",
      body: `Ballongen i laborationen visade en biprodukt: koldioxid. Det viktiga för jästcellen var det vi inte såg, att glukos blev till ATP.

## ATP

**ATP** står för **adenosintrifosfat**, en nukleotid med tre fosfatgrupper. **ADP** är adenosindifosfat (två fosfatgrupper) och **AMP** adenosinmonofosfat (en fosfatgrupp).

= ADP + fosfat + energi -> ATP (energi tas upp)

= ATP -> ADP + fosfat + energi (energi frigörs)

## Reaktioner som kräver eller frigör energi

- I vissa reaktioner har **produkterna mer energi** än utgångsämnena (reaktanterna). Då måste energi tillföras, i cellen oftast i form av **ATP**. Materialet kallar dem **endoterma reaktioner**.
- I andra reaktioner har **utgångsämnena mer energi** än produkterna. Då frigörs energi, ofta som värme, och reaktionen kan ske **spontant**. Materialet kallar dem **exoterma reaktioner**.

+> I biologin kallas reaktioner som kräver fri energi ofta **endergona** och reaktioner som frigör fri energi **exergona**. Orden endoterm och exoterm handlar egentligen om värme.

## Aktiveringsenergi

Även en reaktion som frigör energi behöver en knuff för att starta: en **aktiveringsenergi**. Cellulosa i ved reagerar inte med syre av sig själv. Först när en brinnande tändsticka tillför värme börjar veden brinna.

!> Även reaktioner som frigör energi behöver aktiveringsenergi för att starta. Lektionsmaterialet säger något annat på bild 16–17, se Om materialet.

## Enzymer

En **katalysator** är ett ämne som påskyndar en reaktion utan att självt förbrukas. Enzymer fungerar som katalysatorer:

- De **sänker behovet av aktiveringsenergi**, så att reaktionen startar.
- De är ofta **specifika**: ett enzym för en reaktion.

Exempel: enzymet **sukras** påskyndar nedbrytningen av **sukros** (sackaros, rörsocker). Med hjälp av vatten omvandlas sukros till glukos och fruktos.

> Enzymer sänker aktiveringsenergin, så att reaktionen kan starta. Enzymet själv förbrukas inte.

!> ATP sänker inte aktiveringsenergin. Det gör enzymerna. ATP ger energin till reaktioner där produkterna har mer energi än utgångsämnena.

## Ämnesomsättning

- **Katabola reaktioner** bryter ner. Föda bryts ner till byggstenar (sockerarter och aminosyror) och till koldioxid och vatten, och då frigörs energi.
- **Anabola reaktioner** bygger upp nya, kroppsegna molekyler av till exempel glukos och aminosyror.`,
      check: {
        id: "d7-l3-k",
        q: "Vad gör ett enzym?",
        options: ["Ger reaktionen energi genom att förbrukas", "Höjer aktiveringsenergin så att reaktionen går lugnare", "Omvandlar ADP till ATP i alla reaktioner", "Sänker aktiveringsenergin så att reaktionen kan starta"],
        answer: "Sänker aktiveringsenergin så att reaktionen kan starta",
        explain: "Enzymer är katalysatorer. De sänker behovet av aktiveringsenergi och förbrukas inte själva.",
        lesson: "d7-l3",
      },
    },
    {
      id: "d7-l4",
      title: "Glykolysen och citronsyracykeln",
      minutes: 9,
      source: "Cellbiologi del 1, bild 22, 24–29, 32",
      body: `Nu följer vi glukosmolekylen steg för steg genom cellandningen och ser var energin tar vägen.

## Cellandningens tre steg

Vid **cellandningen** används **syre** för att bryta ner glukos och få ut energi. Det är en **aerob** reaktion. Den består av tre delar:

| Steg | Var |
| --- | --- |
| **Glykolysen** | i cytoplasman |
| **Citronsyracykeln** | i mitokondrien |
| **Andningskedjan** (elektrontransportkedjan) | i mitokondrien |

ATP bildas i alla tre stegen.

!> Koldioxid bildas **inte** i alla tre stegen. Den avges när pyrodruvsyran omvandlas till acetyl-CoA och i citronsyracykeln, men inte i glykolysen eller andningskedjan. Lektionsmaterialet säger något annat på bild 24, men bilden på samma bild visar rätt, se Om materialet.

## Glykolysen – i cytoplasman

- Glukos (6 kol) bryts ner till två molekyler med 3 kol: **pyrodruvsyra** (pyruvat).
- 2 ATP bildas (netto, alltså det cellen får över).
- Två vätebärare, **NAD^+^**, tar upp väte och blir **NADH**.

## På väg in i mitokondrien

Pyrodruvsyran tar sig genom mitokondriens membran. I samband med det

- avges en **koldioxid**molekyl,
- tar en vätebärare hand om väte,
- tillförs **coenzym A**.

Produkten heter **acetyl-CoA** (acetylcoenzym A). Dess acetylgrupp har 2 kol.

## Citronsyracykeln – i mitokondrien

Citronsyracykeln (Krebs cykel) går runt, precis som [[d3-l4|Calvincykeln]]: den slutar med samma molekyl som den börjar med.

1. **Acetyl-CoA** för in 2 kol och reagerar med cykelns slutprodukt **oxalättiksyra** (4 kol). **Citronsyra** (6 kol) bildas, och coenzym A frigörs.
2. Citronsyran avger en **koldioxid**, och väte plockas bort till NADH. Ny syra: **alfa-ketoglutarsyra**.
3. Ännu en **koldioxid** avges, väte plockas bort och **ATP** bildas. Ny syra: **bärnstenssyra** (4 kol).
4. Väte plockas bort av vätebäraren **FAD**, som blir FADH~2~. Ny syra: **äppelsyra**.
5. Väte plockas bort med NAD^+^. Ny syra: **oxalättiksyra**, som kan ta emot nästa acetyl-CoA.

> Glukosens kol lämnar cellandningen som koldioxid: ett kol per pyrodruvsyra på vägen in i mitokondrien och två kol per varv i citronsyracykeln. Vätebärarna NADH och FADH~2~ för vätet vidare till andningskedjan.`,
      check: {
        id: "d7-l4-k",
        q: "Vad bildas när acetyl-CoA reagerar med oxalättiksyra?",
        options: ["Pyrodruvsyra", "Citronsyra", "Mjölksyra", "Äppelsyra"],
        answer: "Citronsyra",
        explain: "Acetyl-CoA för in 2 kol, som med oxalättiksyra (4 kol) bildar citronsyra (6 kol) i citronsyracykelns första steg. Pyrodruvsyra bildas i glykolysen.",
        lesson: "d7-l4",
      },
    },
    {
      id: "d7-l5",
      title: "Andningskedjan och mitokondrien",
      minutes: 8,
      source: "Cellbiologi del 1, bild 30–35",
      body: `I sista steget lämnar vätebärarna ifrån sig sina energirika elektroner. Det är här syret behövs.

## Mitokondrien

Mitokondrien har två membran:

- Det **yttre membranet** styr vilka ämnen som passerar.
- Det **inre membranet** är veckat i **cristae**. Cellandningen sker vid det inre membranet.

Mellan membranen finns **intermembranområdet**. Innanför det inre membranet finns **matrix**, med enzymer för cellandningen. Mitokondrien har också egna strängar av **mitokondrie-DNA**.

## Andningskedjan

Andningskedjan (elektrontransportkedjan) sitter i mitokondriens **inre membran**.

1. Vätebärarna NADH och FADH~2~ lämnar sina **energirika elektroner** till proteiner i membranet.
2. Elektronerna färdas genom proteinerna. Energin används för att **pumpa ut protoner** (vätejoner) till utrymmet mellan membranen.
3. Det byggs upp en **protongradient**: koncentrationen av vätejoner blir hög mellan membranen och låg på insidan.
4. I kedjans sista proteinkomplex används elektronerna för att bilda **vatten** av **syre** och vätejoner:

= O~2~ + 4 H^+^ + 4 e^–^ -> 2 H~2~O

## ATP-syntas

Vätejonerna strömmar tillbaka in i matrix genom enzymet **ATP-syntas**. Protongradienten driver enzymet, och **ATP** bildas av ADP och fosfat. Det är samma princip som i kloroplasten, se [[d3-l3|ATP-syntas och hur stegen samverkar]].

> Syret tar emot elektronerna i slutet av andningskedjan, och vatten bildas. Utan syre används inte andningskedjan, och cellen får gå över till jäsning.

!> ATP bildas inte när syret reagerar. ATP bildas när vätejonerna strömmar tillbaka genom ATP-syntaset. Lektionsmaterialet säger något annat på bild 32, se Om materialet.

## Annat än socker

- **Fettsyror** bryts ner och bildar acetyl-CoA, som går in i citronsyracykeln.
- Vid **svält** kan aminogruppen plockas bort från proteinernas aminosyror, och kolkedjan förs in i citronsyracykeln. Kroppens behov av energi kan inte stängas av. När de kroppsegna proteinerna börjar brytas ner får det förödande konsekvenser.`,
      check: {
        id: "d7-l5-k",
        q: "Vilken roll har syret i andningskedjan?",
        options: ["Det tar emot elektronerna, och vatten bildas", "Det bryter ner glukos till pyrodruvsyra", "Det driver ATP-syntaset direkt", "Det bildar koldioxid i citronsyracykeln"],
        answer: "Det tar emot elektronerna, och vatten bildas",
        explain: "I kedjans sista proteinkomplex tar syret emot elektronerna och bildar vatten med vätejoner. ATP-syntaset drivs av vätejonerna, inte av syret.",
        lesson: "d7-l5",
      },
    },
    {
      id: "d7-l6",
      title: "Jäsning, mjölksyra och Coricykeln",
      minutes: 7,
      source: "Cellbiologi del 1, bild 2, 11, 14, 22–23, 35–39",
      body: `Vad hände i provrören när jästen blåste upp ballongerna? Svaret är jäsning.

## Cellandning eller jäsning

- **Cellandning** är **aerob**: den använder syre.
- Utan syre sker en **anaerob** reaktion, **jäsning**. Det bildas **mycket mindre ATP**, men cellen kan överleva i en syrefri miljö.

Vid syrebrist används inte citronsyracykeln och andningskedjan. Glykolysen ger fortfarande ATP, och pyrodruvsyran (pyruvat) omvandlas i en anaerob reaktion.

## Alkoholjäsning – jästen

Jästen i laborationen hade begränsad tillgång till syre. Därför genomförde den jäsning i stället för fullständig cellandning:

= glukos -> pyruvat -> koldioxid + etanol

Koldioxiden blåste upp ballongen. När etanolen bildas lämnar NADH ifrån sig sitt väte, så att NAD^+^ kan användas i glykolysen igen.

## Mjölksyrajäsning – musklerna

I muskelceller som arbetar hårt hinner blodet inte alltid syresätta cellerna. Då bildas ATP i stället genom **mjölksyrajäsning**: pyrodruvsyran blir **mjölksyra** (laktat). Även här lämnar NADH ifrån sig sitt väte, så att glykolysen kan fortsätta.

## Coricykeln

Mjölksyran från musklerna förs med blodet till **levern**. Där byggs den om till pyruvat och sedan till glukos, och det kostar ATP. Glukosen går med blodet tillbaka till musklerna. Kretsloppet kallas **mjölksyracykeln** eller **Coricykeln**.

## Jäsning trots syre

- **Crabtree-effekten:** hos jäst leder hög sockerhalt till jäsning, även när syre finns. Cellandningen hämmas när det finns mycket glukos.
- **Warburg-effekten:** snabbt växande djurceller, till exempel cancerceller, tar upp mycket glukos och bildar laktat, även när syre finns. Cellandningen nedregleras men är ofta fortfarande aktiv.

> Utan syre gör cellen bara glykolysen och jäser sedan pyruvatet. Jäst bildar etanol och koldioxid, muskelceller bildar mjölksyra. Båda ger mycket mindre ATP än cellandning.

!> Koldioxiden i ballongen var inte målet för jästen. Koldioxid och etanol är biprodukter. Målet var ATP.`,
      check: {
        id: "d7-l6-k",
        q: "Varför jäste jästen i laborationen i stället för att göra fullständig cellandning?",
        options: ["Den saknade glukos helt", "Den hade för mycket syre", "Den hade begränsad tillgång till syre", "Den behövde bilda mer koldioxid"],
        answer: "Den hade begränsad tillgång till syre",
        explain: "Jästen hade begränsad tillgång till syre och genomförde därför jäsning. Koldioxiden var en biprodukt, inte målet.",
        lesson: "d7-l6",
      },
    },
  ],
  cards: [
    { id: "d7-k01", front: "Biomolekylernas fyra grupper", back: "Proteiner, kolhydrater, lipider och nukleotider (med nukleinsyrorna DNA och RNA).", lesson: "d7-l1" },
    { id: "d7-k02", front: "Peptidbindning", back: "Bindningen mellan två aminosyror. Kedjorna bildar peptider, polypeptider och proteiner.", lesson: "d7-l1" },
    { id: "d7-k03", front: "Vad bestämmer ett proteins egenskaper?", back: "Vilka aminosyror det består av och i vilken ordning de sitter.", lesson: "d7-l1" },
    { id: "d7-k04", front: "Fiberprotein och globulärt protein", back: "Fiberproteiner är långa proteinkedjor. Globulära proteiner är ihopkrullade proteinkedjor.", lesson: "d7-l1" },
    { id: "d7-k05", front: "Prostetisk grupp", back: "En del i ett protein som inte är aminosyror, till exempel hemgruppen med järn i hemoglobin.", lesson: "d7-l1" },
    { id: "d7-k06", front: "Kolhydrater", back: "Sockerarter av kol, väte och syre, till exempel glukos, fruktos och stärkelse. Cellens bränsle.", lesson: "d7-l2" },
    { id: "d7-k07", front: "Nukleotid", back: "En kvävebas, en pentos (socker med fem kol) och en eller flera fosfatgrupper.", lesson: "d7-l2" },
    { id: "d7-k08", front: "DNA och RNA", back: "Nukleinsyror. Nukleotider med deoxiribos bygger upp DNA, nukleotider med ribos bygger upp RNA.", lesson: "d7-l2" },
    { id: "d7-k09", front: "Mättad, omättad och fleromättad fettsyra", back: "Mättad: inga dubbelbindningar. Omättad: minst en. Fleromättad: flera, och den är också omättad.", lesson: "d7-l2" },
    { id: "d7-k10", front: "Steroider", back: "Lipider av sammanbundna kolringar. Hit hör många hormoner, som östrogen och testosteron, och kolesterol.", lesson: "d7-l2" },
    { id: "d7-k11", front: "ATP", back: "Adenosintrifosfat. Energi frigörs när ATP blir ADP och fosfat, och tas upp när ATP bildas.", lesson: "d7-l3" },
    { id: "d7-k12", front: "Aktiveringsenergi", back: "Energin som behövs för att en reaktion ska starta. Enzymer sänker den.", lesson: "d7-l3" },
    { id: "d7-k13", front: "Katalysator", back: "Ämne som påskyndar en reaktion utan att självt förbrukas. Enzymer fungerar som katalysatorer.", lesson: "d7-l3" },
    { id: "d7-k14", front: "Katabola och anabola reaktioner", back: "Katabola bryter ner molekyler och frigör energi. Anabola bygger upp nya kroppsegna molekyler.", lesson: "d7-l3" },
    { id: "d7-k15", front: "Cellandningens tre steg", back: "Glykolysen i cytoplasman, citronsyracykeln och andningskedjan i mitokondrien.", lesson: "d7-l4" },
    { id: "d7-k16", front: "Glykolysen", back: "Glukos (6 kol) bryts ner till två pyrodruvsyra (3 kol) i cytoplasman. 2 ATP (netto) och 2 NADH bildas.", lesson: "d7-l4" },
    { id: "d7-k17", front: "Acetyl-CoA", back: "Bildas när pyrodruvsyra avger koldioxid och binds till coenzym A. Går in i citronsyracykeln.", lesson: "d7-l4" },
    { id: "d7-k18", front: "Citronsyracykeln", back: "Acetyl-CoA och oxalättiksyra bildar citronsyra. Varje varv avges 2 CO~2~, och NADH, FADH~2~ och ATP bildas.", lesson: "d7-l4" },
    { id: "d7-k19", front: "NADH och FADH~2~", back: "Vätebärare som för väte och energirika elektroner till andningskedjan.", lesson: "d7-l4" },
    { id: "d7-k20", front: "Andningskedjan", back: "Proteiner i mitokondriens inre membran. Elektronernas energi pumpar ut protoner, och syre tar emot elektronerna.", lesson: "d7-l5" },
    { id: "d7-k21", front: "ATP-syntas i mitokondrien", back: "Vätejoner strömmar tillbaka in i matrix genom enzymet, och ATP bildas av ADP och fosfat.", lesson: "d7-l5" },
    { id: "d7-k22", front: "Varför behövs syre i cellandningen?", back: "Syre tar emot elektronerna i slutet av andningskedjan och bildar vatten. Utan syre används inte kedjan.", lesson: "d7-l5" },
    { id: "d7-k23", front: "Jäsning", back: "Anaerob nedbrytning av glukos, som inte använder syre. Ger mycket mindre ATP än cellandning.", lesson: "d7-l6" },
    { id: "d7-k24", front: "Alkoholjäsning och mjölksyrajäsning", back: "Jäst bildar etanol och koldioxid. Muskelceller som får för lite syre bildar mjölksyra.", lesson: "d7-l6" },
    { id: "d7-k25", front: "Coricykeln (mjölksyracykeln)", back: "Mjölksyra från musklerna förs med blodet till levern, som bygger om den till glukos.", lesson: "d7-l6" },
  ],
  quiz: [
    {
      id: "d7-q01", level: "E", lesson: "d7-l1",
      q: "Vad kallas bindningen som bildas mellan två aminosyror när de binds ihop i en kedja?",
      options: ["Glykosidbindning", "Peptidbindning", "Dubbelbindning", "Fosfatbindning"],
      answer: "Peptidbindning",
      explain: "Aminosyror binds ihop genom peptidbindningar och bildar peptider, polypeptider och proteiner. Dubbelbindningar finns till exempel i omättade fettsyror.",
    },
    {
      id: "d7-q02", level: "E", lesson: "d7-l1",
      q: "Hur många olika aminosyror använder alla levande organismer?",
      options: ["4", "12", "20", "64"],
      answer: "20",
      explain: "Alla levande organismer använder 20 olika aminosyror. Proteinets egenskaper beror på vilka av dem det har och i vilken ordning.",
    },
    {
      id: "d7-q03", level: "E", lesson: "d7-l2",
      q: "Vilka grundämnen består kolhydrater av?",
      options: ["Kol, väte och syre", "Kol, kväve och fosfor", "Väte, syre och järn", "Kol, väte och kväve"],
      answer: "Kol, väte och syre",
      explain: "Kolhydrater, till exempel glukos, består av kol, väte och syre. Järn finns i hemgruppen i hemoglobin.",
    },
    {
      id: "d7-q04", level: "E", lesson: "d7-l2",
      q: "Vad skiljer en mättad fettsyra från en omättad?",
      options: ["Den mättade har fler syreatomer", "Den mättade har inga dubbelbindningar", "Den mättade är löslig i vatten", "Den mättade har en fosfatgrupp"],
      answer: "Den mättade har inga dubbelbindningar",
      explain: "En mättad fettsyra har inga dubbelbindningar, en omättad har minst en och en fleromättad har flera. Alla lipider är olösliga i vatten.",
    },
    {
      id: "d7-q05", level: "E", lesson: "d7-l3",
      q: "Vad står ATP för?",
      options: ["Adenosintrifosfat", "Aminosyratrifosfat", "Adenosintriprotein", "Acetyltrifosfat"],
      answer: "Adenosintrifosfat",
      explain: "ATP är adenosintrifosfat, en nukleotid med tre fosfatgrupper. ADP har två och AMP en.",
    },
    {
      id: "d7-q06", level: "E", lesson: "d7-l3",
      q: "Vad är en katalysator?",
      options: ["Ett ämne som förbrukas och ger reaktionen energi", "Ett ämne som bromsar en reaktion i cellen", "Ett ämne som bildas som slutprodukt i en reaktion", "Ett ämne som påskyndar en reaktion utan att förbrukas"],
      answer: "Ett ämne som påskyndar en reaktion utan att förbrukas",
      explain: "En katalysator påskyndar en reaktion utan att självt förbrukas. Enzymer fungerar som katalysatorer genom att sänka aktiveringsenergin.",
    },
    {
      id: "d7-q07", level: "E", lesson: "d7-l4",
      q: "Var sker glykolysen?",
      options: ["I mitokondriens matrix", "I mitokondriens inre membran", "I cytoplasman", "I cellkärnan"],
      answer: "I cytoplasman",
      explain: "Glykolysen sker i cytoplasman. Citronsyracykeln och andningskedjan sker i mitokondrien.",
    },
    {
      id: "d7-q08", level: "E", lesson: "d7-l4",
      q: "Vad bildas när glukos bryts ner i glykolysen?",
      options: ["Två molekyler pyrodruvsyra", "Två molekyler acetyl-CoA", "Sex molekyler koldioxid", "En molekyl citronsyra"],
      answer: "Två molekyler pyrodruvsyra",
      explain: "Glukos (6 kol) bryts ner till två molekyler pyrodruvsyra (3 kol). Acetyl-CoA bildas först när pyrodruvsyran tar sig in i mitokondrien.",
    },
    {
      id: "d7-q09", level: "E", lesson: "d7-l5",
      q: "Var sitter andningskedjan?",
      options: ["I mitokondriens yttre membran", "I cytoplasman", "I kloroplastens tylakoider", "I mitokondriens inre membran"],
      answer: "I mitokondriens inre membran",
      explain: "Andningskedjan sitter i mitokondriens inre membran. Det yttre membranet styr vilka ämnen som passerar.",
    },
    {
      id: "d7-q10", level: "E", lesson: "d7-l6",
      q: "Vad bildar jäst vid jäsning?",
      options: ["Mjölksyra och vatten", "Vatten och koldioxid", "Koldioxid och etanol", "Syrgas och glukos"],
      answer: "Koldioxid och etanol",
      explain: "Jäst bildar koldioxid och etanol vid jäsning. Vatten bildas i andningskedjan, och mjölksyra bildas i muskelceller.",
    },
    {
      id: "d7-q11", level: "C", lesson: "d7-l3",
      q: "Varför behöver cellen ATP för vissa reaktioner?",
      options: ["Produkterna har mer energi än utgångsämnena, så energi måste tillföras", "ATP sänker aktiveringsenergin på samma sätt som ett enzym", "ATP är en katalysator som inte förbrukas i reaktionen", "Utgångsämnena har mer energi, så energi måste tas bort"],
      answer: "Produkterna har mer energi än utgångsämnena, så energi måste tillföras",
      explain: "När produkterna har mer energi än utgångsämnena måste energi tillföras, i cellen oftast från ATP. Det är enzymer, inte ATP, som sänker aktiveringsenergin.",
    },
    {
      id: "d7-q12", level: "C", lesson: "d7-l3",
      q: "Förbränning av ved frigör energi. Varför börjar veden ändå inte brinna av sig själv?",
      options: ["Ved innehåller ingen kemisk energi", "Reaktionen kräver ATP från veden", "Det behövs aktiveringsenergi för att starta reaktionen", "Produkterna har mer energi än veden"],
      answer: "Det behövs aktiveringsenergi för att starta reaktionen",
      explain: "Även en reaktion som frigör energi behöver aktiveringsenergi för att starta. Tändstickans värme ger den knuffen, sedan frigörs energi.",
    },
    {
      id: "d7-q13", level: "C", lesson: "d7-l4",
      q: "Var i cellandningen bildas koldioxid?",
      options: ["I glykolysen och i andningskedjan", "Bara i andningskedjan, när syre tar emot elektroner", "I alla tre stegen lika mycket", "När pyrodruvsyra blir acetyl-CoA och i citronsyracykeln"],
      answer: "När pyrodruvsyra blir acetyl-CoA och i citronsyracykeln",
      explain: "Koldioxid avges när pyrodruvsyran omvandlas till acetyl-CoA och två gånger per varv i citronsyracykeln. I andningskedjan bildas vatten, inte koldioxid.",
    },
    {
      id: "d7-q14", level: "C", lesson: "d7-l4",
      q: "Varför kallas citronsyracykeln en cykel?",
      options: ["Den sker i en ring av proteiner i membranet", "Glukos går runt i den flera gånger", "Den sker om och om igen i cytoplasman", "Den slutar med oxalättiksyra, som tar emot nästa acetyl-CoA"],
      answer: "Den slutar med oxalättiksyra, som tar emot nästa acetyl-CoA",
      explain: "Cykelns sista steg bildar oxalättiksyra, som reagerar med nästa acetyl-CoA. Citronsyracykeln sker i mitokondrien, inte i cytoplasman.",
    },
    {
      id: "d7-q15", level: "C", lesson: "d7-l5",
      q: "Vad driver ATP-syntaset i mitokondrien?",
      options: ["Syre som reagerar direkt med ADP", "Vätejoner som strömmar tillbaka in i matrix", "Glukos som bryts ner i membranet", "Koldioxid som lämnar citronsyracykeln"],
      answer: "Vätejoner som strömmar tillbaka in i matrix",
      explain: "Andningskedjan pumpar ut vätejoner mellan membranen. När de strömmar tillbaka in genom ATP-syntaset bildas ATP. Syret tar emot elektroner och bildar vatten.",
    },
    {
      id: "d7-q16", level: "C", lesson: "d7-l5",
      q: "Varför blir koncentrationen av vätejoner hög mellan mitokondriens två membran?",
      options: ["ATP-syntaset pumpar ut dem dit", "Glykolysen bildar dem där", "Elektronernas energi i andningskedjan används för att pumpa ut dem", "Syret frigör dem när vatten bildas"],
      answer: "Elektronernas energi i andningskedjan används för att pumpa ut dem",
      explain: "De energirika elektronerna från vätebärarna används för att pumpa ut protoner mellan membranen. ATP-syntaset släpper tillbaka dem, det pumpar inte ut dem.",
    },
    {
      id: "d7-q17", level: "C", lesson: "d7-l6",
      q: "Varför bildas mjölksyra i muskler som arbetar hårt?",
      options: ["Blodet hinner inte syresätta cellerna, så de jäser", "Musklerna saknar mitokondrier", "Mjölksyra är slutprodukten i citronsyracykeln", "Levern skickar mjölksyra till musklerna"],
      answer: "Blodet hinner inte syresätta cellerna, så de jäser",
      explain: "När blodet inte hinner syresätta muskelcellerna bildas ATP genom mjölksyrajäsning. Det är tvärtom musklerna som skickar mjölksyran till levern.",
    },
    {
      id: "d7-q18", level: "A", lesson: "d7-l6",
      q: "En cell får plötsligt inget syre. Vad händer med cellens energiomsättning?",
      options: ["Glykolysen stannar, men andningskedjan fortsätter", "Andningskedjan används inte, och cellen får ATP från glykolysen genom jäsning", "Citronsyracykeln bildar mer ATP för att kompensera", "ATP-syntaset fortsätter som vanligt utan syre"],
      answer: "Andningskedjan används inte, och cellen får ATP från glykolysen genom jäsning",
      explain: "Utan syre kan ingen ta emot elektronerna i andningskedjan, så citronsyracykeln och kedjan används inte. Glykolysen ger fortfarande lite ATP, och pyruvatet jäses.",
    },
    {
      id: "d7-q19", level: "A", lesson: "d7-l5",
      q: "En person svälter länge. Varför blir det till slut farligt för kroppen?",
      options: ["Kroppen börjar bryta ner sina egna proteiner för att få energi", "Fettsyror kan aldrig användas som energikälla", "Citronsyracykeln stannar helt utan glukos", "Mitokondrierna slutar ta emot syre"],
      answer: "Kroppen börjar bryta ner sina egna proteiner för att få energi",
      explain: "Vid svält kan aminosyrornas kolkedjor föras in i citronsyracykeln. Behovet av energi kan inte stängas av, så när de kroppsegna proteinerna bryts ner får det förödande konsekvenser. Fettsyror kan också brytas ner till acetyl-CoA.",
    },
    {
      id: "d7-q20", level: "A", lesson: "d7-l6",
      q: "Jäst odlas med mycket socker och gott om syre. Den bildar ändå etanol. Hur kan det förklaras?",
      options: ["Jästen saknar mitokondrier", "Hög sockerhalt gör att jästen jäser även när syre finns", "Syret omvandlas till etanol i andningskedjan", "Etanol bildas i citronsyracykeln"],
      answer: "Hög sockerhalt gör att jästen jäser även när syre finns",
      explain: "Det kallas Crabtree-effekten: hos jäst leder hög sockerhalt till jäsning även när syre finns, och cellandningen hämmas. Etanol bildas vid jäsning, inte i mitokondrien.",
    },
  ],
  practice: [
    {
      id: "d7-p1", kind: "label", level: "E", lesson: "d7-l5", diagram: "mitochondrion",
      q: "Namnge delarna i mitokondrien.",
      markers: [
        { n: 1, answer: "Yttre membran" },
        { n: 2, answer: "Inre membran" },
        { n: 3, answer: "Intermembranområde" },
        { n: 4, answer: "Matrix" },
        { n: 5, answer: "Cristae" },
        { n: 6, answer: "Mitokondrie-DNA" },
      ],
      distractors: ["Stroma", "Tylakoid"],
      hint: "Cristae är vecken i det inre membranet. Matrix är utrymmet innanför det inre membranet.",
    },
    {
      id: "d7-p2", kind: "order", level: "C", lesson: "d7-l4",
      q: "Sätt cellandningens steg i ordning.",
      steps: [
        "Glukos bryts ner till pyrodruvsyra i cytoplasman",
        "Pyrodruvsyran avger koldioxid och blir acetyl-CoA",
        "Acetyl-CoA går in i citronsyracykeln",
        "NADH och FADH~2~ lämnar elektroner till andningskedjan",
        "Vätejoner strömmar genom ATP-syntas, och ATP bildas",
      ],
      explain: "Glykolysen sker i cytoplasman. I mitokondrien blir pyrodruvsyran acetyl-CoA, som går in i citronsyracykeln. Vätebärarna lämnar elektroner till andningskedjan, som bygger upp protongradienten som driver ATP-syntaset.",
    },
    {
      id: "d7-p3", kind: "order", level: "C", lesson: "d7-l4",
      q: "Sätt citronsyracykelns steg i ordning.",
      steps: [
        "Acetyl-CoA reagerar med oxalättiksyra, och citronsyra bildas",
        "Koldioxid avges, och alfa-ketoglutarsyra bildas",
        "Koldioxid avges, ATP bildas, och bärnstenssyra bildas",
        "FAD blir FADH~2~, och äppelsyra bildas",
        "NAD^+^ blir NADH, och oxalättiksyra bildas igen",
      ],
      explain: "Två kol kommer in med acetyl-CoA och två kol lämnar som koldioxid. Cykeln slutar med oxalättiksyra, som tar emot nästa acetyl-CoA.",
    },
    {
      id: "d7-p4", kind: "self", level: "C", lesson: "d7-l5",
      q: "Förklara varför cellen behöver syre för att bilda mycket ATP.",
      hint: "Vad händer i slutet av andningskedjan?",
      solution: `Vätebärarna **NADH** och **FADH~2~** lämnar energirika elektroner till **andningskedjan** i mitokondriens inre membran. Elektronernas energi används för att pumpa ut **protoner** mellan membranen, så att en **protongradient** byggs upp.

I slutet av kedjan tar **syre** emot elektronerna och bildar **vatten** med vätejoner. Protonerna strömmar tillbaka genom **ATP-syntas**, och ATP bildas.

Utan syre finns ingen som tar emot elektronerna. Då används inte andningskedjan och citronsyracykeln, och cellen får bara ATP från glykolysen genom **jäsning**, vilket ger mycket mindre ATP.`,
    },
    {
      id: "d7-p5", kind: "self", level: "A", lesson: "d7-l6",
      q: "Jämför cellandning och jäsning.",
      solution: `**Likheter:** båda börjar med **glykolysen** i cytoplasman, där glukos bryts ner till två pyrodruvsyra och 2 ATP bildas.

**Cellandning** är **aerob**. Pyrodruvsyran går in i mitokondrien, blir acetyl-CoA och bryts ner i **citronsyracykeln**. Vätebärarna lämnar elektroner till **andningskedjan**, där syre tar emot dem och ATP-syntas bildar ATP. Slutprodukterna är koldioxid och vatten.

**Jäsning** är **anaerob** och sker oftast när syre saknas. Pyrodruvsyran omvandlas i cytoplasman: jäst bildar **etanol och koldioxid**, muskelceller bildar **mjölksyra**. Det ger **mycket mindre ATP**, men cellen kan överleva utan syre.

Jäst kan jäsa även när syre finns, om sockerhalten är hög (Crabtree-effekten).`,
    },
    {
      id: "d7-p6", kind: "number", level: "A", lesson: "d7-l4",
      q: "En glukosmolekyl bryts ner helt i cellandningen. Hur många koldioxidmolekyler bildas?",
      hint: "Räkna kolatomerna. Varje koldioxid tar med sig ett kol.",
      answer: 6,
      solution: "Glukos har 6 kol och blir två pyrodruvsyra med 3 kol. Varje pyrodruvsyra avger 1 koldioxid på vägen in i mitokondrien (2 totalt), och varje acetyl-CoA ger 2 koldioxid i citronsyracykeln (4 totalt). Det blir **6 koldioxid**, ett för varje kol i glukosen.",
    },
    {
      id: "d7-p7", kind: "number", level: "E", lesson: "d7-l4",
      q: "Hur många ATP får cellen netto från glykolysen när en glukosmolekyl bryts ner?",
      answer: 2,
      solution: "Glykolysen ger **2 ATP** netto per glukosmolekyl. Dessutom bildas 2 NADH.",
    },
    {
      id: "d7-p8", kind: "text", level: "E", lesson: "d7-l1",
      q: "Vad kallas bindningen mellan två aminosyror?",
      answer: ["peptidbindning", "peptidbindningen"],
      solution: "Aminosyror binds ihop med **peptidbindningar**.",
    },
    {
      id: "d7-p9", kind: "text", level: "E", lesson: "d7-l3",
      q: "Vad heter enzymet som bryter ner sukros till glukos och fruktos?",
      answer: ["sukras"],
      solution: "Enzymet heter **sukras**. Det påskyndar nedbrytningen av sukros med hjälp av vatten.",
    },
    {
      id: "d7-p10", kind: "text", level: "E", lesson: "d7-l6",
      q: "Vad kallas kretsloppet där mjölksyra från musklerna byggs om till glukos i levern?",
      answer: ["Coricykeln", "mjölksyracykeln", "Cori-cykeln", "Coris cykel"],
      solution: "Det kallas **Coricykeln** eller **mjölksyracykeln**.",
    },
  ],
  keyPoints: [
    "Biomolekylerna delas in i fyra grupper: **proteiner**, **kolhydrater**, **lipider** och **nukleotider** (med nukleinsyrorna DNA och RNA).",
    "Aminosyror binds ihop med **peptidbindningar**. Proteinets egenskaper bestäms av vilka aminosyror det har och i vilken ordning. **Enzymer** är proteiner.",
    "En **nukleotid** är en kvävebas, en pentos och fosfat. ATP, NADH, FADH~2~, DNA och RNA bygger på nukleotider.",
    "**ATP** frigör energi när det blir ADP och fosfat. Reaktioner där produkterna har mer energi än utgångsämnena får energin från ATP.",
    "Alla reaktioner behöver **aktiveringsenergi** för att starta. **Enzymer** sänker den utan att själva förbrukas.",
    "Cellandningen: **glykolysen** i cytoplasman, **citronsyracykeln** och **andningskedjan** i mitokondrien. Koldioxid avges när pyrodruvsyra blir acetyl-CoA och i citronsyracykeln.",
    "I andningskedjan pumpar elektronernas energi ut protoner. **Syre** tar emot elektronerna och bildar vatten, och **ATP-syntas** bildar ATP.",
    "Utan syre sker **jäsning**: jäst bildar etanol och koldioxid, muskelceller mjölksyra. Det ger mycket mindre ATP än cellandning.",
  ],
};
