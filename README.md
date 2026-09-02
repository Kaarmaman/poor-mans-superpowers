# Poor Man's Superpowers

**Superpowers on budget.**

A lean **Claude Code skill** for people who want better software-engineering
results than one-shot prompts, without paying in tokens, dollars, or waiting
for a full-blown Superpowers plugin.

> Better than prompt roulette. Cheaper than Superpowers luxury.

## What it does

- Clarifies outcome, constraints, risks, and acceptance criteria.
- Inspects relevant code, tests, interfaces, and repository instructions.
- Uses behavior-first RED → GREEN testing when feasible.
- Traces failures to root cause instead of random-patching symptoms.
- Reviews final diff, status, and validation before completion.
- Uses Beads only when an existing repository already has Beads initialized.

Workflow stays user-invoked. No surprise autonomous coding.

## Cost philosophy

| Approach | Cost | Typical experience |
|---|---:|---|
| One-shot prompt | Lowest | Fast. Sometimes confidently wrong. |
| Poor Man's Superpowers | Low | More reliable, still lightweight. |
| Full-blown Superpowers workflow | Higher | More ceremony, tokens, and time. |

Maintainer currently running it on **ChatGPT 5.6 Luna on XHigh**: a
low-cost model with more reasoning effort. Models and prices change; the workflow
is the durable part. You can check the best model for the lowest price at [DeepSwe](https://deepswe.datacurve.ai/).

## Install as Claude Code plugin

```bash
claude plugin marketplace add Kaarmaman/poor-mans-superpowers
claude plugin install poor-mans-superpowers@poor-mans-tools --scope user
```

For a shared project installation:

```bash
claude plugin marketplace add Kaarmaman/poor-mans-superpowers --scope project
claude plugin install poor-mans-superpowers@poor-mans-tools --scope project
```

Invoke explicitly:

```text
/poor-mans-superpowers
```

## Optional companions

- `ponytail:ponytail` — minimal implementation choices. Missing? Workflow still works.
- `bd` / Beads — persistent issue tracking in repositories that already use it.
- `/simplify` — final simplification review when commit readiness is requested.

## Scope

Workflow instructions and adapter metadata only. No hooks, MCP servers, network
code, or project-specific instructions.

## License

MIT. See [LICENSE](LICENSE).
