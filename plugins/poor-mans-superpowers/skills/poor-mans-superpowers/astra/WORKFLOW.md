# ASTRA orchestration

Read only for an explicit `-astra` invocation. Apply alongside the shared
quality gates in `../SKILL.md`; do not reload that file if already in context.
Resolve paths below relative to this file, not the user's repository.

Use Claude Code's native `Task`/subagent capability; never invoke, install, or
depend on `astra-orchestrator`. This instruction-only plugin cannot change the
model of an already-running root session.

## Root responsibilities and profiles

Root owns goal understanding, architecture, decomposition, parallelism, bounded
contracts, conflict resolution, integration, final verification, and the
user-facing response. Children provide bounded evidence or implementation;
they do not own overall direction.

| Role | Requested model | Reasoning | Contract file (load only when assigning role) |
| --- | --- | --- | --- |
| root/orchestrator | GPT-6 Astra | `medium` | This file |
| explorer | GPT-5.6 Luna | `xhigh` | [roles/explorer.md](roles/explorer.md) |
| worker | GPT-5.6 Luna | `xhigh` | [roles/worker.md](roles/worker.md) |
| tester | GPT-5.6 Luna | `xhigh` | [roles/tester.md](roles/tester.md) |
| researcher | GPT-5.6 Luna | `xhigh` | [roles/researcher.md](roles/researcher.md) |
| independent reviewer | GPT-6 Astra | `low` | [roles/reviewer.md](roles/reviewer.md) |

Launch the Claude Code session with GPT-6 Astra at `medium` (or its matching
model/profile) to get that root model. Request the listed native profiles when
the host exposes model selection. Do not silently substitute models or reasoning
levels. If selection is unavailable, report the limitation and any actual
fallback; never claim Astra or Luna ran when its profile was unavailable.
Escalate another role only when the user asks, Luna reports a genuine reasoning
blocker, or root identifies a high-risk architectural/security review need.

## Luna concurrency

Keep at most 3 concurrently active Luna subagents per ASTRA task/session.
Explorer, worker, tester, and researcher calls all count. A fourth Luna child
must wait until one of the 3 finishes. The independent Astra reviewer does not
count and may run concurrently. Enforce through native orchestration; do not add
a scheduler, queue, dependency, or runtime component.

## Delegation gate

Before substantive repository work, classify the task as `root-only` or
`delegated`:

- Keep `root-only` for genuinely small, localized work that gains nothing from
  independent exploration, implementation, testing, research, or review.
- Use `delegated` when work spans files or components, has independent
  workstreams, needs repository exploration, benefits from separate execution
  and verification contexts, crosses components, needs current external facts,
  or benefits materially from independent review.
- Explicit `-astra` enables this mode. Do not mechanically spawn children for
  trivial root-only work, but do not simulate required delegation.

For delegated work, create at least one real native child before doing that
work in root. If native delegation is unavailable or fails, report the exact
failure; never claim a child ran. Continue directly only when reasonable and
clearly record that fallback.

## Spawn contracts and context budget

For each selected role, load only its contract file from the table above.
Do not read every role file in advance. Reuse a role already loaded in context.
If a selected role file cannot be read, report the missing file and stop that
handoff rather than inventing its contract.
These are supporting instructions, not globally registered agents or separate
skills; use their contents with native subagent calls.

1. Use descriptive role/task names and the requested profile.
2. Give each child its role instructions plus a bounded contract: objective,
   scope/owned files, relevant context, constraints, deliverable, acceptance
   criteria, and applicable shared quality gates. Do not pass the full PMSP
   skill, this orchestration file, other role files, or entire root transcript
   when a focused handoff suffices. Prefer fresh context where supported;
   report inherited-context limitations rather than promising token isolation.
3. Always require preservation of unrelated changes, root-cause investigation
   of unexpected failures, accurate check results, and escalation of blockers
   or scope expansion. Root tracks unsuccessful fix attempts across children;
   after three, stop and reassess with the user—never reset the count by spawning
   a new child.
4. Retain task identity and wait for required children before final synthesis.
5. Use one writer per file/subsystem. Explorers, researchers, testers, and
   reviewers are read-only unless their contract explicitly assigns test edits.
6. Run independent work in parallel within the Luna cap. Serialize dependencies:
   explore -> decide -> implement -> test -> review -> fix -> final verify.
7. Require concise evidence: conclusions, relevant paths/symbols, changes,
   commands/results, and risks/blockers. Avoid raw logs unless needed to diagnose.

Root performs branch synchronization. Children must not independently pull,
switch branches, rebase, commit, or stage changes.

## Workflow

For non-trivial implementation, use each role when it materially helps:

1. Spawn Luna explorer(s) when repository understanding is needed.
2. Root chooses implementation direction from their evidence.
3. Spawn Luna worker(s) with non-overlapping ownership.
4. Spawn a Luna tester for reproduction and focused validation.
5. Spawn the Astra reviewer for every code or research-logic change before the
   final response. Skip only trivial no-change work.
6. Resolve material findings, then run final verification in root.

For cross-component debugging, collect independent exploration and reproduction
first; root selects one root-cause hypothesis; worker implements; tester reruns
the original failure; reviewer checks the fix. For external or version-specific
questions, use a Luna researcher and require primary sources where possible.

## Failure and completion gates

If a child fails, inspect why and decide whether to retry, narrow, reassign, or
handle it in root. Do not silently ignore failure or claim incomplete work
completed. Before final response, confirm every required child was spawned,
completed or explicitly failed, material findings were integrated, conflicts
were resolved, required verification ran, and no required child remains active.

All shared invariants, branch rules, root-cause gates, tests, and completion
gates in `../SKILL.md` still apply. Root owns their enforcement across children.
