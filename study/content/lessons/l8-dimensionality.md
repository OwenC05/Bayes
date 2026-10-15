# Why grids and uniform proposals fail in many dimensions

## A rate is not a sampler

Slide 12 returns to a low-dimensional calculation in logarithmic hyperparameters. Evaluating a regular grid can reveal important regions in two dimensions, but exhaustive search becomes expensive quickly. A grid with $K$ values along each of $D$ axes has $K^D$ points. With $K=20$, two dimensions need 400 points, while ten need $20^{10}=10{,}240{,}000{,}000{,}000$.

The source calls the earlier calculation a Monte Carlo sample evaluated on a regular grid. Keep the distinction: a fixed grid is deterministic, not IID random sampling. The $1/R$ variance result cannot simply be assigned to a grid calculation. Its role here is to warn that representative sampling itself becomes a serious task.

## Reconstruct the circle-and-square picture

The green disc in slide 13 is inscribed in a square. If its radius is $r$, its area is $\pi r^2$ and the square area is $4r^2$. The fraction occupied is $\pi/4\approx0.785$, leaving about 21.5% outside the disc.

In $D$ dimensions the ball and cube volumes are

$$V_D(r)=\frac{\pi^{D/2}}{\Gamma(D/2+1)}r^D,\qquad V_{\mathrm{cube}}=(2r)^D.$$

Their ratio is

$$a_D=\frac{\pi^{D/2}}{2^D\Gamma(D/2+1)}.$$

The radius cancels. This explains the source table's numbers: about 0.785, 0.524, 0.308 and 0.164 at dimensions 2, 3, 4 and 5, falling to about 0.00249 at dimension 10. The printed 0.002 and 99.8% are rounded. “Corners” means the full region outside the inscribed ball, not just tiny neighbourhoods of the vertices.

## Worked sampling consequence

Uniform cube proposals land inside the ball with probability $a_D$. If one retained only those points, the average number of proposals per retained point would be $1/a_D$: about 1.27 in 2D and 402 in 10D. This is a geometric illustration of inefficiency, not a rejection algorithm taught by this lecture. Rejection sampling is named but explicitly not covered.

This does not contradict Monte Carlo's dimension-independent exponent. If we already possessed IID samples from the desired target and a finite function variance, their average would retain variance $\sigma_f^2/R$. Here the expensive part is producing useful target-relevant samples rather than averaging them.

## What the proposal must accomplish

Slide 15 introduces a proposal distribution that is easy to sample and close to the target in a useful sense. Visual closeness near a mode is not enough. It must cover all regions that contribute materially to the integral. Importance sampling will use weights instead of treating proposal draws as if they were target draws.

**Recall:** uniform in a bounding cube is not uniform in a ball. **Misconception:** high dimension does not make all distributions impossible to sample; it makes naive generic searches and mismatched proposals unreliable or costly.

## Checkpoint

What does the 10D ball/cube ratio measure? A. The probability a uniform cube draw lies in the inscribed ball. B. The height of a Gaussian at its mode. C. The standard error of any Monte Carlo calculation.

<details>
<summary>Answer and reasoning</summary>

**A.** For a uniform cube distribution, the probability is exactly the relative volume.

</details>

## Teach-back

Derive the ball-to-cube volume fraction, compare a high-dimensional grid cost, and explain why this does not contradict Monte Carlo’s variance rate.

Source: Lecture 8, slides 12, 13, 14, 15. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
