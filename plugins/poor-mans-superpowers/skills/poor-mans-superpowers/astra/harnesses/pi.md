# Pi adapter

Use only inside Pi. Pi core does not provide subagent orchestration. ASTRA
requires the separately installed `pi-subagents` extension; installing this
skill does not install that extension.

Install it only when user explicitly wants Pi subagents and trusts the package:

```sh
pi install npm:pi-subagents
```

If the extension does not appear in the current session, start a fresh Pi
session and run `/subagents-doctor` to check setup.

Delegation loads lazily. When only `subagents_enable` is available, invoke it;
the `subagent` tool becomes available on the next model request. Stop ASTRA only if
activation fails or `subagent` remains unavailable after that. Ask Pi in plain
language, for example: “Use scout to inspect this flow, then worker to implement
my approved change, then reviewer to check the diff.” Keep the root in charge
of decisions and writes. Use `/subagents-fleet` to inspect active work and
`/subagents-doctor` to diagnose setup.

If `pi-subagents` is absent, report the install steps. Do not install it
automatically or imitate another harness's tools. The shared single-agent
workflow still works without this extension.
