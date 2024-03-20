import * as THREE from "three";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import publicPath from "./publicPath.js";

let camera, scene, renderer;

let mesh, geometry, material;

camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(-222, 222, 666);
camera.lookAt(255, 55, 55);

// SCENE
scene = new THREE.Scene();

material = new THREE.MeshNormalMaterial({color:0x00ffff});

const loader = new FontLoader();
loader.load(`${publicPath}/fonts/XuandongKaishu_Regular.json`, function (font) {
  geometry = new TextGeometry("HELLO 哈喽", {
    font: font,
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  render();
});


renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function render() {
  //   requestAnimationFrame(render);
  renderer.render(scene, camera);
}
