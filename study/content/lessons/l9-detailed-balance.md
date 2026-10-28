# Prove invariance using detailed balance—not a convergence shortcut

## Prerequisite bridge

**Probability flow:** At equilibrium, target probability at the old state multiplied by transition probability is probability flow to a new state.

**MH acceptance:** The acceptance probability multiplies the proposal transition; rejected probability remains at the old state.

## What needs to remain unchanged?

We design a kernel $T(y\mid x)$ such that a draw distributed as $p$ remains distributed as $p$ after one transition:

$$p(y)=\int T(y\mid x)p(x)\,dx.$$

This is stationarity or invariance. Detailed balance is a stronger, pairwise symmetry:

$$p(x)T(y\mid x)=p(y)T(x\mid y).$$

It says equilibrium flow from $x$ to $y$ equals flow back. Integrate over $x$; the right side becomes $p(y)\int T(x\mid y)dx=p(y)$ because the transition kernel normalises. That proves invariance. In continuous state spaces the kernel includes the rejection atom, so the integral is formally a kernel integral; an ordinary off-diagonal density alone would omit holding probability.

## Derive the MH identity

For distinct positions, $T(y\mid x)=Q(y\mid x)a(x,y)$. Substitute $p=P^*/Z$:

$$p(x)Q(y\mid x)a(x,y)=\frac1Z\min\{P^*(x)Q(y\mid x),P^*(y)Q(x\mid y)\}.$$

The minimum is unchanged by swapping $x$ and $y$. This is exactly the reverse flow. Self-transitions trivially balance themselves, including all rejected proposal mass. Thus the complete MH kernel is reversible with respect to the target.

The proof also explains the acceptance ratio: its target and proposal factors compare the two directed flows. It is not an arbitrary preference for higher target density.

## Worked probability flow

Take two states with target masses $p(A)=0.75$, $p(B)=0.25$ and symmetric proposals that switch states with probability one. Moving $A\to B$ is accepted with probability $1/3$; $B\to A$ with probability one. Equilibrium flow each way is

$$0.75(1/3)=0.25(1)=0.25.$$

The remaining probability at $A$ is its rejection contribution. The transition matrix is $\begin{pmatrix}2/3&1/3\\1&0\end{pmatrix}$, which preserves $(0.75,0.25)$. Each row still sums to one.

## Correct the source's “necessary” claim

Slide 10 describes detailed balance as necessary for convergence. It is **not necessary in general**: nonreversible chains can preserve a target through global balance without equal pairwise flow. For a concrete three-state example, let $C$ rotate $0\to1\to2\to0$ and take $T=(I+C)/2$. The uniform distribution is invariant, every state communicates and the self-transitions make the finite chain aperiodic. Yet forward flow is positive along each cycle edge while its direct reverse flow is zero. It converges without detailed balance.

Conversely, detailed balance alone does not guarantee convergence from arbitrary starts. A chain that never leaves its initial state balances any target but never explores it. Reachability and suitable recurrence/aperiodicity conditions still matter. The proof just obtained is an invariance proof, not a complete performance or convergence certificate.

**Misconception:** a correct acceptance formula cannot rescue a proposal that traps the chain permanently in one of several target regions.

## Checkpoint

What does detailed balance prove directly for a normalised transition kernel? A. Target invariance. B. Independent successive samples. C. Rapid convergence from every initial state.

<details>
<summary>Answer and reasoning</summary>

**A.** Integrating pairwise balance gives the stationarity equation. Independence and convergence speed are separate properties; convergence from arbitrary starts also needs suitable chain conditions.

</details>

## Teach-back

Reconstruct the minimum-of-two-flows MH proof, explain how rejection enters the kernel, and distinguish detailed balance, invariance and convergence.

**Source boundary:** Lecture 9, slides 10. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
