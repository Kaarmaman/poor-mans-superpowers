# Codex CLI adapter

Use only inside Codex CLI. Skill discovery does not guarantee subagent support:
availability depends on the installed Codex CLI release, configuration, and
policy. Confirm support in the installed CLI's current help/docs before using
ASTRA delegation.

When native subagents are available, use only agent names and controls
documented for that release. Keep reviewers read-only and writes single-owner.
Do not assume built-in `explorer`/`worker` agents, `/agent`, or custom agent
paths such as `.codex/agents/`; verify them before use. Do not create persistent
agent configuration just for a one-off task.

If delegation is disabled or unavailable, report ASTRA unavailable and ask
whether to continue with the shared single-agent workflow. Never call Agents API
functions or another harness's tools as a substitute.
