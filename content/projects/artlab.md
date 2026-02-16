---
slug: artlab
title: ArtLab - Personal HomeLab
type: Personal Project
description: A personal homelab environment where I deploy, test, and maintain self-hosted services with privacy-focused networking through VPN and Cloudflare Tunnels.
shortDescription: A personal homelab environment for self-hosting and automation.
publishedAt: 2025-09-04
readingTime: 1
favorite: true
status: Active
tags:
  - Docker
  - Proxmox
  - HomeLab
  - Self-Hosted
  - Infrastructure
icon: i-ph-flask-duotone
---

## Header

- **Projet :** ArtLab - Personal HomeLab
- **Date / période estimée :** 2025-09-04
- **Tags / technos :** Docker, Proxmox, HomeLab, Self-Hosted, Infrastructure

## Context & Goal

ArtLab a été lancé comme environnement personnel pour expérimenter l'auto-hébergement, sécuriser les services domestiques et consolider un socle DevOps concret.

## Methodology/Stack

Infrastructure HomeLab sur Proxmox et Docker, exposition contrôlée via Tailscale/Cloudflare Tunnel, et supervision des services (Traefik, Uptime Kuma, Homepage).

## Key Results

Un environnement self-hosted stable est opérationnel, avec stockage, média, monitoring et automatisation centralisés dans un même labo personnel.

## Status & Evolution

**État actuel : Active.** Poursuite de l'extension des services et de la fiabilisation de l'infrastructure (sécurité, observabilité, sauvegardes).


## Notes additionnelles

[**ArtLab**](https://go.arthurdanjou.fr/status) is my personal homelab, where I experiment with self-hosting and automation.

My homelab is a self-hosted environment where I deploy, test, and maintain personal services. Everything is securely exposed **only through a private VPN** using [Tailscale](https://tailscale.com/), ensuring encrypted, access-controlled connections across all devices. For selected services, I also use **Cloudflare Tunnels** to enable secure external access without opening ports or exposing my public IP.

## 🛠️ Running Services

- **MinIO**: S3-compatible object storage for static files and backups.
- **Immich**: Self-hosted photo management platform — a private alternative to Google Photos.
- **Jellyfin**: Media server for streaming movies, shows, and music.
- **Portainer & Docker**: Container orchestration and service management.
- **Traefik**: Reverse proxy and automatic HTTPS with Let's Encrypt.
- **Homepage**: A sleek dashboard to access and monitor all services.
- **Proxmox**: Virtualization platform used to manage VMs and containers.
- **Uptime Kuma**: Self-hosted uptime monitoring.
- **Home Assistant**: Smart home automation and device integration.
- **AdGuard Home**: Network-wide ad and tracker blocking via DNS.
- **Beszel**: Self-hosted, lightweight alternative to Notion for notes and knowledge management.
- **Palmr**: Personal logging and journaling tool.

## 🖥️ Hardware Specifications

- **Beelink EQR6**: AMD Ryzen mini PC, main server host.
- **TP-Link 5-port Switch**: Network connectivity for all devices.
- **UGREEN NASync DXP4800 Plus**: 4-bay NAS, currently populated with 2 x 8TB drives for storage and backups.

This homelab is a sandbox for DevOps experimentation, infrastructure reliability, and privacy-respecting digital autonomy.
