# Read a graph as a factorisation, not a fitting result

## Prerequisite bridge

**Product rule:** A joint distribution can be written as conditional factors multiplied together.

**Observed versus latent:** Conditioning on a measured quantity differs from integrating an unknown quantity out.

## Identify the roles before reading arrows

The source graph has the chain $\theta\to\mathbf x\to y$. Here $\theta$ is a latent upstream variable, $\mathbf x$ is another latent variable or vector, and the shaded node $y$ is observed. Their notation is specific to this example: $\mathbf x$ is not automatically the fixed regression input matrix used in earlier lectures.

The graph specifies

$$p(y,\mathbf x,\theta)=p(y\mid\mathbf x)p(\mathbf x\mid\theta)p(\theta).$$

Each node contributes its conditional distribution given its parents. A root contributes its prior. Shading marks which value is supplied; it does not delete the node's likelihood factor.

![Source latent-variable graph and factorisation](assets/lecture-10/page-07.png)

## Which assumption simplifies the product rule?

Without the graph's conditional independence, the general product rule would give

$$p(y,\mathbf x,\theta)=p(y\mid\mathbf x,\theta)p(\mathbf x\mid\theta)p(\theta).$$

The chain replaces the first factor by $p(y\mid\mathbf x)$: once $\mathbf x$ is known, $\theta$ has no further direct role in predicting $y$. This is $y\perp\!\!\!\perp\theta\mid\mathbf x$. It does **not** mean $y$ and $\theta$ are marginally independent. Changes in $\theta$ can change the distribution of $\mathbf x$, and thus the distribution of $y$.

Arrows encode probabilistic dependencies used to factor the joint. Without additional causal assumptions, they do not automatically authorise an intervention interpretation.

## Generating data and learning from data go opposite ways

A generative draw proceeds forward:

1. Draw $\theta\sim p(\theta)$.
2. Draw $\mathbf x\sim p(\mathbf x\mid\theta)$.
3. Draw $y\sim p(y\mid\mathbf x)$.

After observing $y=y_{\rm obs}$, inference asks for

$$p(\mathbf x,\theta\mid y_{\rm obs})=\frac{p(y_{\rm obs}\mid\mathbf x)p(\mathbf x\mid\theta)p(\theta)}{p(y_{\rm obs})}.$$

The denominator integrates over both latent quantities. If only $\theta$ interests us, also integrate $\mathbf x$ from the posterior. The observed value stays fixed throughout. Running the forward simulation without conditioning would sample from the prior predictive, not this posterior.

## Worked dependency contrast

As a tutor-created discrete example, suppose $\theta$ is a binary type, $x$ equals that type with probability 0.9, and $y$ equals $x$ with probability 0.8. Conditional on a given $x$, knowing $\theta$ changes nothing about $y$. Marginally, however,

$$P(y=1\mid\theta=1)=0.9(0.8)+0.1(0.2)=0.74,$$

whereas $P(y=1\mid\theta=0)=0.1(0.8)+0.9(0.2)=0.26$. Conditional independence and marginal dependence coexist.

A rendered graph therefore helps inspect the **model assumption**. It does not show that a dataset fits the assumption, that a sampler explored the posterior, or that the posterior is scientifically appropriate. Those require distinct checks. The source defers richer hierarchical graphs to later lectures.

## Checkpoint

Does theta → x → y imply theta and y are independent? A. Yes, because there is no direct arrow. B. Not generally; y is conditionally independent of theta given x.

<details>
<summary>Answer and explanation</summary>

B. The graph encodes independence only after conditioning on x. Marginalising x can retain dependence between theta and y.

</details>

## Teach-back

Factorise the lecture graph, identify its conditional independence, and distinguish the generative direction from posterior inference.

**Source boundary:** Lecture 10, slides 9. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
