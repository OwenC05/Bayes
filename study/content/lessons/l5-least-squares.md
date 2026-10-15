# Least squares: from residuals to the normal equations

## Start with the residual

The residual for observation $n$ is the observed target minus its fitted prediction:

$$e_n=y_n-\sum_{m=1}^{M}w_m\phi_m(x_n).$$

Least squares chooses weights minimising

$$E_{\mathcal D}(\mathbf w)=\frac12\sum_{n=1}^{N}e_n^2.$$

Squaring prevents positive and negative errors cancelling and gives large residuals a larger penalty. The factor $1/2$ simplifies derivatives without changing the minimiser.

## The design matrix is a feature table

Define $\Phi_{nm}=\phi_m(x_n)$: row $n$ belongs to observation $n$, column $m$ belongs to feature $m$.

| Quantity | Shape | Meaning |
|---|---|---|
| $\mathbf y$ | $N\times1$ | Observed targets |
| $\boldsymbol\Phi$ | $N\times M$ | Evaluated features |
| $\mathbf w$ | $M\times1$ | Adjustable weights |
| $\boldsymbol\Phi\mathbf w$ | $N\times1$ | All fitted predictions |
| $\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi$ | $M\times M$ | Feature cross-products |

Thus

$$E_{\mathcal D}(\mathbf w)=\frac12\lVert\mathbf y-\boldsymbol\Phi\mathbf w\rVert^2.$$

## Derivation bridge: differentiate the quadratic

The norm satisfies $\lVert\mathbf e\rVert^2=\mathbf e^{\mathsf T}\mathbf e$. Expand:

$$E_{\mathcal D}(\mathbf w)=\frac12\mathbf y^{\mathsf T}\mathbf y-\mathbf w^{\mathsf T}\boldsymbol\Phi^{\mathsf T}\mathbf y+\frac12\mathbf w^{\mathsf T}\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi\mathbf w.$$

For symmetric $A$, the gradient of $\tfrac12\mathbf w^{\mathsf T}A\mathbf w$ is $A\mathbf w$. The gradient of $\mathbf w^{\mathsf T}\mathbf b$ is $\mathbf b$; a term independent of $\mathbf w$ contributes zero. Therefore

$$\nabla_{\mathbf w}E_{\mathcal D}=\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi\mathbf w-\boldsymbol\Phi^{\mathsf T}\mathbf y.$$

Set this to zero to obtain the **normal equations**:

$$\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi\hat{\mathbf w}_{LS}=\boldsymbol\Phi^{\mathsf T}\mathbf y.$$

If $\boldsymbol\Phi$ has full column rank, then

$$\hat{\mathbf w}_{LS}=(\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi)^{-1}\boldsymbol\Phi^{\mathsf T}\mathbf y.$$

Why that condition? For any vector $\mathbf v$, $\mathbf v^{\mathsf T}\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi\mathbf v=\lVert\boldsymbol\Phi\mathbf v\rVert^2$. It is strictly positive for nonzero $\mathbf v$ exactly when the columns are independent. The resulting Hessian is positive definite, giving a unique minimum. Without full column rank, the displayed inverse is invalid and the weights need not be unique. Least-squares minimisers still exist; alternative numerical methods are beyond this slide.

## Worked two-weight example

Fit $w_1+w_2x$ to $(0,1)$ and $(1,3)$:

$$\boldsymbol\Phi=\begin{pmatrix}1&0\\1&1\end{pmatrix},\quad\mathbf y=\begin{pmatrix}1\\3\end{pmatrix}.$$

$$\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi=\begin{pmatrix}2&1\\1&1\end{pmatrix},\quad\boldsymbol\Phi^{\mathsf T}\mathbf y=\begin{pmatrix}4\\3\end{pmatrix}.$$

The equations are $2w_1+w_2=4$ and $w_1+w_2=3$, so $\hat{\mathbf w}=(1,2)^{\mathsf T}$. Both points are fitted exactly. Whether that is a good prediction rule is a separate question.

## Teach-back

Derive the least-squares normal equations and explain exactly when the displayed inverse formula is valid.

Source: Lecture 5, slides 6. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
