# Changelog

## [Unreleased]

### Added

- Opt-in `/poor-mans-superpowers -astra` orchestration using the active
  harness's delegation support; Pi requires separately installed
  `pi-subagents`.
- Portable skill installs for Copilot CLI, Codex CLI, and Pi alongside the
  Claude Code plugin distribution.
- Isolated ASTRA adapters for Claude Code, Copilot CLI, Codex CLI, Pi, and a
  safe generic fallback; only the active harness adapter is loaded.
- Pi setup and operating guidance for the separately installed
  `pi-subagents` extension.
- Codex-specific explicit-invocation metadata for portable skill installs.
- Documentation and metadata for independent ASTRA orchestration.

### Changed

- Register the independent reviewer as `poor-mans-superpowers:astra:reviewer`
  with explicit `gpt-6-astra` model and `low` effort instead of a prompt-only
  contract; dispatch it by scoped agent name without inheriting root settings.
- Moved shared ASTRA orchestration into a harness-neutral router; each harness
  loads only its own adapter and role/tool guidance.
- Bounded child handoffs by role, task, edit boundary, acceptance, and
  verification; added structural checks for routing, adapter isolation,
  profiles, metadata, and links.
- Kept Claude-only agent profiles and model requirements inside the Claude
  adapter; other harnesses use their own native agents and capability limits.
- Limited Claude ASTRA mode to 3 concurrently active Luna subagents per
  task/session; a fourth Luna subagent waits, while the Astra reviewer is
  excluded.
- Documented reporting when a host's delegation capability is unavailable,
  without assuming Claude-specific model settings on other harnesses.
- Updated installation, invocation, contribution, and validation documentation
  for all supported harnesses.
- Clarified that unknown harnesses use the shared single-agent workflow and that
  ASTRA never installs or emulates host-specific subagent tooling.

## [0.1.1] - 2026-09-02

### Added

- Searchable plugin metadata and repository links.
- Canonical invocation plus validation, update, and uninstall instructions.
- Strict GitHub Actions manifest validation.
- Contribution guidance.

## [0.1.0] - 2026-09-02

### Added

- Initial lightweight Claude Code workflow for requirements, testing, root-cause
  fixes, diff review, and delivery.
