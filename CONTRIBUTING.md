# Contributing

Thanks for improving Poor Man's Superpowers.

## Scope

Keep changes focused on lightweight, repository-aware Claude Code workflows.
Do not add hooks, MCP servers, network calls, or project runtime dependencies
without first opening an issue to discuss the trade-off.

## Before opening a pull request

1. Describe user-visible behavior and acceptance criteria.
2. Keep skill instructions explicit and testable.
3. Run plugin validation from repository root:

   ```bash
   claude plugin validate . --strict
   node tests/skill-structure.mjs
   ```

4. Update `README.md` when installation or invocation changes.
5. For workflow changes, check both default invocation and explicit
   `/poor-mans-superpowers -astra` behavior. Keep ASTRA-only instructions under
   the skill's `astra/` directory; default mode must not load those files.
   Structural checks do not replace manual host-level invocation checks.
6. Keep ASTRA mode native and independent; do not add an
   `astra-orchestrator` dependency.
7. Update `plugin.json` version and `CHANGELOG.md` for released behavior.

Open an issue first for larger workflow or metadata changes. Pull requests
should explain what changed and how it was validated.
