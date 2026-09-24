import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const project = new URL('../', import.meta.url);
const skill = new URL('plugins/poor-mans-superpowers/skills/poor-mans-superpowers/', project);
const read = (path) => readFileSync(new URL(path, skill), 'utf8');
const core = read('SKILL.md');
const workflow = read('astra/WORKFLOW.md');
const readme = readFileSync(new URL('README.md', project), 'utf8');
const adapterNames = ['claude-code', 'copilot-cli', 'codex-cli', 'pi', 'default'];
for (const name of adapterNames) {
  assert.ok(existsSync(new URL(`astra/harnesses/${name}.md`, skill)), `Missing ${name} adapter`);
}
const adapters = Object.fromEntries(adapterNames.map((name) => [name, read(`astra/harnesses/${name}.md`)]));
const agents = new URL('plugins/poor-mans-superpowers/agents/astra/', project);
const lunaRoles = ['explorer', 'worker', 'tester', 'researcher'];

// Default invocation stays portable and loads no optional harness or ASTRA material.
assert.match(core, /disable-model-invocation: true/);
assert.match(core, /Without an explicit `-astra` invocation flag/);
assert.match(core, /Do not read `astra\/WORKFLOW\.md` or any ASTRA role files/);
assert.match(core, /read \[astra\/WORKFLOW\.md\]\(astra\/WORKFLOW\.md\)/);
assert.doesNotMatch(core, /GPT-\d|roles\/|## ASTRA mode|Copilot CLI|Codex CLI|Pi harness/);
assert.ok(core.length < 12000, 'Keep default entry lean; move optional instructions out');

// ASTRA chooses one host adapter; unrecognized hosts use a safe generic path.
assert.match(workflow, /load exactly one matching adapter/i);
assert.match(workflow, /Do not read.*other adapter/i);
for (const name of adapterNames) {
  assert.ok(workflow.includes(`harnesses/${name}.md`), `Route to ${name} adapter`);
}
assert.match(workflow, /unknown|unrecognized/i);
assert.match(workflow, /default\.md/);

// Host-specific commands and integration details stay inside their own adapter.
assert.match(adapters['claude-code'], /Claude Code/);
assert.match(adapters['claude-code'], /Task/);
assert.match(adapters['claude-code'], /poor-mans-superpowers:astra:reviewer/);
assert.match(adapters['claude-code'], /GPT-6 Luna/);
assert.doesNotMatch(adapters['claude-code'], /pi install npm:pi-subagents|\/fleet|spawn_agent/);

assert.match(adapters['copilot-cli'], /Copilot CLI/);
assert.match(adapters['copilot-cli'], /\/fleet/);
assert.match(adapters['copilot-cli'], /\/tasks/);
assert.doesNotMatch(adapters['copilot-cli'], /poor-mans-superpowers:astra|pi-subagents|spawn_agent/);

assert.match(adapters['codex-cli'], /Codex CLI/);
assert.match(adapters['codex-cli'], /subagent/i);
assert.match(adapters['codex-cli'], /version|configuration|policy/i);
assert.match(adapters['codex-cli'], /current help\/docs/i);
assert.doesNotMatch(adapters['codex-cli'], /Current Codex CLI releases support native subagents/);
assert.doesNotMatch(adapters['codex-cli'], /Use `\/agent` to/);
assert.doesNotMatch(adapters['codex-cli'], /agents live under `\.codex\/agents/);
assert.doesNotMatch(adapters['codex-cli'], /pi-subagents|\/fleet|poor-mans-superpowers:astra/);

assert.match(adapters.pi, /pi install npm:pi-subagents/);
assert.doesNotMatch(adapters.pi, /pi list|--local|Restart Pi after installation/);
assert.match(adapters.pi, /subagents_enable/);
assert.match(adapters.pi, /next\s+model request/i);
assert.match(adapters.pi, /When only `subagents_enable` is available, invoke it/);
assert.match(adapters.pi, /Stop ASTRA only if\s+activation fails/);
assert.doesNotMatch(adapters.pi, /if `pi-subagents` is absent or the `subagent` tool is unavailable, stop ASTRA/i);
assert.match(adapters.pi, /\/subagents-doctor/);
assert.match(adapters.pi, /\/subagents-fleet/);
assert.match(adapters.pi, /`subagent` tool/);
assert.doesNotMatch(adapters.pi, /spawn_agent|poor-mans-superpowers:astra|Copilot CLI/);
assert.match(readme, /Pi does not include subagent orchestration in core/);
assert.match(readme, /pi install npm:pi-subagents/);
assert.doesNotMatch(readme, /pi install --local|pi list|Restart Pi after installation/);
assert.match(readme, /subagents_enable/);
assert.match(readme, /next\s+model request/i);
assert.match(readme, /`\/subagents-doctor`/);
assert.match(readme, /Delegate in plain language/);
assert.match(readme, /`\/subagents-fleet`/);
assert.match(readme, /Codex CLI \| Native subagents if exposed by installed CLI/);
assert.match(readme, /third-party executable code/);
assert.match(readme, /Without that extension, Pi ASTRA stops/);

assert.match(adapters.default, /single-agent/i);
assert.match(adapters.default, /unknown|unrecognized/i);
assert.doesNotMatch(adapters.default, /Task tool|spawn_agent|pi-subagents|\/fleet|poor-mans-superpowers:astra/);

// Claude-only model profiles remain isolated in the Claude adapter and agent files.
const lunaAgentFiles = readdirSync(agents).sort();
assert.deepEqual(lunaAgentFiles, [...lunaRoles, 'reviewer'].map((role) => `${role}.md`).sort());
for (const role of lunaRoles) {
  const agent = readFileSync(new URL(`${role}.md`, agents), 'utf8');
  assert.match(agent, new RegExp(`^name: ${role}$`, 'm'));
  assert.match(agent, /^model: "GPT-6 Luna"$/m);
  assert.match(agent, /^effort: xhigh$/m);
  assert.ok(adapters['claude-code'].includes(`poor-mans-superpowers:astra:${role}`));
  assert.doesNotMatch(agent, /SKILL\.md|WORKFLOW\.md/,
    'Agent prompts must not pull in orchestration files');
}

const reviewer = readFileSync(new URL('reviewer.md', agents), 'utf8');
assert.match(reviewer, /^---\r?\nname: reviewer\r?\n/);
assert.match(reviewer, /^model: gpt-6-astra$/m);
assert.match(reviewer, /^effort: low$/m);
assert.doesNotMatch(reviewer, /SKILL\.md|WORKFLOW\.md/);
assert.doesNotMatch(workflow, /roles\/reviewer\.md/);

// Codex needs its own opt-in policy; other hosts can ignore this sidecar.
const codexMetadata = read('agents/openai.yaml');
assert.match(codexMetadata, /allow_implicit_invocation: false/);

for (const path of ['SKILL.md', 'astra/WORKFLOW.md', ...adapterNames.map((name) => `astra/harnesses/${name}.md`)]) {
  const text = read(path);
  assert.ok(text.trim(), `${path} must not be empty`);
  for (const [, target] of text.matchAll(/\[[^\]]+\]\(([^)]+\.md)\)/g)) {
    assert.ok(readFileSync(new URL(target, new URL(path, skill)), 'utf8').trim(),
      `${path} links to missing or empty ${target}`);
  }
}
console.log(`Skill structure checks passed; default entry: ${core.length} characters (not tokens).`);
