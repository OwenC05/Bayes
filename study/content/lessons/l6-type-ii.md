# Type-II inference: exact factorisation, point approximation

## Prerequisite bridge

Recall conditional probability factorisation and a Dirac delta: integrating a function against a point mass evaluates the function at that point.

## The factorisation is exact

By the product rule,

$$p(\mathbf w,\alpha,\sigma^2\mid\mathbf y)=p(\mathbf w\mid\mathbf y,\alpha,\sigma^2)p(\alpha,\sigma^2\mid\mathbf y).$$

The first factor is the Gaussian from Lecture 5. Type-II does not replace it by its mode. Instead it approximates the second factor by a point mass:

$$p(\alpha,\sigma^2\mid\mathbf y)\approx\delta(\alpha-\widehat\alpha)\delta(\sigma^2-\widehat\sigma^2).$$

Thus prediction still averages weights, but no longer averages possible regularisation/noise settings. Slide 10 calls this a very coarse approximation. It can be useful, especially with concentrated hyperparameter uncertainty, but uncertainty about selected settings is not retained.

## What objective chooses the point?

Bayes gives

$$p(\alpha,\sigma^2\mid\mathbf y)\propto p(\mathbf y\mid\alpha,\sigma^2)p(\alpha)p(\sigma^2).$$

With constant prior density in the coordinates being optimised, the mode maximises evidence. The source uses flat priors over $\log\alpha$ and $\log\sigma$, then speaks of maximising evidence. This needs an explicit coordinate qualification.

## Supporting Jacobian calculation

Write $v=\sigma^2$, $u=\log\alpha$, $z=\log\sigma=\tfrac12\log v$. A flat density in $(u,z)$ induces

$$p(\alpha,v)\propto\frac1{\alpha v},$$

with an irrelevant constant factor of one half. Consequently the posterior density in $(\alpha,v)$ is proportional to $p(\mathbf y\mid\alpha,v)/(\alpha v)$, not merely evidence. Transforming back to log coordinates supplies the Jacobian $2\alpha v$, leaving density proportional to evidence there.

So evidence maximisation can be described as a log-coordinate posterior mode under flat log-priors, but is not generally the positive-scale posterior mode as written on slide 11. Maximising a density is not invariant under reparameterisation; probabilities of corresponding regions are invariant.

**Important limitation:** A flat log-prior over the entire real line is improper. It can express a formal optimisation convention, but fully marginalised evidence requires appropriate normalisation/proper bounds or a justified proper prior. “Uninformative” is not a guarantee of harmlessness or coordinate independence.

**Recall:** The exact conditional Gaussian is preserved, yet the full method remains approximate because the hyperparameter posterior was collapsed.

## Checkpoint

Under flat log-priors, evidence maximisation is most directly a mode calculation in which coordinates? A. Log coordinates. B. Every coordinate system. C. Weight coordinates only.

<details>
<summary>Answer and explanation</summary>

A. Posterior densities acquire Jacobians under transformation. A flat log-prior is not a flat prior over alpha and variance, so B is false.

</details>

## Teach-back

Identify the exact and approximate steps in Type-II inference. Explain why flat log-priors require a parameterisation caveat when discussing a posterior mode.

Source: Lecture 6, slides 10, 11. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
