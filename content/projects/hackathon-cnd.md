---
slug: hackathon-cnd
title: "CND Hackathon: Defense-Grade Log Intelligence"
type: Hackathon
description: A high-stakes cybersecurity challenge organized by the French Ministry of Defense (CND). Representing Université Paris-Dauphine, our team spent 3 days in a high-security military fortress developing ML models to detect stealthy cyber threats in firewall logs.
shortDescription: Cybersecurity threat detection within a high-security military environment.
publishedAt: 2025-10-28
readingTime: 4
status: Completed
tags:
  - Python
  - Streamlit
  - Cybersecurity
  - Machine Learning
  - Scikit-learn
icon: i-ph-shield-check-duotone
---

::BackgroundTitle{title="The Setting: Fort de Mont-Valérien"}
::

This was not a typical university hackathon. Organized by the **Commissariat au Numerique de Defense (CND)**, the event took place over three intense days within the walls of the **Fort de Mont-Valerien**, a highly secured military fortress.

Working in this environment underscored the real-world stakes of the mission. Our **team of six**, representing **Universite Paris-Dauphine**, competed against several elite engineering schools to solve critical defense-related data challenges.

::BackgroundTitle{title="The Mission: Classifying the Invisible"}
::

The core task involved processing poorly labeled and noisy firewall logs. In a defense context, a "missing" log or a mislabeled entry can be the difference between a minor system bug and a coordinated intrusion.

### 1. Tactical Log Translation
Firewall logs are often cryptic and inconsistent. We developed a preprocessing pipeline to:
* **Feature Extraction:** Parse raw logs into structured data (headers, flags, payloads).
* **Contextual Labeling:** Distinguish between routine system "bugs" (non-malicious failures) and actual "attacks" (malicious intent).

### 2. Strategic Goal: Recalling the Threat
In military cybersecurity, the cost of a **False Negative** (an undetected attack) is catastrophic.
* **Model Priority:** We optimized our classifiers specifically for **Recall**. We would rather investigate a few system bugs (False Positives) than let a single attack slip through the net.
* **Techniques:** We used ensemble methods (XGBoost/Random Forest) combined with advanced resampling to handle the heavy class imbalance typical of network traffic.

> **Key Achievement:** Our model significantly reduced the rate of undetected threats compared to the baseline configurations provided at the start of the challenge.

::BackgroundTitle{title="Deployment & Interaction"}
::

To make our findings operational, we built a **Streamlit-based command center**:
* **On-the-Fly Analysis:** Security officers can paste a single log line to get an immediate "Bug vs. Attack" probability score.
* **Bulk Audit:** The interface supports CSV uploads, allowing for the rapid analysis of entire daily log batches to highlight high-risk anomalies.

::BackgroundTitle{title="Technical Stack"}
::
* **Language:** Python
* **ML Library:** Scikit-learn, XGBoost
* **Deployment:** Streamlit
* **Environment:** High-security on-site military infrastructure

---

Representing Dauphine in such a specialized environment was a highlight of my academic year. I can share more details on the feature engineering techniques we used to clean the raw military logs.
