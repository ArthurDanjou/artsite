---
slug: glm-bikes
title: Generalized Linear Models for Bikes Prediction
type: Academic Project
description: Predicting the number of bikes rented in a bike-sharing system using Generalized Linear Models and various statistical techniques.
shortDescription: A project applying Generalized Linear Models to predict bike rentals based on environmental and temporal features.
publishedAt: 2025-01-24
readingTime: 1
status: Completed
tags:
  - R
  - Statistics
  - GLM
  - Mathematics
icon: i-ph-bicycle-duotone
---

## Header

- **Projet :** Generalized Linear Models for Bikes Prediction
- **Date / période estimée :** 2025-01-24
- **Tags / technos :** R, Statistics, GLM, Mathematics

## Context & Goal

Projet réalisé en cours de GLM pour modéliser les comptes de locations de vélos et comprendre les facteurs explicatifs de la demande.

## Methodology/Stack

Comparaison de familles GLM (Poisson, Binomiale négative, Gaussienne), diagnostics de résidus, sélection de variables et validation croisée. Accent sur la structure probabiliste des comptages et les hypothèses de dispersion.

## Key Results

Le travail met en évidence l'impact de la saisonnalité et des variables météo, tout en identifiant des compromis robustesse/interprétabilité entre spécifications de modèles.

## Status & Evolution

**État actuel : Completed.** Une évolution naturelle serait d'intégrer des effets non linéaires/mixtes pour capturer des dynamiques temporelles plus fines.


## Notes additionnelles

This project was completed as part of the **Generalized Linear Models** course at Paris-Dauphine PSL University. The objective was to develop and compare statistical models to predict the number of bicycle rentals in a bike-sharing system based on various environmental and temporal characteristics.

## 📊 Project Objectives

- Determine the best predictive model for bicycle rental counts
- Analyze the impact of various features (temperature, humidity, wind speed, seasonality, etc.)
- Apply and evaluate different generalized linear modeling techniques
- Validate model assumptions and performance metrics

## 🔍 Methodology

The study employs rigorous statistical approaches including:

- **Exploratory Data Analysis (EDA)** - Understanding feature distributions and relationships
- **Model Comparison** - Testing multiple GLM families (Poisson, Negative Binomial, Gaussian)
- **Feature Selection** - Identifying the most influential variables
- **Model Diagnostics** - Validating assumptions and checking residuals
- **Cross-validation** - Ensuring robust performance estimates

## 📁 Key Findings

The analysis identified critical factors influencing bike-sharing demand:
- Seasonal patterns and weather conditions
- Temperature and humidity effects
- Holiday and working day distinctions
- Time-based trends and cyclical patterns

## 📚 Resources

You can find the code here: [GLM Bikes Code](https://go.arthurdanjou.fr/glm-bikes-code)

## 📄 Detailed Report

<iframe src="/projects/bikes-glm.pdf" width="100%" height="1000px">
</iframe>
