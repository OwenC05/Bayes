# Verification — 27 October 2026

## Ten-lecture integration: fresh evidence

- **24 new tutor lessons:** 13 for Lecture 9 and 11 for Lecture 10. All 47 new source slides are covered, with correct first-slide page mappings and linked roadmap topics. Total: 96 lessons; 92 full lessons cover all 192 slides in Lectures 3–10, plus four earlier focused lessons.
- **Sources:** ten unchanged PDFs, 243 numbered slides and 185 original pages. Lectures 9 and 10 add complete page-by-page Markdown and 49 lossless original-page PNGs at 1224 × 1584 pixels. Figure continuations do not invent new slide numbers.
- **Automated suite:** `node --test --test-isolation=none study/test/*.test.mjs` passes **136 tests, 0 failures**. Coverage includes all source/lesson renderers and equations, lesson/source/topic links, full ordered navigation, page/image structure, HTTP/API/static allowlists, rejected writes, traversal and symlink containment, state recovery and new lecture-note persistence. New lesson counts are explicitly checked as 13 and 11 (96 total).
- **Syntax:** `npm run check` and `node --check study/test/browser-smoke.mjs` pass. This buildless JavaScript application has no separate lint, TypeScript or compilation step.
- **Regression-first evidence:** the old modules rejected lecture IDs 9/10 and dropped their lecture notes on a storage round trip. The narrow validation/storage checks pass after the minimal range changes. Out-of-range and lookalike source/API identifiers, including 11, 09, 010 and 100, remain rejected.
- **Browser smoke:** `npm run test:browser` passes in an isolated headless Chromium session and ephemeral loopback server. It checks all ten source renderers and all 96 lesson renderers, double-digit PDF/Markdown/slide rewrites, grouped lesson navigation, roadmap numbering, original-page rail images and cross-lecture next links including 8→9→10.
- **Browser persistence and recovery:** lecture notes/answers for 6–10 and a Lecture 10 lesson survive reload. Existing failed-save retention, stale-request isolation, skip links, unreadable-data preservation and recovery export regressions pass.
- **Mobile:** 375px viewport; no document-level horizontal overflow on any of the ten source views or the 57 lessons in Lectures 6–10, including all 24 additions.
- **Preservation:** SHA-256 comparison confirms 226 pre-existing source/PDF/image/lesson files unchanged. Original lecture/topic metadata, prior lesson metadata (apart from the former final lesson's new next link), prior warnings, `currentLesson`, browser storage key and state version are preserved. All new topics default to Not started.
- **Independent content review:** both new transcriptions, all 24 lessons and both metadata bundles reviewed for mathematics, teaching depth and source fidelity. No remaining mathematical blockers; misleading references to an unavailable numerical transition matrix were corrected against the original images.

The first Chromium launch failed because the host did not expose its NSPR/NSS/ALSA libraries on the normal library path. The successful run reused existing host support libraries, without installing anything or changing application dependencies:

```sh
LD_LIBRARY_PATH=/home/owenc/.cache/copilot-browser-runtime/root/usr/lib/x86_64-linux-gnu npm run test:browser
```

A normally provisioned Chromium host does not need this override. Browser sessions and ephemeral servers close after verification; no user server is restarted. Browser smoke was run against a temporary integration copy containing the same application, source, lesson and dependency bytes. Final repository unit/syntax checks repeat after copying the approved files.

## Source and learning boundaries

- Prepared content is not evidence of learning or mastery; the existing initial tutor point remains `l3-bayesian-workflow`.
- Detailed balance is distinguished from convergence, thinning from independence, posterior SD from Monte Carlo error, and HMC trajectories from iid samples. Log-prior bounds, coordinate measures and predictive mixture variance are explicit.
- NumPyro/JAX snippets and printed outputs remain source material, not newly executed results. Lessons explain observation-site conditioning, Beta argument ordering, predictive shapes, random-key streams, warmup and diagnostic limitations, including HPDI versus equal-tail intervals and single-chain split-R-hat.
- Missing matrix entries, clipped printed output and unavailable live-demo results are not invented. Supplemental derivations and examples are labelled. Hierarchical modelling remains a preview.
- No new application dependencies, cloud deployment, sampler/demo/labsheet execution, automated grading or comprehensive accessibility audit is claimed. See `content/COVERAGE.md` for every lesson/source grouping.

## Historical verification below

The following dated records concern earlier versions and are retained for provenance. Their historical audit, screenshot and environment-specific claims are not presented as newly rerun.

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
