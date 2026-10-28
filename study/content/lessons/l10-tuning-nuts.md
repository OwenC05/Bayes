# Separate trajectory tuning from model correctness

## Prerequisite bridge

**Numerical integration:** A finite step size introduces energy error even when the ideal Hamiltonian flow conserves energy.

**Markov-chain dependence:** Many accepted positions can still be strongly correlated and give few effective samples.

## Two settings with different jobs

The lecture names $L$, the number of numerical integration steps, and $\epsilon$, the time increment per step. Their product

$$\tau=L\epsilon$$

is integration time. It is not automatically Euclidean distance: distance also depends on momentum, mass scaling and the changing gradient. A trajectory may travel far, turn and finish near its starting point.

Step size controls numerical resolution. Too large a step can produce severe energy errors, rejection and divergences. Very small steps may resolve the dynamics well but require many gradient evaluations. Increasing $L$ at fixed $\epsilon$ extends the trajectory, whereas reducing $\epsilon$ at fixed $\tau$ requires increasing $L$.

## Worked comparison: same time, different cost

A tutor example uses $\tau=1$. Setting A takes $L=10$, $\epsilon=0.1$; setting B takes $L=100$, $\epsilon=0.01$. They simulate the same nominal time, but B uses roughly ten times as many integration steps. That does not mean ten times as many posterior samples or ten times greater statistical accuracy. Energy error and geometry determine whether the additional work is useful.

If accepted moves remain too short, successive positions can be highly correlated. If a path circles around, extending it can waste computation. Conversely, a very high acceptance rate may simply indicate an unnecessarily tiny step size. Efficiency asks about accurate effective samples **per unit computation**, not maximising one diagnostic.

## What NUTS changes

NUTS means No U-turn Sampler. It builds trajectories adaptively and uses a stopping rule related to turning back, rather than requiring the user to supply one fixed trajectory length for every transition. Library implementations also use warmup to adapt quantities such as step size and mass scaling. The retained sampling phase must still target a fixed posterior correctly.

Do not interpret this as “run until any endpoint looks good and accept it”: selecting candidate states from an adaptively built trajectory requires a carefully constructed algorithm. The full NUTS derivation is beyond these slides. Reusing the library separates inference machinery from the declared model; it does not remove the need to understand either the model's support or diagnostic output.

## Which source claims are only guidance?

Slide 7 asks whether an acceptance rate of 65% is desired and mentions momentum persistence, random time reversal and perturbing step sizes. These are algorithmic design/tuning considerations, not a requirement to independently add each trick to every library call. An acceptance target depends on algorithm and implementation. Do not substitute the printed 65% into unrelated settings without justification.

Slide 8 names Stan/PyStan, PyMC and NumPyro. These are the lecture's ecosystem examples, not a new package recommendation or installation request. This lesson does not compare current package versions or promise source code will run unchanged on every version.

**Misconception:** NUTS cannot repair a misspecified likelihood, wrong prior, or difficult parameterisation merely by taking longer trajectories. A mathematically wrong joint model can be sampled accurately and still answer the wrong scientific question. Hierarchical geometry can remain challenging even with automated tuning.

## Checkpoint

Two settings have (L, epsilon) = (10, 0.1) and (100, 0.01). A. The second guarantees ten times the information. B. They have the same nominal integration time, with different numerical cost and accuracy.

<details>
<summary>Answer and explanation</summary>

B. Both have integration time one. The smaller step requires more work and may reduce numerical error, but the resulting effective sampling efficiency must be assessed.

</details>

## Teach-back

Explain the roles of step size, trajectory length and NUTS, and why acceptance rate alone cannot validate an inference.

**Source boundary:** Lecture 10, slides 7, 8. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
