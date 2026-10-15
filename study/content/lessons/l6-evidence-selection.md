# Select hyperparameters with evidence, not training fit

## Prerequisite bridge

Read the Gaussian log-density as a fit term plus a normalisation term. Validation chooses settings on held-out data; evidence uses the training dataset’s marginal density.

## A computable objective

Slide 13 proposes either a grid over positive $\alpha,\sigma^2$ or iterative gradient optimisation. In practice it is convenient to work in their logs to ensure positivity. Maximising log evidence and evidence gives the same optimum because logarithm is strictly increasing.

The exact Gaussian expression is

$$\ell=-\frac12\log|C|-\frac12\mathbf y^{\mathsf T}C^{-1}\mathbf y-\frac N2\log(2\pi).$$

The determinant matters: increasing covariance can make a particular residual less surprising, but spreads density over a larger region. Evidence balances these effects within the specified model and prior family.

## Supporting one-dimensional calculation

For a scalar dataset with fixed observation $y\ne0$ and freely adjustable variance $c$, ignore the constant and write

$$\ell(c)=-\tfrac12\log c-\frac{y^2}{2c}.$$

Then

$$\ell'(c)=-\frac1{2c}+\frac{y^2}{2c^2}=0\quad\Longrightarrow\quad c=y^2.$$

Taking $c$ to infinity makes the density approach zero, not improve forever. Taking $c$ to zero also makes a nonzero observation extremely unlikely. In regression $C$ is structured by features and two hyperparameters, so this toy optimum is not a regression tuning rule; it isolates why normalisation changes the optimisation.

## What “no validation set” means

The source’s claim is about choosing hyperparameters by this evidence objective. It does not say that performance estimates may be reported using the same data without qualification, nor that evidence optimisation cannot overfit a very flexible modelling process. An independent evaluation set or other appropriate assessment still tests generalisation.

Grid evaluation can reveal broad ridges and multiple promising regions that one optimiser misses. A point estimate may be unstable on a broad ridge even if the fitted function looks stable. Numerical evaluation should use linear solves and a stable log determinant rather than explicitly forming a matrix inverse; that is a computational explanation, not code supplied by the slides.

**Misconception:** Evidence optimisation is not full Bayesian inference. The objective integrates weights, but the final procedure selects one pair of hyperparameters instead of averaging over their posterior.

## Checkpoint

Does evidence tuning on all training data imply no independent performance assessment is useful? A. Yes. B. No.

<details>
<summary>Answer and explanation</summary>

B. Hyperparameter selection and generalisation assessment are different tasks. The source avoids a tuning split for the evidence criterion, not all evaluation.

</details>

## Teach-back

Explain why optimising evidence can use the training data without a separate tuning split, and why that does not remove the need to assess generalisation.

Source: Lecture 6, slides 13. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
