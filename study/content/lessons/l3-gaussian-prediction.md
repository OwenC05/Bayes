# Predicting a future Gaussian observation

## Prediction asks a different question

The posterior describes uncertainty about $\mu$. Prediction asks about a new **observation** $x_*$. Assume the new observation follows the same Gaussian model and is independent of past observations conditional on $\mu$:

$$
p(x_*\mid\mathcal D)
=\int p(x_*\mid\mu)\,p_N(\mu\mid\mathcal D)\,d\mu.
$$

The two distributions being combined are:

$$
x_*\mid\mu\sim\mathcal N(\mu,\sigma^2),
\qquad
\mu\mid\mathcal D\sim\mathcal N(\mu_N,\sigma_N^2).
$$

The first contains known observation noise. The second contains remaining uncertainty about the mean.

## A supporting derivation using independent Gaussian sums

Represent a future observation as:

$$
x_*=\mu+\varepsilon_*\,,
\qquad \varepsilon_*\sim\mathcal N(0,\sigma^2),
$$

where the fresh noise is independent of $\mu$ under this model. Conditional on the recorded data, $\mu$ is Gaussian with mean $\mu_N$ and variance $\sigma_N^2$. A sum of independent Gaussians is Gaussian, with means and variances added:

$$
p(x_*\mid\mathcal D)
=\mathcal N(x_*\mid\mu_N,\sigma^2+\sigma_N^2).
$$

The same result follows by completing the square inside the predictive integral. Its variance also follows from total variance:

$$
\operatorname{Var}(x_*\mid\mathcal D)
=\underbrace{E[\operatorname{Var}(x_*\mid\mu,\mathcal D)\mid\mathcal D]}_{\sigma^2}
+\underbrace{\operatorname{Var}(E[x_*\mid\mu,\mathcal D]\mid\mathcal D)}_{\sigma_N^2}.
$$

## Worked example from the plot

Use the slide’s rounded posterior $\mu\mid\mathcal D\sim\mathcal N(2.04,0.04)$ and observation variance 2:

$$
x_*\mid\mathcal D\sim\mathcal N(2.04,2.04).
$$

The matching numbers are a coincidence: the first 2.04 is a mean; the second is a variance. The predictive standard deviation is approximately 1.428, much greater than the posterior mean’s standard deviation of 0.2.

A plug-in predictor using $\mu_N$ would instead give variance 2. It ignores the extra 0.04 of parameter uncertainty. As $N$ grows, $\sigma_N^2$ approaches zero, but the predictive variance approaches **$\sigma^2$, not zero**.

## Evidence versus prediction

As supporting context, integrating an observation against the *prior* produces a prior predictive density. For one observation:

$$
p(x)=\int p(x\mid\mu)p_0(\mu)\,d\mu
=\mathcal N(x\mid\mu_0,\sigma^2+\sigma_0^2).
$$

This is also the evidence for that one observed value. For a whole dataset, the unknown shared mean creates prior-predictive dependence: do not simply multiply these one-point marginal densities. You can instead factor the evidence sequentially into predictive densities conditioned on previous observations.

## Teach it back

State what each variance in the predictive formula means. Explain why observations remain random even if we eventually know the mean extremely accurately.
