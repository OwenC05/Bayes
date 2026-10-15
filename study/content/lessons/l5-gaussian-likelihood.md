# Gaussian noise turns least squares into maximum likelihood

## Make the noise assumption explicit

The lecture models observations as

$$y_n=\hat f(x_n;\mathbf w)+\epsilon_n,\qquad\epsilon_n\sim\mathcal N(0,\sigma^2).$$

Here $\epsilon_n$ is observation noise and $\sigma^2>0$ its variance. We assume independent Gaussian noise terms with the same variance. At a fixed input,

$$p(y_n\mid x_n,\mathbf w,\sigma^2)=\mathcal N\bigl(y_n;\hat f(x_n;\mathbf w),\sigma^2\bigr).$$

The lecture often suppresses the input variables in its notation. They are still being conditioned on. Let $X$ denote the collection of fixed inputs.

**Important precision:** the noise terms are i.i.d. Conditional on fixed inputs and weights, the targets are independent but generally **not identically distributed**, because their means vary with $x_n$. The product likelihood does not require equal means.

## Multiply the conditional densities

$$p(\mathbf y\mid X,\mathbf w,\sigma^2)=\prod_{n=1}^{N}\frac1{\sqrt{2\pi\sigma^2}}\exp\left[-\frac{(y_n-\hat f(x_n;\mathbf w))^2}{2\sigma^2}\right].$$

Combining prefactors and exponents gives

$$p(\mathbf y\mid X,\mathbf w,\sigma^2)=(2\pi\sigma^2)^{-N/2}\exp\left[-\frac{\lVert\mathbf y-\boldsymbol\Phi\mathbf w\rVert^2}{2\sigma^2}\right].$$

Viewed as a function of possible $\mathbf w$ with $\mathbf y$ fixed, this is the **likelihood**. It is not yet a posterior density over weights.

## Derive the negative log-likelihood

Because logarithm is increasing, maximising likelihood is equivalent to maximising log-likelihood, hence minimising its negative:

$$-\log p(\mathbf y\mid X,\mathbf w,\sigma^2)=\frac N2\log(2\pi\sigma^2)+\frac1{2\sigma^2}\lVert\mathbf y-\boldsymbol\Phi\mathbf w\rVert^2.$$

For fixed positive $\sigma^2$, the first term is constant in $\mathbf w$ and the multiplier of squared error is positive. Therefore both objectives have the same weight minimisers:

$$\hat{\mathbf w}_{ML}=\hat{\mathbf w}_{LS}.$$

This equality is a consequence of **this Gaussian, equal-variance noise model**, not a universal identity between maximum likelihood and least squares. The inverse formula still requires full column rank for a unique unregularised weight estimate.

## Supporting likelihood comparison

Suppose two candidate fits have sums of squared residuals 2 and 6, with $\sigma^2=1$. Their negative log-likelihoods differ by $(6-2)/2=2$. The first has likelihood $e^2$ times the second: its smaller squared error makes the observed targets more plausible under the model.

**Misconception:** a Gaussian likelihood does not assert the observed targets cluster around one common mean. They cluster around the model's input-dependent predictions.

## Teach-back

Derive the negative log-likelihood and explain why its weight estimate equals least squares. Are targets at different fixed inputs identically distributed?

Source: Lecture 5, slides 12, 13. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
