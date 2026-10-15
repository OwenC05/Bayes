# Lecture lesson coverage

Prepared tutor lessons for Lectures 3–5. Source slides are grouped into coherent learning units; each unit adds prerequisite bridges, explanations, worked examples and teach-back. **Prepared does not mean learned or mastered.**

Current teaching point: Lecture 3, slide 6, `l3-bayesian-workflow`. Original `BayesLec` files remain the source inputs.

## Lecture 3: Bayesian inference

13 lessons covering all 23 source slides.

| Lesson | Source slides |
| --- | --- |
| [Probability rules behind Bayesian learning](lessons/l3-probability-recap.md) | 1, 2, 3, 4 |
| [Maximum likelihood and plug-in prediction](lessons/l3-point-estimates.md) | 5 |
| [Specify, update, integrate and predict](lessons/l3-bayesian-workflow.md) | 6, 7 |
| [Learning a Gaussian mean: likelihood and MLE](lessons/l3-gaussian-likelihood.md) | 8 |
| [Choosing a prior and understanding conjugacy](lessons/l3-choosing-priors.md) | 9, 10 |
| [Deriving the Gaussian posterior by completing the square](lessons/l3-gaussian-posterior.md) | 11 |
| [Reading the Gaussian mean update plot](lessons/l3-gaussian-curves.md) | 12 |
| [Predicting a future Gaussian observation](lessons/l3-gaussian-prediction.md) | 13 |
| [Bernoulli likelihood, counts and boundary estimates](lessons/l3-bernoulli-likelihood.md) | 14 |
| [Beta priors: location, concentration and shapes](lessons/l3-beta-prior.md) | 15, 16 |
| [Deriving the Beta–Bernoulli posterior](lessons/l3-beta-update.md) | 17, 18 |
| [Four priors, one dataset: reading every update](lessons/l3-bernoulli-curves.md) | 19, 20, 21, 22 |
| [Recognising the bandit lab without doing it](lessons/l3-lab-preview.md) | 23 |

## Lecture 4: Inference & decisions

10 lessons covering all 25 source slides.

| Lesson | Source slides |
| --- | --- |
| [Separate inference from decisions](lessons/l4-inference-decisions.md) | 1, 2, 3, 4 |
| [A good decision can have a bad outcome](lessons/l4-decision-quality.md) | 5, 6 |
| [When the population changes, the probability changes](lessons/l4-prevalence.md) | 7, 8 |
| [Choose actions using expected costs](lessons/l4-asymmetric-costs.md) | 9, 10 |
| [False independence: the Sally Clark case study](lessons/l4-false-independence.md) | 11, 12 |
| [A fictional experiment makes clustering visible](lessons/l4-dependence-experiment.md) | 13, 14 |
| [Selection effects and p-values: the Lucia de Berk case study](lessons/l4-selection-pvalues.md) | 15, 16, 17 |
| [Correlation is not an instruction for intervention](lessons/l4-causation.md) | 18, 19, 20 |
| [Simpson’s paradox: different mixtures, different totals](lessons/l4-simpson.md) | 21, 22, 23 |
| [Age confounding and the lecture’s closing message](lessons/l4-confounding-review.md) | 24, 25 |

## Lecture 5: Bayesian regression

12 lessons covering all 23 source slides.

| Lesson | Source slides |
| --- | --- |
| [Regression and linear-in-parameter models](lessons/l5-regression-model.md) | 1, 2, 3 |
| [Choosing and reading basis functions](lessons/l5-basis-functions.md) | 4, 5 |
| [Least squares: from residuals to the normal equations](lessons/l5-least-squares.md) | 6 |
| [Interpolation is not the same as generalisation](lessons/l5-interpolation-overfitting.md) | 7 |
| [Ridge regularisation and the role of lambda](lessons/l5-ridge-regularisation.md) | 8, 9 |
| [Selecting lambda using held-out observations](lessons/l5-validation.md) | 10, 11 |
| [Gaussian noise turns least squares into maximum likelihood](lessons/l5-gaussian-likelihood.md) | 12, 13 |
| [A Gaussian prior over the weights](lessons/l5-gaussian-weight-prior.md) | 14 |
| [Deriving the Gaussian posterior over weights](lessons/l5-weight-posterior.md) | 15 |
| [MAP estimation and its exact connection to ridge](lessons/l5-map-ridge.md) | 16 |
| [Sequential learning in weight space and function space](lessons/l5-sequential-learning.md) | 17, 18, 19, 20, 21, 22 |
| [What Lecture 5 establishes—and what remains a preview](lessons/l5-summary-previews.md) | 23 |

## Scope and caveats

- Lecture 3 lab material is a conceptual preview; the labsheet has not been run.
- Lecture 4 historical/medical/legal examples are source case studies, not current professional guidance. Ambiguous slide12/13 arithmetic and slide22 Medicine rates are flagged explicitly.
- Lecture 5 full predictive derivations, evidence-based hyperparameter fitting and model/basis-width selection remain explicitly signposted previews.
- Supplemental derivations and numerical examples are labelled; no missing source diagrams or demo outputs are invented.
- Runtime metadata is maintained in `course.json`. The test suite validates slide coverage, topic links, source pages, images, navigation and all equations.
