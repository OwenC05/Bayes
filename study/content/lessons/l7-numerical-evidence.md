# Numerical evidence: grid quadrature is not iid Monte Carlo

## Prerequisite bridge

**Expectation:** An integral of a function times a probability density is an expectation under that distribution.

**Log-uniform prior:** Equal-volume cells in log alpha and log sigma have equal prior mass under bounded uniform log-coordinate priors.

## Two routes to the same integral

Let $\theta=(\alpha,\sigma)$ and $L(\theta,r)=p(\mathbf y\mid\alpha,\sigma^2,r)$. We want

$$Z(r)=p(\mathbf y\mid r)=\mathbb E_{p(\theta)}[L(\theta,r)].$$

The slides call the approximation a Monte-Carlo average, then use a regular log grid. Both can approximate this expectation, but their sampling and error arguments differ.

**Independent Monte Carlo:** draw $\theta_1,\ldots,\theta_S$ independently from the stated prior. Then

$$\widehat Z_{MC}(r)=\frac1S\sum_{s=1}^S L(\theta_s,r).$$

This is unbiased when the expectation exists. If the likelihood has finite variance under the prior, the estimator variance is $\operatorname{Var}[L]/S$. A particular estimate is still noisy; its logarithm is not in general unbiased for $\log Z$.

**Deterministic grid:** partition the prior support into cells and evaluate a representative point in each cell. If $q_s$ is the prior probability of cell $s$,

$$\widehat Z_{grid}(r)=\sum_s q_sL(\theta_s,r),\qquad\sum_s q_s=1.$$

Equal midpoint cells in the log rectangle have $q_s=1/S$. This gives the same-looking arithmetic average, but grid points are not independent random draws. The iid variance formula is not a grid error guarantee. A grid can miss a narrow peak between nodes; refine it and inspect sensitivity. Endpoint quadrature, unequal cell widths or nonuniform prior density require corresponding weights.

## A worked evidence average

Suppose three equal-prior-mass cells have likelihoods $[1,4,1]$ at width $r_A$ and $[2,2,1]$ at $r_B$. Then $\widehat Z(r_A)=2$ while $\widehat Z(r_B)=5/3$. The first width wins by integrated evidence. If cells instead have prior masses $[0.1,0.1,0.8]$, the same values give 1.3 and 1.2. This demonstrates why grid measure belongs in the computation. The numbers are teaching examples, not extracted outputs.

When likelihoods are extremely small, calculate on the log scale. With $\ell_s=\log L_s$ and $m=\max_s\ell_s$,

$$\log\widehat Z=m+\log\left(\sum_s q_s e^{\ell_s-m}\right).$$

This log-sum-exp rearrangement avoids underflow without changing the mathematical target. Retain normalising constants for evidence comparisons.

## Read the original width plot

![Original comparison of test RMS error and negative log evidence against basis width](assets/lecture-07/page-10.png)

Slide 16 shows gold RMS test error on the left axis and dashed red negative log evidence on the right. Lower red values mean higher evidence. Both curves favour an intermediate region rather than the extremes, but their minima differ visibly. Do not compare vertical heights across their different units. Do not report exact optima not tabulated in the source, or reinterpret the displayed test curve as a tuning criterion used by the evidence method.

The result establishes an example of model-based width selection, not guaranteed minimum future error. With no $p(r)$ factor this is evidence maximisation over $r$. A posterior mode requires specifying $p(r)$ and its coordinates; a flat prior in $r$ and one flat in $\log r$ do not imply the same raw-coordinate MAP.

**Misconception:** uniform prior-grid weights are appropriate for the **evidence integral**. After seeing data, predictions require posterior weights, which generally are not uniform.

## Checkpoint

A regular log grid has equal prior-cell masses. Are its points iid Monte-Carlo draws?

- A. Yes: any numerical sum is Monte Carlo.
- B. No: it is deterministic quadrature, although its sum can resemble a Monte-Carlo average.
- C. No: therefore it cannot approximate an integral.

<details>
<summary>Answer and explanation</summary>

B. The target expectation can be shared, but point construction and error assessment differ. Deterministic quadrature can still be a useful approximation.

</details>

## Teach-back

Contrast a deterministic log-grid evidence average with an iid prior Monte-Carlo estimate, and explain what the two minima on the source r plot do and do not prove.

**Source boundary:** Lecture 7, slides 15, 16. Original figures are source material; derivations, numerical examples, corrections and checkpoints here are supplemental teaching, not additional slide claims.
