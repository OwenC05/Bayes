# Derive an exact benchmark before trusting a sampler

## Prerequisite bridge

**Bernoulli likelihood:** Conditional independence makes the sequence likelihood a product of success and failure probabilities.

**Beta density:** The Beta distribution has powers alpha minus one and beta minus one on the interval zero to one.

## Keep the unknown separate from the observed counts

The observed outcomes are $y_i\in\{0,1\}$. The unknown $\theta$ is their shared success probability, not one of those outcomes. Let $n_1=\sum_i y_i$ and $n_0=N-n_1$. Conditional iid sampling gives the probability mass of the observed sequence:

$$p(\mathbf y\mid\theta)=\prod_i\theta^{y_i}(1-\theta)^{1-y_i}=\theta^{n_1}(1-\theta)^{n_0}.$$

The source calls a Bernoulli expression a p.d.f.; it is a discrete probability **mass** function. The prior over the continuous $\theta$ really is a density.

If the observation were only the total success count, a Binomial likelihood would include $\binom N{n_1}$. That coefficient is constant in $\theta$, so it cancels from the posterior update. It matters for the probability of the count event and for absolute marginal likelihoods: the event is not identical to one particular sequence.

## Match exponents to derive conjugacy

Write the prior using the Beta normaliser $B(\alpha,\beta)$:

$$p(\theta)=\frac{\theta^{\alpha-1}(1-\theta)^{\beta-1}}{B(\alpha,\beta)},\qquad B(\alpha,\beta)=\frac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}.$$

Multiplication by the likelihood yields powers $\alpha+n_1-1$ and $\beta+n_0-1$. Normalising that same functional form gives

$$\theta\mid\mathbf y\sim\operatorname{Beta}(\alpha+n_1,\beta+n_0).$$

This is why the family is conjugate. No maximisation and no numerical sampling were needed. The sequence evidence is $B(\alpha+n_1,\beta+n_0)/B(\alpha,\beta)$, which confirms what constant normalises the posterior.

Calling shapes “pseudo-counts” is useful for the update, but do not erase the minus ones in the density. A uniform Beta(1,1) prior has constant density, not one literal observed success and one literal observed failure.

## Exact comparison for the source example

Slide 16 later prints $N=25$ and empirical success proportion $0.600$, hence $n_1=15$, $n_0=10$. Its prior is Beta(1,1). Therefore

$$\theta\mid\mathbf y\sim\operatorname{Beta}(16,11),\qquad\mathbb E[\theta\mid\mathbf y]=\frac{16}{27}\approx0.592593.$$

The exact variance and standard deviation are

$$\operatorname{Var}(\theta\mid\mathbf y)=\frac{16\cdot11}{27^2\cdot28}\approx0.0086224,\qquad\operatorname{SD}\approx0.09286.$$

These are tutor calculations from the printed count, not a rerun of the sampler. They explain why the printed approximate mean 0.59 and standard deviation 0.09 are plausible. The generating probability 0.7 need not equal either the realised proportion 0.6 or posterior mean 0.5926.

For one future Bernoulli trial, $P(y_*=1\mid\mathbf y)=\mathbb E[\theta\mid\mathbf y]$. This equality is specific to a single linear-in-$\theta$ probability. For two future successes use $\mathbb E[\theta^2\mid\mathbf y]$, not generally the square of the posterior mean. Parameter uncertainty remains consequential.

## Checkpoint

With Beta(1,1), 15 successes and 10 failures, what is the posterior? A. Beta(15,10). B. Beta(16,11). C. A point mass at 0.7.

<details>
<summary>Answer and explanation</summary>

B. Add successes to the first Beta shape and failures to the second. The posterior mean is 16/27, not the MLE 15/25 and not the data-generating setting 0.7.

</details>

## Teach-back

Derive the Beta–Bernoulli posterior, distinguish sequence and count likelihoods, and calculate the exact benchmark for the printed dataset.

**Source boundary:** Lecture 10, slides 11. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
