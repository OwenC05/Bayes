# Bounded log priors and consistent integration measures

## Prerequisite bridge

**Substitution in an integral:** If sigma changes to v = sigma-squared, the integration element and density must both change.

**Proper prior:** A proper density integrates to one; finite positive log-scale bounds provide a normalisation constant.

## Preserve the source, then make the measure precise

Slide 14 writes

$$p(\mathbf y\mid r)=\iint p(\mathbf y\mid\alpha,\sigma^2,r)\,p(\alpha)\,p(\sigma)\,d\alpha\,d\sigma,$$

after performing the weight integral. Its likelihood uses $\sigma^2$, but its integration variable is $\sigma$. That is valid: evaluate a variance-$\sigma^2$ likelihood while integrating over standard deviation. The ambiguity arises only if the measure or prior is switched to variance without transformation.

The slide says the priors are constant **over logarithms**, with $\alpha\in[10^{-12},10^{12}]$ and $\sigma\in[10^{-6},10^2]$. These statements do not mean constant raw-coordinate densities.

## Derive the normalised densities

Let $u=\ln\alpha$. A uniform density over $u\in[\ln a,\ln b]$ is $1/\ln(b/a)$. Since $du=d\alpha/\alpha$,

$$p(\alpha)=\frac{1}{\alpha\ln(b/a)},\quad a\leq\alpha\leq b,\qquad a=10^{-12},\quad b=10^{12}.$$

Likewise, with $c=10^{-6}$ and $d=10^2$,

$$p(\sigma)=\frac{1}{\sigma\ln(d/c)},\quad c\leq\sigma\leq d.$$

Both are zero outside their bounds. The first normalising log width is $24\ln10$; the second is $8\ln10$. Equal ratios, not equal differences, receive equal prior probability. For example, the intervals $[1,10]$ and $[10,100]$ have equal probability if both lie inside the support.

Now let $v=\sigma^2$, so $d\sigma/dv=1/(2\sqrt v)$. Then

$$p(v)=p(\sqrt v)\frac1{2\sqrt v}=\frac1{2v\ln(d/c)}=\frac1{v\ln(d^2/c^2)},\quad v\in[10^{-12},10^4].$$

Writing $p(\sigma^2)=p(\sigma)$ as though the densities were numerically equal would be incorrect. Their probabilities agree after multiplication by their respective integration elements.

## Why a log grid is convenient

Set $z=\ln\sigma$ and define $L(\alpha,\sigma,r)=p(\mathbf y\mid\alpha,\sigma^2,r)$. Substitution gives

$$p(\mathbf y\mid r)=\frac1{\ln(b/a)\ln(d/c)}\int_{\ln a}^{\ln b}\int_{\ln c}^{\ln d}L(e^u,e^z,r)\,dz\,du.$$

The inverse-scale factors are cancelled by $d\alpha=\alpha\,du$ and $d\sigma=\sigma\,dz$. They are not arbitrarily dropped. This identity is the reason equally sized midpoint cells in log space can use equal prior weights. Using base-10 logs instead gives an equivalent integral with the corresponding constant log widths and Jacobians.

## Proper does not mean assumption-free

An unbounded $1/\alpha$ or $1/\sigma$ prior is improper. The lecture’s finite bounds avoid that issue. Evidence depends on the normalised prior, including its support. A very wide prior can distribute substantial mass in poorly predictive regions. Bounds should not be changed opportunistically between models to improve the winner, and posterior mass near a boundary signals a need for sensitivity checking.

**Recall:** both $d\sigma$ and $d\sigma^2$ are legitimate choices. A consistent density-measure pair, not a preferred symbol, determines the correct integral.

## Checkpoint

A prior is uniform in log sigma on a bounded interval. What is its density in v = sigma-squared?

- A. Constant in v.
- B. Proportional to 1/v, with squared support bounds and normalisation.
- C. Proportional to v.

<details>
<summary>Answer and explanation</summary>

B. The substitution sigma = square-root of v contributes 1/(2 square-root of v), giving 1/v after combining it with the 1/sigma density.

</details>

## Teach-back

Derive the densities for alpha, sigma and sigma-squared under the stated bounded log-uniform priors, and show why integration in log coordinates removes the inverse-scale factors.

**Source boundary:** Lecture 7, slides 14. Original figures are source material; derivations, numerical examples, corrections and checkpoints here are supplemental teaching, not additional slide claims.
