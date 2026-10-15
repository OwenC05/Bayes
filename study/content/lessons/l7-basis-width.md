# What the RBF width changes

## Prerequisite bridge

**Basis functions:** An RBF model is linear in its weights even though each basis is nonlinear in the input.

**Design matrix:** Entry Phi[n,m] is basis m evaluated at input n; changing a basis width changes this entire matrix.

## Three different controls

For data-centred Gaussian bases, the lecture uses

$$\phi_m(x;r)=\exp\left[-\frac{(x-x_m)^2}{r^2}\right].$$

The centre $x_m$ is fixed. The width $r>0$ controls how far that basis extends. The weight $w_m$ scales its contribution. Precision $\alpha$ controls the prior spread of all weights, while $\sigma$ describes independent observation noise. These are not interchangeable: $r$ changes the feature representation itself; $\alpha$ changes the prior over coefficients within a representation.

At a centre, the basis is 1 regardless of width. One width away it is $e^{-1}\approx0.368$. At distance 1, a basis of width $r=0.5$ gives $e^{-4}\approx0.0183$; width $r=2$ gives $e^{-1/4}\approx0.779$. Wider bases couple predictions over greater distances. This calculation concerns one basis, not the total fitted curve, which can involve positive and negative weights.

## Read every source panel

![Original four basis-width panels at r equal to 0.25, 0.5, 1.5 and 4](assets/lecture-07/page-08.png)

Slide 13 holds $\alpha=0.1$ and “noise = 0.4” while varying $r$. The source text does not explicitly distinguish standard deviation from variance in that “noise” label, so do not silently interpret it as $\sigma^2=0.4$.

- **$r=0.25$:** very local bases allow narrow changes. The fitted curve is visibly more wiggly and tracks local observations closely.
- **$r=0.5$:** bases overlap more; the curve remains responsive to local structure with fewer sharp features.
- **$r=1.5$:** substantial overlap gives a broader, smoother curve in this example.
- **$r=4$:** very broad bases vary slowly across the displayed interval; the fit misses some of the reference shape.

The lower grey curves are basis functions, not posterior samples. The upper points are observations and the reference/fitted curves show how representation affects fitting. The figure illustrates sensitivity to width; it does not establish a universal best width or a theorem that larger $r$ always reduces every notion of function complexity. Broad overlapping features can still cancel under large weights.

## The next inference target

Slide 12 notes the earlier width was fixed at $r=1.0$. It proposes integrating $\alpha$ and $\sigma^2$ and then estimating $r$ using

$$p(\mathbf y\mid r)=\iint p(\mathbf y\mid\alpha,\sigma^2,r)\,p(\alpha)\,p(\sigma^2)\,d\alpha\,d\sigma^2.$$

In that conditional evidence, weights have already been integrated analytically. The design matrix inside each conditional evidence depends on $r$. For every candidate width we must reevaluate the relevant model quantities; changing $r$ is not merely moving a marker on the earlier fixed-matrix evidence surface.

**Misconception:** numerically integrating two hyperparameters does not make the whole method fully Bayesian. If $r$ is selected and plugged in, uncertainty in it is still omitted. The family “Gaussian RBF” and the decision to use data-centred bases remain modelling assumptions too.

## Checkpoint

Which quantity changes directly when the RBF width changes while inputs and centres stay fixed?

- A. The design matrix entries.
- B. The number of observed targets necessarily changes.
- C. The observed targets themselves change.

<details>
<summary>Answer and explanation</summary>

A. Each basis evaluation depends on r. The observed dataset and the number of targets remain fixed in this comparison.

</details>

## Teach-back

Explain what changes when r changes, how that differs from changing alpha, and why integrating alpha and sigma does not yet integrate r.

**Source boundary:** Lecture 7, slides 12, 13. Original figures are source material; derivations, numerical examples, corrections and checkpoints here are supplemental teaching, not additional slide claims.
