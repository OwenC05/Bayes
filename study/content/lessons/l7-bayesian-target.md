# The full predictive target and the analytic roadblock

## Prerequisite bridge

**Marginalisation:** Integrating a joint density over an unknown variable removes it while preserving its uncertainty in remaining variables.

**Conditional prediction:** Given weights and noise scale, a new target is Gaussian around the fitted function; the new input is fixed.

## A prediction is a distribution over a future observation

At a fixed new input $x_*$, we want $p(y_*\mid\mathbf y)$. The notation suppresses inputs and a fixed model specification. It is not the fitted value obtained by substituting one best weight vector. For fixed $\alpha$ and $v=\sigma^2$, the Gaussian posterior over weights can be derived exactly. But if these scales are unknown, the target is

$$p(y_*\mid\mathbf y)=\int\!\int\!\int p(y_*\mid\mathbf w,\alpha,v)\,p(\mathbf w,\alpha,v\mid\mathbf y)\,d\mathbf w\,d\alpha\,dv.$$

The likelihood for $y_*$ does not directly depend on $\alpha$ once $\mathbf w$ is given, but retaining $\alpha$ in the conditioning matches the source and is harmless. For this stage the basis width and basis family remain fixed. “All unknowns” means all unknowns **in the specified model**, not every conceivable modelling choice.

## Factor first, integrate the part we know

The product rule yields

$$p(\mathbf w,\alpha,v\mid\mathbf y)=p(\mathbf w\mid\mathbf y,\alpha,v)\,p(\alpha,v\mid\mathbf y).$$

The first factor is Gaussian. Therefore define the conditional predictive by integrating weights:

$$p(y_*\mid\mathbf y,\alpha,v)=\int p(y_*\mid\mathbf w,v)\,p(\mathbf w\mid\mathbf y,\alpha,v)\,d\mathbf w.$$

Then the remaining task is

$$p(y_*\mid\mathbf y)=\iint p(y_*\mid\mathbf y,\alpha,v)\,p(\alpha,v\mid\mathbf y)\,d\alpha\,dv.$$

This is a mixture of conditional predictives, not generally a single Gaussian. Even though each component has a Gaussian form, its mean and variance change with $\alpha,v$. A closed-form inner integral does not imply a closed-form outer integral.

## What “intractable” means here

Slide 6 says the joint posterior and full predictive cannot be computed analytically for the lecture’s setup. We can still evaluate the joint posterior up to normalisation, and we can approximate its integrals numerically. “Not analytic” does not mean nonexistent, impossible to evaluate anywhere, or necessarily impossible to approximate accurately. Other chosen priors or model structures might permit different analytic results; this is not a universal ban on analytic Bayesian regression.

The lecture proposes doing the weight integration exactly, then using Type-II maximum likelihood for scales. Later it replaces some of these point approximations with a grid. This reduces numerical dimension from $M+2$ unknown components to two scales while preserving weight uncertainty exactly conditional on those scales.

## Worked two-component bridge

Suppose, only for illustration, posterior uncertainty over the scales leaves two possible conditional predictives: $\mathcal N(0,1)$ and $\mathcal N(2,1)$, each with probability $1/2$. The mixture mean is 1. Its variance is

$$\frac12(1+0^2)+\frac12(1+2^2)-1^2=2.$$

Substituting either scale setting would give variance 1 and miss the disagreement between component means. Averaging only the component variances also gives 1 and misses the same uncertainty. This is why full marginalisation changes more than the central fitted curve.

**Misconception:** integrating out weights does not mean pretending they are known. It means carrying their distribution through the calculation so the final predictive no longer needs to list them explicitly.

## Checkpoint

After integrating the weights exactly, which uncertainty remains in the full target at fixed basis width?

- A. Only new-observation noise.
- B. Uncertainty over alpha and noise variance, through a mixture of conditional predictives.
- C. None: analytic weight integration solves everything.

<details>
<summary>Answer and explanation</summary>

B. Each conditional predictive already contains weight uncertainty and observation noise, but the remaining hyperparameter posterior still has to be integrated or approximated.

</details>

## Teach-back

Write the full predictive integral and explain why an analytically Gaussian weight posterior does not make all hyperparameter integrals analytic.

**Source boundary:** Lecture 7, slides 4, 5, 6. Original figures are source material; derivations, numerical examples, corrections and checkpoints here are supplemental teaching, not additional slide claims.
