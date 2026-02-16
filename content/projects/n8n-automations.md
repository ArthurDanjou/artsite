---
slug: n8n-automations
title: n8n Automations
type: Academic Project
description: An academic project exploring the automation of GenAI workflows using n8n and Ollama for self-hosted AI applications, including personalized research agents and productivity hubs.
shortDescription: Automating GenAI workflows with n8n and Ollama in a self-hosted environment.
publishedAt: 2026-03-15
readingTime: 2
status: in progress
tags:
  - n8n
  - Gemini
  - Self-Hosted
  - Automation
  - RAG
  - Productivity
icon: i-ph-plugs-connected-duotone
---

## Header

- **Projet :** n8n Automations
- **Date / période estimée :** 2026-03-15
- **Tags / technos :** n8n, Gemini, Self-Hosted, Automation, RAG, Productivity

## Context & Goal

Projet orienté productivité et veille scientifique pour orchestrer des workflows GenAI privés depuis une infrastructure auto-hébergée.

## Methodology/Stack

Automatisations n8n connectant Notion, Calendar, Todoist, Gmail/Discord et flux RSS, avec couche LLM (Gemini/Ollama) pour filtrage sémantique et logique RAG.

## Key Results

Un hub automatisé centralise agenda/tâches et alimente un agent de recherche contextuel pour accélérer la veille académique.

## Status & Evolution

**État actuel : in progress.** Les itérations à venir portent sur le raffinement des prompts de filtrage et la qualité de récupération du RAG.


## Notes additionnelles

## Overview

This project focuses on designing and implementing autonomous workflows that leverage Large Language Models (LLMs) to streamline productivity and academic research. By orchestrating Generative AI through a self-hosted infrastructure on my **[ArtLab](/projects/artlab)**, I have built a private ecosystem that acts as both a personal assistant and a specialized research agent.

## Key Workflows

### 1. Centralized Productivity Hub
I developed a synchronization engine that bridges **Notion**, **Google Calendar**, and **Todoist**. 
* **Contextual Sync:** Academic events, such as course schedules and exam dates, are pulled from Notion and reflected in my calendar and task manager.
* **Daily Briefing:** Every morning, the system triggers a workflow that compiles my schedule, pending tasks, and a local weather report into a single, centralized email summary. This ensures a friction-less start to the day with all critical information in one place.

### 2. Intelligent Research Engine (RSS & RAG)
To stay at the forefront of AI research, I built an automated pipeline for academic and technical monitoring.
* **Multi-Source Fetching:** The system monitors RSS feeds from **arXiv**, **Hugging Face**, **Hacker News**, **selfho.st**, and major industry blogs (OpenAI, Google Research, Meta).
* **Semantic Filtering:** Using LLMs, articles are filtered and ranked based on my specific research profile—focusing on **robust distributed learning**. 
* **Knowledge Base:** Relevant papers and posts are automatically stored in a structured Notion database.
* **Interactive Research Agent:** I integrated a chat interface within n8n that allows me to query this collected data. I can request summaries, ask specific technical questions about a paper, or extract the most relevant insights for my current thesis work.

## Technical Architecture

The environment is built to handle complex multi-step chains, moving beyond simple API calls to create context-aware agents.

### Integrated Ecosystem
* **Intelligence Layer:** Integration with **Gemini** (API) and **Ollama** (local) for summarization and semantic sorting.
* **Data Sources:** RSS Feeds, Notion Databases.
* **Notifications & UI:** Gmail for briefings and Discord for real-time system alerts.

## Key Objectives

1.  **Privacy-Centric AI:** Ensuring that sensitive academic data and personal schedules remain within a self-hosted or controlled environment.
2.  **Academic Efficiency:** Reducing the "noise" of information overload by using AI to surface only the most relevant research papers.
3.  **Low-Code Orchestration:** Utilizing n8n to manage complex logic and API interactions without the overhead of maintaining a massive custom codebase.

---

*This project is currently under active development as I refine the RAG (Retrieval-Augmented Generation) logic and optimize the filtering prompts for my research.*
