# Reading the Gaussian mean update plot

## What the axes mean

Slide 12 plots candidate **mean parameters** $\mu$ horizontally and posterior **density** $p(\mu\mid\mathcal D)$ vertically. It is not a histogram of observations and not a curve showing the probability of each exact continuous mean.

![Gaussian mean prior and successive posteriors from slide 12](assets/lecture-03/page-08.png)

The source figure states:

- Generative observation model: $\mathcal N(2.0,2.0)$.
- Prior over its mean: $\mathcal N(0,3)$.
- Posterior after 50 observations: approximately $\mathcal N(2.04,0.04)$.

Here the second Gaussian argument is **variance**, consistently with the surrounding derivation. The red vertical line marks the generating mean 2. The learner does not get to condition on that true mean; it is visible to us because this is an illustrative generated dataset.

## Walk through the curves

**Prior:** centred at 0 and broad. This expresses considerable uncertainty before seeing the dataset, rather than asserting that the true mean must be zero.

**After one observation:** a first likelihood factor shifts the centre and adds precision. A single noisy observation is not enough to pin down the mean.

**After five and ten observations:** the posterior becomes narrower and the centre changes as the accumulating sample mean changes. Successive centres do not have to move monotonically towards the true value; realised data fluctuate.

**After fifty observations:** the posterior is narrow, centred near 2.04 rather than exactly at 2. The data strongly outweigh this relatively broad prior.

## Check the width numerically

With $\sigma^2=2$ and $\sigma_0^2=3$:

$$
\sigma_{50}^2=\frac1{50/2+1/3}
=\frac3{76}\approx0.03947.
$$

That agrees with the figure’s rounded variance of 0.04. The posterior standard deviation is roughly $\sqrt{0.04}=0.2$, while an individual observation’s standard deviation is $\sqrt2\approx1.414$. These describe different uncertainties.

The height slightly above 2 is not an invalid probability. A Gaussian with variance 0.04 has peak density:

$$
\frac1{\sqrt{2\pi(0.04)}}\approx1.995.
$$

Density has units reciprocal to the horizontal-axis units. Only interval areas must obey probability bounds.

## What you cannot infer from this picture

The 50-observation curve is not guaranteed to contain the true mean at its centre, and a narrow posterior is not a universal guarantee of accuracy. Model assumptions and prior choices still matter. The source supplies rounded plot summaries, not the individual Gaussian observations, so we can verify the variance calculation but cannot independently reconstruct every intermediate centre from this page alone.

## Teach it back

Explain what each axis represents, why density height increases, and why the final mean is 2.04 rather than exactly 2. Distinguish the narrow parameter posterior from the much wider distribution of observations.
