---
name: publicera
description: Publish Plugga to GitHub Pages at the permanent address https://linuswahlgren.github.io/plugga-biologi2/. Builds, runs the content check and all tests, pushes to main (which runs the deploy workflow), then confirms the live site loads with the new version and that existing student progress survives the update, and says which Teams post to update. Use when the user types /publicera or asks to publish or deploy.
---

# /publicera: publish Plugga

The address `https://linuswahlgren.github.io/plugga-biologi2/` never changes: progress is stored per address. Never rename the repository, change `base` in `vite.config.ts`, or change the course id.

## 1. Before publishing

1. `git status`: commit finished work first (ask the user if anything unexpected is uncommitted). The branch must be `main`.
2. `git ls-files material review` must print nothing. If it prints anything, **stop**: the repository is public and those files are the teacher's.
3. `npm run check`: zero errors.
4. `npm test`: everything green in Chromium, Firefox and WebKit. Retried tests reported as "flaky" are fine; failures are not.
5. Note the live version before pushing: fetch `https://linuswahlgren.github.io/plugga-biologi2/version.json?t=<now>` (404 on the first publication). The workflow builds again, so the new live `build` will be a new time, later than the push.

## 2. Push

Ask the user before pushing, and say what will be published: the commits since the last push, `git log --oneline origin/main..main` (on the first publication `origin/main` doesn't exist yet: use `git log --oneline` and say it is everything).

```bash
git push origin main
```

The push starts the workflow **Publicera Plugga** (`.github/workflows/deploy.yml`): build, unit specs, deploy to GitHub Pages.

- If the push asks for a sign-in, the user signs in to GitHub themselves in the window that opens. Never handle their password or token.
- If the repository does not exist yet, or Pages is not set to GitHub Actions, give the steps from `README.md` ("Första publiceringen") and stop.
- The user can follow the run under the repository's Actions tab. If the `gh` CLI is installed and signed in, `gh run watch` works too. Otherwise wait about two minutes, then check the live version (next step), a few times if needed.

## 3. Confirm the live site

1. Fetch `https://linuswahlgren.github.io/plugga-biologi2/version.json?t=<now>`. Its `build` must be later than the time of the push (and differ from the one noted in step 1.5). GitHub Pages can take a minute or two after the run is green.
2. Open the live site in the browser and check: the overview loads, a new or changed part opens, no console errors, and no requests to other sites.
3. **Progress survives the update.** Progress is stored per address in `localStorage` under `plugga:bio2-vaxtfys-cellbio-ht26`, so a deploy never touches it, and old progress is migrated on load. Confirm it on the live site: before pushing, open the live site, finish one lesson ("Markera som klar") and rate a few cards; after the deploy, switch to another tab and back (the site checks for a new version when it loads and whenever the tab becomes visible again). The update toast "Nytt material finns." with "Ladda om" should appear; press it, and after reloading the lesson is still marked done and the cards keep their boxes on "Mina framsteg". If you could not do the "before" step (first publication), say so and check that a fresh visit saves progress and keeps it after a reload.
4. Check the backup file was built (`dist/plugga-biologi2.html`). It is not published; give it to the user only if they ask.

## 4. Tell the user

- What was published and that it is live at the address.
- Which Teams post to update, if any: the pinned post in `docs/teams-inlagg.md` only changes if its text is out of date (for example, it says Prov 2 material comes "efter hand" and the user wants to announce a new part). The link itself never changes. Offer a one-line Swedish post such as "Del 7 om cellens uppbyggnad finns nu i Plugga, på samma länk som förut."
- Anything that did not pass, with the output.
