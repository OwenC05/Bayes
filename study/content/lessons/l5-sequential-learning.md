# Sequential learning in weight space and function space

## The previous posterior becomes the next prior

With fixed inputs, features, $\alpha$ and $\sigma^2$, conditional independence gives

$$p(\mathbf w\mid y_1,y_2,y_3)\propto p(y_3\mid\mathbf w)p(y_2\mid\mathbf w)p(y_1\mid\mathbf w)p(\mathbf w).$$

Grouping the first update,

$$p(\mathbf w\mid y_1,y_2,y_3)\propto p(y_2,y_3\mid\mathbf w)\,p(\mathbf w\mid y_1).$$

Thus the posterior after the first $K$ observations serves as the prior for the remaining observations. Multiplying the same likelihood factors in any order yields the same final posterior, assuming exact calculations and the same fixed model.

**Do not count observations twice:** if the current posterior already includes $y_1$, multiply only the likelihoods of genuinely new observations. Do not multiply the original prior into every update again.

## Supporting algebra: information adds

Let $\boldsymbol\phi_n=(\phi_1(x_n),\ldots,\phi_M(x_n))^{\mathsf T}$ and write the posterior precision after $K$ targets as $A_K$:

$$A_K=\alpha\mathbf I+\sigma^{-2}\sum_{n=1}^{K}\boldsymbol\phi_n\boldsymbol\phi_n^{\mathsf T},\qquad\mathbf b_K=\sigma^{-2}\sum_{n=1}^{K}\boldsymbol\phi_ny_n.$$

Then $\Sigma_K=A_K^{-1}$ and $\mu_K=A_K^{-1}\mathbf b_K$. Each new observation adds its own outer product to precision and its own contribution to $\mathbf b_K$. These are an explanation of the source posterior formula, not an additional algorithm derived on the slides.

## Read the three columns

1. **Left:** observed targets and fixed basis functions. Red rings mark the observations included so far.
2. **Middle:** the two-dimensional marginal distribution over weights 9 and 10, not the entire 15-dimensional posterior. Earlier grey contours provide a visual comparison.
3. **Right:** grey curves produced by sampled weight vectors. The red curve represents the central fitted function, formed from the mean weights.

The grey function curves are **not noisy observed targets**. They show uncertainty about the fitted underlying function through uncertainty in its weights.

## Slide 18: before observing targets

![Prior and the update after seven observations](assets/lecture-05/page-13.png)

The prior over weights 9 and 10 is centred at zero with circular contours: these two weights are initially independent and have equal variance. Sampled functions vary widely. The prior mean function is zero because all prior mean weights are zero.

The complete demonstration displays the original dataset for context, but unringed points have not yet been included in that stage's posterior.

## Slide 19: after seven observations

The first observations lie toward the left of the input domain. The sampled functions agree more strongly there while remaining diverse farther right. Weights 9 and 10, whose blue basis functions are located farther right, remain comparatively uncertain. Gaussian basis tails mean their information need not be exactly unchanged.

## Slide 20: after eight observations

![Posterior updates after eight and fifteen observations](assets/lecture-05/page-14.png)

The added observation moves farther into the domain. The posterior shifts, and the sampled curves become more constrained around that region. The observed targets change the mean; their locations and the fixed noise variance determine how much covariance is reduced.

## Slide 21: after fifteen observations

All original observations have been used. The two-weight contours are now shifted and visibly tilted, revealing posterior correlation. Overlapping RBFs can trade off their contributions, so an independent prior does not require an independent posterior. Function samples are much closer to one another throughout the observed range.

## Slide 22: after two hundred observations

![Posterior and function samples after two hundred observations](assets/lecture-05/page-15.png)

The model now has far more observations but still uses the fixed feature representation. Parameter uncertainty is more concentrated and sampled functions agree closely. Adding data does not automatically add basis functions: the model's weights and features must retain the same meaning for sequential updating to be equivalent to batch updating.

## A small sequential example

For a constant model with prior $\mathcal N(0,1)$ and noise variance 1, observe target 1. Posterior precision becomes $1+1=2$, mean becomes $1/2$, and variance becomes $1/2$. Then observe target 3: precision becomes 3 and the weighted information sum becomes $1+3=4$, giving mean $4/3$ and variance $1/3$. That matches the batch calculation.

**Misconception:** more data do not remove intrinsic observation noise. They can reduce uncertainty about the weights, and only in directions the inputs actually inform. A confidently fitted model can still be misspecified.

## Teach-back

Explain why sequential and batch updating agree, then narrate what changes in each column from the prior to 7, 8, 15 and 200 observations.

Source: Lecture 5, slides 17, 18, 19, 20, 21, 22. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
