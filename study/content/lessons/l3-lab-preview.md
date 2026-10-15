# Recognising the bandit lab without doing it

## What the source previews

Slide 23 introduces a Jupyter Notebook exercise involving a **multi-armed bandit**. Its announced tasks are:

- specify suitable priors;
- compute corresponding posteriors;
- sample from those posteriors.

The final page names Bernoulli and Gamma observation models and mentions familiarity with `scipy.stats` or `numpy.random`. “Tomorrow” is historical lecture wording, not a current schedule. This lesson explains the concepts only; it neither opens nor solves the lab.

## Supporting intuition: what is a bandit?

Imagine several machines, called **arms**. Selecting an arm produces an uncertain reward. Different arms may have different unknown reward distributions. You would like to learn which arms are promising while also obtaining rewards.

This creates an **exploration–exploitation** tension: use an arm that currently looks good, or try an uncertain arm to learn more? The source previews playing a bandit but does not specify a policy on this slide, so we do not attribute a particular algorithm to it.

## How the lecture’s ingredients fit

For a binary reward, each arm could have an unknown Bernoulli success parameter. A Beta prior describes initial uncertainty about that arm’s parameter. Its own successes and failures update that prior into a Beta posterior.

For example, an arm with Beta(2,2) prior and one observed success has Beta(3,2) posterior. Another arm with no new observations retains its current belief **if the model treats their parameters independently**. Shared-parameter or hierarchical models would require different bookkeeping; those are not developed here.

A Gamma observation model would instead describe positive continuous rewards or measurements. Remember that an **observation distribution** and a **prior over its unknown parameters** play different roles. Do not assume that a Gamma observation model automatically implies a Gamma prior over every parameter: the appropriate update depends on which parameter is unknown and which are fixed. Slide 23 does not supply that full model.

## Two different meanings of “sample”

1. **Sample a parameter from its posterior.** Draw a possible $\theta$ according to our present uncertainty. This does not change the physical arm’s true parameter; it is a computational draw from our belief distribution.
2. **Sample an observation given a parameter.** For a Bernoulli model, draw a binary reward using a specified success probability.

A posterior predictive simulation combines these: draw a parameter from the posterior, then draw an observation conditional on it. Repeating produces samples from the predictive distribution.

## What you should be able to explain before the lab

Identify observations, parameters and hyperparameters; distinguish prior, likelihood, posterior and predictive; update a Beta prior from counts; explain why sampling a plausible parameter is different from replacing uncertainty with its mean.

The named Python modules support distribution calculations and random draws, but this slide is a familiarity signpost, not an API tutorial. We include no untested code commands and leave implementation and exercises for the later lab stage.

## Lecture 3 recap

The Gaussian example adds **precisions** and produces a precision-weighted mean. Its predictive variance adds observation noise and mean uncertainty. The Bernoulli example adds **counts** to Beta hyperparameters. Both follow the same specify–update–predict framework, while using different distribution families and assumptions.

## Teach it back

Describe a bandit to a beginner without discussing a specific policy. Then distinguish a posterior parameter draw from a reward draw, and name what additional assumptions a Gamma-based update would require.
