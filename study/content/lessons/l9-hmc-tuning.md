# Step size, trajectory length and what NUTS automates

## Prerequisite bridge

**Leapfrog integration:** Numerical Hamiltonian motion uses a finite step size and a chosen number of steps, followed by a Metropolis correction.

**Sampling efficiency:** The useful output is accurate expectations per computational effort, not just a large nominal draw count or acceptance rate.

## Separate the knobs

Let $\epsilon$ be the integrator step size and $L$ the number of leapfrog steps. The integration time is $\tau=L\epsilon$. This is artificial dynamics time, not generally geometric distance: instantaneous velocity changes with momentum and mass matrix. The lecture's “distance travelled” wording is an intuition rather than an equality of units.

- **Large ε:** a coarse integrator may misrepresent sharply curved regions, create large energy errors, trigger rejections or become unstable.
- **Small ε:** more accurate motion, but many gradient evaluations may be needed for useful travel.
- **Small L or τ:** trajectories can move too little and retain high autocorrelation.
- **Large L or τ:** extra motion may retrace explored regions or spend computation without more effective samples.

These interact. Halving $\epsilon$ while holding $L$ fixed halves integration time; holding $\tau$ fixed instead approximately doubles $L$. Neither comparison should be reported simply as “smaller steps always improve sampling”.

## Worked cost comparison

Suppose $\epsilon=0.1$, $L=20$, so $\tau=2$. Choosing $\epsilon=0.05$ and $L=40$ keeps $\tau=2$ but roughly doubles integration work per proposal. If ESS doubles too, the efficiency per gradient evaluation is roughly unchanged; if ESS barely changes, it worsens. This tutor comparison does not prescribe settings for the source example or count every implementation's exact gradient reuse.

Changing a fixed mass matrix alters directional velocities and numerical frequencies. Rescaling parameters or adapting an appropriate mass matrix during warm-up can improve geometry, but complicated position-dependent curvature and separated modes can remain problematic. “HMC uses gradients” is not a universal cure.

## Acceptance is a symptom, not the objective

Slide 23 mentions a desired acceptance rate of 65%. This relates to particular HMC scaling arguments/settings, not a universal optimal rate for every target or algorithm. Near-perfect acceptance may mean unnecessarily tiny steps. A reasonable average acceptance does not rule out rare problematic regions or missed modes. Examine energy behaviour, divergences where applicable, trajectory behaviour, ESS, MCSE and multiple-chain agreement.

The source also mentions random step-size perturbations, momentum persistence and reversing time direction. These require a valid invariant construction; one cannot arbitrarily change a sampler after looking at desired outcomes and assume the target is preserved. Warm-up adaptation is ordinarily separated from retained sampling unless a method has an appropriate adaptive-MCMC justification.

## NUTS is not “integrate until anything looks good”

The No-U-Turn Sampler builds trajectories and uses a principled stopping/selection construction to avoid wasteful backtracking while preserving the intended target. It reduces the need to hand-pick a fixed trajectory length. Implementations may also adapt step size and mass matrix during warm-up. It does not eliminate tuning choices, poor parameterisation, gradient costs, initialisation or convergence assessment.

The lecture names NUTS but does not provide its full tree-building algorithm or proof. This is a conceptual bridge to Lecture 10's software workflow, not an implementation claim.

Supporting reading: [Neal on HMC tuning and scaling](https://arxiv.org/html/1206.1901v1) and [Stan's HMC/NUTS reference](https://mc-stan.org/docs/reference-manual/mcmc.html). Their details support these qualifications rather than changing the literal lecture statements.

**Misconception:** zero divergences or a preferred acceptance percentage is sufficient evidence of convergence. These are useful checks, not proofs or substitutes for exploring the correct posterior.

## Checkpoint

If ε is halved while keeping τ=Lε fixed, what happens approximately? A. L doubles, increasing work per trajectory. B. L halves. C. The output automatically becomes IID.

<details>
<summary>Answer and reasoning</summary>

**A.** Keeping integration time fixed requires twice as many half-sized steps. Accuracy and efficiency must be assessed along with this increased computational work.

</details>

## Teach-back

Explain the separate effects of step size, integration time and geometry, compare efficiency per computational cost, and describe what NUTS automates without promising convergence.

**Source boundary:** Lecture 9, slides 23. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
