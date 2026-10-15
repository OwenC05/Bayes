# Where high-dimensional Gaussian probability mass lives

## Follow every continuation of slide 25

The slide starts on page 20 with a Gaussian outline labelled $\sigma=1$. Pages 21–26 retain the same outline, but relabel three shaded regions as dimension increases:

| Dimension | Central label | Middle label | Outer label |
| --- | --- | --- | --- |
| 1 | 87% | 12% | 1% |
| 2 | 75% | 22% | 2% |
| 3 | 65% | 31% | 4% |
| 5 | 49% | 45% | 6% |
| 10 | 24% | 64% | 12% |
| 25 | 3% | 70% | 27% |

These are the actual source labels. Rounded rows need not sum exactly to 100%. The PDF does not explicitly define its higher-dimensional regions, so do not simply call these Euclidean radial shell probabilities.

## An explanatory reconstruction: nested hypercubes

The visible cutoffs are near $\pm1.5$ and $\pm2.5$. For independent standard normal coordinates $X_1,\ldots,X_D$, define

$$C_a=\{\mathbf x:|x_j|\le a\text{ for every }j\}.$$

Writing $\Phi$ for the standard normal CDF,

$$P(\mathbf X\in C_a)=[2\Phi(a)-1]^D.$$

Let $a_1=2\Phi(1.5)-1\approx0.8664$ and $a_2=2\Phi(2.5)-1\approx0.9876$. The central cube, intermediate cube layer and outside region have probabilities

$$a_1^D,\qquad a_2^D-a_1^D,\qquad1-a_2^D.$$

For $D=25$ these are approximately $0.0277$, $0.7040$ and $0.2683$, agreeing with 3%, 70%, 27%. This matching calculation is tutor inference, not an explicit source formula. It demonstrates that moderate one-coordinate central probability need not imply high joint central probability.

## Supplemental radial calculation: density is not mass

For an isotropic standard Gaussian,

$$p(\mathbf x)=(2\pi)^{-D/2}e^{-\|\mathbf x\|^2/2}.$$

The density is highest at the origin in every dimension. However, a radial shell at radius $r$ has surface factor proportional to $r^{D-1}$, so its radial density is

$$p_R(r)\propto r^{D-1}e^{-r^2/2},\qquad r\ge0.$$

For $D>1$, differentiating its log gives $(D-1)/r-r=0$, hence the radial mode is $\sqrt{D-1}$. Also $R^2=\sum_jX_j^2\sim\chi_D^2$, with mean $D$ and variance $2D$. Typical radius is therefore of order $\sqrt D$, not zero. At $D=25$, the radial mode is $\sqrt{24}\approx4.90$. This calculation concerns spheres and is separate from the nested-cube labels above.

## A second shell calculation: uniform ball volume

A ball's volume scales as $r^D$. For a point uniform inside a radius-$r$ ball, the fraction in its outer relative thickness $\delta$ is

$$1-(1-\delta)^D.$$

With $\delta=0.1$, the outer 10% of radius contains 19% of the area in 2D but about 92.8% of the volume in 25D. This is a uniform-volume calculation, not a Gaussian probability formula. Keeping those two calculations distinct prevents a common density/mass confusion.

**Misconception:** a sampler that clings to the density maximum can fail to represent the typical set where most integrated probability lies.

## Checkpoint

For a standard Gaussian in 25 dimensions, which is correct? A. Density and radial probability both peak at radius zero. B. Density peaks at zero, but radial density peaks near sqrt(24). C. The slide’s 3% is necessarily the probability inside a radius-1.5 sphere.

<details>
<summary>Answer and reasoning</summary>

**B.** The radial density includes the shell-volume factor. The source percentages instead match nested coordinate-wise cubes.

</details>

## Teach-back

Reconstruct the source’s dimension labels with nested cubes, then separately derive the Gaussian typical radius and a ball-shell volume fraction.

Source: Lecture 8, slides 25. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
