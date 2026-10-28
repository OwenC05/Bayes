# What is established, what is a demo and what comes next

## Prerequisite bridge

**Model versus algorithm:** A probabilistic model defines a target distribution; an inference algorithm approximates quantities under that target.

**Prepared versus verified:** Reading a lesson or viewing a source plot does not show that code ran, a sampler converged or a learner independently reconstructed the mathematics.

## The lecture's final boundary matters

Slide 24 promises a Python HMC implementation in the **next lecture**. It does not include that implementation here. Slides 25–26 recommend reading and show software examples. These are not hidden numerical experiments to reconstruct from screenshots. We have prepared explanations and calculations, not run the course's demos, installed MCMC libraries or assessed your mastery.

The central progression is now:

1. State the Bayesian expectation and the distribution being averaged over.
2. Design a local Markov transition that preserves that distribution.
3. Correct proposal flow with Metropolis-Hastings, recording rejections.
4. Understand why anisotropic geometry makes small random walks inefficient.
5. Extend the target with momentum and use structured dynamics plus acceptance correction.
6. Diagnose remaining dependence and numerical/exploration error.
7. Average predictive components under posterior draws rather than at one fitted point.

Each step has a mathematical contract. A software wrapper can automate a method without making those contracts disappear.

## Two papers play different teaching roles

The lecture points to [Radford Neal, MCMC using Hamiltonian Dynamics](https://arxiv.org/abs/1206.1901) and [Michael Betancourt, A Conceptual Introduction to Hamiltonian Monte Carlo](https://arxiv.org/abs/1701.02434). These are supporting references, not additional compulsory prerequisites for reading this sequence. Use them to deepen the auxiliary-variable construction, dynamics, geometry and computational limitations after reconstructing the core argument yourself.

Slide 26 lists Stan/PyStan, PyMC and NumPyro. Its claim about what comes in “standard” Python distributions is a historical packaging statement, not a timeless mathematical fact. No current library ranking, compatibility promise or installation recommendation follows merely from the lecture list. Lecture 10 will use probabilistic programming to separate declarative model construction from the inference machinery.

## Worked end-to-end reasoning check

As a tutor-created scenario, a regression sampler returns joint draws of positive $(\alpha,v,r)$ after integrating the Gaussian weights analytically. You want $P(y_*>c\mid\mathbf y)$ at a fixed new input. For draw $s$, compute the conditional predictive Gaussian mean $m_s$ and variance $V_s$; evaluate

$$f(\eta_s)=1-\Phi\left(\frac{c-m_s}{\sqrt{V_s}}\right),$$

where $\Phi$ is the standard normal CDF, not the regression design matrix. Average these probabilities over retained posterior draws. This uses a Rao–Blackwell-style conditional expectation rather than adding a further random observation draw solely to estimate the tail probability.

The computation needs a correct coordinate-aware target, useful exploration and an MCSE for the averaged function. It does **not** need another multiplication by the posterior density, evidence weights for already-posterior draws, or deletion of all repeated states. A visually plausible mean curve does not answer the tail-probability question.

## A reconstruction task, not a completion badge

Without looking back, explain why the unknown normaliser cancels in MH and in the HMC force, but cannot simply be ignored when calculating model evidence. Then derive the predictive average and identify its numerical uncertainty. If you need support, that is a review target—not a reason to mark the lecture failed or mastered. Independent later reconstruction and transfer provide stronger learning evidence than having seen each slide once.

**Misconception:** using an established sampler establishes that the chosen probabilistic model is adequate. Computational diagnostics and model checking are distinct responsibilities.

## Checkpoint

Which statement is justified by the supplied Lecture 9 material? A. The next-lecture HMC demo has already run successfully on this machine. B. The lecture provides mathematical methods and source illustrations, with implementation/software previews whose execution is not established. C. Naming NUTS proves all posterior draws are independent.

<details>
<summary>Answer and reasoning</summary>

**B.** Source plots, lessons and reading links provide content coverage. They do not establish code execution, posterior convergence, model adequacy or independent learner performance.

</details>

## Teach-back

Give a beginner-facing account of the full expectation → MH → HMC → prediction chain, name its assumptions and diagnostics, and distinguish supplied evidence from unexecuted demo/software previews.

**Source boundary:** Lecture 9, slides 24, 25, 26. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
