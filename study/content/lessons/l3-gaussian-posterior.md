# Deriving the Gaussian posterior by completing the square

## Start with the parameter-dependent terms

Multiply the Gaussian likelihood by the Gaussian prior and discard only factors constant with respect to $\mu$:

$$
p_N(\mu\mid\mathcal D)\propto
\exp\left[-\frac12\left\{
\frac1{\sigma^2}\sum_n(x_n-\mu)^2
+\frac{(\mu-\mu_0)^2}{\sigma_0^2}
\right\}\right].
$$

Define observation precision $\beta=1/\sigma^2$ and prior precision $\beta_0=1/\sigma_0^2$. Expanding the squares, the expression inside braces becomes:

$$
A\mu^2-2B\mu+C,
\qquad
A=N\beta+\beta_0,
\qquad
B=\beta\sum_nx_n+\beta_0\mu_0.
$$

$C=\beta\sum_nx_n^2+\beta_0\mu_0^2$ contains no $\mu$.

## Complete the square

$$
A\mu^2-2B\mu+C
=A\left(\mu-\frac BA\right)^2+C-\frac{B^2}{A}.
$$

The last two terms affect normalisation, not the Gaussian centre or spread. Recognising the remaining Gaussian form gives:

$$
p_N(\mu\mid\mathcal D)=\mathcal N(\mu\mid\mu_N,\sigma_N^2),
\qquad
\sigma_N^2=\frac1{N\beta+\beta_0},
\qquad
\mu_N=\frac{N\beta\bar x+\beta_0\mu_0}{N\beta+\beta_0}.
$$

**Precisions add.** Independent observations each contribute precision $\beta$ about their shared mean; the prior contributes $\beta_0$.

## Why the mean is a weighted compromise

$$
\mu_N=
\frac{N\sigma_0^2}{N\sigma_0^2+\sigma^2}\bar x
+\frac{\sigma^2}{N\sigma_0^2+\sigma^2}\mu_0.
$$

The weights are non-negative and sum to one. More observations or less observation noise gives more weight to $\bar x$. A smaller prior variance gives more weight to $\mu_0$. It is the **precision of the sample mean**, $N/\sigma^2$, that competes with prior precision, not just one observation’s precision.

## Worked example

Let $\mu_0=0$, $\sigma_0^2=4$, $\sigma^2=1$, $N=4$, and $\bar x=2$:

$$
\beta_N=4+\frac14=4.25,
\qquad \sigma_N^2=\frac4{17},
\qquad \mu_N=\frac8{4.25}=\frac{32}{17}\approx1.882.
$$

The data have much greater precision than the prior, so the posterior mean is near 2, with a modest pull towards 0. The observation variance remains 1; $4/17$ is uncertainty about the mean.

## Limits and sequential learning

With no data the posterior equals the prior; use the precision formula without introducing an undefined sample mean. With fixed finite prior precision and increasing $N$, the posterior mean approaches the sample mean and its variance approaches zero. These conclusions assume the observation model remains appropriate.

As supporting intuition, updating with one observation at a time gives the same result as updating with all independent observations together: the previous posterior becomes the next prior, and precision contributions accumulate.

## Teach it back

Reconstruct the completing-the-square argument. Explain why variances do **not** add here, and why the vanishing posterior variance does not imply noiseless observations.
