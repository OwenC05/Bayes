# Bernoulli likelihood, counts and boundary estimates

## Observation model

Let $x_n=1$ mean success and $x_n=0$ mean failure. The parameter $\theta$ is the common success probability:

$$
P(x_n\mid\theta)=\theta^{x_n}(1-\theta)^{1-x_n},
\qquad x_n\in\{0,1\}.
$$

The exponent is a switch: a success supplies a factor $\theta$; a failure supplies $1-\theta$. Although the slide uses the generic label “p.d.f.,” Bernoulli is discrete, so this is a **probability mass function**.

Assume trials are conditionally independent with the same $\theta$. Define $n_1$ as successes, $n_0$ as failures, and $N=n_1+n_0$.

$$
P(\mathcal D\mid\theta)=\prod_nP(x_n\mid\theta)
=\theta^{n_1}(1-\theta)^{n_0}.
$$

## Why counts are enough for this parameter update

For this model, all recorded sequences with the same counts give the same likelihood as a function of $\theta$. The order of successes contains no extra information about a constant success parameter. This would not hold for a model in which probabilities change over time or trials influence one another.

A supporting distinction: the probability of **exactly $n_1$ successes in any order** is binomial:

$$
P(n_1\mid N,\theta)=\binom N{n_1}\theta^{n_1}(1-\theta)^{n_0}.
$$

The coefficient counts possible sequences. It is constant in $\theta$, so it does not change the MLE or the normalised parameter posterior, but it does change the probability/evidence of the event being modelled.

## Derive the MLE

For positive success and failure counts and $0<\theta<1$:

$$
\ell(\theta)=n_1\log\theta+n_0\log(1-\theta),
\qquad
\ell'(\theta)=\frac{n_1}{\theta}-\frac{n_0}{1-\theta}.
$$

Setting the derivative to zero yields $n_1(1-\theta)=n_0\theta$, hence:

$$
\widehat\theta=\frac{n_1}{N}.
$$

The second derivative is negative in the interior when $N>0$, so this is a maximum.

## Boundary cases matter

If every observed trial succeeds, the likelihood is $\theta^N$, which increases to its maximum at $\theta=1$. If all fail, the maximum is at $\theta=0$. These are boundary solutions, not interior stationary points. With no observations the likelihood is constant, so it selects no unique parameter.

Three heads followed by two tails gives $\widehat\theta=0.6$. Three heads and no tails gives $\widehat\theta=1$, but **three observed heads do not prove tails impossible**. This is one motivation for retaining uncertainty rather than treating a fitted point as truth.

## Teach it back

Explain why the likelihood depends only on counts under this model. Then explain why differentiation alone misses boundary maxima and why a binomial coefficient appears for counts but not one specified sequence.
