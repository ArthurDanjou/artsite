---
slug: implied-volatility-prediction-from-options-data
title: Implied Volatility Prediction from Options Data
type: Academic Project
description: A large-scale statistical study comparing Generalized Linear Models (GLMs) and black-box machine learning architectures to predict the implied volatility of S&P 500 options.
shortDescription: Predicting implied volatility using advanced regression techniques and machine learning models on financial options data. 
publishedAt: 2026-02-28
readingTime: 3
status: Completed
tags:
  - R
  - GLM
  - Finance
  - Machine Learning
  - Statistical Modeling
icon: i-ph-graph-duotone
---

> **M2 Master's Project** – Predicting implied volatility using advanced regression techniques and machine learning models on financial options data.

This project explores the prediction of **implied volatility** from options market data, combining classical statistical methods with modern machine learning approaches. The analysis covers data preprocessing, feature engineering, model benchmarking, and interpretability analysis using real-world financial panel data.

- **GitHub Repository:** [Implied-Volatility-from-Options-Data](https://github.com/ArthurDanjou/Implied-Volatility-from-Options-Data)

---

::BackgroundTitle{title="Project Overview"}
::

### Problem Statement

Implied volatility represents the market's forward-looking expectation of an asset's future volatility. Accurate prediction is crucial for:
- **Option pricing** and valuation
- **Risk management** and hedging strategies
- **Trading strategies** based on volatility arbitrage

### Dataset

The project uses a comprehensive panel dataset tracking **3,887 assets** across **544 observation dates** (2019-2022):

| File | Description | Shape |
|------|-------------|-------|
| `Train_ISF.csv` | Training data with target variable | 1,909,465 rows × 21 columns |
| `Test_ISF.csv` | Test data for prediction | 1,251,308 rows × 18 columns |
| `hat_y.csv` | Final predictions from both models | 1,251,308 rows × 2 columns |

### Key Variables

**Target Variable:**
- `implied_vol_ref` – The implied volatility to predict

**Feature Categories:**
- **Identifiers:** `asset_id`, `obs_date`
- **Market Activity:** `call_volume`, `put_volume`, `call_oi`, `put_oi`, `total_contracts`
- **Volatility Metrics:** `realized_vol_short`, `realized_vol_mid1-3`, `realized_vol_long1-4`, `market_vol_index`
- **Option Structure:** `strike_dispersion`, `maturity_count`

---

::BackgroundTitle{title="Methodology"}
::

### Data Pipeline

```
Raw Data
    ↓
┌─────────────────────────────────────────────────────────┐
│  Data Splitting (Chronological 80/20)                   │
│  - Training: 2019-10 to 2021-07                         │
│  - Validation: 2021-07 to 2022-03                       │
└─────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────┐
│  Feature Engineering                                    │
│  - Aggregation of volatility horizons                   │
│  - Creation of financial indicators                     │
└─────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────┐
│  Data Preprocessing (tidymodels)                        │
│  - Winsorization (99.5th percentile)                    │
│  - Log/Yeo-Johnson transformations                      │
│  - Z-score normalization                                │
│  - PCA (95% variance retention)                         │
└─────────────────────────────────────────────────────────┘
    ↓
Three Datasets Generated:
├── Tree-based (raw, scale-invariant)
├── Linear (normalized, winsorized)
└── PCA (dimensionality-reduced)
```

### Feature Engineering

New financial indicators created to capture market dynamics:

| Feature | Description | Formula |
|---------|-------------|---------|
| `pulse_ratio` | Volatility trend direction | RV_short / RV_long |
| `stress_spread` | Asset vs market stress | RV_short - Market_VIX |
| `put_call_ratio_volume` | Immediate market stress | Put_Volume / Call_Volume |
| `put_call_ratio_oi` | Long-term risk structure | Put_OI / Call_OI |
| `liquidity_ratio` | Market depth | Total_Volume / Total_OI |
| `option_dispersion` | Market uncertainty | Strike_Dispersion / Total_Contracts |
| `put_low_strike` | Downside protection density | Strike_Dispersion / Put_OI |
| `put_proportion` | Hedging vs speculation | Put_Volume / Total_Volume |

---

::BackgroundTitle{title="Models Implemented"}
::

### Linear Models

| Model | Description | Best RMSE |
|-------|-------------|-----------|
| **OLS** | Ordinary Least Squares | 11.26 |
| **Ridge** | L2 regularization | 12.48 |
| **Lasso** | L1 regularization (variable selection) | 12.03 |
| **Elastic Net** | L1 + L2 combined | ~12.03 |
| **PLS** | Partial Least Squares (on PCA) | 12.79 |

### Linear Mixed-Effects Models (LMM)

Advanced panel data models accounting for asset-specific effects:

| Model | Features | RMSE |
|-------|----------|------|
| LMM Baseline | All variables + Random Intercept | 8.77 |
| LMM Reduced | Collinearity removal | ~8.77 |
| LMM Interactions | Financial interaction terms | ~8.77 |
| LMM + Quadratic | Convexity terms (vol of vol) | 8.41 |
| **LMM + Random Slopes (mod_lmm_5)** | Asset-specific betas | **8.10** ⭐ |

### Tree-Based Models

| Model | Strategy | Validation RMSE | Training RMSE |
|-------|----------|-----------------|---------------|
| **XGBoost** | Level-wise, Bayesian tuning | 10.70 | 0.57 |
| **LightGBM** | Leaf-wise, feature regularization | **10.61** ⭐ | 10.90 |
| Random Forest | Bagging | DNF* | - |

*DNF: Did Not Finish (computational constraints)

### Neural Networks

| Model | Architecture | Status |
|-------|--------------|--------|
| MLP | 128-64 units, tanh activation | Failed to converge |

---

::BackgroundTitle{title="Results Summary"}
::

### Model Comparison

```
RMSE Performance (Lower is Better)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Linear Mixed-Effects (LMM5)     8.38 ████████████████████ Best Linear
Linear Mixed-Effects (LMM4)     8.41 ███████████████████
Linear Mixed-Effects (Baseline) 8.77 ██████████████████
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LightGBM                       10.61 ███████████████ Best Non-Linear
XGBoost                        10.70 ██████████████
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OLS (with interactions)        11.26 █████████████
Lasso                          12.03 ███████████
OLS (baseline)                 12.01 ███████████
Ridge                          12.48 ██████████
PLS                            12.79 █████████
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Key Findings

1. **Best Linear Model:** LMM with Random Slopes (RMSE = 8.38)
   - Captures asset-specific volatility sensitivities
   - Includes quadratic terms for convexity effects

2. **Best Non-Linear Model:** LightGBM (RMSE = 10.61)
   - Superior generalization vs XGBoost
   - Feature regularization prevents overfitting

3. **Interpretability Insights (SHAP Analysis):**
   - `realized_vol_mid` dominates (57% of gain)
   - Volatility clustering confirmed as primary driver
   - Non-linear regime switching in stress_spread

---

::BackgroundTitle{title="Repository Structure"}
::

```
PROJECT/
├── Projet_MRC_DANJOU_LEGRAND_MERIC_VONSIEMENS.qmd     # Main analysis (Quarto)
├── Projet_MRC_DANJOU_LEGRAND_MERIC_VONSIEMENS.html    # Rendered report
├── packages.R                                         # R dependencies installer
├── Train_ISF.csv                                      # Training data (~1.9M rows)
├── Test_ISF.csv                                       # Test data (~1.25M rows)
├── hat_y.csv                                          # Final predictions
├── README.md                                          # This file
└── results/
    ├── lightgbm/                                      # LightGBM model outputs
    └── xgboost/                                       # XGBoost model outputs
```

---

::BackgroundTitle{title="Getting Started"}
::


### Prerequisites

- **R** ≥ 4.0
- Required packages (auto-installed via `packages.R`)

### Installation

```r
# Install all dependencies
source("packages.R")
```

Or manually install key packages:

```r
install.packages(c(
  "tidyverse", "tidymodels", "caret", "glmnet",
  "lme4", "lmerTest", "xgboost", "lightgbm",
  "ranger", "pls", "shapviz", "rBayesianOptimization"
))
```

### Running the Analysis

1. **Open the Quarto document:**
   ```r
   # In RStudio
   rstudioapi::navigateToFile("Projet_MRC_DANJOU_LEGRAND_MERIC_VONSIEMENS.qmd")
   ```

2. **Render the document:**
   ```r
   quarto::quarto_render("Projet_MRC_DANJOU_LEGRAND_MERIC_VONSIEMENS.qmd")
   ```

3. **Or run specific sections interactively** using the code chunks in the `.qmd` file

---

::BackgroundTitle{title="Technical Details"}
::

### Data Split Strategy

- **Chronological split** at 80th percentile of dates
- Prevents look-ahead bias and data leakage
- Training: ~1.53M observations
- Validation: ~376K observations

### Hyperparameter Tuning

- **Method:** Bayesian Optimization (Gaussian Processes)
- **Acquisition:** Expected Improvement (UCB)
- **Goal:** Maximize negative RMSE

### Evaluation Metric

**Exponential RMSE** on original scale:

$$
RMSE_{real} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} \left( \exp(\hat{y}_{\log, i}) - y_i \right)^2}
$$

Models trained on log-transformed target for variance stabilization.

---

::BackgroundTitle{title="Key Concepts"}
::

### Financial Theories Applied

1. **Volatility Clustering** – Past volatility predicts future volatility
2. **Variance Risk Premium** – Spread between implied and realized volatility
3. **Fear Gauge** – Put-call ratio as sentiment indicator
4. **Mean Reversion** – Volatility tends to return to long-term average
5. **Liquidity Premium** – Illiquid assets command higher volatility

### Statistical Methods

- Panel data modeling with fixed and random effects
- Principal Component Analysis (PCA)
- Bayesian hyperparameter optimization
- SHAP values for model interpretability

---

::BackgroundTitle{title="Authors"}
::

**Team:**
- Arthur DANJOU
- Camille LEGRAND  
- Axelle MERIC
- Moritz VON SIEMENS

**Course:** Classification and Regression (M2)
**Academic Year:** 2025-2026

---

::BackgroundTitle{title="Notes"}
::

- **Computational Constraints:** Some models (Random Forest, MLP) failed due to hardware limitations (16GB RAM, CPU-only)
- **Reproducibility:** Set `seed = 2025` for consistent results
- **Language:** Analysis documented in English, course materials in French

---

::BackgroundTitle{title="References"}
::

Key R packages used:
- `tidymodels` – Modern modeling framework
- `glmnet` – Regularized regression
- `lme4` / `lmerTest` – Mixed-effects models
- `xgboost` / `lightgbm` – Gradient boosting
- `shapviz` – Model interpretability
- `rBayesianOptimization` – Hyperparameter tuning
