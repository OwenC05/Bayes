# Derive the Gaussian marginal likelihood

## Prerequisite bridge

Recall that independent Gaussian random vectors add their covariances, and that multiplying a Gaussian vector by a matrix transforms its covariance.

## Marginalise the weights before optimising hyperparameters

Slide 12 defines

$$p(\mathbf y\mid\alpha,\sigma^2)=\int p(\mathbf y\mid\mathbf w,\sigma^2)p(\mathbf w\mid\alpha)\,d\mathbf w.$$

This is a prior-weighted average likelihood, not the best likelihood obtainable by selecting weights. The weight prior is conditional on $\alpha$; the hyperparameters are not integrated here.

## Supporting derivation without a difficult integral

Use the generative model

$$\mathbf y=\boldsymbol\Phi\mathbf w+\boldsymbol\epsilon.$$

The prior mean of both independent components is zero. Hence $E[\mathbf y]=\mathbf0$. Covariance transforms as

$$\operatorname{Cov}(\boldsymbol\Phi\mathbf w)=\boldsymbol\Phi(\alpha^{-1}\mathbf I_M)\boldsymbol\Phi^{\mathsf T}=\alpha^{-1}\boldsymbol\Phi\boldsymbol\Phi^{\mathsf T}.$$

Independent noise contributes $\sigma^2\mathbf I_N$, so

$$C=\sigma^2\mathbf I_N+\alpha^{-1}\boldsymbol\Phi\boldsymbol\Phi^{\mathsf T},\qquad \mathbf y\mid\alpha,\sigma^2\sim\mathcal N(\mathbf0,C).$$

A linear transformation and sum of independent Gaussians is Gaussian, establishing the integral’s result. $C$ is $N\times N$; $\boldsymbol\Sigma$ is $M\times M$. Off-diagonal entries of $C$ express how a shared uncertain function links targets at different inputs.

## Evaluate the entire dataset density

$$\log p(\mathbf y\mid\alpha,\sigma^2)=-\frac N2\log(2\pi)-\frac12\log|C|-\frac12\mathbf y^{\mathsf T}C^{-1}\mathbf y.$$

The quadratic term measures surprise relative to the model covariance, while the determinant normalises the density over all possible target vectors. Dropping the determinant changes the objective and loses the evidence trade-off.

For a supporting scalar example, take a single feature value 1, $\alpha=2$, $\sigma^2=0.25$. Then $C=0.75$. For target $y=1$, log evidence is $-\tfrac12\log(2\pi\cdot0.75)-1/(2\cdot0.75)\approx-1.442$. The evidence is a density evaluated at the observed value; it is not the probability of that exact continuous value.

**Misconception:** Zero prior mean does not predict zero after seeing data. Evidence describes the dataset before conditioning on its observed targets; the posterior predictive mean uses those targets through $\boldsymbol\mu$.

## Checkpoint

Which expression is the N by N evidence covariance? A. Sigma. B. sigma² I + alpha inverse Phi Phi transpose. C. alpha I.

<details>
<summary>Answer and explanation</summary>

B. It is the covariance of the target vector after weights have been marginalised. Sigma instead describes posterior uncertainty in the M weights.

</details>

## Teach-back

Derive C = sigma² I + alpha inverse Phi Phi transpose, explain its dimensions, and distinguish this evidence covariance from the weight posterior covariance.

Source: Lecture 6, slides 12. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
