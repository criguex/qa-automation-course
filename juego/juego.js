import { createWorld, targets } from './mundo.js';
import { ages, questions, createMission, receiveOracle, testAge, catchBug, answerQuestion, completeMission, loadProgress, saveProgress } from './estado.js';

const $ = selector => document.querySelector(selector);
const canvas = $('#world');
const world = createWorld(canvas, interactTarget);
const mission = createMission(loadProgress());
const dialog = $('#dialog');
let started = false;
let voice = false;
let toastUntil = 0;
let lastTime = performance.now();
let lastInteraction = '';
let farUntil = 0;
const objectives = {
  intro: ['Habla con Doña Rosa', 'Sigue la estrella amarilla hasta la heladería.'],
  testing: ['Prueba la máquina de helados', 'Compara cada respuesta con tu hoja. Prueba los bordes: 7, 8, 12 y 13.'],
  chase: ['¡Atrapa al bicho con tu red!', 'Apunta y haz clic para lanzar la red. Corre con Shift. En tablet, lleva el joystick al borde.'],
  report: ['Completa tu ficha de detective', 'Cuenta qué hiciste, qué esperabas y qué pasó.'],
  delivery: ['Lleva la ficha al Inventor', 'Te espera junto al taller verde. Sigue la estrella.'],
  completed: ['¡Misión completada!', 'Ganaste una estrella. Puedes explorar Villa Bichos.']
};

function speak(text) {
  if (!voice || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = .93;
    const spanish = speechSynthesis.getVoices().find(item => item.lang.startsWith('es'));
    if (spanish) utterance.voice = spanish;
    speechSynthesis.speak(utterance);
  } catch {
    voice = false;
    updateVoice();
  }
}

function updateVoice() {
  $('#voice').textContent = voice ? '♫ Voz activada' : '◌ Voz apagada';
  $('#voice').setAttribute('aria-pressed', String(voice));
  $('#voice').setAttribute('aria-label', voice ? 'Silenciar narración' : 'Activar narración');
}

$('#voice').onclick = () => {
  voice = !voice;
  updateVoice();
  if (voice) speak(objectives[mission.stage][0]);
  else if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (started && !dialog.open) canvas.focus({ preventScroll: true });
};
if (!('speechSynthesis' in window)) {
  $('#voice').disabled = true;
  $('#voice').title = 'Este navegador no tiene narración.';
}

function updateHud() {
  const [title, detail] = objectives[mission.stage];
  $('#objective').textContent = title;
  $('#objective-detail').textContent = mission.stage === 'testing' && mission.repeat12 === 1 ? 'Robot Pip: ¡Hazlo otra vez para estar seguro! Repite la edad 12.' : detail;
  $('#stars').textContent = mission.stars;
  $('#notebook').hidden = mission.stage === 'intro';
  $('#notebook').textContent = ['report','delivery','completed'].includes(mission.stage) ? '▤ Mi ficha de detective' : '▤ Mi hoja de respuestas';
  $('#mission-label').textContent = mission.completed ? 'CASO RESUELTO · DETECTIVE NIVEL 1' : 'MISIÓN 01 · UN HELADO CON SORPRESA';
}

function closeDialog() {
  dialog.close();
  world.clearInput();
  canvas.focus({ preventScroll: true });
}

dialog.addEventListener('close', () => {
  world.clearInput();
  canvas.focus({ preventScroll: true });
});

function showDialog({ title, label = 'VILLA BICHOS', avatar = '✳', copy = '', extra = '', actions = [], cards = false, focus }) {
  world.releasePointer();
  $('#dialog-title').textContent = title;
  $('#dialog-label').textContent = label;
  $('#dialog-avatar').textContent = avatar;
  $('#dialog-copy').textContent = copy;
  $('#dialog-extra').innerHTML = extra;
  const container = $('#dialog-actions');
  container.className = cards ? 'cards' : '';
  container.replaceChildren();
  for (const { text, action, secondary = false } of actions) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    if (secondary) button.className = 'secondary';
    button.addEventListener('click', action);
    container.append(button);
  }
  if (!dialog.open) dialog.showModal();
  const focusTarget = focus ? dialog.querySelector(focus) : dialog.querySelector('button');
  focusTarget?.focus({ preventScroll: true });
  speak(`${title}. ${copy}`);
}

function oracleTable() {
  return `<table class="oracle-table"><caption class="eyebrow">El oráculo: nuestra hoja de respuestas</caption><thead><tr><th scope="col">Edad</th><th scope="col">Debe dar helado</th><th scope="col">Mi prueba</th></tr></thead><tbody>${ages.map(age => {
    const test = mission.tests[age];
    const result = test ? `${test.matches ? '✓ Coincide' : '✗ No coincide'}${test.count > 1 ? ` · ${test.count} veces` : ''}` : '— Por probar';
    return `<tr><th scope="row">${age} años</th><td>${age >= 8 && age <= 12 ? 'SÍ' : 'NO'}</td><td class="${test ? test.matches ? 'good' : 'bad' : ''}">${result}</td></tr>`;
  }).join('')}</tbody></table>`;
}

function showOracle() {
  showDialog({
    title: 'La hoja de respuestas', label: 'TU PRIMERA HERRAMIENTA', avatar: '▤',
    copy: 'El oráculo dice lo que debería pasar. Compáralo con la máquina.',
    extra: oracleTable(), actions: [{ text: '¡Voy a probar!', action: closeDialog }]
  });
}

function talkRosa() {
  if (mission.stage !== 'intro') {
    showDialog({ title: 'Doña Rosa', avatar: '🍦', copy: mission.completed ? '¡Gracias, detective! Ahora sabemos dónde está el error. Te ganaste una estrella.' : 'La hoja de respuestas te ayuda. Revisa qué edades deben recibir helado.', actions: [{ text: '¡Entendido!', action: closeDialog }] });
    return;
  }
  showDialog({
    title: 'La heladería de Doña Rosa', label: 'MISIÓN 01', avatar: '🍦',
    copy: 'Mi máquina regala helado a los niños de 8 a 12 años, pero algo anda mal.',
    actions: [{ text: 'Recibir la hoja de respuestas', action: () => {
      receiveOracle(mission);
      updateHud();
      showOracle();
    } }]
  });
}

function showMachine(result = null, age = null) {
  let message = 'Elige una edad. La máquina dirá SÍ o NO.';
  if (result) {
    message = `Edad ${age}: la máquina dice ${result.actual ? 'SÍ. ¡Aquí tienes tu helado!' : 'NO. No hay helado.'} ${result.matches ? '✓ Coincide con el oráculo.' : '✗ No coincide. Robot Pip: ¡Hazlo otra vez para estar seguro!'} `;
  }
  showDialog({
    title: 'La máquina de helados', label: 'PRUEBA · COMPARA · REPITE', avatar: '🍦',
    copy: '¿Cuántos años tiene nuestro visitante?',
    extra: `${oracleTable()}<div class="age-buttons" aria-label="Elige una edad">${ages.map(value => `<button type="button" data-age="${value}" aria-label="Probar edad ${value}">${value}</button>`).join('')}</div><p class="machine-result" role="status">${message}</p>`,
    actions: [{ text: 'Volver a la plaza', action: closeDialog, secondary: true }],
    focus: age ? `[data-age="${age}"]` : '[data-age="7"]'
  });
  for (const button of dialog.querySelectorAll('[data-age]')) button.onclick = () => {
    const selected = Number(button.dataset.age);
    const response = testAge(mission, selected);
    if (!response) return;
    updateHud();
    if (mission.stage === 'chase') {
      showDialog({
        title: '¡Un bicho a la vista!', label: 'PIP · TU ROBOT AYUDANTE', avatar: '🤖',
        copy: '¡Falló dos veces con 12! El bicho salió de la máquina. Acércate, apunta y haz clic para atraparlo con tu red. También puedes pulsar E.',
        extra: '<p class="hint">Puedes correr con Shift. En tablet, empuja el joystick hasta el borde y toca Acción.</p>',
        actions: [{ text: '¡A por el bicho!', action: closeDialog }]
      });
    } else {
      showMachine(response, selected);
      speak(`Edad ${selected}. La máquina dice ${response.actual ? 'sí' : 'no'}. ${response.matches ? 'Coincide con el oráculo.' : 'No coincide. ¡Hazlo otra vez para estar seguro!'}`);
    }
  };
}

function showQuestion(hint = '') {
  const question = questions[mission.quizIndex];
  showDialog({
    title: question.title, label: `FICHA DEL DETECTIVE · ${mission.quizIndex+1} DE 3`, avatar: '🔎',
    copy: 'Elige la tarjeta que cuenta lo que descubriste.',
    extra: hint ? `<p class="hint" role="status">${hint}</p>` : '', cards: true,
    actions: question.options.map((text,index) => ({ text, action: () => {
      if (!answerQuestion(mission,index)) {
        showQuestion(`Vamos otra vez. ${question.hint}`);
        speak(question.hint);
        return;
      }
      updateHud();
      if (mission.stage === 'delivery') showReport();
      else showQuestion();
    } }))
  });
}

function reportContents() {
  return '<div class="report"><strong>Hice:</strong> puse la edad 12, dos veces.<br><strong>Esperaba:</strong> que diera helado.<br><strong>Pasó:</strong> dijo que no.</div>';
}

function showReport() {
  showDialog({
    title: mission.completed ? 'Una estrella bien ganada' : '¡Ficha lista!', label: 'TU INFORME DEL BICHO', avatar: mission.completed ? '★' : '▤',
    copy: mission.completed ? 'Los bichos se esconden en los bordes: 8 y 12.' : 'Ahora el Inventor puede entender el error. Lleva tu ficha al taller verde.',
    extra: reportContents(), actions: [{ text: mission.completed ? 'Seguir explorando' : 'Ir al Taller del Inventor', action: closeDialog }]
  });
}

function talkInventor() {
  if (mission.stage !== 'delivery') {
    showDialog({ title: 'El Inventor Leo', avatar: '🔧', copy: mission.completed ? 'Tu ficha explica cómo repetir el error. ¡Así podemos arreglarlo! La próxima aventura aún está en construcción.' : 'Cuando atrapes al bicho, trae una ficha con lo que pasó. ¡Estoy listo para ayudarte!', actions: [{ text: 'Volver a la plaza', action: closeDialog }] });
    return;
  }
  showDialog({
    title: '¡Buen trabajo, detective!', label: 'TALLER DEL INVENTOR', avatar: '🔧',
    copy: 'Con tu ficha puedo repetir el error y arreglar la máquina.', extra: reportContents(),
    actions: [{ text: 'Entregar la ficha', action: () => {
      if (!completeMission(mission)) return;
      saveProgress(mission);
      world.celebrate();
      updateHud();
      showDialog({
        title: '¡Misión completada!', label: '★ GANASTE 1 ESTRELLA', avatar: '★',
        copy: 'Los bichos se esconden en los bordes: 8 y 12.',
        extra: '<div class="report">Usaste un <strong>oráculo</strong> para comparar.<br><strong>Repetiste</strong> la prueba para estar seguro.<br>Contaste lo que hiciste, esperabas y pasó.</div><p>Tu próxima aventura: <strong>Próximamente 🔒</strong></p>',
        actions: [{ text: 'Explorar Villa Bichos', action: closeDialog }]
      });
    } }]
  });
}

function distance(target) {
  return Math.hypot(world.player.position.x-target.x,world.player.position.z-target.z);
}

function interactTarget(name) {
  if (!started || dialog.open) return;
  const point = name === 'bug' ? world.bug.position : targets[name];
  if (!point) return;
  if (name === 'bug' ? distance(point) > 2.15 : distance(point) >= 2.2) {
    farUntil = performance.now()+1800;
    return;
  }
  farUntil = 0;
  if (name === 'rosa') talkRosa();
  else if (name === 'machine' && mission.stage === 'testing') showMachine();
  else if (name === 'inventor') talkInventor();
  else if (name === 'bug' && mission.stage === 'chase') captureBug();
  else if (name === 'future' && mission.completed) showFuture();
}

function captureBug() {
  if (distance(world.bug.position)>2.15 || !catchBug(mission)) return;
  updateHud();
  showQuestion();
}

function showFuture() {
  showDialog({ title: 'Próximamente', label: 'MISIÓN 02 · BLOQUEADA', avatar: '🔒', copy: 'El Inventor está preparando otra aventura. ¡Vuelve pronto, detective!', actions: [{ text: 'Seguir explorando', action: closeDialog }] });
}

function interaction() {
  if (mission.stage === 'chase') {
    return distance(world.bug.position) <= 2.15 ? { text: 'Clic / E · ¡Atrapar al bicho!', action: captureBug } : null;
  }
  if (mission.stage === 'report') return { text: 'E · Completar mi ficha', action: () => showQuestion() };
  if (distance(targets.rosa)<2.2) return { text: 'E · Hablar con Doña Rosa', action: talkRosa };
  if (distance(targets.machine)<2.2 && mission.stage === 'testing') return { text: 'E · Probar la máquina', action: () => showMachine() };
  if (distance(targets.inventor)<2.2) return { text: mission.stage === 'delivery' ? 'E · Entregar la ficha' : 'E · Hablar con el Inventor', action: talkInventor };
  if (mission.completed && distance(targets.future)<2.2) return { text: 'E · Próxima aventura', action: showFuture };
  return null;
}

function interact() {
  if (!started || dialog.open) return;
  const nearby = interaction();
  if (nearby) nearby.action();
  else {
    $('#toast').textContent = mission.stage === 'chase' ? '¡Un poquito más cerca! Tu red alcanza al bicho cuando estás junto a él.' : 'Sigue la estrella amarilla. Acércate para hablar o probar.';
    $('#toast').hidden = false;
    toastUntil = performance.now()+2500;
  }
}

$('#prompt').onclick = interact;
$('#touch-action').onclick = () => { interact(); if (!dialog.open) canvas.focus({ preventScroll: true }); };
$('#notebook').onclick = () => {
  if (mission.stage === 'report') showQuestion();
  else if (['delivery','completed'].includes(mission.stage)) showReport();
  else showOracle();
};
window.addEventListener('keydown', event => {
  if (event.key.toLowerCase() === 'e' && !event.repeat && !event.target.closest('dialog,button')) {
    event.preventDefault();
    interact();
  }
});

$('#play').onclick = () => {
  started = true;
  $('#start').hidden = true;
  $('#hud').hidden = false;
  $('#touch-controls').hidden = false;
  updateHud();
  canvas.focus({ preventScroll: true });
  speak(`Bienvenido a Villa Bichos. ${objectives[mission.stage][0]}.`);
};
$('#play').disabled = false;
$('#play').textContent = mission.completed ? 'Volver a la plaza →' : 'Jugar →';
$('#load-note').textContent = mission.completed ? 'Tu estrella sigue aquí. ¡Bienvenido de nuevo!' : 'Sin prisas. Sin perder vidas. Con mucha curiosidad.';
updateHud();

function missionTarget() {
  if (mission.stage === 'intro') return targets.rosa;
  if (mission.stage === 'testing') return targets.machine;
  if (mission.stage === 'chase') return world.bug.position;
  if (mission.stage === 'delivery') return targets.inventor;
  if (mission.stage === 'completed') return targets.future;
  return null;
}

function frame(time) {
  const dt = Math.min((time-lastTime)/1000,.05);
  lastTime = time;
  world.tick(dt, { active: started && !dialog.open && !document.hidden, chasing: mission.stage === 'chase', target: missionTarget(), completed: mission.completed });
  const nearby = started && !dialog.open ? interaction() : null;
  const text = started && !dialog.open && time < farUntil ? 'Acércate más' : nearby?.text ?? '';
  if (text !== lastInteraction) {
    $('#prompt').textContent = text;
    $('#prompt').hidden = !text;
    lastInteraction = text;
  }
  if (toastUntil && time>toastUntil) { $('#toast').hidden = true; toastUntil=0; }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

if (new URLSearchParams(location.search).get('test') === '1') {
  window.cazabichosTest = Object.freeze({
    snapshot: () => structuredClone({ ...mission, started, player: { x: world.player.position.x, z: world.player.position.z }, bug: { x: world.bug.position.x, z: world.bug.position.z }, targets, camera: world.getCamera(), ...world.getInput(), dialog: dialog.open ? $('#dialog-title').textContent : null, drawCalls: world.renderer.info.render.calls }),
    moveTo: (x,z) => world.moveTo(x,z),
    canStand: (x,z) => world.canStand(x,z),
    setCamera: yaw => world.setCamera(yaw),
    look: (dx,dy) => world.look(dx,dy),
    clickAt: (x,y) => world.clickAt(x,y),
    aimAt: name => world.aimAt(name)
  });
}
