# One declared joint model, several inferential questions

## Prerequisite bridge

**Joint distribution:** A probabilistic model specifies how all random variables fit together, not just a prediction formula.

**Conditioning:** Posterior inference fixes observations and changes the distribution over latent quantities.

## A model function describes probability, not a fitted answer

Ordinary prediction code might take an input and return one number. A probabilistic model instead describes a joint distribution over latent variables and potential observations. In the lecture's Beta–Bernoulli example, the declaration says

$$\theta\sim\operatorname{Beta}(\alpha,\beta),\qquad y_i\mid\theta\sim\operatorname{Bernoulli}(\theta).$$

The unknown scalar $\theta\in(0,1)$ is a shared success probability. The hyperparameters $\alpha,\beta>0$ are fixed choices here. With conditional independence, the joint is

$$p(\theta,\mathbf y\mid\alpha,\beta)=p(\theta\mid\alpha,\beta)\prod_{i=1}^N p(y_i\mid\theta).$$

A declarative function supplies these factors and their relationships. An inference engine uses that declaration in different ways. Calling a site `sample` does not mean every use is an independent prior draw: handlers can condition sites or use them to construct a log joint for inference.

## Three questions from the same joint

**Prior simulation:** draw $\theta$ from its prior. This explores assumptions before conditioning on observed outcomes.

**Prior predictive simulation:** draw $\theta$, then draw new outcomes conditional on it. This explores what data the entire prior model expects. The distribution is

$$p(\mathbf y\mid\alpha,\beta)=\int p(\mathbf y\mid\theta)p(\theta\mid\alpha,\beta)\,d\theta.$$

**Posterior inference:** fix $\mathbf y=\mathbf y_{\rm obs}$ and target $p(\theta\mid\mathbf y_{\rm obs},\alpha,\beta)$. A sampler such as NUTS approximates this conditional distribution; it does not change the model into a different prior.

**Posterior predictive simulation** then conditions on the observations while averaging new outcomes over posterior $\theta$. It is a further operation, not synonymous with obtaining the posterior parameter samples.

## Worked likelihood contribution

For the tutor-created sequence $(1,0,1)$, the likelihood is $\theta^2(1-\theta)$. At $\theta=0.25$ it is $0.046875$; at $\theta=0.75$ it is $0.140625$. These are relative plausibilities of the **fixed data** under two candidate values, not posterior probabilities for those values. The prior and normalisation are still needed to define a posterior distribution.

Declaring the model permits an engine to evaluate log prior plus log likelihood. The engine can avoid explicitly computing evidence for MCMC acceptance ratios, but that is an algorithmic advantage, not permission to omit prior factors or observational terms.

## What abstraction removes—and what remains yours

The source emphasises avoiding repetitive manual implementation. A model can be passed to rendering, simulation, sampling and diagnostic tools. You still choose the distribution families, parameterisation, support, independence assumptions and what is observed. Software cannot infer the intended scientific meaning from a variable name.

A graph renderer is one view of the declaration, not another inference engine. A sampler is a method for exploring a target, not the target itself. Exact Beta–Bernoulli conjugacy gives a useful independent benchmark even when a generic sampler is used for teaching.

**Misconception:** a successful function call or attractive trace plot is not evidence that the model matches reality. Separate model specification, numerical inference, posterior checking and substantive interpretation.

## Checkpoint

What changes when the same declared model is used for posterior inference rather than prior simulation? A. The prior is deleted. B. Observations are fixed and the inference engine targets the corresponding conditional distribution.

<details>
<summary>Answer and explanation</summary>

B. The joint model specifies the target. Prior simulation, conditioning and posterior prediction are different operations on that model, and the inference algorithm is a separate component.

</details>

## Teach-back

Explain how one model function supports prior simulation, posterior inference and prediction without confusing the model with the inference algorithm.

**Source boundary:** Lecture 10, slides 10. Original figures and explicitly quoted outputs belong to the supplied PDF. Derivations, calculations, corrections and checkpoints are supplemental tutor support; no demonstration or software has been run here.
