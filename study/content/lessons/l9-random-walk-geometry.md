# Why small steps and large steps can both fail

## Prerequisite bridge

**Gaussian covariance:** Eigenvectors describe principal directions and the square roots of covariance eigenvalues give their standard-deviation scales.

**Random-walk displacement:** Independent, zero-mean increments add variances rather than adding their signed displacements coherently.

## Acceptance is not exploration

A symmetric random-walk proposal $\boldsymbol\theta'=\boldsymbol\theta+r\mathbf z$, $\mathbf z\sim\mathcal N(0,I)$, has scalar step scale $r$. A tiny $r$ can make almost every candidate acceptable because neighbouring densities are similar, yet successive positions hardly change. A large $r$ can cross a narrow high-probability region and land where target density is tiny, causing repeated rejection. Both produce highly correlated chains for different reasons.

Slide 12 compares 100, 1000 and 100,000 samples: gold histograms are placed above grey traces running downwards in sample order, with horizontal parameter θ and a blue target density. These samples are dependent, so a larger displayed count is not the same as that many IID draws. Slides 13–14 then compare correlated targets and proposal scales. The source labels r=0.1 with 10/100 rejections, r=0.2 with 20/100 and r=1.0 with 71/100. These are source annotations, not new measurements. Keep target geometry, proposal geometry and realised chain behaviour separate. A target contour indicates relative density, not a time trajectory; a trace shows the realised trajectory, not a density contour.

![Original narrow local proposal against target contours](assets/lecture-09/page-16.png)

![Original too-large-direction illustration](assets/lecture-09/page-19.png)

These are source examples, not measurements of a new implementation. Read the plotted directional extents before comparing proposal size. The argument is not “all correlation is bad”; the difficulty is failing to match a target's anisotropy with the proposal geometry.

## Derive the squared-distance heuristic

For an ideal unconstrained walk with independent zero-mean increments of variance $r^2$ along one direction, after $L$ increments the displacement variance is $Lr^2$, hence typical displacement scale $r\sqrt L$. To cover a target's long scale $\sigma_{\max}$, equate these scales:

$$r\sqrt L\sim\sigma_{\max}\quad\Longrightarrow\quad L\sim\left(\frac{\sigma_{\max}}r\right)^2.$$

The lecture prints this as $L\ge(\sigma_{\max}/r)^2$. It is an explanatory scaling heuristic, not a general lower-bound theorem or a guarantee that a sample becomes independent after precisely $L$ transitions. Rejections, restoring target forces, dimension and multimodality complicate the real chain.

To avoid repeatedly jumping across the narrow direction, a simple isotropic walk must use a scale controlled by $\sigma_{\min}$. Then the long-direction exploration cost can grow roughly like $(\sigma_{\max}/\sigma_{\min})^2$. This explains why severe anisotropy is costly. The source's $r\le\sigma_{\min}$ language is not an exact universal constraint; optimal scaling also depends on dimension, proposal and the target family.

## Worked numerical contrast

Suppose principal target SDs are 0.1 and 10. Choosing $r=0.1$ gives a long-direction heuristic cost $(10/0.1)^2=10{,}000$ steps. Halving $r$ quadruples that count to 40,000. Doubling $r$ reduces the ideal-walk estimate to 2500 but may sharply increase rejection across the narrow direction, undermining the assumed movement rate. Neither arithmetic alone selects the best sampler.

A proposal covariance aligned with the target, or a reparameterisation that rescales/rotates it, can help. For known Gaussian covariance $\Sigma=AA^{\mathsf T}$, the transformed coordinate $z=A^{-1}(\theta-\mu)$ has identity covariance. In real problems that geometry may be unknown or vary with position; a fixed transformation is not a cure for every funnel or separated mode.

**Misconception:** very high acceptance is not automatically excellent MCMC, and low acceptance is not the only sign of poor efficiency. Compare exploration and MCSE per computational cost.

## Checkpoint

If the long target scale is fixed, reducing the random-walk step scale by a factor of 3 changes the diffusive step-count heuristic how? A. Divides it by 3. B. Multiplies it by 9. C. Guarantees independence.

<details>
<summary>Answer and reasoning</summary>

**B.** The heuristic scales as 1/r². This describes diffusive displacement, not an exact mixing-time or independence guarantee.

</details>

## Teach-back

Use target and proposal geometry to explain both tiny-step and oversized-step failure, then derive the squared-length-ratio heuristic and state its limitations.

**Source boundary:** Lecture 9, slides 12, 13, 14, 15, 16. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
