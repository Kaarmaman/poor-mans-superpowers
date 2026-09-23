# Changelog

## [Unreleased]

### Added

- Opt-in `/poor-mans-superpowers -astra` mode using native Claude Code
  subagents with an independent ASTRA orchestration workflow.
- Documentation and metadata for independent ASTRA orchestration.

### Changed

- Register the independent reviewer as `poor-mans-superpowers:astra:reviewer`
  with explicit `gpt-6-astra` model and `low` effort instead of a prompt-only
  contract; dispatch it by scoped agent name without inheriting root settings.
- Moved ASTRA orchestration into an opt-in supporting workflow and five
  on-demand role contracts; default PMSP loads only shared gates and routing.
- Scoped child handoffs to their role, task, and applicable quality gates;
  documented context/token limitations and added structural validation.
- Configure ASTRA root/orchestrator (`medium`) and reviewer (`low`) for the
  latest available Astra model; register Luna child roles as plugin agents
  with explicit GPT-6 Luna model and `xhigh` effort.
- Limited ASTRA mode to 3 concurrently active Luna subagents per task/session;
  a fourth Luna subagent waits, while the Astra reviewer is excluded.
- Documented that Astra-medium root requires launching Claude Code with that
  model/profile, and that unavailable or downgraded subagent configuration must
  be reported rather than claimed.

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
