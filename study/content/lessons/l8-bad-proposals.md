# Bad proposals, rare weights and deceptive plateaus

## What makes this Gaussian proposal bad?

Slide 20 places a comparatively narrow Gaussian proposal near the target's smaller right-hand hump. The target's dominant left mode is several proposal standard deviations away. A proposal draw rarely lands there, yet those rare draws have large $P^*/Q^*$ ratios.

The source's grey function is lower on the left than on the right. If we repeatedly miss the left mode, the estimate can be too high: the observed draws overrepresent larger function values. When a rare left-region draw arrives, its large weight can pull the running average abruptly downward.

Slide 21 shows exactly this kind of finite-run behaviour. The 5,000-sample trace remains far from the dashed reference near 0.52 and has a conspicuous drop. Its page-16 continuation with 50,000 samples shows further large jumps, not a tidy approach to the reference. These are observations from the original plots; no exact sequence of samples or random seed is provided.

## Three distinct failure modes

1. **Absent support:** if $Q=0$ on a region of positive target mass, no number of proposal draws can recover its contribution. The ratio argument itself fails there.
2. **Tiny proposal probability:** a full-support Gaussian might technically reach every region but need an impractically large sample to represent an important one. Consistency can coexist with terrible finite-run results.
3. **Bad tails or moments:** if the target decays much more slowly than the proposal, weights may have infinite variance. Ordinary square-root error approximations may fail even with full support and a consistent estimator.

The title “Non-converging Estimate” describes the displayed demonstration. Finite traces alone do not prove that the estimator is mathematically inconsistent. The PDF lacks enough target/proposal definitions to establish its limiting moment behaviour.

## Worked rare-event calculation

If a relevant region has proposal probability $q=10^{-4}$, IID draws miss it with probability

$$P(\text{no hit in }R\text{ draws})=(1-q)^R.$$

At $R=5{,}000$ this is approximately $e^{-0.5}\approx0.607$. Even a seemingly substantial sample may miss the region entirely. This illustrative probability is not inferred as the numerical probability of the source's left mode.

## Supplemental diagnostic: effective sample size

A common weight-concentration diagnostic, not printed on these slides, is

$$\operatorname{ESS}_{\mathrm{weights}}=\frac{(\sum_r w_r)^2}{\sum_r w_r^2}=\frac1{\sum_r\bar w_r^2}.$$

Equal positive weights give ESS equal to $R$; one dominating weight gives ESS near one. With normalised weights $(0.98,0.01,0.01)$, ESS is about 1.04, despite three draws. It is a heuristic diagnostic rather than a universal exact equivalent sample count.

Crucially, ESS computed only on observed draws can look reassuring when a mode has never been visited. Neither a flat trace nor a large observed ESS proves global coverage. Plot the proposal against the target, inspect extreme weights, and reason about tails as well as the run.

**Misconception:** adding more samples is not a substitute for repairing an unsuitable proposal.

## Checkpoint

A Gaussian proposal is positive everywhere. Does that alone ensure reliable finite-variance importance estimates? A. Yes. B. No: probabilities can be tiny and tail moments can fail. C. Only if the target has two modes.

<details>
<summary>Answer and reasoning</summary>

**B.** Support is necessary but not sufficient for useful variance or practical coverage.

</details>

## Teach-back

Explain why missing the left mode creates plateaus and jumps; distinguish absent support, tiny support probability and insufficient tail moments.

Source: Lecture 8, slides 20, 21. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
