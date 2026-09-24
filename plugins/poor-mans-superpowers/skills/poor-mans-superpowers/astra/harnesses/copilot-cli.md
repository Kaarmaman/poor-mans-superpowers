# GitHub Copilot CLI adapter

Use only inside GitHub Copilot CLI. Use Copilot's native subagent and custom
agent support; never call Claude `Task`, Codex-specific tools, or Pi extension
commands here.

Delegate read-only exploration to Copilot's `explore` agent, implementation to
`task` or `general-purpose`, and final review to `code-review` when available.
Use Copilot's native agent picker or plain-language delegation when agent names
vary by CLI release. Use `/fleet` only for independent parallel tasks and
`/tasks` to inspect or manage running work. Avoid overlapping writes.

The PMSP skill is manual-only. If the installed CLI does not expose subagents,
report that ASTRA is unavailable; do not substitute another harness's
instructions. Continue only with the shared non-ASTRA workflow if user wants.
