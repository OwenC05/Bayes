# Reading the importance-sampling illustration

## Three curves, three jobs

On slide 18 the blue curve is the unnormalised target $P^*(\theta)$, the red dashed curve is a Gaussian proposal $Q^*(\theta)$, and the grey curve is $f(\theta)$. The blue curve has a large mode left of zero and a smaller hump on the right. The proposal is broad enough to overlap both. The grey curve rises from negative values toward approximately one.

A density curve describes where draws or target mass are concentrated. The grey curve instead says what value to average at a particular $\theta$. Its negative values are allowed. Do not interpret its height as probability or normalise it to integrate to one.

For a sampled location, move vertically to read $P^*$ and $Q^*$, take their ratio, then read $f$. A point in a region underrepresented by the proposal receives more weight. A point in a region overrepresented by the proposal receives less. Raw target and proposal heights depend on their arbitrary scale constants; the final normalised weights do not.

## A worked two-region explanation

Imagine a discrete analogue with target probabilities $(0.8,0.2)$, proposal probabilities $(0.5,0.5)$ and function values $(-1,1)$. The correct expectation is $-0.6$, while the unweighted proposal expectation is zero. Density-ratio weights are $(1.6,0.4)$, so weighting restores the target's preference for the left region. This is a tutor example, not the analytic definition of the source curves.

The lecture does not print formulas or parameters for its target, proposal or function. We can explain the mechanism and read approximate plotted values, but cannot reconstruct exact demo output from the PDF alone.

## Read the running estimate on both pages

Slide 19 begins on page 12 with 5,000 samples and continues on page 13 with 50,000. The horizontal axis is the number of samples $R$; the vertical axis is the estimated expectation. The dashed reference is near 0.52. Early estimates fluctuate noticeably. In the longer run the trace comes close to the reference.

Each point uses a growing prefix of draws, so neighbouring plotted estimates are strongly dependent even when the individual draws are IID. The trace is not a sequence of independent experimental repetitions, nor a posterior density. A smooth late trace can reflect averaging, not a guarantee of accuracy.

## What evidence does one trace provide?

The plots illustrate how this proposal performed in the displayed run. They are not confidence bands, a proof of convergence, or a promise that error decreases monotonically. A random estimate may move farther from the truth before improving. Theoretical support and moment assumptions, repeated-run variability and weight diagnostics answer different questions from visually inspecting one curve.

**Recall:** locate the dashed reference before judging convergence. **Misconception:** the vertical gap in a single trace is realised error, not the standard error across hypothetical repetitions.

## Checkpoint

The grey curve in slide 18 takes negative values. Does this invalidate the calculation? A. Yes, all curves must be densities. B. No, it is the function whose expectation is computed. C. Yes, importance weights must be negative there.

<details>
<summary>Answer and reasoning</summary>

**B.** Function values may be negative. Density-ratio weights remain nonnegative.

</details>

## Teach-back

Identify the target, proposal and integrand curves, then explain what a running-estimate plot does and does not establish.

Source: Lecture 8, slides 18, 19. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
