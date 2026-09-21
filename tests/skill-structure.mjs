import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const skill = new URL('../plugins/poor-mans-superpowers/skills/poor-mans-superpowers/', import.meta.url);
const read = (path) => readFileSync(new URL(path, skill), 'utf8');
const core = read('SKILL.md');
const workflow = read('astra/WORKFLOW.md');
const roles = ['explorer', 'worker', 'tester', 'researcher', 'reviewer'];

// Static prompt checks, not proof of host loading behavior or model compliance.
assert.match(core, /disable-model-invocation: true/);
assert.match(core, /Without an explicit `-astra` invocation flag/);
assert.match(core, /Do not read `astra\/WORKFLOW\.md` or any ASTRA role files/);
assert.match(core, /read \[astra\/WORKFLOW\.md\]\(astra\/WORKFLOW\.md\)/);
assert.doesNotMatch(core, /GPT-6|GPT-5\.6|roles\/|## ASTRA mode/);
assert.ok(core.length < 12000, 'Keep default entry lean; move optional instructions out');
assert.match(workflow, /load only its contract file/);
assert.match(workflow, /at most 3 concurrently active Luna/);
assert.match(workflow, /root\/orchestrator \| GPT-6 Astra \| `medium`/);
assert.match(workflow, /independent reviewer \| GPT-6 Astra \| `low`/);
for (const role of roles.slice(0, -1)) {
  assert.ok(workflow.includes(`| ${role} | GPT-5.6 Luna | \`xhigh\``));
}
assert.deepEqual(readdirSync(new URL('astra/roles/', skill)).sort(), roles.map((role) => `${role}.md`).sort());

for (const path of ['SKILL.md', 'astra/WORKFLOW.md', ...roles.map((role) => `astra/roles/${role}.md`)]) {
  const text = read(path);
  assert.ok(text.trim(), `${path} must not be empty`);
  for (const [, target] of text.matchAll(/\[[^\]]+\]\(([^)]+\.md)\)/g)) {
    assert.ok(readFileSync(new URL(target, new URL(path, skill)), 'utf8').trim());
  }
}
for (const role of roles) {
  assert.ok(workflow.includes(`(roles/${role}.md)`), `${role} must be reachable`);
  assert.doesNotMatch(read(`astra/roles/${role}.md`), /SKILL\.md|WORKFLOW\.md|roles\//,
    'Role contracts must not pull in the orchestration tree');
}
console.log(`Skill structure checks passed; default entry: ${core.length} characters (not tokens).`);
