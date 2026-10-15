# False independence: the Sally Clark case study

Slides 11–12 illustrate how an unjustified independence assumption can turn a multiplication into misleading evidence. These are **historical legal and medical claims as presented in the lecture**, not current professional guidance or an independent case review.

## The lecture's account

The slides describe Sally Clark losing two children in 1996 and 1997, being charged with their murders, and being convicted in 1999. They report that a statistical argument presented at trial used a cot-death incidence of one in 8,543 births and squared it to claim a chance of roughly one in 73 million for two deaths.

The source attributes this argument to Roy Meadow and discusses his theory of Munchausen's Syndrome by Proxy. It characterises the initial suspicions as unsubstantiated and the medical evidence as very limited. Those are descriptions of the lecture's account, not findings independently established by this lesson.

The lesson is not to memorise that number as a reliable medical estimate. It is to inspect **what assumptions make the calculation valid**.

## The product rule does not require independence

Let $D_1$ and $D_2$ denote the two deaths. Always:

$$P(D_1,D_2)=P(D_1)P(D_2\mid D_1).$$

Only if they are independent can we replace the conditional probability:

$$P(D_2\mid D_1)=P(D_2),\qquad P(D_1,D_2)=P(D_1)P(D_2).$$

Squaring $1/8543$ additionally treats the two relevant marginal probabilities as equal. The resulting arithmetic is approximately $1/72{,}982{,}849$. Correct arithmetic does not validate either modelling assumption.

## A shared cause can link events

The slide proposes an underlying medical or genetic condition $z$ as a possible common cause:

```text
    z
   ↙ ↘
  D₁  D₂
```

Even if the deaths were modelled as independent **given** $z$, uncertainty about the shared condition can make them dependent overall. Learning about the first event can change beliefs about $z$, and therefore about the second event.

![Original independent-node and shared-cause diagrams, with the historical source account](assets/lecture-04/page-05.png)

For a discrete $z$, such a model would calculate:

$$P(D_1,D_2)=\sum_z P(z)P(D_1\mid z)P(D_2\mid z).$$

This is generally not the same as multiplying the separately marginalised death probabilities. For continuous $z$, use an integral instead of a sum. This formula is supporting explanation of the graph; the lecture does not supply enough inputs to compute a defensible revised numerical risk.

**Source caveat:** slide 12 also prints an unclear inequality involving “1 in 1,500” followed by question marks. We do not treat that annotation as an established alternative probability.

## A second distinction: evidence versus hypothesis

Even a correctly calculated probability of the observations under a hypothesis is not the posterior probability of that hypothesis:

$$P(\text{evidence}\mid\text{hypothesis})\ne P(\text{hypothesis}\mid\text{evidence})\quad\text{in general}.$$

Bayes' rule needs prior probabilities and the likelihoods of relevant alternatives. A rare observation under one explanation does not by itself establish another explanation. This is a supporting connection to Lecture 3, not a calculation of any person's guilt or innocence.

**Teach-back:** Which assumption allows the one-in-8,543 probability to be squared, and how could a shared unknown condition invalidate it?

Source: Lecture 4, slides 11–12, original pages 5–6. The case outcome and fictional dependence experiment follow in the next lesson.
