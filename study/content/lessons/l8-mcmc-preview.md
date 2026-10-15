# MCMC preview: local moves, correlated samples

## What the lecture introduces

Importance sampling asks for an easy-to-sample proposal that adequately covers the whole target. High-dimensional probability mass makes this global fit hard. Slide 26 proposes a different idea: start from a current location and use a **local** proposal,

$$Q(\boldsymbol\theta'\mid\boldsymbol\theta^{(t)}).$$

The prime marks a proposed next point, while $t$ indexes the current chain position. Unlike a fixed global $Q(\boldsymbol\theta)$, this conditional proposal depends on the present state. It can explore near locations already found to be relevant rather than repeatedly drawing from a globally mismatched distribution.

Page 27 completes this preview: local proposals can in principle track high-probability-mass regions; the method will be developed next week. No complete transition rule, acceptance calculation, implementation or guaranteed convergence rate appears in Lecture 8.

## The important distinction: proposal versus transition

A local proposal is only part of a valid MCMC algorithm. A chain also needs a transition mechanism designed so that the intended target is invariant. Simply adding Gaussian noise to the current point gives a random walk; it does not magically create a specified posterior distribution. The way proposals are accepted or otherwise used matters, and is outside the source's preview.

A Markov chain's next-state distribution depends on its current state rather than the full past. Its successive states are generally **correlated**. This is not the IID setting used to derive $\sigma_f^2/R$ earlier in the lecture.

## A supplemental variance bridge

Suppose a chain is stationary with marginal target $p$, and $g_t=f(\boldsymbol\theta^{(t)})$ has finite variance $\sigma_f^2$. Let $\rho_k$ be its lag-$k$ autocorrelation. Then

$$\operatorname{Var}\left(\frac1R\sum_{t=1}^R g_t\right)=\frac{\sigma_f^2}{R}\left[1+2\sum_{k=1}^{R-1}\left(1-\frac{k}{R}\right)\rho_k\right].$$

This follows by retaining the cross-covariances in the variance-of-a-sum expansion. Under suitable mixing and summable correlations, the bracket approaches an integrated autocorrelation factor. For a factor of five, 1,000 stationary draws have the variance scale of roughly 200 IID draws for that particular function. This is a tutor example, not a reported chain run.

The formula assumes stationarity and finite relevant moments. A chain started away from its target also has transient effects; sufficiently ergodic exploration and suitable integrability are needed for long-run averages to estimate target expectations. “Mixing” concerns how effectively the chain explores and forgets its starting location, not merely whether it moves on the screen.

## Why local is promising but not effortless

Small moves can explore nearby structure without a global approximation. They can also be highly correlated or get stuck within one mode. Large proposals can encounter low-probability regions or be poorly adapted to narrow geometry. None of these challenges is resolved merely by calling the method MCMC.

**Recall:** local proposals are the promised next tool, not a complete algorithm here. **Misconception:** dependence does not automatically invalidate Monte Carlo, but it changes the assumptions, uncertainty calculation and effective information per draw.

## Checkpoint

Does choosing a local Gaussian proposal by itself define a correct posterior sampler? A. Yes. B. No: a target-preserving transition and adequate exploration are still required. C. Yes, if every proposed point is accepted.

<details>
<summary>Answer and reasoning</summary>

**B.** The proposal alone does not establish the invariant distribution; chain correlation and convergence also need attention.

</details>

## Teach-back

Contrast global importance proposals with local MCMC proposals, and explain why a local random walk alone is not a correct posterior sampler.

Source: Lecture 8, slides 26. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
