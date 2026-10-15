# A fictional experiment makes clustering visible

Slides 13–14 finish the false-independence section. First, a contrived dataset shows that events can cluster; then the lecture describes the eventual Sally Clark case outcome.

## The slide's dataset

Imagine 10,000 examples:

- 9,990 have no events.
- 10 have two events each.

There are 20 event occurrences in total. The slide calculates an event-count rate of $20/10{,}000=0.002$, squares it under a proposed independence assumption, and compares it with the observed fraction of examples containing a pair:

$$0.002^2=0.000004,\qquad \frac{10}{10{,}000}=0.001.$$

$$\frac{0.001}{0.000004}=250.$$

That is the source of the slide's “250 times more frequent” statement. The central message is that a model of unrelated events can severely underestimate clustered observations.

## Important denominator caveat

An **event-count rate per example** is not automatically the probability of a particular binary event. The slide does not fully define the event slots or sampling mechanism behind its squared 0.002.

To make the distinction precise, suppose each example has two labelled binary indicators, A and B, both equal to 1 in those same 10 examples. Then:

$$P(A=1)=P(B=1)=0.001,\qquad P(A=1,B=1)=0.001.$$

An independence model would instead predict $0.001^2=0.000001$, a factor of **1,000** smaller than the observed pair frequency. This is a **supporting, explicitly defined version**, not the slide's 250-fold calculation. Do not silently interchange the denominators.

In that labelled dataset, $P(B=1\mid A=1)=1$: once A is known to have occurred, B always occurs too. That makes the failure of independence especially clear.

## Why this is not a medical estimate

The dataset is fictional and deliberately extreme. It demonstrates a logical modelling issue, not the numerical risk of any real clinical event. Real estimates require defensible data, population definitions and assumptions.

## The lecture's historical outcome

Slide 14 reports that campaigners, including David MacKay, challenged the statistical argument, that the underlying data and other aspects of the evidence were scrutinised, and that Sally Clark's conviction was quashed in 2003. It records her death in 2007 at age 42. These details are reported as the lecture's historical account, not as an independent analysis of the legal proceedings.

The source's reference to another UK conviction being in the public eye is a dated classroom remark, not a new case study or an invitation to infer facts about an unnamed case.

## Explain it to a beginner

> Counting individual events does not tell us how they cluster. Before multiplying probabilities, define the events and check whether learning about one changes the probability of the other. Clear denominators matter as much as correct multiplication.

**Teach-back:** In the explicitly defined A/B dataset, why is the pair probability 0.001 rather than $0.001^2$? What makes the slide's 250-fold arithmetic convention-dependent?

Source: Lecture 4, slides 13–14, original pages 6–7. The labelled A/B reconstruction is supporting explanation and deliberately distinguished from the slide's own rate calculation.
