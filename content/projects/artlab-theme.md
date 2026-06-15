---
slug: artlab-theme
title: ArtLab Theme — Cross-Platform Design System
type: Personal Project
description: A cohesive, cross-platform theme ecosystem blending the clarity of Vitesse with the warm palettes of Catppuccin. Published on the VS Code Marketplace and ported to Home Assistant, Zed, and Ghostty.
shortDescription: A cross-platform color theme for VS Code, Home Assistant, Zed, and Ghostty.
publishedAt: 2026-01-01
readingTime: 2
status: Active
favorite: false
tags:
  - Theme
  - VS Code
  - Home Assistant
  - Zed
  - Ghostty
  - Design
icon: i-ph-palette-duotone
---

Design consistency across tools reduces cognitive load. **ArtLab Theme** is my answer to that principle — a unified color system that spans my entire development and home automation environment, from code editor to dashboard.

[**ArtLab Theme**](https://github.com/ArthurDanjou/theme-artlab) is available on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=arthurdanjou.theme-artlab) and as open-source on [GitHub](https://github.com/ArthurDanjou/theme-artlab) under the MIT license.

---

## Design Philosophy

The theme bridges two influences: the **clean readability of Vitesse** (by antfu) and the **cozy, well-tested palettes of Catppuccin**. The result is a theme that is neither too cold nor too warm — optimized for extended coding sessions without eye fatigue.

Both light and dark variants are available with **system auto-detection** support via VS Code's `autoDetectColorScheme`.

---

## Platform Coverage

### VS Code

Published on the Visual Studio Marketplace with full token coverage for TypeScript, Python, Markdown, JSON, YAML, and all major web languages. The theme ships with Monaspace (GitHub's custom font) as the recommended typeface, paired with Catppuccin file icons and Carbon product icons.

### Home Assistant

A dedicated theme port (`artlab.yaml`) integrates with Home Assistant's theming engine. Used across all three ArtHome dashboards — Home, Map, and Kiosk — ensuring a seamless visual transition between code and home control interfaces.

### Zed

A native Zed port (`zed/artlab.json`) for the editor I use daily for scripting and remote development. Installed by copying to `~/.config/zed/themes/`.

### Ghostty

Terminal themes (`ghostty/artlab-dark` and `ghostty/artlab-light`) maintain the same color palette in the shell, providing a consistent visual experience from editor to terminal.

---

## Technical Implementation

The theme is defined as a **VS Code extension** (yo code + TypeScript) with separate color definitions for light and dark variants. Each platform port maps the core semantic colors — base, surface, overlay, muted, text, and accent — to the platform's own theming tokens, ensuring the same visual hierarchy regardless of the target environment.

```jsonc
// Example: VS Code settings for auto-detection
{
  "window.autoDetectColorScheme": true,
  "workbench.preferredLightColorTheme": "ArtLab Light",
  "workbench.preferredDarkColorTheme": "ArtLab Dark",
}
```

The Home Assistant port adapts the Bubble card theme structure to ArtLab's palette, maintaining compatibility with custom cards like Bubble Card and Mushroom while preserving the overall color identity.

---

*ArtLab Theme demonstrates that visual consistency across a development ecosystem is achievable with a well-defined palette and per-platform adapters — no compromise on either aesthetics or readability.*
