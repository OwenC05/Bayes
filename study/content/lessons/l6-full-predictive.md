# The full predictive distribution and its nuisance variables

## Prerequisite bridge

Use the sum/product rules and Bayes’ rule. A nuisance variable is an unknown that is not the final quantity being predicted, not an irrelevant quantity.

## What is actually wanted?

Slide 5 asks for $p(y_*\mid x_*,\mathbf y)$: a distribution of a future observation at a known new input. Training inputs, basis functions and the test input are suppressed in subsequent notation. They have not disappeared from the model.

Slides 6–7 promote $\alpha$ and $\sigma^2$ from fixed settings to uncertain quantities. Specify hyperpriors and form

$$p(\mathbf w,\alpha,\sigma^2\mid\mathbf y)\propto p(\mathbf y\mid\mathbf w,\sigma^2)p(\mathbf w\mid\alpha)p(\alpha)p(\sigma^2).$$

The factorisation assumes independent hyperpriors as written. The target-generating likelihood depends directly on weights and noise, while $\alpha$ acts through the prior over weights.

## Average rather than select

The full prediction is

$$p(y_*\mid\mathbf y)=\int p(y_*\mid\mathbf w,\sigma^2)p(\mathbf w,\alpha,\sigma^2\mid\mathbf y)\,d\mathbf w\,d\alpha\,d\sigma^2.$$

This is a weighted mixture of predictions: combinations inconsistent with the training data receive little posterior weight, not an equal vote. The integral is over parameters, not over the future target we want to describe.

The normaliser is

$$p(\mathbf y)=\int p(\mathbf y\mid\mathbf w,\sigma^2)p(\mathbf w\mid\alpha)p(\alpha)p(\sigma^2)\,d\mathbf w\,d\alpha\,d\sigma^2.$$

This fully marginalised evidence differs from $p(\mathbf y\mid\alpha,\sigma^2)$, where only weights have been integrated out. Always inspect what remains to the right of the conditioning bar.

## Supporting finite-mixture analogy

Imagine two hyperparameter settings have posterior probabilities 0.6 and 0.4. Their conditional predictions have means 1 and 3 and variances 0.2 and 0.5. The mixture mean is $0.6(1)+0.4(3)=1.8$. Its variance is

$$0.6(0.2)+0.4(0.5)+0.6(1-1.8)^2+0.4(3-1.8)^2=1.28.$$

Averaging just the conditional variances gives 0.32 and misses disagreement between settings. This explains why hyperparameter uncertainty can matter even after weights are marginalised. A continuous mixture need not be Gaussian.

**Source boundary:** Slides 5–7 give the integrals, not this numerical mixture. Their intractability warning is generic; analytic tractability depends on model and prior choices. Proper priors are needed to interpret fully normalised model evidence without arbitrary constants.

## Checkpoint

What is integrated in p(y | alpha, sigma²)? A. Only weights. B. All hyperparameters too. C. The observed data.

<details>
<summary>Answer and explanation</summary>

A. Alpha and noise remain conditioned on. Integrating them under their priors gives fully marginalised evidence; the observed dataset is held fixed during that integration.

</details>

## Teach-back

Write the fully Bayesian predictive integral and explain the roles of likelihood, weight prior, hyperpriors and the normalising evidence.

Source: Lecture 6, slides 5, 6, 7. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
