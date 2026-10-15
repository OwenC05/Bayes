# What Lecture 5 establishes—and what remains a preview

## What we have actually learned

A fixed basis-function model plus independent Gaussian observation noise gives least squares as maximum likelihood. A zero-mean Gaussian weight prior gives a Gaussian posterior:

$$p(\mathbf w\mid\mathbf y,\alpha,\sigma^2)=\mathcal N(\mathbf w;\boldsymbol\mu,\boldsymbol\Sigma).$$

The posterior mean and MAP coincide with ridge under $\lambda=\sigma^2\alpha$. However, the full posterior retains the weight covariance and thereby describes a distribution of possible fitted functions.

This answers the slide's question, “Have we merely repeated least squares?” We obtained a familiar central estimate **inside a richer uncertainty model**. Keeping only that estimate would discard the main extra information.

## Explicit previews, not completed derivations

Slide 23 points forward to:

1. **Accounting for uncertainty in the weights when predicting.** A central curve is not yet a complete predictive distribution. Lecture 5 does not derive the full regression predictive formula.
2. **Choosing the prior precision $\alpha$ without needing a validation set, while also estimating noise variance $\sigma^2$.** The demonstration so far fixed these quantities. The methods and evidence calculations for fitting them are not derived here.
3. **Selecting the model itself**, for example the fixed RBF width $r$. “Fixed” meant held constant during the weight-inference calculation, not intrinsically known or forever unchangeable.

Do not memorise unexplained formulas for these later methods as if they were contained on this slide. Their derivations belong to later material.

## Explain Lecture 5 to a beginner

> We predict a number by combining fixed building blocks with adjustable weights. Least squares picks weights that fit the observations. A penalty discourages extreme weights. A Gaussian noise model explains least squares as maximum likelihood; a Gaussian prior explains the penalty as a prior preference. Bayes then provides not just one set of weights but a Gaussian distribution over them. New observations update that distribution, making suitable function curves more plausible and reducing uncertainty where the observations provide information.

## Final distinctions to keep straight

| Quantity | Role |
|---|---|
| $\mathbf w$ | Unknown weights inferred from targets |
| $\sigma^2$ | Observation-noise variance |
| $\alpha$ | Prior precision of each weight |
| $\lambda=\sigma^2\alpha$ | Equivalent ridge penalty under this convention |
| $r$ and $c_m$ | Fixed RBF width and centres during this inference |
| $\boldsymbol\Sigma$ | Posterior covariance over weights |

Being able to explain the role of each quantity is more useful than recognising a long inverse-matrix formula without understanding it.

## Teach-back

Explain what full Bayesian regression adds beyond the ridge weight vector, and name the three topics that this lecture signposts rather than derives.

Source: Lecture 5, slides 23. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
