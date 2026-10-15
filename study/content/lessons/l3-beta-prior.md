# Beta priors: location, concentration and shapes

## A distribution over a probability

The Bernoulli observation is binary, but its unknown success parameter $\theta$ can lie anywhere between zero and one. Choose a Beta prior:

$$
p_0(\theta\mid\alpha,\beta)
=\frac{\Gamma(\alpha+\beta)}{\Gamma(\alpha)\Gamma(\beta)}
\theta^{\alpha-1}(1-\theta)^{\beta-1},
\qquad 0<\theta<1,\quad\alpha,\beta>0.
$$

The Gamma ratio makes the total area one. $\alpha$ and $\beta$ are fixed hyperparameters of our prior for $\theta$. **Here $\beta$ is a Beta shape parameter, not the Gaussian precision symbol used earlier.** Always identify a symbol’s local meaning.

## Mean and variance

$$
E_0[\theta]=\frac\alpha{\alpha+\beta},
\qquad
\operatorname{Var}_0(\theta)=
\frac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}.
$$

A useful supporting reparameterisation is the mean $m=\alpha/(\alpha+\beta)$ and concentration $s=\alpha+\beta$. Then:

$$
\alpha=ms,\quad \beta=(1-m)s,
\qquad \operatorname{Var}_0(\theta)=\frac{m(1-m)}{s+1}.
$$

At a fixed mean, larger concentration means less uncertainty.

### Supporting derivation: why that mean?

Let $B(a,b)=\Gamma(a)\Gamma(b)/\Gamma(a+b)$ be the Beta normalising integral. Multiplying the density by $\theta$ increases its exponent by one, so:

$$
E[\theta]=\frac{B(\alpha+1,\beta)}{B(\alpha,\beta)}
=\frac\alpha{\alpha+\beta}.
$$

The last step uses $\Gamma(z+1)=z\Gamma(z)$. Similarly, $E[\theta^2]=\alpha(\alpha+1)/[(\alpha+\beta)(\alpha+\beta+1)]$. Subtracting $E[\theta]^2$ gives the displayed variance. This connects the formulas to the expectation rule rather than treating them as unrelated facts.

## Read all four curves on slide 16

![Four Beta distributions from slide 16](assets/lecture-03/page-11.png)

- **Beta(1,1):** uniform density 1; mean $0.5$. Equal-length intervals have equal prior probability.
- **Beta(8,2):** mean $0.8$, with a preference for high success probabilities. Variance $0.16/11\approx0.01455$.
- **Beta(10,10):** symmetric around $0.5$, more concentrated than the uniform prior. Variance $0.25/21\approx0.01190$.
- **Beta(80,20):** also mean $0.8$, but much narrower than Beta(8,2). Variance $0.16/101\approx0.001584$.

The mean is not generally the highest point: for $\alpha,\beta>1$, the mode is $(\alpha-1)/(\alpha+\beta-2)$. Beta(8,2) therefore peaks at $7/8$, not at its mean 0.8. This mode formula is supporting explanation, not an additional formula displayed on slide 16.

## Pseudo-counts: useful but not literal data

The slide calls $\alpha$ and $\beta$ prior sample sizes or pseudo-counts because updating will add observed successes and failures to them. This is an algebraic interpretation, not proof that those many earlier tosses actually occurred. Parameters may be non-integer.

The exponents are $\alpha-1$ and $\beta-1$, so count interpretations depend on the chosen baseline prior. For example, Beta(1,1) is uniform, not a statement that we literally observed one success and one failure.

## Common misconceptions

A Beta density can exceed one; interval areas, not heights, are probabilities. Being concentrated at high $\theta$ means believing success is likely, not having directly observed a success. A symmetric prior need not be weak: Beta(1000,1000) is symmetric but strongly concentrated.

## Teach it back

Explain location versus concentration using Beta(8,2) and Beta(80,20). Distinguish the Beta mean from its mode, and describe why pseudo-counts are not necessarily historical observations.
