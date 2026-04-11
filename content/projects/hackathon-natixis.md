---
slug: hackathon-natixis
title: "Natixis Hackathon: Generative SQL Analytics"
type: Hackathon
description: An intensive 4-week challenge to build an AI-powered data assistant. Our team developed a GenAI agent that transforms natural language into executable SQL queries, interactive visualizations, and natural language insights.
shortDescription: A team-based project building an NL-to-SQL agent with Nuxt, Ollama, and Vercel AI SDK.
publishedAt: 2026-03-07
readingTime: 15
status: Completed
tags:
  - Nuxt
  - Ollama
  - Vercel AI SDK
  - PostgreSQL
  - ETL
icon: i-ph-database-duotone
---

::note
Our team and I won the hackathon, taking first place among 13 teams.
::

## The Challenge

Organized by **Natixis**, this hackathon followed a high-intensity format: **three consecutive Saturdays** of on-site development, bridged by two full weeks of remote collaboration.

Working in a **team of four**, our goal was to bridge the gap between non-technical stakeholders and complex financial databases by creating an autonomous "Data Talk" agent.

## How We Built It

### Data Engineering & Schema Design

Before building the AI layer, we handled a significant data migration task. I led the effort to:

* **ETL Pipeline:** Convert fragmented datasets from **.xlsx** and **.csv** formats into a structured **SQL database**.
* **Schema Optimization:** Design robust SQL schemas that allow an LLM to understand relationships (foreign keys, indexing) for accurate query generation.

### Natural Language to SQL (NL-to-SQL)

Using the **Vercel AI SDK** and **Ollama**, we implemented an agentic workflow:

* **Prompt Engineering:** Fine-tuning the agent to translate complex business questions (e.g., "What was our highest growth margin last quarter?") into valid, optimized SQL.
* **Self-Correction:** If a query fails, the agent analyzes the SQL error and self-corrects the syntax before returning a result.

### Automated Insights & Visualization

Data is only useful if it's readable. Our Nuxt application goes beyond raw tables:

* **Dynamic Charts:** The agent automatically determines the best visualization type (Bar, Line, Pie) based on the query result and renders it using interactive components.
* **Narrative Explanations:** A final LLM pass summarizes the data findings in plain English, highlighting anomalies or key trends.

## Impact & Results

This project demonstrated that a modern stack (Nuxt + local LLMs) can drastically reduce the time needed for data discovery. By the final Saturday, our team presented a working prototype capable of handling multi-table joins and generating real-time financial dashboards from simple chat prompts.

## Features

- **Natural Language Queries**: Ask questions about anomalies in plain French or English
- **SQL Execution**: Automatic SQL query generation and execution against MySQL database
- **Visualizations**: Automatic chart generation (Line, Bar, Area, Donut, Bubble, Gantt)
- **KPI Cards**: Dynamic KPI generation with trends and icons
- **AI-Powered**: Uses Ollama models with tool calling capabilities
- **Dark Mode**: Full light/dark theme support

## Technical Stack

* **Frontend/API:** **Nuxt 3** for a seamless, reactive user interface.
* **Orchestration:** **Vercel AI SDK** to manage streams and tool-calling logic.
* **Inference:** **Ollama** for running LLMs locally, ensuring data privacy during development.
* **Storage:** **PostgreSQL** for the converted data warehouse.

## Quick Start

### Prerequisites

- **Docker & Docker Compose** (for MySQL database)
- **Python 3.13+** (project managed with `uv`; `pip` works too)
- **Bun** (package manager): `npm install -g bun`
- **Ollama** running locally with a compatible model (e.g., `llama3.2`, `qwen2.5`, `mistral`)

### 1. Start MySQL Database

```bash
docker compose up -d mysql
```

The `natixis` database is created automatically from `init.sql`:
- Default: `mysql://root:@localhost:3306/natixis`
- Root password is empty for local development only

### 2. Load Data into Database

Install Python dependencies:

```bash
uv sync          # or: pip install -e .
```

Place source files in `./data/` directory:
- `Configuration.xlsx` - Control and typology configuration
- `anomaly_dump_result.csv` - Anomaly data
- `GenericAnomaly_dump_result_chunk_*.xlsx` - Generic anomaly chunks

These datasets are not tracked in the repository - use the files shared with the project.

Then run the Jupyter notebook:

```bash
jupyter notebook data_exploration.ipynb
```

Execute the `insert_into_sql` and `reset_and_load` cells to populate `generic_anomalies`, `anomalies`, and configuration tables.

### 3. Configure Environment

Create `.env` file in `/chat`:

```env
DATABASE_URL="mysql://root:@localhost:3306/natixis"
```

### 4. Run the Chat Application

```bash
cd chat
bun install
bun run dev --host
```

The app will be available at `http://localhost:3000`

## Project Structure

```
.
├── data_exploration.ipynb    # Jupyter notebook for data loading
├── init.sql                  # MySQL initialization script
├── docker-compose.yml        # Docker services configuration
├── data/                     # Source data files (not tracked)
│   ├── Configuration.xlsx
│   ├── anomaly_dump_result.csv
│   └── GenericAnomaly_dump_result_chunk_*.xlsx
└── chat/                     # Nuxt application
    ├── app/                  # Vue components and pages
    ├── server/               # API endpoints
    ├── shared/               # Shared utilities and tools
    └── nuxt.config.ts        # Nuxt configuration
```

## Database Schema

The database contains the following main tables:

### Core Tables

| Table | Description |
|-------|-------------|
| `anomalies` | Standard anomaly records |
| `generic_anomalies` | Generic anomaly records (default for analysis) |
| `typologies` | Anomaly classification typologies |
| `functional_controls` | Control definitions and ownership |
| `business_objects` | Business object definitions |
| `business_object_fields` | Field definitions for business objects |
| `business_data` | Business data definitions |
| `business_data_field_link` | Links between fields and business data |

### Key Fields in Anomalies

- `anomaly_kuid` - Unique identifier (primary key)
- `title_txt`, `description_txt` - Anomaly details
- `priority_typ` - Priority level (CRITICAL, HIGH, etc.)
- `detection_time` - When anomaly was detected
- `hotfix_flg` - Hotfix eligibility flag
- `object_identification_fields` - JSON with contract/object context
- `error_fields` - JSON with error details and resolution status

## Chat Application Architecture

```
chat/
├── app/
│   ├── app.vue                 # Root component with UI providers
│   ├── components/
│   │   ├── Helper.vue          # Help tooltip component
│   │   ├── ModelSelect.vue     # Model selector dropdown
│   │   ├── Reasoning.vue       # AI reasoning display
│   │   └── tool/               # Tool UI components
│   │       ├── SqlDisplay.vue  # SQL execution display
│   │       ├── Chart.vue       # Chart visualizations
│   │       └── KPI.vue         # KPI cards display
│   └── pages/
│       ├── index.vue           # Landing page with prompt suggestions
│       └── chat.vue            # Main chat interface
├── server/
│   └── api/chat.ts             # Chat API endpoint with streaming
├── shared/utils/tools/
│   ├── executeSql.ts           # SQL query execution tool
│   ├── chart.ts                # Chart visualization tool
│   └── kpi.ts                  # KPI display tool
├── nuxt.config.ts              # Nuxt configuration
└── package.json                # Dependencies
```

### Data Flow

```
User Message
    ↓
AI Streaming (server/api/chat.ts)
    ↓
Tool Selection (toolChoice: 'auto')
    ↓
Tool Execution (server-side)
    ↓
Stream Results to Client
    ↓
groupParts() in chat.vue
    ↓
Component Selection
    ├── type: 'reasoning'           → <Reasoning />
    ├── type: 'tool-executeSqlTool' → <ToolSqlDisplay />
    ├── type: 'tool-chartTool'      → <ToolChart />
    └── type: 'tool-kpiTool'        → <ToolKPI />
    ↓
Rendered Message
```

## Available Tools

### 1. `executeSqlTool`

**Server Tool**: `shared/utils/tools/executeSql.ts`

Executes SQL SELECT queries against the database.

**Parameters:**
- `query`: SQL SELECT query (MySQL syntax)
- `reason`: Explanation for debugging

**Example usage by AI:**
```sql
SELECT priority_typ, COUNT(*) AS anomaly_count
FROM generic_anomalies
GROUP BY priority_typ
LIMIT 10
```

**Security:** Only SELECT queries are allowed. Results are limited to 50 rows.

**UI Component**: `app/components/tool/SqlDisplay.vue`

### 2. `chartTool`

**Server Tool**: `shared/utils/tools/chart.ts`

Generates data visualizations.

**Parameters:**
- `chartType`: `line`, `bar`, `area`, `donut`, `bubble`, `gantt`
- `title`: Chart title
- `data`: Array of data objects
- `xKey`: Field for X-axis
- `xKeyStart`, `xKeyEnd`: Start/end fields for Gantt charts
- `radiusKey`: Size field for Bubble charts
- `series`: Array of `{ key, name, color? }` for Y-axis values
- `showMarkers`, `showLegend`, `isStacked`: Display options
- `xLabel`, `yLabel`: Axis labels

**Example:**
```typescript
{
  chartType: 'donut',
  title: 'Anomalies by Priority',
  data: [{ priority: 'CRITICAL', count: 150 }, { priority: 'HIGH', count: 89 }],
  xKey: 'priority',
  series: [{ key: 'count', name: 'Anomalies' }]
}
```

**UI Component**: `app/components/tool/Chart.vue`

**Supported Chart Types:**

| Type | Use Case | Example |
|------|----------|---------|
| `line` | Time series trends | Anomalies over time |
| `bar` | Category comparisons | Anomalies by priority |
| `area` | Cumulative metrics | Volume over time |
| `donut` | Proportions | Distribution by type |
| `bubble` | Multi-dimensional data | Risk vs. volume vs. severity |
| `gantt` | Timelines | Remediation schedules |

### 3. `kpiTool`

**Server Tool**: `shared/utils/tools/kpi.ts`

Displays KPI cards with metrics.

**Parameters:**
- `kpis`: Array of KPI objects (max 6 recommended)

**KPI Object:**
```typescript
{
  label: 'Critical Anomalies',           // Short metric name
  value: '150',                          // Formatted value (string or number)
  description: 'Active critical issues', // Context description
  icon: 'i-lucide-alert-triangle',       // Lucide icon name
  trend: 'up',                           // 'up' | 'down' | 'stable'
  trendValue: '+12%'                     // Optional trend percentage
}
```

**UI Component**: `app/components/tool/KPI.vue`

## Adding a New Tool

To add a new tool, implement both server-side and client-side layers:

### Step 1: Define Server Tool

Create a new file in `shared/utils/tools/`:

```typescript
// shared/utils/tools/myTool.ts
import { tool, type UIToolInvocation } from 'ai'
import { z } from 'zod'

export type MyUIToolInvocation = UIToolInvocation<typeof myTool>

export const myTool = tool({
  description: 'Brief description of what the tool does and when to use it.',
  
  inputSchema: z.object({
    param1: z.string().describe('Parameter description'),
    param2: z.number().optional().describe('Optional parameter')
  }),
  
  outputSchema: z.object({
    result: z.string()
  }),
  
  execute: async ({ param1, param2 }) => {
    return { result: 'processed data' }
  }
})
```

### Step 2: Export Tool

Add to `shared/utils/index.ts`:

```typescript
export * from './tools/myTool'
```

### Step 3: Register in Chat API

Update `server/api/chat.ts`:

```typescript
import { myTool } from '~/shared/utils'

const result = await streamText({
  model: ollama(model, { /* ... */ }),
  tools: {
    executeSqlTool,
    chartTool,
    kpiTool,
    myTool
  },
})
```

### Step 4: Update System Prompt

Add tool documentation to the system prompt in `server/api/chat.ts`:

```typescript
## myTool
- Purpose: What the tool does
- When to use: Specific use cases
- Required parameters: param1, param2
- Output: Description of result format
```

### Step 5: Create UI Component

Create `app/components/tool/MyTool.vue`:

```vue
<script setup lang="ts">
import type { MyUIToolInvocation } from '~/shared/utils'

const props = defineProps<{
  invocation: MyUIToolInvocation
  isStreaming?: boolean
}>()

const output = computed(() => props.invocation.output)
const state = computed(() => props.invocation.state)
</script>

<template>
  <div v-if="state !== 'output-available'" class="my-4 flex items-center gap-2 text-gray-500">
    <UIcon name="i-lucide-loader-2" class="animate-spin" />
    <span>Processing...</span>
  </div>

  <div v-else-if="output" class="my-4 p-4 rounded-lg border bg-gray-50 dark:bg-gray-900">
    <h3 class="font-semibold">Tool Result</h3>
    <p>{{ output.result }}</p>
  </div>
</template>
```

### Step 6: Register Component in Chat Page

Update `app/pages/chat.vue`:

```vue
<ToolMyTool
  v-else-if="block.type === 'tool' && block.part.type === 'tool-myTool'"
  :invocation="(block.part as any).toolInvocation || block.part"
  :is-streaming="block.isStreaming"
/>
```

## System Prompt Guidelines

The system prompt (`server/api/chat.ts`) controls AI behavior:

### Key Rules

1. **Schema Compliance**: Only use columns/tables defined in `init.sql`
2. **Default Table**: Use `generic_anomalies` for general analysis
3. **Language**: Respond in the user's language
4. **No SQL Visibility**: Never show raw SQL to users
5. **Explicit Requests**: Only use charts/KPIs when explicitly requested
6. **Proactive Suggestions**: Offer visualizations without auto-executing

### Critical Definitions

- **Critical Anomaly**: `priority_typ` IN ('CRITICAL', 'CRITIQUE', 'HIGH', 'HAUTE') OR `hotfix_flg = 1`
- **Open/Unresolved**: Check `error_fields.resolved_value_txt` for resolution status
- **Owner**: Use `functional_controls.responsible_login_id` as default owner

## Development

### Scripts

```bash
bun run dev        # Start development server
bun run build      # Build for production
bun run preview    # Preview production build
bun run lint       # Run ESLint
bun run typecheck  # Type check with vue-tsc
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |

### Tech Stack

- **Framework**: Nuxt 4 + Vue 3
- **UI**: Nuxt UI 4 (based on Tailwind CSS)
- **AI**: AI SDK + Ollama
- **Database**: MySQL via NuxtHub
- **Charts**: nuxt-charts
- **Utilities**: VueUse, Zod

## Deployment

### NuxtHub (Recommended)

```bash
cd chat
bun run build
npx hub deploy
```

### Manual Deployment

```bash
cd chat
bun run build
bun run preview
```

Set production environment variables for database connection.

## Troubleshooting

### Common Issues

1. **Ollama Connection Failed**
   - Ensure Ollama is running: `ollama serve`
   - Check model availability: `ollama pull llama3.2`

2. **Database Connection Error**
   - Verify MySQL is running: `docker ps`
   - Check `.env` has correct `DATABASE_URL`

3. **Empty Query Results**
   - Ensure data is loaded via Jupyter notebook
   - Verify tables exist: `SHOW TABLES;`

4. **Tool Not Called**
   - System prompt may need adjustment
   - Check `toolChoice: 'auto'` in streamText config

### Debug Mode

View AI reasoning by checking console logs:

```typescript
// In chat.ts, the tool execution logs
console.log('⚡ executing SQL:', query)
```

---

*Curious about the ETL logic or the prompt structure we used? I can share how we optimized the LLM's SQL accuracy.*
