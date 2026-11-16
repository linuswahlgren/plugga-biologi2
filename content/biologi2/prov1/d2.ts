/**
 * Del 2 · Växtens vävnader och transport
 * Sources: Växtfysiologi del 1, bild 4–20; Växtfysiologi del 2, bild 2–3 (ringbarkning).
 * Supplementary: what "totipotent" means, shoot and root system, palisade and spongy tissue
 * (concept-list terms the slides don't explain), and why lack of oxygen stops ion uptake.
 */
import type { Week } from "../../../src/types.ts";

export const d2: Week = {
  id: "d2",
  exam: "prov1",
  title: "Växtens vävnader och transport",
  summary:
    "Växtens fyra vävnadstyper, hur meristem och kambium får växten att växa, och hur vatten, joner och socker transporteras i xylem och floem.",
  goals: [
    "beskriva växtens fyra vävnadstyper och dess organ",
    "förklara hur meristem och kambium får växten att växa och bilda årsringar",
    "förklara hur vatten transporteras med rottryck, vattenpelare och transpiration",
    "förklara tryckströmsteorin och vad som händer om man ringbarkar ett träd",
  ],
  lessons: [
    {
      id: "d2-l1",
      title: "Vävnadstyper och organ",
      minutes: 6,
      source: "Växtfysiologi del 1, bild 4–5, 7",
      body: `En gran, en maskros och en tulpan ser helt olika ut. Ändå är de byggda av samma sorts vävnader.

## Samma sorts celler

Olika växter har samma typ av celler, med cellväggar av cellulosa. Växternas celler är **totipotenta**. Cellerna sitter ihop i olika **vävnader**, och vävnaderna bygger upp växtens olika delar.

+> Att en cell är **totipotent** betyder att den kan utvecklas till alla typer av celler i organismen. En **odifferentierad** cell har ännu inte fått någon specifik uppgift.

## Fyra vävnadstyper

Fyra vävnader är gemensamma för alla växter:

- **Epidermis** är växtens hud.
- **Grundvävnad** kan vara mjuk, med tunna cellväggar, eller hård och fungera som stödjevävnad. I bladen sköter grundvävnaden fotosyntesen och lagrar det som bildas.
- **Ledningsvävnad** delas upp i **xylem** och **floem**. Xylemet är växtens veddel och transporterar vatten och oorganiska ämnen. Floemet är sildelen och transporterar socker och organiska ämnen.
- **Delningsvävnad**, eller meristem, är där nya celler bildas.

> Alla växter har fyra vävnadstyper: epidermis, grundvävnad, ledningsvävnad och delningsvävnad.

## Organen

Växtens organ är **blad**, **stam** och **rot**. I alla tre finns epidermis ytterst, grundvävnad och ledningsvävnad.

+> Stammen och bladen ovan jord kallas tillsammans växtens **skottsystem**, och rötterna bildar **rotsystemet**. Bladets grundvävnad består av **mesofyllceller**. Överst ligger **palissadvävnaden** med tätt packade, avlånga celler, och under den **svampvävnaden**, som är luftig.

!> Xylem och floem är inte samma sak. Xylemet leder vatten och oorganiska ämnen, floemet leder socker och organiska ämnen.`,
      check: {
        id: "d2-l1-k",
        q: "Vilken vävnad är växtens hud?",
        options: ["Grundvävnaden", "Epidermis", "Floemet", "Meristemet"],
        answer: "Epidermis",
        explain: "Epidermis är växtens hud, det yttersta lagret. Grundvävnaden ligger innanför och kan sköta fotosyntes, lagring och stöd.",
        lesson: "d2-l1",
      },
    },
    {
      id: "d2-l2",
      title: "Cellväggen, meristem och årsringar",
      minutes: 6,
      source: "Växtfysiologi del 1, bild 6–7, 10",
      body: `Ett träd kan bli både högt och tjockt. Det beror på vävnader där cellerna hela tiden delar sig.

## Cellväggen ger stöd

Cellväggen ser olika ut beroende på var i växten cellen sitter och vilken växt det är. Gemensamt för alla växtceller är att cellväggen innehåller **cellulosa**. Andra ämnen kan stabilisera cellväggen:

- **hemicellulosa**
- **lignin**, vedämne
- **pektin**, som är geléartat.

Cellerna kommunicerar med varandra genom små porer, **plasmodesmer**. Så hänger alla celler i en växt ihop.

## Meristem – där växten växer

**Meristem** är delningsvävnad. Där delar sig cellerna, så att växten kan växa både på längden och på bredden. Meristem finns i olika zoner i växten. En tydlig zon finns längst ut i roten, precis bakom själva **rotspetsen**, där cellerna delar sig mycket snabbt. Bakom meristemet får cellerna sina specifika egenskaper. De **differentieras**.

Zonen mellan ved och bark i en stam är också ett slags meristem: **kambiet**.

## Årsringar

När stammen växer i tjocklek bildas nytt xylem på insidan av kambiet.

- På våren blir de nya cellerna stora, med tunna väggar.
- På hösten blir de små, med tjocka väggar.

Skillnaden syns som **årsringar**. Genom att räkna dem kan man bestämma ett träds ålder.

> Meristem är växtens delningsvävnad. Kambiet är ett meristem mellan ved och bark, och det bildar årsringarna.

!> En årsring är inte en enda cellrad. Den består av alla celler som bildats under ett år: stora från våren och små från hösten.`,
      check: {
        id: "d2-l2-k",
        q: "Var finns kambiet?",
        options: ["I rotspetsen", "I bladens epidermis", "Mellan ved och bark i stammen", "Inne i floemets silceller"],
        answer: "Mellan ved och bark i stammen",
        explain: "Kambiet är ett meristem mellan ved och bark. Det bildar nytt xylem på insidan, och det ger årsringarna. Ett annat meristem finns längst ut i roten, precis bakom rotspetsen.",
        lesson: "d2-l2",
      },
    },
    {
      id: "d2-l3",
      title: "Xylemet och rottrycket",
      minutes: 8,
      source: "Växtfysiologi del 1, bild 8–12",
      body: `Ett träd kan inte gå till kranen. Allt vatten måste tas upp genom rötterna och lyftas upp genom stammen.

## Ledningsvävnaden – växtens blodkärl

Ledningsvävnaden finns överallt i växten, från de finaste rötterna till bladens spetsar. När växten växer, växer nätverket med. Man kan jämföra det med våra blodkärl.

- **Xylem** transporterar vatten och oorganiska ämnen.
- **Floem** transporterar socker och organiska ämnen.

## Xylemet är döda rör

Xylemet, veddelen, är ett rörliknande system av **döda celler** som sträcker sig genom hela växten. Det finns två typer:

- **Trakeider** är smala, små rör.
- **Kärl** är stora, rymliga rör.

Barrträd har bara trakeider.

Transporten av vatten och lösta ämnen upp genom stammen drivs av **solenergi**. Den är **inte** aktiv transport. Men jonerna som tas in i rötterna kräver aktiv transport.

## Rottryck

1. Rötterna tar upp lösta ämnen, joner och salter, med **aktiv transport**. Det kräver energi i form av **ATP**.
2. Koncentrationen av salter och joner i roten ökar.
3. Vatten strömmar in i roten med **osmos**, för att jämna ut skillnaden.
4. Vattnet pressas uppåt i växten. Det kallas **rottryck**. Man kan se det om man skär av en stjälk.

## Den aktiva transporten i rötterna

Ämnena från jordens vatten måste passera ett lager **levande celler** innan de når rotens xylem.

- Rotcellerna pumpar ut **vätejoner** med hjälp av ATP.
- Samtidigt öppnas kanaler för positivt laddade metalljoner.
- Det blir ett underskott av positiva joner inne i cellen, och metalljoner från marken tar sig in.
- Koncentrationen av lösta ämnen blir högre i roten än utanför, och vatten följer efter med osmos.

> Rötterna tar upp joner med aktiv transport. Vattnet följer efter med osmos, och det skapar rottryck.

!> Vattnet pumpas inte in med ATP. Det är jonerna som kräver aktiv transport. Vattnet följer passivt efter med osmos.`,
      check: {
        id: "d2-l3-k",
        q: "Vad kräver aktiv transport i roten?",
        options: ["Vattnets väg in i roten", "Upptaget av joner från jorden", "Avdunstningen i bladen", "Vattnets väg upp genom stammen"],
        answer: "Upptaget av joner från jorden",
        explain: "Jonerna tas upp med aktiv transport, som kostar ATP. Vattnet följer sedan passivt efter med osmos.",
        lesson: "d2-l3",
      },
    },
    {
      id: "d2-l4",
      title: "Transpiration och vattenpelaren",
      minutes: 7,
      source: "Växtfysiologi del 1, bild 13–18",
      body: `Rottrycket förklarar en del av vattentransporten. Men hur når vattnet toppen av ett högt träd?

## För mycket vatten

Vad händer om man vattnar en krukväxt för mycket? Den **sloknar**, precis som om den hade fått för lite vatten. Rötterna får **syrebrist**, och det leder till näringsbrist och vattenbrist.

+> Rotcellerna får sin energi, ATP, genom cellandning, och cellandningen kräver syre. Utan syre kan rötterna inte ta upp joner med aktiv transport, och då tas mindre vatten upp med osmos.

## Räcker rottrycket?

Klarar ett träd på över 100 meter att lyfta vatten till bladen med bara rottryck? Nej. Det behövs mer.

## Transpiration

I bladen finns små öppningar, **klyvöppningar** (stomata). Genom dem tar bladet in koldioxid för fotosyntesen. Samtidigt släpper klyvöppningarna ut vatten som avdunstar. Avdunstningen kallas **transpiration**. Vatten behöver släppas ut för att kyla ner bladen och för att transportera näringsämnen med vattnet.

+> Varje klyvöppning omges av två **slutceller**, som öppnar och stänger den.

**Energikällan** till vattnets transport är solljuset, som får vattnet att avdunsta i bladen.

## Vattenpelaren

Vattenmolekylen är en **dipol**. Vattenmolekylerna attraherar varandra med **vätebindningar**. Därför hänger vattnet ihop som en **vattenpelare** i xylemet. När vatten avdunstar i bladen dras nytt vatten upp genom pelaren.

> Tre saker samverkar: **rottrycket** pressar upp vatten från roten, **vattenpelaren** håller ihop flödet i stammen och **transpirationen** suger upp vattnet till bladen.

!> Vattnet transporteras inte upp i stammen med aktiv transport. Energin kommer från solen, som får vattnet att avdunsta.`,
      check: {
        id: "d2-l4-k",
        q: "Vad är energikällan till vattnets transport upp i ett högt träd?",
        options: ["Rottrycket ensamt, utan hjälp från bladen", "ATP i stammens levande celler", "Socker som floemet för upp från rötterna", "Solljuset, som får vattnet att avdunsta"],
        answer: "Solljuset, som får vattnet att avdunsta",
        explain: "Solljuset får vattnet att avdunsta från bladen, och det suger upp vatten genom vattenpelaren. Rottrycket räcker inte ensamt i ett högt träd.",
        lesson: "d2-l4",
      },
    },
    {
      id: "d2-l5",
      title: "Floemet, tryckströmsteorin och ringbarkning",
      minutes: 8,
      source: "Växtfysiologi del 1, bild 19–20; Växtfysiologi del 2, bild 2–3",
      body: `Bladen tillverkar socker, men rötterna och blommorna behöver också energi. Floemet är vägen dit.

## Floemet – sildelen

**Floemet** transporterar socker och organiska ämnen, till exempel aminosyror. Det kallas också **sildelen**. Sockret från fotosyntesen i bladen måste kunna transporteras till växtens andra delar.

Floemet består av **levande celler**:

- **Silceller** saknar cellkärna.
- **Följeceller** har cellkärna.

## Tryckströmsteorin

1. Socker förs in i bladets silceller från följecellerna med **aktiv transport**, som kostar ATP.
2. Sockerkoncentrationen i silcellerna blir hög, och vatten strömmar in med **osmos**.
3. Trycket i silcellen blir högt, och sockervätskan pressas framåt i floemet.
4. Där växten behöver socker transporteras sockret aktivt ut ur silcellerna.
5. Vattnet följer med ut, trycket minskar och mer sockervätska från bladen kan strömma dit.

> Socker pumpas in i floemet i bladen, vatten följer efter med osmos och trycket driver sockervätskan dit där sockret används.

## Vad händer om man ringbarkar ett träd?

Barken består av flera lager. Det innersta lagret är det levande floemet, som ligger precis utanför kambiet. Xylemet, veden, ligger innanför kambiet. Om man skär bort en ring av bark runt hela stammen följer floemet med. Då kan socker från bladen inte längre nå rötterna. Xylemet är kvar, så vatten kan fortfarande ledas upp till bladen en tid. Men rötterna får ingen energi, och till slut dör trädet.

!> Det är inte vattentransporten som stoppas när man ringbarkar. Det är sockertransporten i floemet.`,
      check: {
        id: "d2-l5-k",
        q: "Vad saknar silcellerna?",
        options: ["Cellvägg", "Cellmembran", "Cellkärna", "Cytoplasma"],
        answer: "Cellkärna",
        explain: "Silcellerna i floemet är levande men saknar cellkärna. Följecellerna bredvid har cellkärna.",
        lesson: "d2-l5",
      },
    },
  ],
  cards: [
    { id: "d2-k01", front: "Totipotent cell", back: "En cell som kan utvecklas till alla typer av celler i växten.", lesson: "d2-l1", supplement: true },
    { id: "d2-k02", front: "Växtens fyra vävnadstyper", back: "Epidermis, grundvävnad, ledningsvävnad och delningsvävnad (meristem).", lesson: "d2-l1" },
    { id: "d2-k03", front: "Epidermis", back: "Växtens hud, det yttersta cellagret.", lesson: "d2-l1" },
    { id: "d2-k04", front: "Grundvävnad", back: "Mjuk eller hård vävnad som kan sköta fotosyntes, lagra det som bildas och ge stöd.", lesson: "d2-l1" },
    { id: "d2-k05", front: "Ledningsvävnad", back: "Xylem och floem, som transporterar ämnen genom hela växten.", lesson: "d2-l1" },
    { id: "d2-k06", front: "Växtens organ", back: "Blad, stam och rot.", lesson: "d2-l1" },
    { id: "d2-k07", front: "Pektin", back: "Geléartat ämne som kan stabilisera cellväggen.", lesson: "d2-l2" },
    { id: "d2-k08", front: "Meristem", back: "Delningsvävnad där cellerna delar sig så att växten kan växa på längden och bredden.", lesson: "d2-l2" },
    { id: "d2-k09", front: "Differentiering", back: "När cellerna bakom meristemet får sina specifika egenskaper.", lesson: "d2-l2" },
    { id: "d2-k10", front: "Kambium", back: "Meristem mellan ved och bark i stammen. Bildar nytt xylem på insidan.", lesson: "d2-l2" },
    { id: "d2-k11", front: "Årsringar", back: "Stora, tunnväggiga xylemceller från våren och små, tjockväggiga från hösten ger ringar i stammen.", lesson: "d2-l2" },
    { id: "d2-k12", front: "Xylem", back: "Veddelen: döda celler som transporterar vatten och oorganiska ämnen.", lesson: "d2-l3" },
    { id: "d2-k13", front: "Trakeider och kärl", back: "Xylemets två celltyper. Trakeider är smala rör, kärl är stora och rymliga. Barrträd har bara trakeider.", lesson: "d2-l3" },
    { id: "d2-k14", front: "Rottryck", back: "Rötterna tar upp joner med aktiv transport, vatten följer efter med osmos och pressas uppåt.", lesson: "d2-l3" },
    { id: "d2-k15", front: "Varför pumpar rotcellerna ut vätejoner?", back: "Det ger ett underskott av positiva joner i cellen, så att metalljoner från marken kan ta sig in.", lesson: "d2-l3" },
    { id: "d2-k16", front: "Varför sloknar en övervattnad växt?", back: "Rötterna får syrebrist, vilket ger näringsbrist och vattenbrist.", lesson: "d2-l4" },
    { id: "d2-k17", front: "Klyvöppningar (stomata)", back: "Små öppningar i bladen som tar in koldioxid och släpper ut vatten.", lesson: "d2-l4" },
    { id: "d2-k18", front: "Transpiration", back: "Avdunstning av vatten från bladens klyvöppningar. Den suger upp vatten genom växten.", lesson: "d2-l4" },
    { id: "d2-k19", front: "Vattenpelaren", back: "Vattenmolekylerna hålls ihop av vätebindningar och bildar en sammanhängande pelare i xylemet.", lesson: "d2-l4" },
    { id: "d2-k20", front: "Energikällan till vattentransporten upp i stammen", back: "Solljuset, som får vattnet att avdunsta i bladen.", lesson: "d2-l4" },
    { id: "d2-k21", front: "Floem", back: "Sildelen: levande celler som transporterar socker och organiska ämnen.", lesson: "d2-l5" },
    { id: "d2-k22", front: "Silceller och följeceller", back: "Silceller saknar cellkärna och leder sockret. Följeceller har cellkärna.", lesson: "d2-l5" },
    { id: "d2-k23", front: "Tryckströmsteorin", back: "Socker pumpas in i silcellerna, vatten följer med osmos och trycket driver sockervätskan framåt.", lesson: "d2-l5" },
    { id: "d2-k24", front: "Ringbarkning", back: "Floemet skärs bort med barken. Socker når inte rötterna, och trädet dör till slut.", lesson: "d2-l5" },
  ],
  quiz: [
    {
      id: "d2-q01", level: "E", lesson: "d2-l1",
      q: "Vilka är växtens fyra vävnadstyper?",
      options: ["Epidermis, grundvävnad, ledningsvävnad och delningsvävnad", "Blad, stam, rot och blomma, som finns hos alla växter", "Xylem, floem, kambium och barkens yttersta korklager", "Cellvägg, cellmembran, vakuol, kloroplast och cytoplasma"],
      answer: "Epidermis, grundvävnad, ledningsvävnad och delningsvävnad",
      explain: "De fyra vävnadstyperna är gemensamma för alla växter. Blad, stam och rot är organ, inte vävnader.",
    },
    {
      id: "d2-q02", level: "E", lesson: "d2-l1",
      q: "Vad transporterar xylemet?",
      options: ["Socker och organiska ämnen", "Vatten och oorganiska ämnen", "Bara koldioxid", "Syrgas från bladen till rötterna"],
      answer: "Vatten och oorganiska ämnen",
      explain: "Xylemet, veddelen, transporterar vatten och oorganiska ämnen. Socker och organiska ämnen går i floemet.",
    },
    {
      id: "d2-q03", level: "E", lesson: "d2-l1",
      q: "Vad transporterar floemet?",
      options: ["Vatten och lösta joner", "Syrgas och koldioxid", "Socker och organiska ämnen", "Vatten och oorganiska ämnen"],
      answer: "Socker och organiska ämnen",
      explain: "Floemet, sildelen, transporterar socker och organiska ämnen som aminosyror. Vatten och joner går i xylemet.",
    },
    {
      id: "d2-q04", level: "E", lesson: "d2-l2",
      q: "Vad är pektin?",
      options: ["Ett vedämne som gör cellväggen hård", "En typ av meristem", "Ett enzym i floemet", "Ett geléartat ämne i cellväggen"],
      answer: "Ett geléartat ämne i cellväggen",
      explain: "Pektin är geléartat och kan stabilisera cellväggen. Vedämnet som gör cellväggen hård heter lignin.",
    },
    {
      id: "d2-q05", level: "E", lesson: "d2-l2",
      q: "Vad är ett meristem?",
      options: ["En delningsvävnad där cellerna delar sig", "En död vävnad av rör som leder vatten", "Växtens hud, det yttersta cellagret", "Ett lager levande silceller i floemet"],
      answer: "En delningsvävnad där cellerna delar sig",
      explain: "Meristem är delningsvävnad. Där delar sig cellerna, så att växten kan växa på längden och bredden.",
    },
    {
      id: "d2-q06", level: "E", lesson: "d2-l2",
      q: "Hur ser xylemcellerna som bildas på våren ut?",
      options: ["Små med tjocka väggar", "Stora med tunna väggar", "Helt utan cellvägg", "Fyllda med socker"],
      answer: "Stora med tunna väggar",
      explain: "På våren blir de nya cellerna stora med tunna väggar, på hösten små med tjocka väggar. Skillnaden syns som årsringar.",
    },
    {
      id: "d2-q07", level: "E", lesson: "d2-l3",
      q: "Vilka två typer av celler finns i xylemet?",
      options: ["Silceller och följeceller", "Palissadceller och svampceller", "Trakeider och kärl", "Epidermisceller och rotceller"],
      answer: "Trakeider och kärl",
      explain: "Xylemet består av döda celler: smala trakeider och stora kärl. Silceller och följeceller finns i floemet.",
    },
    {
      id: "d2-q08", level: "E", lesson: "d2-l3",
      q: "Vilken sorts celler bygger upp xylemet?",
      options: ["Levande celler med cellkärna", "Celler utan cellvägg", "Celler som delar sig snabbt", "Döda celler som bildar rör"],
      answer: "Döda celler som bildar rör",
      explain: "Xylemet är ett rörliknande system av döda celler. Floemet består däremot av levande celler.",
    },
    {
      id: "d2-q09", level: "E", lesson: "d2-l4",
      q: "Vad kallas avdunstningen av vatten från bladen?",
      options: ["Transpiration", "Osmos", "Plasmolys", "Fotosyntes"],
      answer: "Transpiration",
      explain: "Transpiration är avdunstningen av vatten från bladens klyvöppningar. Osmos är vattnets diffusion genom ett membran.",
    },
    {
      id: "d2-q10", level: "E", lesson: "d2-l5",
      q: "Vad skiljer silceller från följeceller?",
      options: ["Silceller har cellkärna, följeceller saknar cellkärna", "Silceller saknar cellkärna, följeceller har cellkärna", "Silceller är döda, följeceller är levande", "Silceller finns i xylemet, följeceller i floemet"],
      answer: "Silceller saknar cellkärna, följeceller har cellkärna",
      explain: "Båda är levande celler i floemet. Silcellerna saknar cellkärna, följecellerna har cellkärna.",
    },
    {
      id: "d2-q11", level: "C", lesson: "d2-l3",
      q: "Hur uppstår rottrycket?",
      options: ["Vatten pumpas in i roten med ATP, och joner följer efter", "Socker från bladen trycker vattnet nedåt genom roten", "Solljuset värmer roten så att vattnet stiger i xylemet", "Joner tas upp med aktiv transport, och vatten följer efter med osmos"],
      answer: "Joner tas upp med aktiv transport, och vatten följer efter med osmos",
      explain: "Rötterna tar upp joner med aktiv transport. Koncentrationen av lösta ämnen blir högre i roten, och vatten strömmar in med osmos och pressas uppåt. Själva vattnet pumpas inte med ATP.",
    },
    {
      id: "d2-q12", level: "C", lesson: "d2-l3",
      q: "Varför pumpar rotcellerna ut vätejoner?",
      options: ["För att sänka trycket i xylemet så att vattnet kan stiga uppåt", "För att bli av med syre som rötterna har fått för mycket av", "För att skapa ett underskott av positiva joner, så att metalljoner kan ta sig in", "För att bryta ner socker som rötterna har fått från bladen"],
      answer: "För att skapa ett underskott av positiva joner, så att metalljoner kan ta sig in",
      explain: "När vätejoner pumpas ut med ATP blir det ett underskott av positiva joner i cellen. Då kan positiva metalljoner från marken ta sig in genom öppna kanaler.",
    },
    {
      id: "d2-q13", level: "C", lesson: "d2-l4",
      q: "Varför sloknar en växt som övervattnas?",
      options: ["Cellerna spricker av för mycket vatten i vakuolerna", "Klyvöppningarna stängs för gott, så bladen torkar ut", "Rötterna får syrebrist, vilket leder till näringsbrist och vattenbrist", "Floemet fylls med vatten i stället för socker och stannar"],
      answer: "Rötterna får syrebrist, vilket leder till näringsbrist och vattenbrist",
      explain: "För mycket vatten ger syrebrist i rötterna. Då blir det näringsbrist och vattenbrist, och växten sloknar som om den fått för lite vatten.",
    },
    {
      id: "d2-q14", level: "C", lesson: "d2-l4",
      q: "Varför hänger vattnet ihop som en pelare i xylemet?",
      options: ["Xylemets levande celler pumpar vattnet uppåt med ATP", "Vattnet är bundet till socker som drar det uppåt i stammen", "Trakeiderna är fyllda med luft som trycker vattnet uppåt", "Vattenmolekylerna är dipoler som attraherar varandra med vätebindningar"],
      answer: "Vattenmolekylerna är dipoler som attraherar varandra med vätebindningar",
      explain: "Vattenmolekylen är en dipol, och molekylerna hålls ihop av vätebindningar. Därför bildar vattnet en sammanhängande pelare.",
    },
    {
      id: "d2-q15", level: "C", lesson: "d2-l4",
      q: "Varför släpper bladen ut vatten genom klyvöppningarna?",
      options: ["För att bli av med socker som bladen inte behöver", "För att ta upp syre som rötterna behöver för att växa", "För att kyla bladen och föra näringsämnen med vattnet", "För att minska rottrycket så att roten inte spricker"],
      answer: "För att kyla bladen och föra näringsämnen med vattnet",
      explain: "Vatten behöver släppas ut för att kyla ner bladen och transportera näringsämnen. Klyvöppningarna tar samtidigt in koldioxid.",
    },
    {
      id: "d2-q16", level: "C", lesson: "d2-l5",
      q: "Vad driver sockervätskan framåt i floemet enligt tryckströmsteorin?",
      options: ["Avdunstningen i bladen, som suger sockret uppåt", "Högt tryck i silcellerna när vatten strömmar in med osmos", "Rottrycket från rötterna, som pressar sockret framåt", "Kambiets celldelning, som skjuter sockret framåt"],
      answer: "Högt tryck i silcellerna när vatten strömmar in med osmos",
      explain: "Socker pumpas in i silcellerna, så vatten strömmar in med osmos. Trycket blir högt och pressar sockervätskan framåt. Avdunstningen driver vattnet i xylemet, inte i floemet.",
    },
    {
      id: "d2-q17", level: "C", lesson: "d2-l2",
      q: "Varför kan man bestämma ett träds ålder med årsringar?",
      options: ["Varje år bildar kambiet först stora och sedan små xylemceller", "Varje år byts all bark ut, och den gamla barken blir en ring", "Floemet växer en ring per månad, så tolv ringar är ett år", "Barken spricker en gång om året och läker till en ring"],
      answer: "Varje år bildar kambiet först stora och sedan små xylemceller",
      explain: "Kambiet bildar stora, tunnväggiga celler på våren och små, tjockväggiga på hösten. Varje år syns därför som en ring.",
    },
    {
      id: "d2-q18", level: "A", lesson: "d2-l5",
      q: "Någon skär bort en ring av bark runt stammen på en björk. Vad händer?",
      options: ["Trädet dör nästan direkt av vattenbrist", "Trädet växer snabbare eftersom sockret stannar i stammen", "Ingenting, eftersom barken är död", "Socker når inte rötterna, så rötterna svälter och trädet dör till slut"],
      answer: "Socker når inte rötterna, så rötterna svälter och trädet dör till slut",
      explain: "Floemet är barkens innersta, levande lager och följer med när barken skärs bort. Xylemet är kvar, så vatten når bladen en tid, men rötterna får inget socker och trädet dör till slut.",
    },
    {
      id: "d2-q19", level: "A", lesson: "d2-l4",
      q: "Ett träd är 100 meter högt. Vad behövs, utöver rottrycket, för att vattnet ska nå bladen?",
      options: ["Mer aktiv transport i stammen", "Transpiration och en sammanhängande vattenpelare", "Att floemet trycker vattnet uppåt", "Att xylemets celler lever och delar sig"],
      answer: "Transpiration och en sammanhängande vattenpelare",
      explain: "Rottrycket räcker inte i ett högt träd. Transpirationen suger upp vattnet när det avdunstar, och vätebindningarna håller ihop vattenpelaren. Energin kommer från solen.",
    },
    {
      id: "d2-q20", level: "A", lesson: "d2-l3",
      q: "Varför skulle rötterna ta upp mindre vatten om de inte fick något ATP?",
      options: ["Utan ATP kan de inte ta upp joner med aktiv transport, så mindre vatten strömmar in med osmos", "Vatten kräver ATP för att passera aquaporinerna, så inget vatten alls kommer in i roten", "Utan ATP stängs bladens klyvöppningar, så transpirationen och vattenpelaren stannar", "Utan ATP dör xylemets celler, och då kan rören inte längre leda något vatten"],
      answer: "Utan ATP kan de inte ta upp joner med aktiv transport, så mindre vatten strömmar in med osmos",
      explain: "Jonupptaget i roten är aktiv transport och kräver ATP. Det är jonerna som drar in vattnet med osmos. Xylemets celler är redan döda.",
    },
  ],
  practice: [
    {
      id: "d2-p1", kind: "label", level: "E", lesson: "d2-l1", diagram: "leaf", supplement: true,
      q: "Namnge delarna i bladets tvärsnitt.",
      markers: [
        { n: 2, answer: "Epidermis" },
        { n: 3, answer: "Palissadvävnad" },
        { n: 4, answer: "Svampvävnad" },
        { n: 5, answer: "Xylem" },
        { n: 6, answer: "Floem" },
        { n: 7, answer: "Epidermis" },
        { n: 8, answer: "Klyvöppning" },
        { n: 9, answer: "Slutcell" },
      ],
      distractors: ["Kambium", "Meristem"],
      hint: "Ledningsvävnaden sitter i mitten av bladet. Xylemet ligger ovanför floemet.",
    },
    {
      id: "d2-p2", kind: "order", level: "C", lesson: "d2-l3",
      q: "Sätt stegen i ordning: hur uppstår rottrycket?",
      steps: [
        "Rotcellerna pumpar ut vätejoner med hjälp av ATP",
        "Positiva metalljoner från marken tar sig in i rotcellerna",
        "Koncentrationen av lösta ämnen blir högre i roten än utanför",
        "Vatten strömmar in i roten med osmos",
        "Vattnet pressas uppåt i xylemet",
      ],
      explain: "Den aktiva transporten av joner kommer först. Den gör att vattnet sedan kan följa efter med osmos och pressas uppåt.",
    },
    {
      id: "d2-p3", kind: "order", level: "C", lesson: "d2-l5",
      q: "Sätt stegen i ordning: tryckströmsteorin.",
      steps: [
        "Socker förs in i bladets silceller med aktiv transport",
        "Sockerkoncentrationen i silcellerna blir hög",
        "Vatten strömmar in i silcellerna med osmos",
        "Trycket ökar och sockervätskan pressas framåt i floemet",
        "Socker förs aktivt ut där det behövs, och vattnet följer med",
      ],
      explain: "Den aktiva transporten av socker skapar en hög koncentration, osmosen ger trycket, och trycket driver sockervätskan till de delar som behöver socker.",
    },
    {
      id: "d2-p4", kind: "self", level: "C", lesson: "d2-l4",
      q: "Förklara hur rottryck, vattenpelare och transpiration tillsammans får vatten att nå bladen i ett högt träd.",
      hint: "Börja i roten och sluta i bladet.",
      solution: `- **Rottryck:** rötterna tar upp joner med aktiv transport. Koncentrationen av lösta ämnen blir högre i roten, så vatten strömmar in med osmos och pressas uppåt.
- **Vattenpelaren:** vattenmolekylerna är dipoler som hålls ihop av vätebindningar. Vattnet bildar en sammanhängande pelare i xylemet.
- **Transpiration:** vatten avdunstar genom bladens klyvöppningar. Det suger upp nytt vatten genom pelaren. Energin kommer från solljuset.

I ett högt träd räcker inte rottrycket. Transpirationen och vattenpelaren behövs för att vattnet ska nå ända upp.`,
    },
    {
      id: "d2-p5", kind: "self", level: "A", lesson: "d2-l5",
      q: "Förklara vad som händer med ett träd som ringbarkas, och varför det inte dör direkt.",
      solution: `Floemet är barkens innersta, levande lager, så det försvinner när en ring av bark skärs bort. Då kan socker från fotosyntesen i bladen inte längre nå rötterna.

Xylemet, veden, ligger längre in och blir kvar. Därför kan vatten fortfarande ledas upp till bladen en tid, och trädet kan se friskt ut.

Men rötterna får inget socker och svälter, och till slut dör trädet.`,
    },
    {
      id: "d2-p6", kind: "text", level: "E", lesson: "d2-l1",
      q: "Vad heter vävnaden som är växtens hud?",
      answer: ["epidermis", "överhud"],
      solution: "Växtens hud heter **epidermis**.",
    },
    {
      id: "d2-p7", kind: "text", level: "E", lesson: "d2-l2",
      q: "Vad heter meristemet mellan ved och bark i en stam?",
      answer: ["kambium", "kambiet"],
      solution: "Det heter **kambium**. Det bildar nytt xylem och ger årsringar.",
    },
    {
      id: "d2-p8", kind: "text", level: "E", lesson: "d2-l3",
      q: "Barrträd har bara en av xylemets två celltyper. Vilken?",
      answer: ["trakeider", "trakeid"],
      solution: "Barrträd har bara **trakeider**, de smala rören. Kärl saknas.",
    },
    {
      id: "d2-p9", kind: "text", level: "E", lesson: "d2-l4",
      q: "Vad heter de små öppningarna i bladen som släpper ut vatten och tar in koldioxid?",
      answer: ["klyvöppningar", "klyvöppning", "stomata", "stoma"],
      solution: "De heter **klyvöppningar**, eller stomata.",
    },
  ],
  keyPoints: [
    "Alla växter har fyra vävnadstyper: **epidermis**, **grundvävnad**, **ledningsvävnad** och **delningsvävnad**.",
    "**Xylem** (veddelen) leder vatten och oorganiska ämnen. **Floem** (sildelen) leder socker och organiska ämnen.",
    "**Meristem** är delningsvävnad. **Kambiet** mellan ved och bark bildar nytt xylem och ger **årsringar**.",
    "Xylemet består av döda celler: **trakeider** och **kärl**. Barrträd har bara trakeider.",
    "**Rottryck**: joner tas upp med aktiv transport (ATP), och vatten följer efter med osmos.",
    "**Transpiration** suger upp vatten, och **vätebindningar** håller ihop vattenpelaren. Energin kommer från solen.",
    "**Tryckströmsteorin**: socker pumpas in i silcellerna, vatten följer med osmos och trycket driver sockret framåt.",
    "**Ringbarkning** tar bort floemet. Socker når inte rötterna, och trädet dör till slut.",
  ],
};
