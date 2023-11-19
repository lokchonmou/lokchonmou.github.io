import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// 建立一個 WebGL 渲染器的程式碼, antialias 是抗鋸齒的意思
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 設定渲染器的尺寸
renderer.setSize(window.innerWidth, window.innerHeight);
// 設定渲染器的解析度
// renderer.setPixelRatio(window.devicePixelRatio);
// 設定影子效果
renderer.shadowMap.enabled = true;
// 將 WebGL 渲染器的畫布元素添加到網頁的 body 元素中
document.body.appendChild(renderer.domElement);

// 建立一個場景
const scene = new THREE.Scene();
// 建立一個透視相機
const camera = new THREE.PerspectiveCamera(
    45, // 視野角度
    window.innerWidth / window.innerHeight, //
    0.1, // 視野最近距離
    1000 // 視野最遠距離
);

// 建立一個輔助器
const orbit = new OrbitControls(camera, renderer.domElement);

// 建立三維坐標系輔助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 改變相機的位置
camera.position.set(-10, 30, 30);
// 更新相機的控制器
orbit.update();


// 建立gui
const gui = new dat.GUI();
// 建立一個物件, 用來儲存控制項的資料
const options = {
    sphereColor: 0xffea00,
    wireframe: false,
    speed: 0.01
};
// 將控制項加入gui
gui.addColor(options, 'sphereColor').onChange(function (value) {
    sphere.material.color.set(value);
});
gui.add(options, 'wireframe').onChange(function (value) {
    sphere.material.wireframe = value;
});
gui.add(options, 'speed', 0, 0.1);

// 建立聚光燈光源, 0.8 是光源的強度, 光源的強度是 0.0 ~ 1.0 的值
var spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
scene.add(spotLight);

// 建立聚光燈光源助手, 其中的參數是聚光燈光源對象
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// 建立一個立方體
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// 建立一個平面
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff, side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = -Math.PI / 2;


// 建立網格, 30 是網格的大小, 20 是網格的分段數
const gridHelper = new THREE.GridHelper(30, 20);
scene.add(gridHelper);

// 建立一個球體, 5 是球體的半徑, 30, 30 是球體的寬度分段數和高度分段數
const sphereGeometry = new THREE.SphereGeometry(5, 30, 30);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF, wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;
scene.add(sphere);


let step = 0;

function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    // 將場景渲染到畫布元素上的函式
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

