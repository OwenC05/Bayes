# Ridge regularisation and the role of lambda

## Add a cost for large weights

The slide's penalised least-squares objective is

$$E_{PLS}(\mathbf w)=E_{\mathcal D}(\mathbf w)+\lambda E_W(\mathbf w),\qquad E_W(\mathbf w)=\frac12\sum_{m=1}^{M}w_m^2=\frac12\mathbf w^{\mathsf T}\mathbf w.$$

Here $\lambda\geq0$ is a **hyperparameter** controlling the strength of the weight penalty. It is not one of the fitted basis weights.

The lecture motivates small weights as a preference for smoother, less extreme functions. This relationship depends on the chosen and scaled basis functions; a squared-weight penalty is not a basis-independent measurement of function smoothness.

## Derivation bridge

Differentiate and set the gradient to zero:

$$\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi\mathbf w-\boldsymbol\Phi^{\mathsf T}\mathbf y+\lambda\mathbf w=0.$$

Thus

$$\hat{\mathbf w}_{PLS}=(\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi+\lambda\mathbf I)^{-1}\boldsymbol\Phi^{\mathsf T}\mathbf y.$$

This is **ridge regression**. For $\lambda>0$ the matrix is positive definite even when the features are redundant:

$$\mathbf v^{\mathsf T}(\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi+\lambda\mathbf I)\mathbf v=\lVert\boldsymbol\Phi\mathbf v\rVert^2+\lambda\lVert\mathbf v\rVert^2>0$$

for every nonzero $\mathbf v$. That provides a unique solution. With $\lambda=0$, return to the least-squares rank conditions.

## What lambda changes

- Small $\lambda$: fitting the observed targets dominates; the curve can approach the interpolating solution.
- Moderate $\lambda$: accept some residual error to keep the weights smaller.
- Very large $\lambda$: penalised weights approach zero, potentially removing important signal.

In the exact objective shown, **all weights are penalised**. Some software leaves an intercept unpenalised, but that is a different convention.

![Illustrated effects of regularisation](assets/lecture-05/page-07.png)

The slide shows $\lambda=10$ producing an overly weak-amplitude curve, $\lambda=0.1$ a smoother fit close to the reference signal, and $\lambda=10^{-15}$ a much more tightly interpolating fit. These values are demonstration-specific, not general recommendations.

## Supporting scalar example

A constant model $y_n\approx w$ with targets 1 and 3 has

$$E_{PLS}(w)=\frac12[(1-w)^2+(3-w)^2]+\frac\lambda2w^2.$$

Differentiation gives $(2+\lambda)w=4$. Thus $\hat w=2$ when $\lambda=0$, $\hat w=1$ when $\lambda=2$, and $\hat w\to0$ as $\lambda\to\infty$. The penalty shrinks toward zero, not necessarily toward the correct answer.

**Misconception:** regularisation does not guarantee lower future error for every $\lambda$. Too much regularisation can underfit.

## Teach-back

Derive the ridge solution, explain both extremes of lambda, and say why smaller weights are a modelling preference rather than a universal smoothness theorem.

Source: Lecture 5, slides 8, 9. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
