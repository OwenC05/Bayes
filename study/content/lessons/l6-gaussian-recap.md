# Rebuild the Gaussian linear-regression model

## Prerequisite bridge

Recall a design matrix: row n is the feature vector at input x_n. Distinguish covariance from precision and observation noise from weight uncertainty.

## Fix the ingredients

There are $N$ observations and $M$ weights. With inputs and basis functions fixed,

$$\mathbf y=\boldsymbol\Phi\mathbf w+\boldsymbol\epsilon,\quad \boldsymbol\epsilon\sim\mathcal N(\mathbf0,\sigma^2\mathbf I_N),\quad \mathbf w\sim\mathcal N(\mathbf0,\alpha^{-1}\mathbf I_M).$$

Here $\boldsymbol\Phi$ is $N\times M$, $\mathbf y$ is $N\times1$, and $\mathbf w$ is $M\times1$. Independent noise does not imply independent targets after averaging over weights: a common uncertain function can correlate observations.

The likelihood is a density in the observed targets with weights fixed. The prior is a density in weights before observing those targets. Their product, normalised, gives the weight posterior.

## Supporting derivation: collect the quadratic terms

Ignoring terms constant in weights, the log posterior is

$$-\frac1{2\sigma^2}\|\mathbf y-\boldsymbol\Phi\mathbf w\|^2-\frac\alpha2\|\mathbf w\|^2.$$

Expand the square. The quadratic coefficient is

$$A=\sigma^{-2}\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi+\alpha\mathbf I_M,$$

and the linear coefficient is $\mathbf b=\sigma^{-2}\boldsymbol\Phi^{\mathsf T}\mathbf y$. Completing the square yields $\boldsymbol\Sigma=A^{-1}$ and $\boldsymbol\mu=A^{-1}\mathbf b$. Multiplying numerator and denominator by $\sigma^2$ recovers slide 4:

$$\boldsymbol\mu=(\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi+\sigma^2\alpha\mathbf I_M)^{-1}\boldsymbol\Phi^{\mathsf T}\mathbf y,$$

$$\boldsymbol\Sigma=\sigma^2(\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi+\sigma^2\alpha\mathbf I_M)^{-1}.$$

## Regularisation has a probabilistic interpretation

The MAP estimate minimises squared residuals plus $\lambda\|\mathbf w\|^2$ with $\lambda=\sigma^2\alpha$ under this convention. Large $\alpha$ means small prior weight variance, not more weight uncertainty. Positive $\alpha$ and $\sigma^2$ make the posterior precision positive definite even when features are redundant.

As a supporting one-weight calculation, with two constant-feature observations 1 and 3, $\alpha=1$ and $\sigma^2=1$, obtain $\mu=4/3$, $\Sigma=1/3$. Least squares would give 2. The prior pulls the mean toward zero while the posterior still allows other values.

**Misconception:** $\boldsymbol\Sigma$ is not an $N\times N$ covariance of training targets. It is an $M\times M$ covariance of uncertain weights. That distinction will matter in the evidence calculation.

## Checkpoint

If alpha doubles with noise fixed, what happens to prior weight variance? A. It doubles. B. It halves. C. It stays fixed.

<details>
<summary>Answer and explanation</summary>

B. The prior variance is alpha inverse. The posterior change also depends on the design matrix, so its variance does not generally halve.

</details>

## Teach-back

Define the shapes of Phi, mu, Sigma and the two identity matrices in the model. Why is alpha a precision, and what is lambda?

Source: Lecture 6, slides 4. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
