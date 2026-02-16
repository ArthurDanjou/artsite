---
slug: implied-volatility-modeling
title: Implied Volatility Surface Modeling
type: Academic Project
description: A large-scale statistical study comparing Generalized Linear Models (GLMs) and black-box machine learning architectures to predict the implied volatility of S&P 500 options.
shortDescription: Predicting the SPX volatility surface using GLMs and black-box models on 1.2 million observations.
publishedAt: 2026-02-28
readingTime: 3
status: In progress
tags:
  - R
  - GLM
  - Finance
  - Machine Learning
icon: i-ph-graph-duotone
---

This project targets high-precision calibration of the **Implied Volatility Surface** using a large-scale dataset of S&P 500 (SPX) European options.

The core objective is to stress-test classic statistical models against modern predictive algorithms. **Generalized Linear Models (GLMs)** provide a transparent baseline, while more complex "black-box" architectures are evaluated on whether their accuracy gains justify reduced interpretability in a risk management context.

## 📊 Dataset & Scale

The modeling is performed on a high-dimensional dataset with over **1.2 million observations**.

- **Target Variable**: `implied_vol_ref` (implied volatility).
- **Features**: Option strike price ($K$), underlying asset price ($S$), and time to maturity ($\tau$).
- **Volume**: A training set of $1,251,307$ rows and a test set of identical size.

## 🛠️ Modeling Methodology

The project follows a rigorous statistical pipeline to compare two modeling philosophies:

### 1. The Statistical Baseline (GLM)
Using R's GLM framework, I implement models with targeted link functions and error distributions (such as **Gamma** or **Inverse Gaussian**) to capture the global structure of the volatility surface. These models serve as the benchmark for transparency and stability.

### 2. The Black-Box Challenge
To capture local non-linearities such as the volatility smile and skew, I explore more complex architectures. Performance is evaluated by **Root Mean Squared Error (RMSE)** relative to the GLM baselines.

### 3. Feature Engineering
Key financial indicators are derived from the raw data:
- **Moneyness**: Calculated as the ratio $K/S$.
- **Temporal Dynamics**: Transformations of time to maturity to linearize the term structure.

## 📈 Evaluation & Reproducibility

Performance is measured strictly via RMSE on the original scale of the target variable. To ensure reproducibility and precise comparisons across model iterations, a fixed random seed is maintained throughout the workflow.

```r
set.seed(2025)

TrainData <- read.csv("train_ISF.csv", stringsAsFactors = FALSE)
TestX <- read.csv("test_ISF.csv", stringsAsFactors = FALSE)

rmse_eval <- function(actual, predicted) {
  sqrt(mean((actual - predicted)^2))
}

```

## 🔍 Critical Analysis

Beyond pure prediction, the project addresses:

- Model Limits: Identifying market regimes where models fail (e.g., deep out-of-the-money options).
- Interpretability: Quantifying the trade-off between complexity and practical utility in a risk management context.
- Future Extensions: Considering richer dynamics, such as historical volatility or skew-specific targets.
