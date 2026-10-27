import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('./estado.js', import.meta.url), 'utf8');
const { createMission, receiveOracle, testAge, catchBug, answerQuestion, completeMission, loadProgress, saveProgress } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const mission = createMission();
assert.equal(testAge(mission, 12), null);
assert.equal(catchBug(mission), false);
assert.equal(completeMission(mission), false);
assert.equal(receiveOracle(mission), true);
assert.equal(receiveOracle(mission), false);
assert.equal(testAge(mission, '12'), null);
assert.equal(testAge(mission, 9), null);
for (const [age, expected] of [[7,false],[8,true],[10,true],[13,false]]) {
  assert.deepEqual(testAge(mission, age), { expected, actual: expected, matches: true, count: 1 });
}
assert.deepEqual(testAge(mission, 12), { expected: true, actual: false, matches: false, count: 1 });
assert.equal(mission.stage, 'testing');
assert.equal(mission.repeat12, 1);
assert.equal(catchBug(mission), false);
assert.equal(testAge(mission, 8).matches, true);
assert.equal(mission.stage, 'testing');
assert.equal(testAge(mission, 12).count, 2);
assert.equal(mission.stage, 'chase');
assert.equal(testAge(mission, 12), null);
assert.equal(catchBug(mission), true);
for (const [wrong, right] of [[1,0],[2,1],[0,2]]) {
  const before = mission.quizIndex;
  assert.equal(answerQuestion(mission, wrong), false);
  assert.equal(mission.quizIndex, before);
  assert.equal(answerQuestion(mission, right), true);
}
assert.equal(mission.stage, 'delivery');
assert.equal(answerQuestion(mission, 2), false);
assert.equal(completeMission(mission), true);
assert.equal(mission.completed, true);
assert.equal(mission.stars, 1);
assert.equal(completeMission(mission), false);
let saved = null;
const storage = { getItem: () => saved, setItem: (key, value) => { saved = value; } };
assert.equal(saveProgress(mission, storage), true);
assert.deepEqual(loadProgress(storage), { completed: true, stars: 1 });
assert.equal(createMission(loadProgress(storage)).stage, 'completed');
saved = '{invalid';
assert.deepEqual(loadProgress(storage), { completed: false, stars: 0 });
saved = '{"completed":"true","stars":999}';
assert.deepEqual(loadProgress(storage), { completed: false, stars: 0 });
const denied = { getItem() { throw new Error('Storage bloqueado'); }, setItem() { throw new Error('Storage bloqueado'); } };
assert.deepEqual(loadProgress(denied), { completed: false, stars: 0 });
assert.equal(saveProgress(mission, denied), false);
assert.equal(mission.completed, true);
console.log('Cazabichos: misión completa, bordes, repetición, reintentos y almacenamiento verificados.');
