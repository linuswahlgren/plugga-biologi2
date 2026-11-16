# Plugga – Biologi 2

En studieplattform för klassen i **Biologi 2 – Växtfysiologi och cellbiologi**. Prov 1 finns som repetition. Materialet till prov 2 (måndag 7 december 2026) läggs till del för del.

**Länken till eleverna:** https://linuswahlgren.github.io/plugga-biologi2/

Det här dokumentet har två delar: [För dig som sköter Plugga](#för-dig-som-sköter-plugga) och [Så använder du Plugga](#så-använder-du-plugga) (för eleverna).

---

## För dig som sköter Plugga

### Adressen får aldrig ändras

Varje elevs framsteg sparas i elevens egen webbläsare, kopplat till webbadressen. Om adressen ändras, till exempel för att repositoryt byter namn eller flyttas till ett annat konto, börjar alla elever om från noll. Därför:

- Byt aldrig namn på repositoryt `plugga-biologi2` och flytta det inte.
- Byt aldrig länk i Teams. Nytt material kommer till samma länk.
- Ändra aldrig kursens id (`bio2-vaxtfys-cellbio-ht26`) eller id:n på delar, lektioner, kort och frågor (`d3-l2`, `d3-k07` …). Texter, ordning och rubriker får du ändra hur du vill.

### Vad som finns i repositoryt, och vad som inte gör det

Repositoryt är **publikt**. Lärarens filer ska aldrig dit.

- `material/` (lärarens bildspel och dokument, och texten som tas ut ur dem i `material/_extracted/`) och `review/` (skärmbilder) finns bara på din dator. De står i `.gitignore`.
- Kontrollera före varje publicering att inget av det har kommit med:

  ```bash
  git ls-files material review
  ```

  Kommandot ska inte skriva ut något.

### Kom igång på en dator

Du behöver Node.js 24 eller senare och Git. Python 3 behövs bara för att ta ut text ur nytt material.

```bash
git clone https://github.com/linuswahlgren/plugga-biologi2.git
```

```bash
cd plugga-biologi2
```

```bash
npm ci
```

```bash
npx playwright install
```

Det sista hämtar webbläsarna som testerna använder. Det behövs en gång per dator.

Kopiera sedan lärarens filer till `material/prov1/` (och `material/prov2/` när det finns). De följer inte med från GitHub. Kör därefter:

```bash
npm run extract
```

### Arbeta från en annan dator

Hämta alltid det senaste först, så skriver du inte över något som du har gjort på en annan dator:

```bash
git pull
```

Mappen `material/` följer aldrig med. Flytta den själv, till exempel med ett USB-minne eller OneDrive. `/ny-del` frågar efter den om den saknas.

### Lägga till material till prov 2

1. Lägg lärarens nya filer i `material/prov2/` (bildspel, dokument, bilder).
2. Öppna projektet i Claude Code och skriv `/ny-del`.
3. Claude hämtar det senaste från GitHub, tar ut texten, frågar vilket prov materialet hör till och föreslår en disposition med antal lektioner, kort och frågor. Godkänn eller ändra.
4. Claude skriver delen, lägger till nya begrepp och instuderingsfrågor, låter en separat granskare faktakolla allt och kör kontrollerna och testerna.
5. Till sist frågar Claude om delen ska publiceras.

Allt som inte står i lärarens material märks "Kompletterande" för eleverna.

### Publicera

Skriv `/publicera` i Claude Code. Det bygger, kontrollerar, testar och publicerar, och kontrollerar sedan att den publicerade sidan fungerar och att elevernas framsteg finns kvar.

Så gör du för hand:

```bash
npm test
```

```bash
git add .
```

```bash
git commit -m "Beskriv ändringen här"
```

```bash
git push
```

`material/` och `review/` kommer aldrig med, eftersom de står i `.gitignore`.

Varje push till `main` startar arbetsflödet **Publicera Plugga** (`.github/workflows/deploy.yml`). Det bygger sidan och lägger ut den på GitHub Pages. Under fliken **Actions** på GitHub ser du när det är klart, oftast inom ett par minuter. Eleverna som har Plugga öppen får rutan "Nytt material finns." med knappen "Ladda om". Deras framsteg finns kvar.

### Första publiceringen (en gång)

1. Logga in på github.com som `linuswahlgren`.
2. Skapa ett nytt repository med namnet `plugga-biologi2`, **Public**, utan README, licens eller `.gitignore` (det ska vara tomt).
3. Öppna repositoryts **Settings › Pages** och välj **Source: GitHub Actions** under *Build and deployment*.
4. I projektmappen:

   ```bash
   git push -u origin main
   ```

   Första gången öppnas ett inloggningsfönster för GitHub. Logga in där.
5. Vänta tills **Publicera Plugga** är grön under **Actions** och öppna länken.

### Länken och Teams-inlägget

- Texten till klassens Teams-kanal finns i [`docs/teams-inlagg.md`](docs/teams-inlagg.md). Klistra in den och fäst inlägget.
- Inlägget behöver inte ändras när nytt material kommer, eftersom länken är densamma. Skriv gärna ett kort nytt inlägg ("Del 7 om … finns nu i Plugga") så att klassen vet.
- Knappen "Dela" i Plugga kopierar länken till den sida man står på och visar en QR-kod, bra att visa på projektorn.

### Reservfilen

`npm run build` gör också `dist/plugga-biologi2.html`, en enda fil som fungerar utan nät och utan server. Den är till för när länken inte går att använda. Framstegen i filen sparas separat från länkens. Dela den bara om det behövs.

### När prov 2 är skrivet

Då ska prov 2 flyttas till "Repetera", precis som prov 1, och prov 3 bli aktuellt. Elevernas framsteg finns kvar eftersom inga id ändras.

1. I `content/biologi2/prov2/hub.ts`: ändra `status: "upcoming"` till `status: "done"`.
2. Skapa mappen `content/biologi2/prov3/` med `hub.ts` och `index.ts`, likadana som de tomma filerna prov 2 hade från början:

   ```ts
   // content/biologi2/prov3/hub.ts
   import type { Exam } from "../../../src/types.ts";

   export const prov3: Exam = {
     id: "prov3",
     title: "Prov 3",
     date: "2027-02-15", // provets datum
     status: "upcoming",
   };
   ```

   ```ts
   // content/biologi2/prov3/index.ts
   import type { Week } from "../../../src/types.ts";

   export const prov3Parts: Week[] = [];
   ```

3. I `content/biologi2/course.ts`: importera `prov3` och `prov3Parts`, sätt `currentExam: "prov3"`, `exams: [prov3, prov2, prov1]` (nyast först) och `weeks: [...prov1Parts, ...prov2Parts, ...prov3Parts]`.
4. Kör `npm run check` och `npm test`. Testerna i `tests/app.e2e.ts` som räknar dagar till prov 2 och visar att prov 2 saknar material ska då ändras till prov 3. Publicera sedan.

Delarna fortsätter att numreras där prov 2 slutade (är sista delen i prov 2 `d9`, blir nästa `d10`). Lägg sedan till material till prov 3 med `/ny-del` som vanligt. Det enklaste är att be Claude göra steg 1–4.

### Kommandon

| Kommando | Vad det gör |
| --- | --- |
| `npm run dev` | Startar en utvecklingsserver på http://localhost:5173 |
| `npm run build` | Kontrollerar innehållet och bygger `dist/site/` (sidan) och `dist/plugga-biologi2.html` (reservfilen) |
| `npm run preview` | Visar den byggda sidan på http://localhost:4173 |
| `npm run check` | Kontrollerar innehållet: id, länkar, källor, svarsalternativ och antal |
| `npm test` | Bygger och kör alla tester i Chromium, Firefox och WebKit |
| `npm run extract` | Tar ut text och bilder ur `material/prov1` till `material/_extracted/prov1` |

Mer om hur koden är uppbyggd står i [`CLAUDE.md`](CLAUDE.md) och [`docs/`](docs/).

---

## Så använder du Plugga

Öppna länken: **https://linuswahlgren.github.io/plugga-biologi2/**. Du behöver inget konto.

### Lär dig, öva, testa

- **Översikt** visar hur långt du har kommit, hur många dagar det är kvar till provet och vad du kan göra härnäst.
- Varje **del** har fyra flikar:
  - **Lär dig:** korta lektioner med en snabbkoll i slutet.
  - **Kort:** vänd kortet och säg hur väl du kunde det. Kort du kan kommer tillbaka mer sällan, kort du inte kan kommer tillbaka snart.
  - **Quiz:** flervalsfrågor med förklaringar. I **Provläge** ser du svaren först när du lämnar in.
  - **Öva:** uppgifter där du skriver svar, räknar, sätter steg i ordning eller sätter ut namn på en bild.
- Du väljer själv hur många kort eller frågor du vill göra, från vilka delar och på vilken nivå (E, C, A). **Snabbval** fyller i allt med ett tryck.
- **Mina missar** samlar frågorna du har svarat fel på, så att du kan öva på dem igen.
- Under varje prov finns **instuderingsfrågor** med exempelsvar, **begreppslistan** och en **provsimulering**.

### Dina framsteg

Dina framsteg sparas bara på den här enheten. Ingen annan kan se dem, inte heller läraren. Under **Mina framsteg** ser du allt du har gjort.

- **Spara en kopia** då och då. Du får en liten fil som du kan läsa in igen om något försvinner.
- **Flytta mellan mobil och dator:** tryck på **Kopiera kod** på den ena enheten, skicka koden till dig själv och klistra in den under **Klistra in en kod** på den andra. Det bästa från båda behålls.

### Lägg till Plugga på hemskärmen

Då öppnar du Plugga med ett tryck, och den fungerar även utan nät.

- **iPhone:** öppna länken i Safari, tryck på Dela och välj *Lägg till på hemskärmen*. På iPhone kan Safari rensa sparade data för webbplatser som du inte har använt på ett tag, så öppna Plugga från hemskärmen.
- **Android:** öppna länken i Chrome, tryck på menyn ⋮ och välj *Installera app* eller *Lägg till på startskärmen*.

När nytt material finns visas "Nytt material finns." Tryck på **Ladda om**, så finns det nya där och dina framsteg är kvar.
