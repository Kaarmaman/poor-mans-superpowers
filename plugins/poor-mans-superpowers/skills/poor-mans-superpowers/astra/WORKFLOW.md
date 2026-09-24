# ASTRA orchestration

This opt-in mode adds bounded native subagent work to the shared quality gates
in `../SKILL.md`. Root owns user intent, architecture, decomposition,
coordination, integration, final verification, and the response. Children never
own overall direction or delivery.

## Select one harness adapter

Identify the active host from the invocation and available host context. Do not
guess from installed CLIs or tools. Load exactly one matching adapter:

| Active harness | Adapter |
| --- | --- |
| Claude Code | [harnesses/claude-code.md](harnesses/claude-code.md) |
| GitHub Copilot CLI | [harnesses/copilot-cli.md](harnesses/copilot-cli.md) |
| Codex CLI | [harnesses/codex-cli.md](harnesses/codex-cli.md) |
| Pi | [harnesses/pi.md](harnesses/pi.md) |
| Unknown, unsupported, or uncertain | [harnesses/default.md](harnesses/default.md) |

Load only the selected adapter; do not read any other adapter. Each adapter
owns its host's agent names, tools, setup, and capability limits. Never reuse a
host-specific tool or agent profile in another harness. Claude plugin agent
profiles are Claude-only.

## Shared orchestration contract

- Use delegation only in this explicit mode. Keep assignments narrow and
  independent; parallelize only work that can safely proceed at once.
- For non-trivial changes, explore before deciding, then implement, test, and
  independently review. Root chooses direction and integrates results.
- Keep one writer per file or worktree. Explorers, testers, and reviewers stay
  read-only unless their adapter explicitly says otherwise.
- Respect host concurrency limits and user constraints. Do not add a scheduler,
  runtime, package, or persistent agent configuration for one task.
- Give each child a bounded objective, scope, repository/ref, edit boundary,
  acceptance criteria, validation command, and concise output contract.
- Preserve unrelated changes. Trace unexpected failures to root cause. Track
  failed fix attempts across children and stop after three.
- If a required host capability is missing, report it and stop the ASTRA
  handoff. Do not silently switch harnesses, install extensions, or pretend a
  child ran. The shared single-agent workflow remains available separately.

## Completion

Root checks acceptance, test meaning and results, final diff/status, and
`git diff --check`. Report the selected adapter, exact checks, unavailable
capabilities, and any work left incomplete. Do not claim model or host behavior
that was not verified.
