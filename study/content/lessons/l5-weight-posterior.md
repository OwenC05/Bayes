# Deriving the Gaussian posterior over weights

## Bayes gives a distribution, not just fitted weights

Conditioning on fixed inputs (suppressed below),

$$p(\mathbf w\mid\mathbf y,\alpha,\sigma^2)=\frac{p(\mathbf y\mid\mathbf w,\sigma^2)p(\mathbf w\mid\alpha)}{p(\mathbf y\mid\alpha,\sigma^2)}.$$

The denominator is the evidence: integrate the numerator over every possible weight vector. For finding the posterior's form, it is a normalising factor independent of $\mathbf w$.

Multiplying the Gaussian likelihood and Gaussian prior gives

$$p(\mathbf w\mid\mathbf y,\alpha,\sigma^2)\propto\exp\left[-\frac1{2\sigma^2}(\mathbf y-\boldsymbol\Phi\mathbf w)^{\mathsf T}(\mathbf y-\boldsymbol\Phi\mathbf w)-\frac\alpha2\mathbf w^{\mathsf T}\mathbf w\right].$$

## Derivation bridge: complete the matrix square

Collect the terms involving $\mathbf w$. Define

$$A=\alpha\mathbf I+\sigma^{-2}\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi,\qquad\mathbf b=\sigma^{-2}\boldsymbol\Phi^{\mathsf T}\mathbf y.$$

The exponent's weight-dependent quadratic is

$$-\frac12\left(\mathbf w^{\mathsf T}A\mathbf w-2\mathbf w^{\mathsf T}\mathbf b\right).$$

Choose $\boldsymbol\mu=A^{-1}\mathbf b$, so $A\boldsymbol\mu=\mathbf b$. Expanding the centred square shows

$$\mathbf w^{\mathsf T}A\mathbf w-2\mathbf w^{\mathsf T}\mathbf b=(\mathbf w-\boldsymbol\mu)^{\mathsf T}A(\mathbf w-\boldsymbol\mu)-\boldsymbol\mu^{\mathsf T}A\boldsymbol\mu.$$

The last term is constant in $\mathbf w$ and is absorbed into normalisation. The remaining expression is a multivariate Gaussian kernel with **precision** $A$. Hence

$$p(\mathbf w\mid\mathbf y,\alpha,\sigma^2)=\mathcal N(\mathbf w;\boldsymbol\mu,\boldsymbol\Sigma),\qquad\boldsymbol\Sigma=A^{-1}.$$

Factoring $\sigma^{-2}$ out of $A$ gives the slide's expressions:

$$\boldsymbol\mu=(\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi+\sigma^2\alpha\mathbf I)^{-1}\boldsymbol\Phi^{\mathsf T}\mathbf y,$$

$$\boldsymbol\Sigma=\sigma^2(\boldsymbol\Phi^{\mathsf T}\boldsymbol\Phi+\sigma^2\alpha\mathbf I)^{-1}.$$

Since $\alpha>0$ and $\sigma^2>0$, $A$ is positive definite even if the design matrix is rank deficient. The posterior is proper and has an invertible covariance.

## Interpret every part

- $\boldsymbol\mu$ is an $M\times1$ posterior mean weight vector.
- $\boldsymbol\Sigma$ is an $M\times M$ posterior covariance matrix **over weights**, not the observation-noise variance.
- Diagonal entries quantify uncertainty in individual weights.
- Off-diagonal entries describe posterior relationships between weights.

Weights can become correlated even with an independent prior: overlapping basis functions allow one weight to compensate for another when explaining the same targets.

For fixed features and hyperparameters, covariance does not depend on the observed target values. Those values change the posterior mean; the input locations determine the information geometry.

## Worked one-weight example

Use a constant model $y_n=w+\epsilon_n$, a prior $w\sim\mathcal N(0,1)$, and $\sigma^2=1$. Observe targets 1 and 3. Then $\alpha=1$, $\Phi^{\mathsf T}\Phi=2$, and $\Phi^{\mathsf T}\mathbf y=4$:

$$\mu=\frac4{2+1}=\frac43,\qquad\Sigma=\frac1{2+1}=\frac13.$$

Least squares gives 2; the posterior mean is pulled toward the prior mean zero. More importantly, the Bayesian result retains uncertainty: $w\mid\mathbf y\sim\mathcal N(4/3,1/3)$.

**Misconception:** the posterior mean is one summary of the distribution, not the whole Bayesian answer.

## Teach-back

Derive the posterior precision, mean and covariance. Which quantity does the covariance describe, and why can its off-diagonal terms be nonzero?

Source: Lecture 5, slides 15. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
