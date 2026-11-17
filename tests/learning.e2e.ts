/**
 * End-to-end specs for the learning features (Phase 2) on the site built with the test course
 * (tests/fixtures/course.ts, served on :4174): session builder, cards, quiz and Provläge, results,
 * Mina missar, every practice kind and diagram, Mina framsteg, glossary, study questions, resume.
 */
import { test, expect, type Locator, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { guard, open, progress, FIXTURE_URL, TODAY } from "./helpers.ts";
import { course as fixture } from "./fixtures/course.ts";

test.use({ baseURL: FIXTURE_URL });

const QUIZ = new Map(fixture.weeks.flatMap((w) => w.quiz).map((q) => [q.id, q]));
const D1 = "Växtcellen och transport över membran";

const seg = (scope: Locator, control: string, text: string) =>
  scope.locator(`[data-control=${control}] .sk-seg__label`, { hasText: new RegExp(`^${text}$`) });
const segInput = (scope: Locator, control: string, value: string) => scope.locator(`[data-control=${control}] input[value="${value}"]`);
const choice = (scope: Locator, text: string | RegExp) => scope.locator(".sk-choice", { hasText: text });

async function startQuiz(page: Page, hash: string) {
  await open(page, hash);
  await page.locator("[data-start]").click();
  await expect(page.locator(".sk-sessionhead")).toBeVisible();
}

async function currentQuiz(page: Page) {
  const id = (await page.locator(".sk-quizcard").getAttribute("data-quiz"))!;
  return QUIZ.get(id)!;
}

async function answer(page: Page, right: boolean) {
  const q = await currentQuiz(page);
  const value = right ? q.answer : q.options.find((o) => o !== q.answer)!;
  await page.locator(`.sk-quizcard .sk-option[data-value="${value}"]`).click();
  return q;
}

test.describe("session builder (§4.4)", () => {
  test("pool size, disabled counts, level filter and the start button", async ({ page }) => {
    const g = guard(page);
    await open(page, "#/d1/quiz");
    await expect(page).toHaveTitle(`Quiz – ${D1} – Biologi 2 | Plugga`);
    const b = page.locator("[data-builder=quiz]");
    await expect(b.locator("[data-pool]")).toHaveText("12 frågor finns i urvalet");
    await expect(segInput(b, "antal", "15")).toBeDisabled();
    await expect(segInput(b, "antal", "20")).toBeDisabled();
    await expect(segInput(b, "antal", "10")).toBeChecked();
    await expect(b.locator("[data-start]")).toHaveText("Starta 10 frågor");

    await b.locator("[data-control=niva] .sk-chip", { hasText: /^E$/ }).click();
    await expect(b.locator("[data-pool]")).toHaveText("6 frågor finns i urvalet");
    await expect(segInput(b, "antal", "10")).toBeDisabled();
    await expect(segInput(b, "antal", "alla")).toBeChecked();
    await expect(b.locator("[data-start]")).toHaveText("Starta 6 frågor");
    await expect(page).toHaveURL(/#\/d1\/quiz\?urval=del&antal=alla&niva=E&ordning=blandad&lage=ova$/);

    await choice(b, "Hela prov 1").click();
    await expect(b.locator("[data-pool]")).toHaveText("9 frågor finns i urvalet");
    await choice(b, "Välj delar").click();
    await expect(b.locator(".sk-partpick")).toBeVisible();
    await choice(b.locator(".sk-partpick"), "Bladet, kloroplasten och blomman").click();
    await expect(page).toHaveURL(/urval=delar:d1,d2/);
    await expect(choice(b, "Mina missar").locator("input")).toBeDisabled();

    await seg(b, "lage", "Provläge").click();
    await expect(b.locator("[data-control=tid]")).toBeVisible();
    await expect(b).toContainText("Svaren visas när du lämnar in.");
    await expect(page.locator(".sk-sessionhead")).toHaveCount(0);
    g.done();
  });

  test("presets fill the panel; a deep link pre-fills it and never starts", async ({ page }) => {
    await open(page, "#/d1/quiz");
    await page.getByRole("button", { name: "Snabbquiz 5" }).click();
    await expect(page).toHaveURL(/#\/d1\/quiz\?urval=del&antal=5&niva=alla&ordning=blandad&lage=ova$/);
    await expect(segInput(page.locator("[data-builder]"), "antal", "5")).toBeChecked();
    await expect(page.locator("[data-start]")).toHaveText("Starta 5 frågor");

    await page.getByRole("button", { name: "Provsimulering 20" }).click();
    const b = page.locator("[data-builder]");
    await expect(choice(b, "Hela prov 1").locator("input")).toBeChecked();
    await expect(segInput(b, "lage", "prov")).toBeChecked();
    await expect(segInput(b, "tid", "20")).toBeChecked();
    await expect(page.locator("[data-start]")).toHaveText("Starta 16 frågor");

    await page.getByRole("button", { name: "Repetera idag" }).click();
    await expect(page).toHaveURL(/#\/omgang\/kort\?urval=idag/);
    await expect(page.locator("main")).toContainText("Inga kort behöver repeteras i dag.");
    await expect(page.locator("[data-start]")).toBeDisabled();

    await open(page, "#/d1/quiz?antal=5&niva=E,C&lage=prov&tid=10");
    await expect(segInput(b, "antal", "5")).toBeChecked();
    await expect(segInput(b, "lage", "prov")).toBeChecked();
    await expect(segInput(b, "tid", "10")).toBeChecked();
    await expect(page.locator("[data-control=niva] input:checked")).toHaveCount(2);
    await expect(page.locator(".sk-sessionhead")).toHaveCount(0);
  });

  test("the last choice is remembered per mode", async ({ page }) => {
    await startQuiz(page, "#/d1/quiz?antal=5&ordning=ordning");
    await page.getByRole("button", { name: "Avsluta" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Avsluta" }).click();
    await expect(page.locator("[data-builder]")).toBeVisible();
    await open(page, "#/d1/quiz");
    await expect(segInput(page.locator("[data-builder]"), "antal", "5")).toBeChecked();
    await expect(segInput(page.locator("[data-builder]"), "ordning", "ordning")).toBeChecked();
  });
});

test.describe("cards (§4.5)", () => {
  test("flip and rate by keyboard; boxes, due dates and one return of 'Behöver öva'", async ({ page }) => {
    const g = guard(page);
    await open(page, "#/d1/kort?urval=del&antal=alla&ordning=ordning");
    await page.locator("[data-start]").click();
    await expect(page.locator(".sk-sessionhead h1")).toContainText(`Kort · ${D1}`);
    await expect(page).toHaveTitle(`Kort – ${D1} – Biologi 2 | Plugga`);
    const counter = page.locator(".sk-sessionhead__counter");
    const card = page.locator(".sk-flashcard");
    await expect(counter).toHaveText("Kort 1 av 12");
    await expect(card).toHaveAttribute("data-card", "d1-xk01");

    await page.keyboard.press("Space");
    await expect(card).toHaveAttribute("data-flipped", "true");
    await page.keyboard.press("2");
    await expect(counter).toHaveText("Kort 2 av 12");
    await page.keyboard.press("Space");
    await page.keyboard.press("1");
    await expect(counter).toHaveText("Kort 3 av 13");
    const p = await progress(page);
    expect(p.cards["d1-xk01"]).toMatchObject({ box: 2, due: "2026-11-17" });
    expect(p.cards["d1-xk02"]).toMatchObject({ box: 1, due: "2026-11-16" });

    let returned = 0;
    for (let i = 0; i < 11; i++) {
      const id = await card.getAttribute("data-card");
      if (id === "d1-xk02") returned++;
      await page.keyboard.press("Space");
      await expect(card).toHaveAttribute("data-flipped", "true");
      await page.keyboard.press(id === "d1-xk02" ? "1" : "2");
    }
    expect(returned).toBe(1);
    await expect(page.locator("main h1")).toHaveText("11 av 12 sitter");
    await expect(page.locator("main")).toContainText("Kort att öva mer på");
    await expect(page.getByRole("button", { name: "Öva på det igen" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Tillbaka till delen" })).toBeVisible();
    const after = await progress(page);
    expect(after.session).toBeNull();
    g.done();
  });

  test("arrows move between cards and the back can be shown first", async ({ page }) => {
    await open(page, "#/d1/kort?urval=del&antal=alla&ordning=ordning&vand=1");
    await page.locator("[data-start]").click();
    await expect(page.locator(".sk-flashcard__face--front")).toContainText("Tunn hinna runt cellen");
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".sk-sessionhead__counter")).toHaveText("Kort 2 av 12");
    await page.keyboard.press("ArrowLeft");
    await expect(page.locator(".sk-sessionhead__counter")).toHaveText("Kort 1 av 12");
    await page.locator(".sk-flashcard").click();
    await expect(page.locator(".sk-flashcard")).toHaveAttribute("data-flipped", "true");
    await expect(page.locator(".sk-flashcard__face--back")).toContainText("Cellmembran");
  });
});

test.describe("quiz (§4.6)", () => {
  test("Öva: feedback, keys, results and Mina missar", async ({ page }) => {
    const g = guard(page);
    await startQuiz(page, "#/d1/quiz?urval=del&antal=5&ordning=ordning&lage=ova");
    await expect(page.locator(".sk-sessionhead h1")).toContainText(`Quiz · ${D1}`);
    await expect(page.locator(".sk-sessionhead__counter")).toHaveText("Fråga 1 av 5");

    const missedQ = await answer(page, false);
    const fb = page.locator(".sk-quizcard .sk-feedback");
    await expect(fb).toContainText("Inte riktigt");
    await expect(fb).toContainText(`Rätt svar är ${missedQ.answer.replace(/\*\*/g, "")}`);
    await expect(fb.getByRole("link", { name: /^Läs mer: / })).toBeVisible();
    await expect(page.locator(".sk-option--correct")).toContainText("Rätt svar");
    await expect(page.locator(".sk-option--wrong")).toContainText("Ditt svar");
    await page.keyboard.press("Enter");
    await expect(page.locator(".sk-sessionhead__counter")).toHaveText("Fråga 2 av 5");

    const q2 = await currentQuiz(page);
    const shown = await page.locator(".sk-quizcard .sk-option").evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.value));
    await page.keyboard.press("ABCD"[shown.indexOf(q2.answer)]);
    await expect(fb).toContainText("Rätt");
    await expect(fb).not.toContainText("Inte riktigt");
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press("Enter");
      await answer(page, true);
    }
    await page.getByRole("button", { name: "Visa resultat" }).click();
    await expect(page.locator("main h1")).toHaveText("4 av 5 · 80 %");
    await expect(page).toHaveTitle(`Resultat – Quiz – ${D1} – Biologi 2 | Plugga`);
    await expect(page.locator("main")).toContainText("Bra jobbat.");
    await expect(page.locator("main")).toContainText(`Del 1 · ${D1}`);
    await expect(page.locator("main")).toContainText("Omgången räknas inte till delens bästa resultat.");
    await expect(page.locator("[data-mistakes] li")).toHaveCount(1);
    await expect(page.locator("[data-mistakes]")).toContainText("Ditt svar:");
    let p = await progress(page);
    expect(p.missed[missedQ.id]).toBe(0);
    expect(p.quiz.attempts).toHaveLength(1);
    expect(p.quiz.attempts[0]).toMatchObject({ mode: "ova", scope: "d1", correct: 4, total: 5, counts: false });

    // Two right answers in later sessions empty Mina missar.
    await page.getByRole("button", { name: "Öva på missarna" }).click();
    await expect(page.locator(".sk-sessionhead h1")).toContainText("Quiz · Mina missar");
    await answer(page, true);
    await page.getByRole("button", { name: "Visa resultat" }).click();
    p = await progress(page);
    expect(p.missed[missedQ.id]).toBe(1);
    await startQuiz(page, "#/omgang/quiz?urval=missar&antal=alla");
    await answer(page, true);
    await page.getByRole("button", { name: "Visa resultat" }).click();
    p = await progress(page);
    expect(missedQ.id in p.missed).toBe(false);
    await open(page, "#/d1/quiz");
    await expect(choice(page.locator("[data-builder]"), "Mina missar").locator("input")).toBeDisabled();
    g.done();
  });

  test("Provläge: no feedback until hand-in; navigator and flag", async ({ page }) => {
    await startQuiz(page, "#/d1/quiz?urval=del&antal=5&ordning=ordning&lage=prov&tid=ingen");
    await expect(page.locator(".sk-sessionhead h1")).toContainText(`Provläge · ${D1}`);
    await answer(page, true);
    await expect(page.locator(".sk-quizcard .sk-feedback")).toHaveCount(0);
    await expect(page.locator(".sk-option--correct, .sk-option--wrong")).toHaveCount(0);
    await expect(page.locator(".sk-option[aria-pressed=true]")).toHaveCount(1);
    await page.getByRole("button", { name: "Markera för att titta igen" }).click();
    await expect(page.getByRole("button", { name: "Fråga 1, besvarad, markerad" })).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(".sk-sessionhead__counter")).toHaveText("Fråga 2 av 5");
    await answer(page, false);
    await page.getByRole("button", { name: "Fråga 1, besvarad, markerad" }).click();
    await expect(page.locator(".sk-sessionhead__counter")).toHaveText("Fråga 1 av 5");
    await page.getByRole("button", { name: "Lämna in" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText("Du har 3 obesvarade frågor och 1 markerad fråga.");
    await dialog.getByRole("button", { name: "Lämna in" }).click();
    await expect(page.locator("main h1")).toHaveText("1 av 5 · 20 %");
    await expect(page.locator("[data-mistakes] li")).toHaveCount(4);
    await expect(page.locator("[data-mistakes]")).toContainText("Inget svar");
    const p = await progress(page);
    expect(Object.keys(p.missed)).toHaveLength(4);
    expect(p.quiz.attempts[0].mode).toBe("prov");
  });

  test("Provläge: the timer hands in automatically", async ({ page }) => {
    await page.clock.install({ time: TODAY });
    await page.goto("/#/d1/quiz?urval=del&antal=5&ordning=ordning&lage=prov&tid=10");
    await page.locator("[data-start]").click();
    await expect(page.locator(".sk-sessionhead__timer")).toContainText(/(10:00|9:5\d) kvar/);
    await answer(page, true);
    await page.clock.fastForward("10:01");
    await expect(page.locator("main h1")).toHaveText("1 av 5 · 20 %");
    await expect(page.locator("main")).toContainText("Tiden är slut. Dina svar har lämnats in.");
  });

  test("a session survives a reload and a 'Läs mer' detour", async ({ page }) => {
    await startQuiz(page, "#/d1/quiz?urval=del&antal=5&ordning=ordning&lage=ova");
    await answer(page, false);
    await page.waitForTimeout(400);
    await page.reload();
    await expect(page.locator(".sk-sessionhead__counter")).toHaveText("Fråga 1 av 5");
    await expect(page.locator(".sk-quizcard .sk-feedback")).toContainText("Inte riktigt");

    await page.locator(".sk-quizcard .sk-feedback").getByRole("link", { name: /^Läs mer: / }).click();
    await expect(page.locator("[data-return]")).toContainText("Quiz · Växtcellen och transport över membran · fråga 1 av 5");
    await page.getByRole("link", { name: "Tillbaka till omgången" }).click();
    await expect(page.locator(".sk-sessionhead__counter")).toHaveText("Fråga 1 av 5");

    await page.goto("/#/");
    await expect(page.locator(".sk-hero h2")).toHaveText("Fortsätt där du slutade");
    await page.locator(".sk-hero a").click();
    await expect(page.locator(".sk-sessionhead")).toBeVisible();
  });

  test("the exam hub's simulation runs in Provläge over the whole exam", async ({ page }) => {
    await open(page, "#/prov1/simulering");
    await expect(page.locator("main")).toContainText("En provsimulering blandar frågor från provets alla delar.");
    await expect(segInput(page.locator("[data-builder]"), "lage", "prov")).toBeChecked();
    await page.locator("[data-start]").click();
    await expect(page.locator(".sk-sessionhead h1")).toContainText("Provläge · Hela prov 1");
    await expect(page.locator(".sk-sessionhead__counter")).toHaveText("Fråga 1 av 16");
    await expect(page).toHaveTitle("Provläge – Provsimulering – Repetera prov 1 – Biologi 2 | Plugga");
  });
});

test.describe("practice (§4.7)", () => {
  test("text, number and self-graded items", async ({ page }) => {
    const g = guard(page);
    await open(page, "#/d1/ova");
    const text = page.locator("[data-practice=d1-xp1]");
    await text.getByRole("button", { name: "Visa ledtråd" }).click();
    await expect(text).toContainText("Ordet börjar på c.");
    await text.getByRole("textbox").fill("celulosa");
    await text.getByRole("button", { name: "Rätta" }).click();
    await expect(text.locator(".sk-feedback")).toContainText("Rätt – kolla stavningen: cellulosa");
    await expect(text.locator("[data-solved]")).toBeVisible();

    const num = page.locator("[data-practice=d1-xp2]");
    await num.getByRole("textbox").fill("3");
    await num.getByRole("button", { name: "Rätta" }).click();
    await expect(num.locator(".sk-feedback")).toContainText("Inte riktigt");
    await expect(num.locator(".sk-feedback")).toContainText("Rätt svar är 2");
    await num.getByRole("textbox").fill("2,0");
    await num.getByRole("button", { name: "Rätta" }).click();
    await expect(num.locator(".sk-feedback")).toContainText("Rätt");

    const self = page.locator("[data-practice=d1-xp3]");
    await self.getByRole("button", { name: "Visa exempelsvar" }).click();
    await expect(self).toContainText("Exempelsvar");
    await self.getByRole("button", { name: "Jag hade rätt" }).click();
    await expect(self.locator("[data-solved]")).toBeVisible();
    await expect(page.locator("[data-practice-summary]")).toHaveText("5 övningar · 3 lösta");
    const p = await progress(page);
    expect(p.practice["d1-xp1"].solved).toBe(true);
    expect(p.practice["d1-xp3"].solved).toBe(true);
    g.done();
  });

  test("order with the keyboard only", async ({ page }) => {
    await open(page, "#/d1/ova");
    const item = page.locator("[data-practice=d1-xp4]");
    await item.getByRole("button", { name: "Rätta" }).click();
    await expect(item.locator(".sk-feedback")).toContainText("Inte riktigt");
    await expect(item.locator(".sk-order")).toContainText("Fel plats");
    for (let target = 0; target < 4; target++) {
      const order = await item.locator(".sk-order__item").evaluateAll((els) => els.map((e) => Number((e as HTMLElement).dataset.step)));
      const from = order.indexOf(target);
      if (from === target) continue;
      await item.locator(`.sk-order__item[data-step="${target}"] button`).first().focus();
      for (let k = 0; k < from - target; k++) await page.keyboard.press("Enter");
    }
    await expect(item.locator(".sk-order [role=status], .sk-order + [role=status]").first()).toContainText(/Flyttat till plats/);
    await item.getByRole("button", { name: "Rätta" }).focus();
    await page.keyboard.press("Enter");
    await expect(item.locator(".sk-feedback")).toContainText("Rätt");
    await expect(item.locator(".sk-order__item--right")).toHaveCount(4);
    await expect(item.locator("[data-solved]")).toBeVisible();
  });

  test("label: choose a term for each number", async ({ page }) => {
    await open(page, "#/d1/ova");
    const item = page.locator("[data-practice=d1-xp5]");
    await expect(item.locator("svg[data-diagram=cell] [data-marker]")).toHaveCount(8);
    const markers = fixture.weeks[0].practice.find((x) => x.id === "d1-xp5")!;
    if (markers.kind !== "label") throw new Error("expected label");
    for (const m of markers.markers) await item.locator(`select[data-marker="${m.n}"]`).selectOption(m.n === 4 ? "Fosfolipid" : m.answer);
    await item.getByRole("button", { name: "Rätta" }).click();
    await expect(item.locator(".sk-feedback")).toContainText("1 nummer har fel begrepp.");
    await expect(item.locator(".sk-labelrow--wrong")).toContainText("Rätt svar är Vakuol");
    await item.locator('select[data-marker="4"]').selectOption("Vakuol");
    await item.getByRole("button", { name: "Rätta" }).click();
    await expect(item.locator(".sk-feedback")).toContainText("Alla nummer har rätt begrepp.");
    await expect(item.locator("[data-solved]")).toBeVisible();
  });

  test("every diagram renders with its numbers", async ({ page }) => {
    await open(page, "#/d2/ova");
    await expect(page.locator("svg[data-diagram=leaf] [data-marker]")).toHaveCount(9);
    await expect(page.locator("svg[data-diagram=chloroplast] [data-marker]")).toHaveCount(6);
    await expect(page.locator("svg[data-diagram=flower] [data-marker]")).toHaveCount(8);
  });

  test("practice across parts with a level filter", async ({ page }) => {
    // The page starts on the upcoming exam (the test course's Prov 2 has 2 diagram items), so pick
    // Prov 1: 5 items in Del 1 and 3 in Del 2.
    await open(page, "#/omgang/ova?urval=prov:prov1");
    await expect(page.locator("[data-practice-summary]")).toHaveText("8 övningar · 0 lösta");
    await page.locator("[data-control=niva] .sk-chip", { hasText: /^C$/ }).click();
    await expect(page.locator("[data-practice-summary]")).toHaveText("2 övningar · 0 lösta");
    await expect(page).toHaveURL(/niva=C/);
  });
});

test.describe("exams and progress", () => {
  test("a Prov 2 part moves into Aktuellt and leads the recommendation", async ({ page }) => {
    const g = guard(page);
    await open(page);
    await expect(page.locator("#current-title")).toHaveText("Aktuellt · Prov 2");
    await expect(page.locator("main [data-part=d7]")).toBeVisible();
    await expect(page.locator(".sk-sidebar a[data-nav=d7]")).toContainText("Cellens byggnad");
    await expect(page.locator(".sk-hero h2")).toHaveText("Läs Testlektion för prov 2");
    await expect(page.locator("[data-countdown=prov2]")).not.toContainText("Materialet till prov 2");
    g.done();
  });

  test("Mina framsteg: activity, boxes, mistakes, history and reset per part", async ({ page }) => {
    await page.addInitScript(() => {
      if (sessionStorage.getItem("seeded")) return;
      sessionStorage.setItem("seeded", "1");
      localStorage.setItem(
        "plugga:bio2-vaxtfys-cellbio-ht26",
        JSON.stringify({
          v: 2,
          lessons: { "d1-l1": "2026-11-10" },
          cards: { "d1-xk01": { box: 1, due: "2026-11-16", seen: 2 }, "d1-xk02": { box: 3, due: "2026-11-19", seen: 3 }, "d2-xk01": { box: 5, due: "2026-12-30", seen: 5 } },
          quiz: { attempts: [{ at: "2026-11-15T14:05:00", kind: "quiz", mode: "prov", scope: "prov:prov1", parts: ["d1", "d2"], correct: 12, total: 16, counts: true }], best: { d1: 75 } },
          missed: { "d1-xq03": 0, "d2-xq01": 1 },
          practice: {},
          study: { "prov1-xiq01": "kan" },
          notes: { d1: "min anteckning" },
          activity: { "2026-11-16": true, "2026-11-14": true, "2026-10-30": true },
          session: null,
          settings: { theme: "system", sessionDefaults: {}, introDismissed: true },
        }),
      );
    });
    await open(page, "#/framsteg");
    await expect(page.locator("[data-activity]")).toContainText("Pluggat 2 av de senaste 7 dagarna");
    await expect(page.locator("[data-activity]")).toContainText("Pluggat 3 av de senaste 28 dagarna");
    await expect(page.locator(".sk-activity__day--on")).toHaveCount(3);
    await expect(page.locator("[data-boxes]")).toHaveAttribute("data-boxes", "1,0,1,0,1");
    await expect(page.locator("[data-missed]")).toContainText("2 frågor i Mina missar");
    await expect(page.locator("[data-history] tbody tr")).toHaveCount(1);
    await expect(page.locator("[data-history]")).toContainText("sön 15 nov 14:05");
    await expect(page.locator("[data-history]")).toContainText("Hela prov 1");
    await expect(page.locator("[data-history]")).toContainText("12 av 16 · 75 %");
    await expect(page.locator("main")).toContainText("Instuderingsfrågor: 1 av 2 kan jag");

    await page.locator("#reset-what").selectOption({ label: `Del 1 · ${D1}` });
    await page.getByRole("button", { name: "Rensa", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText(`Lektioner, kort, quizresultat, missar och övningar i Del 1 · ${D1} tas bort`);
    await expect(dialog).toContainText("Dina anteckningar finns kvar.");
    await dialog.getByRole("button", { name: "Rensa" }).click();
    await expect(page.locator("[data-missed]")).toContainText("1 fråga i Mina missar");
    const p = await progress(page);
    expect(p.lessons).toEqual({});
    expect(p.cards["d1-xk01"]).toBeUndefined();
    expect(p.cards["d2-xk01"]).toBeDefined();
    expect(p.quiz.best.d1).toBeUndefined();
    expect(p.notes.d1).toBe("min anteckning");
  });
});

test.describe("exam hub (§4.8)", () => {
  test("glossary: search ignores diacritics; filter; practise as cards", async ({ page }) => {
    const g = guard(page);
    await open(page, "#/prov1/begrepp");
    const gl = page.locator("[data-glossary=prov1]");
    await expect(gl.locator("[data-glossary-count]")).toHaveText("Visar 9 av 9 begrepp");
    // "cellvagg" finds the term "Cellvägg" and the definitions that mention the cell wall.
    await page.getByLabel("Sök begrepp").fill("cellvagg");
    await expect(gl.locator("[data-glossary-count]")).toHaveText("Visar 5 av 9 begrepp");
    await expect(gl.locator("[data-term=t-cellvagg]")).toBeVisible();
    await expect(gl.locator("[data-term=t-fosfolipid]")).toBeHidden();
    await page.getByLabel("Sök begrepp").fill("PLASMODESM");
    await expect(gl.locator("[data-term]:visible")).toHaveText([/Plasmodesmer/]);
    await page.getByLabel("Sök begrepp").fill("");
    await page.getByLabel("Bara de jag inte kan").check();
    await expect(gl.locator("[data-glossary-count]")).toHaveText("Visar 9 av 9 begrepp");
    await page.getByRole("link", { name: "Öva som kort" }).click();
    await expect(page.locator("[data-pool]")).toHaveText("9 kort finns i urvalet");
    await expect(choice(page.locator("[data-builder]"), "Begreppslistan till prov 1").locator("input")).toBeChecked();
    g.done();
  });

  test("study questions: model answer, links and self-grading", async ({ page }) => {
    await open(page, "#/prov1/fragor");
    await expect(page.locator("[data-study-known]")).toHaveText("0 av 2 kan jag");
    const q = page.locator("[data-study=prov1-xiq02]");
    await q.locator(".sk-lesson__head").click();
    await q.getByRole("button", { name: "Visa exempelsvar" }).click();
    await expect(q).toContainText("Svaret finns i:");
    await expect(q.getByRole("link", { name: "Del 1 · Cellmembranet och fosfolipiderna" })).toBeVisible();
    await q.getByRole("button", { name: "Jag kan den" }).click();
    await expect(page.locator("[data-study-known]")).toHaveText("1 av 2 kan jag");
    await expect(q.locator(".sk-lesson__head")).toContainText("Kan jag");
  });
});

test.describe("accessibility of the learning views (axe)", () => {
  test.describe.configure({ timeout: 90_000 });
  const axe = async (page: Page) => {
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  };
  for (const scheme of ["light", "dark"] as const) {
    test(`builder, practice, glossary, questions and progress (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      for (const hash of ["#/d1/quiz", "#/d1/kort", "#/d1/ova", "#/d2/ova", "#/prov1/begrepp", "#/prov1/fragor", "#/prov1/simulering", "#/framsteg", "#/omgang/ova"]) {
        await open(page, hash);
        await axe(page);
      }
    });
    test(`running sessions and results (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await startQuiz(page, "#/d1/quiz?urval=del&antal=5&ordning=ordning&lage=ova");
      await answer(page, false);
      await axe(page);
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press("Enter");
        await answer(page, true);
      }
      await page.getByRole("button", { name: "Visa resultat" }).click();
      await expect(page.locator("[data-results]")).toBeVisible();
      await axe(page);
      await startQuiz(page, "#/d1/quiz?urval=del&antal=5&ordning=ordning&lage=prov&tid=10");
      await answer(page, true);
      await axe(page);
      await startQuiz(page, "#/d1/kort?urval=del&antal=10&ordning=ordning");
      await axe(page);
      await page.keyboard.press("Space");
      await axe(page);
    });
  }
});
