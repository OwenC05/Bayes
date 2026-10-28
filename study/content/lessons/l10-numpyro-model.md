# Translate Beta–Bernoulli factors into named sample sites

## Prerequisite bridge

**Conjugate model:** A Beta prior times a conditionally independent Bernoulli likelihood defines the target joint.

**Array indexing:** Python arrays start at zero, so the order of hyperparameter entries must be read explicitly.

## Read the imports by responsibility

Slide 12 imports NumPyro and its distributions, the inference tools `MCMC`, `NUTS`, `Predictive`, JAX and its array module, plus ArviZ. These are roles in the teaching workflow, not a request to install them in this companion. The app renders lessons; it does not execute this Python.

Slides 13–14 declare and render the model. The source function, with wrapped PDF lines rejoined, is:

```python
def model_bernoulli(hypers, y):
    theta = numpyro.sample("theta", dist.Beta(hypers[1], hypers[0]))
    numpyro.sample("obs", dist.BernoulliProbs(theta), obs=y)
```

`"theta"` names a latent sample site, allowing inference tools to identify its value. `dist.Beta(...)` gives its prior distribution; it is not the posterior declaration. `"obs"` names the observation site. `obs=y` supplies the observed outcomes when `y` is an array. With `y=None`, that site is unobserved and can generate outcomes ([sample-site reference](https://num.pyro.ai/en/stable/primitives.html#sample)).

## The subtle ordering is mathematical, not cosmetic

The slide's formula uses Beta$(\alpha,\beta)$, where $\alpha$ controls successes and $\beta$ failures. The function passes `hypers[1]` first and `hypers[0]` second. Thus its array convention is `[failure_shape, success_shape]`, or $[\beta,\alpha]$; NumPyro names the Beta arguments `concentration1` and `concentration0` ([distribution reference](https://num.pyro.ai/en/stable/distributions.html#beta)). The symmetric `[1,1]` example cannot reveal an accidental reversal.

For a tutor contrast, `hypers=[2,5]` means Beta$(5,2)$ under this function, with prior mean $5/7$. Interpreting it as Beta$(2,5)$ would instead give $2/7$. With four successes and one failure, the intended update under the printed function is Beta$(9,3)$, not Beta$(6,6)$. Check argument order whenever translating a mathematical model into code.

## Where are the repeated observations?

For observed vector $\mathbf y$, the intended likelihood is $\prod_i p(y_i\mid\theta)$. A scalar Bernoulli parameter is shared across observations; inference sums the corresponding log-probability contributions. The source does not explicitly declare a `numpyro.plate` for this independent observation dimension. An explicit plate is a clearer general modelling pattern and supports observation-shape information. Do not silently insert it into a literal transcription or claim this short function expresses every desired predictive batch shape.

In particular, `y=None` supplies no training-data array from which to infer a vector length. The source's prior predictive example generates one scalar Bernoulli outcome per parameter draw, not an entire 25-observation replicated dataset per draw. A replicated dataset requires an explicit observation shape/plate in a suitable model.

## Rendering checks structure, not numerical inference

The source uses

```python
dummy_hyper = jnp.ones(2)
dummy_data = jnp.ones(1)
numpyro.render_model(model_bernoulli, model_args=(dummy_hyper, dummy_data))
```

These dummy arguments provide a runnable declaration for graph rendering. The graph represents a latent probability leading to an observed Bernoulli site. It does not mean one has fitted the dummy dataset, run NUTS, checked convergence or generated the posterior. Graph rendering can also require optional external rendering support; the source refers readers to Moodle, without providing an installation recipe.

**Misconception:** `numpyro.sample` is a named probabilistic site interpreted by the current operation, not an instruction that necessarily draws a fresh independent prior value while MCMC evaluates a target.

## Checkpoint

For the printed function and hypers=[2,5], which prior is declared? A. Beta(2,5). B. Beta(5,2).

<details>
<summary>Answer and explanation</summary>

B. The source explicitly passes hypers[1] first. The first mathematical Beta shape therefore equals five, so the prior mean is 5/7.

</details>

## Teach-back

Explain every source model line, expose the hyperparameter ordering, and distinguish rendering the model from fitting it.

**Source boundary:** Lecture 10, slides 12, 13, 14. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
