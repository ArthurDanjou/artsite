---
slug: homelab-network
title: Homelab Network - Segmented 2.5G Design
type: Personal Project
description: "A from-scratch network design taking my homelab from a flat Freebox-routed LAN to a segmented 2.5G infrastructure: Cloud Gateway Max, four VLANs, a 19-inch rack, and an isolated camera network. Currently in design phase."
shortDescription: Segmented 2.5G homelab network design with VLAN isolation, UniFi gateway, and rack plan (design phase).
publishedAt: 2026-09-01
readingTime: 4
status: Active
tags:
  - Self-Hosted
  - Networking
  - Infrastructure
icon: i-ph-network-duotone
---

My homelab outgrew its flat network: one Freebox Ultra routing everything, IoT devices next to the NAS, and cameras sharing the main LAN. This project documents the **target design** — every device, VLAN, firewall rule, and euro — before a single cable is bought. Status as of September 2026: **design phase, gear not yet ordered**.

## Current State

A UGREEN NASync DXP4800 Plus and a Beelink EQR6 running Proxmox (one Home Assistant OS virtual machine plus 10 LXC containers) sit on a Freebox-routed LAN, next to an old 3-port switch due for retirement. It works, but there is no isolation: a compromised bulb could reach the NAS, and camera streams share bandwidth with everything else.

Two principles drive the redesign: the network must survive a Proxmox reboot (so **no virtualized router** — no OPNsense VM), and cameras must never touch the internet or the main LAN.

## Target Topology

The Freebox Ultra drops to **bridge mode** (fiber transport only) and a **Cloud Gateway Max (UCG-Max)** takes over routing, firewall, VLANs, and IDS/IPS over 2.5G links:

- **UCG-Max LAN1** → NAS (dedicated 2.5G)
- **UCG-Max LAN2** → 2.5G injector → U7 Long-Range access point (tagged SSIDs)
- **UCG-Max LAN3** → Flex 2.5G-8 switch uplink (trunk, carries camera VLAN to the Proxmox host for Frigate)
- **UCG-Max LAN4** → free (wired PC / console)

The 5 Gbps fiber line is knowingly capped at 2.5G by the gateway, with a documented upgrade path (SFP+ model) if it ever bottlenecks.

## Segmentation

| VLAN | Subnet | Members | Firewall posture |
| :--- | :--- | :--- | :--- |
| **1 — Principal** | 192.168.1.0/24 | NAS, PC, Home Assistant, Apple TV, Hue Bridge | Full access |
| **10 — IoT** | 192.168.2.0/24 | Connected objects, Zigbee coordinator | Internet allowed, **blocked** from VLAN 1 and NAS (outgoing rule) |
| **20 — Cameras** | 192.168.3.0/24 | PoE and Wi-Fi cameras (≤10) | Maximum isolation, no internet; RTSP only to NAS and Frigate |
| **30 — Guests** | 192.168.4.0/24 | Guest SSID | Internet only |

Four matching SSIDs ride on the U7 access point, and camera streams are split at the source: sub-stream for detection, main stream for recording, with DHCP reservations and LAN NTP.

## The Rack

A closed 19-inch 12U bay at the entrance centralizes everything: patch panel on top, switch and gateway shelves, the Beelink, and the NAS on a heavy-duty shelf at the bottom with a PDU and mini-UPS at its foot. Antennas stay out — a rack is a Faraday cage, so the Zigbee coordinator and access point live on top. Roughly 8U of 12U used, leaving room for a PoE switch on camera day.

## Budget

| Item | Price |
| :--- | :--- |
| Cloud Gateway Max | ~€190 |
| Flex 2.5G-8 switch | ~€145 |
| U7 Long-Range access point | ~€159 |
| 2.5G PoE injector | ~€30 |
| 19" 12U bay, patch panel, PDU, shelves, hardware | ~€220 |
| Mini-UPS | ~€100 |
| Short Cat 6a patch cables | ~€30 |
| **Total** | **~€810** |

A later camera day adds ~€225 (PoE switch plus adapter for up to 7 PoE cameras). Deliberately rejected along the way: a 48-port switch for a 19-device network, UniFi Protect without storage, cloud-locked cameras without RTSP, and solar cameras without continuous streams.

## Cutover Checklist

1. Verify the Home Assistant Freebox integration and presence tracking survive bridge mode before flipping.
2. Flip to bridge; the UCG-Max becomes DHCP, DNS, and firewall.
3. Enable gateway config auto-backup (off by default).
4. Measure real throughput with IPS on, downgrade to IDS-only if it throttles.
5. Create the 4 SSIDs, 4 VLANs, trunk port, and IoT isolation rules.
6. Put the mini-UPS in and re-enable NUT monitoring in Home Assistant.
7. Migrate mDNS only if Sonos or Apple TV discovery breaks.

## Why This Belongs on a Research Profile

Distributed systems research and homelab networking exercise the same muscles: failure-domain isolation, adversarial thinking about trust boundaries (an IoT VLAN is a Byzantine fault domain with Wi-Fi), and reproducible infrastructure. The same rigor I apply to aggregation protocols went into every firewall rule above.
