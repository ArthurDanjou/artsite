---
slug: arthome-automations
title: ArtHome — Home Intelligence Layer
type: Personal Project
description: A fully self-hosted Home Assistant instance orchestrating 27+ automations across lighting, security, media, climate, and daily productivity — backed by 1500+ sensors, 12 custom scenes, and 20 dashboard views.
shortDescription: A comprehensive Home Assistant deployment with 27 automations, 12 scenes, and 20 dashboard views.
publishedAt: 2026-03-15
readingTime: 5
status: Active
favorite: true
tags:
  - Home Assistant
  - Zigbee2MQTT
  - Home Automation
  - Dashboards
  - Self-Hosted
  - Matter
  - Voice Assistant
icon: i-ph-lightbulb-duotone
---

**ArtHome** is the brain of my living space — a fully self-hosted **Home Assistant** instance running on my **[ArtLab](/projects/artlab)** homelab. It processes data from **1500+ entities** across **33 domains**, orchestrates **27 automations**, and presents everything through **3 dashboards** spanning **20 views** and **300+ cards**.

---

## Architecture

ArtHome runs as a Home Assistant OS instance on the Beelink EQR6, exposed through a **Cloudflare Tunnel** for secure remote access. All local traffic stays inside a **Tailscale mesh VPN** — no open ports, no exposed attack surface.

### Add-on Ecosystem

The instance runs **11 add-ons** that extend core capabilities:

| Add-on | Role |
| :--- | :--- |
| **Zigbee2MQTT** | Universal Zigbee bridge — controls all Hue, IKEA, and Aqara devices locally |
| **Matter Server** | WebSocket bridge for Matter-compatible accessories |
| **Music Assistant** | Multi-room audio server unifying local files with streaming services |
| **Tailscale** | Zero-config VPN for secure remote management |
| **Cloudflared** | Cloudflare Tunnel for HTTPS access without port forwarding |
| **openWakeWord** | Privacy-preserving wake word detection (local, no cloud) |
| **Piper** | Neural text-to-speech engine running on-device |
| **Speech-to-Phrase** | Fast local speech-to-text pipeline |
| **Beszel Agent** | Lightweight resource monitoring agent |
| **HA MCP Server** | AI agent gateway exposing Home Assistant via the Model Context Protocol |
| **Advanced SSH & Web Terminal** | Browser-based terminal access for maintenance |

### HACS & Custom Integrations

Beyond built-in integrations, **52 HACS repositories** extend the platform. Notable ones include:

**Integrations** — **Alarmo** (advanced alarm panel with presence-based arming), **LLM Vision** (AI-powered camera analysis with Gemini), **Better Thermostat** (adaptive TRV control with external temperature sensors), **Bubble Card Tools** (backend for the Bubble Card UI system), **Beszel API** (homelab metric ingestion).

**User Interface** — **Bubble Card** (minimalist card collection with pop-up touch interactions), **button-card** (swiss-army-knife custom card), **auto-entities** (dynamic entity list auto-population), **Big Slider Card** (expanded light intensity sliders), **Alarmo Card** (security panel frontend).

**Themes** — **[ArtLab Theme](/projects/artlab-theme)** (cross-platform theme blending Vitesse clarity with Catppuccin palettes, used across all ArtHome dashboards).

---

## Dashboards

ArtHome ships with **3 dashboards**, each serving a distinct purpose.

### Home Dashboard

The primary control center with **20 views** and **300+ Lovelace cards** organized into three tiers:

**Overview & Monitoring** — The landing **Home** view aggregates everything on one screen: presence (who is home), weather forecast, next calendar events, active media, alarm state, energy consumption, and quick-access lights toggles. A daylight calendar card shows sunrise/sunset progression.

**Security** — The **Sécurité** view centers on the Alarmo card with arm/disarm controls, an LLM Vision camera feed with AI analysis timeline, and a logbook of recent events.

**Lighting** — The **Lumières** view groups lights by room, with scene selectors (living room: 6 scenes, bedroom: 4 scenes) and individual brightness/color controls via Mushroom and Tile cards.

**Environment** — Dedicated views for **Weather** (Météo-France forecasts, precipitation radar, wind), **Climate** (thermostat status, indoor temperature trends), **Batteries** (low-battery device monitoring), **Energy** (power consumption tracking).

**Media & Comfort** — **Média** aggregates media players (Apple TV, Sonos, Panasonic TV, PS5) with conditional cards that show controls only for active devices. Separate views for **Ventilation** (fan control), **Volets** (shutter positions), **Aspirateur** (vacuum robot).

**Room-by-Room** — Individual views for **Salon**, **Chambre**, **Cuisine**, **Couloir**, **Salle de Bain**, **Jardin**, **Garage**, and **Entrée** — each showing the room's lights, sensors, and relevant controls on tile cards.

**Infrastructure** — The **Homelab** view is the largest, with **158 cards** monitoring server health: CPU/RAM/Disk gauges across all nodes (Beelink, NAS, Docker containers), network status, service uptime, and storage pool utilization.

### Map Dashboard

A full-screen **device tracking map** showing real-time locations of household members and mobile devices. Uses Catppuccin theme.

### Kiosk Dashboard

An **Immich photo frame** displayed on a wall-mounted tablet. Shows a curated album with the UI hidden, cycling through family photos as a living digital canvas.

---

## Automation Layer

### Lighting & Scenes

A **Hue Dimmer Switch** paired via Zigbee2MQTT controls the living room through multi-press actions — short press steps brightness, long press maxes out, down-press fades off with a 2-second transition, and the off-button cycles through 6 scenes (Classique, PSG, Atlético, Football, Cinéma, Deep Coding). The bedroom has 4 scenes (Classique, Red, Blue, Fire).

When the **Apple TV** starts playing, Home Assistant detects the `playing` state and transitions the living room to the Cinema scene with a 5-second fade. Pausing restores Classic; stopping resets both the scene and selector.

A **Sleep Mode** toggle per room overrides active scenes by forcing all lights to deep red at 10% brightness with a 5-minute crossfade. Any light turned on during sleep mode inherits the constraint automatically.

### Presence & Security

When both residents leave, all lights dim off over 2 seconds. If nobody is home and the alarm is disarmed, a departure reminder notification is sent. Arriving home while the alarm is armed triggers a security dashboard shortcut.

If nobody has been home for **24 hours** and guest mode is off, **vacation mode** activates automatically — notifying both residents. It disables on first return.

The **Alarmo** alarm panel triggers a full-house red light strobe (500ms intervals) on intrusion, then restores white lighting when cleared.

### Daily Briefing

Every morning at **8:30 AM**, the system fetches events from calendar sources and pending tasks from todo lists, then pushes a structured notification to the iPhone. A full-formatted email follows with detailed scheduling, due tasks, and a personal sign-off.

At **8:00 AM**, a weather check runs. If rain is predicted, a motorcycle rain alert notification is pushed with estimated precipitation.

### Work Tracking

The system tracks daily hours at Polytechnique: after **8 hours**, Arthur receives a "time to go home" notification (workdays only, once per day — flag resets at midnight). When Arthur leaves campus between 15:00 and 22:00, Nerea is notified automatically.

### Media & Arrival Context

When Arthur arrives home while music is playing on his iPhone and nobody else is present, an interactive notification offers to **transfer playback** to the Sonos speaker via Music Assistant with a 5-minute timeout. Daily Immich photo memories are pushed as notifications.

### Infrastructure Safeguards

- **Bandwidth management** — qBittorrent speed limits toggle automatically based on active media streaming clients
- **AdGuard auto-recovery** — filtering and protection re-enable after 2 hours if manually disabled

---

## Devices & Connectivity

| Protocol | Hardware | Role |
| :--- | :--- | :--- |
| **Zigbee** (Zigbee2MQTT) | SLZB-MR4 coordinator | All smart lighting, dimmers, sensors |
| **Matter** | Matter Server add-on | Cross-ecosystem device compatibility |
| **Wi-Fi** | iPhone/iPad Companion Apps | Presence detection, push notifications |
| **LAN** | Apple TV, Panasonic TV, PS5, Sonos | Media playback detection and control |
| **Bluetooth** | openWakeWord + Piper | Voice assistant input/output |
| **Cloud** | Cloudflare Tunnel | Secure remote access, webhooks |

---

*ArtHome proves that a completely local, privacy-first smart home can rival any cloud-dependent system in capability. Every trigger is a learned pattern, every action a removal of friction.*
