import * as THREE from 'three';

export const targets = {
  rosa: { x: -8, z: -6.4 },
  machine: { x: -4.6, z: -6.4 },
  inventor: { x: 9, z: -6.4 },
  future: { x: 10, z: 9 }
};

export function createWorld(canvas, interactTarget) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#c6e7ed');
  scene.fog = new THREE.Fog('#c6e7ed', 32, 65);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const camera = new THREE.PerspectiveCamera(48, 1, .1, 100);
  scene.add(new THREE.HemisphereLight('#fff8df', '#719f9c', 2.3));
  const sun = new THREE.DirectionalLight('#fff3d6', 3);
  sun.position.set(-10, 24, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -23, right: 23, top: 23, bottom: -23, near: 1, far: 65 });
  sun.shadow.normalBias = .06;
  scene.add(sun);
  const materials = new Map();
  const colliders = [];
  const houses = [];
  const material = color => {
    if (!materials.has(color)) materials.set(color, new THREE.MeshStandardMaterial({ color, roughness: .95, flatShading: true }));
    return materials.get(color);
  };
  function mesh(geometry, color, x, y, z, parent = scene) {
    const item = new THREE.Mesh(geometry, material(color));
    item.position.set(x, y, z);
    item.castShadow = true;
    item.receiveShadow = true;
    parent.add(item);
    return item;
  }
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const ballGeometry = new THREE.IcosahedronGeometry(1, 1);
  const faceGeometry = new THREE.SphereGeometry(1, 12, 10);
  const smileGeometry = new THREE.TorusGeometry(.125, .022, 4, 12, Math.PI);
  const glassesGeometry = new THREE.TorusGeometry(.15, .025, 6, 16);
  function box(w, h, d, color, x, y, z, parent) {
    const item = mesh(boxGeometry, color, x, y, z, parent);
    item.scale.set(w, h, d);
    return item;
  }
  function ball(r, color, x, y, z, parent) {
    const item = mesh(ballGeometry, color, x, y, z, parent);
    item.scale.setScalar(r);
    return item;
  }
  function round(r, color, x, y, z, parent) {
    const item = mesh(faceGeometry, color, x, y, z, parent);
    item.scale.setScalar(r);
    return item;
  }
  function cylinder(top, bottom, h, color, x, y, z, parent, segments = 10) {
    return mesh(new THREE.CylinderGeometry(top, bottom, h, segments), color, x, y, z, parent);
  }
  function obstacle(x, z, w, d, height = 4) {
    colliders.push(new THREE.Box3(new THREE.Vector3(x - w / 2, 0, z - d / 2), new THREE.Vector3(x + w / 2, height, z + d / 2)));
  }
  const labels = [];
  function label(text, x, y, z) {
    const element = document.createElement('span');
    element.className = 'world-label';
    element.textContent = text;
    element.setAttribute('aria-hidden', 'true');
    document.body.append(element);
    const item = { element, position: new THREE.Vector3(x,y,z), visible: true, distance: 0, rect: null, shown: false };
    labels.push(item);
    return item;
  }
  const signGeometry = new THREE.PlaneGeometry(1, 1);
  function sign(text, width, depth, parent) {
    const surface = document.createElement('canvas');
    surface.width = 1024;
    surface.height = 112;
    const ctx = surface.getContext('2d');
    ctx.fillStyle = '#fffdf4';
    ctx.beginPath();
    ctx.roundRect(6, 7, 1012, 96, 22);
    ctx.fill();
    ctx.fillStyle = '#071b2b';
    ctx.font = 'bold 48px Trebuchet MS, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 512, 58, 970);
    const texture = new THREE.CanvasTexture(surface);
    texture.colorSpace = THREE.SRGBColorSpace;
    const board = new THREE.Mesh(signGeometry, new THREE.MeshStandardMaterial({ map: texture, roughness: .95, transparent: true }));
    board.position.set(0,2.55,depth/2+.24);
    board.scale.set(width-.5,.48,1);
    parent.add(board);
  }
  box(150, .3, 150, '#b1cfa3', 0, -.42, 0);
  box(36, .4, 32, '#add5a1', 0, -.2, 0);
  box(13, .06, 29, '#f3ddaf', 0, .02, 0);
  box(31, .07, 8, '#f3ddaf', 0, .03, -5.2);
  cylinder(7.7, 7.7, .08, '#f3ddaf', 0, .04, 1, scene, 32);
  for (let i = 0; i < 11; i++) {
    box(.12, .015, 27, '#e7cfa2', -5.5 + i * 1.1, .07, 0);
  }
  for (let i = 0; i < 15; i++) box(12, .015, .1, '#e7cfa2', 0, .075, -13 + i * 1.8);
  for (const z of [-15.7, 15.7]) {
    box(35.7, .55, .35, '#faf0d7', 0, .38, z);
    for (let x = -17.5; x < 18; x += 2) box(.3, .9, .45, '#fff5df', x, .45, z);
  }
  for (const x of [-17.7, 17.7]) {
    box(.35, .55, 31.4, '#faf0d7', x, .38, 0);
    for (let z = -15.5; z < 16; z += 2) box(.45, .9, .3, '#fff5df', x, .45, z);
  }
  function house(x, z, color, roofColor, width = 4, depth = 4, title) {
    const group = new THREE.Group();
    scene.add(group);
    group.position.set(x, 0, z);
    box(width, 3.1, depth, color, 0, 1.55, 0, group);
    box(width + .3, .3, depth + .3, '#fff3dd', 0, .23, 0, group);
    const roof = cylinder(0, width * .84, 1.65, roofColor, 0, 3.7, 0, group, 4);
    roof.rotation.y = Math.PI / 4;
    roof.scale.z = depth / width;
    box(.95, 1.85, .12, '#326c73', 0, .95, depth / 2 + .08, group);
    ball(.065, '#ffe491', .3, .9, depth / 2 + .16, group);
    for (const side of [-1, 1]) {
      box(.95, .95, .12, '#fff6df', side * width * .32, 1.85, depth / 2 + .08, group);
      box(.7, .72, .14, '#76c8d6', side * width * .32, 1.85, depth / 2 + .13, group);
      box(.06, .75, .16, '#fff6df', side * width * .32, 1.85, depth / 2 + .2, group);
    }
    obstacle(x, z, width + .2, depth + .2, 4.6);
    houses.push({ x, z, w: width, d: depth, color });
    if (title) sign(title, width, depth, group);
    return group;
  }
  house(-13, 2, '#f2b683', '#de7858');
  house(-13, 10.5, '#b9b5e8', '#8975bc');
  house(13, 2, '#f4d58b', '#df9560');
  house(13, 11, '#9dcfd2', '#4d9da9');
  const iceShop = house(-8, -11.5, '#f4b8b4', '#e46b7b', 5.6, 4.7, 'HELADERÍA · DOÑA ROSA');
  for (let i = 0; i < 7; i++) box(.82, .24, 1.1, i % 2 ? '#fff6df' : '#e6758c', -2.46 + i * .82, 2.14, 2.75, iceShop);
  cylinder(.48, 0, 1.35, '#d6a46c', 0, 5, 0, iceShop);
  ball(.64, '#ffccdb', 0, 5.95, 0, iceShop);
  ball(.5, '#a0ecc9', -.23, 6.25, 0, iceShop);
  const workshop = house(9, -11.5, '#8ac8ba', '#4d8e97', 6, 4.7, 'TALLER DEL INVENTOR');
  box(.6, 1.5, .65, '#dfb971', 1.65, 4.3, 0, workshop);
  const gear = mesh(new THREE.TorusGeometry(.65, .2, 6, 12), '#ffe08f', 0, 4.1, 2.5, workshop);
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    const tooth = box(.32, .32, .32, '#ffe08f', Math.cos(a) * .8, 4.1 + Math.sin(a) * .8, 2.5, workshop);
    tooth.rotation.z = a;
  }
  function tree(x, z, size = 1) {
    cylinder(.2, .28, 1.9 * size, '#997853', x, .95 * size, z);
    const crown = ball(1.2 * size, '#5aa985', x, 2.8 * size, z);
    crown.scale.y *= 1.18;
    ball(.7 * size, '#83c48c', x - .6 * size, 2.4 * size, z + .25);
    obstacle(x, z, .7, .7, 2);
  }
  [[-15.7,-7],[-1.5,-12.5],[3,-12.7],[15.5,-6.5],[-9,5.6],[9,5.5],[-6.8,13.3],[6.7,13.2]].forEach(([x,z],i) => tree(x,z,.85 + i % 3 * .12));
  for (const [x, z] of [[-15,-13],[15,-13],[-16,14],[16,14],[-9,7.7],[9,7.7]]) {
    box(1.8, .4, 1.2, '#c59272', x, .2, z);
    ball(.65, '#6bb080', x - .35, .65, z);
    ball(.65, '#6bb080', x + .35, .65, z);
    ball(.17, '#ffdb7d', x, 1.25, z);
    obstacle(x, z, 1.8, 1.2, 1.4);
  }
  cylinder(1.9, 2.1, .45, '#bdc6bd', 0, .22, .5, scene, 16);
  cylinder(1.65, 1.65, .1, '#7acddd', 0, .48, .5, scene, 24);
  cylinder(.35, .6, 1.3, '#ecddba', 0, 1, .5);
  cylinder(1, .85, .2, '#f6e9c7', 0, 1.6, .5);
  ball(.32, '#91dfe6', 0, 1.98, .5);
  obstacle(0, .5, 3.8, 3.8, 2.2);
  for (const [x,z] of [[-6,3.7],[6,3.7]]) {
    box(2.3,.2,.65,'#c28d60',x,.6,z);
    box(2.3,.55,.15,'#d7a879',x,1,z+.3);
    for (const dx of [-.85,.85]) box(.13,.7,.6,'#465d60',x+dx,.35,z);
    obstacle(x,z,2.3,.9,1.3);
  }
  function person(shirt, skin = '#e3b389') {
    const group = new THREE.Group();
    box(.65,.8,.42,shirt,0,1.03,0,group);
    round(.5,skin,0,1.83,0,group);
    const legs = [-.19,.19].map(x => {
      const leg = new THREE.Group();
      leg.position.set(x,.72,0);
      box(.23,.59,.26,'#25445d',0,-.24,0,leg);
      box(.27,.18,.42,'#fff0d3',0,-.52,.08,leg);
      group.add(leg);
      return leg;
    });
    const arms = [-.47,.47].map(x => {
      const arm = new THREE.Group();
      arm.position.set(x,1.34,0);
      box(.2,.52,.25,shirt,0,-.15,0,arm);
      round(.13,skin,0,-.43,0,arm);
      group.add(arm);
      return arm;
    });
    const eyes = [-.18,.18].map(x => {
      const eye = new THREE.Group();
      eye.position.set(x,1.88,.45);
      const white = round(.12,'#fffdf4',0,0,0,eye);
      white.scale.set(.12,.145,.075);
      round(.068,'#17283c',0,0,.075,eye);
      round(.024,'#ffffff',-.022,.03,.132,eye);
      group.add(eye);
      const cheek = round(.09,'#ec9c97',x*1.7,1.68,.4,group);
      cheek.scale.z *= .35;
      return eye;
    });
    round(.06,skin,0,1.76,.5,group);
    const smile = mesh(smileGeometry,'#9a4b40',0,1.68,.48,group);
    smile.rotation.z = Math.PI;
    scene.add(group);
    return { group, legs, arms, eyes, near: false, greeting: 0 };
  }
  const rosa = person('#fff1dc');
  round(.5,'#bec7cc',0,1.92,-.13,rosa.group);
  for (const x of [-.27,0,.27]) round(.21,'#dce2e3',x,2.18+(x === 0 ? .08 : 0),.18,rosa.group);
  round(.25,'#bec7cc',0,2.4,-.18,rosa.group);
  cylinder(.36,.46,.55,'#d87596',0,.77,0,rosa.group);
  box(.5,.65,.08,'#ef9bb6',0,1,.25,rosa.group);
  for (const x of [-.19,.19]) box(.07,.4,.07,'#ef9bb6',x,1.28,.23,rosa.group);
  box(.25,.17,.045,'#ffe2e9',0,.88,.31,rosa.group);
  rosa.group.position.set(-8,0,-8);
  label('Doña Rosa',-8,2.95,-8);
  const inventor = person('#fffdf4','#b67c59');
  round(.48,'#d8e3e7',0,1.96,-.16,inventor.group);
  for (const [x,y,z,tilt] of [[-.4,2.15,0,-.8],[-.22,2.33,.03,-.4],[0,2.38,0,.2],[.25,2.3,.04,.5],[.43,2.13,-.02,1]]) {
    const tuft = round(.2,'#eaf1ef',x,y,z,inventor.group);
    tuft.scale.set(.15,.28,.18);
    tuft.rotation.z = -tilt;
  }
  for (const x of [-.18,.18]) {
    mesh(glassesGeometry,'#32566b',x,1.88,.595,inventor.group);
    box(.15,.16,.05,'#c9ddd9',x, .88,.24,inventor.group);
    box(.28,.48,.45,'#fffdf4',x,.62,0,inventor.group);
  }
  box(.08,.035,.035,'#32566b',0,1.88,.595,inventor.group);
  box(.15,.38,.05,'#72c5b3',0,1.23,.24,inventor.group);
  box(.035,.43,.04,'#c9ddd9',0,.92,.24,inventor.group);
  inventor.group.position.set(9,0,-8);
  label('Inventor Leo',9,2.95,-8);
  const machine = new THREE.Group();
  machine.position.set(-4.6,0,-8.2);
  scene.add(machine);
  box(1.25,1.9,1.1,'#86d9ca',0,.95,0,machine);
  box(1.4,.3,1.2,'#ffde8e',0,2,0,machine);
  box(.9,.55,.08,'#254857',0,1.45,.58,machine);
  box(.64,.5,.1,'#fff8e5',0,.6,.59,machine);
  cylinder(.13,.13,.3,'#a0b5b4',0,.99,.68,machine);
  ball(.12,'#e47685',.45,.9,.6,machine);
  obstacle(-4.6,-8.2,1.25,1.1,2.2);
  label('PRUEBA AQUÍ',-4.6,2.65,-8.2);
  const player = person('#fff1d8');
  round(.47,'#694a37',0,1.88,-.12,player.group);
  for (const x of [-.36,.36]) round(.18,'#694a37',x,2.02,.1,player.group);
  const cap = round(.44,'#e6b777',0,2.2,-.02,player.group);
  cap.scale.y *= .55;
  cylinder(.47,.47,.07,'#c3925d',0,2.18,.02,player.group);
  box(.5,.07,.35,'#e6b777',0,2.18,.34,player.group);
  box(.68,.69,.46,'#55dfbd',0,1.04,0,player.group);
  box(.1,.62,.035,'#fff1d8',0,1.05,.25,player.group);
  for (const x of [-.23,.23]) box(.14,.15,.04,'#2ca184',x,.94,.26,player.group);
  player.group.position.set(0,0,8);
  player.group.rotation.y = Math.PI;
  box(.6,.58,.25,'#cf9b5c',0,1.1,-.32,player.group);
  const net = new THREE.Group();
  net.position.set(0,-.43,.07);
  net.rotation.z = -.3;
  cylinder(.035,.035,1.15,'#99734e',0,.4,0,net);
  mesh(new THREE.TorusGeometry(.36,.035,5,16),'#fff6d8',0,1.2,0,net);
  for (const p of [-.18,0,.18]) {
    box(.015,.6,.015,'#e5ece2',p,1.2,0,net);
    box(.6,.015,.015,'#e5ece2',0,1.2+p,0,net);
  }
  player.arms[1].add(net);
  const robot = new THREE.Group();
  box(.5,.45,.45,'#fff8df',0,.2,0,robot);
  box(.6,.4,.45,'#ffdb76',0,.68,0,robot);
  box(.44,.22,.05,'#254857',0,.68,.24,robot);
  for (const x of [-.12,.12]) ball(.045,'#55dfbd',x,.7,.28,robot);
  cylinder(.025,.025,.2,'#567681',0,.97,0,robot);
  ball(.075,'#ee8c9e',0,1.1,0,robot);
  scene.add(robot);
  const bug = new THREE.Group();
  const bugBody = ball(.57,'#a27bd5',0,.62,0,bug);
  bugBody.scale.z = .85;
  for (const x of [-.26,.26]) {
    ball(.25,'#fff9e9',x,.85,.37,bug);
    ball(.12,'#17283c',x,.85,.58,bug);
    ball(.04,'#ffffff',x-.025,.9,.67,bug);
    cylinder(.03,.03,.35,'#8b65b7',x,1.25,0,bug);
    ball(.095,'#ffd87e',x,1.46,0,bug);
    for (const z of [-.25,.25]) ball(.16,'#e3b9f4',x*1.8,.21,z,bug);
  }
  box(.17,.04,.045,'#713f8c',0,.6,.52,bug);
  bug.position.set(-2.8,0,-5);
  bug.visible = false;
  scene.add(bug);
  const marker = new THREE.Group();
  const markerGem = cylinder(0,.32,.55,'#ffe077',0,0,0,marker,4);
  markerGem.rotation.z = Math.PI;
  const ring = mesh(new THREE.TorusGeometry(.7,.07,6,24),'#ffe077',0,-2.5,0,marker);
  ring.rotation.x = Math.PI / 2;
  scene.add(marker);
  const future = new THREE.Group();
  future.position.set(10,0,9);
  box(1.6,1.1,.12,'#6c7d89',0,1,0,future);
  box(.12,1.4,.12,'#816c54',0,.7,0,future);
  future.visible = false;
  scene.add(future);
  const futureLabel = label('PRÓXIMAMENTE · CERRADO',10,2.1,9);
  futureLabel.visible = false;
  const confetti = new THREE.Group();
  scene.add(confetti);
  const confettiPieces = [];
  let celebration = 0;
  function celebrate() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    celebration = 5;
    if (!confettiPieces.length) {
      for (let i = 0; i < 70; i++) {
        const piece = box(.1,.2,.03,['#55dfbd','#ffcf6f','#ec8ca8','#a48bd4'][i%4],0,0,0,confetti);
        confettiPieces.push(piece);
      }
    }
    for (const piece of confettiPieces) piece.position.set(player.group.position.x+(Math.random()-.5)*9,5+Math.random()*5,player.group.position.z+(Math.random()-.5)*8);
    confetti.visible = true;
  }
  const destination = mesh(new THREE.TorusGeometry(.45,.045,6,28),'#55dfbd',0,.13,0);
  destination.rotation.x = Math.PI / 2;
  destination.visible = false;
  scene.updateMatrixWorld(true);
  const movingObjects = [player.group,robot,bug,marker,confetti,destination];
  const labelOccluders = scene.children.filter(object => (object.isMesh || object.isGroup) && !movingObjects.includes(object)).map(object => ({ object, bounds: new THREE.Box3().setFromObject(object).expandByScalar(.2) }));
  const movingLabelOccluders = [player.group,robot,bug].map(object => ({ object, bounds: new THREE.Box3() }));
  labelOccluders.push(...movingLabelOccluders);
  const labelRaycaster = new THREE.Raycaster();
  const labelDirection = new THREE.Vector3();
  const labelPoint = new THREE.Vector3();
  const labelHit = new THREE.Vector3();
  const labelHits = [];
  const labelPanels = [...document.querySelectorAll('.objective, .map-wrap, .topbar')];
  function updateLabels() {
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld();
    for (const item of movingLabelOccluders) if (item.object.visible) item.bounds.setFromObject(item.object);
    const viewport = canvas.getBoundingClientRect();
    const occupied = labelPanels.map(panel => panel.getBoundingClientRect()).filter(rect => rect.width && rect.height);
    for (const item of labels) {
      item.rect = item.element.getBoundingClientRect();
      item.distance = item.position.distanceToSquared(camera.position);
      item.shown = false;
    }
    labels.sort((a,b) => a.distance-b.distance);
    for (const item of labels) {
      const distance = Math.hypot(item.position.x-player.group.position.x,item.position.z-player.group.position.z);
      if (!enabled || !item.visible || distance < 2.5 || distance > 22 || item.distance < 9 || item.distance > 34*34) continue;
      labelPoint.copy(item.position).project(camera);
      if (Math.abs(labelPoint.x) > 1 || Math.abs(labelPoint.y) > 1 || Math.abs(labelPoint.z) > 1) continue;
      const left = viewport.left+(labelPoint.x+1)*viewport.width/2-item.rect.width/2;
      const top = viewport.top+(1-labelPoint.y)*viewport.height/2-item.rect.height;
      const rect = { left, top, right: left+item.rect.width, bottom: top+item.rect.height };
      if (rect.left < 8 || rect.top < 8 || rect.right > innerWidth-8 || rect.bottom > innerHeight-8) continue;
      if (occupied.some(other => rect.left < other.right+6 && rect.right > other.left-6 && rect.top < other.bottom+6 && rect.bottom > other.top-6)) continue;
      labelDirection.copy(item.position).sub(camera.position).normalize();
      labelRaycaster.set(camera.position,labelDirection);
      labelRaycaster.far = Math.sqrt(item.distance)-.1;
      const occluded = labelOccluders.some(({ object, bounds }) => {
        if (!object.visible || !bounds.containsPoint(camera.position) && (!labelRaycaster.ray.intersectBox(bounds,labelHit) || camera.position.distanceToSquared(labelHit) >= item.distance)) return false;
        labelHits.length = 0;
        labelRaycaster.intersectObject(object,true,labelHits);
        return labelHits.length > 0;
      });
      if (occluded) continue;
      item.rect = rect;
      item.shown = true;
      occupied.push(rect);
    }
    for (const item of labels) {
      item.element.style.visibility = item.shown ? 'visible' : 'hidden';
      if (item.shown) item.element.style.transform = `translate(${item.rect.left}px,${item.rect.top}px)`;
    }
  }
  const interactables = {
    rosa: { object: rosa.group, name: 'Doña Rosa', point: targets.rosa, reach: 2.2, height: 1.25 },
    machine: { object: machine, name: 'Máquina de helados', point: targets.machine, reach: 2.2, height: 1.2 },
    inventor: { object: inventor.group, name: 'Inventor Leo', point: targets.inventor, reach: 2.2, height: 1.25 },
    bug: { object: bug, name: 'Bicho', point: bug.position, reach: 2.15, height: .65 },
    future: { object: future, name: 'Próxima aventura', point: targets.future, reach: 2.2, height: 1 }
  };
  let yaw = 0;
  let pitch = .42;
  let cameraDistance = 9;
  let elapsed = 0;
  let enabled = false;
  let pointer = null;
  let previousPointer = null;
  let pointerTravel = 0;
  let rightWalking = false;
  let lockAllowed = false;
  let hovering = null;
  let aiming = null;
  let autoWalk = null;
  let blockedTime = 0;
  let netSwing = 0;
  let stickPointer = null;
  let stickX = 0;
  let stickY = 0;
  let mapTick = 0;
  const keys = new Set();
  const joystick = document.querySelector('#joystick');
  const stick = document.querySelector('#stick');
  const reticle = document.querySelector('#reticle');
  const aimName = document.querySelector('#aim-name');
  const cameraHint = document.querySelector('#camera-hint');
  const locked = () => document.pointerLockElement === canvas;
  function cancelWalk() {
    autoWalk = null;
    blockedTime = 0;
    destination.visible = false;
  }
  function clearInput() {
    keys.clear();
    stickX = 0;
    stickY = 0;
    stick.style.transform = '';
    pointer = null;
    previousPointer = null;
    stickPointer = null;
    rightWalking = false;
    pointerTravel = 0;
    cancelWalk();
  }
  function releasePointer() {
    lockAllowed = false;
    enabled = false;
    clearInput();
    if (locked()) document.exitPointerLock();
  }
  function requestPointer() {
    if (!enabled || locked() || !canvas.requestPointerLock) return;
    lockAllowed = true;
    try {
      const request = canvas.requestPointerLock();
      request?.catch(() => { lockAllowed = false; });
    } catch {
      lockAllowed = false;
    }
  }
  function look(dx,dy) {
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return;
    yaw -= dx * .003;
    pitch = THREE.MathUtils.clamp(pitch + dy * .003, .03, 1.05);
  }
  document.addEventListener('pointerlockchange', () => {
    pointer = null;
    if (!locked()) rightWalking = false;
    if (locked() && (!enabled || !lockAllowed)) document.exitPointerLock();
  });
  document.addEventListener('pointerlockerror', () => { lockAllowed = false; });
  document.addEventListener('mousemove', event => {
    if (!enabled) return;
    if (locked()) look(event.movementX,event.movementY);
    else if (pointer === 'mouse') {
      const dx = event.clientX-previousPointer.x;
      const dy = event.clientY-previousPointer.y;
      pointerTravel += Math.hypot(dx,dy);
      look(dx,dy);
      previousPointer = { x: event.clientX, y: event.clientY };
    }
  });
  window.addEventListener('keydown', event => {
    if (!enabled || event.target.closest('button, dialog')) return;
    const key = event.key.toLowerCase();
    if (['arrowup','arrowdown','arrowleft','arrowright',' '].includes(key)) event.preventDefault();
    if (['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(key)) cancelWalk();
    keys.add(key);
  });
  window.addEventListener('keyup', event => keys.delete(event.key.toLowerCase()));
  window.addEventListener('blur', releasePointer);
  document.addEventListener('visibilitychange', () => { if (document.hidden) releasePointer(); });
  canvas.addEventListener('contextmenu', event => event.preventDefault());
  canvas.addEventListener('wheel', event => {
    if (!enabled) return;
    event.preventDefault();
    cameraDistance = THREE.MathUtils.clamp(cameraDistance + event.deltaY * .01, 4, 13);
  }, { passive: false });
  canvas.addEventListener('mousedown', event => {
    if (!enabled) return;
    canvas.focus({ preventScroll: true });
    if (event.button === 2) {
      event.preventDefault();
      cancelWalk();
      rightWalking = true;
    } else if (event.button === 0) {
      pointer = 'mouse';
      pointerTravel = 0;
      previousPointer = { x: event.clientX, y: event.clientY };
    }
  });
  canvas.addEventListener('pointerdown', event => {
    if (!enabled || event.pointerType === 'mouse') return;
    event.preventDefault();
    pointer = event.pointerId;
    previousPointer = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(pointer);
    canvas.focus({ preventScroll: true });
  });
  canvas.addEventListener('pointermove', event => {
    if (!enabled || locked()) return;
    if (event.pointerType === 'mouse') {
      hovering = { x: event.clientX, y: event.clientY };
      return;
    }
    if (event.pointerId !== pointer) return;
    const dx = event.clientX - previousPointer.x;
    const dy = event.clientY - previousPointer.y;
    pointerTravel += Math.hypot(dx,dy);
    look(dx*2,dy*4/3);
    previousPointer = { x: event.clientX, y: event.clientY };
  });
  canvas.addEventListener('pointerleave', () => { if (pointer === null) hovering = null; });
  document.addEventListener('mouseup', event => {
    if (event.button === 2) rightWalking = false;
    if (event.button !== 0 || pointer !== 'mouse') return;
    const clicked = enabled && pointerTravel < 6 && (locked() || event.target === canvas);
    pointer = null;
    if (clicked) {
      clickAt(event.clientX,event.clientY);
      requestPointer();
    }
  });
  canvas.addEventListener('pointerup', event => {
    if (event.pointerId === pointer) pointer = null;
  });
  canvas.addEventListener('pointercancel', clearInput);
  canvas.addEventListener('lostpointercapture', () => { pointer = null; });
  function setStick(event) {
    const rect = joystick.getBoundingClientRect();
    const dx = (event.clientX - rect.left - rect.width / 2) / (rect.width * .33);
    const dy = (event.clientY - rect.top - rect.height / 2) / (rect.height * .33);
    const length = Math.max(1, Math.hypot(dx,dy));
    stickX = dx / length;
    stickY = dy / length;
    stick.style.transform = `translate(${stickX * rect.width * .3}px, ${stickY * rect.height * .3}px)`;
  }
  joystick.addEventListener('pointerdown', event => {
    if (!enabled) return;
    event.preventDefault();
    cancelWalk();
    stickPointer = event.pointerId;
    joystick.setPointerCapture(stickPointer);
    setStick(event);
  });
  joystick.addEventListener('pointermove', event => {
    if (event.pointerId === stickPointer) setStick(event);
  });
  for (const event of ['pointerup','pointercancel','lostpointercapture']) joystick.addEventListener(event, () => {
    stickPointer = null;
    stickX = 0;
    stickY = 0;
    stick.style.transform = '';
  });
  document.querySelector('#camera-left').onclick = () => { yaw += .4; canvas.focus({ preventScroll: true }); };
  document.querySelector('#camera-right').onclick = () => { yaw -= .4; canvas.focus({ preventScroll: true }); };
  function canStand(x,z,radius = .38) {
    return Number.isFinite(x) && Number.isFinite(z) && Math.abs(x) <= 17.25-radius && Math.abs(z) <= 15.25-radius && !colliders.some(bounds => x > bounds.min.x-radius && x < bounds.max.x+radius && z > bounds.min.z-radius && z < bounds.max.z+radius);
  }
  function move(subject, dx, dz, radius = .38) {
    if (canStand(subject.position.x+dx,subject.position.z,radius)) subject.position.x += dx;
    if (canStand(subject.position.x,subject.position.z+dz,radius)) subject.position.z += dz;
  }
  function moveTo(x,z) {
    if (!canStand(x,z)) throw new Error('Posición fuera de la plaza o dentro de una colisión.');
    cancelWalk();
    player.group.position.set(x,0,z);
    cameraAnchor.set(x,1.65,z);
    updateCamera(1);
  }
  const cameraAnchor = new THREE.Vector3(0,1.65,8);
  const cameraLook = new THREE.Vector3();
  const desiredCamera = new THREE.Vector3();
  const cameraDirection = new THREE.Vector3();
  const hit = new THREE.Vector3();
  const ray = new THREE.Ray();
  const raycaster = new THREE.Raycaster();
  const ground = new THREE.Plane(new THREE.Vector3(0,1,0),-.1);
  const groundPoint = new THREE.Vector3();
  function pick(x,y) {
    const rect = canvas.getBoundingClientRect();
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null;
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld();
    raycaster.setFromCamera(new THREE.Vector2((x-rect.left)/rect.width*2-1,1-(y-rect.top)/rect.height*2),camera);
    let closest = null;
    let distance = Infinity;
    for (const [name,item] of Object.entries(interactables)) {
      if (!item.object.visible) continue;
      const intersection = raycaster.intersectObject(item.object,true)[0];
      if (intersection && intersection.distance < distance) {
        closest = name;
        distance = intersection.distance;
      }
    }
    for (const bounds of colliders) {
      if (closest && bounds.containsPoint(interactables[closest].object.position)) continue;
      if (raycaster.ray.intersectBox(bounds,hit) && hit.distanceTo(raycaster.ray.origin) < distance) return null;
    }
    if (closest) return { name: closest };
    if (!raycaster.ray.intersectPlane(ground,groundPoint) || !canStand(groundPoint.x,groundPoint.z)) return null;
    return { x: groundPoint.x, z: groundPoint.z };
  }
  function updateAim() {
    const rect = canvas.getBoundingClientRect();
    const point = locked() ? { x: rect.left+rect.width/2, y: rect.top+rect.height/2 } : hovering;
    aiming = enabled && point ? pick(point.x,point.y)?.name ?? null : null;
    reticle.hidden = !enabled || !locked();
    reticle.textContent = aiming ? '⌕' : '+';
    reticle.classList.toggle('targeted',Boolean(aiming));
    aimName.hidden = !aiming;
    aimName.textContent = aiming ? interactables[aiming].name : '';
    cameraHint.hidden = !enabled || locked() || matchMedia('(pointer: coarse)').matches;
  }
  function clickAt(x,y) {
    if (!enabled || !Number.isFinite(x) || !Number.isFinite(y)) return;
    const rect = canvas.getBoundingClientRect();
    hovering = locked() ? { x: rect.left+rect.width/2, y: rect.top+rect.height/2 } : { x, y };
    const picked = pick(hovering.x,hovering.y);
    cancelWalk();
    if (!picked) return;
    if (picked.name) {
      const item = interactables[picked.name];
      if (picked.name === 'bug') netSwing = .35;
      interactTarget(picked.name);
      const distance = Math.hypot(player.group.position.x-item.point.x,player.group.position.z-item.point.z);
      if (!enabled || locked() || (picked.name === 'bug' ? distance <= item.reach : distance < item.reach)) return;
      autoWalk = { name: picked.name, x: item.point.x, z: item.point.z };
    } else if (!locked()) {
      autoWalk = picked;
    }
    if (autoWalk) {
      destination.position.set(autoWalk.x,.13,autoWalk.z);
      destination.visible = true;
    }
    updateAim();
  }
  function aimAt(name) {
    const normalized = String(name).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const key = Object.keys(interactables).find(key => key === normalized || interactables[key].name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase() === normalized) ?? ({ maquina: 'machine', inventor: 'inventor', bicho: 'bug' })[normalized];
    const item = interactables[key];
    if (!item?.object.visible) return null;
    const dx = item.object.position.x-player.group.position.x;
    const dz = item.object.position.z-player.group.position.z;
    const distance = Math.hypot(dx,dz);
    yaw = Math.atan2(-dx,-dz)+Math.asin(Math.min(.85/Math.max(distance,.001),1));
    pitch = THREE.MathUtils.clamp(Math.atan2(1.65-item.height,Math.sqrt(Math.max(0,distance*distance-.85*.85))),.03,1.05);
    cameraAnchor.set(player.group.position.x,1.65,player.group.position.z);
    updateCamera(1);
    const rect = canvas.getBoundingClientRect();
    hovering = { x: rect.left+rect.width/2, y: rect.top+rect.height/2 };
    updateAim();
    return { ...hovering, aiming };
  }
  function updateCamera(follow) {
    const position = player.group.position;
    cameraAnchor.lerp(new THREE.Vector3(position.x,1.65,position.z),follow);
    cameraDirection.set(Math.cos(yaw),0,-Math.sin(yaw));
    ray.set(cameraAnchor,cameraDirection);
    let shoulder = .85;
    for (const bounds of colliders) {
      if (ray.intersectBox(bounds,hit)) shoulder = Math.min(shoulder,Math.max(0,hit.distanceTo(cameraAnchor)-.15));
    }
    cameraLook.copy(cameraAnchor).addScaledVector(cameraDirection,shoulder);
    desiredCamera.set(Math.sin(yaw)*cameraDistance*Math.cos(pitch),cameraDistance*Math.sin(pitch),Math.cos(yaw)*cameraDistance*Math.cos(pitch)).add(cameraLook);
    cameraDirection.copy(desiredCamera).sub(cameraLook);
    let distance = cameraDirection.length();
    cameraDirection.normalize();
    ray.set(cameraLook,cameraDirection);
    for (const bounds of colliders) {
      if (ray.intersectBox(bounds,hit)) distance = Math.min(distance,Math.max(.2,hit.distanceTo(cameraLook)-.35));
    }
    camera.position.copy(cameraLook).addScaledVector(cameraDirection,distance);
    camera.lookAt(cameraLook);
  }
  const map = document.querySelector('#minimap').getContext('2d');
  function drawMap(target) {
    const scaleX = 292/38;
    const scaleY = 264/34;
    const point = (x,z) => [146+x*scaleX,132+z*scaleY];
    map.fillStyle = '#dcebc9';
    map.fillRect(0,0,292,264);
    map.fillStyle = '#f6e4b9';
    map.fillRect(...point(-6,-14),12*scaleX,28*scaleY);
    map.fillRect(...point(-16,-9),32*scaleX,8*scaleY);
    for (const house of houses) {
      map.fillStyle = house.color;
      map.fillRect(...point(house.x-house.w/2,house.z-house.d/2),house.w*scaleX,house.d*scaleY);
      map.strokeStyle = '#58726e';
      map.strokeRect(...point(house.x-house.w/2,house.z-house.d/2),house.w*scaleX,house.d*scaleY);
    }
    map.fillStyle = '#7fc1cd';
    map.beginPath();
    map.arc(...point(0,.5),14,0,Math.PI*2);
    map.fill();
    if (target) {
      map.font = 'bold 30px sans-serif';
      map.textAlign = 'center';
      map.textBaseline = 'middle';
      map.lineWidth = 4;
      map.strokeStyle = '#705026';
      map.fillStyle = '#ffe18a';
      map.strokeText('★',...point(target.x,target.z));
      map.fillText('★',...point(target.x,target.z));
    }
    map.fillStyle = '#071b2b';
    map.strokeStyle = '#ffffff';
    map.lineWidth = 3;
    map.beginPath();
    map.arc(...point(player.group.position.x,player.group.position.z),7,0,Math.PI*2);
    map.fill();
    map.stroke();
  }
  function tick(dt,{ active, chasing, target, completed }) {
    elapsed += dt;
    if (!active && enabled) clearInput();
    enabled = active;
    const position = player.group.position;
    let walking = 0;
    if (active) {
      const alt = keys.has('alt');
      if (keys.has('q') || alt && keys.has('arrowleft')) yaw += dt*1.8;
      if (keys.has('r') || alt && keys.has('arrowright')) yaw -= dt*1.8;
      let horizontal = Number(keys.has('d') || !alt && keys.has('arrowright'))-Number(keys.has('a') || !alt && keys.has('arrowleft'))+stickX;
      let vertical = Number(keys.has('s') || !alt && keys.has('arrowdown'))-Number(keys.has('w') || !alt && keys.has('arrowup'))+stickY;
      if (rightWalking) vertical -= 1;
      const magnitude = Math.hypot(horizontal,vertical);
      const speed = keys.has('shift') || Math.hypot(stickX,stickY) > .8 ? 6 : 3.8;
      let dx = 0;
      let dz = 0;
      if (magnitude > .12) {
        cancelWalk();
        horizontal /= Math.max(1,magnitude);
        vertical /= Math.max(1,magnitude);
        dx = (Math.cos(yaw)*horizontal+Math.sin(yaw)*vertical)*speed*dt;
        dz = (-Math.sin(yaw)*horizontal+Math.cos(yaw)*vertical)*speed*dt;
      } else if (autoWalk) {
        const item = interactables[autoWalk.name];
        const point = item ? item.point : autoWalk;
        const distance = Math.hypot(point.x-position.x,point.z-position.z);
        if (distance < (item ? item.reach-.15 : .18)) {
          const name = autoWalk.name;
          cancelWalk();
          if (name) {
            if (name === 'bug') netSwing = .35;
            interactTarget(name);
          }
        } else {
          const step = Math.min(speed*dt,distance);
          dx = (point.x-position.x)/distance*step;
          dz = (point.z-position.z)/distance*step;
          destination.position.set(point.x,.13,point.z);
        }
      }
      if (dx || dz) {
        const oldX = position.x;
        const oldZ = position.z;
        move(player.group,dx,dz);
        const travelled = Math.hypot(position.x-oldX,position.z-oldZ);
        if (autoWalk) {
          blockedTime = travelled < .005 ? blockedTime+dt : 0;
          if (blockedTime > .4) cancelWalk();
        }
        if (travelled > 0) {
          const angle = Math.atan2(position.x-oldX,position.z-oldZ)-player.group.rotation.y;
          player.group.rotation.y += Math.atan2(Math.sin(angle),Math.cos(angle))*(1-Math.exp(-dt*12));
        }
        walking = travelled > 0 ? speed : 0;
      }
    }
    netSwing = Math.max(0,netSwing-dt);
    net.rotation.x = -Math.sin(netSwing/.35*Math.PI)*1.6;

    player.legs.forEach((leg,i) => { leg.rotation.x = Math.sin(elapsed*walking*2.5+i*Math.PI)*.55*(walking ? 1 : 0); });
    player.arms.forEach((arm,i) => { arm.rotation.x = Math.sin(elapsed*walking*2.5+i*Math.PI+Math.PI)*.4*(walking ? 1 : 0); });
    player.group.position.y = walking ? Math.abs(Math.sin(elapsed*walking*2.5))*.045 : 0;
    for (const [i,person] of [player,rosa,inventor].entries()) {
      const blink = (elapsed+i*1.37)%4.6;
      for (const eye of person.eyes) eye.scale.y = blink < .16 ? Math.max(.08,Math.abs(blink-.08)/.08) : 1;
      if (person === player) continue;
      const near = Math.hypot(position.x-person.group.position.x,position.z-person.group.position.z) < 4.4;
      if (active && near && !person.near) person.greeting = .8;
      person.near = near;
      person.greeting = Math.max(0,person.greeting-dt);
      const greeting = Math.sin(person.greeting/.8*Math.PI);
      person.group.position.y = greeting*.14;
      person.arms[1].rotation.z = greeting*.9;
    }
    robot.position.set(position.x+1.15,1.4+Math.sin(elapsed*2)*.12,position.z+.4);
    robot.rotation.y = player.group.rotation.y;
    bug.visible = chasing;
    if (chasing && active) {
      let angle = Math.atan2(bug.position.x-position.x,bug.position.z-position.z);
      if (bug.position.distanceTo(position)>7) angle = elapsed*.4;
      angle += Math.sin(elapsed*2)*.6;
      for (const turn of [0,.9,-.9,1.8,-1.8,Math.PI]) {
        const dx = Math.sin(angle+turn)*2.15*dt;
        const dz = Math.cos(angle+turn)*2.15*dt;
        if (Math.abs(bug.position.x+dx)<11 && bug.position.z+dz>-6.3 && bug.position.z+dz<11.8 && canStand(bug.position.x+dx,bug.position.z+dz,.5)) {
          bug.position.x += dx;
          bug.position.z += dz;
          bug.rotation.y = angle+turn;
          break;
        }
      }
      bug.position.y = Math.abs(Math.sin(elapsed*11))*.13;
    }
    marker.visible = Boolean(target);
    if (target) {
      marker.position.set(target.x,2.65+Math.sin(elapsed*2)*.12,target.z);
      markerGem.rotation.y = elapsed*.7;
    }
    future.visible = completed;
    futureLabel.visible = completed;
    if (celebration>0) {
      celebration -= dt;
      for (const piece of confettiPieces) {
        piece.position.y -= dt*1.7;
        piece.rotation.x += dt*2;
        piece.rotation.z += dt*1.5;
      }
      if (celebration<=0) confetti.visible = false;
    }
    updateCamera(1-Math.exp(-dt*7));
    updateLabels();
    updateAim();
    mapTick += dt;
    if (mapTick>.08) { drawMap(target); mapTick=0; }
    renderer.render(scene,camera);
  }
  function resize() {
    renderer.setSize(innerWidth,innerHeight);
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize',resize);
  resize();
  return { tick, player: player.group, bug, celebrate, moveTo, canStand, clearInput, setCamera: value => { if (Number.isFinite(value)) yaw = value; }, getCamera: () => ({ yaw, pitch }), getInput: () => ({ aiming, autoWalk: autoWalk ? { ...autoWalk } : null, cameraDistance }), releasePointer, look, clickAt, aimAt, renderer };
}
