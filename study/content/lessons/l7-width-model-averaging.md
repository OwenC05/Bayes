# Integrate width and compare basis families

## Prerequisite bridge

**Mixture weights:** Posterior probabilities, not unnormalised densities, weight predictive components.

**Model evidence:** A family evidence integrates over its unknown parameters under proper family-conditional priors.

## What the static source actually provides

Slide 19 is a demonstration agenda with three parts: repeat width estimation, add $r$ to the numerical integration loop, and consider choosing the basis-function type through $p(\mathbf y\mid\phi)$. The PDF does not provide the runnable demo, its numerical outputs, or the winning basis family. We can explain the method without claiming those unseen results.

## Add width to the posterior mixture

Let $\theta=(\alpha,v,r)$ with $v=\sigma^2$. Once a proper prior $p(\theta)$ is specified, the fully marginal predictive within the fixed basis family is

$$p(y_*\mid\mathbf y)=\iiint p(y_*\mid\mathbf y,\theta)\,p(\theta\mid\mathbf y)\,d\alpha\,dv\,dr.$$

Weights have already been integrated analytically inside each component. Before doing that analytic integral, the full expression integrates $\mathbf w$ as well. The source prints a triple-integral sign beside four differentials; interpret it as integration over all the listed unknowns, not as removing one of them.

For a grid, let $q_s$ denote prior cell masses in the chosen coordinates, and $L_s=p(\mathbf y\mid\theta_s)$. Then

$$\omega_s=\frac{q_sL_s}{\sum_jq_jL_j},\qquad p(y_*\mid\mathbf y)\approx\sum_s\omega_s p(y_*\mid\mathbf y,\theta_s).$$

This uses a new design matrix and new test basis vector at each $r_s$. It propagates uncertainty about width instead of collapsing to $\widehat r$. A wide width posterior can produce disagreement between component means; the total-variance formula from the previous lesson now includes that source of disagreement too. The lecture does not specify a numerical prior range for $r$ here, so do not invent one as source content.

The printed sum multiplies predictive and posterior densities. That is shorthand requiring measure-aware quadrature and normalisation. If $\theta_s$ are posterior draws, the approximation is simply $S^{-1}\sum_s p(y_*\mid\mathbf y,\theta_s)$, without an extra posterior-density factor.

## Comparing model families

Use $K$ as a discrete label for a basis family; this avoids confusing the family with an individual basis function $\phi_m$. Its evidence is

$$Z_K=p(\mathbf y\mid K)=\int p(\mathbf y\mid\theta_K,K)\,p(\theta_K\mid K)\,d\theta_K.$$

Each family can have different dimensions and appropriate priors. Model posterior probabilities are

$$p(K\mid\mathbf y)=\frac{Z_Kp(K)}{\sum_JZ_Jp(J)}.$$

Evidence alone ranks posterior model probabilities only when model priors are equal. Evidence-based comparison needs normalised proper parameter priors: an unspecified arbitrary multiplicative constant in an improper prior makes the Bayes factor undefined. Use the same observed dataset and comparable likelihood conventions; constants cannot be discarded merely because they did not affect parameter optimisation.

## Worked comparison: selection versus averaging

Suppose illustrative family evidences are $Z_A=0.2$ and $Z_B=0.1$. With equal model priors, posterior probabilities are $2/3$ and $1/3$. Selecting $A$ discards the remaining model uncertainty. Bayesian model averaging instead gives

$$p(y_*\mid\mathbf y)=\frac23p(y_*\mid\mathbf y,A)+\frac13p(y_*\mid\mathbf y,B).$$

With prior probabilities $p(A)=0.2$ and $p(B)=0.8$, posterior probabilities become $1/3$ and $2/3$; the evidence ratio has not changed, but the posterior winner has. These numbers are teaching examples, not demo results.

**Misconception:** “fully Bayesian” always refers to a specified collection of unknowns and priors. Averaging $\alpha,v,r$ within Gaussian RBF regression still conditions on that family; selecting a family is not the same as averaging families.

## Checkpoint

Two families have evidence ratio 2:1. Must their posterior odds be 2:1?

- A. Yes, regardless of model priors.
- B. Only if their prior model odds are 1:1.
- C. No: evidence is unrelated to posterior odds.

<details>
<summary>Answer and explanation</summary>

B. Posterior odds equal the evidence ratio times prior odds. Explicit model priors are part of the model-comparison calculation.

</details>

## Teach-back

Explain how to integrate r rather than optimise it, then derive posterior probabilities and model-averaged predictions for two basis families with explicit priors.

**Source boundary:** Lecture 7, slides 19. Original figures are source material; derivations, numerical examples, corrections and checkpoints here are supplemental teaching, not additional slide claims.
