# Reconnect HMC samples to Bayesian predictions

## Prerequisite bridge

**Unnormalised target:** The posterior can be evaluated up to a constant even when its evidence is unavailable.

**Posterior predictive:** Predictive density averages a conditional observation model over posterior parameter uncertainty.

## What is being approximated?

The data $\mathcal D$ stay fixed. Unknown parameters $\boldsymbol\theta$ vary under $p(\boldsymbol\theta\mid\mathcal D)\propto P^*(\boldsymbol\theta)$. We want expectations, not merely a parameter vector with high density. For example,

$$p(y_*\mid\mathcal D)=\int p(y_*\mid\boldsymbol\theta,\mathcal D)p(\boldsymbol\theta\mid\mathcal D)\,d\boldsymbol\theta.$$

HMC supplies a correlated sequence designed to explore that target. It augments position $\boldsymbol\theta\in\mathbb R^d$ with momentum $\boldsymbol\rho\in\mathbb R^d$. In the lecture's identity-mass convention,

$$U(\boldsymbol\theta)=-\log P^*(\boldsymbol\theta),\qquad H=U+\tfrac12\boldsymbol\rho^{\mathsf T}\boldsymbol\rho.$$

Because $\exp(-H)=P^*(\boldsymbol\theta)\exp(-\|\boldsymbol\rho\|^2/2)$, integrating momentum out leaves the desired position density up to a constant. Random momentum and approximate energy-conserving trajectories enable longer directed moves than a small random walk.

## Why the acceptance correction has this sign

Hamilton's equations are $\dot{\boldsymbol\theta}=\boldsymbol\rho$ and $\dot{\boldsymbol\rho}=\nabla\log P^*(\boldsymbol\theta)$. An appropriate reversible, volume-preserving numerical proposal, such as leapfrog with the usual momentum-reversal construction, is corrected using

$$a=\min\{1,\exp(H_{\rm old}-H_{\rm new})\}.$$

A numerical increase in energy lowers acceptance. For a tutor calculation, if $H_{\rm old}=2.0$ and $H_{\rm new}=2.4$, acceptance is $e^{-0.4}\approx0.6703$. If the proposal is rejected, retain the old position. This is not gradient ascent toward the posterior mode: fresh momentum and the joint target preserve distributional exploration.

The source's ball analogy is best understood on the **negative** log-target potential landscape. Unknown normalisation contributes an additive constant to energy and cancels from both gradients and energy differences.

## Return to the regression figure

Let $\boldsymbol\theta=(\alpha,v,r)$ with noise variance $v=\sigma^2$ and RBF width $r$. Weights have already been integrated analytically. For retained posterior draws $\boldsymbol\theta^{(s)}$, approximate

$$p(y_*\mid\mathbf y)\approx\frac1S\sum_{s=1}^S p(y_*\mid\mathbf y,\boldsymbol\theta^{(s)}).$$

Unlike prior-grid mixtures, these draws already represent posterior mass: do not multiply them by likelihood again. If conditional component means and variances are $m_s,V_s$, then the predictive mean is $\bar m=S^{-1}\sum_s m_s$, while variance includes both $S^{-1}\sum_sV_s$ and $S^{-1}\sum_s(m_s-\bar m)^2$.

![Source HMC regression predictor](assets/lecture-10/page-04.png)

Slide 6 displays a mean predictor, not a full uncertainty band or proof of accurate sampling. Slide 4 displays 100 green HMC sample positions against correlated-Gaussian contours, with one rejected sample annotated, and slide 5 announces a hand-coded demo; the implementation and extra distribution's results are not supplied. Slides 2–3 link readings, not extra assessed derivations here.

**Misconception:** the source's independence claim is not a guarantee. HMC draws remain a Markov chain; convergence, dependence and effective sample size need checking. No automatic thinning rule follows from the name HMC.

## Checkpoint

For posterior hyperparameter draws, how should conditional predictive densities be combined? A. Multiply each by the likelihood again. B. Average them equally, while accounting for correlation in Monte Carlo accuracy.

<details>
<summary>Answer and explanation</summary>

B. Posterior draws already carry the posterior weighting. Averaging their conditional predictive densities approximates the posterior integral; multiplying by another likelihood changes the target.

</details>

## Teach-back

Explain the HMC joint target and acceptance sign, then derive how its retained hyperparameter draws enter a regression prediction.

**Source boundary:** Lecture 10, slides 1, 2, 3, 4, 5, 6. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
