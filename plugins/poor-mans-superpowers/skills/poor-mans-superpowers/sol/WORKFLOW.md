# Sol model workflow

This opt-in mode runs shared quality gates in `../SKILL.md` with one root model.
It does not add delegation or load ASTRA instructions.

## Model contract

Use the latest available Sol model at `high` effort. The current reference is
GPT-6.2 Sol (`gpt-6.2-sol`). If a later Sol release is available, use it
instead. If the active harness cannot select the requested model or effort,
report the actual model and effort; never claim Sol ran when it did not.

## Workflow

1. Remove `-sol` from the request.
2. Follow the shared workflow in `../SKILL.md`.
3. Keep execution single-agent; do not load optional orchestration instructions
   or delegate to native subagents.
4. Report any model or effort downgrade in the final handoff.
