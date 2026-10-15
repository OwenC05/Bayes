# Inverse-CDF sampling and the Cauchy warning

## Transform easy randomness into the target distribution

Let $\Theta$ have CDF $F_\Theta(x)=P(\Theta\le x)$. To avoid confusing the lecture's expectation symbol $F$ with a CDF, retain the subscript here. If $U\sim\operatorname{Uniform}(0,1)$, define

$$Y=F_\Theta^{-1}(U).$$

For a continuous strictly increasing CDF,

$$P(Y\le y)=P(U\le F_\Theta(y))=F_\Theta(y).$$

The last equality holds because a uniform variable falls below $u\in[0,1]$ with probability $u$. Therefore $Y$ has exactly the target CDF. A generalised inverse, $\inf\{x:F_\Theta(x)\ge u\}$, extends the construction to distributions whose CDF is not strictly increasing.

For differentiable densities the lecture uses the equivalent Jacobian argument: $u=F_\Theta(y)$ implies $du/dy=p_\Theta(y)$, so $p_Y(y)=1\cdot|du/dy|=p_\Theta(y)$. The printed source mixes $F(\theta)$ with an upper limit $x$ and ends with $p(\theta)$; these are notation inconsistencies, not different transformations.

## Work through the standard Cauchy

The density and CDF are

$$p_\Theta(\theta)=\frac1{\pi(1+\theta^2)},\qquad F_\Theta(x)=\frac12+\frac1\pi\arctan x.$$

Solve $u=1/2+\arctan y/\pi$:

$$Y=\tan\left[\pi\left(U-\frac12\right)\right].$$

For $u=0.25,0.5,0.75$, the outputs are $-1,0,1$. Values very near zero or one create extreme outputs because tangent approaches its vertical asymptotes. The source plot combines a peaked density with a rising CDF: read density against the density scale, not as cumulative probability. The CDF midpoint locates the median at zero.

## Endpoint and moment cautions

In ideal continuous sampling, $U=0$ and $U=1$ each have probability zero. The inverse Cauchy CDF nevertheless has infinite limiting values at those endpoints. A numerical implementation must avoid evaluating tangent at endpoint representations as if they were ordinary finite quantiles; arbitrary clipping changes the extreme-tail distribution.

The Cauchy has **no defined mean or variance**; its second moment diverges. Its symmetry does not supply a mean of zero: the positive and negative parts of the mean integral both diverge. A symmetric principal value is not an expectation. Consequently the earlier finite-variance Monte Carlo formula does not apply to $f(\theta)=\theta$ under this target.

Sampling itself remains valid. For $f(\theta)=\mathbf1\{\theta\le0\}$, the expectation is $1/2$ and variance is $1/4$, so an IID average of these indicators is perfectly legitimate Monte Carlo. Distinguish a distribution's ability to be sampled from existence of the moment being estimated.

**Recall:** the method needs an accessible inverse CDF. In many dimensions there is no single scalar CDF inversion that solves joint sampling this simply.

## Checkpoint

A Cauchy sampler returns many values. Which target has a well-defined expectation? A. The Cauchy value itself. B. Its square. C. The indicator that the value is nonpositive.

<details>
<summary>Answer and reasoning</summary>

**C.** The indicator is bounded with expectation 1/2. The Cauchy mean is undefined, and its second moment diverges.

</details>

## Teach-back

Prove the inverse-CDF method, transform three uniform values into Cauchy values, and explain why Cauchy sampling does not justify estimating its mean.

Source: Lecture 8, slides 8, 9. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
