# Transitions, stationarity and convergence are different claims

## Prerequisite bridge

**Conditional independence:** Once the present state is given, the next state of a first-order chain does not additionally depend on older states.

**Probability vectors:** A discrete distribution has nonnegative entries summing to one; a transition row has the same normalisation.

## What the Markov property actually says

For state $X_t$ at iteration $t$,

$$p(X_{t+1}\mid X_0,\ldots,X_t)=p(X_{t+1}\mid X_t).$$

The next state can depend strongly on the current state. “Forget the older history once the present is known” is not the same as “successive states are independent”. The chain is specified by its state space, initial distribution and transition kernel. A time-homogeneous kernel uses the same rule at every step.

For finite states define $T_{ij}=P(X_{t+1}=j\mid X_t=i)$, a **row-stochastic** convention: $\sum_jT_{ij}=1$. If $\mathbf q_t$ is a row-vector distribution, then

$$\mathbf q_{t+1}=\mathbf q_t\mathbf T,\qquad q_{t+1,j}=\sum_iq_{t,i}T_{ij}.$$

A stationary distribution $\boldsymbol\pi$ satisfies $\boldsymbol\pi\mathbf T=\boldsymbol\pi$. If we start exactly from it, one transition preserves it. This equation concerns the distribution across repeated runs, not a requirement that the realised state never changes.

## Worked two-state calculation

This is a smaller tutor example, not a reconstruction of the lecture's six-state matrix. Take

$$\mathbf T=\begin{pmatrix}0.8&0.2\\0.3&0.7\end{pmatrix}.$$

Let the stationary probability of state 0 be $a$. Balance for that state gives $a=0.8a+0.3(1-a)$, so $0.5a=0.3$ and $a=0.6$. Thus $\boldsymbol\pi=(0.6,0.4)$. Check the other component: $0.6(0.2)+0.4(0.7)=0.4$.

Starting in state 0 gives $\mathbf q_0=(1,0)$, $\mathbf q_1=(0.8,0.2)$ and $\mathbf q_2=(0.7,0.3)$. These are distributions at a specified time, not one observed trajectory's empirical histogram. Both can approach the target under suitable conditions, but they are different objects.

## Why a stationary equation is not enough

A finite irreducible chain can reach every state from every other state, possibly through several transitions. Aperiodicity rules out compulsory cycles. Together they ensure convergence to the unique stationary distribution in the usual finite-state setting. Self-transitions often help break periodicity, but do not repair disconnected components.

For a counterexample, $\mathbf T=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ preserves $(1/2,1/2)$ but, started in state 0, alternates forever. It has a stationary distribution yet its one-time distribution does not settle from that start. For continuous-state MCMC the corresponding recurrence/irreducibility conditions need more care; the finite-state statement is a bridge, not a complete general theorem.

## Read the six-state source sequence

![Original realised six-state trajectories](assets/lecture-09/page-05.png)

![Original evolving state-distribution heatmap](assets/lecture-09/page-07.png)

Slide 6 spans pages 4–7. Page 4 names a transition matrix but its numerical entries are not visible in this print; do not invent them. Pages 5–6 show realised states (vertical axis 0–5) against time (horizontal axis), for increasingly long trajectories. Page 7 instead uses colour to show each state’s probability at successive times, starting concentrated at state 1. One is a random path, the other an evolving distribution. Our two-state arithmetic deliberately uses a separate, fully specified matrix.

**Misconception:** observing a chain move around does not demonstrate that all important target regions are reachable or visited in the correct proportions.

## Checkpoint

A chain preserves its target distribution but alternates deterministically between two states. What follows? A. Stationarity guarantees convergence from every start. B. Periodicity can prevent ordinary distributional convergence from a fixed start. C. The transition probabilities must be negative.

<details>
<summary>Answer and reasoning</summary>

**B.** Invariance and convergence are separate properties. The alternating chain preserves a uniform distribution but does not approach it from a point mass.

</details>

## Teach-back

Define a transition kernel, calculate a stationary distribution for a small chain, and explain why reachability and periodicity matter beyond the stationarity equation.

**Source boundary:** Lecture 9, slides 5, 6. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
