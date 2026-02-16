---
slug: hackathon-natixis
title: "Natixis Hackathon: Generative SQL Analytics"
type: Hackathon
description: An intensive 4-week challenge to build an AI-powered data assistant. Our team developed a GenAI agent that transforms natural language into executable SQL queries, interactive visualizations, and natural language insights.
shortDescription: A team-based project building an NL-to-SQL agent with Nuxt, Ollama, and Vercel AI SDK.
publishedAt: 2026-03-07
readingTime: 4
status: Completed
tags:
  - Nuxt
  - Ollama
  - Vercel AI SDK
  - PostgreSQL
  - ETL
icon: i-ph-database-duotone
---

## The Challenge

Organized by **Natixis**, this hackathon followed a high-intensity format: **three consecutive Saturdays** of on-site development, bridged by two full weeks of remote collaboration.

Working in a **team of four**, our goal was to bridge the gap between non-technical stakeholders and complex financial databases by creating an autonomous "Data Talk" agent.

## Core Features

### 1. Data Engineering & Schema Design
Before building the AI layer, we handled a significant data migration task. I led the effort to:
* **ETL Pipeline:** Convert fragmented datasets from **.xlsx** and **.csv** formats into a structured **SQL database**.
* **Schema Optimization:** Design robust SQL schemas that allow an LLM to understand relationships (foreign keys, indexing) for accurate query generation.

### 2. Natural Language to SQL (NL-to-SQL)
Using the **Vercel AI SDK** and **Ollama**, we implemented an agentic workflow:
* **Prompt Engineering:** Fine-tuning the agent to translate complex business questions (e.g., "What was our highest growth margin last quarter?") into valid, optimized SQL.
* **Self-Correction:** If a query fails, the agent analyzes the SQL error and self-corrects the syntax before returning a result.

### 3. Automated Insights & Visualization
Data is only useful if it’s readable. Our Nuxt application goes beyond raw tables:
* **Dynamic Charts:** The agent automatically determines the best visualization type (Bar, Line, Pie) based on the query result and renders it using interactive components.
* **Narrative Explanations:** A final LLM pass summarizes the data findings in plain English, highlighting anomalies or key trends.

## Technical Stack

* **Frontend/API:** **Nuxt 3** for a seamless, reactive user interface.
* **Orchestration:** **Vercel AI SDK** to manage streams and tool-calling logic.
* **Inference:** **Ollama** for running LLMs locally, ensuring data privacy during development.
* **Storage:** **PostgreSQL** for the converted data warehouse.

## Impact & Results

This project demonstrated that a modern stack (Nuxt + local LLMs) can drastically reduce the time needed for data discovery. By the final Saturday, our team presented a working prototype capable of handling multi-table joins and generating real-time financial dashboards from simple chat prompts.

---

*Curious about the ETL logic or the prompt structure we used? I can share how we optimized the LLM's SQL accuracy.*
