# Lecture lesson coverage

Prepared tutor lessons for Lectures 3–8. Source slides are grouped into coherent learning units; each unit adds prerequisite bridges, explanations, worked examples and teach-back. **Prepared does not mean learned or mastered.**

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

## Lecture 6: Marginalisation & evidence

13 lessons covering all 28 source slides.

| Lesson | Source slides |
| --- | --- |
| [Why a MAP curve is not the whole Bayesian answer](lessons/l6-map-marginalisation.md) | 1, 2, 3 |
| [Rebuild the Gaussian linear-regression model](lessons/l6-gaussian-recap.md) | 4 |
| [The full predictive distribution and its nuisance variables](lessons/l6-full-predictive.md) | 5, 6, 7 |
| [A ladder of predictions and the analytic roadblock](lessons/l6-inference-ladder.md) | 8, 9 |
| [Type-II inference: exact factorisation, point approximation](lessons/l6-type-ii.md) | 10, 11 |
| [Derive the Gaussian marginal likelihood](lessons/l6-evidence-gaussian.md) | 12 |
| [Select hyperparameters with evidence, not training fit](lessons/l6-evidence-selection.md) | 13 |
| [Read the regularisation and evidence demonstrations](lessons/l6-regularisation-demo.md) | 14, 15, 16, 17 |
| [Occam’s razor is an average, not a maximum](lessons/l6-occam-average.md) | 18, 19, 20 |
| [Learn regularisation and observation noise together](lessons/l6-joint-noise.md) | 21, 22, 23, 24 |
| [Derive the Type-II predictive mean and variance](lessons/l6-predictive-gaussian.md) | 25 |
| [Read predictive bands where data are present and absent](lessons/l6-uncertainty-bands.md) | 26, 27 |
| [Beyond weights: basis families and RBF widths](lessons/l6-model-selection-preview.md) | 28 |

## Lecture 7: Fully-Bayesian inference

9 lessons covering all 20 source slides.

| Lesson | Source slides |
| --- | --- |
| [Evidence and the implicit Occam effect](lessons/l7-occam-recap.md) | 1, 2, 3 |
| [The full predictive target and the analytic roadblock](lessons/l7-bayesian-target.md) | 4, 5, 6 |
| [Type-II estimation: what it keeps and what it discards](lessons/l7-type-ii-limits.md) | 7, 8, 9, 10, 11 |
| [What the RBF width changes](lessons/l7-basis-width.md) | 12, 13 |
| [Bounded log priors and consistent integration measures](lessons/l7-log-priors.md) | 14 |
| [Numerical evidence: grid quadrature is not iid Monte Carlo](lessons/l7-numerical-evidence.md) | 15, 16 |
| [Predict with posterior-weighted components](lessons/l7-predictive-mixture.md) | 17, 18 |
| [Integrate width and compare basis families](lessons/l7-width-model-averaging.md) | 19 |
| [Why the grid approach stops scaling](lessons/l7-grid-limits.md) | 20 |

## Lecture 8: Monte Carlo & importance sampling

11 lessons covering all 26 source slides.

| Lesson | Source slides |
| --- | --- |
| [Why Bayesian learning needs stochastic integration](lessons/l8-integration-roadmap.md) | 1, 2, 3 |
| [Monte Carlo averages and their actual error rate](lessons/l8-monte-carlo.md) | 4, 5, 6, 7 |
| [Inverse-CDF sampling and the Cauchy warning](lessons/l8-inverse-cdf.md) | 8, 9 |
| [Targets known only up to a normalising constant](lessons/l8-unnormalised-targets.md) | 10, 11 |
| [Why grids and uniform proposals fail in many dimensions](lessons/l8-dimensionality.md) | 12, 13, 14, 15 |
| [Deriving self-normalised importance sampling](lessons/l8-importance-weights.md) | 16, 17 |
| [Reading the importance-sampling illustration](lessons/l8-importance-plots.md) | 18, 19 |
| [Bad proposals, rare weights and deceptive plateaus](lessons/l8-bad-proposals.md) | 20, 21 |
| [What a Cauchy proposal improves—and what it cannot guarantee](lessons/l8-heavy-tailed-proposals.md) | 22, 23, 24 |
| [Where high-dimensional Gaussian probability mass lives](lessons/l8-gaussian-mass.md) | 25 |
| [MCMC preview: local moves, correlated samples](lessons/l8-mcmc-preview.md) | 26 |

## Scope and caveats

- Lecture 3 lab material is a conceptual preview; the labsheet has not been run.
- Lecture 4 historical/medical/legal examples are source case studies, not current professional guidance. Ambiguous slide12/13 arithmetic and slide22 Medicine rates are flagged explicitly.
- Lecture 5 full predictive derivations, evidence-based hyperparameter fitting and model/basis-width selection remain previews within Lecture 5; later lectures now develop those topics separately.
- Supplemental derivations and numerical examples are labelled; no missing source diagrams or demo outputs are invented.
- Runtime metadata is maintained in `course.json`. The test suite validates slide coverage, topic links, source pages, images, navigation and all equations.

- Lectures 6–8 add 33 lessons covering all 74 slides; all 60 new original PDF pages are embedded. Total: 72 lessons, including 68 full lessons covering all 145 slides in Lectures 3–8, plus four earlier focused lessons. All eight sources contain 196 slides and 136 original pages.
- Lecture 6 distinguishes analytic weight marginalisation from hyperparameter point estimation; sigma annotations denote standard deviations, and flat-log-prior claims require specifying the density coordinates.
- Lecture 7 distinguishes consistent sigma/sigma-squared measures, deterministic grid quadrature from iid Monte Carlo, and prior-cell masses from posterior predictive weights. Model-family comparison requires proper priors and explicit model probabilities.
- Lecture 8 distinguishes variance from standard error, ordinary from self-normalised importance sampling, finite-variance assumptions and rare-event failure, and mass from density in high dimensions. The source’s ambiguous geometry is qualified. MCMC remains a conceptual preview.
