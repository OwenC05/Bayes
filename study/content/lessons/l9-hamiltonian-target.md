# Add momentum without changing the parameter target

## Prerequisite bridge

**Log-density gradients:** A gradient is a vector of partial derivatives indicating local change of a scalar log density with respect to its coordinates.

**Auxiliary variables:** Introducing an extra variable is legitimate when integrating it out recovers the original target.

## Position is a parameter, not physical space

We want $p(\theta)=P^*(\theta)/Z$ for a continuous $d$-vector $\theta$. Define potential energy $U(\theta)=-\log P^*(\theta)$ and introduce a $d$-vector momentum $\rho$. With identity mass matrix, choose kinetic energy $K(\rho)=\rho^{\mathsf T}\rho/2$ and Hamiltonian

$$H(\theta,\rho)=U(\theta)+K(\rho)=-\log P^*(\theta)+\frac12\|\rho\|^2.$$

This is an artificial system designed for computation. “Time” is an integration variable, not the calendar time of collecting data. Momentum is not another model parameter to infer scientifically.

## Check the joint density before simulating

The extended target is

$$\pi(\theta,\rho)=\frac{e^{-H(\theta,\rho)}}{Z(2\pi)^{d/2}}=p(\theta)\mathcal N(\rho;0,I).$$

The equality follows because exponentials turn the energy sum into a product. Integrating over $\rho$ leaves $p(\theta)$ because the Gaussian momentum density integrates to one. Sampling a fresh Gaussian momentum conditional on any position preserves this joint target; it does not itself move the position.

Unknown $Z$ causes no gradient problem: $\nabla\log p(\theta)=\nabla\log P^*(\theta)$ because $\log Z$ is constant in $\theta$. Multiplying $P^*$ by any positive constant merely shifts $U$ and $H$ by an additive constant, leaving energy differences and forces unchanged.

## Derive the equations of motion

Hamilton's equations are

$$\frac{d\theta}{dt}=\frac{\partial H}{\partial\rho}=\rho,\qquad\frac{d\rho}{dt}=-\frac{\partial H}{\partial\theta}=\nabla_\theta\log P^*(\theta).$$

Thus the source's $\rho_i=d\theta_i/dt$ assumes unit mass. With a fixed positive-definite mass matrix $M$, use $K=\rho^{\mathsf T}M^{-1}\rho/2$, draw $\rho\sim\mathcal N(0,M)$ and obtain $d\theta/dt=M^{-1}\rho$. Do not mix that convention with $\rho$-as-velocity unchanged.

For exact differentiable dynamics,

$$\frac{dH}{dt}=\nabla U^{\mathsf T}\rho+\rho^{\mathsf T}(-\nabla U)=0.$$

Potential and kinetic energy exchange while their sum stays fixed. Exact Hamiltonian flow also preserves volume. These properties explain why long, geometry-informed movement can preserve the extended distribution instead of simply climbing to a mode.

## Worked Gaussian force

If $P^*(\theta)=\exp(-\theta^2/2)$ in one dimension, then $U=\theta^2/2$, $d\theta/dt=\rho$ and $d\rho/dt=-\theta$. At $\theta=2,\rho=1$, position initially increases but momentum decreases at rate 2. Motion is not “always move uphill in log density”: inertia can carry it away from the origin while kinetic energy is converted to potential energy. Repeated momentum refreshes make the overall sampler stochastic.

## What this construction assumes

We need a target and coordinate system suitable for gradients. Constraints commonly require transformations and their Jacobians; discrete parameters do not directly follow these continuous dynamics. HMC does not remove multimodality or bad parameterisation. Numerical integration introduces energy error, so this target construction is not yet the complete algorithm.

**Misconception:** HMC samples only the mode because its force points toward higher density. Momentum permits sustained traversal of the mass-carrying region, and the extended density—not monotonic ascent—is the invariant target.

## Checkpoint

Why does adding Gaussian momentum leave the desired parameter distribution unchanged? A. Because momentum is set to zero after every step. B. Because the extended density factorises as p(θ)N(ρ;0,I), and the momentum factor integrates to one. C. Because gradients always increase target density.

<details>
<summary>Answer and reasoning</summary>

**B.** Marginalising the independent auxiliary momentum recovers p(θ). The dynamics can exchange potential and kinetic energy without increasing parameter density at every step.

</details>

## Teach-back

Derive the extended target and Hamilton equations, explain the unit-mass assumption, and show why an unknown normalising constant affects neither the force nor acceptance ratios.

**Source boundary:** Lecture 9, slides 18. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
