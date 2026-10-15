# Choosing and reading basis functions

## Several possible feature families

The slides list linear features, polynomial features such as $x^m$, bespoke hand-crafted features, and Gaussian radial basis functions (RBFs). A basis function is a building block, not the final fitted curve.

For the illustrated model:

$$\phi_m(x)=\exp\left[-\frac{(x-c_m)^2}{r^2}\right].$$

- $c_m$: the fixed centre of basis function $m$.
- $r>0$: a common fixed width parameter.
- $x$: the input at which the feature is evaluated.

At $x=c_m$, the feature equals $1$. At distance $r$, it equals $e^{-1}\approx0.368$. Farther away, its value decreases. A larger $r$ makes a broader feature.

This expression resembles a Gaussian density but is **not a normalised probability density**: it is a feature function, with neither a density-normalising prefactor nor the usual $2\sigma^2$ denominator. Do not mistake its width $r$ for the observation-noise standard deviation $\sigma$.

## How the lecture constructs its model

It places a centre on each of the original data inputs: $c_m=x_m$. With 15 original observations this gives 15 basis functions. The fitting procedure adjusts their weights, not their centres or common width.

The combined prediction is

$$\hat f(x)=w_1\phi_1(x)+\cdots+w_M\phi_M(x).$$

Positive weights add bumps; negative weights subtract them. Overlapping features allow the sum to vary smoothly across the input domain. The features' effects are not completely local: Gaussian RBFs have nonzero tails.

## Read slide 5's figure

![Original page showing the data and RBF building blocks](assets/lecture-05/page-04.png)

The black points are observed targets. The blue curves along the bottom show the basis functions, **shifted downward for visual separation**. Their vertical plotting position is not a collection of negative probability densities. The final fitted curve will be a weighted combination, not simply one selected blue curve.

**Supporting example:** with two features taking values $0.8$ and $0.2$ at a particular input, weights $2$ and $-1$ produce $2(0.8)-1(0.2)=1.4$.

**Misconception:** choosing Gaussian basis functions does not itself make the regression Bayesian. Bayesian inference begins when we place distributions over unknown quantities and update them.

## Teach-back

Explain the roles of an RBF centre, its width and its weight. Which are fixed and which are learned in this lecture?

Source: Lecture 5, slides 4, 5. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
