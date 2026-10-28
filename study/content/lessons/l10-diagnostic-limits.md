# Interpret ESS, intervals, R-hat and divergences critically

## Prerequisite bridge

**Autocorrelation:** Neighbouring chain states can contain overlapping information, affecting the variance of Monte Carlo estimates.

**Variance decomposition:** Within-chain variation and disagreement across chains answer different diagnostic questions.

## Effective sample size is quantity-specific

For a stationary scalar sequence $f(\theta^{(s)})$ with suitable finite variance and summable autocorrelations $\rho_k$, a long-run approximation is

$$\operatorname{Var}(\widehat F)\approx\frac{\sigma_f^2}{S}\left(1+2\sum_{k=1}^{\infty}\rho_k\right),\qquad S_{\rm eff}=\frac{S}{1+2\sum_{k=1}^{\infty}\rho_k}.$$

This connects dependence to the variance of an average. The ESS is not a literal subset of independent points, and estimating the correlation sum is non-trivial. Different functions of $\theta$ can mix differently. Positive correlation usually reduces ESS; negative correlation can increase it relative to the retained count. A printed `n_eff=471.81` is therefore not “471.81 surviving observations.”

## An interval label does not identify its construction

The lecture describes `5.0%` and `95.0%` as posterior percentiles. However, NumPyro's printed summary reports highest-posterior-density interval bounds, not automatically equal-tail quantiles ([diagnostic summary reference](https://num.pyro.ai/en/stable/diagnostics.html#summary)). A 90% equal-tail interval has 5% probability on each side. A shortest/high-density interval seeks a compact region containing 90% probability and need not leave equal tails. The two can differ for skewed distributions.

The source table is clipped, so its visible labels should not be reconstructed as a new exact quantile calculation. Preserve the printed endpoints, distinguish the source's explanation from the library's interval convention, and specify the desired interval explicitly when reporting an analysis. Neither interval represents a 90% chance that a future binary outcome lies between those parameter endpoints.

## What R-hat can and cannot say

The source explains R-hat using between-chain and within-chain variation. Its basic purpose is to flag that chains do not appear to sample the same distribution. Modern rank/split diagnostics strengthen this idea, but a value near one is still reassuring diagnostic evidence rather than a proof that all posterior regions have been explored.

The displayed run does not request multiple chains. A single chain may be split internally for a diagnostic, but that is not evidence that several independently initialised chains agree ([split R-hat reference](https://num.pyro.ai/en/stable/diagnostics.html#split-gelman-rubin)). A value rounded to `1.00` conceals additional precision and cannot establish a universal pass condition. More chains, adequate effective sample sizes and inspection of different parameters and tails provide stronger evidence than one rounded scalar.

## Divergences are not ordinary rejections

The source prints zero divergences. A divergence signals problematic numerical Hamiltonian integration, often exposing difficult geometry. An ordinary Metropolis rejection is part of the valid algorithm and need not indicate a divergence. Treating these as the same count would misunderstand the correction mechanism.

Zero observed divergences is desirable, but does not prove convergence or correctness of the model. Persistent divergences call for investigating scaling, step size and parameterisation rather than deleting flagged points and declaring the remaining chain valid. Conversely, a chain trapped in one mode can report no divergences while missing important posterior mass.

## Worked decision, not a one-number verdict

Suppose two chains have stable-looking traces in different regions. Even with high acceptance and zero divergences, their disagreement is a sampling concern. Suppose instead all chains agree but tail ESS is very low: a mean may be adequate while a rare-event probability remains inaccurate. Specify which inferential target needs precision before interpreting “good diagnostics.”

**Misconception:** diagnostics assess the numerical approximation conditional on a model. They do not certify that the prior, likelihood or independence assumptions describe the data-generating situation.

## Checkpoint

Are zero divergences and r_hat=1.00 enough to certify inference? A. Yes, even for one chain. B. No: inspect independent chains, target-specific ESS, traces, geometry and model assumptions together.

<details>
<summary>Answer and explanation</summary>

B. Ordinary rejection is an algorithmic correction for energy error; divergences flag serious integration behaviour. Neither zero divergences nor a rounded near-one R-hat independently proves valid inference.

</details>

## Teach-back

Explain interval type, effective sample size, multi-chain convergence diagnostics and divergences without treating any one favourable number as proof.

**Source boundary:** Lecture 10, slides 19. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
