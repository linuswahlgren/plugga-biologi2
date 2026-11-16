/**
 * Del 5 · Svampar och lavar
 * Sources: Växtfysiologi del 3, bild 15–28; Växtfysiologi och hållbar utveckling, bild 19 (mycorrhiza).
 * The historical anecdotes (antiken, Linné and the worms) stay in lesson text only (BUILD §8.5).
 * Supplementary: what "fakultativt anaerob" means.
 */
import type { Week } from "../../../src/types.ts";

export const d5: Week = {
  id: "d5",
  exam: "prov1",
  title: "Svampar och lavar",
  summary:
    "Varför svampar är ett eget rike, hur de är byggda, deras fyra levnadssätt, mykorrhiza och lavar, och hur de förökar sig.",
  goals: [
    "förklara varför svampar inte är växter",
    "beskriva hyfer, mycel och fruktkroppar",
    "beskriva svamparnas fyra levnadssätt, mykorrhiza och lavar",
    "beskriva basidiesvamparnas livscykel och jämföra den med fröväxternas",
  ],
  lessons: [
    {
      id: "d5-l1",
      title: "Svampar – ett eget rike",
      minutes: 6,
      source: "Växtfysiologi del 3, bild 15–17",
      body: `Svampar växer i marken och kan se ut som växter. Men svampar är **inte** växter.

## Ett eget rike

Svamparna är ett eget **rike** av **eukaryota** organismer. De är **heterotrofer**: de får sin näring från det som andra organismer har producerat. Växter gör i stället fotosyntes.

## Svampcell och växtcell

| | Svampar | Växter |
| --- | --- | --- |
| Cellväggen innehåller | **kitin** | **cellulosa** |
| Näring | tas upp från omgivningen | fotosyntes |
| Vävnader | inga specifika vävnader | fyra vävnadstyper |

## Hyfer, mycel och fruktkroppar

- Svampar består oftast av långa trådar av svampceller i rader. Trådarna kallas **hyfer**.
- Samlingen hyfer kallas **mycel**. Mycelet finns till största delen under jord.
- Svampar har inga specifika vävnader. Cellerna kommunicerar genom porer mellan cellernas cytoplasma.
- För reproduktion och spridning av sporer kan svampen bilda **fruktkroppar**. De räknas inte som vävnad.

> Svampar är heterotrofa och har kitin i cellväggen. De består av hyfer som bildar ett mycel.

!> Svampen du plockar i skogen är bara fruktkroppen. Själva svampen är mycelet, som till största delen finns under jord.`,
      check: {
        id: "d5-l1-k",
        q: "Vad innehåller svamparnas cellväggar?",
        options: ["Cellulosa", "Lignin", "Kitin", "Pektin"],
        answer: "Kitin",
        explain: "Svampar har kitin i cellväggen. Växter har cellulosa, ibland med lignin och pektin.",
        lesson: "d5-l1",
      },
    },
    {
      id: "d5-l2",
      title: "Svampgrupper och fyra levnadssätt",
      minutes: 7,
      source: "Växtfysiologi del 3, bild 18–20, 23–24",
      body: `Svampar lever på många olika sätt.

## Många arter, svåra att sortera

Vi har beskrivit ungefär 150 000 svamparter, men uppskattningsvis finns det mellan 1,5 och 5 miljoner. Klassificeringen har länge varit ett problem. Under antiken trodde man att svampar uppkom av sig själva, eftersom de inte hade några frön. Linné räknade svamparna till maskarna.

## Grupper av svampar

- **Algsvampar**: en enklare form som liknar alger. Förökar sig med sporer.
- **Jästsvampar**: fakultativt anaeroba.
- **Sporsäckssvampar**: till exempel murklor.
- **Basidiesvampar**: bland annat svampar vi hittar i grönsakshyllan.
- **Lavar**: en svamp tillsammans med en alg eller en bakterie.

+> **Fakultativt anaerob** betyder att organismen kan leva både med och utan syre.

## Fyra levnadssätt

Svampar är heterotrofer. De utsöndrar **enzymer** som bryter ner materia till mindre bitar, som svampen sedan tar upp. Ekologiskt kan svamparna delas in i fyra grupper:

1. **Nedbrytare** bryter ner död materia och avfall från andra organismer. De kan klyva och utnyttja **lignin**, vilket är extremt ovanligt, och också cellulosa, hemicellulosa och keratin. Tillsammans med bakterier och små organismer bildar de **humus** av organiskt avfall. Mycelet kan vara allt från några centimeter till flera kilometer stort.
2. **Mutualister** lever i samarbete med andra organismer. Det tar nästa lektion upp.
3. **Parasiter** lever av andra organismer och påverkar dem negativt. Parasitiska svampar hos människan ger **mykoser**.
4. **Predatorer** kan bilda nät av sina hyfer och fånga maskar, amöbor och andra mikroorganismer.

> Svampar är nedbrytare, mutualister, parasiter eller predatorer. Alla bryter ner och tar upp det som andra organismer har producerat.

!> Svampar tar inte upp hela bitar av maten. De bryter ner materian med enzymer utanför cellerna och tar sedan upp de små bitarna.`,
      check: {
        id: "d5-l2-k",
        q: "Vad gör nedbrytande svampar?",
        options: ["Bryter ner död materia och bildar humus", "Fångar maskar med nät av hyfer", "Gör fotosyntes", "Lever i rötterna och hjälper växten"],
        answer: "Bryter ner död materia och bildar humus",
        explain: "Nedbrytarna bryter ner död materia och bildar humus. Att fånga maskar är predatorer, och att hjälpa växtens rötter är mutualism.",
        lesson: "d5-l2",
      },
    },
    {
      id: "d5-l3",
      title: "Mykorrhiza och lavar",
      minutes: 6,
      source: "Växtfysiologi del 3, bild 21–22; Växtfysiologi och hållbar utveckling, bild 19",
      body: `Många svampar lever i samarbete med andra organismer. Två viktiga exempel är mykorrhiza och lavar.

## Mykorrhiza – svamprot

Svampens mycel sträcker sig över stora områden. Om ett träd samarbetar med en svamp ökar trädets upptagningsområde för vatten och näringsämnen dramatiskt. Svampen får i utbyte organiska ämnen från trädet. Växten ger socker från fotosyntesen, och svampen ger vatten och mineralnäring. Förbindelsen kallas **mykorrhiza**, som betyder svamprot.

- En växt kan bilda mykorrhiza med flera olika svamparter.
- Vissa svampar bildar mykorrhiza med bara en växtart.
- Majoriteten av växterna gynnas av eller är helt beroende av mykorrhiza.
- Svampen stärker växtens immunförsvar och kan bilda gifter mot nematoder och bakterier.
- Om en växt angrips av insekter kan den signalera det genom att bilda vissa ämnen. Har växten mykorrhiza sprider svampen signalen vidare till andra växter som den är länkad med.

## Lavar

En **lav** består av en **mykobiont**, en svamp, och en **fotobiont**, en grönalg eller en blågrön bakterie som gör fotosyntes. Förhållandet räknas som **mutualistiskt**. Men svampen klarar sig inte utan fotobionten, medan algen eller bakterien kan överleva utan svampen.

> Mykorrhiza och lavar räknas som mutualism. I mykorrhizan får trädet vatten och näringsämnen, och svampen får organiska ämnen.

!> En lav är ingen växt. Den är en svamp som lever ihop med en grönalg eller en blågrön bakterie.`,
      check: {
        id: "d5-l3-k",
        q: "Vad får svampen från trädet i en mykorrhiza?",
        options: ["Vatten och mineralnäring", "Organiska ämnen, till exempel socker", "Kitin till sina cellväggar", "Mineralnäring och kväve"],
        answer: "Organiska ämnen, till exempel socker",
        explain: "Trädet ger svampen socker från fotosyntesen. Svampen ger i sin tur trädet vatten och mineralnäring.",
        lesson: "d5-l3",
      },
    },
    {
      id: "d5-l4",
      title: "Förökning, basidiesvampar och användning",
      minutes: 7,
      source: "Växtfysiologi del 3, bild 25–28",
      body: `Svampar har inga blommor och inga frön. Ändå kan de föröka sig både könlöst och sexuellt.

## Svampsex

- Svampar har inga ägg eller spermier, men de kan föröka sig både könlöst och sexuellt.
- **Könlös förökning** sker med avknoppning eller med **sporer**.
- Vid sexuell förökning kan inte vilka hyfer som helst smälta samman. Det finns olika typer, till exempel "typ a" och "typ b".
- När hyfer smälter samman sker befruktning. Det diploida stadiet delas sedan direkt till det haploida igen.

Det könliga och det könlösa stadiet kan se mycket olika ut, och det har gjort klassificeringen svår. Levnadssättet kan också variera med miljön: ibland lever svampen som fria jästceller, ibland som hyfer.

## Basidiesvamparnas livscykel

1. Ett haploitt mycel (n) möter ett annat (n).
2. Mycelen går samman. Varje cell får två haploida cellkärnor (n + n).
3. Mycelet bildar en **fruktkropp**.
4. I fruktkroppens **basidier** sker befruktningen, och cellerna blir diploida (2n).
5. De diploida cellerna genomgår **meios**.
6. **Sporer** med haploida celler sprids.
7. Nytt mycel växer upp från sporerna.

> Hos svamparna är det diploida stadiet mycket kort. Nästan hela livet är cellkärnorna haploida (n eller n + n).

!> Hos fröväxterna är det tvärtom: moderplantan är diploid, och bara pollenkorn och äggcell är haploida.

## Svampar och människan

- **Medicin**: antibiotika.
- **Mat**: matsvampar.
- **Matproduktion**: bakning, jäsning, ost, vin och bröd.
- **Religion, kultur och historia**: psykedeliska svampar.`,
      check: {
        id: "d5-l4-k",
        q: "Var sker befruktningen hos basidiesvampar?",
        options: ["I mycelet under jord", "I fruktkroppens basidier", "I sporerna", "I trädets rötter"],
        answer: "I fruktkroppens basidier",
        explain: "Befruktningen sker i basidierna i fruktkroppen. Där genomgår de diploida cellerna sedan meios och bildar haploida sporer.",
        lesson: "d5-l4",
      },
    },
  ],
  cards: [
    { id: "d5-k01", front: "Vilket rike tillhör svamparna?", back: "Ett eget rike av eukaryota organismer. Svampar är inte växter.", lesson: "d5-l1" },
    { id: "d5-k02", front: "Heterotrof", back: "Organism som får sin näring från det som andra organismer har producerat.", lesson: "d5-l1" },
    { id: "d5-k03", front: "Kitin", back: "Ämnet i svamparnas cellväggar. Växter har cellulosa i stället.", lesson: "d5-l1" },
    { id: "d5-k04", front: "Hyfer", back: "Långa trådar av svampceller i rader.", lesson: "d5-l1" },
    { id: "d5-k05", front: "Mycel", back: "Samlingen av hyfer. Finns till största delen under jord.", lesson: "d5-l1" },
    { id: "d5-k06", front: "Fruktkropp", back: "Det svampen bildar för reproduktion och spridning av sporer. Räknas inte som vävnad.", lesson: "d5-l1" },
    { id: "d5-k07", front: "Hur många svamparter finns det?", back: "Cirka 150 000 är beskrivna. Uppskattningsvis finns 1,5–5 miljoner.", lesson: "d5-l2" },
    { id: "d5-k08", front: "Sporsäckssvampar", back: "En grupp svampar, till exempel murklor.", lesson: "d5-l2" },
    { id: "d5-k09", front: "Basidiesvampar", back: "En grupp svampar med bland annat matsvampar. Befruktningen sker i fruktkroppens basidier.", lesson: "d5-l2" },
    { id: "d5-k10", front: "Jästsvampar", back: "Svampar som är fakultativt anaeroba.", lesson: "d5-l2" },
    { id: "d5-k11", front: "Svamparnas fyra levnadssätt", back: "Nedbrytare, mutualister, parasiter och predatorer.", lesson: "d5-l2" },
    { id: "d5-k12", front: "Nedbrytande svampar", back: "Bryter ner död materia, även lignin, och bildar humus.", lesson: "d5-l2" },
    { id: "d5-k13", front: "Mykoser", back: "Sjukdomar hos människan som orsakas av parasitiska svampar.", lesson: "d5-l2" },
    { id: "d5-k14", front: "Mykorrhiza", back: "Svamprot: svampen ger vatten och mineralnäring, växten ger socker.", lesson: "d5-l3" },
    { id: "d5-k15", front: "Lav", back: "En svamp (mykobiont) och en fotobiont: en grönalg eller en blågrön bakterie.", lesson: "d5-l3" },
    { id: "d5-k16", front: "Fotobiont", back: "Lavens partner som gör fotosyntes: en grönalg eller en blågrön bakterie.", lesson: "d5-l3" },
    { id: "d5-k17", front: "Hur sprider mykorrhizan varningssignaler?", back: "Om en växt angrips av insekter för svampen signalen vidare till andra växter den är länkad med.", lesson: "d5-l3" },
    { id: "d5-k18", front: "Svamparnas könlösa förökning", back: "Med avknoppning eller med sporer.", lesson: "d5-l4" },
    { id: "d5-k19", front: "Basidiesvampens diploida stadium", back: "Kort: befruktningen sker i basidien, och cellerna genomgår direkt meios.", lesson: "d5-l4" },
    { id: "d5-k20", front: "Svampar och människan", back: "Antibiotika, matsvampar, bakning, jäsning, ost, vin och bröd.", lesson: "d5-l4" },
  ],
  quiz: [
    {
      id: "d5-q01", level: "E", lesson: "d5-l1",
      q: "Vilket rike tillhör svamparna?",
      options: ["Växtriket", "Djurriket", "Ett eget rike", "Bakterieriket"],
      answer: "Ett eget rike",
      explain: "Svamparna är ett eget rike av eukaryota organismer. De är inte växter, trots att de kan se ut så.",
    },
    {
      id: "d5-q02", level: "E", lesson: "d5-l1",
      q: "Vad kallas svampens långa trådar av celler?",
      options: ["Hyfer", "Sporer", "Trakeider", "Basidier"],
      answer: "Hyfer",
      explain: "Hyfer är långa trådar av svampceller i rader. Samlingen hyfer kallas mycel.",
    },
    {
      id: "d5-q03", level: "E", lesson: "d5-l1",
      q: "Vad är mycel?",
      options: ["Svampens sporer", "Samlingen av hyfer", "Svampens cellvägg", "En sorts lav"],
      answer: "Samlingen av hyfer",
      explain: "Mycelet är samlingen av hyfer och finns till största delen under jord.",
    },
    {
      id: "d5-q04", level: "E", lesson: "d5-l2",
      q: "Vilken grupp tillhör murklor?",
      options: ["Basidiesvampar", "Jästsvampar", "Algsvampar", "Sporsäckssvampar"],
      answer: "Sporsäckssvampar",
      explain: "Murklor är sporsäckssvampar. Många matsvampar i grönsakshyllan är basidiesvampar.",
    },
    {
      id: "d5-q05", level: "E", lesson: "d5-l2",
      q: "Vilket är **inte** ett av svamparnas fyra levnadssätt?",
      options: ["Nedbrytare", "Parasit", "Fotosyntetiserare", "Predator"],
      answer: "Fotosyntetiserare",
      explain: "Svampar är heterotrofer och gör inte fotosyntes. De fyra levnadssätten är nedbrytare, mutualister, parasiter och predatorer.",
    },
    {
      id: "d5-q06", level: "E", lesson: "d5-l3",
      q: "Vad betyder mykorrhiza?",
      options: ["Svamprot", "Svampspor", "Svampsjukdom", "Svamplav"],
      answer: "Svamprot",
      explain: "Mykorrhiza betyder svamprot: ett samarbete mellan svampmycel och växtrötter.",
    },
    {
      id: "d5-q07", level: "E", lesson: "d5-l3",
      q: "Vad består en lav av?",
      options: ["Två olika svampar som växer ihop", "En svamp och en mossa som samarbetar", "En växt och en bakterie som samarbetar", "En svamp och en grönalg eller blågrön bakterie"],
      answer: "En svamp och en grönalg eller blågrön bakterie",
      explain: "En lav är en svamp (mykobiont) tillsammans med en fotobiont, en grönalg eller en blågrön bakterie.",
    },
    {
      id: "d5-q08", level: "E", lesson: "d5-l4",
      q: "Hur förökar sig svampar könlöst?",
      options: ["Med frön och frukter", "Med avknoppning och sporer", "Med pollen och äggceller", "Med rotskott och stamdelar"],
      answer: "Med avknoppning och sporer",
      explain: "Svampar förökar sig könlöst med avknoppning och sporer. Frön och pollen hör till fröväxterna.",
    },
    {
      id: "d5-q09", level: "C", lesson: "d5-l1",
      q: "Hur skiljer sig svampar från växter i hur de får sin näring?",
      options: ["Svampar är heterotrofer, växter gör fotosyntes", "Svampar gör fotosyntes i mycelet", "Växter är heterotrofer, svampar gör fotosyntes", "Det finns ingen skillnad"],
      answer: "Svampar är heterotrofer, växter gör fotosyntes",
      explain: "Svampar får näring från det andra organismer har producerat. Växter bygger sin egen näring med fotosyntes.",
    },
    {
      id: "d5-q10", level: "C", lesson: "d5-l1",
      q: "Hur skiljer sig svamparnas anatomi från växternas?",
      options: ["Svampar har fyra vävnadstyper och kitin i cellväggen", "Svampar har cellulosa i cellväggen och saknar mycel", "Svampar saknar specifika vävnader och har kitin i cellväggen", "Svampar har xylem och floem men saknar cellvägg"],
      answer: "Svampar saknar specifika vävnader och har kitin i cellväggen",
      explain: "Svampar har kitin i cellväggen och inga specifika vävnader. Växter har cellulosa och fyra vävnadstyper.",
    },
    {
      id: "d5-q11", level: "C", lesson: "d5-l3",
      q: "Varför gynnas ett träd av mykorrhiza?",
      options: ["Svampen gör fotosyntes åt trädet nere i rötterna", "Mycelet ökar trädets upptagningsområde för vatten och näringsämnen", "Svampen tar bort överskottet av socker ur trädets rötter", "Mycelet ersätter trädets egna rötter helt och hållet"],
      answer: "Mycelet ökar trädets upptagningsområde för vatten och näringsämnen",
      explain: "Mycelet sträcker sig över stora områden och ökar trädets upptag av vatten och näring dramatiskt. Trädet betalar med socker.",
    },
    {
      id: "d5-q12", level: "C", lesson: "d5-l2",
      q: "Hur tar svampar upp näring?",
      options: ["De gör fotosyntes i mycelet och bygger sitt eget socker av koldioxid", "De tar upp hela bitar av död materia direkt genom hyfernas väggar", "De utsöndrar enzymer som bryter ner materia och tar upp de små bitarna", "De tar upp ljus och vatten genom fruktkropparna och bildar socker"],
      answer: "De utsöndrar enzymer som bryter ner materia och tar upp de små bitarna",
      explain: "Svampar utsöndrar enzymer som bryter ner materian utanför cellerna. Sedan tar de upp de små bitarna.",
    },
    {
      id: "d5-q13", level: "C", lesson: "d5-l3",
      q: "Laven räknas som mutualism. Vad gäller för parterna i en lav?",
      options: ["Svampen klarar sig inte utan fotobionten, men fotobionten klarar sig utan svampen", "Fotobionten klarar sig inte utan svampen, men svampen klarar sig utan fotobionten", "Ingen av parterna kan överleva en enda dag utan den andra", "Svampen gör fotosyntes och ger socker till algen eller bakterien"],
      answer: "Svampen klarar sig inte utan fotobionten, men fotobionten klarar sig utan svampen",
      explain: "Laven räknas som mutualism, men parterna är inte lika beroende av varandra. Svampen behöver fotobionten, medan algen eller bakterien kan överleva utan svampen.",
    },
    {
      id: "d5-q14", level: "C", lesson: "d5-l4",
      q: "Hur länge är en basidiesvamp diploid under sin livscykel?",
      options: ["Under hela livet, från spor till fruktkropp", "Bara kort, i basidien innan meiosen", "Bara som spor, innan mycelet växer", "Aldrig, svampar är alltid haploida"],
      answer: "Bara kort, i basidien innan meiosen",
      explain: "Befruktningen sker i basidien, och de diploida cellerna genomgår direkt meios. Sporerna och det första mycelet är haploida, och efter sammansmältningen har varje cell två haploida kärnor (n + n).",
    },
    {
      id: "d5-q15", level: "A", lesson: "d5-l4",
      q: "Vad är den största skillnaden mellan livscykeln hos svampar och hos fröväxter?",
      options: ["Hos svampar är det diploida stadiet långt, hos fröväxter är bara fröet diploitt", "Både svampar och fröväxter är haploida under hela sin livscykel", "Fröväxter förökar sig bara könlöst, svampar bara med befruktning", "Hos svampar är det diploida stadiet kort, hos fröväxter är den vuxna växten diploid"],
      answer: "Hos svampar är det diploida stadiet kort, hos fröväxter är den vuxna växten diploid",
      explain: "Svampens cellkärnor är haploida nästan hela livet, och det diploida stadiet delas direkt med meios. Fröväxternas moderplanta är diploid, och bara pollenkorn och äggcell är haploida.",
    },
    {
      id: "d5-q16", level: "A", lesson: "d5-l2",
      q: "Varför är det viktigt för ekosystemet att vissa svampar kan bryta ner lignin?",
      options: ["Lignin är vedämne som bara finns i barrträd, så svamparna skyddar lövträden", "Lignin behövs för fotosyntesen, så svamparna ger växterna mer lignin", "Lignin är giftigt för djur, så svamparna gör marken säker för dem", "Lignin gör ved hård och är svårt att bryta ner, så näringen i ved kan återföras"],
      answer: "Lignin gör ved hård och är svårt att bryta ner, så näringen i ved kan återföras",
      explain: "Lignin är vedämne, och det är extremt ovanligt att kunna bryta ner det. Svamparna gör att död ved bryts ner och att näringsämnena återförs till marken.",
    },
  ],
  practice: [
    {
      id: "d5-p1", kind: "order", level: "C", lesson: "d5-l4",
      q: "Sätt basidiesvamparnas livscykel i ordning.",
      steps: [
        "Ett haploitt mycel (n) möter ett annat (n)",
        "Mycelen går samman och varje cell får två haploida kärnor (n + n)",
        "Mycelet bildar en fruktkropp",
        "Befruktning sker i fruktkroppens basidier (2n)",
        "De diploida cellerna genomgår meios",
        "Haploida sporer sprids och växer till nytt mycel",
      ],
      explain: "Det diploida stadiet i basidien är kort. Meiosen ger direkt haploida sporer, som blir nytt mycel.",
    },
    {
      id: "d5-p2", kind: "self", level: "C", lesson: "d5-l1",
      q: "Hur skiljer sig svampar från växter när det gäller anatomin?",
      hint: "Tänk på cellväggen, vävnaderna och hur svampen är byggd.",
      solution: `- **Cellväggen**: svampar har **kitin**, växter har **cellulosa**.
- **Uppbyggnad**: en svamp består av **hyfer**, trådar av celler, som bildar ett **mycel**. Växter består av celler som sitter ihop i vävnader och organ.
- **Vävnader**: svampar har inga specifika vävnader. Växter har fyra vävnadstyper.
- **Kommunikation**: svampceller har porer mellan cellernas cytoplasma. Växtceller har plasmodesmer genom cellväggen.
- **Fruktkroppar**: svampen bildar fruktkroppar för sporerna. De räknas inte som vävnad.
- **Näring**: svampar är heterotrofer, växter gör fotosyntes.`,
    },
    {
      id: "d5-p3", kind: "self", level: "A", lesson: "d5-l4",
      q: "Hur skiljer sig svampar från fröväxter när det gäller livscykeln?",
      solution: `**Svampar** har inga ägg eller spermier. De förökar sig könlöst med sporer eller avknoppning. Hos basidiesvampar går två haploida mycel samman vid sexuell förökning, och cellerna får två haploida kärnor (n + n). Befruktningen sker i fruktkroppens basidier, och de diploida cellerna genomgår direkt meios. Haploida sporer sprids. Svampens cellkärnor är alltså **haploida nästan hela livet** (n eller n + n).

**Fröväxter** har en **diploid** moderplanta. Pollenkorn och äggcell bildas genom meios och är haploida. Efter befruktningen bildas en diploid zygot och ett frö med grodd (2n) och frövita (3n). Fröväxter sprids med **frön**, svampar med **sporer**.`,
    },
    {
      id: "d5-p4", kind: "text", level: "E", lesson: "d5-l1",
      q: "Vad heter ämnet i svamparnas cellväggar?",
      answer: ["kitin"],
      solution: "Svamparnas cellväggar innehåller **kitin**.",
    },
    {
      id: "d5-p5", kind: "text", level: "E", lesson: "d5-l1",
      q: "Vad kallas samlingen av hyfer?",
      answer: ["mycel", "mycelet", "mycelium"],
      solution: "Samlingen hyfer kallas **mycel**.",
    },
    {
      id: "d5-p6", kind: "text", level: "E", lesson: "d5-l3",
      q: "Vad kallas samarbetet mellan svampmycel och växtrötter?",
      answer: ["mykorrhiza"],
      solution: "Det kallas **mykorrhiza**, svamprot.",
    },
    {
      id: "d5-p7", kind: "text", level: "E", lesson: "d5-l3",
      q: "Vad kallas lavens partner som gör fotosyntes?",
      answer: ["fotobiont", "fotobionten"],
      solution: "Den kallas **fotobiont**. Svampen i laven kallas mykobiont.",
    },
  ],
  keyPoints: [
    "Svampar är ett eget rike av **eukaryota heterotrofer**, inte växter.",
    "Svampar har **kitin** i cellväggen (växter har cellulosa) och saknar specifika vävnader.",
    "**Hyfer** bildar ett **mycel**, mest under jord. **Fruktkroppen** sprider sporer.",
    "Fyra levnadssätt: **nedbrytare**, **mutualister**, **parasiter** och **predatorer**.",
    "**Mykorrhiza**: svampen ger vatten och mineralnäring, växten ger socker. En **lav** är en svamp och en grönalg eller blågrön bakterie.",
    "Basidiesvampens cellkärnor är haploida nästan hela livet (n eller n + n). Det diploida stadiet i **basidien** genomgår direkt **meios**.",
  ],
};
