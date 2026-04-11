---
slug: lt-two-layers-neural-networks
title: Generalization Bounds for Two-Layer Neural Networks with ReLU
type: Research Project
description: A rigorous mathematical examination of generalization bounds for two-layer neural networks with ReLU activation. This project derives tight, width-independent complexity bounds by exploiting the scale-invariant properties of ReLU networks, moving beyond traditional empirical Rademacher complexity measures that fail for overparameterized models.
shortDescription: Derivation of tight generalization bounds for two-layer ReLU networks using scale-invariance and symmetrization inequalities.
publishedAt: 2026-04-12
readingTime: 4
status: Completed
tags:
  - Neural Networks
  - Generalization Bounds
  - ReLU Activation
  - Rademacher Complexity
icon: i-ph-function-duotone
---

## Overview

This rigorous mathematical exercise derives and analyzes generalization bounds for two-layer neural networks with ReLU activation, progressively building from naive bounds to tight, width-independent complexity measures:

- **Naive bound**: Classical empirical Rademacher complexity approach (demonstrates why standard bounds fail for overparameterized models)
- **Symmetrization inequality**: Specialized for ReLU networks, exploiting $|z| = \phi(z) + \phi(-z)$ structure
- **Scale-invariant complexity measure**: Leverages ReLU positive homogeneity property
- **Width-independent bound**: Final tight generalization bound that holds regardless of network width

## Theoretical Foundation

Two-layer neural networks computing functions of the form:
$$f(x) = \sum_{j=1}^{m} u_j \sigma(w_j^\top x)$$

where $\sigma(\cdot)$ is the ReLU activation function and parameters are bounded by $\|w_j\| \leq B_w$ and $|u_j| \leq B_u$.

## Part A: Naive Width-Dependent Bound

Starting with standard empirical Rademacher complexity analysis: $\mathcal{R}_{S_n}(\mathcal{H}) \leq 2 B_w B_u C \sqrt{\frac{m}{n}}$

This bound demonstrates the fundamental problem: it depends linearly on network width $m$, making it vacuous for overparameterized networks where $m \gg n$. This gap between theory and practice motivated the subsequent refinements.

## Part B: Symmetrization Inequality for ReLU

Key insight exploiting ReLU structure: $$\mathbb{E}\left[\sup |\mathcal{Z}|\right] \leq 2 \cdot \mathbb{E}\left[\sup \phi(\mathcal{Z})\right]$$
Derivation uses:
- ReLU decomposition: $|z| = \phi(z) + \phi(-z)$  
- Distributional symmetry: $\sigma$ and $-\sigma$ are identically distributed
- Rademacher averaging: Cancellation of terms through symmetry arguments

This establishes tighter bounds by leveraging the activation function's inherent structure.

## Part C: Scale-Invariant Complexity Measure

Leveraging the **positive homogeneity** of ReLU ($\sigma(\lambda z) = \lambda \sigma(z)$ for $\lambda > 0$), we introduce scale-invariant parameterization: $\hat{u}_j = \frac{u_j}{\|w_j\|}, \quad \hat{w}_j = \frac{w_j}{\|w_j\|}$

This transformation yields a width-independent bound: $\mathcal{R}(\mathcal{H}) \leq C \cdot B \sqrt{\frac{\log m}{n}}$

where the complexity no longer scales linearly with $m$, making it meaningful for overparameterized networks.

## Course & Academic Context

- **Course**: Learning Theory: Two-Layer Neural Networks (Exam)
- **Institution**: Université Paris-Dauphine -- PSL, Department of MIDO
- **Supervisor**: Katia Meziani
- **Program**: Master 2 ISF (Initial Track)
- **Academic Year**: 2025/2026

## Detailed Report

<iframe src="/projects/lt-two-layer-neural-networks.pdf" width="100%" height="1000px">
</iframe>
