# Run Metropolis-Hastings without dropping rejected states

## Prerequisite bridge

**Unnormalised targets:** Multiplying an unnormalised density by a positive constant leaves its normalised probability distribution unchanged.

**Conditional proposals:** The forward proposal Q(new|old) and reverse proposal Q(old|new) need not be equal.

## Separate three objects

Let $x=\boldsymbol\theta^{(t)}$ be the current $d$-vector, $y=\boldsymbol\theta'$ a proposed candidate, and $X_{t+1}$ the recorded next state. Here $x,y$ are short aliases for parameter positions, not observed regression responses. The proposal density $Q(y\mid x)$ is not the same as the full transition kernel: rejection creates probability of remaining at $x$.

The target is $p(x)=P^*(x)/Z$, with $0<Z<\infty$. Initialise at a valid point with finite positive $P^*$. Compute

$$a(x,y)=\min\left\{1,\frac{P^*(y)Q(x\mid y)}{P^*(x)Q(y\mid x)}\right\}.$$

The unknown $Z$ cancels because the ratio of normalised target densities is $P^*(y)/P^*(x)$. The reverse-over-forward proposal ratio compensates for asymmetric movement opportunities.

## A complete iteration

1. Draw $y\sim Q(\cdot\mid x)$.
2. Evaluate the target and proposal ratio.
3. Draw an independent $U\sim\operatorname{Uniform}(0,1)$.
4. If $U<a(x,y)$, set $X_{t+1}=y$; otherwise set $X_{t+1}=x$.
5. **Record the next state either way**, advance the iteration index and repeat.

For numerical stability define

$$\Delta=\log P^*(y)-\log P^*(x)+\log Q(x\mid y)-\log Q(y\mid x).$$

Accept if $\log U<\min(0,\Delta)$. Proposals outside target support have zero target density and are rejected; unavailable reverse moves likewise cannot carry positive accepted flow in this construction. Logs help with underflow but do not fix a wrong target or proposal density.

## Worked symmetric and asymmetric moves

For a symmetric Gaussian random walk $Q(y\mid x)=\mathcal N(y;x,r^2\mathbf I)$, the proposal terms cancel. If $P^*(x)=8$ and $P^*(y)=2$, acceptance probability is $1/4$. A uniform draw $U=0.4$ rejects; record $x$ again. A different draw $U=0.1$ accepts. Moving to higher density is always accepted in this **symmetric** case, but lower-density moves are essential for sampling rather than optimisation.

For an asymmetric example keep the same target values, but let $Q(y\mid x)=0.1$ and $Q(x\mid y)=0.4$. Now the ratio is $(2/8)(0.4/0.1)=1$: accept. Omitting proposal correction would wrongly use $1/4$. Conversely, even an uphill move can be rejected when the reverse proposal probability is sufficiently small.

## Why repetitions are part of the answer

If a chain remains at $x$ for three transitions, it has spent three sampling times there. Removing rejections changes occupation frequencies and generally yields a different “jump-chain” distribution unless compensated by holding-time weights. The recorded sequence is not a list of unique accepted locations.

![Source Metropolis example](assets/lecture-09/page-09.png)

Slide 9's graphical sequence runs across pages 9–10. Read candidate moves separately from retained samples; a plot of accepted locations alone does not specify holding times. The PDF is not a supplied executable simulation, so the numerical moves above are labelled tutor examples.

**Misconception:** MCMC does not favour high density by refusing all downhill moves. Such a rule seeks a mode and fails to represent a distribution's spread.

## Checkpoint

With a symmetric proposal, P*(old)=5, P*(new)=1 and U=0.3, what should be recorded? A. Nothing, because the proposal failed. B. The old state again, because 0.3 exceeds acceptance probability 0.2. C. The new state with a weight of 0.2.

<details>
<summary>Answer and reasoning</summary>

**B.** Rejection is a valid transition that remains at the current state. Neither deleting it nor assigning importance weights implements this MH chain.

</details>

## Teach-back

Explain every term in the MH acceptance ratio, show where the normalising constant cancels, and execute an iteration including what gets recorded on rejection.

**Source boundary:** Lecture 9, slides 7, 8, 9. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
