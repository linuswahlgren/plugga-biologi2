/**
 * Every string a student can see lives here. Swedish only; there is no English set.
 * Rules (docs/design-system.md §7.2): "du", sentence case, buttons start with a verb,
 * feedback words are fixed ("Rätt", "Inte riktigt"), no exclamation marks, no emoji,
 * a non-breaking space before "%".
 */

const NBSP = " ";

export const sv = {
  brand: "Plugga",
  skipToContent: "Hoppa till innehållet",
  appDescription: "Plugga är en studieplattform för klassen. Lär dig, öva och testa dig själv.",

  nav: {
    overview: "Översikt",
    progress: "Mina framsteg",
    menuOpen: "Öppna menyn",
    menuClose: "Stäng menyn",
    mainNav: "Huvudmeny",
    breadcrumb: "Du är här",
    back: "Tillbaka",
    examGroupDone: (title: string) => `${title} · Repetera`,
    examGroupUpcoming: (title: string, date: string) => (date ? `${title} · ${date}` : title),
    hubDone: (title: string) => `Repetera ${title.toLowerCase()}`,
    hubUpcoming: (title: string, date: string) => (date ? `Inför ${title.toLowerCase()} · ${date}` : `Inför ${title.toLowerCase()}`),
    noPartsYet: "Inget material än",
    part: (n: number) => `Del ${n}`,
    partOf: (n: number, total: number) => `Del ${n} av ${total}`,
  },

  topbar: {
    themeToSystem: "Följ systemets tema",
    themeToLight: "Byt till ljust tema",
    themeToDark: "Byt till mörkt tema",
    shortcuts: "Kortkommandon",
    notes: "Anteckningar",
  },

  tabs: {
    learn: "Lär dig",
    cards: "Kort",
    quiz: "Quiz",
    practice: "Öva",
    partSections: "Delens avsnitt",
  },

  hubTabs: {
    reading: "Läsanvisningar",
    questions: "Instuderingsfrågor",
    glossary: "Begreppslista",
    simulation: "Provsimulering",
    about: "Om materialet",
  },

  status: {
    notStarted: "Inte påbörjad",
    inProgress: "Pågår",
    needsReview: "Behöver repeteras",
    complete: "Klar",
    repetition: "Repetition",
    supplement: "Kompletterande",
    supplementTip: "Finns inte i lektionsmaterialet. Jämför med kursboken.",
    extraTerm: "Utöver begreppslistan",
    levelTip: "Ungefärlig nivå enligt betygsstegen",
    level: (l: string) => `Nivå ${l}`,
    opensLater: "Öppnar senare",
  },

  overview: {
    continueEyebrow: "Fortsätt plugga",
    statsHeading: "Dina siffror",
    currentHeading: (examTitle: string) => `Aktuellt · ${examTitle}`,
    reviewHeading: (examTitle: string) => `Repetera · ${examTitle}`,
    hubCardTitle: (examTitle: string) => `Repetera ${examTitle.toLowerCase()}`,
    hubCardText: "Läsanvisningar, instuderingsfrågor, begreppslista och provsimulering.",
    openHub: "Öppna",
    teacher: (name: string) => `Lärare: ${name}`,
  },

  countdown: {
    title: (examTitle: string, days: number, date: string) =>
      days === 0 ? `${examTitle} är i dag · ${date}` : days === 1 ? `${examTitle} i morgon · ${date}` : `${examTitle} om ${days} dagar · ${date}`,
    past: (examTitle: string, date: string) => `${examTitle} var ${date}`,
    emptyText: (examTitleLower: string) =>
      `Materialet till ${examTitleLower} läggs upp här när ni börjar arbeta med det. Repetera prov 1 så länge.`,
    toReview: (examTitleLower: string) => `Repetera ${examTitleLower}`,
  },

  stats: {
    examReviewed: (examTitle: string) => `${examTitle} repeterat`,
    cardsKnown: "Kort som sitter",
    cardsDue: "Kort att repetera idag",
    questionsKnown: "Instuderingsfrågor jag kan",
    of: (total: number) => `av ${total}`,
  },

  recommend: {
    resume: "Fortsätt där du slutade",
    reviewCards: (n: number) => `Repetera ${n} kort`,
    nextLesson: (title: string) => `Läs ${title}`,
    takeQuiz: (partTitle: string) => `Gör quizet om ${partTitle.toLowerCase()}`,
    examSimulation: (examTitleLower: string) => `Provsimulering ${examTitleLower}`,
    reviewPart: (n: number) => `Repetera Del ${n}`,
    practiseMistakes: "Öva på missarna",
    mixedQuiz: (examTitleLower: string) => `Blandat quiz från ${examTitleLower}`,
    startFirst: "Kom igång",
    go: "Kom igång",
    goContinue: "Fortsätt plugga",
    metaLesson: (partLabel: string, minutes: number) => `${partLabel} · ${minutes} min`,
  },

  intro: {
    title: "Så funkar Plugga",
    steps: [
      "**Lär dig:** läs lektionerna i varje del och svara på snabbkollen i slutet.",
      "**Öva:** repetera med korten och öva på uppgifterna.",
      "**Testa dig själv:** gör quiz eller en provsimulering och se vad du behöver öva mer på.",
    ],
    privacy: "Dina framsteg sparas bara på den här enheten. Ingen annan kan se dem, inte heller läraren.",
    homeScreen: "Tips: lägg till Plugga på hemskärmen, så hittar du tillbaka snabbt och kan plugga utan nät.",
    dismiss: "Jag förstår",
  },

  part: {
    eyebrow: (courseTitle: string, examTitle: string, n: number) => `${courseTitle} · ${examTitle} · Del ${n}`,
    goalsTitle: "När du är klar kan du",
    mastery: "Hur mycket som sitter",
    lessonsDone: (done: number, total: number) => `${done} av ${total} lektioner klara`,
    minutes: (m: number) => `${m} min`,
    lessonDone: "Klar",
    markDone: "Markera som klar",
    markNotDone: "Markera som inte klar",
    nextLesson: "Nästa lektion",
    source: (s: string) => `Källa: ${s}`,
    allDoneTitle: "Alla lektioner är klara",
    allDoneCards: "Testa dig själv med korten",
    allDoneQuiz: "Gör quizet",
    allDoneText: "Bra jobbat. Nu är det dags att hämta fram det du läst ur minnet. Det är så det fastnar.",
    noLessons: "Den här delen har inga lektioner än.",
    comingInPhase: "Den här delen av Plugga byggs just nu.",
  },

  check: {
    title: "Snabbkoll",
    hint: "Räknas inte in i quizet.",
    right: "Rätt",
    wrong: "Inte riktigt",
    answerIs: (a: string) => `Rätt svar är ${a}`,
    yourAnswer: "Ditt svar",
    correctAnswer: "Rätt svar",
    tryAgain: "Försök igen",
  },

  notes: {
    title: "Anteckningar",
    keyPoints: "Viktigast",
    myNotes: "Mina anteckningar",
    myNotesPlaceholder: "Skriv egna anteckningar här. De sparas på den här enheten.",
    saved: "Sparat",
    saving: "Sparar …",
    terms: "Begrepp i den här delen",
    readLesson: "Läs lektionen",
    close: "Stäng anteckningar",
    open: "Visa anteckningar",
  },

  hub: {
    eyebrow: (courseTitle: string, examTitle: string) => `${courseTitle} · ${examTitle}`,
    titleDone: (examTitleLower: string) => `Repetera ${examTitleLower}`,
    titleUpcoming: (examTitleLower: string, date: string) => (date ? `Inför ${examTitleLower} · ${date}` : `Inför ${examTitleLower}`),
    leadDone: (topic: string) => `Allt du behöver för att repetera ${topic.toLowerCase()}.`,
    leadUpcoming: "Här samlas allt inför provet när materialet läggs upp.",
    readingIntro: "Sidorna i kursboken som hör till provet, precis som de står i kursens läsanvisningar.",
    lecturesHeading: "Genomgångar",
    aboutIntro: "Här ser du var Plugga medvetet avviker från lektionsmaterialet och varför. Texten i Plugga följer den rättade uppgiften.",
    aboutWhere: "Var",
    aboutMaterial: "Materialet säger",
    aboutCorrected: "Plugga använder",
    aboutSupplementTitle: "Vad betyder Kompletterande?",
    aboutSupplementText:
      "Det mesta i Plugga kommer direkt från lektionsmaterialet. Ibland behövs en förklaring som inte finns där, till exempel för ett begrepp i begreppslistan. Då är texten märkt **Kompletterande**. Jämför den med kursboken.",
    sourcesTitle: "Källor",
    sourcesText: "Varje lektion visar vilka bilder i lektionspresentationerna den bygger på, till exempel ”Växtfysiologi del 2, bild 9–10”.",
  },

  progress: {
    title: "Mina framsteg",
    lead: "Allt om ditt eget arbete i Plugga. Det här ser bara du.",
    privacyTitle: "Var dina framsteg sparas",
    privacy: "Dina framsteg sparas bara på den här enheten. Ingen annan kan se dem, inte heller läraren.",
    perExam: "Per prov",
    perPart: "Per del",
    resetAll: "Rensa allt",
    resetConfirmTitle: "Rensa alla framsteg?",
    resetConfirmText: "Alla lektioner, kort, quizresultat, missar, anteckningar och inställningar tas bort från den här enheten. Det går inte att ångra.",
    resetConfirm: "Rensa allt",
    cancel: "Avbryt",
    resetDone: "Dina framsteg är rensade",
  },

  storage: {
    unavailable: "Dina framsteg sparas inte i den här webbläsaren",
  },

  shortcuts: {
    title: "Kortkommandon",
    close: "Stäng",
    items: [
      ["Mellanslag", "Vänd kortet"],
      ["← →", "Föregående eller nästa"],
      ["1", "Behöver öva"],
      ["2", "Jag kan den"],
      ["A–D", "Svara på en fråga"],
      ["Enter", "Gå vidare"],
      ["Esc", "Stäng meny, panel eller dialog"],
      ["?", "Visa kortkommandon"],
    ] as [string, string][],
  },

  content: {
    errorsTitle: "Något är fel i kursinnehållet",
    errorsText: "Säg till din lärare. Det här behöver rättas:",
    warningsTitle: "Kontroll av kursinnehållet",
    warningsNone: "Inga varningar.",
  },

  notFound: {
    title: "Sidan finns inte",
    text: "Länken leder ingenstans. Den kan vara gammal eller felstavad.",
    home: "Gå till översikten",
  },

  markupLabels: {
    key: "Viktigt",
    mistake: "Vanligt misstag",
    image: "Bild",
  },

  pageTitle: (parts: string[]) => parts.filter(Boolean).join(" – ") + " | Plugga",

  answer: {
    typo: (word: string) => `Rätt – kolla stavningen: ${word}`,
  },

  format: {
    percent: (n: number) => `${Math.round(n)}${NBSP}%`,
    weekdays: ["sön", "mån", "tis", "ons", "tors", "fre", "lör"],
    months: ["jan", "feb", "mars", "apr", "maj", "juni", "juli", "aug", "sep", "okt", "nov", "dec"],
    monthsLong: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
    schoolWeek: (n: number) => `v. ${n}`,
  },
} as const;

export type Strings = typeof sv;
