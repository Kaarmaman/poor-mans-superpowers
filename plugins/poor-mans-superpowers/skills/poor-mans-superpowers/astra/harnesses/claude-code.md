# Claude Code adapter

Use only when this skill runs inside Claude Code. Claude's `Task` subagents and
plugin-scoped agents belong to this adapter; they are not portable commands.

## Delegation

When installed as the PMSP Claude plugin, call its registered roles by scoped
name:

- `poor-mans-superpowers:astra:explorer`
- `poor-mans-superpowers:astra:worker`
- `poor-mans-superpowers:astra:tester`
- `poor-mans-superpowers:astra:researcher`
- `poor-mans-superpowers:astra:reviewer`

The four Luna roles use GPT-6 Luna at `xhigh`; the independent reviewer uses
`gpt-6-astra` at `low`. Keep no more than three Luna children active at once.
The root model comes from the Claude Code session and cannot be changed by this
skill. Report actual model/effort when unavailable or downgraded.

If only the portable skill is installed and these plugin agents are absent,
use Claude Code's native `Task` capability with bounded role prompts. Do not
claim plugin profiles ran. If native subagents are unavailable, stop ASTRA and
report the missing capability.
