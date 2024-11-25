---
slug: what-is-machine-learning
title: What is Machine Learning ?
description: An introduction to machine learning, exploring its main types, key model selection criteria, and the workflow from training to evaluation, with a focus on practical insights.
readingTime: 3
publishedAt: 2024/11/26
tags:
  - article
  - ML
---

# What Is Machine Learning page

## Introduction

Machine Learning (ML) is a key discipline in artificial intelligence (AI), enabling systems to learn from data to make predictions or discover patterns. It is the driving force behind many modern innovations, from personalised recommendations to autonomous vehicles.

In this article, we will cover:

1. **The types of Machine Learning**, to understand the different approaches.
2. **Three considerations for choosing a supervised learning model**, one of the most common ML paradigms.
3. **The typical ML workflow**, exploring the essential steps for developing a model.
4. **Model evaluation through the R² score**, an important metric for regression problems.

## The Types of Machine Learning

To start, it is important to understand the three main categories of machine learning:

1. **Supervised Learning** This type of learning relies on labeled data, where the model learns to map inputs XXX to outputs yyy. Common tasks include:\* **Classification**: Assigning data to categories (e.g., spam detection).\* **Regression**: Predicting continuous values (e.g., house price estimation).![ML Model Types.png](/portfolio/What%20is%20Machine%20Learning/ML%20Model%20Types.png)
2. **Unsupervised Learning** In this case, no labels are provided, and the goal is to find structures or patterns. Common tasks include:\* **Clustering**: Grouping similar data points (e.g., customer segmentation).\* **Dimensionality Reduction**: Simplifying data while retaining key information (e.g., PCA).* **Anomaly Detection**: Identifying unusual data points (e.g., fraud detection).
3. **Reinforcement Learning** This learning type involves an agent interacting with an environment. The agent learns by trial and error to maximize cumulative rewards, as seen in robotics and gaming.

With this overview of ML types, let’s now focus on supervised learning, the most widely used approach, and explore how to choose the right model.

## Three Considerations for Choosing a Supervised Learning Model

Selecting the right supervised learning model is critical and depends on several factors:

1. **Problem Type**\* Is it a regression or classification problem?\* **Key Point**: Determine if the target variable is continuous or discrete.
2. **Problem Complexity**\* Is the relationship between input features and the target variable linear or nonlinear?\* **Key Point**: Understand whether the data allows for easy predictions or requires more complex models.
3. **Algorithmic Approach**\* Should you choose a feature-based or similarity-based model?\* **Key Point**: The choice of the model (e.g., linear regressions vs k-NN) depends on the dataset’s size and complexity.

Once the model type is defined, the next step is to delve into the full workflow of developing an ML model.

# The Typical Workflow in Machine Learning

A machine learning project generally follows these steps:

1. **Data Preparation**\* Splitting data into training and testing sets.\* Preprocessing: scaling, handling missing values, etc.
2. **Model Training**\* Fitting the model on training data: `model.fit(X, y)`.\* Optimising parameters and hyperparameters.
3. **Prediction and Evaluation**\* Making predictions on unseen data: `model.predict(X)`.\* Comparing predictions ($\hat{y}$​) with actual values ($y$).![Modelization in Prog.png](/portfolio/What%20is%20Machine%20Learning/Modelization%20in%20Prog.png)

**Transition:** Evaluation is a crucial step to verify the performance of a model. For regression problems, the R² score is a key indicator.

## Evaluating Models: The R² Score

For regression problems, the **R² score** measures the proportion of the target’s variance explained by the model:

$R2 = 1 - \frac{\text{SS}\_{\text{residual}}}{\text{SS}\_{\text{total}}}$

Where:

- $\text{SS}\_{\text{residual}}$​: Sum of squared residuals between actual and predicted values.
- $\text{SS}\_{\text{total}}$​: Total sum of squares relative to the target’s mean.

A $R^2$ close to 1 indicates a good fit.

![R2 Score.png](/portfolio/What%20is%20Machine%20Learning/R2%20Score.png)

With these concepts in mind, you are better equipped to understand and apply ML models in your projects.

## Conclusion

Machine learning is revolutionising how we solve complex problems using data. Supervised, unsupervised, and reinforcement learning approaches allow us to tackle a wide variety of use cases. In supervised learning, the model choice depends on the problem type, its complexity, and the appropriate algorithmic approach. Finally, a structured workflow and metrics like the R² score ensure the quality of predictions and analyses.
