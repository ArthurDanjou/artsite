---
title: Research
description: My research interests in AI Safety, adversarial robustness, and distributed learning, along with my ongoing work at CMAP, Ecole Polytechnique.
sitemap:
  loc: /research
---

# Research

My research sits at the intersection of **applied mathematics** and **deep learning**, with a focus on making AI systems safe and reliable in the presence of adversaries. The guiding question: how can we prove, and not just hope, that learning systems remain robust?

My PhD on **resilient distributed learning** (Byzantine attacks and defenses in federated settings) starts in **November 2026** at **CMAP, Ecole Polytechnique**, with the **ATLAS chair** (*Adversarial Techniques for Learning and AI Security*).

---

## Research Interests

::div{class="grid grid-cols-1 md:grid-cols-2 gap-6"}

:::card{title="Adversarially Robust Distributed Learning" icon="i-ph-shield-check-duotone"}
Distributed training scales learning across many workers, but a single malicious worker can corrupt the model through crafted gradients. I study **Byzantine-resilient aggregation rules** (Krum, coordinate-wise median, trimmed mean) and pre-aggregation schemes that guarantee convergence under a bounded fraction of adversaries.
:::

:::card{title="AI Safety & Alignment" icon="i-ph-compass-duotone"}
Building on my internship, I aim to contribute to **mathematically grounded safety**: formal verification, robustness certificates, and interpretability tools that give guarantees about model behavior instead of only empirical evidence.
:::

:::card{title="Secure & Reproducible ML Engineering" icon="i-ph-flask-duotone"}
Research tooling matters as much as theory. I build **open-source, reproducible frameworks** that are documented, tested, and packaged, so that robustness results can be re-run, attacked, and extended by anyone.
:::

:::card{title="Learning Theory" icon="i-ph-function-duotone"}
From generalization bounds for two-layer ReLU networks to stochastic optimization under constraints, I enjoy the **statistical and mathematical foundations** that make robustness arguments rigorous.
:::

::

---

## Ongoing Work

::card{title="M2 Research Internship at CMAP, Ecole Polytechnique" icon="i-ph-brain-duotone"}
From **April to October 2026**, I work under [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/) on robust distributed learning with adversaries: gradient manipulation attacks, open-source research tooling, and improvements to existing aggregation frameworks.

The experimental backbone is **[Krum](/projects/krum)**, my first research project: an open-source framework for Byzantine-resilient aggregation, installable via `pip install krum`.
::

---

## Publications

::card{title="Krum: Byzantine-Robust Distributed Learning Library" icon="i-ph-book-duotone"}
**In preparation, JMLR MLOSS.** With Sébastien Rouault, Mohammad Ammar Said, Peva Blanchard, and El Mahdi El Mhamdi. An open-source framework (10 aggregation rules, 5 attacks, faithful NIPS 2017 / ICML 2018 / ICML 2023 protocol reproductions) at [github.com/calicarpa/krum](https://github.com/calicarpa/krum).
::

---

## Thesis Direction

The thesis will focus on **attacks and defenses for Byzantine-resilient aggregation in federated learning**: studying how realistic federated attacks degrade robust aggregation rules, and how to design and harden aggregations against them. The work builds on the experimental setup of the **[Krum](/projects/krum)** library.

---

## Current Project

My first thesis project starts from the **optimal robustness coefficient $\kappa^\star$** introduced by Bareilles et al. ([MultiKrum and an optimal notion of robustness](https://arxiv.org/abs/2602.03899), 2026): can we derive from it an **explicit convergence-rate coefficient** for a robust gradient aggregator, and compute that coefficient for the standard aggregators of the literature (Krum, MultiKrum, Bulyan, geometric median, coordinate-wise median, trimmed mean)?

The goal is a number that says, per aggregator, whether it converges under Byzantine faults and how fast, measured on the same [Krum](/projects/krum) bench. Work in progress, no results yet.

---

## Exploratory Ideas

::card{title="Byzantine-resilient aggregation for Mixture-of-Experts" icon="i-ph-lightbulb-duotone"}
An idea from my internship that I have not yet validated with my supervisor. Mixture-of-Experts would create structural heterogeneity that breaks the IID assumptions of classic aggregation rules: a global Krum mistakes a rare honest expert for an attacker. **Per-expert aggregation** (one GAR per expert), evaluated on realistic non-IID federated benchmarks rather than synthetic label-skew, is the sketch I keep exploring on the side.
::

---

## Talks

I present my work whenever I get the chance, and slides are linked when available.

::card{title="Byzantine Robustness in Distributed Learning" icon="i-ph-presentation-duotone"}
**September 2026**: Internal Seminar, CMAP, Ecole Polytechnique. Introducing the Krum framework and our adaptive threshold mechanisms for Byzantine-resilient aggregation.
::

More talks and publications will appear here as my research progresses.
