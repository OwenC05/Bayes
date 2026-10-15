# Interpolation is not the same as generalisation

## The lecture's challenge

With $M=N=15$, the model has as many adjustable weights as original data points. If the square design matrix is invertible, it can interpolate them: pass through every observed target and achieve zero training residuals. **Equal counts alone do not guarantee invertibility.**

![Idealised and least-squares fits](assets/lecture-05/page-05.png)

The left-hand idealised fit is smooth and does not pass through every noisy observation. The right-hand least-squares curve follows the observed points closely, including sharp variations. The dashed reference curve helps illustrate the underlying signal in this constructed example.

## What overfitting means

Overfitting means adapting to particular noise or accidental details of the training observations in a way that worsens performance on relevant new data. It is not merely “a curve that looks wiggly”. A complicated curve could be correct if the true process were complicated.

For this demonstration, the generating function is smooth and the targets contain noise. Trying to explain every noisy deviation can therefore be counterproductive. But the lecture's “or does it?” and “No Free Lunch” warning matter: judging a model requires assumptions about the task and future data. Smoothness is a modelling preference, not a universal law of nature.

## Separate three questions

1. **Optimisation:** did we minimise the chosen training objective?
2. **Model adequacy:** can this feature family represent the relevant signal?
3. **Generalisation:** does the fitted model predict new observations well?

A successful answer to the first does not settle the other two.

A simpler or more constrained fit can have larger training error but smaller error on fresh data. Conversely, excessive constraints can miss genuine structure: **underfitting**. The next lessons introduce a controllable compromise.

**Misconception:** 15 weights and 15 observations do not mean the true function has been discovered. They can merely provide enough flexibility to interpolate those particular observations.

## Teach-back

Why does zero training error not establish that a fitted function will predict new targets well?

Source: Lecture 5, slides 7. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
