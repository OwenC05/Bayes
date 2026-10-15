# The Gamma function and Gamma distribution

You already understand densities and integration. We now meet a distribution for **positive-valued quantities**, such as an idealised waiting time. It is a possible model, not an automatic choice for every positive measurement.

## First bridge: factorials and the Gamma function

For a positive integer $n$, the factorial $n!$ is the product of the integers from $1$ through $n$. For example, $4!=24$, and by convention $0!=1$.

The **Gamma function** extends this factorial relationship beyond integers. For a positive real argument $a$:

$$\Gamma(a)=\int_0^\infty t^{a-1}e^{-t}\,dt.$$

Here $t$ is just the integration variable; $a$ selects the function's input. For positive integers:

$$\Gamma(n)=(n-1)!.$$

Notice the shift: $\Gamma(4)=3!=6$, not $4!$. The integral also defines values such as $\Gamma(2.5)$.

**The Gamma function returns a number. It is not itself the Gamma probability distribution.**

## The distribution

Lecture 2 uses **shape** $a>0$ and **rate** $\lambda>0$:

$$p(x\mid a,\lambda)=\frac{\lambda^a}{\Gamma(a)}x^{a-1}e^{-\lambda x},\qquad x>0.$$

The density is zero for negative values. At exactly zero its behaviour depends on the shape; endpoint density values do not change interval probabilities.

- $x$: a possible observation, not a parameter.
- $a$: shape, controlling the form of the curve.
- $\lambda$: rate, controlling its horizontal scale at fixed shape.
- $\Gamma(a)$: Gamma-function value in the normalisation.
- $e^{-\lambda x}$: exponential decay for large $x$.
- $x^{a-1}$: the other factor governing the shape.

The substitution $t=\lambda x$ shows why the constant works:

$$\int_0^\infty x^{a-1}e^{-\lambda x}\,dx=\frac{\Gamma(a)}{\lambda^a}.$$

Multiplying by $\lambda^a/\Gamma(a)$ therefore makes the total area $1$.

## What the parameters do

Useful consequences of this density are:

$$\mathbb E[X]=\frac{a}{\lambda},\qquad \operatorname{Var}(X)=\frac{a}{\lambda^2}.$$

These are supporting facts for interpreting the model, not additional formulas printed on slide 23.

At fixed shape, doubling the rate halves the mean and quarters the variance. A larger rate compresses the distribution towards zero.

- $a=1$: an exponentially decreasing density.
- $a>1$: a peak at a positive value, with a right-hand tail.
- $0<a<1$: density increases without bound as $x$ approaches zero, while remaining integrable.

For example, a hypothetical waiting-time model with $a=2$ and $\lambda=0.5$ per minute has mean $4$ minutes and standard deviation $\sqrt{8}$ minutes. The mean is not a guarantee about one wait.

## Rate versus scale in the lecture code

The slide writes a **rate**, but its SciPy call supplies a **scale**:

$$\text{scale}=\frac1\lambda.$$

```python
gamma = scipy.stats.gamma(a=2.5, scale=1)
```

This means shape $2.5$ and rate $1$, not two unrelated parameters. To represent rate $2$, supply `scale=0.5`. The code's default location is zero.

Calling `.pdf(x)` evaluates **density**, not the probability of that exact continuous value. An interval probability still requires area under the curve.

## Explain it to a beginner

> A Gamma distribution spreads probability over positive measurements. Its shape controls the curve's form, and its rate controls the scale. The Gamma function is a separate mathematical function that supplies the normalising constant.

**Teach-back:** Explain the difference between the Gamma function and a Gamma distribution. If the rate doubles at fixed shape, what happens to the mean?

Source: Lecture 2, slide 23, original page 10; the plot continues on page 11. Conjugate inference is reserved for later teaching.
