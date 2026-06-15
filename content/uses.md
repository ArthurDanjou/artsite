---
title: Research Lab & Technical Setup
description: A curated list of the hardware, software, and infrastructure that powers my research and engineering workflows.
sitemap:
  loc: /uses
---

# The Lab

Research requires a reliable environment. This page documents the hardware infrastructure and software stack I rely on to conduct :hover-text{hover="M280 Studies" text="mathematical modeling"}, deploy :hover-text{hover="PyTorch & TensorFlow" text="AI architectures"}, and maintain my :hover-text{hover="Self-hosted Homelab" text="digital sovereignty"}.

---

## Workstations & Compute

My setup is split between mobile efficiency for academic writing and a fixed station for heavier computation.

::div{.grid.grid-cols-1.md:grid-cols-2.gap-6}
  :::card{icon="i-ph-laptop-duotone" title="Daily Driver"}
  **Apple MacBook Pro 13"**

  - **Specs:** :hover-text{hover="ARM Architecture" text="Apple M1 Chip"}, 16GB RAM.
  - **OS:** macOS Sonoma.
  - **Usage:** Academic writing (LaTeX), lightweight coding, and remote server management.
  :::

  :::card{icon="i-ph-desktop-tower-duotone" title="Compute & CUDA Station"}
  **Custom Build PC**

  - **Specs:** Intel Core i5-10400F, 16GB DDR4.
  - **GPU:** :hover-text{hover="CUDA Capable for small model training" text="NVIDIA RTX 2060"}.
  - **OS:** Windows 11 (WSL2).
  - **Usage:** Local Deep Learning training, gaming, and heavy compilation tasks.
  :::
::

### Peripherals

I rely on a specific set of tools to maintain flow during deep work sessions.

- **Audio:** **Apple AirPods Pro** — Essential for deep work sessions and noise cancellation.
- **Input:** :hover-text{hover="OptiPoint Switches" text="SteelSeries Apex 9 TKL"} (Keyboard) & **Logitech G203** (Mouse).
- **Tablets:** **iPad Air** — Dedicated to reading papers and handwriting mathematical proofs.
- **Stylus:** **Apple Pencil** — Essential for annotations and mathematical notation.

---

## Development Ecosystem

I prioritize tools that offer **AI-integration** and **strong type-checking**.

::div{.grid.grid-cols-1.md:grid-cols-2.gap-6}
  :::card{icon="i-ph-code-duotone" title="IDEs & Editors"}
  - :prose-icon[Zed]{color="blue" icon="i-devicon-zed"} — For general-purpose scripting and remote SSH development.
  - :prose-icon[OpenCode AI]{color="purple" icon="i-material-symbols-deployed-code"} — An open-source AI coding agent with multi-provider support, dual build/plan agents, and native LSP integration.
  - **Theme:** :prose-icon[ArtLab]{color="indigo" icon="i-ph-palette-duotone"} — A custom VS Code theme with optimized contrast for extended coding sessions, supporting both light and dark modes.
  - **Font:** GitHub Monaspace Neon (primary, ligatures enabled) & JetBrains Mono.

  :::card{icon="i-ph-terminal-window-duotone" title="Terminal & System"}
  - :prose-icon[Ghostty]{color="gray" icon="i-ph-ghost-duotone"} — A fast, native, and GPU-accelerated terminal emulator.
  - :prose-icon[Zsh]{color="green" icon="i-simple-icons-zsh"} — My default shell, optimized for speed and interactivity.
  - :prose-icon[Starship]{color="purple" icon="i-simple-icons-starship"} — The minimal, blazing-fast, and infinitely customizable prompt.
  - :prose-icon[Raycast]{color="red" icon="i-simple-icons-raycast"} — Replaces Spotlight. I use it for script commands, window management, and quick calculations.
  - :prose-icon[Firefox]{color="orange" icon="i-logos:firefox"} — Chosen for its privacy features and robust DevTools.
  - :prose-icon[Brave]{color="blue" icon="i-logos:brave"} — A privacy-focused browser with built-in ad blocking and tracking protection.
  :::
::

---

## Infrastructure & Homelab

To bridge the gap between theory and MLOps, I maintain a **self-hosted cluster**. This allows me to experiment with distributed systems, data pipelines, and network security in a controlled environment.

### Hardware Infrastructure

::div{.grid.grid-cols-1.md:grid-cols-3.gap-4}
  :::card{icon="i-ph-cpu-duotone" title="Compute Node"}
  **Beelink EQR6** :hover-text{hover="Proxmox Host" text="AMD Ryzen"}

  Runs my containerized workloads and Docker services.
  :::

  :::card{icon="i-ph-hard-drives-duotone" title="Storage Node"}
  **UGREEN NASync DXP4800** :hover-text{hover="RAID Configuration" text="16TB Raw Storage"}

  Centralized Data Lake for datasets and backups.
  :::

  :::card{icon="i-ph-globe-duotone" title="Network"}
  **TP-Link Switch & Tailscale** :hover-text{hover="Secure Remote Access" text="Mesh VPN"}

  Ensures fast, stable local communication.
  :::
::

### Service Stack

I run these services using **Docker** and **Portainer**, strictly behind a **Traefik** reverse proxy.

::div{.grid.grid-cols-1.gap-4}
- :prose-icon[DevOps & Infra]{icon="i-ph-washing-machine-duotone"} — Traefik, Portainer, Gitea.
- :prose-icon[Databases]{icon="i-ph-database-duotone"} — PostgreSQL, Redis.
- :prose-icon[Storage & Media]{icon="i-ph-hard-drives-duotone"} — Minio (S3), Immich.
- :prose-icon[Security]{icon="i-ph-shield-check-duotone"} — Cloudflare Tunnels, AdGuard Home, Vaultwarden.
- :prose-icon[Observability]{icon="i-ph-activity-duotone"} — Uptime Kuma, Beszel.
- :prose-icon[Utilities]{icon="i-ph-wrench-duotone"} — BentoPDF, Palmr, Home Assistant.
::

> *This list is constantly updated as I experiment with new tools and equipment.*
