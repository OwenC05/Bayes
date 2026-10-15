# Regression and linear-in-parameter models

## The problem the lecture solves

**Regression means predicting a real-valued quantity**, such as a temperature or a measured signal. It differs from classification, where the outcome is a category.

The lecture generates $N=15$ observations from $f(x)=\sin(x)$ with Gaussian noise of standard deviation $\sigma=0.25$. The input $x_n$ identifies where a measurement was taken; the target $y_n$ is the noisy measured value. The dataset is $\mathcal D=\{(x_n,y_n)\}_{n=1}^{N}$.

The learner sees the observations, not the true function. Our objective is to infer a useful approximation to the underlying function and ultimately predict at new inputs. Knowing that the demonstration used a sine function is not information automatically available to the fitted model.

The lecture's route is least squares → regularisation → likelihood → Gaussian weight prior → posterior → MAP → sequential Bayesian learning.

## The model

$$\hat f(x;\mathbf w)=\sum_{m=1}^{M}w_m\phi_m(x).$$

- $\hat f$: the model's approximation, not the unknown true function itself.
- $M$: the number of basis functions.
- $\phi_m(x)$: a **fixed basis function** transforming the input into a feature.
- $w_m$: its adjustable weight.
- $\mathbf w$: the vector containing all weights.

At any input, evaluate the basis functions, multiply their values by the weights, then add. Learning changes the weights; the basis functions are held fixed in this lecture.

## Linear does not mean a straight line in x

For example, choose $\phi_1(x)=1$, $\phi_2(x)=x$, $\phi_3(x)=x^2$. Then

$$\hat f(x;\mathbf w)=w_1+w_2x+w_3x^2.$$

This can be curved in $x$, but each weight enters linearly: no $w_m^2$, no products between weights, and no weight inside an exponential. With $\mathbf w=(1,2,3)^{\mathsf T}$ and $x=2$, the prediction is $1+4+12=17$.

The constant basis $\phi_1(x)=1$ supplies an intercept or bias term. This is an explanatory example; the lecture's illustrated model instead uses Gaussian basis functions centred on the data.

**Misconception:** “Linear regression can only fit straight lines.” It is linear in the adjustable weights, not necessarily in the original input.

## Teach-back

What makes a regression model linear in its parameters, even when its curve is not a straight line?

Source: Lecture 5, slides 1, 2, 3. Derivation bridges and new numerical examples are supporting explanations, not extra slide claims.
