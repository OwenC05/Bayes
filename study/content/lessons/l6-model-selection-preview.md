# Beyond weights: basis families and RBF widths

## Prerequisite bridge

Recall that every predictive distribution is conditional on modelling choices. Distinguish a discrete choice of basis family from a continuous width parameter.

## The remaining conditioning assumptions

Slide 28 notes that a basis family $\phi$ and its parameters were fixed throughout. For Gaussian radial basis functions, width $r$ determines how local each feature is. Changing width changes the design matrix, so it can change both posterior fit and evidence even with unchanged $\alpha,\sigma^2$.

This is not a request to regard the feature vector as an extra noisy observation. The unknown is a model choice or basis-setting parameter that determines the feature functions.

## Supporting prediction hierarchy

Let $b$ index a discrete basis family and $r$ its continuous width. A full model-average prediction has the form

$$p(y_*\mid\mathbf y)=\sum_b\int p(y_*\mid\mathbf y,b,r)\,p(b,r\mid\mathbf y)\,dr,$$

where the conditional prediction should itself integrate remaining uncertain weights and hyperparameters. A discrete choice is summed; a continuous one is integrated. Priors over $b$ and $r$ are needed, along with consistently normalised conditional models.

The source’s simpler alternative is model selection using $p(\mathbf y\mid\phi,r)$. The intended next step is to remove $\alpha$ and $\sigma^2$ numerically:

$$p(\mathbf y\mid\phi,r)=\int p(\mathbf y\mid\alpha,\sigma^2,\phi,r)p(\alpha,\sigma^2\mid\phi,r)\,d\alpha\,d\sigma^2.$$

Weights are already integrated inside the Gaussian evidence term. A maximum over hyperparameters is not this integral. Priors, domains and numerical weights matter; an unweighted sum of density values on a log grid is not automatically an integral in the original coordinates.

## Supporting two-model example

Suppose two basis families have prior probabilities 0.5 each and evidences 0.2 and 0.1. Their posterior probabilities are $2/3$ and $1/3$. Selecting the first discards the second; averaging retains both. If their predictive means differ, the between-model disagreement adds another uncertainty contribution.

These numbers illustrate Bayes’ rule, not results from the lecture. The source does not supply a new width optimum or run a numerical marginalisation here: it previews Lecture 7.

## End-of-lecture synthesis

The progression is: retain a Gaussian distribution over weights; integrate it for conditional prediction; learn selected hyperparameters by evidence; recognise that those selected values still omit uncertainty; then consider integrating or selecting other modelling choices. At every step ask what is conditioned on, what is averaged out, and what approximation was made.

**Misconception:** High evidence is not proof that a basis family is true. It is relative support under specified prior predictive assumptions and the models considered.

## Checkpoint

How does full averaging differ from choosing the highest-evidence basis? A. It weights predictions from multiple bases by posterior model probabilities. B. It chooses whichever basis has most weights. C. It ignores evidence.

<details>
<summary>Answer and explanation</summary>

A. Evidence contributes to posterior model weights together with model priors. Selection keeps one model; averaging can preserve uncertainty between alternatives.

</details>

## Teach-back

Explain how basis choice and RBF width could be selected or averaged. What must be integrated to obtain evidence conditional only on those remaining choices?

Source: Lecture 6, slides 28. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
