---
slug: artlab
title: ArtLab - Personal HomeLab
type: Personal Project
description: A private R&D sandbox and high-availability infrastructure for deploying MLOps pipelines, managing large-scale data, and experimenting with cloud-native automation.
shortDescription: A professional-grade homelab for self-hosting, MLOps, and network security.
publishedAt: 2025-09-04
readingTime: 2
favorite: true
status: Active
tags:
  - Docker
  - Proxmox
  - HomeLab
  - Self-Hosted
  - Infrastructure
  - Networking
icon: i-ph-flask-duotone
---

[**ArtLab**](https://go.arthurdanjou.fr/status) is my personal homelab: a controlled environment for experimenting with DevOps, distributed systems, and private cloud architecture.

## Architectural Philosophy

The infrastructure follows a **Zero Trust** model. Access is restricted to a private mesh VPN using **Tailscale (WireGuard)**, removing the need for open ports. For select public endpoints, **Cloudflare Tunnels** provide a hardened entry point, keeping my public IP hidden while preserving end-to-end encryption from the edge to the origin.

## Service Stack

Services are grouped by functional domain to keep orchestration clean and scalable:

### Infrastructure & Virtualization
* **Proxmox VE**: Type-1 hypervisor managing LXC containers and VMs for strict resource isolation.
* **Docker & Portainer**: Container runtime and orchestration for rapid deployment.
* **Traefik**: Edge router and reverse proxy providing automatic HTTPS via Let's Encrypt.
* **Tailscale**: Secure networking layer for cross-device connectivity and remote management.

### Data & Storage
* **Garage**: S3-compatible distributed object storage for backups and static assets.
* **Immich**: High-performance photo management and AI-powered backup solution.
* **Jellyfin**: Media server for hardware-accelerated streaming.
* **Redis**: In-memory data structure store for caching and session management.

### Automation & Observability
* **Uptime Kuma**: Real-time status monitoring and incident alerting.
* **Beszel**: Lightweight agent-based resource monitoring for CPU/RAM/Disk metrics.
* **AdGuard Home**: Network-wide DNS sinkhole for ad-blocking and privacy.
* **Home Assistant MCP Server**: AI agent gateway exposing Home Assistant via the Model Context Protocol for LLM-driven home control.

### Media & Entertainment
* **Jellyfin**: Media server for hardware-accelerated streaming.
* **Music Assistant**: Self-hosted music library manager unifying streaming services and local files with multi-room audio sync.

### Home Intelligence
* **Home Assistant**: Centralized hub for IoT integration, 27+ automations, and voice control.
* **MQTT Broker**: Low-latency message bus for device-to-service communication.
* **Zigbee2MQTT**: Bridge for local Zigbee device control without cloud dependencies.
* **Matter Server**: WebSocket bridge for Matter-compatible smart home devices.
* **LLM Vision**: AI-powered security camera analysis with timeline-based event logging (integrated with Gemini).
* **Alarmo**: Advanced alarm system with presence-based arming/disarming.
* **Voice Pipeline**: Local voice assistant stack combining openWakeWord (wake word), Piper (TTS), and Speech-to-Phrase (STT) for privacy-preserving voice control.

## Hardware Specifications

| Component | Hardware | Role |
| :--- | :--- | :--- |
| **Main Host** | **Beelink EQR6** (AMD Ryzen) | Compute, Containers & VMs |
| **Storage** | **UGREEN NASync DXP4800 Plus** | 4-bay NAS, 16TB ZFS / Backups |
| **Networking** | **TP-Link 5-port Gigabit Switch** | Local Backbone |
| **Zigbee** | **SLZB-MR4 Coordinator** | Home Automation Mesh |

---

This homelab is a sandbox for DevOps experimentation, infrastructure reliability, and privacy-respecting digital autonomy.
