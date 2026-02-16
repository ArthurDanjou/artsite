---
slug: hackathon-cnd
title: "CND Hackathon: Defense-Grade Log Intelligence"
type: Hackathon
description: A high-stakes cybersecurity challenge organized by the French Ministry of Defense (CND). Representing Université Paris-Dauphine, our team spent 3 days in a high-security military fortress developing ML models to detect stealthy cyber threats in firewall logs.
shortDescription: Cybersecurity threat detection within a high-security military environment.
publishedAt: 2025-10-28
readingTime: 4
status: completed
tags:
  - Python
  - Streamlit
  - Cybersecurity
  - Machine Learning
  - Scikit-learn
icon: i-ph-shield-check-duotone
---

## Header

- **Projet :** "CND Hackathon: Defense-Grade Log Intelligence"
- **Date / période estimée :** 2025-10-28
- **Tags / technos :** Python, Streamlit, Cybersecurity, Machine Learning, Scikit-learn

## Context & Goal

Hackathon cybersécurité du Ministère des Armées, avec un objectif opérationnel : détecter des menaces dans des logs firewall bruités en minimisant les attaques non détectées.

## Methodology/Stack

Prétraitement orienté logs, extraction de features, classification supervisée (Random Forest/XGBoost) optimisée pour le recall, puis exposition des résultats via interface Streamlit.

## Key Results

Le prototype a réduit les faux négatifs face aux baselines initiales et permis une exploitation rapide en mode ligne-à-ligne ou traitement batch CSV.

## Status & Evolution

**État actuel : completed.** Des améliorations futures peuvent cibler la robustesse en production (drift, explicabilité, pipelines MLOps sécurisés).


## Notes additionnelles

## The Setting: Fort de Mont-Valérien

This wasn't your typical university hackathon. Organized by the **Commissariat au Numérique de Défense (CND)**, the event took place over three intense days within the walls of the **Fort de Mont-Valérien**—a highly secured military fortress. 

Working in this environment underscored the real-world stakes of the mission. Our **team of six**, representing **Université Paris-Dauphine**, competed against several elite engineering schools to solve critical defense-related data challenges.

## The Mission: Classifying the "Invisible"

The core task involved processing poorly labeled and noisy firewall logs. In a defense context, a "missing" log or a mislabeled entry can be the difference between a minor system bug and a coordinated intrusion.

### 1. Tactical Log Translation
Firewall logs are often cryptic and inconsistent. We developed a preprocessing pipeline to:
* **Feature Extraction:** Parse raw logs into structured data (headers, flags, payloads).
* **Contextual Labeling:** Distinguish between routine system "bugs" (non-malicious failures) and actual "attacks" (malicious intent).

### 2. Strategic Goal: Recalling the Threat
In military cybersecurity, the cost of a **False Negative** (an undetected attack) is catastrophic. 
* **Model Priority:** We optimized our classifiers specifically for **Recall**. We would rather investigate a few system bugs (False Positives) than let a single attack slip through the net.
* **Techniques:** We used ensemble methods (XGBoost/Random Forest) combined with advanced resampling to handle the heavy class imbalance typical of network traffic.

> **Key Achievement:** Our model significantly reduced the rate of undetected threats compared to standard baseline configurations provided at the start of the challenge.

## Deployment & Interaction

To make our findings operational, we built a **Streamlit-based command center**:
* **On-the-Fly Analysis:** Security officers can paste a single log line to get an immediate "Bug vs. Attack" probability score.
* **Bulk Audit:** The interface supports CSV uploads, allowing for the rapid analysis of entire daily log batches to highlight high-risk anomalies.

## Technical Stack
* **Language:** Python
* **ML Library:** Scikit-learn, XGBoost
* **Deployment:** Streamlit
* **Environment:** High-security on-site military infrastructure

---

Representing Dauphine in such a specialized environment was a highlight of my academic year. Would you like me to elaborate on the specific feature engineering techniques we used to "clean" the raw military logs?
