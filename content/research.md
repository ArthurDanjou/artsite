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

From **7 April to 14 October 2026**, I work under the supervision of [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/), with [Peva Blanchard](https://scholar.google.com/citations?user=ZX4C7ScAAAAJ&hl=en) and [Sébastien Rouault](https://sebastien.rouau.lt/) as co-advisors, on robust distributed learning with adversaries: gradient manipulation attacks, open-source research tooling, and improvements to existing aggregation frameworks. Full account in my [M2 internship report](https://m2-internship-report.arthurdanjou.fr/) (defended 2 Nov 2026, Université Paris-Dauphine – PSL).

The experimental backbone is **[Krum](/projects/krum)**, my first research project: an open-source Python/PyTorch framework (v0.9.0 on PyPI, MIT) with **11 aggregation rules, 5 attacks, 4 data partitioners, 6 model architectures and 3 protocol-faithful simulations** (NIPS 2017, ICML 2018, ICML 2023 MoNNA decentralised), plus a programmatic orchestrator with typed metrics and replay-after-change.

Three validations run in under 3 minutes on CPU at fixed seeds: on Spambase ($n = 20$, $f = 6$, SignFlip), MultiKrum holds ~0.77 accuracy where Average diverges; on MNIST ($n = 39$, $f = 9$, SmallPerturbation $\gamma = 4$), Bulyan stays at ~0.94 while MultiKrum plateaus at ~0.90 against a 0.95 clean baseline; decentralised MoNNA ($n = 16$, $f = 5$) lets NNA reach ~0.84 while Average stays at chance level (~0.10).

---

## Thesis Direction

Machine learning increasingly operates in environments where participants cannot necessarily trust one another. Data can be deliberately manipulated or poisoned to influence a model, while large-scale training creates growing communication and computation costs. Within the ATLAS chair, my thesis also addresses the use of datasets without their owners' authorization.

**Data Ownership Verification (DoV)** seeks to let an owner verify that a dataset was used to train a model. One approach embeds a signature in the data that persists through training. Targeted, controlled data poisoning can therefore serve as a digital watermarking mechanism, raising questions about its compatibility with defenses against malicious poisoning.

The central question is: **can learning methods simultaneously provide adversarial robustness, support data ownership verification, and remain efficient through techniques such as compression?** The thesis will investigate how these properties interact, when they can coexist, and what trade-offs are necessary.

---

## Current Project

My first thesis project, **already underway**, focuses on **signSGD**, a compression technique for distributed learning that communicates the sign of each gradient coordinate. The goal is to understand under which assumptions signSGD can be proved robust in the sense of **Byzantine fault tolerance (BFT)**.

This provides a first case study of the interaction between compression and adversarial conditions, before extending the investigation to data ownership verification and the broader trade-offs of the thesis. Work in progress, no results yet.

## Next Steps

- **Pre-aggregators**: bucketing, clipping and robust client weighting, kept in the stateless `aggregate`-style design.
- **Theory**: $\kappa^\star$ optimal robustness coefficient per rule (finite $\kappa^\star$ gives an explicit convergence rate), with signSGD as 12th rule and first experimental campaign (Byzantine fraction x batch size on MNIST).
- **Data-level attacks**: poisoned partitioning and trigger-sensitive metrics to compare gradient-level and dataset-level robustness on the same sweep machinery, including taggants for black-box ownership verification with statistical certification.
- **Scale**: more faithful protocols, then parallel sweeps and real-network conditions beyond single-host simulation.

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
- **Aksel.** Boussetta et al. *AKSEL: Fast Byzantine SGD.* OPODIS, 2020. [Paper](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.OPODIS.2020.8).
- **ALIE.** Baruch et al. *A Little Is Enough: Circumventing Defenses For Distributed Learning.* NeurIPS, 2019. [Paper](https://arxiv.org/abs/1902.06156).
- **Fall of Empires.** Xie et al. *Fall of Empires: Breaking Byzantine-tolerant SGD by Inner Product Manipulation.* UAI, 2020. [Paper](https://arxiv.org/abs/1903.03936).
- **MoNNA.** Farhadkhani et al. *Robust Collaborative Learning with Linear Gradient Overhead.* ICML, 2023. [Paper](https://arxiv.org/abs/2209.10931).
- **Optimal robustness ($\kappa^\star$).** Bareilles et al. *Byzantine Machine Learning: MultiKrum and an optimal notion of robustness.* Preprint, 2026. [Paper](https://arxiv.org/abs/2602.03899).

