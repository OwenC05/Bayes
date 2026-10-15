# A good decision can have a bad outcome

Slides 5–6 distinguish **decision quality** from **the outcome that happened**, then explain what useful class probabilities enable.

## Before versus after the outcome

When we decide, the future is uncertain. Judge a decision against the evidence available **at the time**, not solely against the eventual outcome.

Slide 5 uses Jaynes's historical discussion of Persian kings to make this point: a reasonable decision can have disastrous consequences, while a foolish decision can happen to work. Nelson's letter illustrates the temptation to assign wisdom simply to whoever guessed correctly.

This is not an excuse to ignore bad results. Repeated outcomes can reveal model or decision-rule problems. The narrower point is that **one realised outcome does not establish whether the original reasoning was sound**.

## Prerequisite bridge: expected loss

A loss is a numerical representation of an undesirable consequence. Expected loss averages the losses across possible states, weighted by their probabilities.

$$\mathbb E[L(a,Y)\mid\mathbf x]=\sum_y L(a,y)P(Y=y\mid\mathbf x).$$

- $a$: a proposed action.
- $Y$: the unknown true state.
- $L(a,y)$: the loss if we take action $a$ when the state is $y$.
- The expectation is evaluated before the outcome is known.

**Supporting example:** suppose action A has loss 0 with probability 0.9 and loss 100 with probability 0.1. Its expected loss is 10. Action B has certain loss 12. Minimising expected loss selects A, yet sometimes A incurs loss 100. That bad outcome does not retrospectively change the original expected losses. The loss function must reflect the relevant consequences; the numbers are not universal moral rules.

## Three uses of probabilistic classification

Slide 6 writes estimated class probabilities as $\widehat P(\mathcal C_k\mid\mathbf x)$. The hat emphasises that these are estimates produced by a model.

1. **Recalibrate for population changes.** A model trained on a balanced sample may not provide appropriate probabilities in a population where one class is rare.
2. **Account for asymmetric costs.** Missing a serious case may cost much more than raising a false alarm. The decision threshold need not be 0.5.
3. **Re-inspect uncertain predictions.** A borderline prediction can trigger additional information gathering or human review, rather than forcing the same treatment as a confident prediction.

The lecture does not prescribe one universal review threshold. Any review process also has costs and limitations.

## Misconceptions to avoid

- “It worked” does not prove a decision was justified beforehand.
- Expected loss is not the loss that must occur on the next trial.
- The most probable category need not be the action with smallest expected loss.

## Explain it to a beginner

> A decision uses what we know before the future happens. Good reasoning can still be unlucky. Probabilities let us account for uncertainty and consequences instead of pretending the most likely outcome is guaranteed.

**Teach-back:** An action chosen to minimise expected loss produces a bad result. What would you need to inspect before calling the original decision foolish?

Source: Lecture 4, slides 5–6, original page 3. Expected-loss notation and numerical example are supporting explanations; slides 9–10 apply this idea.
