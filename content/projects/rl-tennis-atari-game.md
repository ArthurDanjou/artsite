---
slug: rl-tennis-atari-game
title: Reinforcement Learning for Tennis Strategy Optimization
type: Academic Project
description: An academic project exploring the application of reinforcement learning to optimize tennis strategies. The project involves training RL agents on Atari Tennis (ALE) to evaluate strategic decision-making through competitive self-play and baseline benchmarking.
shortDescription: Reinforcement learning algorithms applied to Atari tennis matches for strategy optimization and competitive benchmarking.
publishedAt: 2026-03-13
readingTime: 3
status: Completed
tags:
  - Reinforcement Learning
  - Machine Learning
icon: i-ph-lightning-duotone
---

Comparison of Reinforcement Learning algorithms on Atari Tennis (`ALE/Tennis-v5` via Gymnasium/PettingZoo).

- **GitHub Repository:** [Tennis-Atari-Game](https://github.com/ArthurDanjou/Tennis-Atari-Game)

## Overview

This project implements and compares five RL agents playing Atari Tennis against the built-in AI and in head-to-head tournaments.

## Algorithms

| Agent | Type | Policy | Update Rule |
|-------|------|--------|-------------|
| **Random** | Baseline | Uniform random | None |
| **SARSA** | TD(0), on-policy | ε-greedy | $W_a \leftarrow W_a + \alpha \cdot (r + \gamma \hat{q}(s', a') - \hat{q}(s, a)) \cdot \phi(s)$ |
| **Q-Learning** | TD(0), off-policy | ε-greedy | $W_a \leftarrow W_a + \alpha \cdot (r + \gamma \max_{a'} \hat{q}(s', a') - \hat{q}(s, a)) \cdot \phi(s)$ |
| **Monte Carlo** | First-visit MC | ε-greedy | $W_a \leftarrow W_a + \alpha \cdot (G_t - \hat{q}(s, a)) \cdot \phi(s)$ |
| **DQN** | Deep Q-Network | ε-greedy | MLP (256→256) with experience replay & target network |

## Architecture

- **Linear agents** (SARSA, Q-Learning, Monte Carlo): $\hat{q}(s, a; \mathbf{W}) = \mathbf{W}_a^\top \phi(s)$ with $\phi(s) \in \mathbb{R}^{128}$ (RAM observation)
- **DQN**: MLP network (128 → 128 → 64 → 18) trained with Adam optimizer, Huber loss, and periodic target network sync

## Environment

- **Game**: Atari Tennis via PettingZoo (`tennis_v3`)
- **Observation**: RAM state (128 features)
- **Action Space**: 18 discrete actions
- **Agents**: 2 players (`first_0` and `second_0`)

## Project Structure

```
.
├── Project_RL_DANJOU_VON-SIEMENS.ipynb    # Main notebook
├── README.md                              # This file
├── checkpoints/                           # Saved agent weights
│   ├── sarsa.pkl
│   ├── q_learning.pkl
│   ├── montecarlo.pkl
│   └── dqn.pkl
└── plots/                                 # Training & evaluation plots
    ├── SARSA_training_curves.png
    ├── Q-Learning_training_curves.png
    ├── MonteCarlo_training_curves.png
    ├── DQN_training_curves.png
    ├── evaluation_results.png
    └── championship_matrix.png
```

## Key Results

### Win Rate vs Random Baseline

| Agent | Win Rate |
|-------|----------|
| SARSA | 88.9% |
| Q-Learning | 41.2% |
| Monte Carlo | 47.1% |
| DQN | 6.2% |

### Championship Tournament

Full round-robin tournament where each agent faces every other agent in both positions (first_0/second_0).

## Notebook Sections

1. **Configuration & Checkpoints** — Incremental training workflow with pickle serialization
2. **Utility Functions** — Observation normalization, ε-greedy policy
3. **Agent Definitions** — `RandomAgent`, `SarsaAgent`, `QLearningAgent`, `MonteCarloAgent`, `DQNAgent`
4. **Training Infrastructure** — `train_agent()`, `plot_training_curves()`
5. **Evaluation** — Match system, random baseline, round-robin tournament
6. **Results & Visualization** — Win rate plots, matchup matrix heatmap

## Known Issues

- **Monte Carlo & DQN**: Checkpoint loading issues — saved weights may not restore properly during evaluation (training works correctly)

## Dependencies

- Python 3.13+
- `numpy`, `matplotlib`
- `torch`
- `gymnasium`, `ale-py`
- `pettingzoo`
- `tqdm`

## Authors

- Arthur DANJOU
- Moritz VON SIEMENS
