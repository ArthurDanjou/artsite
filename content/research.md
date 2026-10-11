---
title: Research
description: PhD research at CMAP on adversarial robustness, data ownership verification, and efficient distributed learning, starting with signSGD and Byzantine fault tolerance.
sitemap:
  loc: /research
---

# Research

My research combines applied mathematics and deep learning, with one focus: making AI systems safe and reliable in the presence of adversaries. The guiding question: how can we prove, and not just hope, that learning systems remain robust?

My PhD will study **the trade-offs between adversarial robustness, data ownership verification, and efficient learning**. It starts in **November 2026** at **CMAP, Ecole Polytechnique**, with the **ATLAS chair** (*Adversarial Techniques for Learning and AI Security*). [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/) will supervise the thesis, with **Katia Meziani** and **Vladimir Kostic** as co-directors and [Peva Blanchard](https://scholar.google.com/citations?user=ZX4C7ScAAAAJ&hl=en) and [Sébastien Rouault](https://sebastien.rouau.lt/) as co-advisors, continuing the collaboration established during my M2 internship. Published work and presentations are collected on the [publications page](/publications).

**Keywords:** Adversarial learning, distributed learning, fault tolerance, data poisoning, digital watermarking, efficient learning.

---

## Research Interests

**Adversarially robust distributed learning.** Distributed training scales learning across many workers, but a single malicious worker can corrupt the model through crafted gradients. I study Byzantine-resilient aggregation rules (Krum, coordinate-wise median, trimmed mean) and pre-aggregation schemes that guarantee convergence under a bounded fraction of adversaries.

**Data Ownership Verification & Digital Watermarking.** Can a dataset owner verify that their data was used to train a model? I study how targeted, controlled data poisoning can embed a signature in training data that propagates to the learned model, enabling ownership verification.

**Efficient Learning.** Large-scale training incurs communication and local computation costs. Compression methods such as signSGD reduce communication costs; my research asks how these efficiency gains interact with adversarial robustness and data watermarking.

**Secure & Reproducible ML Engineering.** Research tooling matters as much as theory. I build open-source, reproducible frameworks that are documented, tested, and packaged, so that robustness results can be re-run, attacked, and extended by anyone.

**Learning Theory.** From generalization bounds for two-layer ReLU networks to stochastic optimization under constraints, I enjoy the statistical and mathematical foundations that make robustness arguments rigorous.

---

## Ongoing Work

From **April to October 2026**, I work under the supervision of [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/), with [Peva Blanchard](https://scholar.google.com/citations?user=ZX4C7ScAAAAJ&hl=en) and [Sébastien Rouault](https://sebastien.rouau.lt/) as co-advisors, on robust distributed learning with adversaries: gradient manipulation attacks, open-source research tooling, and improvements to existing aggregation frameworks.

The experimental backbone is **[Krum](/projects/krum)**, my first research project: an open-source framework for Byzantine-resilient aggregation, installable via `pip install krum`.

---

## Thesis Direction

Machine learning increasingly operates in environments where participants cannot necessarily trust one another. Data can be deliberately manipulated or poisoned to influence a model, while large-scale training creates growing communication and computation costs. Within the ATLAS chair, my thesis also addresses the use of datasets without their owners' authorization.

**Data Ownership Verification (DoV)** seeks to let an owner verify that a dataset was used to train a model. One approach embeds a signature in the data that persists through training. Targeted, controlled data poisoning can therefore serve as a digital watermarking mechanism, raising questions about its compatibility with defenses against malicious poisoning.

The central question is: **can learning methods simultaneously provide adversarial robustness, support data ownership verification, and remain efficient through techniques such as compression?** The thesis will investigate how these properties interact, when they can coexist, and what trade-offs are necessary.

---

## Current Project

My first thesis project, **already underway**, focuses on **signSGD**, a compression technique for distributed learning that communicates the sign of each gradient coordinate. The goal is to understand under which assumptions signSGD can be proved robust in the sense of **Byzantine fault tolerance (BFT)**.

This provides a first case study of the interaction between compression and adversarial conditions, before extending the investigation to data ownership verification and the broader trade-offs of the thesis. Work in progress, no results yet.

---

## Selected References

These papers provide background for the thesis topic.

- **Krum.** Blanchard et al. *Machine Learning with Adversaries: Byzantine Tolerant Gradient Descent.* NeurIPS, 2017. [Paper](https://arxiv.org/abs/1703.02757).
- **Bulyan.** El-Mhamdi, Guerraoui and Rouault. *The Hidden Vulnerability of Distributed Learning in Byzantium.* ICML, 2018. [Paper](https://arxiv.org/abs/1802.07927).
- **Collaborative Learning in the Jungle.** El-Mhamdi et al. *Collaborative Learning in the Jungle (Decentralized, Byzantine, Heterogeneous, Asynchronous and Nonconvex Learning).* NeurIPS, 2021. [Paper](https://proceedings.neurips.cc/paper/2021/hash/d2cd33e9c0236a8c2d8bd3fa91ad3acf-Abstract.html).
- **Data Taggants.** Bouaziz, Usunier and El-Mhamdi. *Data Taggants: Dataset Ownership Verification via Harmless Targeted Data Poisoning.* ICLR, 2025 (Spotlight). [Paper](https://arxiv.org/abs/2410.09101).
- **Winter Soldier.** Bouaziz et al. *Winter Soldier: Backdooring Language Models at Pre-Training with Indirect Data Poisoning.* ICLR, 2026. [Paper](https://arxiv.org/abs/2506.14913).
- **signSGD.** Bernstein et al. *signSGD with Majority Vote is Communication Efficient and Fault Tolerant.* ICLR, 2019. [Paper](https://arxiv.org/abs/1810.05291).
- **Byzantine Fault Tolerance of signSGD.** Mengoli et al. *On the Byzantine Fault Tolerance of signSGD with Majority Vote.* Preprint, 2025. [Paper](https://arxiv.org/abs/2502.19170).

