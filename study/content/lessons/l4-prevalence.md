# When the population changes, the probability changes

Slides 7–8 give a hypothetical medical-classification example. **The same observed features can imply very different disease probabilities in populations with different disease prevalence.** This is a lecture calculation, not medical advice.

## Define the quantities

- $\mathcal C_1$: disease; $\mathcal C_0$: no disease.
- $\mathbf x$: the patient's measured features.
- $T$: the training/trial population; $G$: the general population.
- $P_T(\mathcal C_1)=0.5$: half the training cases have disease.
- $P_G(\mathcal C_1)=0.001$: one in a thousand in the general population has disease.

For one feature vector $\mathbf x_*$, the trained model outputs $\widehat P_T(\mathcal C_1\mid\mathbf x_*)=0.95$.

## The essential assumption

This recalibration assumes the **class-conditional feature distributions remain unchanged**:

$$p_T(\mathbf x\mid\mathcal C_k)=p_G(\mathbf x\mid\mathcal C_k),\qquad k\in\{0,1\}.$$

Only class prevalence changes. If measurements, patient subgroups or disease presentations also change within classes, this simple correction need not work. We also need the model's training-population probability estimate to be reliable.

## Bayes' rule in the two populations

$$P_T(\mathcal C_1\mid\mathbf x)=\frac{p(\mathbf x\mid\mathcal C_1)P_T(\mathcal C_1)}{p_T(\mathbf x)}.$$

$$P_G(\mathcal C_1\mid\mathbf x)=\frac{p(\mathbf x\mid\mathcal C_1)P_G(\mathcal C_1)}{p_G(\mathbf x)}.$$

The numerator contains the same within-class likelihood, but both the prior prevalence and the denominator change. Therefore simply multiplying 0.95 by $0.001/0.5$ misses the required renormalisation.

The slide expresses the relationship as:

$$P_G(\mathcal C_1\mid\mathbf x)=\widehat P_T(\mathcal C_1\mid\mathbf x)\frac{P_G(\mathcal C_1)}{P_T(\mathcal C_1)}\frac{p_T(\mathbf x)}{p_G(\mathbf x)}.$$

## Work out the slide's rounded 2%

**Supporting derivation:** odds are probability divided by its complement. Dividing the disease and non-disease forms of Bayes' rule cancels the evidence denominator:

$$\frac{P(\mathcal C_1\mid\mathbf x)}{P(\mathcal C_0\mid\mathbf x)}=\frac{p(\mathbf x\mid\mathcal C_1)}{p(\mathbf x\mid\mathcal C_0)}\frac{P(\mathcal C_1)}{P(\mathcal C_0)}.$$

Training prior odds are $0.5/0.5=1$. Training posterior odds are $0.95/0.05=19$. Thus the feature likelihood ratio is 19: the observed features are 19 times as likely under the disease class as under the healthy class.

General-population prior odds are $0.001/0.999$. After incorporating the features:

$$\text{posterior odds}=19\times\frac{0.001}{0.999}=\frac{19}{999}.$$

Convert odds $o$ back to probability with $o/(1+o)$:

$$P_G(\mathcal C_1\mid\mathbf x_*)=\frac{19}{999+19}\approx0.01866.$$

That is about **1.87%, rounded to 2% on the slide**, not 95%. The features still increase the probability above the population's 0.1%; they do not make the low base rate irrelevant.

## Misconceptions to avoid

- A model's “95%” need not transfer unchanged between populations.
- A likelihood ratio of 19 is not a posterior probability of 19% or 95% by itself.
- Correcting the base rate is not sufficient for arbitrary distribution shift.

**Teach-back:** Explain how the same features can give 95% in the balanced trial but about 2% in the general population. State the assumption that makes the correction possible.

Source: Lecture 4, slides 7–8, original page 4. The odds calculation supplies the arithmetic behind the source's rounded result; it is supporting explanation.
