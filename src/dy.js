import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { ArcballControls } from "three/addons/controls/ArcballControls.js";
import { FlyControls } from "three/addons/controls/FlyControls.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";

//场景
const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// camera.position.set(0, 0, 200);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 球体
const geometry = new THREE.SphereGeometry(22, 64, 32);
// 材质
const material = new THREE.MeshPhysicalMaterial({ color: 0x0000ff });
const obj = new THREE.Mesh(geometry, material);
obj.position.set(0, 0, 0);
obj.castShadow = true; //default is false
obj.receiveShadow = true; //default is false
scene.add(obj);

const geometry2 = new THREE.SphereGeometry(5, 64, 32);
const material2 = new THREE.MeshPhysicalMaterial({ color: 0x00ffff });
const obj2 = new THREE.Mesh(geometry2, material2);
// obj2.position.set(0,0,55)
obj2.castShadow = true;
obj2.receiveShadow = true;

scene.add(obj2);

// 创建轨道来控制物体移动路径
function createPath(r) {
  // 3d曲线
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0, r),
      new THREE.Vector3(r, 0, 0),
      new THREE.Vector3(0, 0, -r),
      new THREE.Vector3(-r, 0, 0),
    ],
    true
  );
  const points = curve.getPoints(50);
  // 画线
  const line_geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line_material = new THREE.LineBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0,
  });

  // Create the final object to add to the scene
  const line = new THREE.Line(line_geometry, line_material);

  scene.add(line);
  return curve;
}
const curve = createPath(66);
const curve2 = createPath(200);

// camera.lookAt(obj2.position);
// 创建光源
const light = new THREE.PointLight(0xffffff);
// light.position.set(0, 0, 100);
// 设置光源照射的强度
light.intensity = 99999;
light.castShadow = true;
// 光照距离,默认500
light.shadow.camera.far = 1000; // default
scene.add(light);

// const pointLightHelper = new THREE.PointLightHelper( light, 11,0xff0000 );
// scene.add( pointLightHelper );

// 为了方便观察3D图像，添加三维坐标系对象
// var axes = new THREE.AxesHelper(50);
// scene.add(axes);

// renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement, scene);

function controlsAnimate() {
  requestAnimationFrame(controlsAnimate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

controlsAnimate();

let pos1 = 0;
let pos2 = 0;

let animateId;

function animate() {
  animateId = requestAnimationFrame(animate);

  obj.rotation.y -= 0.1;

  // 计算位置
  // if (light.position.z <= 0) {
  //   light.position.x -= 0.64;
  // } else {
  //   light.position.x += 0.64;
  // }
  // if (light.position.x >= 0) {
  //   light.position.z -= 0.64;
  // } else {
  //   light.position.z += 0.64;
  // }

  if (pos2 >= 1) pos2 = 0;
  pos2 += 0.0005;
  curve2.getPointAt(pos2, light.position); // 当前点在线条上的位置百分比

  if (pos1 >= 1) pos1 = 0;
  pos1 += 0.002;
  curve.getPointAt(pos1, obj2.position); // 当前点在线条上的位置百分比

  // if(obj2.position.z<=0){
  //   obj2.position.x-=0.22
  // }else{
  //   obj2.position.x+=0.22
  // }
  // if(obj2.position.x>=0){
  //   obj2.position.z-=0.22
  // }else{
  //   obj2.position.z+=0.22
  // }
  // controls.update();

  renderer.render(scene, camera);
}
animate();

const pause = () => {
  cancelAnimationFrame(animateId);
};
document.getElementById("pause").addEventListener("click", pause);

document.getElementById("start").addEventListener("click", () => {
  pause();
  animate();
});
