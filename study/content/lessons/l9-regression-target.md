# Sample regression hyperparameters in consistent coordinates

## Prerequisite bridge

**Gaussian evidence:** Integrating a Gaussian weight prior through a Gaussian observation model gives a Gaussian marginal likelihood for the observed response vector.

**Change of variables:** A transformed density includes the absolute Jacobian determinant so that probability is unchanged by coordinates.

## Which unknowns are sampled?

Observed inputs $X$ and responses $\mathbf y\in\mathbb R^N$ are fixed. Let $\alpha>0$ be weight-prior precision, $v=\sigma^2>0$ observation-noise variance and $r>0$ basis width. The weights $\mathbf w\in\mathbb R^M$ are unknown, but integrated out analytically rather than explicitly sampled here.

For the $N\times M$ design matrix $\Phi_r$,

$$\mathbf w\mid\alpha\sim\mathcal N(0,\alpha^{-1}I),\quad\mathbf y\mid\mathbf w,v,r\sim\mathcal N(\Phi_r\mathbf w,vI).$$

Independence of the weight prior and observation noise gives

$$\mathbf y\mid\alpha,v,r\sim\mathcal N(0,C),\qquad C=vI+\alpha^{-1}\Phi_r\Phi_r^{\mathsf T}.$$

Consequently, the hyperparameter target numerator is

$$P^*(\alpha,v,r)=\mathcal N(\mathbf y;0,C)\,p(\alpha)p(v)p(r).$$

The unknown posterior normaliser $p(\mathbf y)$ is not needed for HMC ratios or gradients. It is not thereby computed for model comparison. The likelihood here is already the **weight-marginalised evidence conditional on hyperparameters**, not a likelihood evaluated at fitted weights.

## Derive the log target

Ignoring constants independent of sampled coordinates,

$$\log P^*=-\frac12\log|C|-\frac12\mathbf y^{\mathsf T}C^{-1}\mathbf y+\log p(\alpha)+\log p(v)+\log p(r).$$

The determinant term penalises distributing prior predictive probability too broadly; the quadratic term measures data compatibility. Positive $v$ makes $C$ positive definite in this model. Numerically a Cholesky solve can evaluate these terms without explicitly forming an inverse; no fitting implementation is being executed here.

## Log-uniform means density relative to a measure

The lecture assumes log-uniform priors but supplies no finite bounds. To define a proper bounded version, choose positive finite lower/upper limits. Then, within those bounds, $p(\alpha)\propto1/\alpha$, $p(v)\propto1/v$ and $p(r)\propto1/r$. These are densities relative to $d\alpha\,dv\,dr$, not constants in raw coordinates.

If we sample $z=(\log\alpha,\log v,\log r)$, the transformation Jacobian is $\alpha vr$. Therefore

$$P_z^*(z)=P^*(e^{z_1},e^{z_2},e^{z_3})e^{z_1+z_2+z_3}.$$

For the bounded log-uniform priors the inverse scales cancel this Jacobian, giving a log-coordinate target proportional to the Gaussian evidence inside transformed bounds. Keeping both raw inverse-scale factors **and** forgetting the Jacobian would impose a different prior. Flat log priors on the whole real line are improper; posterior propriety cannot simply be assumed.

## Worked coordinate check

If the prior is uniform in $\log v$ for $v\in[1,100]$, then $p_v(v)=1/(v\log100)$. The event $v\in[1,10]$ has probability $\log10/\log100=1/2$. In the coordinate $s=\log\sigma$ with $v=\sigma^2=e^{2s}$, the Jacobian is $dv/ds=2v$, yielding constant $p_s(s)=2/\log100$ on $s\in[0,\log10]$. The same event still has probability one half.

Slide 20's prose alternates $\sigma$ and $\sigma^2$; its integral uses $d\sigma^2$. Specify coordinates rather than silently treating SD and variance as interchangeable.

**Misconception:** analytically integrating weights and numerically sampling hyperparameters are complementary, not contradictory, marginalisation steps.

## Checkpoint

You sample z=log v but evaluate a target originally defined relative to dv. What is required? A. No change, because logs are only labels. B. Include dv/dz=v in the transformed density. C. Square every posterior probability.

<details>
<summary>Answer and reasoning</summary>

**B.** Density changes with coordinates even though event probabilities do not. For a raw log-uniform prior, this Jacobian cancels its 1/v factor within the chosen bounds.

</details>

## Teach-back

Build the collapsed regression posterior, derive its log density, identify what is fixed or integrated out, and transform a log-uniform prior between variance and log-scale coordinates.

**Source boundary:** Lecture 9, slides 20. Original figures and quoted claims are source material; worked calculations, additional derivations, mathematical qualifications and checkpoints are tutor support, not newly executed lecture demos.
