---
slug: ai-sync-dotfiles
title: AI Sync Dotfiles - One Config for Every AI Provider
type: Personal Project
description: My dotfiles with a single source of truth that syncs 16 MCP servers, 35 skills and shared slash commands across Claude Code, OpenCode, Codex, Zed, Claude Desktop and LM Studio.
shortDescription: One source of truth syncing MCP servers, skills and commands across six AI coding platforms.
publishedAt: 2026-09-16
readingTime: 4
favorite: true
status: Active
tags:
  - TypeScript
  - MCP
  - Infrastructure
icon: i-ph-arrows-clockwise-duotone
---

[**AI Sync Dotfiles**](https://github.com/ArthurDanjou/ai-sync-dotfiles) is my machine configuration with a twist: every AI coding tool I use is driven from a **single source of truth**. A new MCP server, skill or slash command lands everywhere at once instead of being configured six times in six dialects.

## The Problem

Six tools, six configuration formats, six locations: Zed wants `context_servers` in `settings.json`, Claude Desktop wants `mcpServers`, Claude Code CLI nests them under `projects[…]`, OpenCode uses a `type: local` command array, Codex CLI speaks `[mcp_servers.*]` TOML tables, and LM Studio has its own `mcp.json`. They keep changing, and none of them agree. Configuring the same server six times by hand is slow, and drift is guaranteed.

## One Source of Truth

Three versioned inputs generate everything else, following the pattern of [theme-artlab](https://github.com/ArthurDanjou/theme-artlab): one source of truth, multiple platform outputs.

- **`scripts/servers.ts`** — the one and only list of MCP servers (command, args, env, remote URLs). Secrets are never hardcoded: values resolve from `process.env` at build time, and unset variables simply omit the `env` block.
- **`skills/`** — 35 curated agent skills, symlinked into `~/.agents/skills`, `~/.claude/skills`, `~/.config/opencode/skills` and `~/.codex/skills` so every provider sees the same set.
- **`scripts/commands/`** — shared slash-command templates (YAML frontmatter with `description`, `$ARGUMENTS` placeholder), symlinked into OpenCode, Claude Code and Codex — the three platforms that support custom commands.
- **`scripts/instructions.md`** — deployed as both `CLAUDE.md` and `AGENTS.md`, so Claude Code and OpenCode share the same behavioral guidelines.

## Repository Layout

```
dotfiles/
├── bootstrap.sh            ← New Mac: brew bundle + setup + build + install
├── Brewfile                ← brew, cask, cargo packages
├── .env.example            ← Copy to .env, fill in secrets (never committed)
├── home/                   ← Symlinked to ~ via `bun run setup`
│   ├── .zshrc
│   ├── .zprofile
│   ├── .gitconfig
│   ├── .gitignore_global
│   └── .ssh.config.template  ← Copy manually, never symlinked
├── config/                 ← Symlinked to ~/.config via `bun run setup`
│   ├── starship/starship.toml
│   ├── ghostty/themes/
│   ├── zed/                ← Editor settings, keymap, tasks, theme
│   ├── gh/config.yml       ← Without hosts.yml (contains token)
│   ├── opencode/           ← opencode.jsonc, agents, shared instructions
│   └── claude/settings.json ← Versioned keys only, merged at install
├── skills/                 ← 35 skills symlinked to every provider
├── claude/CLAUDE.md        ← Versioned copy of scripts/instructions.md
├── scripts/
│   ├── servers.ts          ← Source of truth: all MCP servers (edit me)
│   ├── instructions.md     ← Source of truth for CLAUDE.md and AGENTS.md
│   ├── commands/           ← Source of truth for slash commands
│   ├── mcp/                ← Per-platform formatters + build orchestrator
│   └── setup/              ← install, dotfiles linking, backups, audit
├── tests/                  ← Isolated bun test suite (77 tests)
├── .github/workflows/checks.yml ← CI on every push and pull request
├── hooks/pre-push          ← Secret audit on every push
├── mcp/                    ← Generated output (gitignored, contains secrets)
└── package.json
```

## Build, Install, Run

A new Mac goes from zero to fully configured with one script: `bootstrap.sh` runs `brew bundle`, links the dotfiles, builds the configs, installs them everywhere, and finishes with a secret audit. Day to day, three commands cover everything:

```bash
bun run setup        # symlink home/ and config/ files (backs up conflicts)
bun run build        # regenerate all six platform configs from servers.ts
bun run install:all  # merge them into the live system configs
```

Adding a server is a three-liner: one entry in `servers.ts`, `bun run build`, `bun run install:<platform>`. Same story for skills (`bunx skills add …`, `bun run setup`) and commands (one Markdown file in `scripts/commands/`).

## Non-Destructive by Design

Installation never blindly overwrites. Managed servers merge **per-server** into the existing config: repo entries replace the whole entry, local custom servers are preserved, corrupt JSONC files are never touched, and a timestamped `.bak` is written before every change. Symlinked destinations are replaced by regular files so generated secrets can never leak back into the repo, and backups older than three days are purged automatically.

## Safety in Layers

Generated configs bake in secrets, so the pipeline treats them as toxic: `mcp/` output and `.env` are gitignored, a secret audit scans tracked files **and** full git history, a pre-push hook blocks any offending push, and GitHub-side secret scanning with push protection backs it all up. The audit once caught the project's own test fixtures — proof the pipeline works, not just theater.

## Quality Assurance

- **[Bun](https://bun.sh/)**: Runtime, test runner and package manager — 77 isolated tests (temporary `$HOME`, scratch git repos) cover generators, installers, backups and the audit itself.
- **[TypeScript](https://www.typescriptlang.org/)**: Strict type safety across build, install and setup scripts.
- **GitHub Actions**: Every push and pull request runs build plus typecheck plus tests plus audit with least-privilege tokens, Dependabot keeps the pinned actions fresh, and `master` is branch-protected with required green checks.
