---
slug: ai-sync-dotfiles
title: AI Sync Dotfiles - One Config for Every AI Provider
type: Personal Project
description: My dotfiles with a single source of truth that syncs MCP servers, skills and slash commands across Claude Code, OpenCode, Codex, Zed, Claude Desktop and LM Studio.
shortDescription: One source of truth syncing MCP servers, skills and commands across six AI coding platforms.
publishedAt: 2026-09-16
readingTime: 3
status: Active
tags:
  - TypeScript
  - MCP
  - Infrastructure
icon: i-ph-arrows-clockwise-duotone
---

[**AI Sync Dotfiles**](https://github.com/ArthurDanjou/ai-sync-dotfiles) is my machine configuration with a twist: every AI coding tool I use — Claude Code, OpenCode, Codex, Zed, Claude Desktop, LM Studio — is driven from a **single source of truth**, so a new MCP server, skill or command lands everywhere at once instead of being configured six times.

## One Source of Truth

Three versioned inputs generate everything else:

- **`scripts/servers.ts`** — the one and only list of MCP servers (command, args, env, remote URLs). Secrets are never hardcoded: values resolve from `process.env` at build time.
- **`skills/`** — a curated set of agent skills, symlinked into every provider's skill directory.
- **`scripts/commands/`** — shared slash-command templates (YAML frontmatter + `$ARGUMENTS`), symlinked into OpenCode, Claude Code and Codex, the three platforms that support custom commands.

## Platform Outputs

A build pipeline (`bun run build`) exports each server to its native format: `context_servers` for Zed, `mcpServers` for Claude Desktop, per-project entries for Claude Code CLI, `[mcp_servers.*]` TOML tables for Codex, and the `mcp` block for OpenCode and LM Studio. Installation merges per-server into the live configs: managed entries are overwritten, local customizations are preserved, and a timestamped `.bak` is written before every change.

## Safety by Design

Generated configs bake in secrets, so the pipeline treats them as toxic by default: `mcp/` output and `.env` are gitignored, a secret audit scans tracked files **and** full git history, a pre-push hook blocks any push that trips it, and backups older than three days are purged automatically.

## Quality Assurance

- **[Bun](https://bun.sh/)**: Runtime, test runner and package manager — 77 isolated tests (temporary `$HOME`, scratch git repos) cover generators, installers, backups and the audit itself.
- **[TypeScript](https://www.typescriptlang.org/)**: Strict type safety across build, install and setup scripts, checked in CI.
- **GitHub Actions**: Every push and pull request runs build plus typecheck plus tests plus audit, with least-privilege tokens and a protected `master` branch.
