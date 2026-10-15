# Deriving the Beta–Bernoulli posterior

## Multiply likelihood by prior

The sequence likelihood and prior kernel are:

$$
P(\mathcal D\mid\theta)=\theta^{n_1}(1-\theta)^{n_0},
\qquad
p_0(\theta)\propto\theta^{\alpha-1}(1-\theta)^{\beta-1}.
$$

Multiplication adds exponents:

$$
p_N(\theta\mid\mathcal D)
\propto\theta^{\alpha+n_1-1}(1-\theta)^{\beta+n_0-1}.
$$

Recognise a Beta kernel. Define $\widetilde\alpha=\alpha+n_1$ and $\widetilde\beta=\beta+n_0$:

$$
p_N(\theta\mid\mathcal D)
=\frac{\Gamma(\widetilde\alpha+\widetilde\beta)}{\Gamma(\widetilde\alpha)\Gamma(\widetilde\beta)}
\theta^{\widetilde\alpha-1}(1-\theta)^{\widetilde\beta-1}.
$$

The posterior has the same family as the prior: conjugacy. Updating sequentially or all at once gives the same final parameters under the assumed fixed-$\theta$ model.

## Posterior mean and the prior–data compromise

$$
E_N[\theta]=\frac{\alpha+n_1}{\alpha+\beta+N}
=\frac{\alpha+\beta}{\alpha+\beta+N}\frac\alpha{\alpha+\beta}
+\frac N{\alpha+\beta+N}\frac{n_1}{N}.
$$

For $N>0$, this is a weighted average of prior mean and observed success frequency. With no data use the first fraction directly: it reduces to the prior mean. As $N$ increases with fixed hyperparameters, the difference from the observed frequency approaches zero. The prior is not mathematically deleted, but its relative weight diminishes.

## Worked example

Start with Beta(3,6), then observe three heads and two tails. The posterior is Beta(6,8):

$$
E_N[\theta]=\frac6{14}\approx0.429,
\qquad
\operatorname{Var}_N(\theta)=\frac{6\cdot8}{14^2\cdot15}\approx0.01633.
$$

The posterior mean lies between the prior mean $1/3$ and data frequency $3/5$. Unlike the known-variance Gaussian example, Beta posterior variance need not decrease after **every** individual surprising observation; the posterior’s location also affects its variance.

## Supporting prediction and evidence connections

For one future Bernoulli trial, posterior averaging gives:

$$
P(x_*=1\mid\mathcal D)=\int_0^1\theta\,p_N(\theta\mid\mathcal D)\,d\theta
=E_N[\theta].
$$

This coincidence with the posterior mean does not make the full posterior unnecessary: multiple future trials share uncertain $\theta$, and other questions require its spread.

Writing $B(a,b)=\Gamma(a)\Gamma(b)/\Gamma(a+b)$, the evidence for the particular recorded sequence is $B(\alpha+n_1,\beta+n_0)/B(\alpha,\beta)$. For an unordered success-count event, additionally multiply by $\binom N{n_1}$.

## Optional supporting bridge: MAP and boundaries

MAP selects a **mode** of the posterior; it is not the same as the posterior mean. For posterior shapes $A=\widetilde\alpha>1$ and $B=\widetilde\beta>1$:

$$
\widehat\theta_{\mathrm{MAP}}=\frac{A-1}{A+B-2}.
$$

For Beta(6,8), MAP is $5/12\approx0.417$, mean is $6/14$, and MLE is $3/5$. Do not apply the interior mode formula outside its conditions. If $A\leq1$ and $B\geq1$, with at least one strict inequality, the peak or density supremum is at the zero boundary; the reversed conditions give the one boundary. If both are below one, both ends have unbounded density, with no interior maximum; Beta(1,1) is flat. Boundary singularities are not positive point probabilities. This is a clarification for the later MAP topic, not a separate derivation claimed from slides 17–18.

## Teach it back

Derive the update by combining exponents. Explain what the posterior mean predicts, why it differs from MLE, and why an interior MAP formula requires conditions.
