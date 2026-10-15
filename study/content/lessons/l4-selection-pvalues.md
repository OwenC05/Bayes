# Selection effects and p-values: the Lucia de Berk case study

Slides 15–17 examine how statistical evidence can be distorted by data selection, changed records and incorrect interpretation of a p-value. The historical account here follows the lecture, not a current legal assessment.

## How the investigation began in the source account

The lecture describes Lucia de Berk, a nurse, being present at a baby's death initially recorded as natural in 2001. Another nurse then noticed her presence at several incidents, prompting retrospective inspection of records. The lecture reports charges of 13 murders and four attempted murders, a 2003 conviction, additional convictions on appeal in 2004, and eventual release in 2010.

More specifically, its account describes life imprisonment in 2003 for four murders and three attempted murders, followed by convictions for three additional murders in 2004. The earlier suspicion involved presence at five incidents over two years. These historical details set the context; the statistical tables are not a substitute for assessing a complete legal record.

The statistical concern is crucial: **the person and incidents were not necessarily selected independently of the pattern later being tested**.

## The original table in the lecture

| Hospital shifts | No problem | Incident | Total |
| --- | ---: | ---: | ---: |
| Without Lucia | 887 | 0 | 887 |
| Lucia present | 134 | 8 | 142 |
| Total | 1,021 | 8 | 1,029 |

The source reports a Fisher's exact-test p-value of $0.000000110572$, roughly one in nine million. It describes that number being interpreted as a probability of coincidence and then multiplied with two other p-values to produce a claimed one-in-342-million probability that the deaths were accidental.

**Those interpretations are not valid posterior probabilities.** They are claims the lecture asks us to scrutinise, not conclusions this lesson endorses.

## Prerequisite bridge: what a p-value means

Let $H_0$ be a specified null model, for example no association between nurse presence and incidents, with a defined sampling mechanism. Let $T(D)$ measure how extreme a dataset is. Schematically:

$$p\text{-value}=P_{H_0}\!\left(T(D_{\mathrm{new}})\ge T(D_{\mathrm{observed}})\right).$$

The precise definition of “at least as extreme” depends on the test and whether it is one-sided or two-sided. Fisher's exact test conditions on table margins in its null calculation.

A p-value is **not**:

- the probability the null hypothesis is true;
- the probability the observations were accidental;
- the probability a particular person is innocent or guilty;
- generally the probability of exactly the one observed dataset.

It is a tail probability **assuming** a null model and a testing procedure. Testing a preselected nurse differs from searching a large population for the most unusual nurse.

## Re-review changed the data

| Hospital shifts | No problem | Incident | Total |
| --- | ---: | ---: | ---: |
| Without Lucia | 883 | 4 | 887 |
| Lucia present | 136 | 6 | 142 |
| Total | 1,019 | 10 | 1,029 |

The lecture reports a revised p-value of about $1/1230$. This is a smaller reciprocal denominator but a **larger p-value**, and thus less extreme under the stated null test, than $1/9{,}000{,}000$. Data definition and record review can radically change statistical results.

## Why searching many people changes the question

The slide's illustrative reference group contains 250,000 nurses. If each comparable null test has probability approximately $1/1230$ of producing a result at least this extreme, the expected count is:

$$250{,}000\times\frac1{1230}\approx203.$$

This motivates the source's “around 200” statement. It is an illustrative multiple-testing calculation, not evidence that any particular number of real nurses were investigated or that all tests share the same conditions. Linearity of expectation does not require independent tests; interpreting an actual search still requires its selection process and reference population.

Multiplying p-values is not a general way to obtain a combined valid p-value, and even a correctly combined test result would not become a posterior probability of a legal hypothesis.

## Explain it to a beginner

> An unusual pattern for one person may be unsurprising after searching many people. A p-value describes unusual data under a specified null model; it does not directly tell us the probability of that person's innocence or guilt. We must also check how people and events entered the dataset.

**Teach-back:** Explain the difference between “this pattern is rare for a nurse chosen in advance” and “some nurse in a large search will have a rare-looking pattern”. Why is neither statement a posterior guilt probability?

Source: Lecture 4, slides 15–17, original pages 7–8. The generic p-value definition and selection explanation are supporting foundations; the lesson does not derive Fisher's exact test or independently recompute the source p-values.
