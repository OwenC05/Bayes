# Carry the workflow forward without inventing the next lecture

## Prerequisite bridge

**Latent-variable joint:** Adding an upstream random quantity adds a prior and conditional factors to a joint distribution.

**Inference versus implementation:** A library can automate sampling machinery while leaving modelling assumptions and diagnostics to the analyst.

## What has actually been established?

The lecture's workflow is: declare a model, optionally render it, simulate prior predictions, condition on data, sample the posterior, then diagnose and visualise. These are different operations, not interchangeable badges of completion. A graph does not imply a fitted posterior; a posterior histogram does not imply a checked scientific model.

Slide 20 says “Back to Jupyter ...”. It supplies neither a notebook nor additional numerical outputs. Do not invent a second live run, installation success, new diagnostics or a successful model fit. The earlier tables and code can be studied without pretending that the demonstration has been executed here.

## A hierarchy adds uncertainty above parameters

In the basic example, $\alpha,\beta$ are fixed prior shapes and $\theta$ is unknown. A hierarchical extension can make some quantities controlling the prior uncertain. As a **tutor-created preview**, consider group probabilities $\theta_1,\ldots,\theta_J$, a population mean $\mu\in(0,1)$ and concentration $\kappa>0$:

$$\theta_j\mid\mu,\kappa\sim\operatorname{Beta}(\mu\kappa,(1-\mu)\kappa),\qquad y_{ji}\mid\theta_j\sim\operatorname{Bernoulli}(\theta_j).$$

With proper priors on $\mu$ and $\kappa$, the joint factorises as

$$p(\mu,\kappa,\boldsymbol\theta,\mathbf y)=p(\mu)p(\kappa)\prod_{j=1}^J\left[p(\theta_j\mid\mu,\kappa)\prod_i p(y_{ji}\mid\theta_j)\right].$$

Each group has its own probability, while groups share uncertain population-level structure. This is not the same as assuming every group has one identical probability, nor fitting unrelated groups with no shared information. The full hierarchical derivation and parameterisation strategies are later material; this example only illustrates why declarations and PGMs are useful.

## Worked dependency check

Conditional on a fixed $\theta_j$, observations in group $j$ are independent. After integrating out $\theta_j$, they generally become dependent. After learning shared hyperparameters from several groups, a small group's estimate can be informed by other groups. This is a consequence of the joint model and conditioning, not a numerical averaging trick to apply after independent fits.

If one group observes two successes and no failures, a point estimate of one is not proof of certainty. A proper Beta conditional prior still leaves uncertainty. In a hierarchy the prior's parameters themselves can be uncertain, so integrating only group probabilities while freezing uncertain hyperparameters discards another uncertainty source.

## Automation does not abolish geometry

The source closes by warning about parameterisation in MCMC/HMC/NUTS. Hierarchies can couple scales and latent effects, creating challenging posterior geometry. More parameters do not merely mean longer arrays: they can change how easily a transition explores the target. Parameterisation choices must preserve the intended probability model, including transformations and their Jacobians when applicable.

## Carry-forward reconstruction

Given a new model, identify fixed data, latent unknowns, prior factors, likelihood factors and the desired posterior/predictive quantity. Explain what each software call conditions on or generates. Check the generative assumptions before using the sampler, then check the approximation after it. Preserve unresolved diagnostics rather than labelling an attractive plot “mastered” or “converged.”

**Source boundary within the preview:** the source schedules PGMs and hierarchical models for Lectures 11–12. Those materials are not supplied by this PDF; the tutor illustration above is not a transcription of them. Prepared lessons likewise do not establish independent understanding.

## Checkpoint

What makes the preview hierarchical? A. All groups must have exactly the same theta. B. Group-specific parameters have a shared population-level distribution, whose parameters may themselves be uncertain.

<details>
<summary>Answer and explanation</summary>

B. The common uncertain population structure couples the inference across groups while retaining distinct group parameters. The extra model assumptions must still be specified and checked.

</details>

## Teach-back

Reconstruct the modelling-to-diagnostics workflow and explain what hierarchical modelling adds, while separating the source preview from completed instruction.

**Source boundary:** Lecture 10, slides 20, 21. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
