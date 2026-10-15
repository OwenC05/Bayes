# Correlation is not an instruction for intervention

Slides 18–20 explain that an observed association does not establish a causal effect. More strongly, an intervention's effect can have the **opposite sign** to an observed correlation.

## The fictional student example

Students take a test with no time limit. We record:

- $\tau$: time taken, in minutes;
- $m$: test score, in marks;
- $z$: a possible unobserved common cause, described as “intelligence” in the lecture.

The original scatter plot has time on the horizontal axis and score on the vertical axis. Its fitted line slopes down: students taking longer tend to have lower scores. Each dot represents an observed student, not a controlled intervention.

![Lecture plot of test score against time, with the source graphical explanation below](assets/lecture-04/page-09.png)

## Two different stories

The superficial story is:

```text
Time taken → Mark
```

It might tempt us to say “spending longer causes a lower mark; students should stop sooner”. But the scatter plot alone cannot justify that recommendation.

The source instead proposes:

```text
          z
         ↙ ↘
   Time taken  Mark
```

Students who find the test easier may both finish sooner and obtain higher marks. That common cause can create a negative association without time spent being the harmful cause.

The label $z$ is a hypothetical explanatory variable, not something the plot measures or a demonstrated complete theory of student performance. Preparation, test familiarity and other factors could matter too. The source graph is a proposed explanation, not identified causal truth from the scatter alone.

## Prerequisite bridge: observation versus intervention

An observational question is: **what scores do we see among students who happened to spend 40 minutes?**

A causal question is: **what would change if we made comparable students spend longer?**

These are different questions. Choosing people by observed time can select students with different underlying characteristics. Making the same kind of student spend longer changes time without necessarily changing those characteristics.

**Supporting example:** within comparable preparation levels, an extra five minutes might allow more answers to be checked and improve marks. Across all students, better-prepared students could still finish faster and score higher. A positive causal effect and negative overall association can coexist. The source does not provide an experiment or numerical effect estimate proving that this particular effect occurs.

## Why a Bayesian model does not automatically solve causality

Bayesian inference can quantify uncertainty **within a model**. If the model treats an association as causal without justification, a precise posterior does not repair that assumption. Causal conclusions require suitable structural assumptions, study design and evidence beyond the correlation alone.

## Misconceptions to avoid

- A regression line's downward slope is not proof that increasing time reduces marks.
- “Correlation does not imply causation” does not mean correlated variables can never be causally related.
- The lecture's common-cause graph is a candidate explanation, not a graph recovered uniquely from these observations.

**Teach-back:** Why does observing that slower students score lower not establish that forcing a student to finish sooner would improve their mark?

Source: Lecture 4, slides 18–20, original pages 8–9. Intervention wording and the within-preparation illustration are supporting explanations of the lecture's causal warning.
