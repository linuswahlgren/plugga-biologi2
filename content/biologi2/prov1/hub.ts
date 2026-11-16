/**
 * Prov 1 (already written, shown as "Repetera"). Reading list and lectures are verbatim from
 * "Begrepp, läsanvisningar och frågor inför prov 2026". The 17 study questions are the document's,
 * with small wording fixes; the model answers are written from the lesson material.
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
      corrected: "Albedo är hur stor del av det inkommande solljuset som reflekteras. Isen reflekterar en stor del av solljuset.",
    },
    {
      where: "Växthuseffekten (Växtfysiologi och hållbar utveckling, bild 11)",
      material: "Värmestrålningen ”reflekteras” tillbaka till rymden.",
      corrected: "Jorden **sänder ut** värmestrålning. Växthusgaserna tar upp en del av den och strålar ut den igen, så att en del av värmen stannar kvar.",
    },
    {
      where: "Fröets kromosomtal (Växtfysiologi del 3, bild 7)",
      material: "”Frö utvecklas (2n)”.",
      corrected: "Fröet har delar med olika kromosomtal: grodden (embryot) är diploid (2n), frövitan triploid (3n) och fröskalet diploid (2n). Så visar också bilden på samma bild.",
    },
  ],
  studyQuestions: [
    {
      id: "prov1-iq01",
      n: 1,
      level: "E",
      q: "Vad finns det för likheter och skillnader mellan en växtcell och en djurcell?",
      refs: ["d1-l1", "d1-l5"],
      modelAnswer: `**Likheter:** både växtceller och djurceller omges av ett **cellmembran** som styr vad som kommer in och ut. Innanför finns **cytoplasma** med organeller, till exempel **cellkärna** och **mitokondrier**.

**Skillnader:** bara växtcellen har

- **kloroplaster**, där fotosyntesen sker,
- en **cellvägg** av cellulosa och hemicellulosa, ibland med lignin, som ger stadga,
- **plasmodesmer**, kanaler genom cellväggen som förbinder grannceller,
- en **stor vakuol** som lagrar vatten.

Cellväggen och vakuolen förklarar varför en växtcell inte spricker i en hypoton lösning. Vakuolen fylls och trycker mot cellväggen, och det ger **turgortryck**. En djurcell saknar cellvägg och kan spricka.`,
    },
    {
      id: "prov1-iq02",
      n: 2,
      level: "E",
      q: "Vad heter de olika vävnadstyperna hos kärlväxter, och hur kan de karaktäriseras?",
      refs: ["d2-l1", "d2-l2", "d2-l3"],
      modelAnswer: `Alla kärlväxter har fyra vävnadstyper:

- **Epidermis** är växtens hud, det yttersta lagret.
- **Grundvävnad** kan vara mjuk, med tunna cellväggar, eller hård och fungera som stödjevävnad. I bladen sköter den fotosyntesen och lagrar det som bildas.
- **Ledningsvävnad** består av **xylem** och **floem**. Xylemet (veddelen) är döda celler, trakeider och kärl, som leder vatten och oorganiska ämnen. Floemet (sildelen) är levande silceller och följeceller som leder socker och organiska ämnen.
- **Delningsvävnad** (meristem) är där cellerna delar sig, så att växten kan växa på längden och bredden. Ett meristem finns bakom rotspetsen, och kambiet mellan ved och bark är också ett meristem.

Vävnaderna bygger upp växtens organ: blad, stam och rot.`,
    },
    {
      id: "prov1-iq03",
      n: 3,
      level: "E",
      q: "Vad är hjärtblad för något?",
      refs: ["d4-l3"],
      modelAnswer: `+> **Hjärtblad** är groddens första blad. Grodden är den lilla växten, embryot, som finns i fröet. Hjärtbladen finns alltså redan i fröet och kommer upp först när fröet gror.

+> Beroende på art har grodden ett eller två hjärtblad. De innehåller ofta näring som den unga plantan använder innan den har fått egna gröna blad och kan göra fotosyntes. Hos andra växter finns näringen i stället i frövitan, som är triploid (3n).

+> Hjärtbladen är alltså inte samma sak som växtens vanliga blad, som bildas senare när plantan växer.

Hjärtbladen tas inte upp i lektionsmaterialet. Jämför med kursboken.`,
    },
    {
      id: "prov1-iq04",
      n: 4,
      level: "E",
      q: "Vad är floem och xylem?",
      refs: ["d2-l3", "d2-l4", "d2-l5"],
      modelAnswer: `Xylem och floem är växtens **ledningsvävnad**. De finns överallt i växten, från de finaste rötterna till bladens spetsar, ungefär som våra blodkärl.

**Xylem** (veddelen) är ett rörsystem av **döda celler**: smala **trakeider** och stora **kärl**. Barrträd har bara trakeider. Xylemet leder **vatten och oorganiska ämnen**, som joner, från rötterna upp till bladen. Transporten drivs av rottryck, vattenpelaren och transpirationen.

**Floem** (sildelen) består av **levande celler**: **silceller** utan cellkärna och **följeceller** med cellkärna. Floemet leder **socker och organiska ämnen**, till exempel aminosyror, från bladen till de delar som behöver dem. Transporten förklaras med tryckströmsteorin.

I stammen ligger xylemet innanför kambiet. Floemet ligger utanför kambiet och är barkens innersta, levande lager.`,
    },
    {
      id: "prov1-iq05",
      n: 5,
      level: "C",
      q: "Hur fungerar växters transport av organiska ämnen?",
      refs: ["d2-l5"],
      modelAnswer: `Organiska ämnen, som socker och aminosyror, transporteras i **floemet**. Sockret bildas vid fotosyntesen i bladen och måste nå växtens andra delar. Transporten förklaras med **tryckströmsteorin**:

1. Socker förs från följecellerna in i bladets **silceller** med **aktiv transport**, som kostar ATP.
2. Sockerkoncentrationen i silcellerna blir hög, så vatten strömmar in med **osmos**.
3. Trycket i silcellerna blir högt, och sockervätskan pressas framåt i floemet.
4. Där sockret behövs transporteras det aktivt ut ur silcellerna.
5. Vattnet följer med ut, trycket minskar, och mer sockervätska kan strömma dit.

Det är alltså en tryckskillnad mellan bladen och de delar som tar emot sockret som driver flödet.`,
    },
    {
      id: "prov1-iq06",
      n: 6,
      level: "C",
      q: "Hur fungerar växters transport av oorganiska ämnen?",
      refs: ["d2-l3", "d2-l4"],
      modelAnswer: `Oorganiska ämnen, som vatten och joner, transporteras i **xylemet**. Tre saker samverkar:

1. **Rottryck.** Rötterna tar upp joner med **aktiv transport**, som kräver ATP. Rotcellerna pumpar ut vätejoner, så att positiva metalljoner från marken kan ta sig in. Koncentrationen av lösta ämnen blir högre i roten än utanför, och vatten strömmar in med **osmos**. Vattnet pressas uppåt.
2. **Vattenpelaren.** Vattenmolekylerna är dipoler och hålls ihop av **vätebindningar**. Därför bildar vattnet en sammanhängande pelare i xylemet.
3. **Transpiration.** Vatten avdunstar genom bladens **klyvöppningar**, och det suger upp nytt vatten genom pelaren. Energin kommer från solljuset.

I ett högt träd räcker inte rottrycket ensamt. Då behövs transpirationen och vattenpelaren. Själva vattentransporten i stammen är inte aktiv transport.`,
    },
    {
      id: "prov1-iq07",
      n: 7,
      level: "A",
      q: "Vad händer om man ringbarkar ett träd?",
      refs: ["d2-l5"],
      modelAnswer: `Att **ringbarka** är att skära bort en ring av bark runt hela stammen.

Barken består av flera lager, och det innersta är det levande floemet. Därför följer floemet med när barken tas bort. Xylemet, veden, ligger innanför kambiet och blir kvar.

- **Sockertransporten stoppas.** Socker från fotosyntesen i bladen kan inte längre nå rötterna.
- **Vattentransporten fortsätter en tid.** Xylemet är kvar, så vatten och joner kan fortfarande ledas upp till bladen.
- **Rötterna svälter.** Utan socker från bladen får rötterna ingen energi.

Därför dör trädet, men ofta inte direkt. Det kan se friskt ut en tid innan det dör.`,
    },
    {
      id: "prov1-iq08",
      n: 8,
      level: "C",
      q: "Vad händer vid fotosystem II respektive fotosystem I?",
      refs: ["d3-l2"],
      modelAnswer: `Båda fotosystemen sitter i **tylakoidmembranet**. De är komplex av proteiner och klorofyll, med ett reaktionscentrum som omges av ljusinfångande antenner.

**Fotosystem II** (680 nm):

- Klorofyll a i reaktionscentret tar upp ljus, och två elektroner flyttas bort till en elektronacceptor.
- Reaktionscentret tar nya elektroner från **vatten**. Vattnet spjälkas till **syrgas**, vätejoner och elektroner.
- Vätejonkoncentrationen i **lumen** ökar.

Elektronerna går sedan via **elektrontransportkedjan** till fotosystem I.

**Fotosystem I** (700 nm):

- Klorofyll a tar upp ljus igen och ger elektronerna ny energi.
- En elektronacceptor för elektronerna till **NADP^+^** i stroma, som reduceras till **NADPH**.

NADPH används sedan i Calvincykeln, tillsammans med ATP.`,
    },
    {
      id: "prov1-iq09",
      n: 9,
      level: "C",
      q: "Hur fungerar elektrontransportkedjan?",
      refs: ["d3-l2", "d3-l3"],
      modelAnswer: `**Elektrontransportkedjan** sitter i tylakoidmembranet, mellan fotosystem II och fotosystem I.

1. Ljus flyttar elektroner från fotosystem II. De ersätts med elektroner från vatten som spjälkas.
2. Elektronerna förs genom elektrontransportkedjan till fotosystem I.
3. På vägen för elektronerna in **vätejoner** (protoner) i tylakoidens insida, **lumen**. Tillsammans med vätejonerna från vattnet ger det en hög vätejonkoncentration i lumen.
4. Koncentrationsskillnaden bygger upp en **membranpotential** över tylakoidmembranet.
5. Vätejonerna strömmar tillbaka ut genom **ATP-syntas**, och då bildas **ATP**.

Elektrontransportkedjan kopplar alltså ihop de två fotosystemen och skapar förutsättningen för att ATP ska bildas. ATP används sedan i Calvincykeln.`,
    },
    {
      id: "prov1-iq10",
      n: 10,
      level: "C",
      q: "Hur ”samverkar” ljusreaktionerna med mörkerreaktionen?",
      refs: ["d3-l1", "d3-l3", "d3-l4"],
      modelAnswer: `Fotosyntesens två steg behöver varandra.

**Ljusreaktionerna** sker i tylakoiderna. De fångar ljusenergi, spjälkar vatten till syrgas och bildar två energirika molekyler: **ATP** och vätebäraren **NADPH**.

**Mörkerreaktionen** (Calvincykeln, koldioxidfixeringen) sker i stroma och använder ATP och NADPH:

- Enzymet **rubisco** binder koldioxid till ett socker med 5 kolatomer.
- Molekylen delas i två molekyler med 3 kolatomer.
- Med väte från NADPH och energi från ATP bildas socker med 6 kolatomer.

Calvincykeln lämnar tillbaka **ADP** och **NADP^+^** till ljusreaktionerna, som laddar dem igen. Cirkeln är sluten. Därför sker även mörkerreaktionen i praktiken när det är ljust: utan ljus blir det ingen ATP eller NADPH.`,
    },
    {
      id: "prov1-iq11",
      n: 11,
      level: "A",
      q: "Hur fungerar fotosyntesen hos C4-växter och CAM-växter?",
      refs: ["d3-l5"],
      modelAnswer: `Vanliga **C3-växter** använder bara Calvincykeln, behöver mycket koldioxid och klarar inte höga temperaturer. C4- och CAM-växter har ett extra steg.

**C4-växter** behöver mycket solljus och klarar höga temperaturer och låga koldioxidhalter:

1. De yttre cellerna, **mesofyllcellerna**, binder koldioxid till en förening med 3 kolatomer. Det blir en molekyl med 4 kolatomer.
2. I de inre cellerna, bundle sheath-cellerna, tas koldioxiden loss och förs in i Calvincykeln. Det kräver ATP.

Enzymerna är **PEP-karboxylas** och **rubisco**.

**CAM-växter** klarar mycket torra och varma klimat. Deras få klyvöppningar öppnas bara på **natten**. Då lagras koldioxiden som **äppelsyra** i vakuolen, och på dagen används den i Calvincykeln.

C4-växter skiljer stegen åt i olika celler, CAM-växter mellan natt och dag.`,
    },
    {
      id: "prov1-iq12",
      n: 12,
      level: "C",
      q: "Redogör för fröväxternas livscykel. I vilka steg är cellerna haploida respektive diploida?",
      refs: ["d4-l3", "d4-l2", "d4-l4"],
      modelAnswer: `1. Moderplantan, den blommande växten, är **diploid (2n)**.
2. I ståndarnas knappar bildas **pollenkorn** genom **meios**. De är **haploida (n)**.
3. I pistillen bildas en **äggcell** genom meios. Den är **haploid (n)**.
4. Vid **pollineringen** förs pollenkornen till pistillens märke med vind, insekter eller däggdjur.
5. En **pollenslang** växer ner till äggcellen.
6. Vid **befruktningen** smälter en hancell (n) samman med äggcellen (n). Det blir en **zygot (2n)**. Samtidigt bildas **frövita** (endosperm, 3n).
7. Fröet utvecklas i en frukt. **Grodden** (embryot) är diploid (2n), frövitan triploid (3n) och fröskalet diploid (2n).
8. Fröet gror, och grodden växer till en ny diploid växt.

Sammanfattning: bara pollenkornen (med hancellerna) och äggcellen är haploida. Resten av livscykeln är diploid, utom frövitan som är triploid.`,
    },
    {
      id: "prov1-iq13",
      n: 13,
      level: "C",
      q: "Hur skiljer sig svampar från växter med avseende på deras anatomi?",
      refs: ["d5-l1"],
      modelAnswer: `- **Cellväggen:** svampar har **kitin** i cellväggen, växter har **cellulosa**.
- **Uppbyggnad:** en svamp består av **hyfer**, långa trådar av celler i rader. Samlingen hyfer kallas **mycel** och finns mest under jord. Växter består av celler som sitter ihop i vävnader och organ.
- **Vävnader:** svampar har inga specifika vävnader. Växter har fyra vävnadstyper: epidermis, grundvävnad, ledningsvävnad och delningsvävnad.
- **Kommunikation:** svampceller kommunicerar genom porer mellan cellernas cytoplasma. Växtceller har plasmodesmer genom cellväggen.
- **Fruktkroppar:** svampen kan bilda fruktkroppar för att sprida sporer. De räknas inte som vävnad.
- **Näring:** svampar är **heterotrofer** och tar upp näring som de brutit ner med enzymer. Växter gör fotosyntes.`,
    },
    {
      id: "prov1-iq14",
      n: 14,
      level: "A",
      q: "Hur skiljer sig svampar från fröväxter med avseende på deras livscykel?",
      refs: ["d5-l4", "d4-l3"],
      modelAnswer: `**Svampar** har inga ägg eller spermier. De förökar sig könlöst med **sporer** eller avknoppning. Vid sexuell förökning hos basidiesvampar möts två haploida mycel (n) och går samman, så att varje cell får två haploida kärnor (n + n). Mycelet bildar en fruktkropp, och i dess **basidier** sker befruktningen. De diploida cellerna genomgår direkt **meios**, och haploida sporer sprids. Svampens cellkärnor är alltså **haploida nästan hela livet** (n eller n + n).

**Fröväxter** har en **diploid** moderplanta. Bara pollenkorn och äggcell, som bildas genom meios, är haploida. Efter pollinering och befruktning bildas en diploid zygot och ett **frö** med grodd (2n), frövita (3n) och fröskal (2n). Fröväxter sprids med frön, svampar med sporer.`,
    },
    {
      id: "prov1-iq15",
      n: 15,
      level: "C",
      q: "Hur kan en växt öka sina chanser till sexuell reproduktion?",
      refs: ["d4-l4", "d4-l5"],
      modelAnswer: `En växt kan inte söka upp en partner, så den behöver strategier för att pollenet ska nå en annan blomma:

- **Vindpollinering:** släppa ut stora mängder pollenkorn som vinden bär.
- **Insektspollinering:** locka insekter med söt nektar, speciella färger och former, så att de för pollen till andra blommors pistiller.
- **Pollinering med däggdjur.**
- **Olika mognadstid:** när honliga och hanliga delar mognar vid olika tidpunkter motverkas självpollinering, och pollenet kommer från en annan växt.
- **Självpollinering som reserv:** en del växter kan självpollinera om vanlig pollinering inte sker.

Dessutom ökar fröspridning med vind, vatten eller djur chansen att nya plantor växer upp på nya platser.`,
    },
    {
      id: "prov1-iq16",
      n: 16,
      level: "E",
      q: "Rita upp en blomväxt och namnge blommans olika delar.",
      refs: ["d4-l2"],
      modelAnswer: `Rita en blomma i genomskärning och sätt ut:

- **Kronblad**: blommans blad, som bildar blomkronan.
- **Foderblad**: de små gröna bladen utanför kronbladen.
- **Ståndare**: blommans hanliga del, med **sträng** och **knapp**. I knappen bildas pollenkornen.
- **Pistill**: blommans honliga del, med **märke** överst, **stift** i mitten och **fruktämne** längst ner.
- **Fröämne**: inne i fruktämnet. Efter befruktningen blir fröämnet ett frö.

Sträng och knapp bildar tillsammans ståndaren. Märke, stift och fruktämne bildar pistillen.

Rita också gärna **stam**, **blad** och **rot**, eftersom frågan gäller hela blomväxten. Öva på namnen med bildövningen i Del 4.`,
    },
    {
      id: "prov1-iq17",
      n: 17,
      level: "A",
      q: "Vad har växterna för betydelse när det gäller miljöproblem som förstärkt växthuseffekt, övergödning, minskande biologisk mångfald och miljögifter i naturen?",
      refs: ["d6-l2", "d6-l3", "d6-l4", "d6-l5", "d6-l6"],
      modelAnswer: `- **Förstärkt växthuseffekt:** växter är **kolsänkor**. De tar upp koldioxid med fotosyntesen och lagrar kolet i biomassa. Skogar är den största kolsänkan på land, och våtmarker och kustekosystem lagrar mycket kol. Avskogning betyder färre växter som tar upp koldioxid. Vid torka stänger växterna klyvöppningarna och tar upp mindre koldioxid, så ett varmare klimat kan försvaga kolsänkorna.
- **Övergödning:** när människan tillför för mycket kväve och fosfor växer växtplankton och alger explosionsartat. När de dör förbrukar nedbrytningen syret, och bottnarna blir syrefria.
- **Biologisk mångfald:** många växter är beroende av pollinatörer. Färre pollinatörer gör att växterna får svårare att föröka sig, och mångfalden minskar. Växter och svampar samarbetar i mykorrhiza, och nedbrytare återför näring till nya växter.
- **Miljögifter:** gifterna följer med när organismer äter varandra. Halten ökar för varje trofinivå (**biomagnifikation**), så toppredatorer får de högsta halterna.`,
    },
  ],
};
