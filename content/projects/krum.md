---
slug: krum
title: Krum - Byzantine-Resilient Distributed Learning
type: Research Project
description: My M2 research internship at CMAP, Ecole Polytechnique (Apr-Oct 2026). An open-source Python/PyTorch library with 11 aggregation rules, 5 attacks, 4 data partitioners and 3 protocol-faithful simulations for secure distributed machine learning under Byzantine attacks.
shortDescription: Open-source framework for Byzantine-resilient aggregation in distributed learning (11 rules, 5 attacks, 3 faithful protocols), developed during my M2 internship at CMAP.
publishedAt: 2026-06-15
readingTime: 10
favorite: true
status: Active
tags:
  - Distributed Learning
  - AI Safety
  - Research
icon: i-ph-shield-check-duotone
---

[**Krum**](https://github.com/calicarpa/krum) is an open-source Python library for Byzantine-resilient distributed machine learning, built on PyTorch and released under the **MIT license** (v0.9.0 on PyPI, Oct 2026). It was developed during my **M2 research internship at CMAP, Ecole Polytechnique (7 Apr - 14 Oct 2026)**, in a four-person research-product team: [Peva Blanchard](https://scholar.google.com/citations?user=ZX4C7ScAAAAJ&hl=en) (Product Owner), [Sébastien Rouault](https://sebastien.rouau.lt/) (Tech Lead), Mohamad-Ammar Said and myself (development), supervised by [El Mahdi El Mhamdi](https://elmahdielmhamdi.com/). Docs at [calicarpa.github.io/krum](https://calicarpa.github.io/krum/), full account in my [M2 internship report](https://m2-internship-report.arthurdanjou.fr/) (defended 2 Nov 2026).

## My contributions

I owned the **aggregators**, the zero-copy `Model` wrapper, the **CNN/MLP architectures** and the full **centralised** side of the library. I wrote most of the documentation, the component tests, the CI/CD workflows, and the library comparison with its counts (Table 6.1 of the report). Preliminary from-scratch reproductions (SignGuard, Multi-Krum, MoNNA, ALIE, Fall of Empires) live in the companion [reproduction repo](/projects/byzantine-robust-aggregation-reproduction) and directly shaped Krum's design. Total: 650+ commits, 29 pull requests (26 merged) at 5 Oct 2026.

## Paper in Preparation

The library is the subject of a **JMLR MLOSS** publication in preparation: *Krum, the Library: Automated Byzantine Machine Learning Experiments on Python with Orchestration* (2026), with co-authors Sébastien Rouault, Arthur Danjou, Mohamad-Ammar Said, Peva Blanchard, and El Mahdi El Mhamdi. I handled most of the writing, corrected with El Mahdi El Mhamdi.

## Overview

Distributed learning scales training across multiple workers, but a single malicious worker can collapse the model by sending arbitrary gradients. Krum implements aggregation rules that are provably robust to Byzantine failures, guaranteeing convergence even when a fraction of workers are adversarial.

The number of experimental parameters keeps growing: model architecture, dataset, number of workers and Byzantine workers, communication topology, attack strategy, aggregation rule, learning rate schedule, and initialization scheme. Each paper makes distinct implementation choices that are rarely isolated in reusable components. Krum organizes its functionality into **three layers** to address this:

1. **Primitives**: aggregation rules, attacks, and a zero-copy model wrapper.
2. **Simulations**: faithful reproductions of experimental protocols from seminal papers.
3. **Orchestration**: a programmatic API for reproducible parameter sweeps over thousands of experiments.

## Primitives

### Aggregators (11)

Gradient aggregation rules that take one gradient per worker and produce a single aggregated gradient robust to up to $f$ Byzantine outliers among $n$ workers:

| Rule | Robustness | Notes |
| :--- | :--- | :--- |
| **Average** | none | Arithmetic mean baseline |
| **Median** | $f \le (n-1)/2$ | Coordinate-wise median |
| **Trimmed Mean** | $f \le (n-1)/2$ | Removes the $f$ smallest/largest values per coordinate ($\beta = f/n$) |
| **Krum** | $f \le (n-3)/2$ | Selects the gradient closest to its neighbors in $L_2$ (Blanchard et al., 2017) |
| **Multi Krum** | $f \le (n-3)/2$ | Averages the $m$ smallest Krum scores, $m = n-2f-3$ by default, single-pass |
| **Bulyan** | $f \le (n-3)/4$ | Krum + trimmed mean two-stage procedure (El Mhamdi et al., 2018); selects $\theta = n-2f-2$ vectors (documented variant, paper uses $n-2f$) |
| **Brute** | exact | Combinatorial subset search with minimum diameter |
| **GeometricMedian** | $f \le (n-1)/2$ | Geometric median via smoothed Weiszfeld iterations ($\nu = 0.1$) |
| **Medoid** | none | Vector submitted minimizing total distance to others; non-resilient baseline |
| **Aksel** | $f \le (n-1)/2$ | Median-pivot aggregator averaging the $n-f$ closest gradients, $O(nd)$ complexity (documented variant of the median-threshold paper) |
| **Nearest Neighbor Average** | caller policy | Averages the $k$ closest gradients to a pivot ($k = n-2f$ in MoNNA, Farhadkhani et al., 2023) |

Each rule is a **stateless classmethod** with no instance state and no hidden parameters. Import per module, pass classes (not instances) to simulations. All aggregators take a `(n, d)` tensor and return a `(d,)` vector:

```python
import torch
from krum.primitives.aggregators.krum import Krum
from krum.primitives.aggregators.multikrum import MultiKrum
from krum.primitives.aggregators.geometric_median import GeometricMedian
from krum.primitives.aggregators.nearest_neighbor_average import NearestNeighborAverage

result = Krum.aggregate(torch.randn(10, 100), n=10, f=2)
print(result.shape)  # (100,)

result = MultiKrum.aggregate(gradients, n=10, f=2)  # m = n - 2f - 3 by default
result = GeometricMedian.aggregate(gradients, n=10, f=2)  # n, f accepted for API uniformity
result = NearestNeighborAverage.aggregate(gradients, pivot=gradients[0], num_closest=3)
```

### Attacks (5)

Byzantine attack strategies that generate adversarial gradients from the honest workers' gradients (defaults from the report):

| Attack | Description |
| :--- | :--- |
| **SignFlip** | Sends the negation of the honest mean, $g_{byz} = -g_{honest}$ (scale = 1) |
| **ALIE** | Oracle variant: honest mean $\pm z\sigma$ coordinate-wise, $z = z_{max}$, negative direction |
| **Gaussian** | Isotropic Gaussian noise, independent of honest gradients ($\mu = 0$, $\sigma = 200$) |
| **Full Gradient Negation** | $-\kappa g_{full}$ assuming full-dataset gradient knowledge, $\kappa = 100$ (El Mhamdi et al., 2018) |
| **Small Perturbation** | $B(\gamma)$ = honest mean $+ \gamma E$ on the max-variance coordinate, largest $\gamma$ still selected by the target aggregator ($\gamma_{max} = 10^6$, $\ell_2$). The only attack finely exploiting Krum's selection boundary, kept so the evaluation stays honest (El Mhamdi et al., 2018) |

All attacks follow the same pattern: honest gradients + `f`, returning an `(f, d)` tensor. Class names carry the `Attack` suffix:

```python
import torch
from krum.primitives.aggregators.average import Average
from krum.primitives.aggregators.multikrum import MultiKrum
from krum.primitives.attacks.sign_flip import SignFlipAttack

n_workers, n_byzantine, dim = 10, 2, 100
honest = torch.randn(n_workers - n_byzantine, dim)
malicious = SignFlipAttack.generate(honest, f=n_byzantine, scale=1.5)
all_grads = torch.cat([honest, malicious], dim=0)

result = MultiKrum.aggregate(all_grads, n=n_workers, f=n_byzantine)
baseline = Average.aggregate(all_grads)
```

### Data partitioners (4)

Unified `partition` interface returning one subset per worker: **IidPartitioner** (shuffle + split), **PerLabelsPartitioner** (label-sorted, granularity $\lambda \in [0,1]$), **DirichletPartitioner** (class proportions $\sim \mathrm{Dirichlet}(\alpha)$, accepts partial/empty shards), **MixingPartitioner** (fraction $1-\gamma$ via $p_1$ + $\gamma$ via $p_2$, one-parameter IID to non-IID sweep).

### Model Wrapper

The `Model` class wraps any `torch.nn.Module` and provides **flat tensor views** of parameters and gradients without copying: reading `model.parameters` or `model.gradients` returns a 1D tensor of shape $(d,)$ sharing memory with the underlying module, and writing to `model.gradients` unpacks the flat vector back into each parameter gradient in place. Without it, every step would pay one full copy per worker (nearly 12,000 copies for the 2018 protocol alone: 39 workers x 300 rounds). Krum is the only compared library with this zero-copy guarantee.

```python
from krum.primitives.models import Model
from krum.primitives.models.mlp import Krum2017MLPMnist
import torch.nn as nn

model = Model(Krum2017MLPMnist())
flat_params = model.parameters  # shape: (d,), shares memory with the module

loss = model.module(torch.randn(3, 784)).sum()
loss.backward()
flat_grads = model.gradients  # flat view of every param.grad

model.gradients = aggregated_flat  # write back in place, no copy
```

Caveat: `optimizer.zero_grad()` (with `set_to_none=True`) drops `.grad` tensors and breaks the cached view. Restore it in one call:

```python
optimizer.zero_grad()
grads = model.relink_gradients()  # re-link + flat view
grads[:] = 0
```

### Ready-to-use architectures (6)

| Model | Architecture | Origin |
| :--- | :--- | :--- |
| **Krum2017MLPMnist** | MLP 784 -> 100 -> 10 (ReLU) | Blanchard et al., 2017 |
| **Krum2017MLPSpambase** | MLP 57 -> 20 -> 20 -> 2 (ReLU, hidden sizes from lab reference impls) | Blanchard et al., 2017 |
| **Krum2017CNN** | 2 conv (16, 64 filters) + 3 dense (384, 192, 10), ReLU + max-pool | El Mhamdi et al., 2018 |
| **Monna2023SmallMnist** | MLP 784 -> 128 -> 10, lightweight CPU variant, off-paper | - |
| **Monna2023CNNMnist** | C(20)-R-M-C(20)-R-M-L(500)-R-L(10), 5x5 kernels, raw logits | Farhadkhani et al., 2023 |
| **Monna2023CNNCifar10** | 4 conv + batchnorm + 2 max-pool + dropout 0.25 + 2 dense (128, 10) | Farhadkhani et al., 2023 |

All models take no constructor arguments. Import by family:

```python
from krum.primitives.models.mlp import Krum2017MLPMnist, Krum2017MLPSpambase, Monna2023SmallMnist
from krum.primitives.models.cnn import Krum2017CNN, Monna2023CNNMnist, Monna2023CNNCifar10

mlp = Krum2017MLPMnist()  # fixed architecture matching its paper
```

### Extensibility

`Aggregator`, `Attack` and `DataPartitioner` are abstract base classes with a single required classmethod (`aggregate` / `generate` / `partition`). Custom rules, attacks and partitioners integrate with the simulation and orchestration layers by inheriting and overriding the one abstract method, with hyperparameters as plain keyword arguments.

## Simulations

Faithful reproductions of experimental protocols from seminal papers, in both **centralised** (parameter server) and **decentralised** (peer-to-peer) topologies. Faithful means keeping the mechanisms needed to study the target phenomenon, with documented adaptations. At fixed code, seeds and hardware, two runs are bit-identical (global seed + per-worker RNG). Caller partitions, the simulation batches.

- **NIPS 2017 Krum protocol** (Blanchard et al.): fixed learning rate, no scheduler, reports misclassification error and cross-entropy loss.
- **ICML 2018 Hidden Vulnerability** (El Mhamdi et al.): Robbins-Monro schedule $\eta(t) = r_\eta \cdot \eta_0 / (t + r_\eta)$, L2 regularization, Xavier initialization as in Section 5.1 of the original paper.
- **ICML 2023 MoNNA** (Farhadkhani et al.): decentralized peer-to-peer protocol with one local momentum SGD step per honest worker, then replacement by a nearest-neighbor average over the $n - 2f$ closest models among $n - f$ neighbors. Supports two Byzantine reach modes: *all* (worst case) and *sampled* (gossip style). `stop_attack_at` stops attacks mid-training to study recovery.

Aggregator and attack are passed as **classes**, not instances; extra parameters go through `aggregator_kwargs` / `attack_kwargs`. The caller partitions, the simulation batches; `len(train_datasets)` must equal `n`:

```python
from krum.primitives.aggregators.multikrum import MultiKrum
from krum.primitives.attacks.sign_flip import SignFlipAttack
from krum.primitives.data_partitioners.iid import IidPartitioner
from krum.primitives.models.mlp import Krum2017MLPMnist
from krum.simulations.centralised.krum_nips_2017 import KrumSimulation

train_datasets = IidPartitioner.partition(train_set, n=10, seed=42)

sim = KrumSimulation(
    model_cls=Krum2017MLPMnist,
    train_datasets=train_datasets,
    test_set=test_set,
    aggregator=MultiKrum,
    attack=SignFlipAttack,
    attack_kwargs={"scale": 1.5},
    n=10, f=2, rounds=50,
    batch_size=64, lr=0.01, seed=42,
)
sim.setup()
for round_idx in range(50):
    sim.step()
    if round_idx % 10 == 0:
        loss, accuracy = sim.evaluate()
```

The ICML 2018 variant (`HiddenVulnerabilitySimulation`) adds Xavier init, L2 and the Robbins-Monro schedule, and returns a `(loss, error, accuracy)` triple. The decentralised `MonnaSimulation` exposes the same pattern with a `run()` helper.

## Orchestration

The layer that was **lacking in all previously published libraries**: declare experiment parameters, collect typed metrics over time, and produce tables from full parameter sweeps.

A `Metric` is created **inside** the experiment function with a value type, and finds its job through a context variable. `run()` only enqueues; `drain()`, the first `get()`, or leaving a `with` block executes. `get()` returns a `MetricTable` (plain Python lists, not a DataFrame) with `step`, `value`, every run parameter and `job_key`:

```python
from krum.orchestration import Metric, Orchestrator
from krum.primitives.aggregators.average import Average
from krum.primitives.aggregators.multikrum import MultiKrum
from krum.primitives.attacks.sign_flip import SignFlipAttack
from krum.primitives.data_partitioners.iid import IidPartitioner
from krum.primitives.models.mlp import Krum2017MLPMnist
from krum.simulations.centralised.krum_nips_2017 import KrumSimulation

def run_experiment(*, aggregator, attack, n, f, seed=42, rounds=50):
    train_datasets = IidPartitioner.partition(train_set, n=n, seed=seed)
    sim = KrumSimulation(
        model_cls=Krum2017MLPMnist, train_datasets=train_datasets,
        test_set=test_set, aggregator=aggregator, attack=attack,
        n=n, f=f, rounds=rounds, batch_size=64, lr=0.01, seed=seed,
    )
    sim.setup()
    test_loss = Metric("test_loss", dtype=float)
    test_accuracy = Metric("test_accuracy", dtype=float)
    for step in range(rounds):
        sim.step()
        if step % 10 == 0:
            loss_val, acc_val = sim.evaluate()
            test_loss.push(step, loss_val)
            test_accuracy.push(step, acc_val)

with Orchestrator("byzantine_study") as orch:
    for n, f in [(10, 2), (20, 3)]:
        for aggregator in [Average, MultiKrum]:
            orch.run(run_experiment, aggregator=aggregator, attack=SignFlipAttack, n=n, f=f, seed=42)

df = orch.get("test_accuracy").to_pandas()  # needs pandas; .to_dict() / .to_csv() need nothing
```

The orchestrator automatically tracks all run parameters and merges them with collected metrics, enabling filtering and aggregation with standard pandas operations, a programmatic approach that contrasts with configuration-file-based alternatives (JSON configs in ByzFL, CLI in FL-Byz-Lib).

Orchestrator v2 (Oct 2026, PR #66): results stored per job with `job_key`, only new / failed / stale jobs are replayed (stale after parameter, code or environment change); `plan()` previews what a sweep would run without running it, `force=True` recomputes regardless; reads are scoped to the current sweep so no table mixes two code versions. Single-host by design (simulated sweeps, not real distributed infra); parallelism is future work.

## Validation (3 faithful reproductions, < 3 min CPU each)

Each run uses fixed seeds (42, 42, 0) and documented adaptations; fidelity covers kept mechanisms and observed phenomena, not numerical identity with the papers.

### 1. NIPS 2017 on Spambase: MultiKrum vs Average

Spambase (57 features, binary), MLP 57 -> 20 -> 20 -> 2, $n = 20$ workers with $f = 6$ Byzantine, **SignFlip** amplitude 10, 300 rounds, $\eta = 0.01$ fixed, batch 3/worker, IID seed 42, $10^{-4}$ L2, Xavier. MultiKrum with $m = n-f = 14$ (the paper's own Figure 6 setting, outside the $m \le n-2f-3 = 5$ guarantee on purpose to dilute the malicious vector).

Without attack, both converge together (test loss 0.81 -> 0.44, accuracy 0.82). Under attack, Average diverges (NaN weights from round 60, accuracy stuck on the 60% majority-class artefact) while attacked MultiKrum reaches **~0.77 test accuracy**, ~5 points below clean. Phenomenon reproduced: MultiKrum absorbs 30% malicious workers where Average collapses.

### 2. ICML 2018 on MNIST: MultiKrum vs Bulyan (hidden vulnerability)

MNIST full (60k/10k), MLP 784 -> 100 -> 10, $n = 39$ ($n = 4f+3$, Bulyan bound) with $f = 9$, **SmallPerturbation** at fixed $\gamma = 4$ (below the measured round-0 selection frontier $\gamma_m \approx 6.3$), 300 rounds, batch 32, Robbins-Monro $\eta_0 = 0.1$, $r_\eta = 10000$, IID seed 42, MultiKrum $m = 1$ (i.e. Krum).

Clean Average: loss ~0.19, accuracy **~0.95**. Under attack, MultiKrum plateaus at **~0.90** (loss ~0.40, 2x clean) while **Bulyan stays at ~0.94 / ~0.21**, glued to clean. Mechanism reproduced: at $m = 1$ the aggregator outputs the malicious vector itself each step; Bulyan's coordinate-wise trimmed mean filters the shifted coordinate. The degradation is hidden (model seems to learn) without the clean baseline.

### 3. ICML 2023 MoNNA decentralized (NNA vs Average), reduced scale

MNIST 4096/1024, small MLP 784 -> 128 -> 10, $n = 16$ with $f = 5$ Byzantine, **SignFlip** amplitude 1, `byzantine_reach=all`, 200 rounds, local momentum $\beta = 0.99$, $\eta = 0.5$, Dirichlet $\alpha = 1$, seed 0, no weight decay. Each honest worker aggregates $n-f = 11$ candidates; NNA keeps the $n-2f = 6$ closest to the local pivot.

Clean: both converge to ~0.87. Under attack, Average never leaves chance level (**~0.10**, frozen losses) while **NNA under attack reaches ~0.84**, 3 points below clean after a 20-point lag around rounds 45-60. Phenomenon reproduced in decentralized form: neighbor selection isolates adversarial models.

## Preliminary groundwork

Before building on published rules, I reproduced them from scratch in bare-metal PyTorch (see the [reproduction project](/projects/byzantine-robust-aggregation-reproduction)): MNIST on a 2x256 MLP, $n = 8$ workers with $f = 2$ Byzantine running the **ALIE** attack, 20 epochs, single seed 42.

| Aggregator | Test accuracy | Note |
| :--- | :--- | :--- |
| **Average** (non-robust baseline) | ~10% | Random-equivalent, ALIE fully diverges |
| **Multi-Krum** | ~92% | Converges, slightly below clean |
| **SignGuard** | ~94% | Sign filtering beats distance filtering in high dimension |
| **MoNNA** | ~95% | Polyak momentum stabilizes training |

Sequential CPU timings for 8 workers stay negligible at this scale (12–18s), but the exercise surfaced three lessons that shaped the library: `flatten → aggregate → relink` breaks autograd and desynchronizes optimizer buffers, clipping order matters (norm vs sign), and sequential simulation hides true distributed costs (bandwidth, stragglers, async arrival). Figures are indicative single-seed runs; the multi-seed benchmark across $n \in \{8, 16, 32\}$ and $f/n$ up to 0.4 is ongoing work.

## Engineering

- **Datasets**: auto-download, provided list (MNIST, CIFAR-10, Spambase, etc.)
- **Checkpointing**: one-liner to save/load model state
- **Plotting**: matplotlib/seaborn for manual visualization
- **Documentation**: ADRs, tutorials, and explicit references to papers, hosted at [calicarpa.github.io/krum](https://calicarpa.github.io/krum/)
- **Tests**: pytest suite covering rule guarantees and edge cases ($f = 0$, $n = f$, minimal configs), run on GitHub Actions across Python 3.12–3.14
- **CI/CD**: Ruff for linting and formatting, `ty` for type checking, pre-commit hooks; every PR checked for lint, format, types and tests
- **Release**: `pip install krum` / `pip install "krum[experiments]"` / `uv add krum`, v0.9.0 on PyPI

## Comparison to Related Software

Compared August 2026 against ByzFL, FedLab, Blades, FL-Byz-Lib, and ByzPy (retained for open Byzantine code with explicit primitive taxonomy), Krum is the only library combining **protocol-faithful simulations (3, incl. peer-to-peer MoNNA), zero-copy model wrappers, and programmatic orchestration with typed metrics + replay-after-change**. It trades raw breadth (11 aggregators vs 36 in FL-Byz-Lib, 12+4 in ByzFL; 5 attacks vs 22 max) for fidelity to the original NIPS 2017, ICML 2018, and ICML 2023 protocols and an orchestration layer that scales to thousands of reproducible experiments. FL-Byz-Lib stays best for fast broad benchmarks, FedLab for federated panorama (10 baselines, 9 partitioners, 3 deploy modes), ByzPy for execution research (5 backends). Full counts in report Table 6.1.

## Limitations

No pre-aggregators yet (bucketing, clipping, robust client weighting — none of the three replayed protocols needs them), single-host sequential execution (no real network conditions), three protocols only, and three documented implementation variants (Bulyan $\theta = n-2f-2$, Aksel $n-f$ closest, MultiKrum single-pass). Hardware differs from the papers, so no bit-identical weight identity is claimed.

## Status

Active development: v0.9.0 on PyPI, paper in preparation, and new aggregation rules, attack models, and protocol reproductions continuously added. Next: pre-aggregators, $\kappa^\star$ robustness coefficient per rule with signSGD as 12th rule and first compression-under-attack case study, poisoned-partition + trigger-sensitive metrics for data poisoning / taggants (black-box ownership verification), then parallel sweeps and real-network conditions.

The library provides the experimental foundation of my M2 internship. My first thesis project studies the **Byzantine fault tolerance of signSGD**, within a broader investigation of adversarial robustness, data ownership verification, and efficient learning. Details live on the [research page](/research).

## Repository

[github.com/calicarpa/krum](https://github.com/calicarpa/krum) — docs at [calicarpa.github.io/krum](https://calicarpa.github.io/krum/) — [M2 report](https://m2-internship-report.arthurdanjou.fr/)
