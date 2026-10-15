# Local Bayesian study companion

A visual companion for studying Lectures 1–5 with the tutor in the existing conversation. Lectures 3–5 now have **35 full tutor lessons** (13, 10 and 12 respectively), covering every source slide; four earlier focused lessons remain available. It renders focused lessons and the indexed lecture notes with equations and original-page figures. It is **not an AI chatbot**, automatic grader or labsheet runner.

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

Lecture 2 slide 28 is clipped in the PDF. Missing text is not invented. Administrative dates and historical examples are preserved as lecture material, not updated professional or administrative guidance. Lecture 5's full predictive derivation and evidence-based hyperparameter fitting are previews for later teaching, not completed topics in these five lectures.
