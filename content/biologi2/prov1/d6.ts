/**
 * Del 6 · Hållbar utveckling
 * Sources: Växtfysiologi och hållbar utveckling, bild 1–24.
 * Corrections applied (BUILD §8.4): albedo is the reflection of incoming sunlight; the Earth emits
 * heat radiation that greenhouse gases absorb and re-emit.
 * Verified on the web 2026-11-16 (BUILD §8.5), both supplementary:
 * - Planetary boundaries: Planetary Health Check 2026 (Potsdam Institute for Climate Impact
 *   Research, 21 Sep 2026): seven of nine boundaries transgressed.
 * - Anthropocene: rejected as a formal geological epoch by the IUGS in March 2024; Holocene stands.
 */
import type { Week } from "../../../src/types.ts";

export const d6: Week = {
  id: "d6",
  exam: "prov1",
  title: "Hållbar utveckling",
  summary:
    "Vad hållbar utveckling är, hur växter binder kol, vad som driver klimatförändringarna, varför biologisk mångfald spelar roll och hur övergödning och miljögifter påverkar ekosystemen.",
  goals: [
    "förklara begreppet hållbar utveckling och dess tre dimensioner",
    "förklara växthuseffekten, den förstärkta växthuseffekten och albedoeffekten",
    "beskriva biologisk mångfald på tre nivåer och ge exempel på ekosystemtjänster",
    "förklara övergödning, bioackumulation och biomagnifikation",
  ],
  lessons: [
    {
      id: "d6-l1",
      title: "Hållbar utveckling",
      minutes: 5,
      source: "Växtfysiologi och hållbar utveckling, bild 1–7",
      body: `Från cellen till planeten: det du lärt dig om fotosyntes, osmos och mångfald hänger ihop med frågan om hur vi kan leva hållbart.

## Vad är hållbar utveckling?

> **Hållbar utveckling** är ”en utveckling som tillfredsställer våra behov idag utan att äventyra framtida generationers möjligheter att tillfredsställa sina behov”.

## Behov som krockar

Vi har **grundläggande behov**, som att äta mat, andas ren luft, dricka rent vatten och ha kläder. Andra behov är till exempel att köra bil, träffa vänner och familj och ha ett jobb.

Behoven kan krocka: inom oss, mellan grupper, mellan samhällen, mellan länder och mellan olika tider. Hållbar utveckling är en **balans mellan olika behov**.

## Tre dimensioner

| Dimension | Balans i | Exempel |
| --- | --- | --- |
| **Ekologisk** | naturmiljöer | artrikedom, giftfri miljö, stabilt klimat |
| **Ekonomisk** | produktion och handel | råvarutillgång, lönsamhet |
| **Social** | samhällen | demokrati, rättvisa |

Ibland räknas även **kulturell** hänsyn med. Om man bara prioriterar en av dimensionerna uppstår obalans. Ett symptom är **miljöproblem**.

!> Hållbar utveckling handlar inte bara om miljön. Ekonomi och sociala förhållanden måste också vara i balans.`,
      check: {
        id: "d6-l1-k",
        q: "Vilka är hållbar utvecklings tre dimensioner?",
        options: ["Vatten, luft och jord", "Ekologisk, ekonomisk och social", "Lokal, nationell och global", "Kväve, fosfor och kol"],
        answer: "Ekologisk, ekonomisk och social",
        explain: "Hållbar utveckling kräver ekologisk, ekonomisk och social hänsyn. Ibland räknas även kulturell hänsyn med.",
        lesson: "d6-l1",
      },
    },
    {
      id: "d6-l2",
      title: "Kolets kretslopp och kolsänkor",
      minutes: 5,
      source: "Växtfysiologi och hållbar utveckling, bild 8–9",
      body: `Fotosyntesen driver livet genom att binda koldioxid och producera syre. Därför är växterna centrala för klimatet.

## Växter är kolsänkor

Växter fungerar som naturliga **kolsänkor**. De tar upp koldioxid (CO~2~) från luften och omvandlar den till biomassa med fotosyntesen.

- **Skogar** är den största kolsänkan på land. Träd lagrar stora mängder kol i både ved och skogsmark.
- **Kustekosystem**, som sjögräsängar och mangroveskogar, är mycket effektiva. De lagrar stora mängder kol i sediment och rotsystem.
- **Våtmarker och stränder**: växtrika strandzoner vid sjöar och grunda havsvikar binder mycket kol i den syrefattiga botten, där nedbrytningen går långsamt.

> En kolsänka binder koldioxid och lagrar kolet. Skogen är den största kolsänkan på land.

!> Det är inte bara skog som binder kol. Våtmarker och kustekosystem lagrar också mycket kol, eftersom nedbrytningen går långsamt i syrefattig botten.`,
      check: {
        id: "d6-l2-k",
        q: "Vilken är den största kolsänkan på land?",
        options: ["Våtmarker", "Skogar", "Åkermark", "Städer"],
        answer: "Skogar",
        explain: "Skogarna är den största kolsänkan på land. Träden lagrar kol i ved och skogsmark. Våtmarker binder också mycket kol.",
        lesson: "d6-l2",
      },
    },
    {
      id: "d6-l3",
      title: "Klimatet, växthuseffekten och albedo",
      minutes: 9,
      source: "Växtfysiologi och hållbar utveckling, bild 10–16",
      body: `Klimatförändringarna är en av vår tids största frågor. För att förstå dem behöver du skilja på några begrepp.

## Väder och klimat

Meteorologer gör **väderprognoser** för timmar till veckor. **Klimat** är däremot de genomsnittliga fysiska förhållandena i atmosfären i en region under längre tid: temperatur, luftfuktighet, lufttryck, vind och nederbörd. Klimatologer arbetar med mätserier över flera årtionden.

## Växthuseffekten

Jorden tar emot solljus och **sänder ut värmestrålning**. Atmosfärens **växthusgaser** tar upp en del av värmestrålningen och strålar ut den igen, så att en del av värmen stannar kvar. Det fördröjer värmestrålningen tillbaka ut i rymden. Det kallas **växthuseffekten**.

De viktigaste växthusgaserna är **vattenånga**, **koldioxid** och **metan**. Utan växthuseffekten hade medeltemperaturen på jorden varit cirka −18 °C.

## Förstärkt växthuseffekt

Genomsnittstemperaturen och koldioxidutsläppen har ökat sedan slutet av 1800-talet, extra mycket efter 1990. Människans utsläpp **förstärker** växthuseffekten och leder till **global uppvärmning**.

- **Koldioxid (CO~2~)** kommer från förbränning av fossila bränslen och annat som innehåller kol, och från **avskogning**: färre växter tar upp koldioxid.
- **Metan (CH~4~)** kommer från idisslares matsmältning och från **permafrost** som smälter.

## Albedoeffekten

**Albedo** är ett mått på hur stor del av det inkommande **solljuset** som reflekteras tillbaka. Isen reflekterar en stor del av solljuset. När isarna smälter reflekteras mindre solljus ut i rymden igen. Albedot minskar, och jorden värms mer. Permafrosten innehåller dessutom mycket metan, som frigörs när den smälter. Värmen föder mer värme.

> Den förstärkta växthuseffekten och albedoeffekten förstärker varandra: värmen smälter is och permafrost, vilket ger ännu mer uppvärmning.

## Antropocen

I lektionsmaterialet kallas tiden sedan den industriella revolutionen på 1700-talet för **antropocen**, en ny tid präglad av människans utsläpp av koldioxid. Temperaturen och koldioxidhalten i atmosfären följs åt.

+> Begreppet antropocen används mycket, men det har inte antagits som en formell geologisk epok. Den internationella geologiska unionen röstade nej till förslaget år 2024, och den officiella epoken är fortfarande holocen.

## Växterna i ett varmare klimat

När temperaturen ökar avdunstar mer vatten från marken, och växterna riskerar att torka ut. För att minska vattenförlusten stänger växterna sina klyvöppningar. Under längre torrperioder har forskare sett att både skogar och jordbruksgrödor tar upp betydligt mindre koldioxid än normalt. Klimatförändringarna kan alltså försämra naturens egen förmåga att bromsa dem.

!> Växthuseffekten i sig är inte farlig. Utan den hade jorden varit cirka −18 °C. Problemet är den **förstärkta** växthuseffekten.`,
      check: {
        id: "d6-l3-k",
        q: "Vad är albedo?",
        options: ["Hur stor del av luften som består av koldioxid", "Hur mycket metan som är bundet i permafrosten", "Hur stor del av det inkommande solljuset som reflekteras", "Hur varm jorden är i genomsnitt under ett år"],
        answer: "Hur stor del av det inkommande solljuset som reflekteras",
        explain: "Albedo mäter hur stor del av det inkommande solljuset som reflekteras. Is har högt albedo.",
        lesson: "d6-l3",
      },
    },
    {
      id: "d6-l4",
      title: "Biologisk mångfald och ekosystemtjänster",
      minutes: 7,
      source: "Växtfysiologi och hållbar utveckling, bild 17–19",
      body: `Naturen gör mycket som vi tar för givet: pollinerar, renar vatten och bryter ner. Det fungerar bäst när mångfalden är stor.

## Biologisk mångfald på tre nivåer

**Biologisk mångfald**, eller biodiversitet, finns på tre nivåer:

1. **Genetisk mångfald**: variationen mellan individer inom samma art. Till exempel klarar vissa tallar torka bättre än andra, och vissa växter är mer motståndskraftiga mot sjukdomar.
2. **Artrikedom**: många olika arter inom ett område, till exempel bin, humlor, fjärilar, växter och svampar. Alla arter bidrar till ekosystemets funktion.
3. **Mångfald av ekosystem**: variationen mellan olika naturtyper och landskap, till exempel skogar, våtmarker, ängar och korallrev.

Biologisk mångfald gör ekosystemen stabilare och naturen mer motståndskraftig mot klimatförändringar. Den bidrar också till livsmedelsproduktion, vattenrening och klimatreglering.

## Ekosystemtjänster

En **ekosystemtjänst** är något naturen gör som människan har nytta av. Exempel är **pollinering**, syreproduktion, rent vatten och nedbrytning. Sol, vind och vatten för kraftproduktion är inte ekosystemtjänster, eftersom de är resultatet av fysikaliska processer och inte av levande organismer. Mineraler och fossila bränslen är inte heller ekosystemtjänster.

**Pollinering** innebär att pollen förs från ståndare till pistill. För många växter är det en förutsättning för fröbildning och frukter. Viktiga pollinatörer är bin, humlor, fjärilar och blomflugor. Om pollinatörerna blir färre får många växtarter svårare att föröka sig, och den biologiska mångfalden kan minska.

## Svamparna i kretsloppet

Svampar och växtrötter kan bilda **mykorrhiza**: växten ger socker från fotosyntesen, och svampen ger vatten och mineralnäring. Svampar och bakterier är också **nedbrytare** som återför näringsämnen till marken:

= döda organismer -> nedbrytning -> näringsämnen frigörs -> växter tar upp näringen -> fotosyntes och tillväxt -> nya organismer

Utan svampar och andra nedbrytare skulle näringsämnena låsas in i dött organiskt material, och ekosystemens produktivitet skulle minska.

> Biologisk mångfald finns på tre nivåer: genetisk mångfald, artrikedom och mångfald av ekosystem. Mångfalden gör ekosystemen stabila och ger oss ekosystemtjänster som pollinering.`,
      check: {
        id: "d6-l4-k",
        q: "Vilket av följande är en ekosystemtjänst?",
        options: ["Vindkraft", "Pollinering", "Fossila bränslen", "Mineraler"],
        answer: "Pollinering",
        explain: "Pollinering utförs av levande organismer och gynnar människan. Vindkraft är en fysikalisk process, och fossila bränslen och mineraler är inte beroende av levande organismer.",
        lesson: "d6-l4",
      },
    },
    {
      id: "d6-l5",
      title: "Övergödning och Östersjön",
      minutes: 6,
      source: "Växtfysiologi och hållbar utveckling, bild 20–22",
      body: `Växter behöver näring. Men vad händer när de får för mycket?

## Övergödning

**Övergödning** är när för mycket näringsämnen tillförs ett ekosystem. Vanligast är **kväve (N)** och **fosfor (P)**. Växter behöver de ämnena för att bygga DNA, ATP, proteiner, cellmembran med mera.

Problemet uppstår när människan tillför mer kväve och fosfor än kretsloppen kan hantera. Då växer växtplankton och alger explosionsartat.

## Östersjön

Näringsämnena kommer bland annat från gödsling av åkermark, djurhållning och avfall från hushåll.

1. Näringsämnen tillförs havet.
2. Växtplanktonen ökar kraftigt. Det blir **algblomning**.
3. När växtplanktonen dör sjunker de till botten.
4. Nedbrytare bryter ner dem och förbrukar allt syre.
5. Det bildas **syrefria, döda bottnar**. Torskens ägg dör, och fiskar dör.

Torsken har dessutom överfiskats, vilket ger **kaskadeffekter** med en ökad mängd producenter. Östersjön har också problem med miljögifter som kvicksilver, PCB och PFAS.

> Mer näring ger mer växtplankton. När planktonen dör förbrukar nedbrytningen syret, och bottnarna blir syrefria.

!> Det är inte algerna som tar slut på syret medan de växer. Det är nedbrytarna som förbrukar syret när de bryter ner döda alger på botten.`,
      check: {
        id: "d6-l5-k",
        q: "Vad förbrukar syret på bottnarna vid övergödning?",
        options: ["Algerna medan de växer vid ytan", "Fiskarna som simmar nära botten", "Nedbrytare som bryter ner döda växtplankton", "Kvävet som löses i bottenvattnet"],
        answer: "Nedbrytare som bryter ner döda växtplankton",
        explain: "När växtplanktonen dör sjunker de till botten, och nedbrytarna förbrukar syret när de bryter ner dem.",
        lesson: "d6-l5",
      },
    },
    {
      id: "d6-l6",
      title: "Miljögifter och planetära gränser",
      minutes: 7,
      source: "Växtfysiologi och hållbar utveckling, bild 23–24",
      body: `Precis som näring och energi transporteras genom ekosystemet kan **miljögifter** spridas mellan organismer.

## Varför stannar gifterna kvar?

Många miljögifter är **fettlösliga** och kan passera cellmembran. De lagras i organismernas vävnader, ofta i fettvävnad, eftersom kroppen har svårt att bryta ner eller utsöndra dem. Därför kan de finnas kvar i organismer under lång tid.

## Bioackumulation och biomagnifikation

| Begrepp | Vad som händer |
| --- | --- |
| **Bioackumulation** | Halten miljögift i **en organism** ökar successivt över tid, eftersom giftet bryts ner långsamt och lagras i vävnaderna. |
| **Biomagnifikation** | Koncentrationen ökar för **varje trofinivå** i näringskedjan, när organismer äter varandra. Toppredatorer får de högsta halterna. |

Exempel på toppredatorer som får höga halter är havsörn, säl och människa.

> Bioackumulation sker i en organism över tid. Biomagnifikation sker mellan nivåerna i en näringskedja.

!> Blanda inte ihop begreppen: bioackumulation gäller en organism, biomagnifikation gäller hela näringskedjan.

## Hur mycket tål jorden?

Materialet avslutar med en fråga: om mänskliga aktiviteter kan påverka hela ekosystem, hur mycket påverkan tål jordens system innan de riskerar att förändras permanent?

+> **De planetära gränserna** är ett sätt att svara på frågan. Forskare har pekat ut nio av jordens system som tillsammans håller planeten stabil, till exempel klimatet, den biologiska mångfalden, sötvattnet och kretsloppen av kväve och fosfor. För varje system finns en gräns som mänskligheten inte bör passera. Enligt rapporten Planetary Health Check 2026 från Potsdaminstitutet för klimatforskning är sju av de nio gränserna överskridna. Bilden på bild 24 i lektionsmaterialet visar en äldre bedömning, där sex av nio gränser var överskridna.`,
      check: {
        id: "d6-l6-k",
        q: "Vilka organismer får högst halter av miljögifter genom biomagnifikation?",
        options: ["Växtplankton", "Toppredatorer", "Nedbrytare", "Växter"],
        answer: "Toppredatorer",
        explain: "Koncentrationen ökar för varje trofinivå, så toppredatorer som havsörn och säl får de högsta halterna.",
        lesson: "d6-l6",
      },
    },
  ],
  cards: [
    { id: "d6-k01", front: "Hållbar utveckling", back: "En utveckling som tillfredsställer våra behov idag utan att äventyra framtida generationers möjligheter.", lesson: "d6-l1" },
    { id: "d6-k02", front: "Hållbar utvecklings tre dimensioner", back: "Ekologisk, ekonomisk och social. Ibland räknas även kulturell med.", lesson: "d6-l1" },
    { id: "d6-k03", front: "Vad leder ensidig prioritering till?", back: "Obalans. Ett symptom är miljöproblem.", lesson: "d6-l1" },
    { id: "d6-k04", front: "Kolsänka", back: "Något som binder koldioxid och lagrar kolet, till exempel skog.", lesson: "d6-l2" },
    { id: "d6-k05", front: "Den största kolsänkan på land", back: "Skogarna. Träden lagrar kol i ved och skogsmark.", lesson: "d6-l2" },
    { id: "d6-k06", front: "Varför binder våtmarker mycket kol?", back: "Nedbrytningen går långsamt i den syrefattiga botten.", lesson: "d6-l2" },
    { id: "d6-k07", front: "Väder och klimat", back: "Meteorologer gör väderprognoser för timmar till veckor. Klimatologer studerar genomsnittet under flera årtionden.", lesson: "d6-l3" },
    { id: "d6-k08", front: "Växthuseffekten", back: "Växthusgaser tar upp en del av jordens värmestrålning och strålar ut den igen, så att värme stannar kvar.", lesson: "d6-l3" },
    { id: "d6-k09", front: "Växthusgaser", back: "Framför allt vattenånga, koldioxid och metan.", lesson: "d6-l3" },
    { id: "d6-k10", front: "Jordens medeltemperatur utan växthuseffekt", back: "Cirka −18 °C.", lesson: "d6-l3" },
    { id: "d6-k11", front: "Förstärkt växthuseffekt", back: "Människans utsläpp av växthusgaser förstärker växthuseffekten och ger global uppvärmning.", lesson: "d6-l3" },
    { id: "d6-k12", front: "Var kommer koldioxid- och metanutsläppen ifrån?", back: "CO~2~: fossila bränslen och avskogning. CH~4~: idisslare och smältande permafrost.", lesson: "d6-l3" },
    { id: "d6-k13", front: "Albedo", back: "Ett mått på hur stor del av det inkommande solljuset som reflekteras tillbaka.", lesson: "d6-l3" },
    { id: "d6-k14", front: "Varför föder värme mer värme?", back: "Smältande is sänker albedot, och smältande permafrost släpper ut metan.", lesson: "d6-l3" },
    { id: "d6-k15", front: "Antropocen", back: "I materialet: tiden sedan den industriella revolutionen, präglad av människans koldioxidutsläpp.", lesson: "d6-l3" },
    { id: "d6-k16", front: "Biologisk mångfald, tre nivåer", back: "Genetisk mångfald, artrikedom och mångfald av ekosystem.", lesson: "d6-l4" },
    { id: "d6-k17", front: "Genetisk mångfald", back: "Variationen mellan individer inom samma art.", lesson: "d6-l4" },
    { id: "d6-k18", front: "Ekosystemtjänst", back: "Något naturen gör som människan har nytta av, till exempel pollinering.", lesson: "d6-l4" },
    { id: "d6-k19", front: "Varför är nedbrytare viktiga?", back: "De återför näringsämnen till marken, så att växterna kan använda dem igen.", lesson: "d6-l4" },
    { id: "d6-k20", front: "Övergödning", back: "När för mycket näringsämnen, främst kväve och fosfor, tillförs ett ekosystem.", lesson: "d6-l5" },
    { id: "d6-k21", front: "Syrefria döda bottnar", back: "Uppstår när nedbrytare förbrukar syret medan de bryter ner döda växtplankton.", lesson: "d6-l5" },
    { id: "d6-k22", front: "Bioackumulation", back: "Halten miljögift i en organism ökar över tid.", lesson: "d6-l6" },
    { id: "d6-k23", front: "Biomagnifikation", back: "Koncentrationen miljögift ökar för varje trofinivå i näringskedjan.", lesson: "d6-l6" },
    { id: "d6-k24", front: "Varför lagras miljögifter i kroppen?", back: "De är fettlösliga och svåra för kroppen att bryta ner eller utsöndra.", lesson: "d6-l6" },
    { id: "d6-k25", front: "De planetära gränserna", back: "Gränser för nio av jordens system. Enligt en rapport från 2026 är sju av dem överskridna.", lesson: "d6-l6", supplement: true },
  ],
  quiz: [
    {
      id: "d6-q01", level: "E", lesson: "d6-l1",
      q: "Vilken dimension av hållbar utveckling handlar om demokrati och rättvisa?",
      options: ["Den ekologiska", "Den ekonomiska", "Den sociala", "Den kulturella"],
      answer: "Den sociala",
      explain: "Den sociala dimensionen handlar om samhällen i balans, med demokrati och rättvisa. Den ekonomiska gäller produktion och handel.",
    },
    {
      id: "d6-q02", level: "E", lesson: "d6-l2",
      q: "Hur fungerar växter som kolsänkor?",
      options: ["De tar upp koldioxid och omvandlar den till biomassa", "De släpper ut koldioxid och lagrar syre i rötterna", "De lagrar metan i rötterna så att det inte når luften", "De reflekterar solljus så att jorden inte värms upp"],
      answer: "De tar upp koldioxid och omvandlar den till biomassa",
      explain: "Med fotosyntesen tar växterna upp koldioxid ur luften och binder kolet i biomassa.",
    },
    {
      id: "d6-q03", level: "E", lesson: "d6-l3",
      q: "Vilka är de viktigaste växthusgaserna enligt lektionen?",
      options: ["Syrgas, kvävgas och argon", "Vattenånga, koldioxid och metan", "Ozon, väte och helium", "Kväve, fosfor och kol"],
      answer: "Vattenånga, koldioxid och metan",
      explain: "Växthusgaserna är framför allt vattenånga, koldioxid och metan. Kväve och fosfor hör till övergödningen.",
    },
    {
      id: "d6-q04", level: "E", lesson: "d6-l3",
      q: "Ungefär vilken medeltemperatur hade jorden haft utan växthuseffekten?",
      options: ["0 °C", "+15 °C", "−50 °C", "−18 °C"],
      answer: "−18 °C",
      explain: "Utan växthuseffekten hade medeltemperaturen varit cirka −18 °C. Växthuseffekten i sig är alltså livsviktig.",
    },
    {
      id: "d6-q05", level: "E", lesson: "d6-l3",
      q: "Vad är klimat?",
      options: ["Vädret just nu på en viss plats", "Prognosen för de närmaste dagarna och veckorna", "Genomsnittliga förhållanden i atmosfären under lång tid", "Mängden regn som faller under ett visst år"],
      answer: "Genomsnittliga förhållanden i atmosfären under lång tid",
      explain: "Klimat är de genomsnittliga förhållandena i en region under längre tid. Väder är förhållandena under timmar till veckor.",
    },
    {
      id: "d6-q06", level: "E", lesson: "d6-l4",
      q: "Vilka är den biologiska mångfaldens tre nivåer?",
      options: ["Genetisk mångfald, artrikedom och mångfald av ekosystem", "Producenter, konsumenter och nedbrytare i ett ekosystem", "Kväve, fosfor och kol i naturens olika kretslopp", "Ekologisk, ekonomisk och social hållbar utveckling"],
      answer: "Genetisk mångfald, artrikedom och mångfald av ekosystem",
      explain: "Biologisk mångfald finns på tre nivåer: inom arter, mellan arter och mellan ekosystem. Ekologisk, ekonomisk och social är hållbar utvecklings dimensioner.",
    },
    {
      id: "d6-q07", level: "E", lesson: "d6-l4",
      q: "Vad är en ekosystemtjänst?",
      options: ["En myndighet som skyddar naturen i Sverige", "Något naturen gör som människan har nytta av", "Ett fossilt bränsle som utvinns ur naturen", "En typ av gödsel som sprids på åkermark"],
      answer: "Något naturen gör som människan har nytta av",
      explain: "En ekosystemtjänst är något naturen gör som människan har nytta av, till exempel pollinering eller rent vatten.",
    },
    {
      id: "d6-q08", level: "E", lesson: "d6-l5",
      q: "Vilka två näringsämnen ger oftast övergödning?",
      options: ["Kol och syre", "Kväve och fosfor", "Järn och magnesium", "Kalium och kalcium"],
      answer: "Kväve och fosfor",
      explain: "Övergödning orsakas oftast av kväve (N) och fosfor (P), som växter behöver för att bygga bland annat DNA och proteiner.",
    },
    {
      id: "d6-q09", level: "E", lesson: "d6-l6",
      q: "Vad är bioackumulation?",
      options: ["Att halten miljögift i en organism ökar över tid", "Att miljögifter bryts ner snabbt av nedbrytare", "Att växter tar upp koldioxid och lagrar kol", "Att näringsämnen återförs till marken efter döden"],
      answer: "Att halten miljögift i en organism ökar över tid",
      explain: "Bioackumulation sker i en organism: giftet lagras i vävnaderna och halten ökar över tid. Ökningen mellan trofinivåer kallas biomagnifikation.",
    },
    {
      id: "d6-q10", level: "E", lesson: "d6-l5",
      q: "Var kommer näringsämnena som övergöder Östersjön ifrån, enligt lektionen?",
      options: ["Bara från fartyg och oljeutsläpp till havs", "Från vulkaner och berggrunden runt Östersjön", "Bland annat från gödsling, djurhållning och hushållsavfall", "Från smältande isar och snö i fjällen"],
      answer: "Bland annat från gödsling, djurhållning och hushållsavfall",
      explain: "Näringsämnena kommer bland annat från gödsling av åkermark, djurhållning och utsläpp av avfall från hushåll.",
    },
    {
      id: "d6-q11", level: "C", lesson: "d6-l3",
      q: "Hur fungerar växthuseffekten?",
      options: ["Växthusgaserna reflekterar inkommande solljus tillbaka ut mot rymden innan det når marken", "Isarna sänder ut värme som atmosfären sedan håller kvar runt hela jorden", "Ozonlagret släpper in mer solljus när halten av växthusgaser i luften ökar", "Jorden sänder ut värmestrålning, och växthusgaser tar upp och strålar ut en del av den igen"],
      answer: "Jorden sänder ut värmestrålning, och växthusgaser tar upp och strålar ut en del av den igen",
      explain: "Jorden sänder ut värmestrålning. Växthusgaserna tar upp en del av den och strålar ut den igen, så att en del av värmen stannar kvar.",
    },
    {
      id: "d6-q12", level: "C", lesson: "d6-l3",
      q: "Varför minskar albedot när isarna smälter?",
      options: ["Isen släpper ut koldioxid när den smälter och gör luften mörkare", "Smältvattnet gör havet saltare, och saltvatten reflekterar mindre", "Solen lyser starkare när det blir varmare på jorden", "Is reflekterar mycket solljus, så när den försvinner reflekteras mindre"],
      answer: "Is reflekterar mycket solljus, så när den försvinner reflekteras mindre",
      explain: "Isen reflekterar en stor del av solljuset. När isarna smälter reflekteras mindre, och jorden värms mer.",
    },
    {
      id: "d6-q13", level: "C", lesson: "d6-l3",
      q: "Hur bidrar avskogning till global uppvärmning?",
      options: ["Träd släpper ut metan", "Skogen ökar albedot", "Avskogning minskar mängden vattenånga", "Färre växter tar upp koldioxid"],
      answer: "Färre växter tar upp koldioxid",
      explain: "När skog huggs ner blir det färre växter som tar upp koldioxid med fotosyntesen. Skogarna är den största kolsänkan på land.",
    },
    {
      id: "d6-q14", level: "C", lesson: "d6-l4",
      q: "Varför är biologisk mångfald viktig?",
      options: ["Den gör att färre arter behöver konkurrera om maten", "Den minskar pollineringen så att växterna sprids mindre", "Den behövs bara för turismen och friluftslivet", "Den gör ekosystemen stabilare och mer motståndskraftiga"],
      answer: "Den gör ekosystemen stabilare och mer motståndskraftiga",
      explain: "Mångfald ökar ekosystemens stabilitet och motståndskraft mot klimatförändringar. Den bidrar också till livsmedel, vattenrening och klimatreglering.",
    },
    {
      id: "d6-q15", level: "C", lesson: "d6-l5",
      q: "Varför blir bottnarna syrefria vid övergödning?",
      options: ["Algerna förbrukar allt syre vid ytan medan de växer", "Nedbrytare förbrukar syret när de bryter ner döda växtplankton", "Kvävet från åkrarna binder syret i bottenvattnet", "Fiskarna förbrukar syret när de blir för många"],
      answer: "Nedbrytare förbrukar syret när de bryter ner döda växtplankton",
      explain: "Den stora mängden växtplankton dör och sjunker. Nedbrytarna förbrukar allt syre när de bryter ner dem, och bottnarna blir döda.",
    },
    {
      id: "d6-q16", level: "C", lesson: "d6-l6",
      q: "Vad är skillnaden mellan bioackumulation och biomagnifikation?",
      options: ["Bioackumulation sker i en organism över tid, biomagnifikation mellan trofinivåer", "De betyder samma sak och kan användas om varandra i alla sammanhang", "Biomagnifikation sker bara i växter, bioackumulation bara i djur", "Bioackumulation sker bara i toppredatorer, biomagnifikation i plankton"],
      answer: "Bioackumulation sker i en organism över tid, biomagnifikation mellan trofinivåer",
      explain: "Bioackumulation gäller en organism. Biomagnifikation gäller näringskedjan: halten ökar för varje trofinivå.",
    },
    {
      id: "d6-q17", level: "C", lesson: "d6-l6",
      q: "Varför lagras många miljögifter i fettvävnad?",
      options: ["De är vattenlösliga och följer med blodet ut ur kroppen", "De är fettlösliga och svåra för kroppen att bryta ner", "De bryts ner snabbt och lagras därför bara en kort tid", "De binds till kitin i cellväggarna hos alla djur"],
      answer: "De är fettlösliga och svåra för kroppen att bryta ner",
      explain: "Fettlösliga gifter passerar cellmembran och lagras i vävnaderna, eftersom kroppen har svårt att bryta ner eller utsöndra dem.",
    },
    {
      id: "d6-q18", level: "A", lesson: "d6-l3",
      q: "Hur kan ett varmare klimat försämra naturens förmåga att bromsa klimatförändringarna?",
      options: ["Växter stänger klyvöppningarna vid torka och tar upp mindre koldioxid", "Växter växer alltid snabbare och binder mer kol när det blir varmt", "Värmen ökar albedot, så att mer solljus når växterna", "Värmen gör att permafrosten binder mer metan än tidigare"],
      answer: "Växter stänger klyvöppningarna vid torka och tar upp mindre koldioxid",
      explain: "Vid värme och torka stänger växterna klyvöppningarna för att spara vatten. Då tar skogar och grödor upp mindre koldioxid, och kolsänkan försvagas.",
    },
    {
      id: "d6-q19", level: "A", lesson: "d6-l4",
      q: "Vad kan hända med den biologiska mångfalden om pollinatörerna minskar?",
      options: ["Den ökar, eftersom färre insekter äter av växterna", "Den påverkas inte, eftersom växterna kan föröka sig ändå", "Den minskar, eftersom många växter får svårare att föröka sig", "Bara de vindpollinerade växterna försvinner från området"],
      answer: "Den minskar, eftersom många växter får svårare att föröka sig",
      explain: "Utan pollinatörer får många växter svårare att bilda frön och frukter. Då kan växtarter minska, och med dem andra arter som är beroende av dem.",
    },
    {
      id: "d6-q20", level: "A", lesson: "d6-l6",
      q: "En sjö innehåller ett fettlösligt miljögift. Vilken organism får sannolikt högst halt?",
      options: ["Växtplankton i ytvattnet", "Små kräftdjur som äter plankton", "Fiskätande fåglar som havsörn", "Vattenväxter längs stranden"],
      answer: "Fiskätande fåglar som havsörn",
      explain: "Genom biomagnifikation ökar halten för varje trofinivå. Havsörnen är toppredator och får därför högst halt.",
    },
  ],
  practice: [
    {
      id: "d6-p1", kind: "order", level: "C", lesson: "d6-l5",
      q: "Sätt stegen i ordning: övergödningen i Östersjön.",
      steps: [
        "Kväve och fosfor från åkrar, djurhållning och hushåll når havet",
        "Växtplankton växer explosionsartat och det blir algblomning",
        "Växtplanktonen dör och sjunker till botten",
        "Nedbrytare bryter ner dem och förbrukar syret",
        "Bottnarna blir syrefria och torskens ägg dör",
      ],
      explain: "För mycket näring ger mer växtplankton. Det är nedbrytningen av det döda planktonet som förbrukar syret.",
    },
    {
      id: "d6-p2", kind: "self", level: "C", lesson: "d6-l3",
      q: "Förklara skillnaden mellan växthuseffekten och den förstärkta växthuseffekten.",
      solution: `**Växthuseffekten** är naturlig. Jorden sänder ut värmestrålning, och växthusgaserna (vattenånga, koldioxid och metan) tar upp en del av den och strålar ut den igen. Utan växthuseffekten hade medeltemperaturen varit cirka −18 °C.

Den **förstärkta växthuseffekten** beror på människan. Utsläpp av koldioxid från fossila bränslen och avskogning, och av metan från idisslare och smältande permafrost, ökar halten av växthusgaser. Då stannar mer värme kvar, och det leder till global uppvärmning.`,
    },
    {
      id: "d6-p3", kind: "self", level: "A", lesson: "d6-l4",
      q: "Vad har växterna för betydelse för miljöproblem som förstärkt växthuseffekt, övergödning, minskande biologisk mångfald och miljögifter?",
      hint: "Ta ett miljöproblem i taget.",
      solution: `- **Förstärkt växthuseffekt**: växter är kolsänkor. Skog, våtmarker och kustekosystem binder koldioxid. Avskogning och torka försvagar kolsänkan.
- **Övergödning**: för mycket kväve och fosfor gör att växtplankton och alger växer explosionsartat. När de dör förbrukar nedbrytningen syret.
- **Biologisk mångfald**: växter och pollinatörer är beroende av varandra. Färre pollinatörer gör att växter får svårare att föröka sig. Växter och svampar samarbetar i mykorrhiza.
- **Miljögifter**: gifterna förs vidare i näringskedjan från producenterna och ökar för varje trofinivå (biomagnifikation).`,
    },
    {
      id: "d6-p4", kind: "number", level: "E", lesson: "d6-l3",
      q: "Vilken medeltemperatur hade jorden ungefär haft utan växthuseffekten? Svara i grader Celsius.",
      answer: -18,
      unit: "°C",
      hint: "Tänk på om det hade varit varmare eller kallare än i dag.",
      solution: "Utan växthuseffekten hade medeltemperaturen varit cirka **−18 °C**.",
    },
    {
      id: "d6-p5", kind: "text", level: "E", lesson: "d6-l2",
      q: "Vad kallas något som binder koldioxid och lagrar kolet, till exempel en skog?",
      answer: ["kolsänka", "kolsänkor"],
      solution: "Det kallas en **kolsänka**.",
    },
    {
      id: "d6-p6", kind: "text", level: "E", lesson: "d6-l3",
      q: "Vad kallas måttet på hur stor del av det inkommande solljuset som reflekteras?",
      answer: ["albedo", "albedot"],
      solution: "Det kallas **albedo**. Is har högt albedo.",
    },
    {
      id: "d6-p7", kind: "text", level: "E", lesson: "d6-l6",
      q: "Vad kallas det när koncentrationen av ett miljögift ökar för varje trofinivå?",
      answer: ["biomagnifikation"],
      solution: "Det kallas **biomagnifikation**.",
    },
    {
      id: "d6-p8", kind: "text", level: "E", lesson: "d6-l4",
      q: "Vad kallas variationen mellan individer inom samma art?",
      answer: ["genetisk mångfald", "genetisk variation"],
      solution: "Det kallas **genetisk mångfald**.",
    },
  ],
  keyPoints: [
    "**Hållbar utveckling** tillfredsställer dagens behov utan att äventyra framtida generationers. Tre dimensioner: ekologisk, ekonomisk och social.",
    "Växter är **kolsänkor**. Skogen är den största på land, men våtmarker och kustekosystem lagrar också mycket kol.",
    "**Växthuseffekten**: jorden sänder ut värmestrålning som växthusgaser (vattenånga, CO~2~, metan) tar upp och strålar ut igen. Utan den: cirka −18 °C.",
    "Den **förstärkta växthuseffekten** kommer från fossila bränslen, avskogning, idisslare och smältande permafrost.",
    "**Albedo** är hur stor del av det inkommande solljuset som reflekteras. Smältande is ger lägre albedo och mer uppvärmning.",
    "**Biologisk mångfald** finns på tre nivåer: genetisk mångfald, artrikedom och mångfald av ekosystem. **Pollinering** är en viktig ekosystemtjänst.",
    "**Övergödning** med kväve och fosfor ger algblomning, och nedbrytningen ger **syrefria bottnar**.",
    "**Bioackumulation** sker i en organism, **biomagnifikation** längs näringskedjan. Toppredatorer får högst halter.",
  ],
};
