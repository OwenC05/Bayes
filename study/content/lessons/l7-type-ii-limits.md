# Type-II estimation: what it keeps and what it discards

## Prerequisite bridge

**Gaussian covariance:** A covariance matrix specifies spread and relationships; its determinant appears in the normalising density.

**Density and change of variable:** A density is defined relative to a measure; changing coordinates multiplies it by a Jacobian.

## The delta approximation is only for hyperparameters

The factorisation from slide 7 is exact:

$$p(\mathbf w,\alpha,v\mid\mathbf y)=p(\mathbf w\mid\mathbf y,\alpha,v)\,p(\alpha,v\mid\mathbf y),\qquad v=\sigma^2.$$

Type-II estimation chooses one setting $(\widehat\alpha,\widehat v)$ and approximates the second factor by point mass there. The weight posterior is **not** replaced with a point: it remains $\mathcal N(\boldsymbol\mu,\boldsymbol\Sigma)$ conditional on the selected scales. This is more Bayesian than substituting MAP weights, but less Bayesian than integrating all scales.

## Derive the evidence covariance

Before seeing targets, $\mathbf y=\boldsymbol\Phi\mathbf w+\boldsymbol\epsilon$ is a linear combination of independent Gaussians. Its mean is zero. Since $\operatorname{Cov}(A\mathbf w)=A\operatorname{Cov}(\mathbf w)A^{\mathsf T}$,

$$C=v\mathbf I+\alpha^{-1}\boldsymbol\Phi\boldsymbol\Phi^{\mathsf T},\qquad p(\mathbf y\mid\alpha,v)=\mathcal N(\mathbf y;\mathbf0,C).$$

$C$ is $N\times N$, a covariance over possible datasets, whereas $\boldsymbol\Sigma$ is $M\times M$, a covariance over posterior weights. The evidence is a density at our single observed vector. Its log is

$$\log p(\mathbf y\mid\alpha,v)=-\frac N2\log(2\pi)-\frac12\log|C|-\frac12\mathbf y^{\mathsf T}C^{-1}\mathbf y.$$

The quadratic rewards explaining the observed vector; the determinant normalises the distribution across possible datasets. Dropping the determinant destroys the evidence criterion. Computationally, solve linear systems rather than explicitly forming $C^{-1}$; this is a numerical teaching note, not a slide implementation.

## Correctly interpret the flat-log claim

Slides 7–8 print

$$p(\alpha,v\mid\mathbf y)\propto p(\mathbf y\mid\alpha,v)\,p(\alpha)\,p(v),$$

then describe priors flat in $\log\alpha$ and $\log\sigma$ and conclude that maximising evidence suffices. These statements require specifying the density coordinates. Put $u=\log\alpha$ and $z=\log\sigma$. A flat prior **in $(u,z)$** makes the posterior density **in $(u,z)$** proportional to evidence evaluated at $(e^u,e^{2z})$. Its mode maximises evidence.

But in raw coordinates the same prior has $p(\alpha)\propto1/\alpha$ and $p(v)\propto1/v$. Consequently the raw-coordinate posterior density is proportional to evidence divided by $\alpha v$. Its MAP need not maximise evidence. The probability distribution transforms consistently; its density mode is not coordinate invariant. The phrase “uninformative” also does not remove assumptions about prior bounds or plausible scales.

## Numerical illustration and contour reading

For two raw-coordinate settings, suppose evidence is 10 at $(\alpha,v)=(1,1)$ and 20 at $(10,1)$. Evidence selects the second. Under bounded log-uniform priors, raw posterior densities are proportional to 10 and 2, respectively. Those two point densities alone do not determine posterior probability of finite cells, but they demonstrate why the raw MAP criterion differs. These are invented teaching values.

![Source concurrent-estimation contour plot and basis-function extension](assets/lecture-07/page-07.png)

Slide 11 plots log marginal likelihood against $\log\lambda$ and $\log\sigma^2$, not against weights. It labels an estimated $\sigma$ of 0.212 and a generating value of 0.250. The shaded region shows neighbouring settings can also be plausible. Neither the point estimate nor proximity to a generating value establishes calibrated uncertainty. The contour is a likelihood surface, not automatically a normalised posterior contour.

**Recall:** Type-II evidence selection retains conditional weight uncertainty but discards hyperparameter spread and can underrepresent its contribution to predictive uncertainty. The exact size and direction of error depend on the model and data.

## Checkpoint

Under a prior flat in log alpha and log sigma, which statement is correct?

- A. The raw densities p(alpha) and p(sigma) are constants.
- B. Evidence maximisation equals a mode of the posterior density in log coordinates, not generally MAP in raw coordinates.
- C. All posterior modes are coordinate invariant.

<details>
<summary>Answer and explanation</summary>

B. Changing from log to raw coordinates contributes inverse-scale Jacobians. The underlying probabilities agree, but the locations of density maxima can change.

</details>

## Teach-back

Explain the delta approximation, derive the evidence covariance, and distinguish evidence maximisation from MAP in raw scale coordinates under log-uniform priors.

**Source boundary:** Lecture 7, slides 7, 8, 9, 10, 11. Original figures are source material; derivations, numerical examples, corrections and checkpoints here are supplemental teaching, not additional slide claims.
