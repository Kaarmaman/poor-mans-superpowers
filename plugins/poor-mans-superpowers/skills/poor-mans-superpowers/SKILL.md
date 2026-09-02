---
name: poor-mans-superpowers
description: "Run a lean implementation and delivery workflow: clarify scope and requirements, use Beads when initialized, fingerprint relevant baselines, sequence behavior tests red-green, require root-cause fixes for failures, review every final diff, and run /simplify before a requested commit. Use only when explicitly invoked; not for explanations, planning-only work, or documentation-only edits."
disable-model-invocation: true
---

# Poor Man's Superpowers

Use this skill as a lightweight quality loop for a requested implementation,
bug fix, or delivery. It is smaller than a full agentic framework: inspect only
what is relevant, make one coherent change, and verify changed behaviour.

## Ponytail companion

If installed, invoke `ponytail:ponytail` before implementation. Ponytail guides
minimal implementation choices; this skill owns workflow and quality gates. If
Ponytail is unavailable, apply minimal-change principles directly and continue.

## Invariants

- Preserve unrelated user changes. Never silently reset, stage, overwrite, or
  attribute them to this request.
- An unexpected test or validation failure blocks the next implementation step.
  Reproduce and trace it to root cause before continuing.
- Count unsuccessful root-cause fix attempts. After three, stop; report the
  evidence and reassess the assumptions or design with the user. Do not make a
  fourth speculative patch.
- A completion gate applies whether or not a commit, PR, or merge is made.

## Branch synchronization before code changes

Before the first code edit on every code-changing request:

1. Check `git status --short --branch`; preserve unrelated uncommitted changes.
2. On the default branch, fast-forward it and create a feature branch:
   `git pull --ff-only origin <default-branch>` then `git switch -c <feature-branch>`.
3. On an existing feature branch, run `git fetch origin` and rebase onto the
   latest `origin/<default-branch>` while the worktree is clean.
4. Never pull, switch, or rebase over unrelated dirty changes; stop and ask
   rather than stash, reset, overwrite, or merge them silently.
5. Repeat `git fetch origin` and rebase before pushing or opening a PR, since
   the base branch may have changed during implementation.

## Begin: request, scope, and requirements lifecycle

1. Read applicable repository instructions and inspect the current worktree.
2. Analyze the request before editing:
   - restate the desired user-visible outcome, non-goals, constraints, risks,
     and acceptance criteria;
   - inspect relevant implementation, tests, interfaces, and existing changes;
   - design the smallest coherent change and flag a safer or more maintainable
     design/feature when the requested approach would create avoidable debt.
3. Resolve uncertainty before implementation. Ask targeted questions when
   requirements, behavior, ownership, or design are ambiguous; recommend a
   concrete alternative when useful. Repeat analysis/design/clarification until
   acceptance and implementation path are clear enough to predict the files and
   checks involved. Do not make a product decision by guesswork or edit blocked
   production code while waiting for an answer.
4. If `bd` is available *and* the repository has Beads initialized, find an
   existing relevant issue. Create one only when no suitable issue exists. Mark
   it in progress or add a concise progress note before implementation. Do not
   introduce Beads, change its configuration, or fabricate issue IDs.

## Baseline fingerprint

Before broad, multi-file, or high-risk changes, run the nearest relevant check
on the unchanged starting state when it is cheap. Capture the branch/commit,
relevant `git status`/diff state, exact command, environment detail that matters,
and result. Record pre-existing failures separately; never attribute them to the
new change. Skip an irrelevant or disproportionately expensive baseline for a
tiny, documentation-only, formatting-only, or non-behavioural configuration
change, and say why it was skipped.

## Root-cause gate

For a reported bug, regression, or any unexpected test/validation failure:

1. Stop unrelated implementation and reproduce the failure with the smallest
   useful command or scenario.
2. Trace control flow, data flow, and the relevant boundary until the failing
   behavior has a specific source. Distinguish requested-change failures from
   baseline, environment, or infrastructure failures.
3. State one falsifiable root-cause hypothesis and test it with the smallest
   useful experiment.
4. Make one root-cause change at a time, then rerun the reproducer and affected
   checks. Do not random-patch, bundle unrelated fixes, or work around an
   unexplained failure.
5. If a baseline or infrastructure failure is not owned by this change, record
   its evidence and impact. If it blocks meaningful verification, stop and ask
   for a decision rather than claiming completion.

The intended RED result of a test-first step is not an unexpected failure; it
must fail for the intended behavioral reason. Every failed fix attempt counts,
even if the patch is small. On the third failed attempt, stop immediately and
report each hypothesis, experiment, change, and observed result; reassess
requirements/design with the user before any further code work.

## Build and test: lightweight red-green sequencing

- For each behavior change or bug fix, write or update a focused behavior test
  before changing production code when feasible. Prefer real outcomes and real
  boundaries; mock only when unavoidable.
- Run that test and observe RED before the production change. Confirm the
  failure is the intended old behavior, not a test setup, import, fixture, or
  environment error. Fix such test/infrastructure problems through the
  root-cause gate before treating the test as valid.
- Make the smallest production change that addresses the traced cause, then
  observe GREEN by rerunning the focused test. Keep the test meaningful: it
  must distinguish the old behavior from the requested behavior.
- If observing RED before implementation is not feasible (for example an
  external system, an existing failing test, or a docs/config-only change),
  state the concrete reason and use the nearest meaningful validation instead.
- Run the changed test first, then the relevant nearby suite. Any unexpected
  failure invokes the root-cause gate and must be resolved or explicitly
  classified before further work continues. Run the full suite only when
  repository instructions require it, the change has broad reach, or it is
  cheap enough to be meaningful.
- Report failed or unavailable checks accurately; never claim a test passed
  without running it.

## Completion gate: always apply

Before declaring completion, with or without a commit:

1. Check every acceptance criterion, requested non-goal, and clarified design
   decision. Do not mark work complete while any requirement is ambiguous.
2. Review the final diff and status, including untracked files that belong to
   the work. Run `git diff --check` when applicable. Look for unintended scope,
   unrelated changes, missing production behavior, dead code, and tests that
   would pass without the production change.
3. Confirm relevant checks are fresh and compare their result with the baseline
   fingerprint. For docs/config-only work, run applicable syntax, lint, or
   rendering validation and explain why behavior regression coverage does not
   apply.
4. If diff scope, acceptance, test meaning, or failure ownership is ambiguous,
   stop and report it instead of claiming completion.

## Delivery and pre-commit gates

- Apply `/simplify` only when the user asks to commit or says the change is
  ready to commit. If unavailable, perform one focused simplification review:
  remove duplication introduced by the change, clarify names/control flow, and
  delete dead code without refactoring adjacent working code.
- If simplification changes executable code, rerun the directly affected test
  and any necessary nearby suite, then repeat the completion gate.
- If the user requests or repository policy authorizes a PR or merge, review the
  final diff, create/update the PR or merge to the target branch according to
  repository policy, and wait for required review/CI checks. After a merge, run
  required post-merge tests against the merged target and report their exact
  result. Do not close the Beads issue or job after a merge until those tests
  pass; a failed post-merge check reopens the root-cause gate.
- Update the Beads issue with the implemented outcome. Close it only after its
  acceptance criteria and all applicable tests are satisfied, including
  post-merge tests when a merge occurred. If delivery or verification remains
  blocked, leave it open or create a follow-up issue.
- Stage only files belonging to the request; never use `git add .`. Commit only
  when explicitly requested. A PR being created is not evidence that a merge
  or post-merge verification happened.

## Keep the loop cheap and reportable

- Make one coherent change. Do not spawn extra agents, generate lengthy plans,
  or run unrelated audits unless the request or a failure requires it.
- Finish with a compact record: clarified outcome/design, baseline fingerprint,
  RED/GREEN evidence (or why RED was infeasible), root-cause attempts and any
  circuit-breaker stop, tests/quality gates, final diff review, delivery and
  post-merge status, Beads issue status, and commit hash only if a commit was
  made.
