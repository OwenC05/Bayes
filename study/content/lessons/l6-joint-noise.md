# Learn regularisation and observation noise together

## Prerequisite bridge

Distinguish sigma from sigma²; know why taking logarithms makes positive hyperparameters easier to display and why evidence includes a determinant.

## Remove another fixed assumption

Slide 21 recalls that the demonstration had assumed $\sigma=0.25$. That is a standard deviation; variance is $0.25^2=0.0625$. Type-II now chooses both noise and prior precision by maximising $p(\mathbf y\mid\alpha,\sigma^2)$.

This remains a point approximation over two unknowns, not full integration. The noise setting affects both the weight posterior and the distribution of future observations.

## Read the three displays carefully

Slide 22 shows raw marginal-likelihood density: most of its plane looks dark, with a small bright area and a colour multiplier $10^{19}$. Densities may exceed one; changing measurement units changes their numerical values. The plot is not saying the probability of the exact dataset exceeds one.

Slide 23 plots log marginal likelihood, revealing structure hidden by the raw scale. Logarithms preserve the maximising location. A ridge indicates combinations that give similar evidence and can warn that separate hyperparameters are weakly determined.

Slide 24 zooms around the peak and labels $\widehat\sigma_{MP}=0.212$ versus true $\sigma=0.250$. Squaring gives estimated variance about 0.0449 versus true variance 0.0625. The estimate need not equal the generator’s setting in a finite noisy sample.

## Connect regularisation to prior precision

Slides 22–24 all label the horizontal axis $\log\lambda$ and the vertical axis $\log\sigma^2$. As a supporting connection to the model’s prior precision,

$$\lambda=\sigma^2\alpha,\qquad\log\lambda=\log\alpha+\log\sigma^2.$$

When noise varies, converting the displayed regularisation coordinate to prior precision also depends on the noise coordinate. For fixed noise this becomes a constant shift between the two log coordinates.

## Why not minimise a training-fit criterion over everything?

Reducing a penalty coefficient reduces its contribution to the training objective without paying for increased flexibility. In an interpolating model, residuals can also collapse. Evidence instead includes both a fit term and covariance normalisation; it is not just a rescaled sum of squared residuals.

The source’s warning that joint tuning is “impossible” in the orthodox framework is too broad if read literally. It concerns naive tuning of the stated training criterion, not all non-Bayesian methods. Proper likelihood methods retain noise normalisation, and validation can tune settings. No new optimisation results are supplied by this lesson.

**Recall:** A selected $\widehat\sigma$ is still uncertain, even if the plot marks it with a single point.

## Checkpoint

The source reports sigma-hat = 0.212. Is that the estimated variance? A. Yes. B. No, the variance is about 0.0449.

<details>
<summary>Answer and explanation</summary>

B. Sigma is standard deviation; its square is variance. The plot’s vertical log-variance axis does not change the meaning of the point annotation.

</details>

## Teach-back

Explain the raw and log evidence heat maps and the zoomed noise estimate. How does lambda relate to prior precision and noise variance, and why is naive training-error tuning inadequate?

Source: Lecture 6, slides 21, 22, 23, 24. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
