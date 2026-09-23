import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const skill = new URL('../plugins/poor-mans-superpowers/skills/poor-mans-superpowers/', import.meta.url);
const read = (path) => readFileSync(new URL(path, skill), 'utf8');
const core = read('SKILL.md');
const workflow = read('astra/WORKFLOW.md');
const agents = new URL('../plugins/poor-mans-superpowers/agents/astra/', import.meta.url);
const lunaRoles = ['explorer', 'worker', 'tester', 'researcher'];

// Static prompt checks, not proof of host loading behavior or model compliance.
assert.match(core, /disable-model-invocation: true/);
assert.match(core, /Without an explicit `-astra` invocation flag/);
assert.match(core, /Do not read `astra\/WORKFLOW\.md` or any ASTRA role files/);
assert.match(core, /read \[astra\/WORKFLOW\.md\]\(astra\/WORKFLOW\.md\)/);
assert.doesNotMatch(core, /GPT-\d|roles\/|## ASTRA mode/);
assert.ok(core.length < 12000, 'Keep default entry lean; move optional instructions out');
assert.match(workflow, /Luna roles are registered plugin agents/);
assert.match(workflow, /at most 3 concurrently active Luna/);
assert.match(workflow, /root\/orchestrator \| latest available Astra model \| `medium`/);
assert.match(workflow, /independent reviewer \| gpt-6-astra \| `low` \| `poor-mans-superpowers:astra:reviewer`/);
assert.deepEqual(readdirSync(agents).sort(), [...lunaRoles, 'reviewer'].map((role) => `${role}.md`).sort());
for (const role of lunaRoles) {
  const agent = readFileSync(new URL(`${role}.md`, agents), 'utf8');
  assert.match(agent, new RegExp(`^name: ${role}$`, 'm'));
  assert.match(agent, /^model: "GPT-6 Luna"$/m);
  assert.match(agent, /^effort: xhigh$/m);
  assert.ok(workflow.includes(`| ${role} | GPT-6 Luna | \`xhigh\` | \`poor-mans-superpowers:astra:${role}\``));
  assert.doesNotMatch(agent, /SKILL\.md|WORKFLOW\.md/,
    'Agent prompts must not pull in orchestration files');
}

const reviewer = readFileSync(new URL('reviewer.md', agents), 'utf8');
assert.match(reviewer, /^---\r?\nname: reviewer\r?\n/);
assert.match(reviewer, /^model: gpt-6-astra$/m);
assert.match(reviewer, /^effort: low$/m);
assert.doesNotMatch(reviewer, /SKILL\.md|WORKFLOW\.md/);
assert.doesNotMatch(workflow, /roles\/reviewer\.md/);

for (const path of ['SKILL.md', 'astra/WORKFLOW.md']) {
  const text = read(path);
  assert.ok(text.trim(), `${path} must not be empty`);
  for (const [, target] of text.matchAll(/\[[^\]]+\]\(([^)]+\.md)\)/g)) {
    assert.ok(readFileSync(new URL(target, new URL(path, skill)), 'utf8').trim());
  }
}
assert.ok(workflow.includes('Spawn `poor-mans-superpowers:astra:reviewer`'),
  'Review step must dispatch the registered reviewer');
console.log(`Skill structure checks passed; default entry: ${core.length} characters (not tokens).`);
