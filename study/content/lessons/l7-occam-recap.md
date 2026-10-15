# Evidence and the implicit Occam effect

## Prerequisite bridge

**Prior predictive density:** Evidence averages the data likelihood over a normalised parameter prior; it is a density for continuous targets.

**Precision and regularisation:** The weight prior has precision alpha; with fixed noise variance the ridge coefficient is lambda = sigma-squared times alpha.

## The lecture’s destination

Lecture 7 asks us to stop treating every hyperparameter as known. The plan is incremental: recap evidence selection of weight precision $\alpha$ and noise scale $\sigma$, integrate those scales numerically, select an RBF width $r$, and finally consider integrating $r$ and comparing basis families. The title is an aspiration; intermediate stages still use point estimates.

Use the fixed-input regression model

$$\mathbf y=\boldsymbol\Phi_r\mathbf w+\boldsymbol\epsilon,\qquad\boldsymbol\epsilon\sim\mathcal N(\mathbf0,\sigma^2\mathbf I),\qquad\mathbf w\mid\alpha\sim\mathcal N(\mathbf0,\alpha^{-1}\mathbf I).$$

Here $N$ targets form $\mathbf y$, $M$ weights form $\mathbf w$, and $\boldsymbol\Phi_r$ is the $N\times M$ design matrix. Inputs and basis centres are conditioned on, not predicted. Large $\alpha$ concentrates weights near zero. Small $\alpha$ permits large weights and a wider range of functions.

## Why averaging can penalise excess flexibility

$$p(\mathbf y\mid\alpha,\sigma^2,r)=\int p(\mathbf y\mid\mathbf w,\sigma^2,r)p(\mathbf w\mid\alpha)\,d\mathbf w.$$

Maximum likelihood asks whether **some** weight vector explains the observations well. Evidence asks how well the model predicts those observations **on average under its prior**. The prior integrates to one. Spreading its probability over many functions can leave little mass near the functions that explain this particular dataset. This is the implicit Occam effect, not a separate hand-added parameter penalty and not a theorem that simpler always wins.

![Source Occam schematic: different alpha values distribute density over different regions of dataset space](assets/lecture-07/page-02.png)

Slide 2 is schematic. Its horizontal axis is a conceptual space of datasets, not $x$, and its vertical axis is marginal dataset density, not posterior weight density. The observed noisy-sine marker is beyond the narrow high-$\alpha$ region but inside the medium and low-$\alpha$ regions. The medium region has greater density there than the broad low-$\alpha$ region. Do not read the rectangles as measured distributions or numeric evidence values. The plot uses $\mathbf t$ where the text uses $\mathbf y$.

## A small evidence-average example

As a teaching analogy, suppose a discrete prior assigns probability $1/2$ to each of two candidate functions, whose likelihoods at the data are 0.8 and 0.2. Evidence is $0.5(0.8)+0.5(0.2)=0.5$. A larger family gives four candidates equal prior mass with likelihoods 0.9, 0.1, 0.1 and 0.1. Its best fit improves, but evidence is only $0.3$. The improvement in the best fit does not compensate for all the poorly predictive prior possibilities. These invented numbers explain averaging; they are not slide results.

## Read the model-selection recap

![Source comparison of training, validation and test RMS errors with negative log evidence](assets/lecture-07/page-03.png)

Slide 3 assumes known noise variance. Its horizontal axis is $\log\lambda$, with $\lambda=\sigma^2\alpha$ under the ridge convention. At fixed $\sigma^2$, moving along that axis also changes $\alpha$. RMS errors use the left axis; negative log evidence uses the right. Smaller negative log evidence means larger evidence. The minima need not coincide: evidence is a model-based criterion, whereas test error is realised performance on a particular held-out sample.

**Recall:** the test curve is a retrospective illustration, not a licence to tune on the test set. Evidence can select hyperparameters without validation-based tuning, but independent predictive checks still matter. Proper priors are needed for meaningful evidence averages; prior scales and support affect the result.

## Checkpoint

A flexible family has the best maximum likelihood. What follows about its evidence?

- A. It must have the highest evidence.
- B. Nothing definitive: evidence averages likelihood under its prior.
- C. Evidence always favours the fewest parameters.

<details>
<summary>Answer and explanation</summary>

B. The maximum is only one point or region; evidence depends on the likelihood throughout the normalised prior support.

</details>

## Teach-back

Explain why a very flexible model can have lower evidence than a moderately flexible one, even when it achieves lower training error.

**Source boundary:** Lecture 7, slides 1, 2, 3. Original figures are source material; derivations, numerical examples, corrections and checkpoints here are supplemental teaching, not additional slide claims.
