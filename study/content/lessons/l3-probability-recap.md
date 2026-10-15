# Probability rules behind Bayesian learning

## What this lecture will build

Lecture 3 moves from probability definitions to **learning unknown parameters from observed data**. It compares point estimates with Bayesian distributions, works through Gaussian and Bernoulli examples, and ends with a lab preview. We will not execute the lab here.

A **parametric model** describes a family of distributions using a fixed set of parameters. For example, a Gaussian with known variance still needs its unknown mean. The parameter is not the observation: a temperature reading is data; the long-run mean temperature in the model is a parameter.

## Joint, conditional and marginal

Let $\theta_1$ and $\theta_2$ be two uncertain quantities.

- $p(\theta_1,\theta_2)$ is their **joint** distribution: it describes pairs of values.
- $p(\theta_1\mid\theta_2)$ is a **conditional** distribution: fix the given value of $\theta_2$, then describe uncertainty about $\theta_1$.
- $p(\theta_1)$ is a **marginal** distribution: describe $\theta_1$ without specifying $\theta_2$.

The notation $p$ can stand for density or mass; use sums for discrete variables and integrals for continuous variables. The conditioning bar means “given,” not division by itself.

The **sum rule** removes a variable by adding up all its possibilities:

$$
p(\theta_1)=\sum_{\theta_2}p(\theta_1,\theta_2)
\quad\text{or}\quad
p(\theta_1)=\int p(\theta_1,\theta_2)\,d\theta_2.
$$

The **product rule** gives two descriptions of the same joint distribution:

$$
p(\theta_1,\theta_2)=p(\theta_1\mid\theta_2)p(\theta_2)
=p(\theta_2\mid\theta_1)p(\theta_1).
$$

Equating these and dividing by a nonzero $p(\theta_2)$ gives Bayes’ rule. The joint is symmetric in its variables; the conditional generally is not.

## Apply the rules to learning

Write $\mathcal D$ for the observed dataset, $\boldsymbol\theta$ for the unknown parameters, and $\mathcal M$ for the model and its assumptions. Then:

$$
p(\boldsymbol\theta\mid\mathcal D,\mathcal M)
=\frac{p(\mathcal D\mid\boldsymbol\theta,\mathcal M)p(\boldsymbol\theta\mid\mathcal M)}{p(\mathcal D\mid\mathcal M)}.
$$

Read the four pieces aloud: **posterior = likelihood × prior / evidence**. The evidence sums or integrates the numerator over all parameter possibilities; it makes the posterior normalise to one.

### Supporting example

Two coins are equally plausible initially: one fair, one with heads probability $0.8$. After one head:

$$
P(\text{biased}\mid H)=\frac{0.8(0.5)}{0.8(0.5)+0.5(0.5)}=\frac8{13}.
$$

Here $0.8$ is the probability of the data given the biased coin; $8/13$ is the probability of the biased coin given the data. Swapping these is the central mistake to avoid.

## Teach it back

Explain the difference between removing a variable by marginalising and fixing its value by conditioning. Then explain why likelihood and posterior answer different questions.
