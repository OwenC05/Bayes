# Reading Gaussian contours

**Review, not a mastery claim.** You explained the mean vector and covariance matrix correctly. The question about equal variances and circular contours remains unanswered.

## A point represents a pair

For two variables, $\mathbf x=(x_1,x_2)^{\mathsf T}$ is one observation containing two values. The superscript $\mathsf T$ means transpose. The joint density $p(x_1,x_2)$ assigns a height to each point in the plane.

A **contour** connects points with the same density. Probability belongs to regions: integrate the density over an area. A contour height is not an exact-point probability.

## How the Gaussian sets the shape

The mean vector $\boldsymbol\mu$ sets the centre. The covariance matrix $\boldsymbol\Sigma$ sets the spread and relationships:

$$\boldsymbol\Sigma=\begin{pmatrix}\operatorname{Var}(X_1)&\operatorname{Cov}(X_1,X_2)\\\operatorname{Cov}(X_1,X_2)&\operatorname{Var}(X_2)\end{pmatrix}.$$

Equal-density contours have constant adjusted squared distance:

$$(\mathbf x-\boldsymbol\mu)^{\mathsf T}\boldsymbol\Sigma^{-1}(\mathbf x-\boldsymbol\mu).$$

Here $\boldsymbol\Sigma^{-1}$ is the inverse covariance or **precision matrix**. This weighting accounts for different scales and covariances.

In a full-dimensional two-variable Gaussian, contours are ellipses. Positive covariance gives an upward-sloping long direction; negative covariance gives a downward-sloping one. No causal claim follows from the tilt.

## The slide 22 example

$$\boldsymbol\mu=\begin{pmatrix}2\\1\end{pmatrix},\qquad\boldsymbol\Sigma=\begin{pmatrix}1&0.3\\0.3&1\end{pmatrix}.$$

Both variances are $1$, but the covariance is $0.3$. The contours are tilted ellipses, **not circles**.

Circles require equal variances **and zero covariance**:

$$\boldsymbol\Sigma=\sigma^2\mathbf I.$$

The identity matrix $\mathbf I$ has ones on its diagonal and zeros elsewhere; $\sigma^2$ is the shared positive variance. Unequal variances with zero covariance produce axis-aligned ellipses.

## A special Gaussian property

For jointly Gaussian variables, zero covariance implies independence because the joint density factorises:

$$p(x_1,x_2)=p(x_1)p(x_2).$$

For general distributions, zero covariance does **not** establish independence. A nonlinear relationship may remain.

**Teach-back:** Why do equal variances not guarantee circular Gaussian contours?

Source: Lecture 2, slide 22, original page 10. Slide 10/page 4 supplies an earlier joint-density illustration; do not assume all figures share the same numerical parameters or colour scale.
