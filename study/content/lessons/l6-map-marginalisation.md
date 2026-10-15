# Why a MAP curve is not the whole Bayesian answer

## Prerequisite bridge

Lecture 5 gave a Gaussian posterior over regression weights. Its mean and mode coincide, and equal a penalised least-squares estimate. Recall that a probability distribution contains more information than its maximum.

## Start with the question, not the optimiser

Slide 1 announces the change of emphasis: make predictions by marginalisation, then learn the prior precision and noise level using marginal likelihood. Slide 2 recaps a 15-observation regression demonstration. It already has a distribution over weights, but its noise variance was taken as known and its prior precision was chosen by hand. Those assumptions remain part of the answer even when not visible on the fitted curve.

Let the fixed feature vector at a test input be $\boldsymbol\phi_*$. With a Gaussian posterior,

$$\mathbf w\mid\mathbf y,\alpha,\sigma^2\sim\mathcal N(\boldsymbol\mu,\boldsymbol\Sigma).$$

A MAP prediction substitutes $\mathbf w=\boldsymbol\mu$. A marginal prediction instead weights each possible weight vector by its posterior density. The two predictive means agree in this linear Gaussian model, but their uncertainty need not agree.

## A supporting numerical contrast

Take a one-weight constant model $y_*=w+\epsilon_*$, posterior $w\mid\mathbf y\sim\mathcal N(2,0.25)$, and independent noise $\epsilon_*\sim\mathcal N(0,0.09)$. Plugging in the MAP weight gives

$$y_*\mid w=2\sim\mathcal N(2,0.09).$$

Integrating the weight gives

$$y_*\mid\mathbf y\sim\mathcal N(2,0.34).$$

Both means are 2. The second variance is larger because it includes uncertainty about the constant itself. Having computed a posterior does not help if prediction then discards its spread.

## Read the recap diagram

On slide 2 the data/basis panel specifies what is fitted; posterior contours describe plausible weights; the right panel shows the resulting functions. A contour plot is not a collection of independent error bars: correlated weights can trade off while keeping predictions similar. A single red mean curve cannot display all this information.

Slide 3’s provocative statement that MAP is not “Bayesian” is best read as a warning about using only a posterior mode. MAP genuinely comes from a Bayesian posterior, but the lecture’s distinguishing operation is **averaging over unknowns**, not just locating their most likely value.

**Recall:** Does matching a Bayesian posterior mean curve also match the Bayesian predictive variance? No. Equality of means says nothing about omitted uncertainty.

## Checkpoint

Which method propagates uncertainty in weights? A. Substitute their MAP value. B. Integrate against their posterior. C. Remove the prior.

<details>
<summary>Answer and explanation</summary>

B. Integration uses the whole posterior. MAP substitution retains one value and, at most, observation noise; removing the prior does not perform marginalisation.

</details>

## Teach-back

Explain why the same fitted curve can arise from PLS and MAP without making the two frameworks identical. What uncertainty is lost when only that curve is kept?

Source: Lecture 6, slides 1, 2, 3. Source equations, observations and demonstrations are identified above; derivation bridges and new numerical examples are supporting explanations, not additional slide claims.
