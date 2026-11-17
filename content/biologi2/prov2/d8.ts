/**
 * Del 8 · Cellens struktur och kommunikation (Prov 2, v. 47)
 * Sources: Cellens struktur och kommunikation, bild 1–34, and the organelle overview in
 * Cellbiologi del 1, bild 3–5 (decided with the user 2026-11-17). Slide pictures used for facts:
 * bild 5–7 (equilibrium, MED/MOT with ATP, channel and carrier proteins), 9 (exocytosis), 20
 * (dynein and microtubules, ATP), 28 (a steroid hormone with its receptor inside the cell), 30
 * (cell junctions), 32 (embryo with three cell layers), 34 (toti-, pluri- and multipotent stem
 * cells with Swedish text).
 * Small fixes: spelling dynein, peroxisomer, myosin; "när signalerna uteblir" (bild 33 says
 * "celler"); microtubules start near the nucleus (bild 19 says "från cellkärnan"); dynein makes
 * neighbouring microtubules slide (the picture on bild 20); nerve cells signal chemically (bild 26
 * says "nervimpulser"); tight junctions are sealed, not fused (bild 30); fat-soluble substances such
 * as steroid hormones pass the membrane (bild 28, Cellbiologi del 1 bild 13).
 * Supplementary: what "unipotent" means (bild 34 names it without explaining it).
 */
import type { Week } from "../../../src/types.ts";

export const d8: Week = {
  id: "d8",
  exam: "prov2",
  title: "Cellens struktur och kommunikation",
  dates: "v. 47",
  summary:
    "Hur cellmembranet och dess proteiner styr transporten in och ut, vad organellerna och cellskelettet gör, och hur celler tar emot signaler, specialiseras och dör på ett styrt sätt.",
  goals: [
    "beskriva cellmembranets uppbyggnad och vad membranproteinerna gör",
    "förklara skillnaden mellan passiv och aktiv transport och mellan endocytos och exocytos",
    "beskriva organellerna i endomembransystemet och cellskelettets tre sorters trådar",
    "förklara hur celler tar emot signaler och kopplas ihop",
    "beskriva celldifferentiering, apoptos och olika sorters stamceller",
  ],
  lessons: [
    {
      id: "d8-l1",
      title: "Cellmembranet och dess proteiner",
      minutes: 6,
      source: "Cellens struktur och kommunikation, bild 1–4",
      body: `Cellmembranet är cellens gräns mot omvärlden. Det bestämmer vad som kommer in och ut, och det tar emot signaler utifrån.

## Fosfolipider i två lager

Membranet består av **fosfolipider**, som du mötte i [[d1-l2|Cellmembranet och fosfolipiderna]]:

- Varje fosfolipid har en **vattenlöslig del (huvud)** och en **fettlöslig del (svans)**.
- Fosfolipiderna ligger i ett mycket tätt **dubbelt lager**, "skavfötters".
- Fosfolipiderna gör cellen **böjlig**.
- **Kolesterol** sitter insprängt i lagren av fosfolipider och ger membranet **stadga**.

## Vad kommer igenom?

- Små molekyler som **syre** och **koldioxid** passerar fritt.
- **Vatten** passerar troligtvis genom **aquaporiner**.
- **Större molekyler** kan inte passera fritt, eftersom membranet har både ett vattenlösligt och ett fettlösligt skikt. Fettlösliga ämnen, som steroidhormoner, kan däremot ta sig igenom, se [[d8-l5|Signaler, receptorer och cellkopplingar]].

## Proteiner i membranet

Olika proteiner i membranet har olika uppgifter:

| Proteiner | Uppgift |
| --- | --- |
| **Transportproteiner** | tar in och ut ämnen |
| **Receptorproteiner** | tar emot olika signaler |
| **Förankringsproteiner** | kopplar ihop cellen med andra celler och med strukturer i cellen |
| **Enzymer** | katalytisk aktivitet: påskyndar kemiska reaktioner |
| **Proteiner på cellytan** | antigena egenskaper (identitet): celler känner igen varandra |

> Fosfolipiderna bildar membranets dubbla lager. Proteinerna i membranet sköter transport, signaler, fäste, enzymreaktioner och cellens identitet.

!> Att syre och koldioxid passerar fritt betyder inte att allt gör det. Större molekyler behöver hjälp, till exempel av proteiner eller membranblåsor.`,
      check: {
        id: "d8-l1-k",
        q: "Vad ger cellmembranet stadga?",
        options: ["Cellulosa i membranet", "Aquaporiner", "Kolesterol mellan fosfolipiderna", "Receptorproteiner"],
        answer: "Kolesterol mellan fosfolipiderna",
        explain: "Kolesterolet sitter insprängt i lagren av fosfolipider och ger membranet stadga. Cellulosa finns i växtcellens cellvägg, inte i membranet.",
        lesson: "d8-l1",
      },
    },
    {
      id: "d8-l2",
      title: "Transport genom membranet",
      minutes: 8,
      source: "Cellens struktur och kommunikation, bild 5–9",
      body: `Transporten över cellmembranet utgår i största utsträckning från naturens jämviktslag: ämnen sprider sig tills koncentrationen är lika på båda sidor.

## Med eller mot koncentrationsgradienten

- Transport **med** koncentrationsgradienten, från hög till låg koncentration, är **passiv transport**. Den kräver ingen ATP.
- Transport **mot** koncentrationsgradienten, från låg till hög koncentration, är **aktiv transport**. Den kostar **ATP**.

Läs om koncentrationsgradienten i [[d1-l3|Diffusion och koncentrationsgradient]].

## Transportproteiner

Det finns två sorters transportproteiner:

- **Kanalproteiner** är som **rör** i membranet. De släpper in och ut ämnen **med** koncentrationsgradienten, framför allt **joner**. Rören kan öppnas och stängas, till exempel om koncentrationen blir för hög eller för låg.
- **Bärarproteiner** är som **slussar** som öppnas mot en sida av membranet i taget. De kan transportera ämnen **både med och mot** koncentrationsgradienten. Mot gradienten är det aktiv transport, och den kostar ATP.

!> Kanalproteiner och bärarproteiner är inte samma sak. Kanalerna är rör som släpper igenom med gradienten. Bärarna är slussar som även kan transportera mot gradienten.

## Endocytos och exocytos

Större molekyler, till exempel proteiner, tas in i cellen med **endocytos**:

1. Cellmembranet bildar en "ficka" runt det som ska tas in.
2. Fickan lämnar membranet och blir en **membranblåsa** inne i cellen.
3. Flera membranblåsor kan gå ihop.
4. **Lysosomer** bryter ner molekylerna.

**Exocytos** går åt andra hållet: en membranblåsa inne i cellen smälter samman med cellmembranet och tömmer sitt innehåll utanför cellen.

> Passiv transport går med koncentrationsgradienten och kräver ingen ATP. Aktiv transport går mot gradienten och kostar ATP. Stora molekyler tas in med endocytos och skickas ut med exocytos.`,
      check: {
        id: "d8-l2-k",
        q: "Vad kännetecknar aktiv transport?",
        options: ["Den går med koncentrationsgradienten", "Den sker bara genom aquaporiner", "Den sker helt utan transportproteiner", "Den går mot koncentrationsgradienten och kostar ATP"],
        answer: "Den går mot koncentrationsgradienten och kostar ATP",
        explain: "Aktiv transport går från låg till hög koncentration, mot gradienten, och kostar ATP. Transport med gradienten är passiv.",
        lesson: "d8-l2",
      },
    },
    {
      id: "d8-l3",
      title: "Organellerna och endomembransystemet",
      minutes: 9,
      source: "Cellbiologi del 1, bild 3–5; Cellens struktur och kommunikation, bild 10–15",
      body: `Likadana celler bildar vävnader, som kan bilda organ och organsystem. Inne i varje cell delar organellerna på arbetet.

## Djurcellens delar

Djurcellen innehåller bland annat

- **cellmembran** och **cytoplasma**,
- **cellkärna**, **ribosomer** och **mitokondrier**,
- **endoplasmatiskt nätverk (ER)**: bearbetar proteiner och tillverkar fett,
- **golgiapparaten**: ett system av membranblåsor som transporterar ämnen,
- **lysosomer**: nedbrytning,
- **peroxisomer**: avgiftning,
- **cellskelett** av proteintrådar, och ibland en **flagell** för rörelse.

Växtcellen har också en **stor vakuol**, **kloroplaster** och en **cellvägg**, se [[d1-l1|Växtcellen och djurcellen]]. De flesta växtceller saknar däremot lysosomer och flagell.

## Endomembransystemet

Cellens olika membransystem kallas **endomembransystemet**.

**Endoplasmatiska nätverket (ER)** är ett förgrenat kanal- och transportsystem i hela cellen. Det strålar ut från cellkärnan och hänger ihop med kärnmembranet. Det finns två delar:

- **Strävt ER** (RER, rough) har en kornig struktur med **ribosomer** på utsidan. Proteinerna som bildas där bearbetas och transporteras vidare i nätverket.
- **Slätt ER** (SER, smooth) har enzymer som tillverkar **lipider** till cellens membran. Det har också enzymer som gör om skadliga fettlösliga ämnen till vattenlösliga ämnen som kan lämna kroppen. Det är viktigt i **leverns** celler.

**Golgiapparaten** är ett system av membranblåsor, en sorts lagringslokal:

- Den bildar egna blåsor och tar hand om blåsor från ER.
- Blåsorna sorteras och lagras, och de får "etiketter" som visar vart de ska.
- Den skickar ut blåsor med enzymer, signalsubstanser och andra viktiga ämnen med **exocytos**, till exempel enzymer från bukspottkörteln till tunntarmen vid matspjälkningen.
- Den kan också bilda lysosomer.

**Lysosomer** är membranblåsor fyllda med en mycket **sur** lösning:

- **Protonpumpar** i lysosomens membran pumpar aktivt in vätejoner från cytoplasman, så att pH hela tiden är lågt.
- Enzymerna bryter ner **makromolekyler** till mindre delar. De verkar långsamt vid högre pH.
- Lysosomer bryter ner skadade organeller och kan bryta ner den egna cellen (programmerad celldöd), till exempel när grodyngelns svans bryts ner.

**Peroxisomer** är membranbundna organeller med oxiderande enzymer. De tar hand om skadliga syremolekyler, till exempel **fria radikaler**, som har oparade elektroner och är mycket reaktiva. De skadliga syreföreningarna omvandlas till väteperoxid (H~2~O~2~) och sedan till syrgas och vatten.

## Ett proteins väg ut ur cellen

1. Proteinet bildas vid ribosomerna på det sträva ER.
2. Det bearbetas i nätverket.
3. Det förses med en membranblåsa och förs till golgiapparaten.
4. Golgiapparaten sorterar och lagrar det.
5. Det lämnar cellen med exocytos.

> Ribosomerna på det sträva ER bildar proteiner, ER bearbetar dem och golgiapparaten sorterar dem och skickar ut dem med exocytos.

!> Lysosomer och peroxisomer är inte samma sak. Lysosomerna bryter ner makromolekyler i en sur lösning. Peroxisomerna tar hand om skadliga syreföreningar.`,
      check: {
        id: "d8-l3-k",
        q: "Vad gör det släta ER?",
        options: ["Bildar proteiner med ribosomer på utsidan", "Tillverkar lipider och gör om skadliga fettlösliga ämnen", "Bryter ner makromolekyler i en sur lösning", "Sorterar blåsor och ger dem etiketter"],
        answer: "Tillverkar lipider och gör om skadliga fettlösliga ämnen",
        explain: "Slätt ER tillverkar lipider till membranen och gör om skadliga fettlösliga ämnen till vattenlösliga. Ribosomerna sitter på det sträva ER.",
        lesson: "d8-l3",
      },
    },
    {
      id: "d8-l4",
      title: "Cellskelettet och motorproteinerna",
      minutes: 7,
      source: "Cellens struktur och kommunikation, bild 16–22",
      body: `Cellskelettet står för cellens rörelse, stadga och transport. Det motsvarar både skelettet och musklerna i våra kroppar.

Cytoplasman genomvävs av tre sorters proteintrådar: **aktintrådar**, **mikrotubuli** och **intermediära trådar**.

## Aktintrådar (mikrofilament)

- Pärlband av **aktin**molekyler, ofta i buntar och koncentrerade intill cellmembranet.
- Ger **amöboid rörelse**: aktintrådarna bildar tillfälliga utskott i cellytan. Aktinmolekyler bygger på vissa trådar så att de förlängs, samtidigt som andra förkortas.

**Myosin** är ett **motorprotein** som ofta samverkar med aktintrådarna:

- Myosinet förflyttar sig längs aktintråden, som om det gick på lina.
- Det rör sig tack vare att ATP spjälkas (hydrolys av ATP).
- Det kan bära membranblåsor. Myosin och aktin ger transport i cellen, men också celldelning och muskelkontraktion.

## Mikrotubuli

- Långa **ihåliga rör** av proteinet **tubulin**.
- Går ut från cellens mitt vid cellkärnan. Organeller transporteras längs dem åt olika håll i cellen.
- Samverkar ofta med motorproteinet **dynein**, ett globulärt protein.
- **Flageller** och **cilier** svänger tack vare att dynein förskjuter intilliggande mikrotubuli mot varandra. Det kostar ATP.
- Mikrotubuli separerar kromosomerna under **mitosen**.

## Intermediära trådar

- Hoptvinnade buntar av olika **fiberproteiner**, till exempel **keratin** (hornämne).
- Buntarna är mycket starka, cellens skelett.
- De bildar kopplingar mellan celler, så att cellerna hålls ihop.

> Aktintrådar ger rörelse tillsammans med myosin. Mikrotubuli är transportvägar och får cilier och flageller att svänga med dynein. Intermediära trådar ger styrka och håller ihop cellerna.

!> Myosin och dynein är inte trådar. De är motorproteiner som rör sig längs trådarna, och de drivs av ATP.`,
      check: {
        id: "d8-l4-k",
        q: "Vilket protein bygger upp mikrotubuli?",
        options: ["Aktin", "Keratin", "Tubulin", "Myosin"],
        answer: "Tubulin",
        explain: "Mikrotubuli är ihåliga rör av tubulin. Aktin bygger aktintrådarna, keratin finns i intermediära trådar och myosin är ett motorprotein.",
        lesson: "d8-l4",
      },
    },
    {
      id: "d8-l5",
      title: "Signaler, receptorer och cellkopplingar",
      minutes: 8,
      source: "Cellens struktur och kommunikation, bild 23–30; Cellbiologi del 1, bild 13",
      body: `Både enskilda celler och celler i vävnader och organ reagerar på omgivningen och anpassar sig till den.

## Vad celler reagerar på

Celler reagerar bland annat på **ljus**, **temperatur**, **dagslängd**, **hormoner**, **biologiska signalämnen** och **signaler från andra celler**, men också på **rytm**.

De kan svara genom att

- **differentieras**, alltså specialiseras,
- anpassa sina aktiviteter efter intryck utifrån,
- ändra vilka **gener** som är aktiva, eftersom generna styr cellens aktivitet,
- låta små molekyler eller metalljoner avgöra om ett enzyms yta blir aktiv eller inte.

## Signalöverföring

Cellen tar emot signaler med **receptorer**. Signalerna kan vara ljus eller kemiska signaler, som **hormoner**, signaler mellan **nervceller** och signaler i **immunförsvaret**.

## Membranreceptorer och sekundära budbärare

1. De flesta signalmolekyler stannar utanför cellen. För att cellen ska kunna ta emot dem krävs en **receptor** i cellmembranet. Signalmolekylen binder till receptorn.
2. Receptorn leder signalen vidare in i cellen via **sekundära budbärare** (second messenger).
3. De sekundära budbärarna kan i sin tur aktivera en **enzymreaktion** eller ett **genuttryck**.

**Steroidhormoner** fungerar på ett annat sätt. De passerar cellmembranet och binder till en receptor **inne i cellen**. Hormonet och receptorn påverkar sedan DNA i cellkärnan, så att nya proteiner bildas. Steroider är lipider, se [[d7-l2|Kolhydrater, nukleotider och lipider]].

## Cellkopplingar

Närbelägna celler kan kopplas ihop direkt. I **växtceller** finns **plasmodesmer**, kanaler genom cellväggen. I **djurceller** finns olika **cellkopplingar**. De håller ihop cellerna i vävnader och organ och låter cellerna kommunicera.

| Koppling | Var och vad |
| --- | --- |
| **Tight junctions** | där två cellers membran är tätt sammanfogade, främst i epitelceller och hudceller |
| **Desmosomer** (förankrande kopplingar) | i epitelceller, hjärtmuskelceller och hjärnhinnorna |
| **Gap junctions** (kommunicerande kopplingar) | i nästan alla celler. Genom kanalerna transporteras joner, näringsämnen och signalsubstanser |

> En signalmolekyl binder till en receptor i membranet, och sekundära budbärare för signalen vidare till ett enzym eller en gen.

!> Gap junctions och plasmodesmer kopplar båda ihop grannceller, men gap junctions finns i djurceller och plasmodesmer i växtceller.`,
      check: {
        id: "d8-l5-k",
        q: "Vad gör en sekundär budbärare?",
        options: ["För signalen vidare inne i cellen från receptorn", "Transporterar joner genom membranet", "Håller ihop cellerna i en vävnad", "Bryter ner signalmolekylen i lysosomen"],
        answer: "För signalen vidare inne i cellen från receptorn",
        explain: "Receptorn i membranet leder signalen vidare via sekundära budbärare, som kan aktivera en enzymreaktion eller ett genuttryck.",
        lesson: "d8-l5",
      },
    },
    {
      id: "d8-l6",
      title: "Differentiering, apoptos och stamceller",
      minutes: 8,
      source: "Cellens struktur och kommunikation, bild 31–34",
      body: `En befruktad äggcell blir till ett embryo med många olika sorters celler: hudceller, nervceller, muskelceller och fler. Här ser du hur cellerna specialiseras, hur de dör på ett styrt sätt och vilka celler som kan bli nya celltyper.

## Celldifferentiering

När celler specialiseras kallas det **celldifferentiering**:

- En cell kan **polariseras**: olika ämnen får olika koncentration i olika delar av cellen.
- Vid celldelningen får de nya cellerna då olika koncentrationer av ämnen, och olika **gener** kan aktiveras i dem.
- Närliggande celler påverkar vilka gener som styr, och det gör även signaler utifrån.
- **Styrgener (hox-gener)** är grupper av gener som påverkar andra gener. De kan i sin tur påverka olika reglerande proteiner.

Under embryoutvecklingen bildas tre cellager: **ektoderm** (yttre), **mesoderm** (mellersta) och **endoderm** (inre). Från ektodermen bildas till exempel hudceller och nervceller, från mesodermen muskelceller och röda blodkroppar och från endodermen till exempel lungceller.

## Programmerad celldöd – apoptos

Celler ska inte leva för evigt. **Apoptos** är programmerad celldöd:

- Celler behöver signaler för att fortsätta dela sig. När signalerna uteblir kan den programmerade celldöden starta.
- Kromosomernas ändar, **telomererna**, förkortas vid varje celldelning.
- Förkortas inte telomererna som de ska kan det vara en **tumör**. I cancerceller bildas **telomeras**, och telomererna förlängs.
- Exempel på apoptos: grodyngelns svans och huden mellan fingrarna hos foster.

!> Att celler dör betyder inte alltid att något har gått fel. Celler ska inte leva för evigt, och apoptos är en programmerad celldöd, till exempel när huden mellan fostrets fingrar försvinner.

## Meristem och stamceller

Växternas tillväxtvävnad kallas **meristem**, se [[d2-l2|Cellväggen, meristem och årsringar]]. Djur har i stället **stamceller**. Stamcellerna måste dela sig både till olika celltyper och till nya, oförändrade stamceller.

| Stamceller | Kan utvecklas till | Finns |
| --- | --- | --- |
| **Totipotenta** | alla typer av celler | embryonala, i den befruktade äggcellen |
| **Pluripotenta** | nästan alla typer av celler | embryonala |
| **Multipotenta** | en viss typ av cell i en viss vävnad | i navelsträngen och hos vuxna (adulta) |

Hos vuxna finns också **unipotenta** stamceller.

+> En unipotent stamcell kan bara bli en enda celltyp.

> Celler specialiseras när olika gener aktiveras. Totipotenta stamceller kan bli alla celltyper, pluripotenta nästan alla och multipotenta bara celler i en viss vävnad.`,
      check: {
        id: "d8-l6-k",
        q: "Vad kan en totipotent stamcell utvecklas till?",
        options: ["Alla typer av celler", "Nästan alla typer av celler", "En viss celltyp i en viss vävnad", "Bara nya stamceller"],
        answer: "Alla typer av celler",
        explain: "Totipotenta stamceller, som den befruktade äggcellen, kan bli alla typer av celler. Pluripotenta kan bli nästan alla, multipotenta en viss typ i en viss vävnad.",
        lesson: "d8-l6",
      },
    },
  ],
  cards: [
    { id: "d8-k01", front: "Cellmembranets uppbyggnad", back: "Ett tätt dubbelt lager av fosfolipider med insprängt kolesterol och olika proteiner.", lesson: "d8-l1" },
    { id: "d8-k02", front: "Kolesterol i cellmembranet", back: "Sitter insprängt i lagren av fosfolipider och ger membranet stadga.", lesson: "d8-l1" },
    { id: "d8-k03", front: "Membranproteinernas uppgifter", back: "Transport, receptorer för signaler, förankring, katalytisk aktivitet och identitet (antigena egenskaper).", lesson: "d8-l1" },
    { id: "d8-k04", front: "Passiv transport", back: "Transport med koncentrationsgradienten, från hög till låg koncentration. Kräver ingen ATP.", lesson: "d8-l2" },
    { id: "d8-k05", front: "Aktiv transport", back: "Transport mot koncentrationsgradienten, från låg till hög koncentration. Kostar ATP.", lesson: "d8-l2" },
    { id: "d8-k06", front: "Kanalproteiner", back: "Rör i membranet som släpper igenom ämnen, främst joner, med koncentrationsgradienten. Kan öppnas och stängas.", lesson: "d8-l2" },
    { id: "d8-k07", front: "Bärarproteiner", back: "Slussar som öppnas mot en sida av membranet i taget. Kan transportera både med och mot gradienten.", lesson: "d8-l2" },
    { id: "d8-k08", front: "Endocytos", back: "Membranet bildar en ficka runt det som ska in, och fickan blir en membranblåsa inne i cellen.", lesson: "d8-l2" },
    { id: "d8-k09", front: "Exocytos", back: "En membranblåsa smälter samman med cellmembranet och tömmer sitt innehåll utanför cellen.", lesson: "d8-l2" },
    { id: "d8-k10", front: "Strävt ER (RER)", back: "Endoplasmatiskt nätverk med ribosomer på utsidan. Proteinerna som bildas där bearbetas och transporteras vidare.", lesson: "d8-l3" },
    { id: "d8-k11", front: "Slätt ER (SER)", back: "Tillverkar lipider till membranen och gör om skadliga fettlösliga ämnen till vattenlösliga. Viktigt i levern.", lesson: "d8-l3" },
    { id: "d8-k12", front: "Golgiapparaten", back: "Membranblåsor som sorterar, lagrar och märker ämnen och skickar ut dem med exocytos.", lesson: "d8-l3" },
    { id: "d8-k13", front: "Lysosom", back: "Membranblåsa med sur lösning och enzymer som bryter ner makromolekyler och skadade organeller.", lesson: "d8-l3" },
    { id: "d8-k14", front: "Peroxisom", back: "Organell med oxiderande enzymer. Gör om skadliga syreföreningar via väteperoxid till syrgas och vatten.", lesson: "d8-l3" },
    { id: "d8-k15", front: "Cellskelettets tre sorters trådar", back: "Aktintrådar (mikrofilament), mikrotubuli och intermediära trådar.", lesson: "d8-l4" },
    { id: "d8-k16", front: "Aktintrådar", back: "Pärlband av aktin nära cellmembranet. Ger amöboid rörelse och samverkar med myosin.", lesson: "d8-l4" },
    { id: "d8-k17", front: "Myosin", back: "Motorprotein som går längs aktintrådar med hjälp av ATP. Ger transport, celldelning och muskelkontraktion.", lesson: "d8-l4" },
    { id: "d8-k18", front: "Mikrotubuli", back: "Ihåliga rör av tubulin. Transportvägar för organeller. Får cilier och flageller att svänga och separerar kromosomer vid mitosen.", lesson: "d8-l4" },
    { id: "d8-k19", front: "Intermediära trådar", back: "Starka buntar av fiberproteiner, till exempel keratin. Ger stadga och håller ihop celler.", lesson: "d8-l4" },
    { id: "d8-k20", front: "Sekundär budbärare", back: "Molekyl som för en signal vidare från receptorn in i cellen och aktiverar en enzymreaktion eller ett genuttryck.", lesson: "d8-l5" },
    { id: "d8-k21", front: "Gap junctions och plasmodesmer", back: "Kanaler mellan grannceller. Gap junctions finns i djurceller, plasmodesmer i växtceller.", lesson: "d8-l5" },
    { id: "d8-k22", front: "Tight junctions och desmosomer", back: "Cellkopplingar i djurceller. I tight junctions är membranen tätt sammanfogade. Desmosomer förankrar cellerna.", lesson: "d8-l5" },
    { id: "d8-k23", front: "Apoptos", back: "Programmerad celldöd. Kan starta när signalerna som får cellen att fortsätta dela sig uteblir.", lesson: "d8-l6" },
    { id: "d8-k24", front: "Telomerer och telomeras", back: "Telomererna är kromosomernas ändar och förkortas vid varje celldelning. I cancerceller förlänger telomeras dem.", lesson: "d8-l6" },
    { id: "d8-k25", front: "Toti-, pluri- och multipotenta stamceller", back: "Kan bli alla celltyper, nästan alla, respektive en viss celltyp i en viss vävnad.", lesson: "d8-l6" },
  ],
  quiz: [
    {
      id: "d8-q01", level: "E", lesson: "d8-l1",
      q: "Hur ligger fosfolipiderna i cellmembranet?",
      options: ["I ett enkelt lager", "I ett tätt dubbelt lager", "I en vägg av cellulosa", "Utspridda i cytoplasman"],
      answer: "I ett tätt dubbelt lager",
      explain: "Fosfolipiderna ligger i ett mycket tätt dubbelt lager, skavfötters. Cellulosa finns i växtcellens cellvägg.",
    },
    {
      id: "d8-q02", level: "E", lesson: "d8-l1",
      q: "Vilka ämnen passerar fritt genom cellmembranet?",
      options: ["Proteiner och stärkelse", "Glukos och aminosyror", "Små molekyler som syre och koldioxid", "Alla sorters joner"],
      answer: "Små molekyler som syre och koldioxid",
      explain: "Små molekyler som syre och koldioxid passerar fritt. Större molekyler kan inte passera fritt, och kanalproteiner släpper framför allt igenom joner.",
    },
    {
      id: "d8-q03", level: "E", lesson: "d8-l1",
      q: "Vad gör receptorproteiner i cellmembranet?",
      options: ["Tar emot signaler", "Tar in och ut ämnen", "Ger membranet stadga", "Bryter ner makromolekyler"],
      answer: "Tar emot signaler",
      explain: "Receptorproteiner tar emot olika signaler. Transportproteiner tar in och ut ämnen, och kolesterol ger stadga.",
    },
    {
      id: "d8-q04", level: "E", lesson: "d8-l2",
      q: "Vad kallas transport mot koncentrationsgradienten?",
      options: ["Passiv transport", "Osmos", "Diffusion", "Aktiv transport"],
      answer: "Aktiv transport",
      explain: "Transport mot koncentrationsgradienten är aktiv transport och kostar ATP. Diffusion och osmos går med gradienten.",
    },
    {
      id: "d8-q05", level: "E", lesson: "d8-l2",
      q: "Hur tar cellen in större molekyler, till exempel proteiner?",
      options: ["Genom aquaporiner", "Med exocytos", "Med endocytos", "Genom kanalproteiner"],
      answer: "Med endocytos",
      explain: "Vid endocytos bildar membranet en ficka runt molekylen, och den blir en membranblåsa i cellen. Exocytos går åt andra hållet, ut ur cellen.",
    },
    {
      id: "d8-q06", level: "E", lesson: "d8-l3",
      q: "Vad sitter på utsidan av det sträva ER?",
      options: ["Lysosomer", "Ribosomer", "Kloroplaster", "Peroxisomer"],
      answer: "Ribosomer",
      explain: "Det sträva ER har ribosomer på utsidan, och därför ser det kornigt ut. Det släta ER saknar ribosomer.",
    },
    {
      id: "d8-q07", level: "E", lesson: "d8-l3",
      q: "Vilken organell innehåller en mycket sur lösning med nedbrytande enzymer?",
      options: ["Peroxisomen", "Golgiapparaten", "Mitokondrien", "Lysosomen"],
      answer: "Lysosomen",
      explain: "Lysosomen är fylld med en mycket sur lösning, och dess enzymer bryter ner makromolekyler. Peroxisomen tar hand om skadliga syreföreningar.",
    },
    {
      id: "d8-q08", level: "E", lesson: "d8-l4",
      q: "Vilket motorprotein samverkar med aktintrådarna?",
      options: ["Myosin", "Tubulin", "Keratin", "Kolesterol"],
      answer: "Myosin",
      explain: "Myosin går längs aktintrådarna med hjälp av ATP. Tubulin bygger mikrotubuli, och keratin finns i intermediära trådar.",
    },
    {
      id: "d8-q09", level: "E", lesson: "d8-l4",
      q: "Vilket fiberprotein kan intermediära trådar bestå av?",
      options: ["Aktin", "Keratin", "Tubulin", "Hemoglobin"],
      answer: "Keratin",
      explain: "Intermediära trådar är buntar av fiberproteiner, till exempel keratin (hornämne). Aktin och tubulin bygger de andra två sorternas trådar.",
    },
    {
      id: "d8-q10", level: "E", lesson: "d8-l6",
      q: "Vad kallas programmerad celldöd?",
      options: ["Mitos", "Exocytos", "Apoptos", "Differentiering"],
      answer: "Apoptos",
      explain: "Apoptos är programmerad celldöd. Den kan starta när signalerna som får cellen att fortsätta dela sig uteblir.",
    },
    {
      id: "d8-q11", level: "C", lesson: "d8-l2",
      q: "Vad är skillnaden mellan kanalproteiner och bärarproteiner?",
      options: ["Kanalerna kostar alltid ATP, bärarna aldrig", "Kanalerna tar bara vatten, bärarna bara proteiner", "Kanalerna finns i växtceller, bärarna i djurceller", "Kanalerna går med gradienten, bärarna även mot den"],
      answer: "Kanalerna går med gradienten, bärarna även mot den",
      explain: "Kanalproteiner är rör som släpper igenom ämnen med koncentrationsgradienten. Bärarproteiner är slussar som kan transportera både med och mot den, och mot gradienten kostar det ATP.",
    },
    {
      id: "d8-q12", level: "C", lesson: "d8-l3",
      q: "Vilken väg tar ett protein som ska lämna cellen?",
      options: ["Golgiapparaten, ribosom, ER, exocytos", "Ribosom, strävt ER, golgiapparaten, exocytos", "Lysosom, golgiapparaten, ER, endocytos", "ER, ribosom, lysosom, exocytos"],
      answer: "Ribosom, strävt ER, golgiapparaten, exocytos",
      explain: "Proteinet bildas vid ribosomerna på det sträva ER och bearbetas där. Det förs i en blåsa till golgiapparaten, som skickar ut det med exocytos.",
    },
    {
      id: "d8-q13", level: "C", lesson: "d8-l3",
      q: "Varför är det släta ER viktigt i leverns celler?",
      options: ["Det bildar proteiner med sina ribosomer", "Det lagrar syre åt levern", "Det gör om skadliga fettlösliga ämnen till vattenlösliga", "Det bryter ner gamla organeller i en sur lösning"],
      answer: "Det gör om skadliga fettlösliga ämnen till vattenlösliga",
      explain: "Enzymer i det släta ER gör om skadliga fettlösliga ämnen till vattenlösliga, som kan lämna kroppen. Det är lysosomerna som bryter ner organeller i sur lösning.",
    },
    {
      id: "d8-q14", level: "C", lesson: "d8-l3",
      q: "Hur håller lysosomen sitt pH lågt?",
      options: ["Protonpumpar i membranet pumpar aktivt in vätejoner", "Den tar upp syra direkt från blodet", "Enzymerna bildar syra när de bryter ner molekyler", "Peroxisomer skickar väteperoxid till den"],
      answer: "Protonpumpar i membranet pumpar aktivt in vätejoner",
      explain: "Protonpumpar i lysosomens membran pumpar aktivt in vätejoner från cytoplasman, så att pH hålls lågt. Enzymerna verkar långsamt vid högre pH.",
    },
    {
      id: "d8-q15", level: "C", lesson: "d8-l4",
      q: "Hur får cilier och flageller sina svängande rörelser?",
      options: ["Aktintrådar förlängs och förkortas", "Dynein förskjuter mikrotubuli mot varandra med ATP", "Intermediära trådar drar ihop sig", "Vatten strömmar in genom aquaporiner"],
      answer: "Dynein förskjuter mikrotubuli mot varandra med ATP",
      explain: "Motorproteinet dynein förskjuter mikrotubuli mot varandra, och det kostar ATP. Aktintrådar som förlängs och förkortas ger amöboid rörelse.",
    },
    {
      id: "d8-q16", level: "C", lesson: "d8-l5",
      q: "Hur går en signal vidare in i cellen när den har bundit till en receptor i membranet?",
      options: ["Receptorn lämnar membranet och vandrar till kärnan", "Signalmolekylen går alltid in genom ett kanalprotein", "Lysosomer bär in signalen i membranblåsor", "Via sekundära budbärare, som aktiverar enzymer eller gener"],
      answer: "Via sekundära budbärare, som aktiverar enzymer eller gener",
      explain: "Receptorn leder signalen vidare via sekundära budbärare, som kan aktivera en enzymreaktion eller ett genuttryck.",
    },
    {
      id: "d8-q17", level: "C", lesson: "d8-l6",
      q: "Hur kan två celler från samma celldelning bli olika?",
      options: ["Ämnen har olika koncentration i cellens delar, så olika gener aktiveras", "De får olika DNA vid celldelningen", "Den ena cellen förlorar sin cellkärna", "Den ena cellen får alla mitokondrierna"],
      answer: "Ämnen har olika koncentration i cellens delar, så olika gener aktiveras",
      explain: "En polariserad cell har olika koncentration av ämnen i olika delar. Vid delningen får de nya cellerna olika koncentrationer, och olika gener kan aktiveras i dem.",
    },
    {
      id: "d8-q18", level: "A", lesson: "d8-l2",
      q: "Ett ämne har lägre koncentration inne i cellen än utanför. Cellen ska ändå transportera ut det. Vad krävs?",
      options: ["Ett kanalprotein, utan energi", "Aquaporiner och vatten", "Ett bärarprotein och ATP", "Endocytos utan ATP"],
      answer: "Ett bärarprotein och ATP",
      explain: "Att föra ut ämnet från låg till hög koncentration är transport mot gradienten, aktiv transport. Det kräver bärarproteiner och ATP. Kanalproteiner släpper bara igenom med gradienten.",
    },
    {
      id: "d8-q19", level: "A", lesson: "d8-l6",
      q: "I en cell förkortas inte telomererna vid celldelningarna, och cellen fortsätter dela sig. Vad kan det tyda på?",
      options: ["Att cellen snart dör genom apoptos", "Att cellen har förlorat sin cellkärna", "Att cellen har slutat bilda proteiner", "Att det kan vara en tumörcell"],
      answer: "Att det kan vara en tumörcell",
      explain: "Telomererna ska förkortas vid varje celldelning. Förkortas de inte, kan det vara en tumör. I cancerceller bildas telomeras, som förlänger telomererna.",
    },
    {
      id: "d8-q20", level: "A", lesson: "d8-l5",
      q: "Ett steroidhormon ändrar vilka gener som är aktiva i en cell, fast cellen saknar en receptor för hormonet i membranet. Hur är det möjligt?",
      options: ["Hormonet är en lipid, passerar membranet och binder till en receptor inne i cellen", "Hormonet tas in med exocytos", "Hormonet går in i cellen genom gap junctions från blodet", "Lysosomer bryter ner hormonet till sekundära budbärare"],
      answer: "Hormonet är en lipid, passerar membranet och binder till en receptor inne i cellen",
      explain: "Steroider är lipider. Steroidhormoner passerar cellmembranet och binder till en receptor inne i cellen, som påverkar DNA i kärnan. Exocytos för ut ämnen, det tar inte in dem.",
    },
  ],
  practice: [
    {
      id: "d8-p1", kind: "label", level: "E", lesson: "d8-l3", diagram: "animalcell",
      q: "Namnge delarna i djurcellen.",
      markers: [
        { n: 1, answer: "Cellmembran" },
        { n: 2, answer: "Cytoplasma" },
        { n: 3, answer: "Cellkärna" },
        { n: 4, answer: "Strävt ER" },
        { n: 5, answer: "Slätt ER" },
        { n: 6, answer: "Golgiapparaten" },
        { n: 7, answer: "Mitokondrie" },
        { n: 8, answer: "Lysosom" },
        { n: 9, answer: "Peroxisom" },
      ],
      distractors: ["Cellvägg", "Kloroplast"],
      hint: "Det sträva ER har ribosomer, som prickar, på utsidan. Golgiapparaten ser ut som en stapel böjda blåsor.",
    },
    {
      id: "d8-p2", kind: "order", level: "C", lesson: "d8-l3",
      q: "Sätt ett proteins väg ut ur cellen i ordning.",
      steps: [
        "Proteinet bildas vid ribosomerna på det sträva ER",
        "Proteinet bearbetas i det endoplasmatiska nätverket",
        "Proteinet förs i en membranblåsa till golgiapparaten",
        "Golgiapparaten sorterar blåsan och ger den en etikett",
        "Blåsan lämnar cellen med exocytos",
      ],
      explain: "Ribosomerna på det sträva ER bildar proteinet, ER bearbetar det, och golgiapparaten sorterar det och skickar ut det med exocytos.",
    },
    {
      id: "d8-p3", kind: "order", level: "C", lesson: "d8-l5",
      q: "Sätt stegen i ordning när en cell tar emot en signal med en receptor i membranet.",
      steps: [
        "En signalmolekyl binder till en receptor i cellmembranet",
        "Receptorn leder signalen vidare in i cellen",
        "Sekundära budbärare för signalen vidare",
        "En enzymreaktion eller ett genuttryck aktiveras",
      ],
      explain: "Receptorn i membranet tar emot signalen och leder den vidare via sekundära budbärare, som aktiverar en enzymreaktion eller ett genuttryck.",
    },
    {
      id: "d8-p4", kind: "self", level: "C", lesson: "d8-l2",
      q: "Förklara skillnaden mellan passiv och aktiv transport. Ge exempel på proteiner som sköter dem.",
      hint: "Tänk på koncentrationsgradienten och på ATP.",
      solution: `**Passiv transport** går **med** koncentrationsgradienten, från hög till låg koncentration, och kräver ingen ATP. **Kanalproteiner** är rör i membranet som släpper igenom ämnen, framför allt joner, på det sättet. Rören kan öppnas och stängas, till exempel om koncentrationen blir för hög eller för låg.

**Aktiv transport** går **mot** koncentrationsgradienten, från låg till hög koncentration, och kostar **ATP**. **Bärarproteiner** är slussar som öppnas mot en sida av membranet i taget. De kan transportera både med och mot gradienten.

Ett exempel på aktiv transport är **protonpumparna** i lysosomens membran, som pumpar in vätejoner så att lysosomen blir sur.`,
    },
    {
      id: "d8-p5", kind: "self", level: "A", lesson: "d8-l6",
      q: "Förklara hur en befruktad äggcell kan ge upphov till många olika sorters celler.",
      solution: `Den befruktade äggcellen är **totipotent**: den kan bli alla typer av celler. I embryot finns **pluripotenta** stamceller som kan bli nästan alla celltyper, och hos vuxna **multipotenta** stamceller som bara kan bli celler i en viss vävnad.

Cellerna blir olika genom **celldifferentiering**. En cell kan **polariseras**, så att ämnen får olika koncentration i olika delar. Vid celldelningen får de nya cellerna då olika koncentrationer, och olika **gener** aktiveras. Närliggande celler och signaler utifrån påverkar också vilka gener som styr, och **hox-gener**, grupper av gener, styr andra gener.

I embryot bildas tre cellager, ektoderm, mesoderm och endoderm, som blir olika vävnader. Celler som inte behövs tas bort med **apoptos**, till exempel huden mellan fostrets fingrar.`,
    },
    {
      id: "d8-p6", kind: "self", level: "C", lesson: "d8-l4",
      q: "Beskriv cellskelettets tre sorters trådar och vad de gör.",
      solution: `**Aktintrådar** (mikrofilament) är pärlband av aktin nära cellmembranet. De ger **amöboid rörelse**, och tillsammans med motorproteinet **myosin** ger de transport i cellen, celldelning och muskelkontraktion.

**Mikrotubuli** är ihåliga rör av **tubulin**. De transporterar organeller i cellen och separerar kromosomerna vid mitosen. Med motorproteinet **dynein** får de cilier och flageller att svänga.

**Intermediära trådar** är starka buntar av fiberproteiner, till exempel **keratin**. De ger stadga och håller ihop cellerna.

Motorproteinerna drivs av **ATP**.`,
    },
    {
      id: "d8-p7", kind: "text", level: "E", lesson: "d8-l4",
      q: "Vilket motorprotein får cilier och flageller att svänga tillsammans med mikrotubuli?",
      answer: ["dynein", "dyenin"],
      solution: "Motorproteinet heter **dynein**. Det förskjuter mikrotubuli mot varandra med hjälp av ATP.",
    },
    {
      id: "d8-p8", kind: "text", level: "E", lesson: "d8-l6",
      q: "Vad bildas i cancerceller och förlänger telomererna?",
      answer: ["telomeras"],
      solution: "I cancerceller bildas **telomeras**, och telomererna förlängs.",
    },
    {
      id: "d8-p9", kind: "text", level: "E", lesson: "d8-l5",
      q: "Vad heter kanalerna mellan djurceller som joner, näringsämnen och signalsubstanser går igenom?",
      answer: ["gap junctions", "gap junction", "kommunicerande kopplingar"],
      solution: "Kanalerna heter **gap junctions** (kommunicerande kopplingar). I växtceller gör plasmodesmerna samma sak.",
    },
    {
      id: "d8-p10", kind: "text", level: "E", lesson: "d8-l3",
      q: "Vilken organell gör om skadliga syreföreningar till syrgas och vatten?",
      answer: ["peroxisom", "peroxisomen", "peroxisomer", "peroxisomerna"],
      solution: "Det är **peroxisomen**. Skadliga syreföreningar omvandlas till väteperoxid och sedan till syrgas och vatten.",
    },
  ],
  keyPoints: [
    "Cellmembranet är ett tätt **dubbelt lager av fosfolipider**. **Kolesterol** ger stadga. Syre och koldioxid passerar fritt, större molekyler behöver hjälp.",
    "**Membranproteinerna** sköter transport, tar emot signaler (receptorer), förankrar cellen, har enzymaktivitet och ger cellen identitet.",
    "**Passiv transport** går med koncentrationsgradienten, **aktiv transport** mot den och kostar ATP. Stora molekyler tas in med **endocytos** och skickas ut med **exocytos**.",
    "Proteiner bildas vid ribosomerna på **strävt ER**, sorteras i **golgiapparaten** och skickas ut med exocytos. **Slätt ER** tillverkar lipider och avgiftar.",
    "**Lysosomer** bryter ner makromolekyler i sur lösning. **Peroxisomer** gör om skadliga syreföreningar till syrgas och vatten.",
    "Cellskelettet: **aktintrådar** (med myosin), **mikrotubuli** (med dynein) och **intermediära trådar**. Motorproteinerna drivs av ATP.",
    "Signaler tas emot av **receptorer** och förs vidare av **sekundära budbärare**. Djurceller kopplas ihop med tight junctions, desmosomer och **gap junctions**, växtceller med plasmodesmer.",
    "Celler **differentieras** när olika gener aktiveras. **Apoptos** är programmerad celldöd. Stamceller kan vara **totipotenta**, **pluripotenta**, **multipotenta** eller unipotenta.",
  ],
};
