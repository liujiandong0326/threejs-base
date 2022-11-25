import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

// 目标：js 控制画面全屏

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
// cube.position.x = 3;

// 缩放
// cube.scale.set(3, 2, 1);
// cube.scale.x = 3;

// 旋转 Math.PI = 180度
cube.rotation.set(Math.PI / 4, 0, 0);

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
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用 .update()
controls.enableDamping = true;

/*
 * 添加坐标轴辅助器
 * */
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

// 设置动画  duration(单位是秒)
const animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  // 设置重复的次数，无限次循环: -1
  repeat: -1,
  // 往返运动
  yoyo: true,
  // 延迟运动（单位秒）
  delay: 2,
  ease: "power1.inOut",
  onComplete: () => {
    console.log("动画完成");
  },
  onStart: () => {
    console.log("动画开始");
  },
});
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5 });

// dblclick 双击
window.addEventListener("dblclick", () => {
  // 双击控制屏幕进入全屏，退出全屏
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    // 让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
});

render();

function render() {
  // 获取时钟运行的总时长
  // let time = clock.getElapsedTime();
  // // 获取间隔时间
  // let deltaTime = clock.getDelta();
  // 100 / deltaTime = 电脑渲染的帧数
  // console.log(time);
  // console.log("间隔时间：" + deltaTime);
  // cube.position.x = time % 5;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.addEventListener("resize", () => {
  // 更新相机的宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机的投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
