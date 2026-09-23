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
workflow by default. An explicit `-astra` option enables native Claude Code
subagent orchestration without requiring another plugin.

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
7. Offers opt-in ASTRA orchestration through native Claude Code subagents.

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

Use canonical namespaced invocation for default lean mode:

```text
/poor-mans-superpowers:poor-mans-superpowers
```

Some Claude Code versions also expose this bare alias:

```text
/poor-mans-superpowers
```

Opt into native ASTRA orchestration by passing `-astra` with request:

```text
/poor-mans-superpowers -astra Fix token expiry handling and add a regression test.
```

ASTRA mode is self-contained and uses Claude Code's native subagents: the
latest available Astra model at `medium` for root/orchestrator and `low` for
the independent reviewer, and GPT-6 Luna at `xhigh` for explorer, worker,
tester, and researcher. Luna roles and the reviewer are registered plugin agents
with explicit model and effort settings, so they do not inherit those from the
invoking session. Reviewer uses `gpt-6-astra` at `low`; update that explicit ID
when a newer Astra release becomes available. Root owns architecture,
decomposition, integration, conflict resolution, final verification, and the
user-facing response.

Keep at most 3 concurrently active Luna subagents per task/session. Explorer,
worker, tester, and researcher calls count toward this limit. A fourth Luna
subagent must wait until one of the 3 active Luna subagents finishes. The Astra
reviewer does not count. This is expressed through native Task/subagent
orchestration, with no scheduler or runtime dependency.

Using the latest Astra model at `medium` for root requires launching the
Claude Code session with that model/profile; ASTRA mode cannot change an
already-running root model. If native model selection is unavailable, report
that limitation instead of claiming the requested Astra or Luna profile ran.
`astra-orchestrator` is not required.

### Instruction loading and token cost

```text
plugins/poor-mans-superpowers/
├── agents/astra/            # registered subagents; explicit model + effort
│   ├── explorer.md
│   ├── worker.md
│   ├── tester.md
│   ├── researcher.md
│   └── reviewer.md          # gpt-6-astra + low
└── skills/poor-mans-superpowers/
    ├── SKILL.md             # shared quality gates + mode routing
    └── astra/
        └── WORKFLOW.md      # opt-in root orchestration
```

Default invocation reads only `SKILL.md`: no ASTRA topology or concurrency
rules. Explicit `-astra` additionally reads `astra/WORKFLOW.md`; Luna and reviewer
prompts load when their registered agents run. Reviewer dispatch uses
`poor-mans-superpowers:astra:reviewer`. Both modes use the same quality gates,
without copying them into two workflows.

Children receive their role prompt, bounded task context, and applicable quality
gates—not every role or the whole root transcript when avoidable. Root retains
architecture, integration, branch synchronization, and completion ownership.
Luna model/effort settings and the three-agent concurrency limit are explicit.

This reduces default prompt content, not necessarily total ASTRA task cost.
A small routing instruction remains; zero ASTRA-related tokens is not possible
while retaining one command with a mode flag. Files already read remain in
session context, and host context inheritance or eager loading can reduce the
savings. File separation is instruction-driven, not a runtime isolation guard;
exact token counts depend on the model tokenizer and host behavior.

### Validate, update, or remove

From a checkout of this repository, validate plugin structure with:

```bash
claude plugin validate . --strict
node tests/skill-structure.mjs
```

The Node check validates prompt structure and supporting links; it does not
simulate agent decisions or verify host-level token isolation.

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
- `astra-orchestrator` — not required; `-astra` mode is self-contained.

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
and delivery. Use explicit `-astra` when native multi-agent orchestration is
wanted; it does not load or depend on `astra-orchestrator`.
