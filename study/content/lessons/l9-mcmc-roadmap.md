# From global proposals to a local sampling chain

## Prerequisite bridge

**Expectation:** An expectation averages a specified function under a specified probability distribution; the function and sampling distribution have different roles.

**Importance sampling:** Proposal draws can be reweighted to a target, but a poor global proposal can give rare, dominant weights.

## Begin with the question, not the sampler

Suppose observed data $\mathcal D$ and a model $\mathcal M$ are fixed. The unknown $d$-vector $\boldsymbol\theta$ contains parameters, not another dataset. We want the predictive density at a particular candidate outcome $y_*$:

$$p(y_*\mid\mathcal D,\mathcal M)=\int p(y_*\mid\boldsymbol\theta,\mathcal M)p(\boldsymbol\theta\mid\mathcal D,\mathcal M)\,d\boldsymbol\theta.$$

Set $f(\boldsymbol\theta)=p(y_*\mid\boldsymbol\theta,\mathcal M)$ and $p(\boldsymbol\theta)=p(\boldsymbol\theta\mid\mathcal D,\mathcal M)$. The target is $F=\mathbb E_p[f]$. Alternatively, $f(\boldsymbol\theta)=\theta_j$ asks for a parameter mean; an indicator asks for an event probability. The sampler supplies inputs to $f$, not answers without a chosen question.

With representative target draws, use

$$\widehat F_R=\frac1R\sum_{r=1}^R f(\boldsymbol\theta^{(r)}).$$

The superscript $(r)$ labels a draw; it is not a power. In Lecture 8 the basic variance proof assumed independent draws. MCMC changes this assumption, so its error analysis must account for dependence.

## What was difficult about importance sampling?

Write $p(\boldsymbol\theta)=P^*(\boldsymbol\theta)/Z$. We can evaluate the nonnegative unnormalised density $P^*$ but not its integral $Z$. Importance sampling draws from a global $Q$ and corrects the mismatch through weights. To represent all important target regions, $Q$ needs appropriate support; to work efficiently, its tails and allocation of mass must also be suitable. In high dimensions this is difficult even if drawing from $Q$ is easy.

MCMC asks a different question: **can we construct a transition rule whose long-run occupation frequencies are p?** A local proposal $Q(\boldsymbol\theta'\mid\boldsymbol\theta)$ only needs to offer candidate moves from the current position. An acceptance rule repairs its bias. A proposal alone is not the complete transition rule.

## A worked expectation with a dependent sequence

As a tutor example, let $\theta$ be a coin's unknown success probability and ask for two future successes, conditionally independent given $\theta$. Then $f(\theta)=\theta^2$. A retained chain segment $(0.2,0.2,0.5,0.8)$ gives

$$\widehat F_4=\frac{0.04+0.04+0.25+0.64}{4}=0.2425.$$

The repeated $0.2$ still contributes. This arithmetic does not establish that the chain has reached its target or that four samples suffice. It also differs from squaring the parameter average: $\bar\theta^2=0.425^2=0.180625$. Prediction requires the expectation of the conditional prediction, not generally prediction at the expected parameter.

## What the roadmap does and does not promise

Slides 1–4 lead from Markov chains to Metropolis-Hastings, then explain why gradient-guided HMC can explore more effectively than a small random walk. Gibbs sampling is named but not developed. No method removes the need for a correct target, convergence checks or uncertainty about numerical accuracy.

**Misconception:** “local” does not mean any random walk is a posterior sampler. Without an appropriate invariant transition rule it can sample the wrong distribution perfectly consistently.

## Checkpoint

Which change defines the MCMC route? A. Average arbitrary local proposal draws without correction. B. Construct a chain with the posterior as its stationary distribution. C. Replace the posterior with its maximum.

<details>
<summary>Answer and reasoning</summary>

**B.** The inferential target stays the same; the mechanism producing representative draws changes. Local proposals need a valid transition/acceptance construction.

</details>

## Teach-back

Explain the input, rule and output in a Bayesian Monte Carlo expectation, then contrast global importance weighting with a target-invariant local Markov chain.

**Source boundary:** Lecture 9, slides 1, 2, 3, 4. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
