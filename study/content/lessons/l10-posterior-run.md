# Read the NUTS run as conditioned inference, not new data

## Prerequisite bridge

**Posterior update:** For fixed observations, the latent probability is distributed according to prior times likelihood, normalised.

**Warmup versus sampling:** Adaptation before retained draws has a different purpose from estimating posterior expectations.

## Three different numbers describe different things

The source generates 25 Bernoulli outcomes with simulation setting $p=0.7$. It prints empirical proportion 0.600. Therefore the realised dataset contains 15 successes and 10 failures. The generating probability, realised frequency and posterior mean are distinct:

- $0.7$: the chosen probability used to simulate data.
- $15/25=0.6$: the observed proportion, also the Bernoulli maximum-likelihood estimate.
- $16/27\approx0.5926$: the exact posterior mean under the supplied Beta(1,1) prior.

Simulation does not guarantee a frequency of 0.7 in a small finite dataset. During inference the realised observations stay fixed; the sampler does not regenerate them on each transition.

## Decode each line

```python
kernel = NUTS(model_bernoulli)
mcmc = MCMC(kernel, num_samples=1000, num_warmup=500)
rng_key = jax.random.key(0)
mcmc.run(rng_key, hypers=beta_hyper, y=y_train)
```

The kernel supplies a transition mechanism for the declared model. The `MCMC` object controls warmup and retained draws. The run conditions the observation site on `y_train`; the prior still uses `beta_hyper`. It targets $p(\theta\mid\mathbf y)$ rather than the prior or the distribution of future observations.

The 500 warmup transitions allow adaptation and are not part of the 1000 retained posterior draws requested here. Warmup is not a mathematical certificate that stationarity has been reached. No explicit `num_chains` is provided; this source configuration uses the library's single-chain default ([MCMC reference](https://num.pyro.ai/en/stable/mcmc.html#mcmc)). Additional independently initialised chains are important for stronger convergence assessment.

The 1000 draws do not equal 1000 independent pieces of information. They form a correlated chain; the effective sample size for a quantity can be substantially smaller. Every state matters, including repetitions after rejected proposals. Blindly keeping only accepted states would distort the chain's intended stationary distribution.

## A benchmark available without running any code

For this conjugate example, the exact posterior is Beta(16,11). A sampler's histogram should approximate that density, and its estimated moments should be compatible with their exact values within Monte Carlo uncertainty. A finite histogram is not expected to match the analytic curve pixel for pixel. A discrepancy calls for checking target specification, numerical diagnostics and Monte Carlo error rather than rewriting the exact update to match a simulation.

## Posterior samples are not posterior predictive samples

After obtaining draws $\theta^{(s)}$, a new outcome can be generated with $y_*^{(s)}\sim\operatorname{Bernoulli}(\theta^{(s)})$. Equivalently, a prediction of success probability averages the parameter draws. This extra operation incorporates both uncertainty in $\theta$ and randomness of a new trial. The source's `mcmc.run` call alone returns an inference run, not a completed posterior predictive check.

For a new **batch** sharing one probability, generate the whole batch conditional on one posterior draw before moving to the next draw. This retains dependence caused by shared parameter uncertainty. The source scalar model needs an appropriate observation-shape declaration for such a batch.

**Misconception:** choosing NUTS does not make conjugacy disappear. The exact result remains a valuable validation target even though the lecture deliberately demonstrates a general-purpose approximation.

## Checkpoint

Does num_warmup=500 and num_samples=1000 give 1500 retained independent posterior draws? A. Yes. B. No: warmup is excluded, and retained draws need not be independent.

<details>
<summary>Answer and explanation</summary>

B. Warmup is for adaptation; the requested retained sample count is 1000. Those samples may be correlated, so effective sample size need not be 1000.

</details>

## Teach-back

Translate the printed NUTS configuration into its statistical target, retained-sample meaning, exact benchmark and separate predictive task.

**Source boundary:** Lecture 10, slides 16. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
