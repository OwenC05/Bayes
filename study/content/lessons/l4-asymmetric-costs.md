# Choose actions using expected costs

Slides 9–10 ask: **if two kinds of mistake have different consequences, why use the same probability threshold for both?** The probabilities describe uncertainty; the cost matrix determines the action.

## Read a cost matrix

For the lecture's hypothetical medical example, P means disease and N means no disease:

| True state | Predict P | Predict N |
| --- | ---: | ---: |
| P | 0 | 24 |
| N | 1 | 0 |

These numbers are losses, not probabilities. A false negative costs 24, while a false positive costs 1. Correct classifications have loss 0 in this simplified example. The values are teaching assumptions, not clinical recommendations.

Let $p=P(\mathcal C_1\mid\mathbf x)$ be our estimated disease probability. The true state is unknown when we act.

## Average each action's costs

If we predict P, we pay 1 only when the person is actually N:

$$R(P)=0\times p+1\times(1-p)=1-p.$$

If we predict N, we pay 24 only when the person is actually P:

$$R(N)=24\times p+0\times(1-p)=24p.$$

$R$ denotes expected loss, sometimes called conditional risk. Comparing these two quantities derives the decision threshold:

$$R(P)<R(N)\quad\Longleftrightarrow\quad1-p<24p\quad\Longleftrightarrow\quad p>\frac1{25}=0.04.$$

Thus the lecture's threshold $\kappa$ is **4%**, not 50%, for these costs. At exactly 4% the actions have equal expected loss; a tie rule can choose either.

### Worked decision

At $p=0.10$, the most likely state is no disease. Nevertheless:

$$R(P)=0.9,\qquad R(N)=2.4.$$

Predicting P has lower expected loss. This does not change the disease probability from 10% to something higher. **Changing costs changes the action, not the evidence.**

## The fraud example includes non-zero correct-decision costs

Slide 9 also gives this transaction cost matrix, in dollars:

| True state | Predict fraud | Predict legitimate |
| --- | ---: | ---: |
| Fraud | 0.02 | 275 |
| Legitimate | 9 | 0.02 |

If $p$ is fraud probability, the expected costs are:

$$R(P)=0.02p+9(1-p),\qquad R(N)=275p+0.02(1-p).$$

Predict fraud when:

$$8.98<283.96p\quad\Longleftrightarrow\quad p>\frac{8.98}{283.96}\approx0.03162.$$

This **supporting calculation** shows why we must use the whole matrix, not assume that correct actions always cost zero. Here the threshold is about 3.16% under the slide's simplified costs.

## What the demo represents

Slide 10 signposts a live demonstration but contains no additional equations or reproducible numerical dataset. The lesson to extract is that one probabilistic classifier can support different decisions when the loss matrix changes. We do not reconstruct missing demo output.

## Explain it to a beginner

> For each action, list what it would cost in each possible state and average those costs using the predicted probabilities. Choose the action with the smaller expected cost. The most likely class is not always the lowest-cost decision.

**Teach-back:** Derive the 4% medical threshold and explain why it does not mean a patient above that threshold is probably diseased.

Source: Lecture 4, slides 9–10, original pages 4–5. Threshold derivations and the 10% calculation are supporting explanations of the supplied matrices.
