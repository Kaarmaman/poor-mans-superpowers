# Poor Man's Superpowers

**A lightweight Claude Code plugin for reliable software delivery.**

[![Validate plugin](https://github.com/Kaarmaman/poor-mans-superpowers/actions/workflows/validate-plugin.yml/badge.svg)](https://github.com/Kaarmaman/poor-mans-superpowers/actions/workflows/validate-plugin.yml)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Poor Man's Superpowers is a user-invoked, instruction-only **Claude Code
workflow** for repository-aware planning, behavior-first testing, root-cause
debugging, final diff review, and validated delivery. It adds no hooks, MCP
servers, network calls, or project runtime dependencies.

Independent, lightweight alternative to [obra/superpowers](https://github.com/obra/superpowers)
for users who want explicit, prompt-only quality gates without a full agentic
workflow.

## Best for

- Implementation and bug-fix requests that need a repeatable quality loop.
- Developers who want more discipline than one-shot prompting with less ceremony
  than a full agentic coding framework.
- Repositories with existing tests, instructions, or Beads tracking.

## Not for

- Explanations, planning-only requests, or documentation-only edits.
- Replacing project-specific policies, test suites, or human review.
- Starting work without an explicit user request.

## What it does

1. Clarifies outcome, constraints, risks, and acceptance criteria.
2. Inspects relevant code, tests, interfaces, and repository instructions.
3. Sequences a focused behavior check from RED to GREEN when feasible.
4. Traces failures to root cause instead of random-patching symptoms.
5. Reviews final diff, status, and validation before completion.
6. Uses Beads only when an existing repository already has Beads initialized.

## Example workflow

Request: `Fix token expiry handling and add a regression test.`

- Clarify expected expiry boundary and acceptance criteria.
- Inspect auth code, existing tests, and repository guidance.
- Add or update focused behavior coverage and observe the intended failure.
- Make one root-cause fix, rerun focused checks, then review the final diff.
- Report validation results and any remaining limitation.

## Install as Claude Code plugin

**Prerequisite:** Claude Code with plugin support. No runtime dependency is
needed in your project. Plugin validation was tested with Claude Code `2.1.251`.

### User-scoped installation

```bash
claude plugin marketplace add Kaarmaman/poor-mans-superpowers
claude plugin install poor-mans-superpowers@poor-mans-tools --scope user
```

### Project-scoped installation

```bash
claude plugin marketplace add Kaarmaman/poor-mans-superpowers --scope project
claude plugin install poor-mans-superpowers@poor-mans-tools --scope project
```

### Invoke

Use canonical namespaced invocation:

```text
/poor-mans-superpowers:poor-mans-superpowers
```

Some Claude Code versions also expose this bare alias:

```text
/poor-mans-superpowers
```

### Validate, update, or remove

From a checkout of this repository, validate plugin structure with:

```bash
claude plugin validate .
```

Update a user-scoped installation:

```bash
claude plugin update poor-mans-superpowers@poor-mans-tools --scope user
```

Remove a user-scoped installation:

```bash
claude plugin uninstall poor-mans-superpowers@poor-mans-tools --scope user
```

## Optional companions

- [`ponytail:ponytail`](https://github.com/dietrichgebert/ponytail) — minimal
  implementation choices. Workflow still works without it.
- [`bd` / Beads](https://github.com/steveyegge/beads) — persistent issue
  tracking in repositories that already use it.
- `/simplify` — final simplification review when commit readiness is requested.

## Project links

- [Workflow source](plugins/poor-mans-superpowers/skills/poor-mans-superpowers/SKILL.md)
- [Plugin manifest](plugins/poor-mans-superpowers/.claude-plugin/plugin.json)
- [Report a problem or request an improvement](https://github.com/Kaarmaman/poor-mans-superpowers/issues)
- [Claude Code plugin documentation](https://code.claude.com/docs/en/plugins)

## Scope

Workflow instructions and adapter metadata only. No hooks, MCP servers, network
code, or project-specific instructions. MIT licensed; see [LICENSE](LICENSE).

See [CHANGELOG](CHANGELOG.md) for releases and [CONTRIBUTING](CONTRIBUTING.md)
for development and validation steps.

## Related work

[Superpowers](https://github.com/obra/superpowers) provides a broader agentic
skills framework. This plugin targets users who want a smaller Claude Code
workflow with the same core concerns: requirements, tests, debugging, review,
and delivery.
