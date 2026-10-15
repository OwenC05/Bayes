# Why the grid approach stops scaling

## Prerequisite bridge

**Cartesian product:** If each of d coordinates has K grid positions, the complete grid has K to the power d points.

**Approximation versus target:** A numerical method approximates a specified posterior integral; changing the method need not change the probabilistic model.

## Consolidate what is integrated at each stage

| Stage | What is retained | What remains conditional or selected |
| --- | --- | --- |
| Weight MAP / ridge | One weight vector | All uncertainty collapsed to a fitted vector |
| Gaussian weight posterior and conditional prediction | Weight uncertainty and observation noise | Fixed alpha, noise scale, width and family |
| Type-II scale selection | Exact conditional weight distribution | Point estimates of alpha and noise scale; fixed width/family |
| Grid over alpha and noise scale | Mixture across these scales, plus weight uncertainty | Plug-in width and fixed family |
| Grid also over width | Uncertainty across alpha, noise scale and width | Fixed family and specified priors |
| Bayesian model averaging | Mixture also across families | The available families, likelihood assumptions and priors |

These are distinct inferential claims. An attractive mean prediction cannot by itself tell us which row produced it. Nor does “integrated numerically” mean “exact”: grid coverage, resolution and arithmetic can all introduce error.

## Count the grid cost

A grid with $K$ points along each of $d$ hyperparameter axes has $K^d$ nodes. With $K=20$, two axes require 400 evaluations, three require 8,000, and six require 64,000,000. Every node may require constructing a covariance matrix and a linear-algebra solve. For a dense $N\times N$ evidence covariance, straightforward factorisation costs on the order of $N^3$ operations per node, before any opportunity for reuse. These are scaling calculations, not timings from the lecture.

Doubling resolution in every coordinate multiplies node count by $2^d$. Even apparently moderate improvements in coverage become costly. Analytically integrating weights was therefore important: it avoided gridding $M$ additional coordinates. The conditional integrals should be done analytically whenever feasible before spending numerical effort on remaining unknowns.

## Geometry adds a second difficulty

Slide 20 distinguishes computational explosion from the curse of dimensionality. A simple geometric teaching example shows their connection. Within a unit $d$-dimensional cube, a subcube with side length $1/2$ occupies fraction $2^{-d}$ of the volume. That is $1/8$ at $d=3$ but about $1/1024$ at $d=10$. A high-likelihood region occupying a small fraction of the prior support can be missed or poorly resolved by coarse coverage. Correlations can concentrate a posterior along a thin tilted ridge that does not align with grid axes.

This does not imply every high-dimensional posterior is impossible, or that a random sampler automatically fixes everything. Useful methods must exploit distribution structure and concentrate computation appropriately. The next lecture’s approximation methods address a need created here; they do not remove the requirement to check assumptions and numerical reliability.

## Read the success statement with the right boundary

The source says that, for this three-hyperparameter example, numerical sums were just about feasible and handled uncertainty without cross-validation. Interpret this as selecting/integrating hyperparameters through the probabilistic model instead of tuning on held-out error. It is not a guarantee of accurate predictions for every dataset, an argument to abandon posterior predictive checks, or evidence that model assumptions are true.

Evidence also does not remove prior sensitivity. The integration depends on specified, normalised priors and on what models were considered. Predictive evaluation on genuinely new data remains valuable even when cross-validation was not used as the fitting procedure.

## Final recall audit

Before explaining the method, ask:

1. What are the inputs, targets, weights, scales, width and family label?
2. Which variables are conditioned on, analytically integrated, numerically integrated or replaced by points?
3. Are prior densities paired with the correct measure and Jacobian?
4. Are predictive weights posterior probabilities summing to one?
5. Does variance include both conditional uncertainty and disagreement between components?
6. Are source figures, numerical teaching examples and unavailable demo outputs clearly distinguished?

If these answers are explicit, the method can be taught without hiding its approximations behind the phrase “fully Bayesian”.

## Checkpoint

With 20 grid points on each axis, how many nodes do six axes require?

- A. 120.
- B. 8,000.
- C. 64,000,000.

<details>
<summary>Answer and explanation</summary>

C. A full Cartesian grid has 20 to the power 6 nodes. This exponential growth explains why the low-dimensional demonstration does not scale directly.

</details>

## Teach-back

Describe the inference ladder from weight MAP to hyperparameter and model averaging, then explain the grid cost and what the lecture’s success claim does not guarantee.

**Source boundary:** Lecture 7, slides 20. Original figures are source material; derivations, numerical examples, corrections and checkpoints here are supplemental teaching, not additional slide claims.
