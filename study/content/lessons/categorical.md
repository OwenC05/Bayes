# From Bernoulli to categorical

A Bernoulli model describes one trial with **two possible outcomes**. A categorical model extends that idea to a finite set of categories.

## Bernoulli recap

$$P(X=x\mid\theta)=\theta^x(1-\theta)^{1-x},\qquad x\in\{0,1\}.$$

Here $X$ is the random variable, $x$ is an outcome value and $\theta$ is the success probability. At boundary parameters, use the equivalent piecewise definition rather than worrying about powers such as $0^0$:

$$P(X=1\mid\theta)=\theta,\qquad P(X=0\mid\theta)=1-\theta.$$

## Several categories

Suppose one draw produces a red, blue or green token. Write the categories as $A_1,A_2,A_3$ and their probabilities as $\theta_1,\theta_2,\theta_3$:

$$P(X=A_j\mid\boldsymbol\theta)=\theta_j.$$

The index $j$ selects a category. The bold symbol $\boldsymbol\theta$ is the vector of category probabilities.

For $K$ mutually exclusive and exhaustive categories:

$$\theta_j\geq0,\qquad \sum_{j=1}^K\theta_j=1.$$

For example:

| Category | Probability |
|---|---:|
| Red | 0.2 |
| Blue | 0.3 |
| Green | 0.5 |

A single observation is **one category**, such as blue. It is not the vector $(0.2,0.3,0.5)$: that vector specifies the distribution.

The event “red or blue” has probability $0.2+0.3=0.5$, because one draw cannot be both categories.

## Labels do not imply numerical distances

We can encode red, blue and green as $1,2,3$, but those labels do not mean green is three times red. Their purpose is identification, not measurement.

A categorical model concerns a **single categorical outcome**. A model of category counts across several trials is a different construction.

## Explain it to a beginner

> A categorical distribution lists the probability of each possible category. Exactly one category is observed per trial, and the category probabilities sum to one. Bernoulli is the two-category case.

**Teach-back:** For three categories with probabilities $0.2$, $0.3$ and $0.5$, what is observed on one trial, and what are the parameters?

Source: Lecture 2, slide 24, original page 11.
