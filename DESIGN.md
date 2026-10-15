# Design

## Source of truth
Status: Active. Date: 2026-10-15. Surface: a local browser-based study companion for Bayesian Machine Learning lectures 1–8.

Evidence: `BayesLec/README.md`, `BayesLec/1.md` through `8.md`, their original-page images in `BayesLec/assets/`, and the tutoring conversation. The existing application is the buildless study/ companion; preserve its warm notebook styling and local-storage contract. The source lecture files are read-only inputs and must not be rewritten.

## Brand
An attentive mathematical notebook: calm, precise, warm, and editorial. Trust comes from slide references, visible source limitations, and honest progress labels. Avoid marketing copy, neon gradients, decorative dashboards, fabricated metrics, and claims of automatic mastery.

## Product goals
Render equations and original lecture diagrams correctly. Put a focused teaching lesson beside its source. Navigate all eight lectures and an explicit prerequisite-aware roadmap. Save notes, teach-back answers, and self-assessed progress locally. Let the tutor update lesson content through repository files without rebuilding the app.

Non-goals: hosted deployment, accounts, an AI-chat backend, automatic grading, exams, labsheet execution, cloud sync, and lecture authoring in the browser.

Success: Lecture 3 slide 6 is the resume lesson; all slides in Lectures 3–8 map to full tutor lessons; every lecture can be read with mathematics and original figures; source links reach the appropriate slide; notes and progress survive reload; all essential interactions work on a phone and with a keyboard.

## Personas and jobs
One student studying interactively with a tutor in the existing chat. They need to understand and explain the complete lecture material to a beginner, not just recognise formulas. Desktop reading is primary; phone review is supported.

## Information architecture
A left course navigation for lectures 1–8. Main tabs: Lesson, Lecture notes, Roadmap. The lesson has an accessible grouped lesson selector, explicit source-slide links, explanations, worked derivations/examples, equations, prerequisites, and a teach-back prompt. Course navigation opens available lessons, with the original notes one tab away. Multiple lessons for a roadmap topic are all linked. Lecture 3–8 coverage is checked against every source slide; opening lessons does not declare mastery. A right study rail contains the current source image and personal notes/teach-back. Lecture notes have a slide table of contents and original-page expanders. The roadmap distinguishes introduced material, current material, and not-yet-started topics.

## Design principles
One learning task at a time. Content before controls. Keep original material distinguishable from tutor explanations. Introduced is not mastered. Never invent missing source content. Show mathematical structure rather than raw LaTeX; retain accessible text alternatives. Keep user writing safe during content refresh.

## Visual language
Warm ivory paper (#f6f5f0), white reading surfaces, ink (#202b31), subdued slate text, deep teal/blue (#245d66) for interaction and a restrained rust accent (#a54e36) for current study. Serif lesson headings with a native system sans-serif for interface and body. No remote fonts. Generous line height and a reading measure around 70 characters. Compact squared-soft corners, fine borders, little shadow. Motion only for short state changes and disabled under reduced-motion preference. Use original lecture figures, not generated decoration.

## Components
Course navigation with numbered lectures and lesson counts; grouped lesson selector and position; tab buttons; breadcrumbs; source chips; lesson article; mathematical blocks; slide TOC; original-page details; roadmap topic rows/status badges; prerequisite disclosures; labelled note fields with save feedback; self-assessment controls; image zoom dialog; error/retry state. CSS tokens in `study/styles.css` are the single visual-token source. JavaScript owns state and rendering, not inline layout styles.

## Accessibility
Target WCAG 2.2 AA: semantic landmarks, skip link, labelled fields, visible keyboard focus, correct tab semantics, readable contrast, 44px touch targets, sensible heading hierarchy, alt text, accessible math, dialog focus restoration/Escape, and no colour-only status. Announce saved/error feedback politely. Tables and formulas scroll within their containers rather than widening the whole viewport.

## Responsive behavior
Desktop: approximately 230px navigation, flexible reading column, 300px study rail. Below 1100px the rail stacks below the article. Below 760px navigation becomes an accessible toggle/drawer, controls wrap, and reading becomes one column. No essential hover-only interactions or horizontal page overflow at 375px.

## Interaction states
Explicit initial loading and fetch errors with retry. Empty personal notes have useful prompts. Source figures load lazily and have a recoverable missing-image state. Storage failure is visible and never falsely reports saved. Progress is manually assessed, never inferred from opening a page. Local application assets should not require internet after installation. No write endpoints: source data are read-only; personal state uses browser storage and can be exported.

## Content voice
Plain, patient, rigorous. Define symbols when introduced. Distinguish probability/density, likelihood/posterior, parameter/observation, and introduced/mastered. Preserve historical examples as lecture content, not current medical/legal guidance. Keep the clipped Lecture 2 slide 28 warning.

## Implementation constraints
Buildless HTML/CSS/ES modules and a small Node standard-library local server, bound to loopback. Do not expose workspace roots, labsheets, runtime state, or arbitrary files. Dependencies require the user's explicit approval; the user approved locally stored Markdown/math rendering libraries. No framework, build tool, telemetry, CDN runtime dependency, or AI credentials. Add targeted Node tests, source/render checks, keyboard/responsive browser checks, and screenshots. `npm start` starts the companion; `npm test` runs the test suite.

## Open questions
- [x] Rendering libraries approved: pinned local Marked, KaTeX and DOMPurify; no CDN runtime requests.
- [ ] Future in-app AI chat: intentionally deferred; owner: user; impact: would introduce a separate integration and privacy/cost contract.

## Curriculum extension — Lectures 6–8

The same notebook interface now includes all eight source decks (196 slides, 136 PDF pages), 72 focused lessons, and complete tutor coverage of all 145 slides in Lectures 3–8. Lectures 6, 7 and 8 contribute 13, 9 and 11 lessons. Existing Lecture 1–5 source text, PDFs, earlier lesson IDs, personal-state format and current teaching point are preserved. New topics are prepared, not learned; default status is not-started.

Source transcriptions retain literal equations and original-page figures, with explicit supplemental warnings about log-prior measures/Jacobians, grid versus iid Monte Carlo, predictive-mixture normalisation and the source’s high-dimensional-volume ambiguity. No unavailable demo outputs are invented. The lesson chain spans lectures, while the resume lesson remains `l3-bayesian-workflow`. No dependency, layout redesign, backend write route or deployment is introduced.
