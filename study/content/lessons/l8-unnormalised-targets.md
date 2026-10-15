# Targets known only up to a normalising constant

## Shape is not probability

The lecture writes

$$p(\boldsymbol\theta)=\frac{P^*(\boldsymbol\theta)}Z,\qquad Z=\int P^*(\boldsymbol\theta)\,d\boldsymbol\theta.$$

$P^*$ is a nonnegative unnormalised target, not generally a probability density. A proper target requires $0<Z<\infty$. Evaluating the numerator at a point may be easy even when integrating it over the full parameter space is difficult. Multiplying $P^*$ by a positive constant changes $Z$ by the same factor and leaves $p$ unchanged.

An unknown $Z$ prevents direct use of a normalised density formula, but does not prevent comparing relative densities:

$$\frac{p(\boldsymbol\theta_a)}{p(\boldsymbol\theta_b)}=\frac{P^*(\boldsymbol\theta_a)}{P^*(\boldsymbol\theta_b)}.$$

This cancellation is central to self-normalised importance sampling and to later MCMC methods. It does not mean that evidence is irrelevant: evidence is precisely a normalising integral when the numerator is likelihood times a proper prior.

## Bridge from the known Gaussian regression model

With hyperparameters fixed,

$$P^*(\mathbf w)=p(\mathbf y\mid\mathbf w,\sigma^2)p(\mathbf w\mid\alpha),\qquad Z=p(\mathbf y\mid\alpha,\sigma^2).$$

Earlier lectures completed the matrix square to obtain a Gaussian weight posterior. In that model both the normalised posterior and this evidence are analytically available.

Now make the hyperparameters uncertain. Assuming the independent hyperpriors used in the slide,

$$P^*(\alpha,\sigma^2)=p(\mathbf y\mid\alpha,\sigma^2)p(\alpha)p(\sigma^2),$$

$$Z=p(\mathbf y)=\int_0^\infty\int_0^\infty P^*(\alpha,\sigma^2)\,d\alpha\,d\sigma^2.$$

Although the inner integration over weights was analytic, the remaining integration over hyperparameters need not be. The source's “not computable” means no closed-form normalisation in its setting, not that no numerical approximation is possible or that every conceivable hyperprior is intractable.

## A worked unnormalised example

For $P^*(\theta)=e^{-\theta}$ on $\theta\ge0$, $Z=1$ and the mean is one. If we instead evaluate $\widetilde P^*(\theta)=7e^{-\theta}$, its integral is seven, but its normalised density and mean are unchanged. Numerator scale is irrelevant to a normalised expectation:

$$\mathbb E_p[f]=\frac{\int f(\theta)P^*(\theta)\,d\theta}{\int P^*(\theta)\,d\theta}.$$

This ratio foreshadows the weighted estimator. It also shows why finding a high point of $P^*$ is not enough: an expectation accounts for the mass of entire regions, not just maxima.

**Misconception:** dropping parameter-independent constants is safe for a posterior shape, but not automatically for an absolute evidence calculation. A proper prior and the correct normalising factors are necessary when comparing models by evidence.

## Checkpoint

If P-star is multiplied everywhere by seven, what happens? A. The normalised target changes. B. Z is multiplied by seven and the target is unchanged. C. The target mean is multiplied by seven.

<details>
<summary>Answer and reasoning</summary>

**B.** Numerator and normalising integral scale together. Their ratio stays the same.

</details>

## Teach-back

Identify P-star and Z for a weight posterior and for a hyperparameter posterior; explain what can still be evaluated when Z is unknown.

Source: Lecture 8, slides 10, 11. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
