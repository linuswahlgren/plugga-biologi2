/**
 * Del 4 · Växternas livscykel och förökning
 * Sources: Växtfysiologi del 3, bild 2–14 (bild 5: the labelled flower; bild 7: the angiosperm life
 * cycle with embryo 2n, endosperm 3n and seed coat 2n).
 * Decided 2026-11-16: the flower labels on bild 5 are taught from the material, not as supplements.
 * Correction applied (BUILD §8.4): male and female parts maturing at different times counteracts
 * self-pollination. Seed ploidy is written per part (see "Om materialet").
 * Supplementary: double fertilisation as a term, grodd, hjärtblad, mitos, genetic variation.
 */
import type { Week } from "../../../src/types.ts";

export const d4: Week = {
  id: "d4",
  exam: "prov1",
  title: "Växternas livscykel och förökning",
  summary:
    "Hur växter delas in, vad blommans delar heter, hur ett frö blir till och vilka strategier växter har för pollinering, spridning och förökning.",
  goals: [
    "förklara skillnaden mellan kladogram och fylogenetiskt träd",
    "namnge blommans delar",
    "beskriva fröväxternas livscykel och vilka stadier som är haploida och diploida",
    "förklara hur växter ökar sina chanser till pollinering, spridning och förökning",
  ],
  lessons: [
    {
      id: "d4-l1",
      title: "Systematik och växternas livslängd",
      minutes: 6,
      source: "Växtfysiologi del 3, bild 2–4",
      body: `Det finns enormt många växtarter. För att hålla ordning på dem behövs ett system.

## Systematik

**Systematik** är ett sätt att sortera organismer i olika grupper. För ungefär 300 år sedan började man kartlägga och namnge arter, med ett namn för släktet och ett för arten. **Carl von Linné** lade grunden för modern **taxonomi** och systematik.

- Ett **kladogram** visar hur arter förhåller sig till varandra, alltså vilka som är närmast släkt.
- Ett **fylogenetiskt träd** visar också släktskap, men innehåller dessutom information om tid eller genetisk förändring. Grenarnas längd betyder något.

Förr utgick man från organismernas **fenotyp**, alltså hur de ser ut. I dag kan man också få ett ”facit” med **molekylära data**.

> Kladogram och fylogenetiska träd visar båda släktskap. Bara det fylogenetiska trädet visar tid eller genetisk förändring med grenarnas längd.

## Hur länge lever växten?

Växter kan också delas in efter hur många år de blommar.

- **Annuell**: ettårig. Blommar bara under ett år, sedan dör plantan.
- **Bienn**: tvåårig. Lagrar vanligen stärkelse det första året, blommar det andra och dör sedan.
- **Perenn**: flerårig.

!> En bienn växt blommar inte två år i rad. Den blommar bara under sitt andra år.`,
      check: {
        id: "d4-l1-k",
        q: "Vad visar ett fylogenetiskt träd som ett kladogram inte visar?",
        options: ["Vilka arter som finns i ett område", "Tid eller genetisk förändring", "Bara växter, inte djur", "Hur arterna ser ut"],
        answer: "Tid eller genetisk förändring",
        explain: "Båda visar släktskap, men i ett fylogenetiskt träd betyder grenarnas längd tid eller genetisk förändring.",
        lesson: "d4-l1",
      },
    },
    {
      id: "d4-l2",
      title: "Blommans delar",
      minutes: 6,
      source: "Växtfysiologi del 3, bild 5",
      body: `Blomman är växtens organ för könlig förökning. Varje del har en uppgift.

## Gömfröiga växter

Blommande växter är **gömfröiga**: fröet ligger alltid inuti någon typ av **frukt**. Frukten kan vara torr och oätlig, som ett skal. Fröet utvecklas i pistillens **fruktämne**.

## Blommans delar

| Del | Vad den är |
| --- | --- |
| **Kronblad** | blommans blad, som bildar blomkronan |
| **Foderblad** | de små gröna bladen utanför kronbladen |
| **Ståndare** | blommans hanliga del, med **sträng** och **knapp** |
| **Knapp** | ståndarens övre del, där **pollenkorn** bildas |
| **Pistill** | blommans honliga del, med märke, stift och fruktämne |
| **Märke** | pistillens topp, där pollenkornen fastnar |
| **Stift** | den smala delen mellan märket och fruktämnet |
| **Fruktämne** | pistillens nedre del, där frukten utvecklas |
| **Fröämne** | sitter i fruktämnet och blir ett frö efter befruktningen |

> Ståndaren är blommans hanliga del, med sträng och knapp. Pistillen är den honliga delen, med märke, stift och fruktämne.

!> Pollenkornen bildas inte i märket. De bildas i ståndarnas knappar och fastnar sedan på märket.`,
      check: {
        id: "d4-l2-k",
        q: "Var bildas pollenkornen?",
        options: ["I pistillens märke", "I fruktämnets fröämne", "I ståndarnas knappar", "I pistillens stift"],
        answer: "I ståndarnas knappar",
        explain: "Pollenkornen bildas i ståndarnas knappar. Märket är pistillens topp, där pollenkornen fastnar.",
        lesson: "d4-l2",
      },
    },
    {
      id: "d4-l3",
      title: "Från pollenkorn till frö",
      minutes: 9,
      source: "Växtfysiologi del 3, bild 7",
      body: `Livscykeln visar hur en växt går från blomma till frö och tillbaka till blomma. Nyckeln är att hålla reda på kromosomtalen.

## Haploid och diploid

En cell är **diploid** (2n) när den har dubbel kromosomuppsättning, och **haploid** (n) när den har en enkel. Moderplantan, den blommande växten, är alltid diploid.

## Livscykeln steg för steg

1. I ståndarna bildas **pollenkorn** genom **meios**. De är haploida (n).
2. I pistillen bildas en **äggcell** genom meios. Den är haploid (n).
3. Pollenkornen sprids till pistillens märke med vinden eller med pollinerande insekter. Det kallas **pollinering**.
4. En **pollenslang** växer från pollenkornet ner till äggcellen.
5. Äggcellen **befruktas** av en **hancell** från pollenkornet. Det bildas en **zygot** (2n). Samtidigt bildas **endosperm**, frövita (3n).
6. Ett **frö** utvecklas i en frukt. Fröet består av **grodden** (embryot, 2n), **frövitan** (endospermen, 3n) och fröskalet (2n).
7. Fröet gror, och en ny diploid växt växer upp.

> Pollenkorn och äggcell är haploida (n). Moderplantan, zygoten och grodden är diploida (2n). Frövitan är triploid (3n).

+> **Dubbel befruktning**: pollenslangen för med sig två hanliga cellkärnor. Den ena befruktar äggcellen, och zygoten (2n) bildas. Den andra smälter samman med en annan cell i fröämnet, och det blir frövitan (3n), som är näring åt grodden. **Grodden** är den lilla växten i fröet. Den har ett eller två **hjärtblad**, groddens första blad, som ofta innehåller näring. När växten sedan växer delar sig cellerna med **mitos**, som ger nya celler med samma kromosomuppsättning.

!> Hela fröet är inte diploitt. Grodden och fröskalet är diploida, men frövitan är triploid (3n). Lektionsmaterialet skriver ”Frö utvecklas (2n)”, se Om materialet.`,
      check: {
        id: "d4-l3-k",
        q: "Hur bildas pollenkorn och äggceller?",
        options: ["Genom mitos", "Genom meios", "Genom befruktning", "Genom osmos"],
        answer: "Genom meios",
        explain: "Pollenkorn och äggceller bildas genom meios och blir haploida (n). Vid befruktningen bildas sedan en diploid zygot.",
        lesson: "d4-l3",
      },
    },
    {
      id: "d4-l4",
      title: "Pollinering och spridning",
      minutes: 6,
      source: "Växtfysiologi del 3, bild 8–13; Växtfysiologi och hållbar utveckling, bild 18",
      body: `En växt kan inte gå och leta efter en partner. I stället har växter olika strategier för att pollenet ska nå en annan blomma och för att fröna ska spridas.

## Pollinering

**Pollinering** är när pollen förs från ståndare till pistill.

- **Vind**: växten släpper ut mängder av pollenkorn, som innehåller de hanliga könscellerna. Vinden bär dem.
- **Insekter**: ett effektivt sätt att föra pollenkorn till andra blommors pistiller. Blommorna lockar vanligen med söt **nektar**, men också med speciella färger och former.
- **Däggdjur** kan också pollinera blommor.

Viktiga pollinatörer är till exempel bin, humlor, fjärilar och blomflugor. Om pollinatörerna blir färre får många växter svårare att föröka sig, och det kan minska den biologiska mångfalden.

> Vindpollinerade växter satsar på stora mängder pollen. Insektspollinerade växter lockar med nektar, färger och former.

## Spridning av frön

Fröna sprids på olika sätt:

- med **vind**
- med **vatten**
- med **djur och människor**, till exempel genom frukter som äts eller taggar som fastnar.

!> Pollinering och befruktning är inte samma sak. Pollineringen för pollenet till märket. Befruktningen sker först när pollenslangen har nått äggcellen.`,
      check: {
        id: "d4-l4-k",
        q: "Hur lockar insektspollinerade blommor till sig insekter?",
        options: ["Med mängder av pollen i vinden", "Med taggar", "Med vatten", "Med söt nektar, färger och former"],
        answer: "Med söt nektar, färger och former",
        explain: "Insektspollinerade blommor lockar med nektar, färger och former. Att släppa ut mängder av pollen är vindpollinerade växters strategi.",
        lesson: "d4-l4",
      },
    },
    {
      id: "d4-l5",
      title: "Könlig och könlös förökning",
      minutes: 6,
      source: "Växtfysiologi del 3, bild 6, 14",
      body: `Växter kan föröka sig utan blommor också. Då blir avkomman en kopia av föräldern.

## Två sätt att föröka sig

Växter kan föröka sig **könligt** eller **könlöst**.

- Vid **könlig förökning** bildas ett frö genom befruktning, som i lektionen Från pollenkorn till frö.
- **Könlös förökning** kallas också **vegetativ förökning**. Den resulterar alltid i en **klon** av moderplantan.

Vissa växter, till exempel **aspen**, har vegetativ förökning som huvudsaklig strategi för sin spridning.

## Hon, han eller båda?

- Vissa växter har både honliga och hanliga blommor eller delar.
- Andra växter har **honplantor** och **hanplantor**.
- En del växter kan **självpollinera** om vanlig pollinering inte sker.

> Könlös förökning ger alltid en klon av moderplantan. Könlig förökning sker genom befruktning och ger ett frö.

!> När honliga och hanliga delar mognar vid olika tidpunkter **motverkar** det självpollinering. Det ökar chansen att pollenet kommer från en annan växt. Se Om materialet.

+> Vid könlig förökning blandas arvsanlag från två föräldrar, så avkomman blir genetiskt olik. Det ökar den **genetiska variationen**.`,
      check: {
        id: "d4-l5-k",
        q: "Vad blir resultatet av vegetativ förökning?",
        options: ["Ett frö med ny genetisk kombination", "En haploid växt", "En korsning av två arter", "En klon av moderplantan"],
        answer: "En klon av moderplantan",
        explain: "Vegetativ, könlös förökning ger alltid en klon. Ett frö bildas bara vid könlig förökning.",
        lesson: "d4-l5",
      },
    },
  ],
  cards: [
    { id: "d4-k01", front: "Systematik", back: "Ett sätt att sortera organismer i olika grupper.", lesson: "d4-l1" },
    { id: "d4-k02", front: "Carl von Linné", back: "Lade grunden för modern taxonomi och systematik.", lesson: "d4-l1" },
    { id: "d4-k03", front: "Kladogram", back: "Visar hur arter förhåller sig till varandra, alltså vilka som är närmast släkt.", lesson: "d4-l1" },
    { id: "d4-k04", front: "Fylogenetiskt träd", back: "Visar släktskap och dessutom tid eller genetisk förändring med grenarnas längd.", lesson: "d4-l1" },
    { id: "d4-k05", front: "Annuell", back: "Ettårig växt som blommar ett år och sedan dör.", lesson: "d4-l1" },
    { id: "d4-k06", front: "Bienn", back: "Tvåårig växt som lagrar stärkelse första året, blommar andra året och sedan dör.", lesson: "d4-l1" },
    { id: "d4-k07", front: "Perenn", back: "Flerårig växt.", lesson: "d4-l1" },
    { id: "d4-k08", front: "Gömfröiga växter", back: "Växter vars frö alltid ligger inuti någon typ av frukt.", lesson: "d4-l2" },
    { id: "d4-k09", front: "Ståndare", back: "Blommans hanliga del, med sträng och knapp. I knappen bildas pollenkorn.", lesson: "d4-l2" },
    { id: "d4-k10", front: "Pistill", back: "Blommans honliga del, med märke, stift och fruktämne.", lesson: "d4-l2" },
    { id: "d4-k11", front: "Märke", back: "Pistillens topp, där pollenkornen fastnar.", lesson: "d4-l2" },
    { id: "d4-k12", front: "Fruktämne", back: "Pistillens nedre del, med fröämnena. Här utvecklas frukten.", lesson: "d4-l2" },
    { id: "d4-k13", front: "Fröämne", back: "Sitter i fruktämnet och blir ett frö efter befruktningen.", lesson: "d4-l2" },
    { id: "d4-k14", front: "Haploid och diploid", back: "Haploid (n): enkel kromosomuppsättning. Diploid (2n): dubbel.", lesson: "d4-l3" },
    { id: "d4-k15", front: "Meios", back: "Celldelningen som bildar haploida celler, till exempel pollenkorn och äggceller.", lesson: "d4-l3" },
    { id: "d4-k16", front: "Pollenslang", back: "Växer från pollenkornet ner till äggcellen, så att befruktning kan ske.", lesson: "d4-l3" },
    { id: "d4-k17", front: "Zygot", back: "Den befruktade äggcellen. Den är diploid (2n).", lesson: "d4-l3" },
    { id: "d4-k18", front: "Frövita (endosperm)", back: "Del av fröet som bildas vid befruktningen. Den är triploid (3n).", lesson: "d4-l3" },
    { id: "d4-k19", front: "Grodd", back: "Den lilla växten, embryot, i fröet. Den är diploid (2n).", lesson: "d4-l3" },
    { id: "d4-k20", front: "Hjärtblad", back: "Groddens första blad, ett eller två, som ofta innehåller näring.", lesson: "d4-l3", supplement: true },
    { id: "d4-k21", front: "Pollinering", back: "När pollen förs från ståndare till pistill, med vind, insekter eller däggdjur.", lesson: "d4-l4" },
    { id: "d4-k22", front: "Hur sprids frön?", back: "Med vind, vatten eller djur och människor, till exempel genom frukter och taggar.", lesson: "d4-l4" },
    { id: "d4-k23", front: "Vegetativ förökning", back: "Könlös förökning som alltid ger en klon av moderplantan.", lesson: "d4-l5" },
    { id: "d4-k24", front: "Hur motverkar en växt självpollinering?", back: "Honliga och hanliga delar mognar vid olika tidpunkter.", lesson: "d4-l5" },
  ],
  quiz: [
    {
      id: "d4-q01", level: "E", lesson: "d4-l1",
      q: "Vad är systematik?",
      options: ["Ett sätt att sortera organismer i grupper", "Läran om hur celler delar sig", "Ett sätt att mäta växters ålder", "Läran om hur ämnen rör sig i ekosystem"],
      answer: "Ett sätt att sortera organismer i grupper",
      explain: "Systematik sorterar organismer i grupper, till exempel efter släktskap. Kladogram och fylogenetiska träd är verktyg för det.",
    },
    {
      id: "d4-q02", level: "E", lesson: "d4-l1",
      q: "Vad kallas en växt som lever i två år och blommar det andra året?",
      options: ["Annuell", "Bienn", "Perenn", "Gömfröig"],
      answer: "Bienn",
      explain: "En bienn växt lagrar stärkelse första året, blommar andra året och dör sedan. Annuell är ettårig, perenn flerårig.",
    },
    {
      id: "d4-q03", level: "E", lesson: "d4-l1",
      q: "Vad är en perenn växt?",
      options: ["En ettårig växt", "En tvåårig växt", "En flerårig växt", "En växt utan blommor"],
      answer: "En flerårig växt",
      explain: "Perenn betyder flerårig. En ettårig växt är annuell och en tvåårig bienn.",
    },
    {
      id: "d4-q04", level: "E", lesson: "d4-l2",
      q: "Vilka delar består ståndaren av?",
      options: ["Märke och stift", "Fruktämne och fröämne", "Kronblad och foderblad", "Sträng och knapp"],
      answer: "Sträng och knapp",
      explain: "Ståndaren består av sträng och knapp. Märke, stift och fruktämne hör till pistillen.",
    },
    {
      id: "d4-q05", level: "E", lesson: "d4-l2",
      q: "Var fastnar pollenkornen när en blomma pollineras?",
      options: ["På märket", "I knappen", "På foderbladen", "I fröämnet"],
      answer: "På märket",
      explain: "Pollenkornen fastnar på pistillens märke. De bildas i knappen.",
    },
    {
      id: "d4-q06", level: "E", lesson: "d4-l2",
      q: "Var sker fröets utveckling hos gömfröiga växter?",
      options: ["I ståndarens knapp", "I pistillens fruktämne", "I ståndarens sträng", "I blommans kronblad"],
      answer: "I pistillens fruktämne",
      explain: "Utvecklingen sker i pistillens fruktämne, där fröämnena sitter. Därför ligger fröet till slut i en frukt.",
    },
    {
      id: "d4-q07", level: "E", lesson: "d4-l3",
      q: "Hur många kromosomuppsättningar har en diploid cell?",
      options: ["En", "Tre", "Två", "Fyra"],
      answer: "Två",
      explain: "Diploid (2n) betyder dubbel kromosomuppsättning. Haploid (n) är en enkel uppsättning.",
    },
    {
      id: "d4-q08", level: "E", lesson: "d4-l3",
      q: "Vad växer från pollenkornet ner till äggcellen?",
      options: ["Fröämnet", "Strängen", "Märket", "Pollenslangen"],
      answer: "Pollenslangen",
      explain: "Pollenslangen växer från pollenkornet på märket ner till äggcellen, så att befruktning kan ske.",
    },
    {
      id: "d4-q09", level: "E", lesson: "d4-l4",
      q: "Hur sprids pollen hos vindpollinerade växter?",
      options: ["Växten släpper ut mängder av pollenkorn som vinden bär", "Insekter som lockas av nektar bär pollenet till pistillen", "Pollenet sprids med regnvatten från blomma till blomma", "Pollenet stannar i samma blomma och pollinerar den"],
      answer: "Växten släpper ut mängder av pollenkorn som vinden bär",
      explain: "Vindpollinerade växter släpper ut mängder av pollenkorn. Insektspollinerade växter lockar i stället med nektar, färger och former.",
    },
    {
      id: "d4-q10", level: "E", lesson: "d4-l5",
      q: "Vad kallas könlös förökning hos växter?",
      options: ["Pollinering", "Vegetativ förökning", "Befruktning", "Meios"],
      answer: "Vegetativ förökning",
      explain: "Könlös förökning kallas vegetativ förökning och ger alltid en klon. Pollinering och befruktning hör till den könliga förökningen.",
    },
    {
      id: "d4-q11", level: "C", lesson: "d4-l1",
      q: "Vad skiljer ett fylogenetiskt träd från ett kladogram?",
      options: ["Bara kladogrammet visar hur arterna är släkt med varandra", "Det fylogenetiska trädet visar även tid eller genetisk förändring", "Det fylogenetiska trädet visar bara växter, inte djur", "Det finns ingen skillnad, de visar samma information"],
      answer: "Det fylogenetiska trädet visar även tid eller genetisk förändring",
      explain: "Båda visar släktskap. I det fylogenetiska trädet betyder grenarnas längd dessutom tid eller genetisk förändring.",
    },
    {
      id: "d4-q12", level: "C", lesson: "d4-l3",
      q: "Vilket kromosomtal har frövitan (endospermen)?",
      options: ["n", "2n", "3n", "4n"],
      answer: "3n",
      explain: "Frövitan är triploid (3n). Grodden och fröskalet är diploida (2n).",
    },
    {
      id: "d4-q13", level: "C", lesson: "d4-l3",
      q: "Vilka celler i blomväxtens livscykel är haploida?",
      options: ["Pollenkorn och äggcell", "Zygot och grodd", "Moderplantans celler", "Frövitans celler"],
      answer: "Pollenkorn och äggcell",
      explain: "Pollenkorn och äggcell bildas genom meios och är haploida (n). Moderplantan, zygoten och grodden är diploida, och frövitan är triploid.",
    },
    {
      id: "d4-q14", level: "C", lesson: "d4-l4",
      q: "Vad är skillnaden mellan pollinering och befruktning?",
      options: ["Pollinering är när hancellen och äggcellen smälter samman i fröämnet", "Befruktningen sker först, och sedan förs pollenet till märket", "Det är samma sak, båda orden betyder att ett frö bildas", "Pollinering för pollen till märket, befruktning sker när hancellen når äggcellen"],
      answer: "Pollinering för pollen till märket, befruktning sker när hancellen når äggcellen",
      explain: "Först pollineras blomman: pollen hamnar på märket. Sedan växer pollenslangen ner, och befruktningen sker vid äggcellen.",
    },
    {
      id: "d4-q15", level: "A", lesson: "d4-l5",
      q: "Alla aspar i ett stort bestånd har exakt samma arvsanlag. Vilken förklaring är rimligast?",
      options: ["De har pollinerats av samma insekt och fått samma pollen", "De har samma frövita, och därför samma arvsanlag", "De är annuella och dör samma år som de blommar", "De har spridit sig med vegetativ förökning och är kloner"],
      answer: "De har spridit sig med vegetativ förökning och är kloner",
      explain: "Aspen sprider sig främst med vegetativ förökning, och den ger alltid kloner av moderplantan. Vid könlig förökning hade plantorna inte varit kloner.",
    },
    {
      id: "d4-q16", level: "C", lesson: "d4-l5",
      q: "Hur kan en växt motverka självpollinering?",
      options: ["Honliga och hanliga delar mognar vid olika tidpunkter", "Den släpper ut mindre pollen än andra växter", "Den saknar märke, så pollenet inte kan fastna", "Den blommar bara på natten när insekterna sover"],
      answer: "Honliga och hanliga delar mognar vid olika tidpunkter",
      explain: "Om han- och hondelarna mognar vid olika tidpunkter blir det svårare för blomman att pollinera sig själv. Då ökar chansen att pollenet kommer från en annan växt.",
    },
    {
      id: "d4-q17", level: "C", lesson: "d4-l2",
      q: "Varför kallas blommande växter gömfröiga?",
      options: ["Fröna gömmer sig i jorden tills de gror", "De saknar synliga blommor och kronblad", "Fröet ligger alltid inuti en frukt", "Fröna bildas inne i växtens rötter"],
      answer: "Fröet ligger alltid inuti en frukt",
      explain: "Hos gömfröiga växter ligger fröet alltid inuti någon typ av frukt, som kan vara torr och oätlig som ett skal.",
    },
    {
      id: "d4-q18", level: "C", lesson: "d4-l4",
      q: "Varför har insektspollinerade blommor ofta nektar och särskilda färger?",
      options: ["För att skydda sig mot insekter som äter blommorna", "För att locka insekter som för pollen till andra blommor", "För att vinden lättare ska hitta och bära pollenet", "För att fröna ska gro snabbare när de hamnar i jorden"],
      answer: "För att locka insekter som för pollen till andra blommor",
      explain: "Nektar, färger och former lockar insekter. När insekterna besöker flera blommor förs pollen till andra blommors pistiller.",
    },
    {
      id: "d4-q19", level: "A", lesson: "d4-l4",
      q: "Vad kan hända med insektspollinerade växter om antalet pollinatörer minskar kraftigt?",
      options: ["De börjar göra mer fotosyntes", "De blir vindpollinerade i stället", "De får svårare att föröka sig könligt", "Ingenting händer med växterna"],
      answer: "De får svårare att föröka sig könligt",
      explain: "Utan pollinatörer når pollenet inte andra blommors pistiller. Då får växterna svårare att bilda frön, och den biologiska mångfalden kan minska.",
    },
    {
      id: "d4-q20", level: "C", lesson: "d4-l3",
      q: "En växt har 24 kromosomer i sina vanliga celler (2n = 24). Hur många kromosomer har ett pollenkorn från växten?",
      options: ["24", "36", "48", "12"],
      answer: "12",
      explain: "Pollenkorn bildas genom meios och är haploida (n). Om 2n = 24 är n = 12. Frövitan (3n) skulle ha 36.",
    },
  ],
  practice: [
    {
      id: "d4-p1", kind: "label", level: "E", lesson: "d4-l2", diagram: "flower",
      q: "Namnge blommans delar.",
      markers: [
        { n: 1, answer: "Kronblad" },
        { n: 2, answer: "Foderblad" },
        { n: 3, answer: "Knapp" },
        { n: 4, answer: "Sträng" },
        { n: 5, answer: "Märke" },
        { n: 6, answer: "Stift" },
        { n: 7, answer: "Fruktämne" },
        { n: 8, answer: "Fröämne" },
      ],
      distractors: ["Pollenslang"],
      hint: "Pistillen står i mitten: märket överst, sedan stift och fruktämne. Ståndarna står runt den.",
    },
    {
      id: "d4-p2", kind: "order", level: "C", lesson: "d4-l3",
      q: "Sätt blomväxtens livscykel i ordning.",
      steps: [
        "Pollenkorn bildas genom meios i ståndarnas knappar",
        "Pollenkornen förs till pistillens märke",
        "En pollenslang växer ner till äggcellen",
        "Äggcellen befruktas och en zygot (2n) bildas",
        "Ett frö med grodd och frövita utvecklas",
        "Fröet gror och blir en ny diploid växt",
      ],
      explain: "Meiosen ger haploida pollenkorn. Efter pollinering och befruktning bildas en diploid zygot, som blir grodden i fröet.",
    },
    {
      id: "d4-p3", kind: "self", level: "C", lesson: "d4-l3",
      q: "Redogör för fröväxternas livscykel. I vilka steg är cellerna haploida och diploida?",
      hint: "Börja med moderplantan och följ pollenkornet och äggcellen.",
      solution: `1. Moderplantan är **diploid (2n)**.
2. I ståndarnas knappar bildas **pollenkorn** genom meios. De är **haploida (n)**.
3. I pistillen bildas en **äggcell** genom meios. Den är **haploid (n)**.
4. Pollenkornen förs till märket (pollinering), och en pollenslang växer ner till äggcellen.
5. Vid befruktningen bildas en **zygot (2n)** och **frövita (3n)**.
6. Fröet består av grodd (2n), frövita (3n) och fröskal (2n). Det gror till en ny diploid växt.

Pollenkornen (med hancellerna) och äggcellen är haploida. Frövitan är triploid (3n), allt annat är diploitt.`,
    },
    {
      id: "d4-p4", kind: "self", level: "A", lesson: "d4-l4",
      q: "Hur kan en växt öka sina chanser till könlig förökning? Ge minst tre exempel.",
      solution: `- **Vindpollinering**: släppa ut stora mängder pollenkorn.
- **Insektspollinering**: locka insekter med nektar, färger och former, så att pollen förs till andra blommor.
- **Pollinering med däggdjur**.
- Låta honliga och hanliga delar **mogna vid olika tidpunkter**, så att självpollinering motverkas och pollenet kommer från en annan växt.
- Kunna **självpollinera** om vanlig pollinering inte sker.
- Dessutom: frön som sprids med **vind, vatten eller djur** ökar chansen att nya plantor etablerar sig.`,
    },
    {
      id: "d4-p5", kind: "number", level: "E", lesson: "d4-l3",
      q: "Hur många kromosomuppsättningar har frövitan (endospermen)?",
      answer: 3,
      solution: "Frövitan är **triploid (3n)**. Grodden och fröskalet är diploida (2n).",
    },
    {
      id: "d4-p6", kind: "text", level: "E", lesson: "d4-l2",
      q: "Vad heter pistillens topp, där pollenkornen fastnar?",
      answer: ["märke", "märket"],
      solution: "Pistillens topp heter **märket**.",
    },
    {
      id: "d4-p7", kind: "text", level: "E", lesson: "d4-l1",
      q: "Vad kallas en växt som blommar ett år och sedan dör?",
      answer: ["annuell", "ettårig"],
      solution: "En ettårig växt kallas **annuell**.",
    },
    {
      id: "d4-p8", kind: "text", level: "E", lesson: "d4-l5",
      q: "Vad kallas en avkomma som är genetiskt identisk med moderplantan?",
      answer: ["klon", "en klon"],
      solution: "Den kallas en **klon**. Vegetativ förökning ger alltid kloner.",
    },
  ],
  keyPoints: [
    "Ett **kladogram** visar släktskap. Ett **fylogenetiskt träd** visar dessutom tid eller genetisk förändring.",
    "**Annuell** = ettårig, **bienn** = tvåårig (blommar år två), **perenn** = flerårig.",
    "**Ståndaren** (sträng och knapp) är blommans hanliga del. **Pistillen** (märke, stift och fruktämne) är den honliga.",
    "Pollenkorn och äggcell bildas genom **meios** och är haploida (n). Moderplantan och zygoten är diploida (2n).",
    "I fröet är grodden 2n, **frövitan 3n** och fröskalet 2n.",
    "Pollinering sker med **vind**, **insekter** eller **däggdjur**. Frön sprids med vind, vatten och djur.",
    "**Vegetativ förökning** ger alltid en **klon**. Olika mognadstid för han- och hondelar **motverkar** självpollinering.",
  ],
};
