# A ladder of predictions and the analytic roadblock

## Prerequisite bridge

Keep a distinction between fitting a parameter, retaining a parameter posterior, and using that posterior in a predictive integral.

## Read slide 8 as an uncertainty audit

The table is not a ranking of people’s “morality”: the lecture uses that word playfully. It ranks how much uncertainty the procedures retain under this model.

1. **Orthodox PLS:** fit one weight vector and report a fitted function.
2. **MAP weights:** obtain a posterior mode and predict conditional on it. An observation-noise distribution can remain, but weight uncertainty is removed.
3. **Basic Bayesian:** fix $\alpha,\sigma^2$ but integrate weights using their Gaussian posterior.
4. **Type-II:** select $\widehat\alpha,\widehat\sigma^2$ from the data, then integrate weights conditional on those choices.
5. **Strict Bayesian:** average over weights and hyperparameters, retaining their joint uncertainty.

Obtaining a posterior in a fitting step does not establish that its uncertainty has been used. Ask what was integrated at prediction time.

## Why not always do the last option?

Slide 9 describes an analytic roadblock. The Gaussian weight integral is tractable with fixed hyperparameters, but the remaining integrations generally do not have a convenient closed form for arbitrary hyperpriors. The practical strategy is to do the exact work available and approximate the rest.

The source lists Type-II maximum likelihood, Laplace’s method, Monte-Carlo sampling and variational techniques. These are previews, not interchangeable names: Type-II replaces a hyperparameter distribution by a point; Laplace approximates local curvature near a mode; Monte Carlo approximates expectations by samples; variational inference optimises within a restricted distribution family.

## Supporting example: two sorts of approximation

For the earlier constant model with posterior weight variance 0.25 and noise variance 0.09, a MAP prediction has variance 0.09 while fixed-hyperparameter Bayesian prediction has variance 0.34. Type-II can also give 0.34 if it selects exactly those hyperparameters. That equality does not make Type-II fully Bayesian: another plausible noise setting was never included.

The ladder separates **conditioning choices** from **integration choices**. Even an exact Gaussian calculation can sit inside an approximate overall procedure.

**Misconception:** There is no universal theorem that a model with hyperparameters cannot be integrated analytically. Conjugate choices sometimes allow more exact marginalisation. The source itself notes specific exceptions before introducing approximation.

**Recall prompt:** If a predictive distribution is Gaussian, does that prove the entire inference was exact? No: a point approximation upstream can still produce a Gaussian downstream.

## Checkpoint

What makes Type-II different from MAP over weights? A. It integrates weights at selected hyperparameters. B. It uses no prior. C. It integrates every unknown.

<details>
<summary>Answer and explanation</summary>

A. Type-II preserves conditional weight uncertainty but collapses hyperparameter uncertainty. MAP over weights collapses the weights themselves.

</details>

## Teach-back

Compare orthodox, MAP, fixed-hyperparameter Bayesian, Type-II and full Bayesian prediction. Which uncertainty does each keep or discard?

Source: Lecture 6, slides 8, 9. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
