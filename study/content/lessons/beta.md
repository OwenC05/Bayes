# The Beta distribution

A Bernoulli model describes a binary observation. A Beta distribution can describe **our uncertainty about its success probability**.

## Do not confuse the two variables

- A Bernoulli observation $x$ is either $0$ or $1$.
- Its parameter $\theta$ can lie anywhere between $0$ and $1$.
- A density over $\theta$ describes how uncertainty is distributed across those possible parameter values.

Assigning a distribution to $\theta$ represents uncertainty about it; it does not mean the physical coin changes on every toss.

## The density

For positive shape parameters $a,b$:

$$p(\theta\mid a,b)=\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}\theta^{a-1}(1-\theta)^{b-1},\qquad 0<\theta<1.$$

- $\theta$: the probability parameter whose uncertainty we describe.
- $a,b$: parameters controlling the Beta density's shape; when used as a prior, these are **hyperparameters** of the Bernoulli model.
- $\Gamma$: the Gamma function from the previous lesson.
- The Gamma-function ratio normalises the density to total area $1$.

Endpoint behaviour can be finite or divergent depending on $a,b$. This does not put probability mass on an exact endpoint.

## Shape and centre

| Parameters | Shape |
|---|---|
| $a=b=1$ | Uniform density on the interval |
| $a=b>1$ | Symmetric, peaked around $0.5$ |
| $a>b$, both greater than 1 | Peak towards larger probabilities |
| $b>a$, both greater than 1 | Peak towards smaller probabilities |
| $0<a<1$ and $0<b<1$ | U-shaped, favouring regions near the endpoints |

Its mean and variance are:

$$\mathbb E[\theta]=\frac a{a+b},\qquad\operatorname{Var}(\theta)=\frac{ab}{(a+b)^2(a+b+1)}.$$

These connect to Lecture 3's fuller treatment. At a fixed mean, increasing $a+b$ reduces uncertainty.

For example, $\operatorname{Beta}(3,6)$ and $\operatorname{Beta}(30,60)$ both have mean $1/3$, but the second is much more concentrated. **Location and strength of belief are different properties.**

## Density is still not point probability

$$p(\theta=0.4\mid a,b)$$

is shorthand for evaluating a density at $0.4$, not a probability mass there. More unambiguously, we can call this the density value $p(0.4\mid a,b)$.

The probability that $\theta$ lies between $0.3$ and $0.5$ is:

$$P(0.3\leq\theta\leq0.5)=\int_{0.3}^{0.5}p(\theta\mid a,b)\,d\theta.$$

## A preview—not yet the full derivation

A Beta prior combined with Bernoulli observations produces a **Beta posterior**. This same-family property is called conjugacy. Lecture 3 will derive the update, explain success/failure counts and discuss prior strength carefully.

The lecture code:

```python
beta = scipy.stats.beta(a=3, b=6)
```

uses the default interval $[0,1]$. Its `.pdf` method evaluates the density over possible $\theta$ values, not a Bernoulli outcome probability.

## Explain it to a beginner

> Bernoulli describes whether a success occurs. Beta can describe uncertainty about how likely success is. One is a distribution over binary outcomes; the other is a continuous distribution over a probability parameter.

**Teach-back:** How can $\theta$ have a continuous Beta distribution while a Bernoulli observation remains only $0$ or $1$?

Source: Lecture 2, slides 25–26, original pages 11–12. Mean, variance and inference return in Lecture 3.
