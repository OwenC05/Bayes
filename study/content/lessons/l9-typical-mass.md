# High density is not where all Gaussian probability lives

## Prerequisite bridge

**Density and volume:** Probability of a region is the integral of density over its volume; the height at one point is not that probability.

**Gaussian squared norm:** For independent standard normal coordinates, squared coordinate values have mean 1 and variance 2.

## The apparent paradox

For a $d$-dimensional standard Gaussian,

$$p(\theta)=(2\pi)^{-d/2}\exp\left(-\frac12\|\theta\|^2\right),$$

the density is maximised at the origin. Yet in high dimensions a draw is very unlikely to lie near the origin. There is no contradiction: probability depends on both density and available volume. A single point has zero probability in this continuous distribution, even when its density is maximal.

Set $R=\|\theta\|$, the Euclidean radius. A shell between $r$ and $r+dr$ has volume proportional to $r^{d-1}dr$, so for $r>0$ its radial density is

$$p_R(r)\propto r^{d-1}e^{-r^2/2}.$$

The first factor grows with radius while the second falls. This is the mechanism missing from a density-only argument.

## Derive the shell's most likely radius

Differentiate the log radial density:

$$\frac{d}{dr}\log p_R(r)=\frac{d-1}{r}-r.$$

For $d>1$ the maximum is at $r_{\mathrm{mode}}=\sqrt{d-1}$. This is the mode of **radius**, not the mode of the original vector density. For variance $\sigma^2I$, multiply the radius by $\sigma$.

A second argument shows relative concentration. With $S=\|\theta\|^2=\sum_i\theta_i^2$,

$$\mathbb E[S]=d,\qquad\operatorname{Var}(S)=2d.$$

The relative SD of $S$ is $\sqrt{2d}/d=\sqrt{2/d}$, shrinking with dimension. Thus radii concentrate in a region of order $\sqrt d$, even though pointwise density is highest at zero. A typical set is not literally a single infinitely thin sphere.

## Worked density-versus-mass contrast

For $d=100$, radial density peaks near $\sqrt{99}\approx9.95$ and $\mathbb E[R^2]=100$. A point at radius 10 has density $e^{-50}$ times the density at zero. That ratio is tiny, but the enormous volume of shells at radius about 10 carries substantial probability. The density ratio alone cannot tell us the shell probability.

![Original Gaussian-mass sequence](assets/lecture-09/page-21.png)

Slide 17 continues over pages 21–25, retaining a Gaussian outline but changing its central/middle/outer percentages: dimension 1 gives 87/12/1; 2 gives 75/22/2; 5 gives 49/45/6; 10 gives 24/64/12; 25 gives 3/70/27. These are source labels, not explicitly defined radial-shell probabilities. Rounded totals can differ from 100.

As an explanatory reconstruction, independent standard-normal coordinates satisfy $P(|X_j|\le a\text{ for all }j)=[2\Phi(a)-1]^d$. The cutoffs near 1.5 and 2.5 give central and larger-cube probabilities $0.8664^d$ and $0.9876^d$. For $d=25$, the central cube, layer and exterior are approximately 0.0277, 0.7040 and 0.2683, matching 3/70/27. This inferred nested-**cube** construction is separate from the spherical radial derivation above. For a correlated Gaussian, transformed Mahalanobis radius expresses the standard radial calculation.

## Why this prepares HMC

Optimisation can move to a density mode and stop. Sampling must repeatedly explore the distribution's mass-carrying regions, including their volume. Random-walk steps can make slow progress along them. HMC introduces momentum and follows geometry-informed trajectories so that movement can be sustained rather than diffusive. This motivation does not imply it samples independently, finds every mode or solves every geometry.

**Misconception:** “higher posterior density” does not always mean “more representative of a posterior draw” when comparing a point with an extended region.

## Checkpoint

For a high-dimensional standard Gaussian, which statement is correct? A. Most probability must lie arbitrarily close to the vector-density mode at zero. B. Radial volume can concentrate mass near radius of order √d even though density decreases with radius. C. Density and shell probability are the same.

<details>
<summary>Answer and reasoning</summary>

**B.** Shell probability includes the volume factor r^(d−1). The vector-density mode and the radial-density mode answer different questions.

</details>

## Teach-back

Derive the Gaussian radial-density mode and explain, without conflating density and probability, why representative draws are far from the origin in high dimensions.

**Source boundary:** Lecture 9, slides 17. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
