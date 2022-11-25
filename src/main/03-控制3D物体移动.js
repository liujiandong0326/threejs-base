import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 目标：控制3D物体移动

/*1. 创建场景*/
const scene = new THREE.Scene();

/*2. 创建相机(透视相机)*/
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
// 把相机添加到场景中
scene.add(camera);

/*3. 添加物体*/

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体的位置
// cube.position.set(5, 0, 0);
cube.position.x = 3;

// 将几何体添加到场景中
scene.add(cube);

/*
 * 4. 初始化渲染器
 * */
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将 webgl 渲染的 canvas 内容添加到 body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

/*
 * 创建轨道控制器
 * */
const controls = new OrbitControls(camera, renderer.domElement);

/*
 * 添加坐标轴辅助器
 * */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

render();

function render() {
  cube.position.x += 0.01;
  if (cube.position.x > 5) {
    cube.position.x = 0;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
