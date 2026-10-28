# Local Bayesian study companion

A visual companion for studying Lectures 1–10 with the tutor in the existing conversation. Lectures 3–10 have **92 full tutor lessons**, covering all 192 source slides in those lectures; four earlier focused lessons remain available, for **96 lessons total**. All ten sources contain 243 slides across 185 original pages. It renders focused lessons and indexed lecture notes with equations and original-page figures. It is **not an AI chatbot**, automatic grader or labsheet runner.

## Run from the repository root

Requires Node.js 22 or newer. Install the approved, pinned local rendering libraries once:

```sh
npm ci
npm start
```

Open **http://127.0.0.1:8765**. The server is local-only; this workflow does not deploy or publish anything.

## Verify

```sh
npm test
npm run check
```

Optional interactive regressions: `npm run test:browser` requires the existing `agent-browser` CLI and a working Chromium installation. It starts an isolated test server/browser session and closes both afterward.

See the root package configuration for installation requirements. The intended runtime uses local rendering assets, not a CDN.

## Update the teaching material

- `study/content/course.json` contains the roadmap, source warnings, curated lesson metadata and prerequisite bridges.
- Its `currentLesson` selects the initial tutor lesson for a fresh visit (currently `l3-bayesian-workflow`, Lecture 3 slides 6–7). An explicit URL or saved reading position is preserved.
- Edit `study/content/lessons/*.md` to revise a focused explanation. Use `$...$` and `$$...$$` for mathematics. The current lesson refreshes automatically while you are following it; other views offer an update link.
- `sourceSlides` lists every source slide covered by a lesson. Coverage and lesson-topic links are tested; see [the coverage index](content/COVERAGE.md).
- Lesson `slide` identifies the numbered slide; `page` identifies the original PDF page. Several slides can share a page.
- The original `BayesLec/*.md`, PDFs and page images are **read-only study inputs**. Do not rewrite them to update a tutoring explanation.

The roadmap's labels reflect the conversation: **introduced is not mastered**. The Gaussian-circle teach-back remains pending. The current teaching point is Lecture 3 slide 6; adding all the later lessons does not mark them learned. Derivatives, completing the square, gradients, norms and rank are introduced where their derivations need them. Later lectures are not prerequisites for earlier ones.

## Find the lessons

- Click a lecture in the left navigation to open its available tutor lessons; **Lecture notes** still opens the original indexed source.
- Use **Choose a lesson** to jump anywhere in the library, grouped by lecture. Previous/next follows the full study sequence.
- The roadmap links every lesson belonging to a topic, not just the first one. Self-assessment is topic-level; personal writing is separate for each lesson.
- Resume the current explanation directly at **http://127.0.0.1:8765/#lesson/l3-bayesian-workflow**.

## Personal work and privacy

Notes, teach-back answers and self-assessed progress are stored in the browser locally and can be exported through the interface. They are not written into the lecture files or sent to an AI service. Browser storage can be cleared or unavailable; export important work. Unreadable saved data is preserved rather than overwritten. If another tab edits the same writing while you are editing, saving pauses; export both versions before reloading. There is no account, cloud sync or deployment in this companion.

## Source limitations

Lecture 2 slide 28 is clipped in the PDF. Missing text is not invented. Administrative dates and historical examples are preserved as lecture material, not updated professional or administrative guidance. Lecture 5's full predictive derivation and evidence-based hyperparameter fitting are previews for later teaching, not completed topics within Lecture 5; Lectures 6–8 now develop prediction, evidence and numerical approximation in separate lessons.

Lectures 6–8 remain **Not started** by default. New lessons explain the Gaussian predictive variance, evidence and Type-II approximation, bounded log-scale priors and Jacobians, posterior-weighted grid mixtures, width/model averaging, Monte Carlo conditions, self-normalised importance sampling and high-dimensional geometry. Source notation ambiguities and corrections are visible beside the relevant material; unavailable demo results are not reconstructed. Proper priors and explicit model priors matter for evidence comparisons. MCMC is a preview within Lecture 8; Lecture 9 separately develops Metropolis-Hastings and HMC, with mathematical justifications and labelled supplementary leapfrog calculations.

Lecture-note deep links and locally saved writing now support Lectures 6–8 as well (for example `#notes/8/slide-25`). The browser storage key and format are unchanged, so earlier notes and self-assessments are preserved. No model fitting, sampling demo or labsheet is executed by the app.

## Lectures 9–10

Lecture 9 adds **13 lessons** on Markov chains, Metropolis-Hastings, stationarity and convergence, correlated samples and effective sample size, random-walk geometry, HMC, regression prediction and tuning. Lecture 10 adds **11 lessons** on probabilistic programs and graphical models, the Beta–Bernoulli model, NumPyro/JAX code, prior/posterior prediction, NUTS and diagnostics. Both follow the existing prerequisite, derivation, worked-example, checkpoint and teach-back approach.

All new topics remain **Not started**. The initial tutor point, storage key/version and earlier progress defaults are unchanged. Double-digit lecture navigation, PDF/Markdown links and saved lecture notes support Lecture 10 (for example `#notes/10/slide-19`). Source outputs are transcribed, not newly reproduced. No new application dependencies, sampler execution or lab completion is implied. Hierarchical modelling remains a preview for later lectures.
