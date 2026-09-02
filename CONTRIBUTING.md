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
   ```

4. Update `README.md` when installation or invocation changes.
5. Update `plugin.json` version and `CHANGELOG.md` for released behavior.

Open an issue first for larger workflow or metadata changes. Pull requests
should explain what changed and how it was validated.
