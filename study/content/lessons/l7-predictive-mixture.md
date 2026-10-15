# Predict with posterior-weighted components

## Prerequisite bridge

**Conditional predictive:** Integrating Gaussian weight uncertainty produces variance equal to observation noise plus projected posterior weight covariance.

**Bayes on grid cells:** Posterior cell mass is proportional to likelihood times prior cell mass, followed by normalisation.

## Fix a width, but do not fix all other unknowns

Slide 17 first replaces $r$ by $\widehat r_{MP}$. The resulting prediction is conditional on this selected width. We write its suppressed conditioning explicitly:

$$p(y_*\mid\mathbf y,\widehat r)=\iint p(y_*\mid\mathbf y,\alpha,v,\widehat r)\,p(\alpha,v\mid\mathbf y,\widehat r)\,d\alpha\,dv.$$

The source calls the resulting quantity $p(y_*\mid\mathbf y)$, but this is still an approximation to the full prediction with uncertain $r$. It integrates weights analytically and scales numerically, not width uncertainty yet.

## Derive a conditional Gaussian component

For grid point $s$, let $v_s=\sigma_s^2$, and use the width-specific $\Phi$. The weight posterior is

$$\Sigma_s=(\alpha_s\mathbf I+v_s^{-1}\Phi^{\mathsf T}\Phi)^{-1},\qquad\mu_s=v_s^{-1}\Sigma_s\Phi^{\mathsf T}\mathbf y.$$

For $\phi_*=(\phi_1(x_*),\ldots,\phi_M(x_*))^{\mathsf T}$, the new observation is $y_*=\phi_*^{\mathsf T}\mathbf w+\epsilon_*$. Linear Gaussian integration gives

$$p(y_*\mid\mathbf y,\alpha_s,v_s,\widehat r)=\mathcal N(y_*;m_s,V_s),$$

$$m_s=\phi_*^{\mathsf T}\mu_s,\qquad V_s=v_s+\phi_*^{\mathsf T}\Sigma_s\phi_*.$$

The second term carries weight uncertainty; the first is new-observation noise. For the latent noise-free function, omit $v_s$. A mean curve alone displays neither variance.

## Correct the printed unnormalised sum

The source’s final line multiplies component predictives by evidence values with a $1/S$ factor. As printed, it is not a normalised predictive density; it also suppresses $\mathbf y$ in component conditioning and switches scale notation. The consistent grid form uses prior cell masses $q_s$ and likelihoods $L_s=p(\mathbf y\mid\alpha_s,v_s,\widehat r)$:

$$\omega_s=\frac{q_sL_s}{\sum_jq_jL_j},\qquad p(y_*\mid\mathbf y,\widehat r)\approx\sum_s\omega_s\mathcal N(y_*;m_s,V_s).$$

On an equal-prior-mass log grid, $\omega_s=L_s/\sum_j L_j$, **not** $1/S$. In a raw-coordinate grid, $q_s$ includes the prior density and cell volume. Do not count a log-uniform prior twice by using equal log-cell masses and multiplying again by raw $1/\alpha_s$ and $1/v_s$ factors.

If samples are iid from the **prior**, the same normalised likelihood weights give a self-normalised importance approximation. If samples are from the **posterior**, average components directly; multiplying by another posterior density double-counts the posterior. Grid density values alone are not discrete probabilities.

## Worked mixture and uncertainty decomposition

Take two equal-prior-mass cells with likelihoods 1 and 3. Their posterior weights are $1/4$ and $3/4$. Suppose $m_1=0$, $m_2=2$, $V_1=1$, $V_2=4$. Then

$$\bar m=\sum_s\omega_sm_s=1.5,$$

$$\operatorname{Var}(y_*\mid\mathbf y,\widehat r)\approx\sum_s\omega_s\big[V_s+(m_s-\bar m)^2\big]=3.25+0.75=4.$$

The 3.25 is average conditional variance, including noise and weight uncertainty. The 0.75 is disagreement among conditional means due to uncertain hyperparameters. Averaging means and calling their spread the entire uncertainty would omit within-component variance; averaging only $V_s$ omits mixture disagreement. A Gaussian mixture need not be Gaussian even though these moments exist.

![Source mean prediction with optimised width](assets/lecture-07/page-11.png)

Slide 18 shows observed points, a solid red predictive mean and a gold dashed reference. It is not an uncertainty-band plot and does not display the omitted $r$ uncertainty. The close visual fit in this example is not proof that all predictive probabilities are calibrated.

## Checkpoint

For equal prior masses and evidence values [1,3], what are the predictive mixture weights?

- A. [1/2,1/2].
- B. [1/4,3/4].
- C. [1,3] without normalisation.

<details>
<summary>Answer and explanation</summary>

B. Bayes reweights the prior by the likelihood, then divides by total evidence. The weights must sum to one for the predictive mixture to integrate to one.

</details>

## Teach-back

Derive posterior grid weights and the mixture mean and variance. Which uncertainties are retained, and why is r still a plug-in approximation?

**Source boundary:** Lecture 7, slides 17, 18. Original figures are source material; derivations, numerical examples, corrections and checkpoints here are supplemental teaching, not additional slide claims.
