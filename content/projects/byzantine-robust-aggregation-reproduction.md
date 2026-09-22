---
slug: byzantine-robust-aggregation-reproduction
title: Byzantine-Robust Aggregation Reproduction
type: Research Project
description: Reproduction of "Byzantine-robust Federated Learning through Collaborative Malicious Gradient Filtering" (Xu et al., 2022) in PyTorch — Multi-Krum, SignGuard, MoNNA, ALIE and Fall of Empires, as groundwork for the krum library.
shortDescription: From-scratch PyTorch reproduction of Byzantine-robust aggregation papers (SignGuard, Multi-Krum, MoNNA, ALIE, Fall of Empires).
publishedAt: 2026-05-06
readingTime: 3
status: Completed
tags:
  - Distributed Learning
  - AI Safety
  - Research
icon: i-ph-flask-duotone
---

> **Reproduction of the papers:** Xu, J., et al. (2022). *Byzantine-robust Federated Learning through Collaborative Malicious Gradient Filtering*. ICDCS. [arXiv:2109.05872](https://arxiv.org/pdf/2109.05872v2) — plus Farhadkhani, S., et al. (2023). *Robust Collaborative Learning with Linear Gradient Overhead*. ICML. [PMLR 202](https://proceedings.mlr.press/v202/farhadkhani23a.html)

[**Byzantine-Robust-Aggregation-Reproduction**](https://github.com/ArthurDanjou/Byzantine-Robust-Aggregation-Reproduction) is a bare-metal **PyTorch** reproduction of seminal Byzantine-robust gradient aggregation papers, released under the **MIT license**. The goal is **not** to produce new results: it is to identify what is hard, redundant, and error-prone when implementing Byzantine-robust aggregation research from scratch. Every pain point logged here became a candidate for a first-class abstraction in [**Krum**](/projects/krum), my research library for Byzantine-resilient distributed learning.

## Implemented Aggregators

| Rule | Reference | Notes |
| :--- | :--- | :--- |
| **SignGuard** | Xu et al., 2022 | Sign-based clustering and norm clipping |
| **Multi-Krum** | Blanchard et al., 2017 | Distance-based outlier filtering |
| **MoNNA** | Farhadkhani et al., 2023 | Polyak momentum + Nearest-Neighbor Averaging |

## Implemented Attacks

| Attack | Reference | Notes |
| :--- | :--- | :--- |
| **A Little Is Enough (ALIE)** | Baruch et al., 2019 | Crafted malicious gradients within noise bounds |
| **Fall of Empires** | Xie et al., 2020 | Model poisoning through parameter scaling |

## Methodology

The codebase is intentionally minimal — a handful of Python modules (`aggregators.py`, `attacks.py`, `datasets.py`, `models.py`, `experiments.py`) driven by a single `main.py`, managed with **uv** and running on Python ≥ 3.13 with PyTorch ≥ 2.11. Training runs federated learning on MNIST with seeded, deterministic data loaders, iterating epochs aligned with per-client loader lengths so every worker contributes the same number of steps.

## Lessons Learned

The exercise surfaced several implementation pitfalls that directly shaped the design of Krum:

- **Flatten → aggregate → relink breaks autograd**: cutting parameters with `parameters_to_vector` then re-injecting with `vector_to_parameters` desynchronizes the optimizer's internal state (momentum buffers), making clipping through the aggregator incoherent. Alternatives — updating parameters directly without round-tripping through the optimizer, or synchronizing momentum buffers — are documented as open questions in the repository.
- **Clipping order matters**: norm-based versus sign-based filtering behave very differently in high dimension.
- **Sequential simulation hides distributed costs**: bandwidth, stragglers, and asynchronous arrival are invisible in a single-process loop, which motivates Krum's simulation layer.

## Status

The project is **completed**: the initial SignGuard reproduction landed in May 2026, followed by Multi-Krum, Fall of Empires, and finally MoNNA with Polyak momentum updates. The planned experiments (attack impact versus percentage of Byzantine clients, test accuracy across aggregators, verification of MoNNA's theoretical linear gradient overhead) now live on in [Krum](/projects/krum).

## Repository

[github.com/ArthurDanjou/Byzantine-Robust-Aggregation-Reproduction](https://github.com/ArthurDanjou/Byzantine-Robust-Aggregation-Reproduction)
