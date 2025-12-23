---
title: Research Lab & Technical Setup
description: A curated list of the hardware, software, and infrastructure that powers my research and engineering workflows.
---

# The Lab

Research requires a reliable environment. This page documents the hardware infrastructure and software stack I rely on to conduct :hover-text{text="mathematical modeling" hover="M280 Studies"}, deploy :hover-text{text="AI architectures" hover="PyTorch & TensorFlow"}, and maintain my :hover-text{text="digital sovereignty" hover="Self-hosted Homelab"}.

---

## 🖥️ Workstations & Compute

My setup is split between mobile efficiency for academic writing and a fixed station for heavier computation.

::div{class="grid grid-cols-1 md:grid-cols-2 gap-6"}

::card{title="Daily Driver" icon="i-ph-laptop-duotone"}
**Apple MacBook Pro 13"**
* **Specs:** :hover-text{text="Apple M1 Chip" hover="ARM Architecture"}, 16GB RAM.
* **OS:** macOS Sonoma.
* **Usage:** Academic writing (LaTeX), lightweight coding, and remote server management.
::

::card{title="Compute & CUDA Station" icon="i-ph-desktop-tower-duotone"}
**Custom Build PC**
* **Specs:** Intel Core i5-10400F, 16GB DDR4.
* **GPU:** :hover-text{text="NVIDIA RTX 2060" hover="CUDA Capable for small model training"}.
* **OS:** Windows 11 (WSL2).
* **Usage:** Local Deep Learning training, gaming, and heavy compilation tasks.
::

::

### Peripherals
I rely on a specific set of tools to maintain flow during deep work sessions.

* **Audio:** **Apple AirPods Pro** — Essential for deep work sessions and noise cancellation.
* **Input:** :hover-text{text="SteelSeries Apex 9 TKL" hover="OptiPoint Switches"} (Keyboard) & **Logitech G203** (Mouse).
* **Tablets:** **iPad Air** — Dedicated to reading papers and handwriting mathematical proofs.
* **Stylus:** **Apple Pencil** — Essential for annotations and mathematical notation.

---

## 🛠️ Development Ecosystem

I prioritize tools that offer **AI-integration** and **strong type-checking**.

::div{class="grid grid-cols-1 md:grid-cols-2 gap-6"}

::card{title="IDEs & Editors" icon="i-ph-code-duotone"}
* :prose-icon[VS Code]{color="blue" icon="i-logos:visual-studio-code"} — For general-purpose scripting and remote SSH development.
* :prose-icon[JetBrains]{color="purple" icon="i-logos:jetbrains"} — *PyCharm* & *DataGrip* are unrivaled for complex refactoring and database management.
* **Theme:** Catppuccin Macchiato.
* **Font:** JetBrains Mono.
::

::card{title="Terminal & System" icon="i-ph-terminal-window-duotone"}
* :prose-icon[Warp]{color="black" icon="i-simple-icons-warp"} — A Rust-based terminal with AI command suggestion and block-based output.
* :prose-icon[Raycast]{color="red" icon="i-simple-icons-raycast"} — Replaces Spotlight. I use it for script commands, window management, and quick calculations.
* :prose-icon[Firefox]{color="orange" icon="i-logos:firefox"} — Chosen for its privacy features and robust DevTools.
::

::

---

## 🏠 Infrastructure & Homelab

To bridge the gap between theory and MLOps, I maintain a **self-hosted cluster**. This allows me to experiment with distributed systems, data pipelines, and network security in a controlled environment.

### Hardware Infrastructure

::div{class="grid grid-cols-1 md:grid-cols-3 gap-4"}

::card{title="Compute Node" icon="i-ph-cpu-duotone"}
**Beelink EQR6** *:hover-text{text="AMD Ryzen" hover="Proxmox Host"}*

Runs my containerized workloads and Docker services.
::

::card{title="Storage Node" icon="i-ph-hard-drives-duotone"}
**UGREEN NASync DXP4800** *:hover-text{text="16TB Raw Storage" hover="RAID Configuration"}*

Centralized Data Lake for datasets and backups.
::

::card{title="Network" icon="i-ph-globe-duotone"}
**TP-Link Switch & Tailscale** *:hover-text{text="Mesh VPN" hover="Secure Remote Access"}*

Ensures fast, stable local communication.
::

::

### Service Stack
I run these services using **Docker** and **Portainer**, strictly behind a **Traefik** reverse proxy.

::div{class="grid grid-cols-1 gap-4"}
* :prose-icon[DevOps & Infra]{icon="i-ph-washing-machine-duotone"} — Traefik, Portainer, Gitea.
* :prose-icon[Databases]{icon="i-ph-database-duotone"} — PostgreSQL, Redis.
* :prose-icon[Storage & Media]{icon="i-ph-hard-drives-duotone"} — Minio (S3), Immich.
* :prose-icon[Security]{icon="i-ph-shield-check-duotone"} — Cloudflare Tunnels, AdGuard Home, Vaultwarden.
* :prose-icon[Observability]{icon="i-ph-activity-duotone"} — Uptime Kuma, Beszel.
* :prose-icon[Utilities]{icon="i-ph-wrench-duotone"} — BentoPDF, Palmr, Home Assistant.
::

> *This list is constantly updated as I experiment with new tools and equipment.*