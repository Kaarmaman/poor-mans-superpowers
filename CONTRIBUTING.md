# Contributing

Thanks for improving Poor Man's Superpowers.

## Scope

Keep changes focused on the portable, user-invoked quality workflow and its
harness adapters. Do not add hooks, MCP servers, network calls, or project
runtime dependencies without first opening an issue to discuss the trade-off.

## Before opening a pull request

1. Describe user-visible behavior and acceptance criteria.
2. Keep shared instructions host-neutral. Put host-specific commands, tools,
   and setup in exactly one file under `astra/harnesses/`.
3. Preserve default-mode isolation: it must not load ASTRA or harness adapters.
   ASTRA must select one adapter and use the generic fallback for unknown hosts.
4. Keep Claude plugin agents under `plugins/poor-mans-superpowers/agents/`;
   do not reference those profiles from other adapters.
5. Document optional runtime add-ons explicitly. In particular, Pi subagent
   orchestration requires the separately installed `pi-subagents` extension.
6. Run validation from repository root:

   ```bash
   node tests/skill-structure.mjs
   claude plugin validate . --strict
   ```

7. Check both default invocation and explicit `-astra` routing. Manually test
   each changed host adapter when that harness is available; report untested
   hosts.
8. Update `README.md` when installation, invocation, or harness support changes.
   Update `plugin.json` version and `CHANGELOG.md` for released behavior.

Open an issue first for larger workflow or metadata changes. Pull requests
should explain what changed and how it was validated. Structural checks do not
replace manual host-level invocation checks.
