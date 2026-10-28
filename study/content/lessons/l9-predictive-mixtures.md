# Read HMC predictions and marginal histograms without losing uncertainty

## Prerequisite bridge

**Posterior predictive components:** For fixed hyperparameters, integrating Gaussian weight uncertainty yields a predictive mean and variance.

**Mixture moments:** Total variance contains both average conditional variance and variance of conditional means.

## Use the draws as joint triples

Let $\eta^{(s)}=(\alpha^{(s)},v^{(s)},r^{(s)})$ be retained draws from the joint hyperparameter posterior. Given a draw, define

$$\Sigma_s=(\alpha_sI+v_s^{-1}\Phi_{r_s}^{\mathsf T}\Phi_{r_s})^{-1},\qquad\mu_s=v_s^{-1}\Sigma_s\Phi_{r_s}^{\mathsf T}\mathbf y.$$

For a new fixed input $x_*$, let $\phi_{*,s}$ be its $M$-vector of basis evaluations using width $r_s$. The observation predictive component is

$$p(y_*\mid\mathbf y,\eta_s)=\mathcal N(y_*;m_s,V_s),\quad m_s=\phi_{*,s}^{\mathsf T}\mu_s,\quad V_s=v_s+\phi_{*,s}^{\mathsf T}\Sigma_s\phi_{*,s}.$$

Each component already includes weight uncertainty; $v_s$ adds new observation noise. For the latent noise-free function omit $v_s$. Do not add the same weight uncertainty again by independently resampling and counting it twice.

## Average under the posterior, not the prior

Because these are posterior draws, the predictive approximation is the equal-weight mixture

$$p(y_*\mid\mathbf y)\approx\frac1S\sum_{s=1}^S\mathcal N(y_*;m_s,V_s).$$

Unlike prior-grid integration or importance sampling, there is no extra evidence weighting. Multiplying each posterior draw by its evidence would generally count the observations twice. Dependence affects numerical error, not the fact that an ordinary ergodic average uses equal time weights, including repeated states on rejection.

Its mean and variance are

$$\bar m=\frac1S\sum_sm_s,\qquad\widehat{\operatorname{Var}}(y_*)=\frac1S\sum_s\left[V_s+(m_s-\bar m)^2\right].$$

These are moments of the finite empirical predictive mixture, not the sample variance formula for estimating a population variance from IID observations. The within-component term carries noise and weight uncertainty; the between-component term carries hyperparameter disagreement. A mixture of Gaussians need not itself be Gaussian.

## Worked uncertainty decomposition

Take two equally weighted posterior components with $(m_1,V_1)=(-1,1)$ and $(m_2,V_2)=(3,4)$. Then $\bar m=1$, average conditional variance is 2.5 and variance of means is 4, so total predictive variance is 6.5. Reporting only the spread of the means omits 2.5; reporting only mean conditional variance omits 4.

![Original posterior-averaged mean](assets/lecture-09/page-28.png)

Slide 21 shows black observed points, a red HMC mean predictor and a gold dashed reference curve against input position. It shows a **mean**, not a predictive uncertainty band. Agreement with the reference in this source example is not proof of calibration or sampler convergence.

## What each histogram means

![Original marginal log-precision samples](assets/lecture-09/page-29.png)

Slide 22's three histograms are labelled **log α**, **noise std. dev. σ** and **basis width r**, on pages 29–31. Their ordinates are density-like histogram heights, not probabilities at single parameter values. Probability over a bin corresponds to its area under a density-normalised histogram. The noise plot includes a dashed “True σ” reference: compare it with spread, not just the tallest bin.

Crucially, log precision is not precision and SD is not variance. Transforming their densities requires Jacobians, and $\mathbb E[\sigma^2]$ is not generally $\mathbb E[\sigma]^2$. Marginal histograms discard joint dependence: independently combining draws from three marginals can create unrealistic triples and wrong predictions. Preserve each sampled triple.

**Misconception:** a smooth-looking marginal histogram cannot reveal every missing mode, joint correlation or convergence failure.

## Checkpoint

Two posterior components have equal means but variances 1 and 9, with equal weights. What is the predictive variance? A. Zero, because the means agree. B. 5. C. 2.5, because mixture weights must be squared.

<details>
<summary>Answer and reasoning</summary>

**B.** The between-component variance is zero, but the average within-component variance is (1+9)/2=5. A mixture is not the sum of independent weighted observations, so mixture weights are not squared.

</details>

## Teach-back

Derive the posterior-sample predictive mixture and both variance components, then explain what the three source histograms retain and what joint information they discard.

**Source boundary:** Lecture 9, slides 21, 22. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
