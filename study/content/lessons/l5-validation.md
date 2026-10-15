# Selecting lambda using held-out observations

## Why training error is not enough

For each candidate $\lambda$, fit the weights using the training observations, then evaluate prediction error on a separate **validation**, or hold-out, set. Choose a candidate using validation performance, not simply its training residuals.

The slide's illustrative held-out errors are:

| $\lambda$ | Shown validation error |
|---|---|
| $10$ | $0.462$ |
| $0.1$ | $0.291$ |
| $10^{-15}$ | $0.330$ |

The middle candidate performs best among those three on this particular validation sample. An almost exact training fit did not win.

![Validation examples with held-out observations](assets/lecture-05/page-08.png)

## Read the broad-range plot

![Training, validation and test error across lambda](assets/lecture-05/page-09.png)

The horizontal axis is **log lambda**, allowing many orders of magnitude to fit on the plot. Moving right increases regularisation. The vertical axis is RMS error:

$$\operatorname{RMSE}=\sqrt{\frac1K\sum_{k=1}^{K}(y_k-\hat f(x_k))^2},$$

where $K$ is the number of observations in the set being evaluated.

- The black dashed training-error curve rises as fitting is constrained more strongly.
- The blue validation curve initially improves somewhat, reaches a minimum, then worsens under excessive regularisation.
- The gold test curve need not have its minimum at the same place as the validation curve.

The plot marks the validation-selected setting and illustrates that selection is imperfect: different finite samples give different estimates of generalisation. The slide explicitly assumes the observation noise variance $\sigma^2$ is known.

## Keep the roles separate

- **Training set:** choose the weights for a given hyperparameter setting.
- **Validation set:** select hyperparameters such as $\lambda$.
- **Test set:** estimate final performance after those choices.

This role separation is a supporting explanation of the plot. If we repeatedly choose settings by looking at test error, that set becomes part of tuning and is no longer an untouched final evaluation.

**Misconception:** validation gives evidence about future performance; it does not reveal a guaranteed universally optimal $\lambda$.

## Teach-back

Explain why we use validation rather than training error to select lambda, and why the test set must not become another tuning set.

Source: Lecture 5, slides 10, 11. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
