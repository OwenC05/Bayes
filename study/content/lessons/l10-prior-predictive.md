# Separate prior parameter draws from prior predictive outcomes

## Prerequisite bridge

**Generative hierarchy:** First draw a parameter, then generate observations conditional on that parameter.

**Expectation:** A marginal event probability averages its conditional probability over the parameter distribution.

## What does y=None change?

The source creates `Predictive(model_bernoulli, num_samples=5)` and calls it with `hypers=[1,1]` and `y=None`. No observations are conditioned on. Each forward execution draws

$$\theta^{(s)}\sim\operatorname{Beta}(1,1),\qquad y^{(s)}\mid\theta^{(s)}\sim\operatorname{Bernoulli}(\theta^{(s)}).$$

The returned `samples["theta"]` holds prior parameter draws. `samples["obs"]` holds simulated observations from the **prior predictive** process. Neither is a posterior sample based on the later training data. This forward-simulation role is described in the [Predictive reference](https://num.pyro.ai/en/stable/utilities.html#predictive). The source function has a scalar unobserved observation site, so five executions produce five scalar outcomes, each paired with its own parameter draw.

The printed source arrays are

```text
Theta: [0.21130666 0.31980485 0.3934319  0.5034159  0.66317576]
Observations: [1 0 0 1 0]
```

These are quoted PDF results, not newly generated results. The first outcome being one when its probability is about 0.21 is possible: probability is not a deterministic threshold rule. Sorting or visual regularity in five numbers is not proof of an algorithmic property.

## Derive the predictive probability

For one trial,

$$P(y=1)=\int_0^1\theta p(\theta)\,d\theta=\frac\alpha{\alpha+\beta}.$$

Under Beta(1,1), this is $1/2$. Five simulated outcomes need not contain precisely half successes. The observed frequency is a random quantity, not a redefinition of the model probability.

There is an important distinction between **new parameter per trial** and **one shared parameter for an entire dataset**. For two outcomes sharing one $\theta$,

$$P(y_1=1,y_2=1)=\mathbb E[\theta^2]=\frac{\alpha(\alpha+1)}{(\alpha+\beta)(\alpha+\beta+1)}.$$

Under the uniform prior this is $1/3$, not $1/4$. The outcomes are conditionally independent given $\theta$, but marginally dependent after $\theta$ is integrated out. Their covariance is $\operatorname{Var}(\theta)$. To simulate a replicated dataset, keep one parameter draw shared across its observation vector; do not replace that model with independently redrawn parameters for every individual trial.

## Why JAX exposes a key

The source creates `rng_key = jax.random.key(seed=0)` and passes it to `Predictive`. JAX uses explicit pseudo-random keys rather than an implicitly advancing global random state. Reusing the same key for the same random operation reproduces the same result; it is not a request for a new independent draw.

For separate independent operations, split a key and pass distinct subkeys ([JAX explicit random-state guide](https://docs.jax.dev/en/latest/random-numbers.html#explicit-random-state)). High-level inference/predictive operations manage random draws internally when supplied an input key. The lecture's separately reset seed-zero snippets are preserved as source code; they should not be mistaken for an example of managing independent streams across a whole application. Exact numerical arrays also depend on the operation and software environment, not merely the integer seed.

**Misconception:** prior predictive checks examine assumptions before observing data. They cannot establish that a posterior sampler has converged, and posterior sampling cannot replace checking whether the prior generative model produces sensible datasets.

## Checkpoint

For two future trials sharing one theta drawn from Beta(1,1), what is the prior predictive probability of two successes? A. 1/4. B. 1/3.

<details>
<summary>Answer and explanation</summary>

B. One shared unknown parameter induces marginal dependence. Integrating theta squared gives one third, whereas multiplying marginal one-half probabilities would incorrectly assume marginal independence.

</details>

## Teach-back

Explain the two arrays returned by Predictive, derive prior predictive dependence, and state why independent JAX operations need distinct random keys.

**Source boundary:** Lecture 10, slides 15. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
