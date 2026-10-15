# Verification — 14 October 2026

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
