# Learning a Gaussian mean: likelihood and MLE

## The model and its assumptions

Each observation $x_n$ follows a Gaussian with unknown common mean $\mu$ and **fixed, known** variance $\sigma^2>0$:

$$
p(x_n\mid\mu,\sigma^2)
=(2\pi\sigma^2)^{-1/2}\exp\left[-\frac{(x_n-\mu)^2}{2\sigma^2}\right].
$$

$N$ is the number of observations, and $\mathcal D=\{x_1,\ldots,x_N\}$ is the recorded dataset. We assume observations are independent and identically distributed **conditional on the common parameters**. Learning an unknown variance would be a different inference problem.

## Multiply independent observation densities

$$
p(\mathcal D\mid\mu,\sigma^2)
=\prod_{n=1}^{N}p(x_n\mid\mu,\sigma^2)
=(2\pi\sigma^2)^{-N/2}
\exp\left[-\frac1{2\sigma^2}\sum_{n=1}^{N}(x_n-\mu)^2\right].
$$

The exponential terms combine because multiplying exponentials adds their exponents. The data stay fixed while we compare candidate means. As a function of $\mu$, this is the likelihood; it is not yet a normalised probability distribution over $\mu$.

## Derive the sample-mean MLE

Taking logarithms gives:

$$
\ell(\mu)=-\frac N2\log(2\pi\sigma^2)
-\frac1{2\sigma^2}\sum_n(x_n-\mu)^2.
$$

The first term is independent of $\mu$, so maximising the likelihood is equivalent to minimising the sum of squared distances from $\mu$.

A differentiation bridge: the derivative of $(x_n-\mu)^2$ with respect to $\mu$ is $2(\mu-x_n)$, by the chain rule. Therefore:

$$
\frac{d\ell}{d\mu}=\frac1{\sigma^2}\sum_n(x_n-\mu)=0
\quad\Longrightarrow\quad
\widehat\mu=\bar x=\frac1N\sum_nx_n.
$$

For $N>0$, $d^2\ell/d\mu^2=-N/\sigma^2<0$, confirming a maximum. With no data, there is no data-selected mean MLE.

## Worked example

For observations $1,2,3$, the MLE is $\widehat\mu=2$. Their squared deviations at $\mu=2$ sum to $1+0+1=2$; at $\mu=0$ they sum to $1+4+9=14$. The first candidate gives higher likelihood for any fixed positive observation variance.

Changing the known variance changes how sharply the likelihood distinguishes candidate means, but not which mean maximises it. More noisy observations contain less information per observation.

## A distinction to keep throughout the lecture

- $\sigma^2$: variation of individual observations around the population mean.
- Posterior variance of $\mu$: uncertainty about where that mean is.

A very well-estimated mean does not imply that future observations become noise-free.

## Teach it back

Explain why the sample mean minimises squared deviations, and why a likelihood curve over $\mu$ is not automatically a posterior density over $\mu$.
