---
title: Research
description: My research interests in AI Safety, adversarial robustness, and distributed learning, along with my ongoing work at CMAP, Ecole Polytechnique.
sitemap:
  loc: /research
---

# Research

My research sits at the intersection of **applied mathematics** and **deep learning**, with a focus on making AI systems safe and reliable in the presence of adversaries. The guiding question: how can we prove, and not just hope, that learning systems remain robust?

---

## Research Interests

:::div{class="grid grid-cols-1 md:grid-cols-2 gap-6"}

::card{title="Adversarially Robust Distributed Learning" icon="i-ph-shield-check-duotone"}
Distributed training scales learning across many workers, but a single malicious worker can corrupt the model through crafted gradients. I study **Byzantine-resilient aggregation rules** (Krum, coordinate-wise median, trimmed mean) and pre-aggregation schemes that guarantee convergence under a bounded fraction of adversaries.
::

::card{title="AI Safety & Alignment" icon="i-ph-compass-duotone"}
Building on my internship, I aim to contribute to **mathematically grounded safety**: formal verification, robustness certificates, and interpretability tools that give us guarantees about model behavior rather than empirical hope.
::

::card{title="Secure & Reproducible ML Engineering" icon="i-ph-flask-duotone"}
Research tooling matters as much as theory. I build **open-source, reproducible frameworks** — documented, tested, and packaged — so that robustness results can be re-run, attacked, and extended by anyone.
::

::card{title="Learning Theory" icon="i-ph-function-duotone"}
From generalization bounds for two-layer ReLU networks to stochastic optimization under constraints, I enjoy the **statistical and mathematical foundations** that make robustness arguments rigorous.
::

:::

---

## Ongoing Work

::card{title="M2 Research Internship — CMAP, Ecole Polytechnique" icon="i-ph-brain-duotone"}
From **April to October 2026**, I work under [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/) on robust distributed learning with adversaries: gradient manipulation attacks, open-source research tooling, and improvements to existing aggregation frameworks.

The experimental backbone is **[Krum](/projects/krum)** — an open-source framework for Byzantine-resilient aggregation, installable via `pip install krum`.
::

---

## PhD Directions

My PhD at **CMAP, Ecole Polytechnique** starts in **November 2026**, continuing this line of work. I plan to explore:

- **Byzantine robustness at scale** — aggregation rules that stay provably safe as clusters grow and decentralization increases.
- **Formal verification for ML pipelines** — bridging worst-case guarantees and practical training.
- **Safety-critical applications** — from federated learning to autonomous decision systems.

---

## Talks

I present my work whenever I get the chance — slides are linked when available.

::card{title="Byzantine Robustness in Distributed Learning" icon="i-ph-presentation-duotone"}
**September 2026** — Internal Seminar, CMAP, Ecole Polytechnique. Introducing the Krum framework and our adaptive threshold mechanisms for Byzantine-resilient aggregation.
::

More talks and publications will appear here as my research progresses.
