# Monte Carlo averages and their actual error rate

## One general target

Write

$$F=\mathbb E_p[f(\boldsymbol\theta)]=\int f(\boldsymbol\theta)p(\boldsymbol\theta)\,d\boldsymbol\theta.$$

Here $p$ is a normalised density and $f$ is the quantity evaluated at each parameter draw. For predictive density at a fixed $y_*$, set $f(\boldsymbol\theta)=p(y_*\mid\boldsymbol\theta)$. For a posterior mean, use $f(\boldsymbol\theta)=\theta_j$. For an event probability, use its indicator. Each choice has its own existence and variance conditions.

Take IID draws $\boldsymbol\theta^{(1)},\ldots,\boldsymbol\theta^{(R)}\sim p$ and form

$$\widehat F_R=\frac1R\sum_{r=1}^R f(\boldsymbol\theta^{(r)}).$$

If $\mathbb E_p|f|<\infty$, the law of large numbers gives $\widehat F_R\to F$ almost surely. Integrability matters: not every sample average estimates a defined population mean. For an integrable $f$, the IID average is also unbiased.

## Derive, rather than memorise, the error rate

Assume in addition $\sigma_f^2=\operatorname{Var}_p(f)<\infty$. Then

$$\operatorname{Var}(\widehat F_R)=\frac1{R^2}\sum_{r=1}^R\operatorname{Var}(f(\boldsymbol\theta^{(r)}))=\frac{\sigma_f^2}{R}.$$

All cross-covariances vanish because the draws are independent. Since the estimator is unbiased, its mean squared error is this variance. Its standard error is

$$\operatorname{SE}(\widehat F_R)=\frac{\sigma_f}{\sqrt R}.$$

Thus four times as many samples halve standard error; doubling them does not halve it. With finite variance, the central limit theorem also motivates approximate large-sample uncertainty intervals. A finite empirical variance is not proof that the population variance exists.

## Worked precision calculation

If $\sigma_f=2$, then $R=100$ gives standard error $0.2$, while $R=400$ gives $0.1$. To target standard error $0.02$ requires $R=(2/0.02)^2=10{,}000$, ignoring sampling cost. These are tutor calculations, not outputs of the lecture demo.

## Read the source carefully

Slide 6 writes an error integral over a single $p(\boldsymbol\theta)$ even though $\widehat F_R$ depends on the whole random sample. The rigorous expectation is over the joint sampling distribution. Its key dimension claim concerns the exponent $1/R$: dimension is absent from that exponent, but may change $\sigma_f^2$, the function, and the cost or feasibility of obtaining IID draws.

Slide 7 identifies the practical bottleneck: the target may be known but lack a direct sampler, or may be known only up to normalisation. The missing problem-number references on page 5 are a PDF limitation, not another method. These difficulties motivate the rest of the lecture.

**Misconception:** good algebraic convergence rates do not rescue draws from the wrong distribution. Averaging uniform parameter draws does not automatically average under the posterior.

## Checkpoint

For IID finite-variance Monte Carlo, quadrupling R does what? A. Quarters standard error. B. Halves standard error. C. Leaves variance unchanged.

<details>
<summary>Answer and reasoning</summary>

**B.** Variance is quartered; standard error is its square root and is halved.

</details>

## Teach-back

Derive the Monte Carlo variance and distinguish its dimension-independent exponent from the difficulties of obtaining samples.

Source: Lecture 8, slides 4, 5, 6, 7. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
