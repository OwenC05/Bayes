# Simpson’s paradox: different mixtures, different totals

Slides 21–23 use 1996 Cambridge admissions data, as presented in the lecture, to show why an aggregate comparison can obscure what happens within groups.

## Start with the totals

| Applicants | Applied | Accepted | Acceptance rate |
| --- | ---: | ---: | ---: |
| Female | 1,184 | 274 | 23.14% |
| Male | 2,470 | 584 | 23.64% |

The slides round these to 23% and 24%. Looking only at those totals, we might suspect male applicants receive more favourable treatment. But the totals mix applications to departments with very different admission rates.

## Inspect the departmental data

| Department | Female accepted/applied | Female rate | Male accepted/applied | Male rate |
| --- | ---: | ---: | ---: | ---: |
| Computer Science | 7/26 | 26.92% | 58/228 | 25.44% |
| Economics | 63/240 | 26.25% | 112/512 | 21.88% |
| Engineering | 52/164 | 31.71% | 252/972 | 25.93% |
| Medicine | 99/416 | 23.80% | 140/578 | 24.22% |
| Veterinary Medicine | 53/338 | 15.68% | 22/180 | 12.22% |

Female acceptance is higher in four departments. **Source correction:** slide 22 says it is higher in every department, but its own Medicine counts give a slightly lower female rate. The rounded slide percentages show a 24% tie. Do not repeat the stronger every-department claim as if the counts supported it.

The aggregation lesson remains: the overall male rate is higher even though the female rate is higher in four of five departments, with an especially large share of female applications going to the lowest-admission department.

## Prerequisite bridge: an overall rate is a weighted average

Let $A$ mean acceptance, $G$ identify an applicant group and $D$ identify the department. The sum rule gives:

$$P(A\mid G)=\sum_d P(A\mid G,D=d)P(D=d\mid G).$$

The first factor is the within-department acceptance rate. The second is that department's share of the group's applications. **The weights differ between groups.**

For example, Veterinary Medicine accounts for:

$$\frac{338}{1184}\approx28.55\%\quad\text{of female applications},$$

$$\frac{180}{2470}\approx7.29\%\quad\text{of male applications}.$$

Engineering, with higher acceptance rates, accounts for about 13.85% of female applications but 39.35% of male applications. Comparing totals therefore compares substantially different department mixtures.

## A clean numerical reversal

**Supporting illustration:** suppose group F has higher acceptance in each of two departments:

| Department | F accepted/applied | M accepted/applied |
| --- | ---: | ---: |
| Easier admission | 9/10 = 90% | 80/100 = 80% |
| Harder admission | 20/100 = 20% | 1/10 = 10% |

Overall, F has $29/110\approx26.36\%$ accepted, while M has $81/110\approx73.64\%$. There is no arithmetic contradiction: different weights reverse the comparison. This is the strict every-subgroup reversal that the source's rounded Medicine row does not quite demonstrate.

## What the graphical explanation means—and does not prove

Slide 23 contrasts a naive Gender → Acceptance story with Department → Gender and Department → Acceptance. Read the Department → Gender arrow as a simplified representation of different gender composition within the applicant pools, **not** as a claim that a department changes a person's gender.

![Original admissions table and the lecture's simplified confounding diagrams](assets/lecture-04/page-10.png)

The essential statistical warning is that department is associated with both the applicant-group mixture and acceptance. The causal story behind applications and admission can be more complicated than this simplified diagram.

Neither totals nor these departmental rates alone establish the presence or absence of unfairness. Relevant mechanisms, qualifications, selection and the fairness question must also be specified. Conditioning is not a universal automatic cure for every possible causal question.

**Teach-back:** Explain, using the weighted-average formula, how one group can have better rates in every subgroup yet a worse overall rate. What discrepancy should you mention when explaining the lecture's actual Medicine row?

Source: Lecture 4, slides 21–23, original pages 9–10. Exact rates and the clean two-department example are supporting calculations; the Medicine correction follows directly from the supplied counts.
