# MAP estimation and its exact connection to ridge

## MAP keeps a single most plausible weight vector

Maximum a posteriori estimation chooses the posterior's mode:

$$\hat{\mathbf w}_{MAP}=\operatorname*{arg\,max}_{\mathbf w}p(\mathbf w\mid\mathbf y,\alpha,\sigma^2).$$

For continuous weights, “most probable value” is shorthand for **highest posterior density**. An individual vector still has probability zero under a continuous density.

The evidence in Bayes' rule does not depend on $\mathbf w$. Taking negative logs gives an equivalent minimisation:

$$E_{MAP}(\mathbf w)=-\log p(\mathbf y\mid\mathbf w,\sigma^2)-\log p(\mathbf w\mid\alpha),$$

up to a constant independent of the weights.

## Connect each term to the previous lessons

Removing only weight-independent constants,

$$E_{MAP}(\mathbf w)=\frac1{2\sigma^2}\lVert\mathbf y-\boldsymbol\Phi\mathbf w\rVert^2+\frac\alpha2\lVert\mathbf w\rVert^2.$$

Multiply the whole objective by the positive number $\sigma^2$. This changes objective values but not its minimiser:

$$\sigma^2E_{MAP}(\mathbf w)=\frac12\lVert\mathbf y-\boldsymbol\Phi\mathbf w\rVert^2+\frac{\sigma^2\alpha}{2}\lVert\mathbf w\rVert^2.$$

Compare with the lecture's ridge objective. Exactly under this convention,

$$\lambda=\sigma^2\alpha,\qquad\hat{\mathbf w}_{MAP}=\hat{\mathbf w}_{PLS}=\boldsymbol\mu.$$

The last equality holds because the Gaussian posterior's mode equals its mean. A different scaling convention for fitting error or penalty changes the numerical definition of $\lambda$, so do not copy this relation blindly into unrelated software.

## What is gained—and what is discarded?

The Bayesian model explains the penalty as a prior preference and provides the full posterior covariance as well as the mean. MAP uses that model but retains only its best-density point.

In the previous scalar example, MAP and ridge both give $4/3$. Full inference gives $\mathcal N(4/3,1/3)$. Two posteriors could have the same mode and very different uncertainty; the point alone cannot distinguish them.

The scare quotes around “Bayesian” in the slide's shortcut are a warning: MAP is useful, but it is **not the same as averaging predictions over posterior uncertainty**.

## Noise and prior strength have different roles

At fixed $\alpha$, a larger assumed observation-noise variance makes the data less informative relative to the prior, increasing the equivalent $\lambda$. At fixed $\sigma^2$, increasing $\alpha$ strengthens concentration around small weights. Neither parameter should be confused with a fitted weight.

**Misconception:** posterior mean equals MAP here because the posterior is Gaussian, not because all Bayesian estimates coincide.

## Teach-back

Derive lambda = sigma-squared times alpha under this lecture’s objective convention. Why is retaining only MAP not the full Bayesian result?

Source: Lecture 5, slides 16. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
