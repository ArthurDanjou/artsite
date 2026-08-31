---
slug: artlab
title: ArtLab - Personal HomeLab
type: Personal Project
description: A multi-host homelab orchestrated by Dockhand and GitOps-deployed, running everything from media servers to a self-hosted S3 backend behind a single SSO.
shortDescription: A professional-grade homelab for self-hosting, MLOps, and network security.
publishedAt: 2025-09-04
readingTime: 3
favorite: true
status: Active
tags:
  - Self-Hosted
  - Docker
  - Infrastructure
icon: i-ph-flask-duotone
---

[**ArtLab**](https://go.arthurdanjou.fr/status) is my personal homelab: a controlled environment for experimenting with DevOps, distributed systems, and private cloud architecture.

## Global Architecture

ArtLab is a multi-host homelab orchestrated by **Dockhand**, a Docker management UI running on the central server. Three remote hosts are attached to it through **Hawser** agents in Edge mode, using outbound-only WebSocket connections — zero inbound ports, wherever the host lives.

Every stack is versioned in a public GitHub repository ([make-my-server](https://go.arthurdanjou.fr/github)) and deployed through Dockhand's Git integration, with webhooks and auto-sync. Secrets live encrypted inside Dockhand, never in git.

## Network

A **Tailscale** mesh connects every machine: each host gets a stable `100.x` IP, traffic between hosts is WireGuard-encrypted and direct. Traefik reaches backends through their Tailscale IPs, regardless of the network they sit on.

**AdGuard Home** acts as the DNS for the whole tailnet (global nameserver) and for the LAN (through the router's DHCP). On the public side, everything goes through **Traefik v3**: TLS is terminated at the proxy with Let's Encrypt certificates issued via Cloudflare DNS challenge — no ports to open for ACME.

## Central Server

The central server is the entry point of the infrastructure:

- **Traefik v3** — reverse proxy with JSON access logs, Prometheus metrics, OTLP tracing, and a dashboard protected by SSO.
- **Authentik** — SSO (OIDC + forwardAuth middleware) in front of every admin interface: Proxmox, PBS, NAS, AdGuard, Garage, Zigbee2MQTT, Traefik Manager, and download clients.
- **Apps** — Karakeep (bookmarks), Mealie (recipes), Stirling-PDF, Speedtest-Tracker, Beszel (monitoring), Uptime-Kuma, Vaultwarden, Dawarich (geodata), AirTrail.
- **Traefik Manager** — a dedicated UI to edit static and dynamic Traefik config, with automatic backups on every save and restart via poison-pill.

## Remote Hosts

Three dedicated hosts, each focused on one functional domain:

- **Photos** — Immich (library on an NFS mount), Immich Power-Tools, Immich Kiosk.
- **Media** — media server with GPU transcoding, automated download management, subtitle handling and on-demand requesting, all outbound traffic routed through a VPN, plus a daily antivirus scan with Discord alerts.
- **Storage** — Garage, a self-hosted S3-compatible backend: WebUI behind SSO, public S3 endpoint exposed through Traefik for buckets.

## Home Automation

Each home automation service runs on its own dedicated host: **Mosquitto** (MQTT broker: TCP 1883 for devices, websockets through Traefik for remote access), **Zigbee2MQTT** with a PoE Zigbee dongle, **Frigate** (AI-powered NVR), **Home Assistant**, **AdGuard Home**, and a monitoring host collecting OTLP traces.

## Backups & Security

**Infrastructure backups** — Proxmox VE on a mini-PC (beelink00) runs the LXC/VMs, backed up by **Proxmox Backup Server**. The UGREEN NAS handles bulk storage.

**App backups** — Dockhand's restic module backs up volumes and stack files to S3/REST destinations, with automatic retention.

**Security** — not a single secret in git (variables are injected by Dockhand with a fail-fast pattern in the compose files), Authentik SSO across the entire admin surface, TLS everywhere with DNS challenge, backends reachable exclusively through the tailnet, and the Hawser agent is outbound-only.

## GitOps

Everything is declarative: stacks are defined in the `make-my-server` repository, synced to Dockhand, and deployed automatically. Config drift is impossible by design — if it's not in git, it doesn't exist.

---

This homelab is a sandbox for DevOps experimentation, infrastructure reliability, and privacy-respecting digital autonomy.
