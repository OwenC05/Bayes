# Derive the Type-II predictive mean and variance

## Prerequisite bridge

Know the Gaussian weight posterior and the law of total variance. Treat the new observation noise as independent of training noise and weights.

## Exact weights, selected hyperparameters

Slide 25 contrasts the full predictive integral over weights and hyperparameters with the Type-II integral over weights alone. Set $\alpha=\widehat\alpha$ and $\sigma^2=\widehat\sigma^2$ and calculate the corresponding $\boldsymbol\mu,\boldsymbol\Sigma$. Define the test feature column vector $\boldsymbol\phi_*=\boldsymbol\phi(x_*)$.

The new observation is

$$y_*=\boldsymbol\phi_*^{\mathsf T}\mathbf w+\epsilon_*,\qquad\epsilon_*\sim\mathcal N(0,\widehat\sigma^2).$$

A linear Gaussian transformation plus independent Gaussian noise gives

$$p(y_*\mid\mathbf y,\widehat\alpha,\widehat\sigma^2)=\mathcal N\left(y_*;\boldsymbol\phi_*^{\mathsf T}\boldsymbol\mu,\widehat\sigma^2+\boldsymbol\phi_*^{\mathsf T}\boldsymbol\Sigma\boldsymbol\phi_*\right).$$

## Supporting derivation by total expectation and variance

Conditioned on weights, the mean is $\boldsymbol\phi_*^{\mathsf T}\mathbf w$ and variance is $\widehat\sigma^2$. Average the mean over the weight posterior:

$$E[y_*\mid\mathbf y]=\boldsymbol\phi_*^{\mathsf T}\boldsymbol\mu.$$

Now apply total variance:

$$\operatorname{Var}(y_*\mid\mathbf y)=E[\operatorname{Var}(y_*\mid\mathbf w,\mathbf y)]+\operatorname{Var}(E[y_*\mid\mathbf w,\mathbf y])$$

$$=\widehat\sigma^2+\boldsymbol\phi_*^{\mathsf T}\boldsymbol\Sigma\boldsymbol\phi_*.$$

The first term is future observation noise. The second is uncertainty about the latent function $f_*=\boldsymbol\phi_*^{\mathsf T}\mathbf w$. Predicting the latent function excludes the first term; predicting a new noisy observation includes both.

## Worked two-weight example

Let $\boldsymbol\phi_*=(1,2)^{\mathsf T}$, $\boldsymbol\mu=(0.5,1)^{\mathsf T}$ and

$$\boldsymbol\Sigma=\begin{pmatrix}0.1&-0.02\\-0.02&0.05\end{pmatrix},\qquad\widehat\sigma^2=0.09.$$

The mean is 2.5. Function variance is $0.1+4(0.05)+4(-0.02)=0.22$, and observation variance is 0.31. Ignoring the covariance terms gives the wrong answer. Standard deviations are square roots: approximately 0.469 and 0.557.

## What is still missing?

These expressions condition on selected hyperparameters. They do not include disagreement between plausible noise/precision settings. A full hyperparameter mixture may be non-Gaussian. Its variance has an expected conditional-variance term and a between-setting mean-variance term; replacing that mixture by one selected Gaussian does not preserve them in general.

**Source clarification:** The small variance annotation continuing onto page 19 has missing/clipped PDF glyphs. The formula here makes the intended standard Gaussian result explicit rather than silently reproducing incomplete notation.

## Checkpoint

For a future noisy observation, which variance is correct? A. phi transpose Sigma phi only. B. sigma² + phi transpose Sigma phi. C. sigma + phi transpose Sigma phi.

<details>
<summary>Answer and explanation</summary>

B. Independent variances add. A describes latent-function uncertainty; C adds quantities with inconsistent units.

</details>

## Teach-back

Derive the conditional predictive Gaussian and separate latent-function uncertainty from observation noise. Which uncertainty does Type-II still omit?

Source: Lecture 6, slides 25. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
