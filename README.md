# Poor Man's Superpowers

**User-invoked quality workflow for Claude Code, GitHub Copilot CLI, Codex CLI,
and Pi.**

[![Validate plugin](https://github.com/Kaarmaman/poor-mans-superpowers/actions/workflows/validate-plugin.yml/badge.svg)](https://github.com/Kaarmaman/poor-mans-superpowers/actions/workflows/validate-plugin.yml)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Poor Man's Superpowers is a portable Agent Skill with a Claude Code plugin
release. It guides requirements, behavior-first testing, root-cause debugging,
final diff review, and validated delivery. It adds no project runtime
requirements, hooks, or MCP servers.

Default use stays single-agent and loads only the shared workflow. Explicit
`-astra` opts into native subagent orchestration; it loads instructions for the
active harness only. Unknown harnesses get a safe single-agent fallback.

## Best for

- Implementation and bug-fix requests that need a repeatable quality loop.
- Developers who want explicit quality gates without a full agent framework.
- Repositories with existing tests, instructions, or Beads tracking.

## Install

### Claude Code plugin

**Prerequisite:** Claude Code with plugin support.

```bash
claude plugin marketplace add Kaarmaman/poor-mans-superpowers
claude plugin install poor-mans-superpowers@poor-mans-tools --scope user
```

Invoke the namespaced skill:

```text
/poor-mans-superpowers:poor-mans-superpowers Fix token expiry handling and add a regression test.
```

Add `-astra` only when native subagent orchestration is wanted:

```text
/poor-mans-superpowers:poor-mans-superpowers -astra Fix token expiry handling and add a regression test.
```

The Claude plugin includes scoped ASTRA agent profiles. The skill itself also
runs from Claude's `.claude/skills/` directory, but copying only the skill does
not install those plugin agents.

### Copilot CLI, Codex CLI, and Pi

These harnesses use the same portable skill directory. From repository root,
install a fresh project-local copy with:

```bash
skills_dir=.agents/skills # Change to "$HOME/.agents/skills" for personal use.
dest="$skills_dir/poor-mans-superpowers"
if [ -e "$dest" ] || [ -L "$dest" ]; then
  printf '%s already exists; skipping.\n' "$dest"
else
  mkdir -p "$skills_dir" && cp -R plugins/poor-mans-superpowers/skills/poor-mans-superpowers "$dest"
fi
```

These locations are recognized by all three. Existing copies are never
overwritten; review and merge updates manually.

- **Copilot CLI:** invoke `/poor-mans-superpowers ...`; use `/skills info poor-mans-superpowers` to inspect it and `/skills reload` after adding it to a running session.
- **Codex CLI:** invoke `$poor-mans-superpowers ...` or select it from `/skills`. The bundled `agents/openai.yaml` disables implicit invocation for Codex. Verify native ASTRA delegation is available in your installed CLI/configuration before using `-astra`.
- **Pi:** invoke `/skill:poor-mans-superpowers ...`. Pi discovers portable skills in `.agents/skills/` and `~/.agents/skills/`.

Official references: [Copilot CLI skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills), [Codex skills](https://developers.openai.com/codex/skills), [Pi skills](https://pi.dev/docs/latest/skills).

## Pi ASTRA prerequisite

Pi does not include subagent orchestration in core. Installing this skill does
not install subagents. To use `-astra` in Pi, install the separate
[`pi-subagents`](https://www.npmjs.com/package/pi-subagents) extension:

```bash
pi install npm:pi-subagents
```

If the extension does not appear in the current session, start a fresh Pi
session and run `/subagents-doctor` to verify setup. Delegation loads lazily: if
a fresh session exposes only `subagents_enable`, ask Pi to enable delegation;
the `subagent` tool appears on the next model request. If activation fails, run the
doctor and stop ASTRA until setup is fixed. Delegate in plain language, for
example: “Use scout to inspect this flow, then worker to implement my approved
change, then reviewer to check the diff.” Use `/subagents-fleet` to inspect
active work. The extension is third-party executable code; review and trust it
before installing. It is never installed automatically.

Without that extension, Pi ASTRA stops with setup guidance; the shared
single-agent workflow still works. See the [Pi subagents adapter](plugins/poor-mans-superpowers/skills/poor-mans-superpowers/astra/harnesses/pi.md).

## Harness isolation

The shared `SKILL.md` contains the default quality loop. `-astra` loads
`astra/WORKFLOW.md`, which selects exactly one adapter: Claude Code, Copilot
CLI, Codex CLI, Pi, or the generic fallback. A harness never loads another
harness's tools or agent profiles. See the [adapter directory](plugins/poor-mans-superpowers/skills/poor-mans-superpowers/astra/harnesses/).

| Harness | Native delegation | PMSP setup |
| --- | --- | --- |
| Claude Code | `Task` and plugin-scoped agents | Claude plugin includes ASTRA roles |
| Copilot CLI | Native subagents and agent profiles | Portable skill only |
| Codex CLI | Native subagents if exposed by installed CLI | Portable skill; verify ASTRA availability |
| Pi | Requires separately installed `pi-subagents` extension | Portable skill plus optional extension |
| Other/unknown | No guessed host-specific tools | Shared single-agent fallback |

`-astra` does not require `astra-orchestrator`. It does require the selected
harness's native subagent capability; PMSP does not install or emulate another
harness's tools.

## Workflow

1. Clarify outcome, constraints, risks, and acceptance criteria.
2. Inspect relevant code, tests, interfaces, and repository instructions.
3. Add or update focused behavior coverage and observe RED when feasible.
4. Make one root-cause change and verify GREEN.
5. Review final diff, status, and validation before completion.
6. Use Beads only when the target repository already has it initialized.

## Layout

```text
plugins/poor-mans-superpowers/
├── agents/astra/             # Claude plugin agents only
└── skills/poor-mans-superpowers/
    ├── SKILL.md              # portable shared workflow and routing
    ├── agents/openai.yaml    # Codex explicit-invocation policy
    └── astra/
        ├── WORKFLOW.md       # ASTRA router and shared contract
        └── harnesses/        # isolated host adapters + generic fallback
```

The default invocation reads only `SKILL.md`. ASTRA adapter instructions load
only after explicit `-astra`; the selected adapter alone loads for that host.

## Validate, update, or remove

From a checkout of this repository:

```bash
node tests/skill-structure.mjs
claude plugin validate . --strict
```

The structural test checks routing, adapter isolation, Pi setup guidance, and
Claude agent registration. It does not simulate any host's runtime delegation
or verify model compliance.

Update or remove the Claude plugin:

```bash
claude plugin update poor-mans-superpowers@poor-mans-tools --scope user
claude plugin uninstall poor-mans-superpowers@poor-mans-tools --scope user
```

## Optional companions

- [`ponytail:ponytail`](https://github.com/dietrichgebert/ponytail) — minimal implementation choices.
- [`bd` / Beads](https://github.com/steveyegge/beads) — persistent issue tracking in repositories that already use it.
- `/simplify` — final simplification review when commit readiness is requested.

## Project links

- [Workflow source](plugins/poor-mans-superpowers/skills/poor-mans-superpowers/SKILL.md)
- [Claude plugin manifest](plugins/poor-mans-superpowers/.claude-plugin/plugin.json)
- [Report a problem or request an improvement](https://github.com/Kaarmaman/poor-mans-superpowers/issues)
- [Changelog](CHANGELOG.md)
- [Contribution guide](CONTRIBUTING.md)

Workflow instructions and adapter metadata only. No hooks, MCP servers, or
project-specific runtime behavior. MIT licensed; see [LICENSE](LICENSE).
