# Verification — 15 October 2026

## Eight-lecture integration: fresh evidence

- `npm test`: **110 passed, 0 failed**. Covers eight sources, 72 lessons, all 196 unique source slides, page counts `[20, 13, 17, 11, 15, 21, 12, 27]`, full tutor coverage of all 145 slides in Lectures 3–8, source-page mappings, topic links, the ordered global lesson chain, 136 readable original-page PNGs, accessible math, new checkpoint/answer/teach-back structure and meaningful prerequisite metadata. Existing security, rejected-write, HEAD, traversal/symlink, corrupt-storage, tab-merge and stale-state unit checks remain.
- `npm run check`: all application modules pass Node syntax checks. `node --check study/test/browser-smoke.mjs` also passes. This buildless application has no separate compilation/typecheck step.
- Regression-first proof: three new narrow tests for Lecture 6–8 course validation, allowed routes and note persistence failed against the old five-lecture limits, then passed after the minimal eight-lecture range changes. Lecture 9 remains rejected.
- `npm run test:browser`: **passed** in an isolated headless Chromium session and an ephemeral loopback server, with the temporary environment override described below. It verifies all eight source renderers and PDF/Markdown/slide-link rewrites; all 72 lesson renderers and grouped picker options; navigation to each full-lesson lecture and its last lesson; global next links across 5→6→7→8; source-note deep links/TOCs and loaded original-page rail images for all eight lectures; and retained existing sanitisation, keyboard-scrollability, failed-save, stale-request, skip-link and unreadable-state recovery/export checks.
- Browser persistence: new Lecture 8 lesson notes and teach-back survive a real reload; separate Lecture 6, 7 and 8 lecture notes/answers also survive reload.
- Mobile browser checks: **375px**, no document-level horizontal overflow on all eight source-note views or any of the 33 new lessons.
- Preservation check: 49 pre-existing Lecture 1–5 source/PDF/lesson files retain their pre-integration SHA-256 bytes. Original lecture/topic metadata, old lesson metadata (except the requested final next link), warnings, current lesson, storage key and state version are unchanged.

The initial browser launch failed because this host lacked `libnspr4.so`, NSS and ALSA shared libraries. Recovery downloaded/extracted system packages only under `/tmp/bayes-browser-libs`, without installing them or changing application dependencies. The successful command was:

```sh
LD_LIBRARY_PATH=/tmp/bayes-browser-libs/extracted/usr/lib/x86_64-linux-gnu npm run test:browser
```

A normally provisioned Chromium host does not need this override. QA browser sessions and ephemeral servers close after the run. No existing user server is restarted. This fresh check does not claim a new axe audit, comprehensive accessibility certification, or execution of lecture demos/labsheets.

## Curriculum and source boundaries

- Lectures 6, 7 and 8 add **13, 9 and 11 lessons**, covering all **28, 20 and 26 slides** respectively and retaining **21, 12 and 27 original PDF pages**.
- Total: eight sources, 196 slides, 136 original pages, 72 lessons. There are 68 full tutor lessons for Lectures 3–8 plus four earlier focused lessons.
- Resume point remains `l3-bayesian-workflow` (Lecture 3 slides 6–7). All newly prepared topics default to **Not started**; no opening or content preparation declares mastery.
- Literal source equations and plots remain distinguishable from explanatory derivations/corrections. Log-prior densities and measures, grid-versus-iid-Monte-Carlo language, normalised predictive posterior weights, sigma-versus-variance notation and high-dimensional-volume ambiguities are explicitly qualified. Unavailable demonstration results and basis-family winners are not invented.
- `study/content/COVERAGE.md` lists every full lesson and source-slide grouping.

## Historical evidence below

The following earlier record applies to the five-lecture version and is retained for provenance. Its screenshot, axe and audit claims were not rerun as part of this integration.

# Historical verification — 14 October 2026

## Automated

- `npm test`: 69 passing tests. Includes all five lecture sources, all 39 focused lessons (35 new for Lectures 3–5), complete coverage of all 71 slides in Lectures 3–5, roadmap-topic links, source-page mappings, ordered lesson navigation, embedded images, equation validation, literal code preservation, course references/page counts, local HTTP assets/APIs, HEAD, rejected writes, host validation, traversal/symlink containment, browser-state recovery and disjoint-tab merges.
- `npm run check`: all application modules pass Node syntax checks.
- `npm run test:browser`: passed in an isolated Chromium session and ephemeral loopback server. Covers sanitised Markdown with accessible MathML, all lecture and lesson renderers, the grouped 39-lesson picker, lecture-to-lesson navigation and source links, keyboard-focusable scroll regions, failed note/progress writes retained on a subsequent route save, stale rejected requests, disabled stale assessment controls, skip-link route preservation, unreadable storage preservation/recovery export, and 375px page width.
- `npm audit --omit=dev`: zero reported vulnerabilities at verification time.

On this WSL host Chromium used pre-existing shared libraries through `LD_LIBRARY_PATH=/tmp/portfolio-browser-libs/extracted/usr/lib/x86_64-linux-gnu`. These are test-environment support, not application dependencies. A normal Chromium installation does not need that override.

## Interactive browser checks

- Desktop 1440px and mobile 375px screenshots inspected; no horizontal page overflow.
- Wide equations are keyboard focusable, visibly outlined and scroll using arrow keys on a 375px viewport.
- Original page images load, page navigation works, zoom opens, Escape closes and restores focus.
- Notes and self-assessed progress survive navigation/reload; lesson and lecture writing remain separate.
- Two tabs preserve disjoint lesson notes; a simultaneous edit of the same note pauses saving, preserving remote storage and the local draft for export.
- Current tutor lesson refreshes after a local file edit without losing writing. Other views retain an actionable update link, including on mobile. Temporary test content was restored.
- An older rejected route request does not put an error on the newer successful view.
- Axe 4.12.1 scan: zero violations; one incomplete colour-contrast rule concerning mathematical glyphs requires human interpretation. This is not a claim of comprehensive WCAG certification.
- Independent review of all 35 new lessons against Lectures 3–5: no mathematical errors or content omissions found. Source discrepancies and preview boundaries are explicitly preserved.
- Targeted follow-up review: no remaining must-fix findings.

Screenshots and the mobile axe report are under `.omx/artifacts/study-companion/`. Original lecture files and labsheet content were not rewritten. There is no cloud deployment, external AI integration or automatic grading.

## Curriculum expansion

- Lecture 3: 13 lessons, slides 1–23.
- Lecture 4: 10 lessons, slides 1–25.
- Lecture 5: 12 lessons, slides 1–23.
- Current tutor point: `l3-bayesian-workflow`, slides 6–7. Prepared content is not automatically marked learned.
- Metadata is consolidated in `study/content/course.json`; the human-readable index is `study/content/COVERAGE.md`.
- New screenshots: `lecture3-lessons.png`, `lecture5-mobile.png`; fresh axe scan: `a11y-lessons.json` (zero violations, one incomplete mathematical-glyph contrast check).
- The already-running user server on port 8765 was reused, not restarted or stopped. QA-only browser sessions and ephemeral test servers are closed after verification.
