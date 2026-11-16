/**
 * Del 1 · Växtcellen och transport över membran
 * Sources: Intro kurs, transport över membran, bild 4–20; Växtfysiologi del 1, bild 2–3.
 * Supplementary (supplement: true or a "+>" box): plastids beyond the chloroplast.
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
      source: "Intro kurs, transport över membran, bild 5–6; Växtfysiologi del 1, bild 6",
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

+> **Plastider** är en grupp organeller som omges av två membran, ett inre och ett yttre. De finns i växtceller men inte i djurceller. Kloroplasten är en plastid. Andra exempel är **leukoplaster**, som är färglösa och lagrar näring, till exempel **amyloplaster** som lagrar stärkelse, och **kromoplaster**, som ger färg åt blommor och frukter. Alla utvecklas ur små **proplastider** i växtens delningsvävnad.`,
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

En **fosfolipid** är en lipid, en fettliknande molekyl, med två delar:

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
    {
      id: "d1-l3",
      title: "Diffusion och koncentrationsgradient",
      minutes: 6,
      source: "Intro kurs, transport över membran, bild 12–16",
      body: `Cellen måste hela tiden ta in vissa ämnen och göra sig av med andra. Det enklaste sättet är diffusion, som inte kostar någon energi.

## Diffusion

**Diffusion** är när molekyler eller joner rör sig från ett område med hög koncentration till ett område med låg koncentration. Diffusion är **passiv transport**: den kräver ingen energi.

## Koncentrationsgradient

Skillnaden i ett ämnes koncentration mellan ett membrans två sidor kallas ämnets **koncentrationsgradient**. Ett ämne som diffunderar rör sig längs sin koncentrationsgradient, från hög till låg koncentration.

> Vid diffusion rör sig ämnen från hög till låg koncentration, längs koncentrationsgradienten. Det kräver ingen energi.

## Vad kan ta sig igenom cellmembranet?

Cellmembranet är semipermeabelt. Det släpper igenom en del ämnen, men inte alla.

- **Syrgas (O~2~) och koldioxid (CO~2~)** kan diffundera fritt över membranet.
- **Vatten** passerar inte helt fritt. Det går genom speciella porer, så kallade **aquaporiner**.
- **Joner**, till exempel kalium- och kalciumjoner, och **stora molekyler**, till exempel glukos, kan inte passera fritt över membranet.

!> Diffusion betyder inte att ett ämne kan passera vilket membran som helst. Ett semipermeabelt membran släpper bara igenom vissa ämnen fritt.`,
      check: {
        id: "d1-l3-k",
        q: "Vilket av ämnena kan diffundera fritt över cellmembranet?",
        options: ["Glukos", "Kaliumjoner", "Koldioxid", "Kalciumjoner"],
        answer: "Koldioxid",
        explain:
          "Små molekyler som koldioxid och syrgas diffunderar fritt över membranet. Joner och stora molekyler som glukos kan inte passera fritt.",
        lesson: "d1-l3",
      },
    },
    {
      id: "d1-l4",
      title: "Osmos och aquaporiner",
      minutes: 7,
      source: "Intro kurs, transport över membran, bild 15, 17–18",
      body: `Vatten rör sig hela tiden in i och ut ur cellen. Vattnets väg genom membranet har ett eget namn: osmos.

## Aquaporiner – kanaler för vatten

Vatten passerar inte helt fritt över cellmembranet. I stället går vattnet genom **aquaporiner**, kanalproteiner i membranet som släpper igenom vatten.

## Osmos

**Osmos** är vattnets diffusion genom ett membran. Det är passiv transport av vattenmolekyler, med vattnets koncentrationsgradient, över ett semipermeabelt membran.

Det som driver osmosen är skillnaden i koncentration av **lösta joner och stora molekyler** mellan cellens insida och utsida.

## Varför strömmar vatten in?

Många vattenmolekyler inne i cellen är bundna till joner. Om det finns mer lösta ämnen inne i cellen än utanför, finns det fler fria vattenmolekyler utanför cellen än innanför. Då transporteras fler vattenmolekyler in i cellen än ut ur den. Det blir ett **nettoflöde** av vatten in i cellen.

> Vatten rör sig med osmos mot den sida där det finns mest lösta ämnen, eftersom det är där det finns minst fria vattenmolekyler.

!> Det är vattnet som rör sig vid osmos, inte de lösta ämnena. Jonerna och de stora molekylerna kan inte passera membranet fritt.`,
      check: {
        id: "d1-l4-k",
        q: "Vad är osmos?",
        options: ["Aktiv transport av joner in i cellen", "Diffusion av vatten genom ett membran", "Diffusion av syrgas genom ett membran", "Transport av socker genom cellväggen"],
        answer: "Diffusion av vatten genom ett membran",
        explain:
          "Osmos är vattnets diffusion genom ett semipermeabelt membran. Den är passiv och drivs av skillnaden i lösta ämnen mellan cellens in- och utsida.",
        lesson: "d1-l4",
      },
    },
    {
      id: "d1-l5",
      title: "Turgor och plasmolys",
      minutes: 7,
      source: "Intro kurs, transport över membran, bild 19–20; Växtfysiologi del 1, bild 2–3",
      body: `En sallad har ingen ved, men står ändå upp. Förklaringen är vatten och cellvägg.

## Hypoton, isoton och hyperton

Hur cellen påverkas beror på lösningen den ligger i, jämfört med cellens insida.

| Lösning | Saltkoncentration | Exempel |
| --- | --- | --- |
| **Hypoton** | lägre | destillerat vatten |
| **Isoton** | samma | 0,9 % NaCl |
| **Hyperton** | högre | 3 % NaCl |

Exemplen på saltkoncentrationer kommer från lektionsmaterialet, där de gäller djurceller.

## Växtcellen i de tre lösningarna

- I en **hypoton** lösning strömmar vatten in i cellen. Vakuolen fylls och trycker cellmembranet ut mot cellväggen. Cellen blir **spänd**.
- I en **isoton** lösning strömmar lika mycket vatten in som ut. Cellen blir **slak**.
- I en **hyperton** lösning strömmar vatten ut. Cellen krymper och cellmembranet släpper från cellväggen. Det kallas **plasmolys**.

## Turgortryck

Vattnet i växtcellen lagras i **vakuolen**. När vakuolen är full spänner den ut cellväggen. Trycket kallas **turgortryck** eller **turgor**. Det ger växten stabilitet.

> En djurcell kan spricka i en hypoton lösning. En växtcell gör det inte, eftersom cellväggen håller emot. I stället uppstår turgortryck.

!> Isoton betyder inte att vattnet står still. Vatten rör sig åt båda hållen, men lika mycket in som ut.`,
      check: {
        id: "d1-l5-k",
        q: "Vad händer med en växtcell i en hyperton lösning?",
        options: ["Den spricker", "Den blir spänd av vatten", "Den drabbas av plasmolys", "Ingenting händer"],
        answer: "Den drabbas av plasmolys",
        explain:
          "I en hyperton lösning strömmar vatten ut ur cellen. Cellen krymper och cellmembranet släpper från cellväggen, plasmolys. Det är i hypoton lösning som cellen blir spänd.",
        lesson: "d1-l5",
      },
    },
  ],
  cards: [
    { id: "d1-k01", front: "Cellmembran", back: "Tunn hinna runt cellen som kontrollerar vad som kommer in och ut.", lesson: "d1-l1" },
    { id: "d1-k02", front: "Vilka delar har växtcellen men inte djurcellen?", back: "Kloroplaster, cellvägg, plasmodesmer och en stor vakuol.", lesson: "d1-l1" },
    { id: "d1-k03", front: "Cellvägg", back: "Vägg utanför cellmembranet av cellulosa och hemicellulosa. Ger cellen stadga.", lesson: "d1-l1" },
    { id: "d1-k04", front: "Lignin", back: "Ämne som lagras in i cellväggen och gör den hård och vedartad.", lesson: "d1-l1" },
    { id: "d1-k05", front: "Plasmodesmer", back: "Små kanaler genom cellväggen som förbinder grannceller med varandra.", lesson: "d1-l1" },
    { id: "d1-k06", front: "Vakuol", back: "Stor vattenfylld blåsa i växtcellen. Här lagras cellens vatten.", lesson: "d1-l1" },
    { id: "d1-k07", front: "Plastider", back: "Organeller som omges av två membran, till exempel kloroplaster, leukoplaster och kromoplaster.", lesson: "d1-l1", supplement: true },
    { id: "d1-k08", front: "Semipermeabel", back: "Halvgenomsläpplig. Släpper igenom vissa ämnen lättare än andra.", lesson: "d1-l2" },
    { id: "d1-k09", front: "Fosfolipid", back: "Lipid (fettliknande molekyl) med ett hydrofilt fosfatgrupphuvud och två hydrofoba fettsyrasvansar.", lesson: "d1-l2" },
    { id: "d1-k10", front: "Hydrofil och hydrofob", back: "Hydrofil betyder vattenvänlig. Hydrofob betyder vattenskygg.", lesson: "d1-l2" },
    { id: "d1-k11", front: "Hur ligger fosfolipiderna i cellmembranet?", back: "I ett dubbelt lager: huvudena utåt mot vattnet, svansarna inåt.", lesson: "d1-l2" },
    { id: "d1-k12", front: "Diffusion", back: "Passiv transport där ämnen rör sig från hög till låg koncentration.", lesson: "d1-l3" },
    { id: "d1-k13", front: "Koncentrationsgradient", back: "Skillnaden i ett ämnes koncentration mellan ett membrans två sidor.", lesson: "d1-l3" },
    { id: "d1-k14", front: "Vilka ämnen diffunderar fritt över cellmembranet?", back: "Små molekyler som syrgas och koldioxid. Joner och stora molekyler gör det inte.", lesson: "d1-l3" },
    { id: "d1-k15", front: "Aquaporin", back: "Kanalprotein i cellmembranet som släpper igenom vatten.", lesson: "d1-l4" },
    { id: "d1-k16", front: "Osmos", back: "Vattnets diffusion genom ett semipermeabelt membran.", lesson: "d1-l4" },
    { id: "d1-k17", front: "Vad driver osmosen?", back: "Skillnaden i koncentration av lösta joner och stora molekyler mellan cellens in- och utsida.", lesson: "d1-l4" },
    { id: "d1-k18", front: "Hypoton, isoton och hyperton", back: "Lägre, samma och högre saltkoncentration än i cellen.", lesson: "d1-l5" },
    { id: "d1-k19", front: "Turgortryck", back: "Trycket när vakuolen fylls med vatten och spänner ut cellväggen. Ger växten stabilitet.", lesson: "d1-l5" },
    { id: "d1-k20", front: "Plasmolys", back: "När växtcellen förlorar vatten i hyperton lösning och cellmembranet släpper från cellväggen.", lesson: "d1-l5" },
  ],
  quiz: [
    {
      id: "d1-q01", level: "E", lesson: "d1-l1",
      q: "Vilken organell sköter fotosyntesen i växtcellen?",
      options: ["Mitokondrien", "Kloroplasten", "Cellkärnan", "Vakuolen"],
      answer: "Kloroplasten",
      explain: "Fotosyntesen sker i kloroplasterna, som bara finns i växtceller. Mitokondrier finns i både växtceller och djurceller.",
    },
    {
      id: "d1-q02", level: "E", lesson: "d1-l1",
      q: "Vad är cellväggen byggd av?",
      options: ["Cellulosa och hemicellulosa", "Fosfolipider och proteiner", "Kitin och lignin", "Stärkelse och socker"],
      answer: "Cellulosa och hemicellulosa",
      explain: "Växtcellens vägg är byggd av cellulosa och hemicellulosa. Fosfolipider och proteiner bygger upp cellmembranet, inte cellväggen.",
    },
    {
      id: "d1-q03", level: "E", lesson: "d1-l1",
      q: "Vad är plasmodesmer?",
      options: ["Gröna organeller med klorofyll", "Vattenfyllda blåsor i cellen", "Vedämne i cellväggen", "Små kanaler mellan grannceller"],
      answer: "Små kanaler mellan grannceller",
      explain: "Plasmodesmer är små kanaler genom cellväggen som förbinder grannceller. Vedämnet i cellväggen heter lignin.",
    },
    {
      id: "d1-q04", level: "E", lesson: "d1-l2",
      q: "Vad betyder det att cellmembranet är semipermeabelt?",
      options: ["Det släpper igenom alla ämnen lika lätt", "Det släpper inte igenom några ämnen alls", "Vissa ämnen går igenom lättare än andra", "Det släpper bara igenom vatten och salter"],
      answer: "Vissa ämnen går igenom lättare än andra",
      explain: "Semipermeabel betyder halvgenomsläpplig. Membranet släpper igenom vissa ämnen lättare än andra, men inte allt.",
    },
    {
      id: "d1-q05", level: "E", lesson: "d1-l2",
      q: "Vilken del av fosfolipiden är **hydrofil**?",
      options: ["Fosfatgrupphuvudet", "Fettsyrasvansarna", "Både huvudet och svansarna", "Ingen del av molekylen"],
      answer: "Fosfatgrupphuvudet",
      explain: "Fosfatgrupphuvudet är hydrofilt, vattenvänligt, och vänder sig mot vattnet. Svansarna är hydrofoba.",
    },
    {
      id: "d1-q06", level: "E", lesson: "d1-l3",
      q: "Vad är diffusion?",
      options: ["Transport från låg till hög koncentration med hjälp av ATP", "Transport från hög till låg koncentration utan energi", "Transport av vatten genom cellväggen med hjälp av ATP", "Transport av socker från bladen till rötterna"],
      answer: "Transport från hög till låg koncentration utan energi",
      explain: "Diffusion är passiv transport från hög till låg koncentration och kräver ingen energi. Transport som kräver ATP kallas aktiv transport.",
    },
    {
      id: "d1-q07", level: "E", lesson: "d1-l4",
      q: "Hur tar sig vatten igenom cellmembranet?",
      options: ["Helt fritt mellan fosfolipidernas svansar", "Genom plasmodesmerna i cellmembranet", "Med hjälp av klorofyll i cellmembranet", "Genom kanalproteiner som kallas aquaporiner"],
      answer: "Genom kanalproteiner som kallas aquaporiner",
      explain: "Vatten passerar inte helt fritt över cellmembranet utan går genom aquaporiner. Plasmodesmer går genom cellväggen mellan celler.",
    },
    {
      id: "d1-q08", level: "E", lesson: "d1-l5",
      q: "Vilken lösning har samma saltkoncentration som cellen?",
      options: ["En hypoton lösning", "En hyperton lösning", "En isoton lösning", "En koncentrerad lösning"],
      answer: "En isoton lösning",
      explain: "Isoton betyder samma saltkoncentration, till exempel 0,9 % NaCl. Hypoton är lägre och hyperton är högre.",
    },
    {
      id: "d1-q09", level: "C", lesson: "d1-l3",
      q: "Varför kan glukos **inte** diffundera fritt över cellmembranet?",
      options: ["Glukos är en stor molekyl", "Glukos är hydrofob", "Glukos är en gas", "Glukos finns bara utanför cellen"],
      answer: "Glukos är en stor molekyl",
      explain: "Stora molekyler som glukos och joner kan inte passera membranet fritt. Små molekyler som syrgas och koldioxid kan diffundera fritt.",
    },
    {
      id: "d1-q10", level: "C", lesson: "d1-l2",
      q: "Varför vänder fosfolipidernas svansar sig inåt i membranet?",
      options: ["De är hydrofila och söker sig till vatten", "De är hydrofoba och undviker vatten", "De är tyngre än huvudena", "De fäster mot cellväggen"],
      answer: "De är hydrofoba och undviker vatten",
      explain: "Svansarna är hydrofoba, vattenskygga. I dubbelmembranet hamnar de inuti, där de saknar kontakt med vatten. De hydrofila huvudena vänder sig utåt.",
    },
    {
      id: "d1-q11", level: "C", lesson: "d1-l4",
      q: "Det finns mer lösta joner inne i en cell än utanför. Åt vilket håll blir nettoflödet av vatten?",
      options: ["Ut ur cellen", "Inget nettoflöde uppstår", "Det beror på temperaturen", "In i cellen"],
      answer: "In i cellen",
      explain: "Inne i cellen är många vattenmolekyler bundna till joner, så det finns fler fria vattenmolekyler utanför. Därför strömmar mer vatten in än ut.",
    },
    {
      id: "d1-q12", level: "C", lesson: "d1-l5",
      q: "Varför spricker inte en växtcell i en hypoton lösning, som en djurcell kan göra?",
      options: ["Vakuolen pumpar ut vattnet", "Cellmembranet är tjockare", "Cellväggen håller emot trycket", "Växtcellen saknar aquaporiner"],
      answer: "Cellväggen håller emot trycket",
      explain: "Vatten strömmar in och vakuolen trycker mot cellväggen, som håller emot. Det ger turgortryck. Djurcellen saknar cellvägg.",
    },
    {
      id: "d1-q13", level: "C", lesson: "d1-l5",
      q: "Vad är turgortryck?",
      options: ["Trycket när vatten i vakuolen spänner ut cellväggen", "Trycket i rötterna när de tar upp joner ur jorden", "Trycket när cellen förlorar vatten i saltlösning", "Trycket som driver sockret genom växtens floem"],
      answer: "Trycket när vatten i vakuolen spänner ut cellväggen",
      explain: "Vatten lagras i vakuolen. När den är full spänner den ut cellväggen, och trycket ger växten stabilitet.",
    },
    {
      id: "d1-q14", level: "C", lesson: "d1-l5",
      q: "Vad händer vid plasmolys?",
      options: ["Cellen sväller av vatten tills cellväggen spricker", "Vakuolen fylls med vatten och trycker mot cellväggen", "Cellmembranet släpper från cellväggen när cellen förlorar vatten", "Cellväggen löses upp och cellen förlorar sin form"],
      answer: "Cellmembranet släpper från cellväggen när cellen förlorar vatten",
      explain: "I en hyperton lösning strömmar vatten ut. Cellen krymper och cellmembranet släpper från cellväggen. Det är motsatsen till en spänd cell i hypoton lösning.",
    },
    {
      id: "d1-q15", level: "A", lesson: "d1-l5",
      q: "Ett salladsblad har legat i saltvatten och blivit slakt och mjukt. Vilken förklaring stämmer?",
      options: ["Saltvattnet är hypotont, så vatten har strömmat in i cellerna", "Saltvattnet är hypertont, så vatten har strömmat ut ur cellerna", "Saltet har löst upp cellväggarna så att cellerna blivit mjuka", "Saltet har stängt aquaporinerna så att inget vatten rör sig"],
      answer: "Saltvattnet är hypertont, så vatten har strömmat ut ur cellerna",
      explain: "Saltvattnet har högre saltkoncentration än cellerna, alltså en hyperton lösning. Vatten strömmar ut med osmos, turgortrycket försvinner och cellerna kan drabbas av plasmolys.",
    },
    {
      id: "d1-q16", level: "C", lesson: "d1-l4",
      q: "Koncentrationen av lösta ämnen är lika stor innanför som utanför en cell. Vad gäller för vattnet?",
      options: ["Vatten rör sig inte alls, eftersom koncentrationerna är lika", "Allt vatten strömmar ut tills cellen drabbas av plasmolys", "Vatten strömmar bara in, tills vakuolen är helt full", "Vatten rör sig åt båda hållen, men lika mycket in som ut"],
      answer: "Vatten rör sig åt båda hållen, men lika mycket in som ut",
      explain: "Med lika koncentration av lösta ämnen blir det inget nettoflöde. Vattenmolekylerna rör sig ändå hela tiden, åt båda hållen.",
    },
    {
      id: "d1-q17", level: "A", lesson: "d1-l4",
      q: "Ett membran släpper igenom vatten men **inte** socker. På sida A finns en stark sockerlösning och på sida B rent vatten. Vad händer?",
      options: ["Vatten strömmar från sida B till sida A", "Vatten strömmar från sida A till sida B", "Socker strömmar från sida A till sida B", "Ingenting rör sig, eftersom sockret stoppas"],
      answer: "Vatten strömmar från sida B till sida A",
      explain: "Vatten rör sig med osmos mot den sida där det finns mest lösta ämnen, alltså mot sida A. Sockret kan inte passera membranet, så det är bara vattnet som rör sig.",
    },
    {
      id: "d1-q18", level: "A", lesson: "d1-l5",
      q: "Två likadana salladsblad läggs i destillerat vatten respektive i en isoton lösning. I vilket blad får cellerna högst turgortryck?",
      options: ["Inget av dem, eftersom cellväggen hindrar vatten från att komma in", "Båda får lika högt tryck, eftersom vatten rör sig åt båda hållen", "Bladet i destillerat vatten, där vatten strömmar in i cellerna", "Bladet i den isotona lösningen, där vatten strömmar in i cellerna"],
      answer: "Bladet i destillerat vatten, där vatten strömmar in i cellerna",
      explain: "Destillerat vatten är hypotont, så vatten strömmar in, vakuolen fylls och spänner ut cellväggen med turgortryck. I en isoton lösning strömmar lika mycket vatten in som ut, så det blir inget nettoflöde in och inget ökat turgortryck.",
    },
  ],
  practice: [
    {
      id: "d1-p1", kind: "label", level: "E", lesson: "d1-l1", diagram: "cell",
      q: "Namnge delarna i växtcellen.",
      markers: [
        { n: 1, answer: "Cellvägg" },
        { n: 2, answer: "Cellmembran" },
        { n: 3, answer: "Kloroplast" },
        { n: 4, answer: "Vakuol" },
        { n: 5, answer: "Cellkärna" },
        { n: 6, answer: "Mitokondrie" },
        { n: 7, answer: "Cytoplasma" },
        { n: 8, answer: "Plasmodesmer" },
      ],
      distractors: ["Cellulosa"],
      hint: "Börja utifrån: vad ligger ytterst, och vad ligger precis innanför?",
    },
    {
      id: "d1-p2", kind: "order", level: "C", lesson: "d1-l5",
      q: "Sätt stegen i ordning: vad händer när en växtcell hamnar i en hypoton lösning?",
      steps: [
        "Det finns mer lösta ämnen inne i cellen än utanför",
        "Vatten strömmar in i cellen med osmos",
        "Vattnet lagras i vakuolen",
        "Vakuolen trycker cellmembranet ut mot cellväggen",
        "Cellväggen spänns ut och turgortryck uppstår",
      ],
      explain: "Skillnaden i lösta ämnen driver osmosen. Vattnet samlas i vakuolen, som trycker mot cellväggen. Cellväggen håller emot, och turgortrycket ger växten stabilitet.",
    },
    {
      id: "d1-p3", kind: "self", level: "C", lesson: "d1-l4",
      q: "Förklara skillnaden mellan diffusion och osmos.",
      hint: "Vilket ämne rör sig vid osmos?",
      solution: `**Diffusion** är när molekyler eller joner rör sig från hög till låg koncentration. Det är passiv transport och kräver ingen energi. Syrgas och koldioxid diffunderar till exempel fritt över cellmembranet.

**Osmos** är en särskild sorts diffusion: vattnets diffusion genom ett semipermeabelt membran. Vattnet går genom aquaporiner. Osmosen drivs av skillnaden i lösta joner och stora molekyler mellan cellens in- och utsida, och vattnet rör sig mot den sida som har mest lösta ämnen.`,
    },
    {
      id: "d1-p4", kind: "self", level: "C", lesson: "d1-l5",
      q: "Förklara varför en djurcell kan spricka i destillerat vatten medan en växtcell inte gör det.",
      solution: `Destillerat vatten är en **hypoton** lösning: det finns mindre lösta ämnen utanför cellen än innanför. Därför strömmar vatten in i båda celltyperna med **osmos**.

Djurcellen saknar cellvägg och har bara ett cellmembran runt sig. Den sväller och kan spricka. Växtcellen har en **cellvägg** runt cellmembranet. Vattnet samlas i **vakuolen**, som trycker mot cellväggen. Cellväggen håller emot, och det blir ett **turgortryck** i stället. Turgortrycket ger växten stabilitet.`,
    },
    {
      id: "d1-p5", kind: "text", level: "E", lesson: "d1-l4",
      q: "Vad heter kanalproteinerna som släpper igenom vatten i cellmembranet?",
      answer: ["aquaporiner", "aquaporin", "akvaporiner", "akvaporin"],
      solution: "Vattnet går genom **aquaporiner**, kanalproteiner i cellmembranet.",
    },
    {
      id: "d1-p6", kind: "text", level: "E", lesson: "d1-l5",
      q: "Vad kallas det när en växtcell förlorar så mycket vatten att cellmembranet släpper från cellväggen?",
      answer: ["plasmolys"],
      solution: "Det kallas **plasmolys**. Det händer i en hyperton lösning.",
    },
    {
      id: "d1-p7", kind: "number", level: "E", lesson: "d1-l5",
      q: "Hur många procent NaCl har den isotona lösningen i lektionsmaterialets exempel?",
      answer: 0.9,
      unit: "%",
      solution: "I lektionsmaterialet är den isotona lösningen 0,9 % NaCl, med djurceller som exempel.",
    },
  ],
  keyPoints: [
    "Växtcellen har **kloroplaster**, **cellvägg**, **plasmodesmer** och en **stor vakuol**. Det har inte djurcellen.",
    "Cellväggen består av **cellulosa** och **hemicellulosa**. **Lignin** gör den hård.",
    "Cellmembranet är **semipermeabelt** och består av fosfolipider, proteiner och andra makromolekyler.",
    "Fosfolipidens huvud är **hydrofilt**, svansarna är **hydrofoba**. De bildar ett **dubbelmembran**.",
    "**Diffusion** är passiv transport från hög till låg koncentration. **Osmos** är vattnets diffusion genom **aquaporiner**, mot den sida som har mest lösta ämnen.",
    "I hypoton lösning ger vakuolen **turgortryck** mot cellväggen. I hyperton lösning drabbas cellen av **plasmolys**.",
  ],
};
