# Read posterior summaries and traces as different evidence

## Prerequisite bridge

**Posterior spread:** Standard deviation describes variation in the unknown parameter under its posterior distribution.

**Monte Carlo estimate:** A sample mean approximates a distributional expectation and has its own numerical uncertainty.

## What the displayed numbers estimate

The source calls `mcmc.print_summary()` and displays approximate mean 0.59, standard deviation 0.09 and median 0.60 for $\theta$. These summarise the posterior parameter distribution. The mean is the average of retained parameter values; the standard deviation describes posterior spread, not uncertainty in that average due to the finite chain.

The exact Beta(16,11) calculation gives mean $16/27\approx0.5926$ and standard deviation about 0.09286. Their agreement after rounding is a useful plausibility check, not an exhaustive validation of the sampler. The median need not equal the mean because a posterior need not be symmetric.

The PDF's summary table is horizontally clipped/wrapped. It also displays interval endpoints 0.45 and 0.74, effective sample size 471.81 and a rounded `r_hat` of 1.00. Preserve those values as printed outputs; do not invent missing header text or claim they were regenerated.

## Worked contrast: uncertainty about theta versus numerical error

As a tutor approximation, combine posterior standard deviation 0.09 with the printed effective sample size about 472:

$$\operatorname{MCSE}(\widehat{\mathbb E\theta})\approx\frac{0.09}{\sqrt{472}}\approx0.0041.$$

This standard error describes simulation error in the estimated posterior **mean**, assuming an appropriate effective sample estimate and central-limit behaviour. It is not the posterior standard deviation of $\theta$, and it is not an error bar for an individual future outcome. A longer well-mixing chain can reduce MCSE without making the scientifically appropriate posterior artificially narrow.

Quantiles and tail probabilities have their own Monte Carlo accuracy requirements. One ESS value for a mean does not guarantee every reported functional is accurate to the same tolerance.

## Two panels, two questions

The source uses

```python
data = az.from_numpyro(mcmc)
az.plot_trace(data, figsize=(10,8))
```

![Source posterior-density and trace panels](assets/lecture-10/page-13.png)

The density panel displays an estimate of the marginal posterior shape: its horizontal coordinate is a value of $\theta$, and its vertical coordinate is density, not a probability at one exact point. Area over an interval corresponds to probability.

The trace panel instead displays parameter value against retained draw order. Long flat segments, slow drift, chains occupying separate regions, or strong periodic behaviour can reveal sampling problems. A trace can reveal dynamics that a smooth marginal histogram hides. Conversely, a jagged-looking trace alone is not proof of convergence: an unexplored mode cannot appear merely because the visible region is traversed rapidly.

## Do not reverse the inferential claim

A successful rendering call demonstrates that a visualisation was produced. The printed figure shows the source run; it does not prove the app has executed inference or that a new learner has understood the diagnostics. Read plots together with known target structure, multiple-chain comparisons, effective sample size and numerical warnings.

**Misconception:** a wider posterior is not automatically a bad numerical approximation. It may correctly express limited data. Distinguish posterior uncertainty, predictive uncertainty and computational uncertainty before interpreting an interval or recommending more data versus more sampling.

## Checkpoint

If a longer well-mixing chain halves the Monte Carlo error of the posterior mean, must the posterior standard deviation halve too? A. Yes. B. No: posterior spread and numerical estimation error are different quantities.

<details>
<summary>Answer and explanation</summary>

B. Posterior SD quantifies parameter uncertainty under the model. MCSE quantifies numerical uncertainty in an estimated posterior summary; longer accurate sampling mainly reduces the latter.

</details>

## Teach-back

Distinguish posterior spread from Monte Carlo error, compare the printed summaries with the exact posterior, and explain what each trace-plot panel can reveal.

**Source boundary:** Lecture 10, slides 17, 18. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
