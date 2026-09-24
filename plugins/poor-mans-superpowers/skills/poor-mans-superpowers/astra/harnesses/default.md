# Generic harness fallback

Use this adapter when the active harness is unknown, unsupported, or uncertain.
Do not load another harness adapter or call a guessed host-specific tool.

Use the shared single-agent quality workflow only. If the user explicitly
requested `-astra`, explain that no verified adapter is available and ask
whether they want to continue without delegation or identify a supported
harness. Do not imply subagents ran.
