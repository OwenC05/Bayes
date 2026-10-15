# Why Bayesian learning needs stochastic integration

## Start with the question, not the sampling algorithm

Lecture 8 revisits three tasks. A prediction averages possible outcomes over uncertain parameters; a marginal posterior removes nuisance parameters; evidence averages the likelihood over the prior. The algebra looks similar, but the distribution supplying the averaging weights changes.

For a future observation $y_*$,

$$p(y_*\mid\mathbf y,\mathcal M)=\int p(y_*\mid\boldsymbol\theta,\mathcal M)p(\boldsymbol\theta\mid\mathbf y,\mathcal M)\,d\boldsymbol\theta.$$

The first factor asks what a fixed parameter setting predicts. The second describes which parameter settings remain plausible after seeing the training data. We average predictions, not parameter values. Replacing $\boldsymbol\theta$ by its posterior mean is a plug-in approximation and usually produces a different answer.

A parameter marginal instead satisfies

$$p(\theta_1\mid\mathbf y,\mathcal M)=\int p(\theta_1,\theta_2\mid\mathbf y,\mathcal M)\,d\theta_2.$$

Here $\theta_1$ stays free. For each candidate value of it, integrate over all values of the unwanted parameter. Evidence uses the prior:

$$p(\mathbf y\mid\mathcal M)=\int p(\mathbf y\mid\boldsymbol\theta,\mathcal M)p(\boldsymbol\theta\mid\mathcal M)\,d\boldsymbol\theta.$$

Using posterior weights here would count the observed data twice and would not compute the evidence.

## Worked discrete bridge

Suppose the posterior puts probability $0.25$ on a model parameter predicting a future success with probability $0.2$, and $0.75$ on one predicting success with probability $0.8$. The predictive success probability is

$$0.25(0.2)+0.75(0.8)=0.65.$$

The integral is the continuous version of this weighted sum. For evidence, the same likelihood values would be weighted by the **prior**, not by these posterior probabilities.

## Why approximation enters

The Gaussian regression examples of earlier lectures let us perform some integrations analytically. This is exceptional rather than a guarantee. “Intractable” here means no workable analytic closed form in the model being considered; it does not mean the quantity is undefined or impossible to approximate.

Slides 2–3 lay out the route: express a quantity as an expectation, approximate it with random samples, learn inverse-CDF sampling in one dimension, confront high-dimensional geometry, then develop importance sampling. MCMC is only a final preview. Deterministic integration is explicitly deferred.

**Recall:** identify what is fixed and what is random before selecting a numerical method. **Misconception:** stochastic approximation does not make the underlying Bayesian target itself random; repeated computations have random error around a fixed target.

## Checkpoint

Which distribution weights the likelihood in model evidence? A. The posterior. B. The prior. C. A uniform distribution by definition.

<details>
<summary>Answer and reasoning</summary>

**B.** Evidence is the prior average of the likelihood. A posterior average answers a different question.

</details>

## Teach-back

Explain the three Bayesian integrals, naming the variable integrated out and the distribution being averaged over.

Source: Lecture 8, slides 1, 2, 3. Mathematical conditions, derivations and numerical examples are tutor support, not extra claims or reproduced demo output.
