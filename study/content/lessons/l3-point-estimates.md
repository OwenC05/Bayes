# Maximum likelihood and plug-in prediction

## The point-estimate workflow

Specify a likelihood $p(\mathcal D\mid\boldsymbol\theta,\mathcal M)$, then choose the parameter that maximises it:

$$
\widehat{\boldsymbol\theta}
=\operatorname*{argmax}_{\boldsymbol\theta}\log p(\mathcal D\mid\boldsymbol\theta,\mathcal M).
$$

The hat means **estimate**. An estimate may be one number or a vector containing several numbers. It is still a *point* estimate: one selected position in parameter space.

We often maximise the log because products become sums and tiny likelihood values are easier to handle. For positive likelihoods, log is increasing, so it does not change which parameter wins.

## Worked coin example

Suppose the recorded sequence contains three heads and two tails. For an independent Bernoulli model with common heads probability $\theta$:

$$
L(\theta)=\theta^3(1-\theta)^2.
$$

The maximum occurs at $\widehat\theta=3/5=0.6$. This says **0.6 fits this sequence best within this model**, not “the true probability is certainly 0.6.” The likelihood height at that point is a separate quantity.

If the next observation uses the same parameter and model, a plug-in prediction is:

$$
P(x_*=1\mid\widehat\theta)=0.6.
$$

The slide writes the data-dependent predictive distribution as the observation model evaluated at the fitted parameter. Interpret this as the **plug-in procedure**, not a general probability identity that eliminates the need to average over parameter uncertainty.

## What the point estimate leaves out

Three heads in five tosses and 300 heads in 500 tosses both give $\widehat\theta=0.6$. They should not give the same confidence in that estimate. Five observations leave much more ambiguity about the parameter than 500.

The plug-in distribution still includes **outcome randomness**: even a known coin bias does not determine the next result. What it omits is **uncertainty about the fitted parameter**. Bayesian prediction will account for both by averaging across plausible parameters.

The lecture calls this the “orthodox” approach. That is a comparison of workflows, not a claim that all non-Bayesian statistics ignore uncertainty; other methods can construct intervals or sampling-based uncertainty estimates.

## Common misconceptions

- **MLE is not a posterior.** It maximises likelihood, without multiplying by a prior.
- **Argmax is not max.** The former returns the parameter; the latter returns the largest function value.
- **A point estimate is not certainty.** Selecting one value does not prove alternatives impossible.
- **Bayesian inference is not just another point estimate.** A posterior can later be summarised by a point, but the full distribution contains additional information.

## Teach it back

Describe the plug-in procedure to a beginner. Identify which uncertainty remains in its predictions and which uncertainty it leaves out.
