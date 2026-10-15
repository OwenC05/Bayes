# Four priors, one dataset: reading every update

## Fix the data before comparing priors

All four source figures use the same 50-bit sequence, generated from Bernoulli(0.5). Counting the displayed bits gives **22 successes and 28 failures**. Thus the MLE is $22/50=0.44$, not exactly the true generating parameter 0.5. A finite sample fluctuates.

The horizontal axis is candidate success probability $\theta$; the vertical axis is parameter density. The red line marks the generating value 0.5. The dashed initial prior and curves after $N=1,5,10,50$ describe successive beliefs, not success probabilities plotted against time.

## Slide 19: uniform prior

Start with Beta(1,1). After all 50 observations:

$$
\theta\mid\mathcal D\sim\operatorname{Beta}(23,29),
\qquad E[\theta\mid\mathcal D]=\frac{23}{52}\approx0.4423.
$$

This is close to the observed frequency 0.44 because the prior contributes little relative weight. The first observed bit is 0, so the first update is Beta(1,2), shifting weight towards lower $\theta$.

## Slide 20: symmetric, more concentrated prior

Start with Beta(10,10). Then:

$$
\theta\mid\mathcal D\sim\operatorname{Beta}(32,38),
\qquad E[\theta\mid\mathcal D]=\frac{32}{70}\approx0.4571.
$$

The prior mean is still 0.5, but its concentration is 20 rather than 2. It pulls the posterior mean more strongly towards 0.5. “Symmetric” describes location, not lack of information.

## Slide 21: moderately biased prior

Start with Beta(10,2), whose prior mean is $10/12\approx0.8333$. Then:

$$
\theta\mid\mathcal D\sim\operatorname{Beta}(32,30),
\qquad E[\theta\mid\mathcal D]=\frac{32}{62}\approx0.5161.
$$

The data move belief substantially away from the initial high-success preference. The resulting mean happens to lie near 0.5, but that does not prove this prior was correct: it is a compromise between a high prior mean and a lower realised success frequency.

## Slide 22: strongly misleading prior

Start with Beta(100,1), whose mean is $100/101\approx0.9901$. After the same data:

$$
\theta\mid\mathcal D\sim\operatorname{Beta}(122,29),
\qquad E[\theta\mid\mathcal D]=\frac{122}{151}\approx0.8079.
$$

The prior concentration 101 exceeds the dataset size 50. Its influence remains large despite substantial contradictory observations. The density’s high peak expresses concentration, not evidence that the prior is accurate.

![The strongly biased prior and its updates on slide 22](assets/lecture-03/page-16.png)

## Check the early curves rather than memorising them

The source sequence begins `01000`, so the first five observations have one success and four failures. Its first ten bits contain two successes and eight failures. For any initial Beta($\alpha,\beta$):

- At $N=1$: Beta($\alpha,\beta+1$).
- At $N=5$: Beta($\alpha+1,\beta+4$).
- At $N=10$: Beta($\alpha+2,\beta+8$).
- At $N=50$: Beta($\alpha+22,\beta+28$).

These rules reconstruct every labelled curve. Centres can move back and forth as successes and failures arrive; they need not approach the true value monotonically.

## What the comparison teaches

Priors matter most relative to the amount of likelihood information. A strong, mistaken prior can leave a misleading posterior for a limited dataset. With fixed finite Beta hyperparameters, sufficient accumulating data eventually outweigh it under this model. That asymptotic statement is not a guarantee that 50 observations are enough or that the model is correct.

## Teach it back

Calculate all four final posterior means from the same counts. Explain why the last posterior remains high, and why neither peak height nor symmetry is a measure of correctness.
