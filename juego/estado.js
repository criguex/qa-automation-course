export const ages = [7, 8, 10, 12, 13];
export const questions = [
  {
    title: '¿Qué hiciste?',
    options: ['Puse la edad 12, dos veces.', 'Probé todas las edades del mundo.', 'Apagué la máquina de helados.'],
    answer: 0,
    hint: 'Recuerda: repetiste la misma edad para comprobar el error.'
  },
  {
    title: '¿Qué esperabas?',
    options: ['Que sonara una canción.', 'Que diera helado.', 'Que la máquina dijera que no.'],
    answer: 1,
    hint: 'Mira el oráculo: los niños de 12 años sí deben recibir helado.'
  },
  {
    title: '¿Qué pasó?',
    options: ['Me dio dos helados.', 'La máquina desapareció.', 'Dijo que no.'],
    answer: 2,
    hint: 'La máquina no dio helado, aunque la hoja decía que sí.'
  }
];

export function loadProgress(storage) {
  try {
    const saved = JSON.parse((storage ?? globalThis.localStorage).getItem('cazabichos-v1'));
    return { completed: saved?.completed === true, stars: saved?.completed === true ? 1 : 0 };
  } catch {
    return { completed: false, stars: 0 };
  }
}

export function saveProgress(state, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem('cazabichos-v1', JSON.stringify({ completed: state.completed, stars: state.stars }));
    return true;
  } catch {
    return false;
  }
}

export function createMission(progress = { completed: false }) {
  return { stage: progress.completed === true ? 'completed' : 'intro', completed: progress.completed === true, stars: progress.completed === true ? 1 : 0, tests: {}, repeat12: 0, quizIndex: 0 };
}

export function receiveOracle(state) {
  if (state.stage !== 'intro') return false;
  state.stage = 'testing';
  return true;
}

export function testAge(state, age) {
  if (state.stage !== 'testing' || !ages.includes(age)) return null;
  const expected = age >= 8 && age <= 12;
  const actual = age >= 8 && age < 12;
  const count = (state.tests[age]?.count ?? 0) + 1;
  const result = { expected, actual, matches: expected === actual, count };
  state.tests[age] = result;
  if (age === 12) {
    state.repeat12++;
    if (state.repeat12 >= 2) state.stage = 'chase';
  }
  return result;
}

export function catchBug(state) {
  if (state.stage !== 'chase') return false;
  state.stage = 'report';
  return true;
}

export function answerQuestion(state, choice) {
  if (state.stage !== 'report' || choice !== questions[state.quizIndex].answer) return false;
  state.quizIndex++;
  if (state.quizIndex === questions.length) state.stage = 'delivery';
  return true;
}

export function completeMission(state) {
  if (state.stage !== 'delivery') return false;
  state.stage = 'completed';
  state.completed = true;
  state.stars = 1;
  return true;
}
