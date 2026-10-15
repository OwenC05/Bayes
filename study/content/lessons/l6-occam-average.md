# Occam’s razor is an average, not a maximum

## Prerequisite bridge

Recall evidence = integral of likelihood times prior. A normalised density has finite total mass even when its support covers a large space.

## The source’s aside and question

Slide 18 is a photograph beside an Occam sign: memorable context, not evidence for a theorem. Slide 19 gives the historical maxim about not multiplying entities unnecessarily and asks why an intermediate $\alpha$ is marginally more probable.

The answer is not “Bayes always chooses the simplest model”. Too-simple models may give the observed data very low density. Bayesian selection compares how well models predict the actual dataset before optimising individual weights to it.

## Interpret slide 20’s schematic

The vertical axis is marginal model probability density and the horizontal axis schematically ranges across possible datasets of increasing complexity. The source writes targets as $\mathbf t$ here, rather than $\mathbf y$.

- High $\alpha$ shrinks weights strongly and concentrates predictions on simple datasets. The observed noisy sine dataset can lie outside that concentration.
- Low $\alpha$ allows a great variety of functions. Probability is spread over many datasets, so the particular observed dataset may receive little density.
- Medium $\alpha$ can concentrate enough probability on datasets like the observed one without supporting vast numbers of unrelated datasets.

The rectangles are a conceptual picture of normalisation, not an evaluated curve, and the horizontal axis is not an ordinary one-dimensional data coordinate.

## Supporting likelihood-average example

Imagine model A has likelihood 0.8 over 10% of its prior weight mass and 0.01 elsewhere. Its evidence is $0.1(0.8)+0.9(0.01)=0.089$. Model B has likelihood 0.3 across all its prior weight mass, so its evidence is 0.3. A wins by maximum likelihood (0.8 versus 0.3) but loses by average likelihood.

This finite-region example illustrates a typical Occam effect: an excellent fit requiring finely tuned weights need not have high prior predictive support. The average is weighted by prior mass, not unweighted geometric volume; a parameter transformation must transform the prior too.

## Do not overstate the principle

A poor prior can unfairly dilute evidence, and a restrictive model can lose when the data genuinely require complexity. The lecture’s intermediate optimum is a result for its specified example, not a guarantee for every dataset or boundary case. A flat hyper-prior does not delete the weight prior from the integral.

**Misconception:** Occam’s razor is not an extra term manually attached to evidence. The trade-off already arises from averaging normalised likelihoods under the specified prior.

## Checkpoint

If a model has the highest likelihood at one finely tuned weight, must it have the highest evidence? A. Yes. B. No.

<details>
<summary>Answer and explanation</summary>

B. Evidence averages over all prior-supported weights. A very narrow high-likelihood region can contribute less than a broader region of good fits.

</details>

## Teach-back

Use the dataset-space schematic to explain why a flexible model can fit very well yet have lower evidence. Why does the weight prior matter?

Source: Lecture 6, slides 18, 19, 20. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
