---
slug: dataviz-tuberculose
title: Monitoring & Segmentation of Tuberculosis Cases
type: Academic Project
description: An interactive data visualization project built with R, R Shiny, and ggplot2 for creating dynamic, explorable visualizations.
shortDescription: An interactive data visualization project using R and R Shiny.
publishedAt: 2026-01-05
readingTime: 1
status: Completed
tags:
  - R
  - R Shiny
  - Data Visualization
  - ggplot2
icon: i-ph-chart-bar-duotone
---

Interactive Shiny dashboard for WHO tuberculosis data analysis and clustering.

- **GitHub Repository:** [Tuberculose-Visualisation](https://github.com/ArthurDanjou/Tuberculose-Visualisation)
- **Live Application:** [Tuberculose Data Visualization](https://go.arthurdanjou.fr/datavis-app)

## Overview

This project provides an interactive visualization tool for monitoring and segmenting global tuberculosis data from the World Health Organization (WHO). It applies multivariate analysis to reveal operational typologies of global health risks.

**Author:** Arthur Danjou  
**Program:** M2 ISF - Dauphine PSL  
**Course:** Data Visualisation (2025-2026)

## Features

- Interactive world map with cluster visualization
- K-means clustering for country segmentation (Low/Moderate/Critical Impact)
- Time series analysis with year selector (animated)
- Region filtering by WHO regions
- Key Performance Indicators (KPIs) dashboard
- Raw data exploration with data tables

## Project Structure

```
├── app.R                    # Shiny application
├── NoticeTechnique.Rmd      # Technical report (R Markdown)
├── NoticeTechnique.pdf      # Compiled technical report
├── data/
│   ├── TB_analysis_ready.RData          # Processed data with clusters
│   └── TB_burden_countries_2025-12-09.csv # Raw WHO data
└── renv/                    # R package management
```

## Requirements

- R (>= 4.0.0)
- R packages (see `renv.lock`):
  - shiny
  - shinydashboard
  - leaflet
  - plotly
  - dplyr
  - sf
  - RColorBrewer
  - DT
  - rnaturalearth

## Installation

1. Clone this repository
2. Open R/RStudio in the project directory
3. Restore packages with `renv::restore()`
4. Run the application:
   ```r
   shiny::runApp("app.R")
   ```

## Detailed Report

<iframe src="/projects/datavis.pdf" width="100%" height="1000px">
</iframe>

## License

© 2026 Arthur Danjou. All rights reserved.

## Resources

You can find the code here: [Data Visualisation Code](https://go.arthurdanjou.fr/datavis-code)

And the online application here: [Data Visualisation App](https://go.arthurdanjou.fr/datavis-app)
