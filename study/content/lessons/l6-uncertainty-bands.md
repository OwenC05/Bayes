# Read predictive bands where data are present and absent

## Prerequisite bridge

Use the predictive variance decomposition. A one-standard-deviation band is built from square roots of variances, not by adding standard deviations.

## Two uncertainty contributions, one observation prediction

Slide 26 shows the Type-II fitted mean with darker parameter-uncertainty shading and lighter outer shading including observation noise. Black points are training observations; the dashed reference curve supplies information available in the demonstration, not ordinarily known from data alone.

At each input, define

$$s_f^2(x)=\boldsymbol\phi(x)^{\mathsf T}\boldsymbol\Sigma\boldsymbol\phi(x),\qquad s_y^2(x)=s_f^2(x)+\widehat\sigma^2.$$

A latent-function band uses mean $\pm s_f(x)$; a new-observation band uses mean $\pm s_y(x)$. The light region should not be interpreted as a separately additive standard-deviation thickness equal to $\widehat\sigma$.

## Supporting width calculation

If $s_f^2=0.04$ and observation variance is 0.09, the latent half-width is 0.2 and the observation half-width is $\sqrt{0.13}\approx0.361$. It is not $0.2+0.3=0.5$. The variances add because the two random contributions are independent conditional on selected hyperparameters.

For a Gaussian at a fixed input, one standard deviation around the mean contains about 68% probability under that conditional model. This is a pointwise statement, not a 68% simultaneous guarantee that a whole function lies inside the plotted region.

## Missing data changes what is known

Slide 27 is annotated “Trained on 7 out of 15 data points”. The observed region constrains weights relevant there. Away from it, the red mean differs from the dashed reference and the parameter band broadens. This is the useful behaviour marginalisation can display even when a single curve would look overly definite.

The width is determined by feature geometry and the conditional weight covariance, not merely distance to the nearest input. Under an RBF model, far from every basis centre the feature vector can approach zero; the model may then revert toward its zero-function prior mean with small latent variance. Therefore growing uncertainty is what these figures show, not a universal guarantee for all extrapolation with every basis family.

## Model uncertainty is outside these bands

Both bands remain conditional on the selected basis family, width and Type-II hyperparameters. Misspecified noise, missing features, or an inappropriate basis can make a model confidently wrong. The figures demonstrate parameter and observation uncertainty, not every source of possible modelling error.

**Recall:** More data can reduce parameter uncertainty, but irreducible future observation noise need not vanish. More data can also change the selected noise estimate, so comparisons across fitted models are not the same as holding hyperparameters fixed.

## Checkpoint

If function variance is 0.04 and noise variance is 0.09, what is the observation-band half-width at one standard deviation? A. 0.13. B. 0.5. C. About 0.361.

<details>
<summary>Answer and explanation</summary>

C. Add variances and then take the square root. A is the variance; B incorrectly adds standard deviations.

</details>

## Teach-back

Interpret both predictive plots. Why does uncertainty grow in an unobserved region, and why is a narrow band not a guarantee that the model is right?

Source: Lecture 6, slides 26, 27. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
