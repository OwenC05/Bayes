# A Gaussian prior over the weights

## Which quantity is uncertain now?

The unknown quantity is the entire vector $\mathbf w$. A prior describes which weight vectors we consider plausible before observing the targets.

The lecture chooses independent zero-mean Gaussian weights with a common precision $\alpha>0$:

$$p(\mathbf w\mid\alpha)=\prod_{m=1}^{M}\left(\frac\alpha{2\pi}\right)^{1/2}\exp\left(-\frac\alpha2w_m^2\right).$$

Equivalently,

$$p(\mathbf w\mid\alpha)=\mathcal N(\mathbf w;\mathbf0,\alpha^{-1}\mathbf I).$$

- Each $w_m$ has mean zero and variance $1/\alpha$.
- The prior covariance matrix is diagonal, expressing prior independence.
- $\alpha$ controls uncertainty about the parameters, so it is a **hyperparameter**.

A large $\alpha$ strongly concentrates weights near zero; a small positive $\alpha$ allows larger weights. The lecture holds $\alpha$ fixed during its learning demonstration.

## The connection to complexity control

Combining the product of exponentials yields

$$p(\mathbf w\mid\alpha)=\left(\frac\alpha{2\pi}\right)^{M/2}\exp\left(-\frac\alpha2\mathbf w^{\mathsf T}\mathbf w\right).$$

The density decreases as the squared weight norm increases. The quadratic penalty from ridge will therefore emerge naturally when we take a negative logarithm.

Zero prior mean does **not** mean every weight must equal zero, and it does not mean the function must be flat. Sampling nonzero weight vectors from this prior produces a variety of curves. The prior expresses a preference, not an absolute restriction.

## Supporting intuition in function space

The same weight contributes to predictions at multiple inputs. Thus independent prior weights do not imply independent function values at those inputs. For example, a constant-only model $\hat f(x)=w$ has identical function values everywhere even though it has only one uncertain weight.

The features also matter: rescaling a basis function changes what a given weight size does to the curve. The prior is a preference over weights **in this chosen representation**.

**Misconception:** observation-noise variance $\sigma^2$ and prior weight variance $1/\alpha$ are not interchangeable. The first describes target variability around a function; the second describes uncertainty or preference over functions through their weights.

## Teach-back

What does alpha control, why is it a hyperparameter, and how can an independent weight prior produce correlated fitted function values?

Source: Lecture 5, slides 14. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
