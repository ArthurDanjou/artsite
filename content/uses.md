---
title: Research Lab & Technical Setup
description: A curated list of the hardware, software, and infrastructure that powers my research and engineering workflows.
sitemap:
  loc: /uses
---

# The Lab

What I use day to day: the machines I write and train on, the software I run them with, and the :hover-text{hover="Self-hosted Homelab" text="homelab"} that keeps my :hover-text{hover="M280 Studies" text="mathematical modeling"} and :hover-text{hover="PyTorch & TensorFlow" text="AI work"} on my own hardware, for better data sovereignty.

---

## Workstations & Compute

Two machines: a MacBook for writing and remote work, a desktop for training and compilation.

### Daily Driver

**Apple MacBook Pro 13"**

- **Specs:** :hover-text{hover="ARM Architecture" text="Apple M1 Chip"}, 16GB RAM.
- **OS:** macOS Sonoma.
- **Usage:** Academic writing (LaTeX), light coding, remote server management.

### Compute & CUDA Station

**Custom Build PC**

- **Specs:** Intel Core i5-10400F, 16GB DDR4.
- **GPU:** :hover-text{hover="CUDA Capable for small model training" text="NVIDIA RTX 2060"}.
- **OS:** Windows 11 (WSL2).
- **Usage:** Local deep learning training, gaming, heavy compilation tasks.

### Peripherals

- Apple AirPods Pro, mostly for noise cancellation.
- :hover-text{hover="OptiPoint Switches" text="SteelSeries Apex 9 TKL"} (keyboard) and Logitech G203 (mouse).
- iPad Air for reading papers and handwriting proofs, with the Apple Pencil for annotations.

---

## Development Ecosystem

I pick tools with AI integration and strong type-checking. My whole setup (dotfiles, MCP servers, agent skills, slash commands) is generated from a single source of truth and synced across every AI provider; see [AI Sync Dotfiles](/projects/ai-sync-dotfiles) for the full story.

### IDEs & Editors

- :prose-icon[Zed]{color="blue" icon="i-devicon-zed"}, for general-purpose scripting and remote SSH development.
- :prose-icon[OpenCode AI]{color="purple" icon="i-material-symbols-deployed-code"}, an open-source AI coding agent with multi-provider support, dual build/plan agents, and native LSP integration.
- :prose-icon[Orca]{color="neutral" icon="i-ph-browser-duotone"}, an open-source agent development environment to run Claude Code, Codex and OpenCode side by side, each in its own git worktree.
- **Theme:** :prose-icon[ArtLab Theme]{color="indigo" icon="i-ph-palette-duotone"}, a cross-platform theme blending Vitesse clarity with Catppuccin palettes, available for VS Code, Home Assistant, Zed, and Ghostty. See my [ArtLab Theme](/projects/artlab-theme) project.
- **Font:** GitHub Monaspace Neon (primary, ligatures enabled) and JetBrains Mono.

```python [main.py]
def main():
    print("Hello, Research Lab!")
```

### Terminal & System

- :prose-icon[Ghostty]{color="gray" icon="i-ph-ghost-duotone"}, a fast, GPU-accelerated terminal emulator.
- :prose-icon[Zsh]{color="green" icon="i-simple-icons-zsh"}, my default shell.
- :prose-icon[Starship]{color="purple" icon="i-simple-icons-starship"}, a minimal and highly customizable prompt.
- :prose-icon[Tinycast]{color="red" icon="i-ph-command-duotone"}, an open-source, fully native macOS launcher that replaces Spotlight. I use it for custom commands, window management, and quick calculations.
- :prose-icon[Firefox]{color="orange" icon="i-logos-firefox"}, chosen for its privacy features and good DevTools.
- :prose-icon[Brave]{color="blue" icon="i-logos-brave"}, a privacy-focused browser with built-in ad blocking and tracking protection.

---

## Infrastructure & Homelab

Everything runs on one Beelink mini-PC in my apartment: a dozen services, no open ports. Small on purpose. It is a playground where breaking something costs nothing, and the same patterns would carry to a bigger cluster.

### Hardware Infrastructure

::div{.grid.grid-cols-1.md:grid-cols-3.gap-x-8.gap-y-6}
  :::div{.lab-node}
  #### Compute Node

  **Beelink EQR6** :hover-text{hover="Proxmox Host" text="AMD Ryzen"}

  One Proxmox host, no clustering yet: a Home Assistant OS virtual machine for ArtHome, plus 10 LXC containers for everything else.
  :::

  :::div{.lab-node}
  #### Storage Node

  **UGREEN NASync DXP4800** :hover-text{hover="RAID Configuration" text="16TB Raw Storage"}

  Where everything ends up: ML datasets, Immich photos, machine images, nightly backups of every container.
  :::

  :::div{.lab-node}
  #### Network

  **Freebox Ultra & Tailscale** :hover-text{hover="Secure Remote Access" text="Mesh VPN"}

  Freebox routes today; a segmented UniFi design (VLANs, 19" rack) is planned and tracked in my [ArtLab project](/projects/artlab).
  :::
::

### Service Stack

Every service runs in an LXC container on Proxmox, reached through a Cloudflare Tunnel (no port forwarding) and administered from anywhere over a Tailscale mesh.

::div{.columns-1.sm:columns-2.gap-x-10.[&_li]:break-inside-avoid}
- :prose-icon[DevOps & Infra]{icon="i-ph-washing-machine-duotone"}: Traefik, Portainer, Gitea.
- :prose-icon[Communication]{icon="i-simple-icons-thunderbird"}: Thunderbird, Signal, WhatsApp.
- :prose-icon[Music & Audio]{icon="i-ph-music-notes-duotone"}: Music Assistant, Jellyfin.
- :prose-icon[Knowledge & Notes]{icon="i-ph-notebook-duotone"}: Obsidian, Obsidian Sync, Zotero, Mealie.
- :prose-icon[Databases]{icon="i-ph-database-duotone"}: PostgreSQL, Redis.
- :prose-icon[Storage & Media]{icon="i-ph-hard-drives-duotone"}: Garage (S3), Immich (3164 photos, 622 videos).
- :prose-icon[Home Intelligence]{icon="i-ph-lightbulb-duotone"}: Home Assistant (29 automations, 1933 entities, 51 HACS repos, July 2026 snapshot), Zigbee2MQTT, Matter Server, MQTT, Alarmo.
- :prose-icon[AI & Voice]{icon="i-ph-magic-wand-duotone"}: LLM Vision (Qwen, DeepSeek, Mistral), openWakeWord, Piper TTS, Speech-to-Phrase.
- :prose-icon[Security]{icon="i-ph-shield-check-duotone"}: Cloudflare Tunnels, AdGuard Home, Vaultwarden.
- :prose-icon[Observability]{icon="i-ph-pulse-duotone"}: Uptime Kuma, Beszel, Speedtest Tracker.
- :prose-icon[Utilities]{icon="i-ph-wrench-duotone"}: BentoPDF, HA MCP Server.
::

---

## AI & Model Strategy

All AI inference in ArtHome runs on open-weight models: no proprietary APIs, no data leaving the homelab, no per-token costs.

### Vision Analysis

LLM Vision powers security camera analysis with timeline-based event logging. Every frame is processed locally through open-weight vision models for object detection, person recognition, and activity classification, and video feeds never leave the homelab.

### Assistant & Automation

The conversation agent and automation logic layer run on a mix of open-weight models selected per task: Qwen and DeepSeek for general reasoning and instruction following, Kimi and GLM for long-context understanding (research paper analysis, conversation history), and Mistral for latency-sensitive tasks like quick classification and intent parsing.

### Why Open Weights

I run open weights for practical reasons:

- **Privacy**: data never leaves the homelab. Camera feeds, daily schedules, and voice commands stay on local hardware. No API calls means no third-party data exposure.
- **Autonomy**: no vendor lock-in, no deprecation risk, no API pricing changes. Models can be swapped, fine-tuned, or quantized without permission.
- **Reproducibility**: the same model can be run today and in five years. Closed APIs change versions, behaviors, and availability unilaterally.
- **Cost**: inference on local GPUs eliminates per-token costs. For a home automation system that processes thousands of events daily, this makes AI economically feasible at home scale.

> *This list is constantly updated as I experiment with new tools and equipment.*
