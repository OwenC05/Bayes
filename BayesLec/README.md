# Bayesian Machine Learning — Lectures

Markdown transcriptions of the lecture PDFs in this folder, taught by Edward Milsom.

| Lecture | Title | Markdown | Original PDF | Pages |
| --- | --- | --- | --- | ---: |
| 1 | Bayesian Machine Learning — An Introduction to the Unit | [Lecture 1](1.md) | [PDF](1.pdf) | 20 |
| 2 | Probabilistic Thinking — A Primer | [Lecture 2](2.md) | [PDF](2.pdf) | 13 |
| 3 | Bayesian Statistical Inference — Introductory Examples | [Lecture 3](3.md) | [PDF](3.pdf) | 17 |
| 4 | Adventures in Inference — Why We Need Probability | [Lecture 4](4.md) | [PDF](4.pdf) | 11 |
| 5 | Bayesian Linear Regression — A First Really Useful Bayesian Model | [Lecture 5](5.md) | [PDF](5.pdf) | 15 |
| 6 | Marginalisation & Type-II Maximum Likelihood — Realising the Power of Bayesian Inference | [Lecture 6](6.md) | [PDF](6.pdf) | 21 |
| 7 | Fully-Bayesian Inference — Marginalising Over All Hyperparameters | [Lecture 7](7.md) | [PDF](7.pdf) | 12 |
| 8 | Monte Carlo and Importance Sampling — Approximating Intractable Integrals Stochastically | [Lecture 8](8.md) | [PDF](8.pdf) | 27 |

## Reading the notes

- The Markdown follows the original page and slide order, including slides that continue onto another page.
- Equations use LaTeX notation (`$...$` and `$$...$$`); use a Markdown viewer with math support, such as Obsidian.
- Expand **Original page** under each page heading to view the original figures, plots and equation layout. These images are stored in `assets/`; keep that folder alongside the Markdown files.
- Dates, schedules, examples and claims are transcribed as lecture material, not updated guidance. The original PDFs are unchanged.
- Lecture 2, slide 28 has a clipped right-hand column in the source PDF; the transcription marks this limitation rather than filling in missing text.

## Lectures 6–8 source boundaries

- All eight PDFs and the existing Lecture 1–5 transcriptions are preserved. The new transcriptions cover all 74 slides in Lectures 6–8 and include all 60 original pages as lossless PNGs.
- Supplemental clarifications are labelled rather than silently replacing literal source equations. Flat log-scale priors require the appropriate inverse-scale densities/Jacobians; a regular log grid is quadrature rather than iid Monte Carlo.
- The Lecture 7 printed predictive sums need normalised posterior grid weights and consistent measures. Width remains a plug-in estimate until explicitly integrated. The model-family demonstration agenda is not an available set of numerical outputs.
- Lecture 8 conditions the usual Monte Carlo standard-error rate on iid, finite-variance samples; importance-sampling support/tail requirements, finite-sample ratio bias, and ambiguous Gaussian-volume geometry are explained without inventing demo output.
- Source notes are paired with distinct tutor lessons in `../study/content/lessons/`; prepared content is not evidence of learning or mastery.
