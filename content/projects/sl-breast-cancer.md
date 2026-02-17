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

This project was carried out as part of the **Statistical Learning** course at Paris-Dauphine PSL University. The objective is to identify the most effective model for predicting or explaining the presence of breast cancer based on a set of biological and clinical features.

::BackgroundTitle{title="Project Objectives"}
::

Develop and evaluate several supervised classification models to predict the presence of breast cancer based on biological features extracted from the Breast Cancer Coimbra dataset, provided by the UCI Machine Learning Repository.

The dataset contains 116 observations divided into two classes:
- **1**: healthy individuals (controls)
- **2**: patients diagnosed with breast cancer

There are 9 explanatory variables, including clinical measurements such as age, insulin levels, leptin, insulin resistance, among others.

::BackgroundTitle{title="Methodology"}
::

The project follows a comparative approach between several algorithms:

- Logistic Regression
- k-Nearest Neighbors (k-NN)
- Naive Bayes
- Artificial Neural Network (MLP with a 16-8-1 architecture)

Model evaluation is primarily based on the F1-score, which is more suitable in a medical context where identifying positive cases is crucial. Particular attention was paid to stratified cross-validation and to handling class imbalance, notably through the use of class weights and regularization techniques (L2, early stopping).

This project illustrates a concrete application of data science techniques to a public health issue, while implementing a rigorous methodology for supervised modeling.

::BackgroundTitle{title="Resources"}
::

You can find the code here: [Breast Cancer Detection](https://go.arthurdanjou.fr/breast-cancer-detection-code)

::BackgroundTitle{title="Detailed Report"}
::

<iframe src="/projects/breast-cancer.pdf" width="100%" height="1000px">
</iframe>
