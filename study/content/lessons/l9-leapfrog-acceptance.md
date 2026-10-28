# From numerical trajectories to a valid HMC transition

## Prerequisite bridge

**Hamiltonian system:** For identity mass, position derivative equals momentum and momentum derivative equals the log-target gradient.

**Metropolis correction:** Acceptance compares target probability flow between proposals; rejection retains the existing parameter state.

## Numerical movement needs the right structure

Slide 18 proposes advancing Hamiltonian dynamics numerically and accepting with an energy difference. Slide 19 shows a correlated-target example. The following leapfrog derivation supplies the missing mathematical bridge; it is supplemental teaching, not code printed on that slide.

Let $U(\theta)=-\log P^*(\theta)$ and choose step size $\epsilon$. A unit-mass leapfrog step is

$$\rho_{n+1/2}=\rho_n-\frac\epsilon2\nabla U(\theta_n),$$

$$\theta_{n+1}=\theta_n+\epsilon\rho_{n+1/2},$$

$$\rho_{n+1}=\rho_{n+1/2}-\frac\epsilon2\nabla U(\theta_{n+1}).$$

The two half momentum updates surround a full position update. Reversing the order with negative time undoes the step. Each sub-update is a shear with unit Jacobian determinant, hence volume-preserving. Leapfrog approximates energy conservation rather than guaranteeing exact conservation.

## Assemble a complete transition

Starting at position $\theta$, draw fresh $\rho\sim\mathcal N(0,I)$ and compute $H_{\mathrm{old}}$. Run a fixed number $L$ of leapfrog steps to obtain $(\theta',\rho')$. A momentum reversal can make the deterministic proposal an involution; it leaves kinetic energy unchanged. The reversible, volume-preserving construction supports the Metropolis probability

$$a=\min\{1,e^{H_{\mathrm{old}}-H_{\mathrm{new}}}\}.$$

Accept the candidate position with that probability; otherwise record the old position again. Refresh momentum on the next iteration. A general numerical solver need not have the required proposal properties, so plugging its energy difference into this formula is not automatically a valid method. Nor may one choose an arbitrary convenient endpoint after inspecting a trajectory without accounting for selection.

## Worked one-step calculation

Use the one-dimensional standard-Gaussian target, $U(\theta)=\theta^2/2$, with initial $\theta=1$, $\rho=0$ and $\epsilon=0.2$. Then

$$\rho_{1/2}=-0.1,\quad\theta'=0.98,\quad\rho'=-0.1-0.1(0.98)=-0.198.$$

The old energy is 0.5; the new energy is $0.98^2/2+0.198^2/2=0.499802$. This proposal is accepted with probability one because its numerical energy is slightly lower. The tiny error is not zero. If another trajectory increases energy by 0.7, its acceptance probability is $e^{-0.7}\approx0.497$, so a random draw can reject it. This arithmetic is a tutor calculation, not the lecture demo's trajectory.

## Read the correlated example

![Original correlated-target HMC example](assets/lecture-09/page-26.png)

Axes are $\theta_1$ and $\theta_2$; contours describe the correlated target $P^*(\theta)$. The plot is labelled **100 Samples** and **1 rejected sample**. Green locations spread along its elongated direction. These are source labels, not a fresh run. A low rejection count and broad-looking scatter do not prove convergence, IID output or equivalent performance on a harder target.

The source says the new state should be independent. In general HMC output remains a dependent Markov chain, although it can reduce random-walk behaviour greatly. Use estimand-specific ESS and MCSE rather than asserting independence or compulsory thinning.

Supporting reading: [Neal's HMC derivation](https://arxiv.org/html/1206.1901v1), especially the reversible, volume-preserving integration and Metropolis construction.

## Checkpoint

An HMC trajectory ends with Hnew−Hold=0.4. What is its Metropolis acceptance probability? A. e^0.4, even though it exceeds 1. B. e^(−0.4), approximately 0.6703. C. Zero whenever energy is not exactly conserved.

<details>
<summary>Answer and reasoning</summary>

**B.** The energy increased, so acceptance is exp(−0.4). Exact dynamics would conserve H; the MH correction handles numerical integration error for a valid proposal construction.

</details>

## Teach-back

Write the three leapfrog updates and a complete HMC iteration, explain the energy-difference sign, and distinguish low rejection from independence or convergence.

**Source boundary:** Lecture 9, slides 19. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
