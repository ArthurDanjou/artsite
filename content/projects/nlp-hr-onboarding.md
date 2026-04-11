---
slug: nlp-hr-onboarding
title: Intelligent HR Onboarding Assistant
type: Academic Project
description: Intelligent HR onboarding assistant using RAG, LangChain agents, and MistralAI embeddings to help new employees navigate company policies, employee directory, and administrative tasks. 
shortDescription: An AI-powered assistant for streamlining HR onboarding processes and improving new hire experience.
publishedAt: 2026-03-13
readingTime: 3
favorite: false
status: Completed
tags:
  - Python
  - NLP
  - LangChain
  - RAG
icon: i-ph-robot-duotone
---

**NLP Project — Master M2**  
*Authors: Arthur DANJOU, Axelle MERIC, Moritz von SIEMENS*

## Project Overview

The **Intelligent HR Onboarding Assistant** is a conversational AI system designed to guide new employees during their first week at **TechCorp**. It combines retrieval-augmented generation, tool-using agents, and conversational memory to provide accurate and actionable HR support.

The assistant can answer policy questions, retrieve employee information, schedule internal meetings, and prepare leave requests from natural-language prompts.

## Key Features

- **Semantic HR policy search** powered by a RAG pipeline.
- **Employee directory lookup** from structured JSON records.
- **Meeting scheduling tools** integrated through LangChain.
- **Automated leave request workflow** from chat instructions.
- **Sliding-window memory** to keep multi-turn context coherent.
- **Interactive Gradio UI** with visible agent actions and tool calls.

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│           HR Onboarding Assistant — TechCorp            │
│                                                         │
│  📝 System prompts (LangChain LCEL)                     │
│  🧠 Sliding window conversational memory                │
│  🔧 Tools:                                              │
│     ├── 🔍 Knowledge base search (RAG)                  │
│     ├── 👤 Employee directory                           │
│     ├── 📅 Meeting scheduling                           │
│     ├── 🏖️ Leave request submission                     │
│     └── 🕐 Current date and time                        │
│  🔄 ReAct loop: reason → act → observe                  │
│  📊 MistralAI Embeddings + Qdrant Vector Store          │
└──────────────────────────────────────────────────────────┘
```

## Prerequisites

- Python ≥ 3.13
- MistralAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NLP-Intelligent-HR-Onboarding-Assistant-with-RAG-and-LangChain
   ```

2. **Install dependencies**
   ```bash
   uv sync
   ```

3. **Configure MistralAI API key**
   
   Set the environment variable:
   ```bash
   export MISTRAL_API_KEY="your_api_key"
   ```

## Usage

### Run the Jupyter notebook

```bash
jupyter notebook projet.ipynb
```

Execute cells sequentially to:
1. Analyze tokenization of HR documents
2. Create the Qdrant vector database
3. Initialize the ReAct agent
4. Run demonstrations
5. Launch the Gradio interface (runs on `http://127.0.0.1:7860`)

### Data structure

```
data/
├── entreprise.md    # HR knowledge base (leave policy, remote work, etc.)
└── employés.json    # TechCorp employee directory
```

## Learning Modules

| TP | Concept | Usage |
|:---|:--------|:------|
| **TP1** | Embeddings | Document vectorization and cosine similarity retrieval |
| **TP2** | BPE Tokenization | Token-cost analysis with FR/EN comparison |
| **TP3** | LLM + LangChain | ChatMistralAI setup, prompts, and LCEL chains |
| **TP4** | Agents + Memory | `@tool` usage, ReAct orchestration, sliding-window memory |
| **TP5** | RAG + Gradio | Qdrant indexing, semantic retrieval, interactive UI |

## Technologies

- **LangChain**: LLM orchestration framework
- **MistralAI**: LLM inference and embeddings (`mistral-embed`)
- **Qdrant**: In-memory vector database
- **Gradio**: Interactive web interface
- **tiktoken**: BPE tokenization analysis
- **pandas**: Employee data manipulation

## Main Dependencies

```
langchain>=1.2.11
langchain-mistralai>=1.1.1
langchain-qdrant>=1.1.0
gradio>=6.9.0
tiktoken>=0.12.0
pandas>=3.0.1
```

## Example Prompts

- "How many days of annual leave do I have?"
- "What is the remote work policy?"
- "Give me Claire Petit's contact information"
- "Schedule a meeting with the Data Science team tomorrow at 2pm"
- "I want to request leave from January 15th to 20th"

## Authors

- **Arthur DANJOU**
- **Axelle MERIC**
- **Moritz von SIEMENS**

*Project completed as part of the Natural Language Processing course — Master M2*
