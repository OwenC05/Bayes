# Specify, update, integrate and predict

## First specify a model

$\mathcal M$ includes the observation family and assumptions, such as conditional independence. $\boldsymbol\theta$ denotes its unknown parameters; $\mathcal D$ denotes recorded observations; $\mathcal D_*$ denotes future observations.

Specify the likelihood $p(\mathcal D\mid\boldsymbol\theta,\mathcal M)$ and a proper prior $p(\boldsymbol\theta\mid\mathcal M)$. “Proper” means its total probability is one. If comparing models, we may also specify model probabilities $p(\mathcal M)$; the worked examples hold one model fixed.

## Update: Bayes’ rule

$$
p(\boldsymbol\theta\mid\mathcal D,\mathcal M)
=\frac{p(\mathcal D\mid\boldsymbol\theta,\mathcal M)p(\boldsymbol\theta\mid\mathcal M)}{p(\mathcal D\mid\mathcal M)}.
$$

The posterior is the prior reweighted by how well each parameter explains the observations. It is not enough to favour a value merely because its likelihood is large: its prior weight also matters.

For finding the posterior’s shape, we often write:

$$
p(\boldsymbol\theta\mid\mathcal D,\mathcal M)\propto
p(\mathcal D\mid\boldsymbol\theta,\mathcal M)p(\boldsymbol\theta\mid\mathcal M).
$$

The proportionality sign means that a constant independent of $\boldsymbol\theta$ is omitted. Do not omit a parameter-dependent factor.

## Evidence: sum rule followed by product rule

$$
\begin{aligned}
p(\mathcal D\mid\mathcal M)
&=\int p(\mathcal D,\boldsymbol\theta\mid\mathcal M)\,d\boldsymbol\theta\\
&=\int p(\mathcal D\mid\boldsymbol\theta,\mathcal M)
 p(\boldsymbol\theta\mid\mathcal M)\,d\boldsymbol\theta.
\end{aligned}
$$

The first line removes the unknown parameter from the joint. The second expresses that joint using the two ingredients we specified. Evidence is an **average likelihood under the prior**, not the maximum likelihood and not the probability that the model is true. For continuous observations it is a density in the data, so it need not be less than one.

## Predict: average under the posterior

Assume future and recorded observations are conditionally independent given the parameters and model. Then:

$$
p(\mathcal D_*\mid\mathcal D,\mathcal M)
=\int p(\mathcal D_*\mid\boldsymbol\theta,\mathcal M)
 p(\boldsymbol\theta\mid\mathcal D,\mathcal M)\,d\boldsymbol\theta.
$$

Each candidate parameter supplies a prediction. We average those predictions using *updated* weights because we have already seen $\mathcal D$.

### Supporting numerical example

After one head, the earlier two-coin posterior gives biased-coin weight $8/13$ and fair-coin weight $5/13$. The next-head prediction is:

$$
P(H_*\mid H)=\frac8{13}(0.8)+\frac5{13}(0.5)=\frac{89}{130}\approx0.685.
$$

This is neither simply $0.8$ nor the original prior-weighted prediction $0.65$.

## Teach it back

For each of prior, likelihood, posterior, evidence and predictive, name what is uncertain and what is given. Explain why integrating over parameters does not mean physically changing them between observations.
