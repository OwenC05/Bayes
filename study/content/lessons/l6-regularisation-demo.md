# Read the regularisation and evidence demonstrations

## Prerequisite bridge

Recall lambda = sigma² alpha for the stated PLS convention. Training, validation and test errors answer different questions.

## First inspect the fits

Slide 14 begins on page 9 and its plot fills page 10. The displayed regularisation settings are 10.0, 0.1 and $10^{-15}$, with displayed errors 0.462, 0.291 and 0.330. Heavy regularisation suppresses the function; almost no regularisation fits individual observations with extra wiggles. An intermediate setting follows the signal more plausibly.

These are the source’s displayed examples. They are not a new experiment, and their displayed error values should not be confused with the later summary table.

## Then inspect the error curves

Slide 15 plots RMS error against $\log\lambda$: black dashed training error, blue validation error and orange test error. Low regularisation can make training error small without minimising validation error. Select a setting using validation; the test curve is a reference for evaluation, not another tuning target.

Slide 16 overlays negative log marginal likelihood on a separate right-hand axis. Select its minimum, equivalently the evidence maximum. Do not compare the vertical numerical sizes of RMS error and negative log density: they are different quantities and use different axes. With noise fixed, $\log\lambda=\log\alpha+\log\sigma^2$, so varying one regularisation coordinate shifts the other by a constant.

## What the source’s bottom line supports

Slide 17 reports test errors 0.132 (orthodox), 0.110 (Bayesian) and 0.083 (oracle). The evidence-selected setting is better in this demonstration using only 15 examples and no separate validation data. “Oracle” denotes a benchmark with information unavailable in an ordinary learning procedure, not an achievable tuning rule the student should copy.

This one comparison is not proof that evidence always beats validation. Dataset, basis family, prior and noise assumptions all matter.

## An important source qualification

The source says the complexity penalty is “not due to the prior” and points to a flat hyper-prior over $\log\alpha$. Distinguish that hyper-prior from the weight prior: the evidence explicitly averages under $p(\mathbf w\mid\alpha)$. There need not be an extra hyper-prior favouring a particular complexity, but the evidence is not prior independent. Changing the weight-prior scale changes the prior predictive density and can change the selected model.

**Recall:** Small training error is not synonymous with good prediction; a density average is not synonymous with a best fit.

## Checkpoint

On slide 16, which operation selects evidence hyperparameters? A. Minimise the red negative-log-evidence curve. B. Match the height of the blue RMS curve. C. Minimise test error during training.

<details>
<summary>Answer and explanation</summary>

A. The red curve uses a different axis and objective. B mixes unlike units; C would use the evaluation set for tuning.

</details>

## Teach-back

Walk through slides 14–17: identify underfit and overfit, what validation selects, what evidence selects, and what the reported test numbers do and do not establish.

Source: Lecture 6, slides 14, 15, 16, 17. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
