# Poor Man's Superpowers

A lean Claude Code skill for disciplined AI-assisted software engineering:
requirements clarification, behavior-first testing, root-cause debugging, final
diff review, and minimal reliable delivery.

## What it does

Poor Man's Superpowers guides Claude through one coherent implementation loop:

1. Clarify outcome, non-goals, constraints, risks, and acceptance criteria.
2. Inspect repository instructions, code, tests, interfaces, and existing changes.
3. Use Beads when already initialized; never introduce it automatically.
4. Capture a relevant baseline before broad or high-risk changes.
5. Sequence behavior tests RED → GREEN when feasible.
6. Trace unexpected failures to root cause before changing code.
7. Review final diff, status, and validation before completion.
8. Run `/simplify` only when commit readiness is requested.

Workflow stays user-invoked. It does not run automatically.

## Install as Claude Code plugin

```bash
claude plugin marketplace add Kaarmaman/poor-mans-superpowers
claude plugin install poor-mans-superpowers@poor-mans-tools --scope user
```

Use `--scope project` when a repository should share the installation through
`.claude/settings.json`:

```bash
claude plugin marketplace add Kaarmaman/poor-mans-superpowers --scope project
claude plugin install poor-mans-superpowers@poor-mans-tools --scope project
```

Invoke with:

```text
/poor-mans-superpowers
```

Local validation:

```bash
claude plugin validate .
claude --plugin-dir ./plugins/poor-mans-superpowers
```

## Optional companion tools

- `ponytail:ponytail` — minimal implementation choices. If unavailable, the
  workflow continues with its own minimal-change guidance.
- `bd` / Beads — persistent issue tracking, used only in initialized repos.
- `/simplify` — final simplification review when commit readiness is requested.

## Scope

This repository contains workflow instructions and adapter metadata only. It
contains no hooks, MCP servers, network code, or project-specific instructions.

## License

MIT. See [LICENSE](LICENSE).
