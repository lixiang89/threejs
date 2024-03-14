import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

let camera, scene, renderer;

camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set( 2, 2, -2 );
camera.lookAt(0,1,0)

scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
let mixer, idleAction, walkAction, runAction, poseAction, actions;

const light = new THREE.AmbientLight(0xffffff, 5);
scene.add(light);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/droid/gltf/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.setPath("/models/");
loader.load("Soldier.glb", function (gltf) {
  console.log("gltf:", gltf);
  const model = gltf.scene;
  // 模型里面包含动画
  const animations = gltf.animations;

  // model.position.set(1, 1, 0);
  // model.scale.set(0.01, 0.01, 0.01);
  scene.add(model);
  // 参考使用动画：https://threejs.org/docs/index.html#manual/zh/introduction/Animation-system
  mixer = new THREE.AnimationMixer(model);

  idleAction = mixer.clipAction(animations[0]);
  runAction = mixer.clipAction(animations[1]);
  poseAction = mixer.clipAction(animations[2]);
  walkAction = mixer.clipAction(animations[3]);

  actions = [idleAction, runAction, poseAction, walkAction];

  render();
});

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  mixer.update(0.01);
  // controls.update();
  renderer.render(scene, camera);
}

function play(action){
  actions.forEach(action => {
    action.stop()
  });
  action?.play()
}

document.getElementById("run").addEventListener("click", () => {
  play(runAction);
});
document.getElementById("idle").addEventListener("click", () => {
  play(idleAction);
});
document.getElementById("walk").addEventListener("click", () => {
  play(walkAction);
});
document.getElementById("pose").addEventListener("click", () => {
  play();
});
