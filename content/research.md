---
title: Research
description: My research interests in AI Safety, adversarial robustness, and distributed learning, along with my ongoing work at CMAP, Ecole Polytechnique.
sitemap:
  loc: /research
---

# Research

My research combines applied mathematics and deep learning, with one focus: making AI systems safe and reliable in the presence of adversaries. The guiding question: how can we prove, and not just hope, that learning systems remain robust?

My PhD on **resilient distributed learning** (Byzantine attacks and defenses in federated settings) starts in **November 2026** at **CMAP, Ecole Polytechnique**, under the supervision of [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/), with the **ATLAS chair** (*Adversarial Techniques for Learning and AI Security*). Published work and presentations are collected on the [publish page](/publish).

---

## Research Interests

**Adversarially robust distributed learning.** Distributed training scales learning across many workers, but a single malicious worker can corrupt the model through crafted gradients. I study Byzantine-resilient aggregation rules (Krum, coordinate-wise median, trimmed mean) and pre-aggregation schemes that guarantee convergence under a bounded fraction of adversaries.

**AI Safety & Alignment.** Building on my internship, I want to work on mathematically grounded safety: formal verification, robustness certificates, and interpretability tools that give guarantees about model behavior instead of only empirical evidence.

**Secure & Reproducible ML Engineering.** Research tooling matters as much as theory. I build open-source, reproducible frameworks that are documented, tested, and packaged, so that robustness results can be re-run, attacked, and extended by anyone.

**Learning Theory.** From generalization bounds for two-layer ReLU networks to stochastic optimization under constraints, I enjoy the statistical and mathematical foundations that make robustness arguments rigorous.

---

## Ongoing Work

From **April to October 2026**, I work under the supervision of [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/), with [Peva Blanchard](https://scholar.google.com/citations?user=ZX4C7ScAAAAJ&hl=en) and [Sébastien Rouault](https://sebastien.rouau.lt/) as co-advisors, on robust distributed learning with adversaries: gradient manipulation attacks, open-source research tooling, and improvements to existing aggregation frameworks.

The experimental backbone is **[Krum](/projects/krum)**, my first research project: an open-source framework for Byzantine-resilient aggregation, installable via `pip install krum`.

---

## Thesis Direction

The thesis will focus on **attacks and defenses for Byzantine-resilient aggregation in federated learning**: studying how realistic federated attacks degrade robust aggregation rules, and how to design and harden aggregations against them. The work builds on the experimental setup of the **[Krum](/projects/krum)** library.

---

## Current Project

My first thesis project starts from the **optimal robustness coefficient $\kappa^\star$** introduced by Bareilles et al. ([MultiKrum and an optimal notion of robustness](https://arxiv.org/abs/2602.03899), 2026): can we derive from it an **explicit convergence-rate coefficient** for a robust gradient aggregator, and compute that coefficient for the standard aggregators of the literature (Krum, MultiKrum, Bulyan, geometric median, coordinate-wise median, trimmed mean)?

The goal is a number that says, per aggregator, whether it converges under Byzantine faults and how fast, measured on the same [Krum](/projects/krum) bench. Work in progress, no results yet.

