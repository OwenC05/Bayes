# Burn-in, autocorrelation and effective sample size

## Prerequisite bridge

**Monte Carlo error:** For IID samples, estimator variance is population function variance divided by the number of draws.

**Covariance:** Variance of a sum includes cross-covariances when its terms are dependent; those terms need not vanish.

## Three different problems

**Initialisation:** early states may be atypical of the target. Discarding an initial segment is burn-in; algorithmic warm-up may also adapt step sizes or other tuning. **Dependence:** even after equilibrium, successive samples are correlated. **Exploration failure:** a chain can spend its entire run in one mode. These are not the same problem and deleting every tenth state does not solve all three.

Slide 11 correctly emphasises that convergence is difficult to assess and successive states are not independent. Its statement that subsampling is necessary is too strong. A suitable ergodic chain can satisfy

$$\frac1R\sum_{t=1}^R f(\boldsymbol\theta^{(t)})\longrightarrow\mathbb E_p[f]$$

for integrable $f$, despite dependence. Averaging chain states is not justified by the IID law alone; it needs an appropriate Markov-chain convergence result.

## Derive the dependence penalty

Let $Y_t=f(\boldsymbol\theta^{(t)})$ under stationarity, with variance $\sigma_f^2$ and lag-$k$ autocorrelation $\rho_k=\operatorname{Corr}(Y_t,Y_{t+k})$. Expanding the variance of a sum gives

$$\operatorname{Var}(\bar Y_R)=\frac{\sigma_f^2}{R}\left[1+2\sum_{k=1}^{R-1}\left(1-\frac kR\right)\rho_k\right].$$

There are $R-k$ pairs at lag $k$, explaining the factor $1-k/R$. For a suitable chain central limit theorem and summable autocorrelations, define

$$\tau_f=1+2\sum_{k=1}^{\infty}\rho_k,\qquad R_{\mathrm{eff},f}\approx\frac R{\tau_f},\qquad\operatorname{MCSE}(\bar Y_R)\approx\frac{\sigma_f}{\sqrt{R_{\mathrm{eff},f}}}.$$

The assumptions are material; finite variance alone does not ensure every chain has this asymptotic normal approximation. ESS belongs to a function or estimand, not a universal property of a dataset. Negative correlation can sometimes improve efficiency; “ESS can never exceed R” is not a universal law.

## Worked persistent sequence model

As a tutor model assume $\rho_k=0.8^k$. Then $\sum_{k\ge1}\rho_k=0.8/(1-0.8)=4$, so $\tau_f=9$. A run of 9000 stationary draws has approximately the mean-estimation information of 1000 IID draws for this $f$. If $\sigma_f=3$, its MCSE is about $3/\sqrt{1000}=0.095$, not $3/\sqrt{9000}=0.032$.

Posterior SD and MCSE answer different questions: SD describes posterior spread of the quantity; MCSE describes numerical uncertainty in its estimated expectation. More samples reduce the latter, not the true posterior spread.

## Thinning and checks

Retaining every $K$th state can save storage or expensive downstream evaluation, and often reduces correlation between retained neighbours. It also discards information from an already computed run and does not guarantee independence. A missed mode stays missed. Usually keep available draws and estimate relevant ESS/MCSE rather than treating a fixed thinning interval as a proof. [Stan’s posterior-analysis reference](https://mc-stan.org/docs/reference-manual/analysis.html) gives supporting detail on autocorrelation, effective sample size and numerical uncertainty.

Examine multiple dispersed chains, trace plots, appropriate between/within-chain diagnostics, ESS, MCSE and domain-specific quantities. No finite diagnostic proves convergence. Do not declare success solely because a trace looks busy, acceptance is high or a fixed burn-in has elapsed.

**Misconception:** correlated does not mean unusable; it means the IID uncertainty calculation is generally wrong.

## Checkpoint

For 5000 retained draws with integrated autocorrelation time 5, the approximate ESS is what? A. 25,000. B. 1000. C. 5000, because burn-in was removed.

<details>
<summary>Answer and reasoning</summary>

**B.** ESS is approximately 5000/5. Removing burn-in addresses initialisation, not the remaining stationary autocorrelation.

</details>

## Teach-back

Derive the covariance correction to Monte Carlo variance, distinguish posterior SD from MCSE, and explain what burn-in and thinning can and cannot accomplish.

**Source boundary:** Lecture 9, slides 11. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
