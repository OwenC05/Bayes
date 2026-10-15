# Age confounding and the lecture’s closing message

Slides 24–25 close Lecture 4 with a dated vaccination example and a preview of the regression material that follows. **This lesson explains the source's reasoning; it does not provide current medical guidance or independently evaluate the cited 2021 release.**

## The historical example on slide 24

The lecture describes September 2021 ONS data being misinterpreted as showing that COVID-19 vaccination increased the probability of death from the disease. It illustrates why comparing aggregate groups can mislead when their age compositions differ.

The source graph contains:

```text
Age → Vaccine
Age → Death
Vaccine ⇢ Death
```

The Vaccine → Death link is drawn with a red dashed arrow in the original. It represents the causal relationship of interest; the diagram alone does not give its sign or magnitude.

![Original age, vaccination and death diagram, followed by the next-lecture signposting](assets/lecture-04/page-11.png)

Age can influence both vaccination status and death risk. If older people are more likely to be vaccinated and have higher baseline death risk, an aggregate comparison can mix the vaccine relationship with age differences.

## Use the sum rule to locate the problem

Let $D$ mean death, $V$ vaccination status and $A$ age group:

$$P(D\mid V)=\sum_a P(D\mid V,A=a)P(A=a\mid V).$$

The overall death rate depends on both the within-age-group rates and the age distribution within the vaccination group. Comparing $P(D\mid V=1)$ with $P(D\mid V=0)$ can compare differently weighted populations.

**Supporting illustration:** imagine two age groups with the following hypothetical rates and counts. These are not the ONS figures:

| Group | Vaccinated deaths/people | Unvaccinated deaths/people |
| --- | ---: | ---: |
| Younger | 1/1,000 = 0.1% | 20/10,000 = 0.2% |
| Older | 100/10,000 = 1% | 20/1,000 = 2% |

The vaccinated group has a lower rate within each age group. Yet aggregating gives:

$$\frac{101}{11{,}000}\approx0.918\%\quad\text{versus}\quad\frac{40}{11{,}000}\approx0.364\%.$$

The vaccinated group has more older people, so its crude overall rate is higher. This demonstrates a possible reversal; it does not by itself establish the causal effect in any real dataset.

Age stratification can reveal the mixture issue. A real causal analysis may need additional covariates, time periods, exposure definitions and assumptions; the lecture does not perform that analysis here.

## Slide 25: what comes next

The source's Tuesday/Thursday statements are historical course scheduling. The conceptual progression is:

1. Apply Bayesian inference to practical **linear regression** models.
2. Later use the Bayesian framework to choose **hyperparameters**.

A hyperparameter controls another distribution or modelling choice, such as the precision of a weight prior. Lecture 5 develops the regression setup; its final slide still signposts later hyperparameter-fitting methods rather than deriving them fully.

## Recite Lecture 4's argument

1. Produce probabilities or predictive distributions, not just opaque decisions.
2. Separate inference from decisions and account for asymmetric losses.
3. Revisit predictions when population prevalence changes, checking assumptions.
4. Do not multiply probabilities without justifying independence.
5. Do not turn p-values into posterior hypothesis probabilities or ignore selection.
6. Do not interpret association as intervention effects.
7. Check subgroup mixtures before interpreting aggregate rates.

The references support the source's case-study discussion: Gelman and Nolan on teaching statistics, Schneps and Colmez on mathematics in trials, and Spiegelhalter on statistical reasoning. This lesson does not claim to reproduce or verify those books independently.

**Teach-back:** Explain how age can reverse an aggregate comparison without contradicting the within-age-group rates. Then name the distinct inference and decision stages.

Source: Lecture 4, slides 24–25, original pages 10–11. The numerical age-group example and hyperparameter definition are supporting explanations, not data or derivations supplied on those slides.
