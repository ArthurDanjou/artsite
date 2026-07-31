---
slug: krum
title: Krum - Byzantine-Resilient Distributed Learning
type: Research Project
description: My M2 research internship at CMAP, Ecole Polytechnique. An open-source library implementing and evaluating Byzantine-robust Gradient Aggregation Rules (GARs) for secure distributed machine learning under adversarial attacks.
shortDescription: Open-source framework for Byzantine-resilient aggregation in distributed learning, developed during my M2 internship at CMAP.
publishedAt: 2026-06-15
readingTime: 6
favorite: true
status: In progress
tags:
  - Distributed Learning
  - AI Safety
  - Research
icon: i-ph-shield-check-duotone
---

[**Krum**](https://github.com/calicarpa/krum) is an open-source Python library for Byzantine-resilient distributed machine learning, built on PyTorch and released under the **MIT license**. It is developed during my **M2 research internship at CMAP, Ecole Polytechnique**, in collaboration with [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/) and co-authors.

## Paper in Preparation

The library is the subject of a **JMLR MLOSS** publication in preparation, with co-authors Sébastien Rouault, Mohammad Ammar Said, Peva Blanchard, and El Mahdi El Mhamdi.

## Overview

Distributed learning scales training across multiple workers, but a single malicious worker can collapse the model by sending arbitrary gradients. Krum implements aggregation rules that are provably robust to Byzantine failures, guaranteeing convergence even when a fraction of workers are adversarial.

As the field matures, the number of experimental parameters grows: model architecture, dataset, number of workers and Byzantine workers, communication topology, attack strategy, aggregation rule, learning rate schedule, and initialization scheme. Each paper makes distinct implementation choices that are rarely isolated in reusable components. Krum organizes its functionality into **three layers** to address this:

1. **Primitives**: aggregation rules, attacks, and a zero-copy model wrapper.
2. **Simulations**: faithful reproductions of experimental protocols from seminal papers.
3. **Orchestration**: a programmatic API for reproducible parameter sweeps over thousands of experiments.

## Primitives

### Aggregators (10)

Gradient aggregation rules that take one gradient per worker and produce a single aggregated gradient robust to up to $f$ Byzantine outliers:

| Rule | Robustness | Notes |
| :--- | :--- | :--- |
| **Average** | none | Arithmetic mean baseline |
| **Median** | $f < n/2$ | Coordinate-wise median |
| **Trimmed Mean** | $f < n/2$ | Removes the $m$ smallest/largest values per coordinate |
| **Krum** | $f < n/2$ | Selects the gradient closest to its neighbors in $L_2$ (Blanchard et al., 2017) |
| **Multi Krum** | $f < n/2$ | Selects the $n - 2f$ gradients with smallest scores |
| **Bulyan** | $f < n/4$ | Krum + trimmed mean two-stage procedure (El Mhamdi et al., 2018) |
| **Brute** | optimal | Combinatorial subset search with minimum diameter |
| **GeoMed** | $f < n/2$ | Geometric median via iterative Weiszfeld algorithm |
| **Aksel** | $f < n/2$ | Linear-time median-pivot aggregator, $O(nd)$ complexity |
| **Nearest Neighbor Average** | $f < n/2$ | Averages the $n - 2f$ closest gradients, used in MoNNA (Farhadkhani et al., 2023) |

Each rule is a **stateless classmethod** with no instance state and no hidden parameters. Specialized hyperparameters ($f$, $n$, $m$) are keyword-only:

```python
from krum.primitives.aggregators import Krum
aggregated = Krum.aggregate(gradients, f=2, n=10)
```

### Attacks (5)

Byzantine attack strategies that generate adversarial gradients from the honest workers' gradients:

| Attack | Description |
| :--- | :--- |
| **SignFlip** | Sends the negation of the true gradient, $g_{byz} = -g_{honest}$ |
| **ALIE** | Alignment attack maximizing inner product with honest gradients under bounded norm |
| **Gaussian** | Gradients drawn from a Gaussian centered on the honest mean |
| **Full Gradient Negation** | Negation of the full honest gradient (El Mhamdi et al., 2018) |
| **Small Perturbation** | Small per-coordinate perturbations exploiting curse-of-dimensionality effects (El Mhamdi et al., 2018) |

### Model Wrapper

The `Model` class wraps any `torch.nn.Module` and provides **flat tensor views** of parameters and gradients without copying: reading `model.parameters` or `model.gradients` returns a 1D tensor of shape $(d,)$ sharing memory with the underlying module, and writing to `model.gradients` unpacks the flat vector back into each parameter gradient in place. Standard architectures from the literature are provided (Krum2017CNN, Monna2023CNNMnist, etc.).

### Extensibility

Both `Aggregator` and `Attack` are abstract base classes with a single required classmethod (`aggregate` / `generate`). Custom rules and attacks integrate with the simulation layer by inheriting and overriding the one abstract method.

## Simulations

Faithful reproductions of experimental protocols from seminal papers, in both **centralised** (parameter server) and **decentralised** (peer-to-peer) topologies:

- **NIPS 2017 Krum protocol** (Blanchard et al.): fixed learning rate, no scheduler, reports misclassification error and cross-entropy loss.
- **ICML 2018 Hidden Vulnerability** (El Mhamdi et al.): Robbins-Monro schedule $\eta(t) = r_\eta \cdot \eta_0 / (t + r_\eta)$, L2 regularization, Xavier initialization as in Section 5.1 of the original paper.
- **ICML 2023 MoNNA** (Farhadkhani et al.): decentralized peer-to-peer protocol with one local momentum SGD step per honest worker, then replacement by a nearest-neighbor average over the $n - 2f$ closest models among $n - f$ neighbors. Supports two Byzantine reach modes: *all* (worst case) and *sampled* (gossip style).

## Orchestration

The layer that was **lacking in all previously published libraries**: declare experiment parameters, collect typed metrics over time, and produce pandas DataFrames from full parameter sweeps.

```python
from krum.orchestration import Metric, Orchestrator
from krum.primitives.aggregators.krum import Krum
from krum.primitives.attacks.alie import ALIEAttack

def my_experiment(n, f, aggregator, attack, n_steps):
    sim = KrumSimulation(n=n, f=f, aggregator=aggregator, attack=attack)
    loss = Metric("loss")
    for step in range(n_steps):
        sim.step()
        loss.push(step, sim.loss())

orch = Orchestrator("krum_byzantine_study")
for n in [10, 20]:
    for f in [2, 3]:
        orch.run(my_experiment, n=n, f=f, aggregator=Krum, attack=ALIEAttack, n_steps=100)

loss_df = orch.get("loss")  # pandas DataFrame with all run parameters merged
```

The orchestrator automatically tracks all run parameters and merges them with collected metrics, enabling filtering and aggregation with standard pandas operations, a programmatic approach that contrasts with configuration-file-based alternatives (JSON configs in ByzFL, CLI in FL-Byz-Lib).

## Engineering

- **Datasets**: auto-download, provided list (MNIST, CIFAR-10, Spambase, etc.)
- **Checkpointing**: one-liner to save/load model state
- **Plotting**: matplotlib/seaborn for manual visualization
- **Documentation**: ADRs, tutorials, and explicit references to papers, hosted at [calicarpa.github.io/krum](https://calicarpa.github.io/krum/)
- **Tests**: comprehensive suite covering edge cases ($f = 0$, $n = f$, minimal configs), run on GitHub Actions across Python 3.10–3.14
- **CI/CD**: Ruff for linting and formatting, `ty` for type checking, pre-commit hooks

## Comparison to Related Software

Compared to ByzFL, FedLab, Blades, FL-Byz-Lib, and ByzPy, Krum is the only library combining **protocol-faithful simulations, zero-copy model wrappers, and programmatic orchestration**. It trades raw breadth (10 aggregators vs 36 in FL-Byz-Lib, 12+4 in ByzFL) for fidelity to the original NIPS 2017, ICML 2018, and ICML 2023 protocols and an orchestration layer that scales to thousands of reproducible experiments.

## Installation

```bash
pip install krum
# with experiment dependencies (matplotlib, numpy, seaborn)
pip install "krum[experiments]"
# or with uv
uv add krum
```

## Status

Active development: the paper is in preparation, and new aggregation rules, attack models, and protocol reproductions are continuously added as my research progresses.

## Repository

[github.com/calicarpa/krum](https://github.com/calicarpa/krum)
