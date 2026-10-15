# Separate inference from decisions

Lecture 4 asks a different question from Lecture 3: **once we have a probability distribution, what should we do with it?** Slides 1–4 introduce the separation between learning about the world and choosing an action.

## Prerequisite bridge: predictions can express uncertainty

A classification task predicts a category, such as whether a transaction is fraudulent. A probabilistic classifier returns probabilities for its possible categories, not just a label.

$$P(\mathcal C_1\mid\mathbf x)=0.7,\qquad P(\mathcal C_0\mid\mathbf x)=0.3.$$

Here $\mathbf x$ is the observed input and $\mathcal C_k$ is category $k$. These two classes are exhaustive and mutually exclusive, so their probabilities sum to one. The numbers describe uncertainty, not two outcomes occurring simultaneously.

Regression predicts a numerical value. Instead of only predicting a house price, for example, we can return a **predictive distribution** over prices. The lecture recommends a distribution, or at least an expected value with meaningful uncertainty bars. An uncertainty bar must have a specified interpretation; not every bar automatically contains 95% of outcomes.

## Two stages, two questions

1. **Inference:** What is plausible, given the observations and model assumptions?
2. **Decision:** Which action is best, given those probabilities and the consequences of being wrong?

The slide contrasts a monolithic machine-learning box that directly produces action with a transparent chain:

```text
Data → Probabilistic inference → Probabilities → Decision → Action
```

In the diagram, scientists supply the inference and policy-makers supply the decision. This expresses a division of responsibilities, not a claim that either group works in isolation. Decisions depend on values, costs, constraints and context as well as scientific estimates.

![Original inference–decision diagram and the following historical discussion](assets/lecture-04/page-03.png)

## Why the intermediate probabilities matter

**Supporting example:** two systems both label a transaction “fraud”, but one assigns probability 0.51 and the other 0.999. A label alone hides the difference. Probabilities allow different responses: ask for additional authentication, investigate manually, or block the payment, depending on the costs.

The same inference can support different reasonable actions when circumstances differ. Conversely, the action alone does not tell you what probability the system estimated.

Laplace's 1814 passage on slide 2 motivates probability as a mathematical discipline for uncertain reasoning. It is a historical statement of aspiration, not a guarantee that arbitrary models produce correct answers. This lecture's cautionary examples show why assumptions and data collection still matter.

The lecture notes that some classification methods, such as a standard support-vector machine, do not directly produce probabilities. A score or distance from a decision boundary is not automatically a calibrated class probability. Bayesian models are not the only models capable of probabilistic output.

## Misconceptions to avoid

- A high class probability is not itself an instruction to take a particular action.
- A probability distribution is conditional on assumptions and evidence; it is not immunity from model error.
- “Probabilistic” does not mean “Bayesian only”.

## Explain it to a beginner

> First estimate what might be true and how uncertain you are. Then choose what to do by considering the consequences of each action. Keeping those stages separate makes the reasoning visible and lets the same evidence support different decisions when the costs differ.

**Teach-back:** Why might two people agree on a 70% probability but reasonably choose different actions?

Source: Lecture 4, slides 1–4, original pages 1–3. Worked transaction illustration is supporting explanation.
