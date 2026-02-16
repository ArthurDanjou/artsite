---
slug: sl-breast-cancer
title: Breast Cancer Detection
type: Academic Project
description: Prediction of breast cancer presence by comparing several supervised classification models using machine learning techniques.
shortDescription: A project comparing supervised classification models to predict breast cancer presence using machine learning.
publishedAt: 2025-06-06
readingTime: 2
status: Completed
tags:
  - Python
  - Machine Learning
  - Classification
  - Healthcare
icon: i-ph-heart-half-duotone
---

## Header

- **Projet :** Breast Cancer Detection
- **Date / période estimée :** 2025-06-06
- **Tags / technos :** Python, Machine Learning, Classification, Healthcare

## Context & Goal

Projet de Statistical Learning focalisé sur la détection du cancer du sein à partir de variables cliniques, avec enjeu fort de rappel et de robustesse en contexte médical.

## Methodology/Stack

Comparaison de classifieurs supervisés (régression logistique, k-NN, Naive Bayes, MLP), validation croisée stratifiée, gestion du déséquilibre et régularisation.

## Key Results

L'étude met en évidence les compromis entre modèles et confirme la pertinence d'une évaluation centrée F1-score pour limiter les erreurs critiques.

## Status & Evolution

**État actuel : Completed.** Une piste d'évolution serait d'ajouter calibration des probabilités et interprétabilité clinique des décisions.


## Notes additionnelles

This project was carried out as part of the **Statistical Learning** course at Paris-Dauphine PSL University. The objective is to identify the most effective model for predicting or explaining the presence of breast cancer based on a set of biological and clinical features.

## 📊 Project Objectives

Develop and evaluate several supervised classification models to predict the presence of breast cancer based on biological features extracted from the Breast Cancer Coimbra dataset, provided by the UCI Machine Learning Repository.

The dataset contains 116 observations divided into two classes:
- **1**: healthy individuals (controls)
- **2**: patients diagnosed with breast cancer

There are 9 explanatory variables, including clinical measurements such as age, insulin levels, leptin, insulin resistance, among others.

## 🔍 Methodology

The project follows a comparative approach between several algorithms:

- Logistic Regression
- k-Nearest Neighbors (k-NN)
- Naive Bayes
- Artificial Neural Network (MLP with a 16-8-1 architecture)

Model evaluation is primarily based on the F1-score, which is more suitable in a medical context where identifying positive cases is crucial. Particular attention was paid to stratified cross-validation and to handling class imbalance, notably through the use of class weights and regularization techniques (L2, early stopping).

This project illustrates a concrete application of data science techniques to a public health issue, while implementing a rigorous methodology for supervised modeling.

## 📚 Resources

You can find the code here: [Breast Cancer Detection](https://go.arthurdanjou.fr/breast-cancer-detection-code)

## 📄 Detailed Report

<iframe src="/projects/breast-cancer.pdf" width="100%" height="1000px">
</iframe>
