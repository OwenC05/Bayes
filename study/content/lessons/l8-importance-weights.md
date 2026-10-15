# Deriving self-normalised importance sampling

## Change the distribution that supplies the samples

We want $F=\mathbb E_p[f]$, but can sample easily only from a proposal $Q$. Importance sampling evaluates $f$ at proposal draws and corrects their influence with density ratios. The raw draws remain distributed as $Q$; weighting them does not turn them into IID draws from $p$.

The lecture allows both densities to be specified up to constants:

$$p(\theta)=\frac{P^*(\theta)}Z,\qquad Q(\theta)=\frac{Q^*(\theta)}{Z_Q}.$$

Assume $Q$ is a proper, sampleable proposal and is positive wherever the target is positive, apart from negligible sets. For a general target expectation this support condition prevents missing an entire contributing region. Evaluating $Q^*$ alone would not be enough if we could not actually generate samples from its corresponding $Q$.

## Derive both parts of the ratio

Set $w(\theta)=P^*(\theta)/Q^*(\theta)$. Then

$$\mathbb E_Q[wf]=\int \frac{P^*}{Q^*}f\frac{Q^*}{Z_Q}\,d\theta=\frac1{Z_Q}\int fP^*\,d\theta,$$

$$\mathbb E_Q[w]=\frac1{Z_Q}\int P^*\,d\theta=\frac Z{Z_Q}.$$

Dividing gives $F$. With IID $\theta^{(r)}\sim Q$, replace each expectation by its sample average:

$$\widehat F_R=\frac{R^{-1}\sum_r w_rf(\theta^{(r)})}{R^{-1}\sum_r w_r}=\sum_r\bar w_rf(\theta^{(r)}),\qquad\bar w_r=\frac{w_r}{\sum_s w_s}.$$

This is **self-normalised importance sampling**. The factors $R$, $Z$ and $Z_Q$ are not required in the final expression. The denominator must be positive; a sample that receives only zero weights cannot provide an estimate.

## Worked weights

Suppose three proposal draws have weights $(1,2,7)$ and function values $(0,1,2)$. Normalised weights are $(0.1,0.2,0.7)$ and

$$\widehat F=0.1(0)+0.2(1)+0.7(2)=1.6.$$

Their unweighted average is one and generally estimates $\mathbb E_Q[f]$, not $\mathbb E_p[f]$. Multiplying all raw weights by 100 leaves the weighted estimate unchanged.

## What is guaranteed, and under which assumptions?

For $0<Z,Z_Q<\infty$, proper support coverage and $\mathbb E_p|f|<\infty$, the two sample averages converge by the law of large numbers, and their ratio converges to $F$. However, a ratio of random averages is **generally biased at finite R**. At $R=1$, the weight cancels completely and the estimator is simply $f(\theta^{(1)})$ under $Q$, which makes the issue obvious.

Contrast ordinary importance sampling with known normalised $p/Q$: its sample mean $R^{-1}\sum_r[p(\theta^{(r)})/Q(\theta^{(r)})]f(\theta^{(r)})$ is unbiased under integrability. Finite-variance and central-limit claims for self-normalised sampling require additional moments, commonly $\mathbb E_Q[w^2(f-F)^2]<\infty$. Support alone guarantees neither small variance nor fast practical convergence.

**Misconception:** unknown normalisation does not disappear because it is unimportant; it cancels through an explicit ratio argument.

## Checkpoint

Is the slide 17 ratio generally unbiased for a finite sample? A. Yes, because each average is unbiased. B. No, but it is consistent under the stated conditions. C. It never converges if Z is unknown.

<details>
<summary>Answer and reasoning</summary>

**B.** Expectations do not pass through a random ratio. The law of large numbers can still make the ratio consistent.

</details>

## Teach-back

Derive the ratio estimator from expectations under Q, explain why constants cancel, and distinguish consistency from finite-sample unbiasedness.

Source: Lecture 8, slides 16, 17. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
