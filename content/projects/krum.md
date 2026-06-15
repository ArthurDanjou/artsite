---
slug: krum
title: Krum — Byzantine-Resilient Distributed Learning
type: Research Project
description: My M2 research internship at CMAP, Ecole Polytechnique. Implementing and analyzing Byzantine-robust Gradient Aggregation Rules (GARs) for secure distributed machine learning under adversarial attacks.
shortDescription: Open-source framework for Byzantine-resilient aggregation in distributed learning, developed during my M2 internship at CMAP.
publishedAt: 2026-06-15
readingTime: 3
favorite: true
status: In progress
tags:
  - Distributed Learning
  - Byzantine Robustness
  - Python
  - PyTorch
  - Research
icon: i-ph-shield-check-duotone
---

[**Krum**](https://github.com/calicarpa/krum) is an open-source framework for Byzantine-resilient distributed machine learning, developed during my **M2 research internship at CMAP, Ecole Polytechnique** under the supervision of [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/).

## Overview

Distributed learning scales training across multiple workers, but a single malicious worker can collapse the model by sending arbitrary gradients. Krum implements aggregation rules that are provably robust to Byzantine failures, guaranteeing convergence even when a fraction of workers are adversarial.

This project serves as the experimental backbone of my research on adversarially robust distributed learning.

## Key Features

- **Multiple GARs**: Krum, Multi-Krum, coordinate-wise median, trimmed mean, and more
- **Byzantine Attack Models**: Bit-flipping, Gaussian noise, label-flipping, and custom attacks
- **Simulation Framework**: Configurable distributed training with n workers and f adversaries
- **Extensible API**: Plugin architecture for custom aggregation rules and attacks
- **Comprehensive Documentation**: Hosted at [calicarpa.github.io/krum](https://calicarpa.github.io/krum/)

## Technical Stack

| Component | Technology |
|-----------|------------|
| Language | Python 3.10–3.14 |
| Testing | pytest (GitHub Actions, 4 Python versions) |
| Linting | Ruff |
| Type Checking | `ty` |
| Packaging | PyPI (`pip install krum`) |

## Installation

```bash
pip install krum
# or
uv add krum
```

## Status

Active development. New aggregation rules and attack models are continuously added as my research progresses.

## Repository

[github.com/calicarpa/krum](https://github.com/calicarpa/krum)
