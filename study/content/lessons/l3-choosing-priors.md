# Choosing a prior and understanding conjugacy

## A prior is a modelling choice

Before updating an unknown Gaussian mean, we must describe our initial uncertainty about it. Slide 9 lists several considerations:

1. **Prior knowledge:** if a quantity must be positive, assign no probability to impossible negative values.
2. **Structural preference:** for a many-parameter model, we might prefer sparse explanations with few important coefficients.
3. **Indifference:** avoid favouring particular values when justified.
4. **Convenience:** choose a form that makes inference analytically or computationally manageable.

These considerations can conflict. A convenient Gaussian prior assigns some probability to every real mean, so it does not enforce a strict positivity constraint. Convenience alone is not evidence that a model is appropriate.

### Supporting caution: “uniform” is not automatically neutral

A uniform density on a finite interval is proper, but choosing the interval matters. A constant density over the whole real line cannot integrate to one, so it is an **improper prior**. Some posterior calculations can still work with it, but ordinary evidence calculations need a properly normalised prior. Indifference can also change under reparameterisation. These are cautions behind the slide’s brief non-informative-prior label, not extra methods required here.

## Conjugacy

A prior family is **conjugate to a likelihood for a particular unknown parameter** when updating produces a posterior in the same family.

For Gaussian observations with known variance and unknown mean, a Gaussian prior over the mean is conjugate. This does not mean every Gaussian inference problem has exactly the same prior; inferring variance is a different problem. The slide also cautions that a useful conjugate family may not exist.

Conjugacy means “same distribution family,” not “same numerical parameters” or “the data make no difference.”

## The Gaussian prior on the mean

Choose:

$$
p_0(\mu\mid\mu_0,\sigma_0^2)
=\mathcal N(\mu\mid\mu_0,\sigma_0^2)
=(2\pi\sigma_0^2)^{-1/2}
\exp\left[-\frac{(\mu-\mu_0)^2}{2\sigma_0^2}\right].
$$

- $\mu$ is the unknown observation-model mean.
- $\mu_0$ is the centre of our prior uncertainty about $\mu$.
- $\sigma_0^2$ is the prior variance of $\mu$.
- $\sigma^2$, without the zero subscript, is still the known **observation variance**.

$\mu_0$ and $\sigma_0^2$ are **hyperparameters**: parameters defining the prior over the observation-model parameter. Here we hold them fixed; the term does not itself mean they have been learned from data.

## Updating the prior

$$
p_N(\mu\mid\mathcal D)
\propto p(\mathcal D\mid\mu)\,p_0(\mu).
$$

We suppress the fixed known variances and hyperparameters in this shorter notation. Multiplying the two Gaussian-shaped factors gives a quadratic expression in $\mu$, which we can rearrange into another Gaussian. The next lesson derives its mean and variance rather than simply asserting conjugacy.

## Teach it back

Explain the difference between the mean $\mu$ of the data model and the prior mean $\mu_0$. Give one reason a convenient conjugate prior might still be a poor scientific choice.
