import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import cube from "./mesh/cube";
import pointLight from "./lights/pointlight"
import sphere from "./mesh/sphere"
import planes from "./mesh/Plane"
import { sprites, updateSprites } from './sprite/index';

let renderer,camera,scene,ambientLight; // undefined
function init() {
    // 场景
    scene = new THREE.Scene();
    // 将立方体添加到场景中 默认被添加到 (0,0,0) 坐标
    //scene.add(cube);
    scene.add(sphere);
    planes.forEach(plane => {
        scene.add(plane);
    });
    // 添加精灵到场景
    sprites.forEach(sprite => scene.add(sprite));



    scene.add(pointLight);
    // 点光源辅助观察
    const pointLightHelpler = new THREE.PointLightHelper(pointLight);
    scene.add(pointLightHelpler);

    // 环境光
    ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // 摄像机
    camera = new THREE.PerspectiveCamera(
        75, // 视野角度（FOV）
        window.innerWidth / window.innerHeight, // 长宽比（aspect ratio）
        0.1, // 近截面（near）
        1000 // 远截面（far）
      );

    camera.position.set(100,100,100);
    // 设置相机看向的位置
    camera.lookAt(0,0,0,);
    
    // 渲染器
    renderer = new THREE.WebGLRenderer({antialias:true,}); //antialias:true：是否抗锯齿：true
    renderer.setSize(window.innerWidth, window.innerHeight);
    //  renderer（渲染器）的dom元素（renderer.domElement）添加到 HTML 文档中
    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);

        // 更新精灵位置
        updateSprites();

        // 渲染场景
        renderer.render(scene, camera);
    }
    animate();
    }

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    if(!renderer) return;
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera); 
    //没有动画的时候需要重新render
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};

function initHelper(params) {
// 辅助坐标轴
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
    renderer.setClearColor(0x000000, 1); //设置背景颜色
    renderer.render(scene, camera); //执行渲染操作
}); //监听鼠标、键盘事件

// // 添加一个辅助网格地面 网格地面辅助观察GridHelper
// const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
// scene.add(gridHelper);

}

// 渲染循环
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // 圆旋转
    // sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    // 或 shere.rotateY(0.01)
  }

function initStats()
{
    //创建stats对象
    const stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);
    // 渲染函数
    function render() {
    //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
    stats.update();
    renderer.render(scene, camera);//执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();
}

init();
initHelper();
initStats();

animate();

// 初始化完成后添加GUI控制
function setupGUI() {
    const gui = new GUI();

    // 球体控制
    const sphereCtrl = {
        position: { 
            x: sphere.position.x,
            y: sphere.position.y,
            z: sphere.position.z
        },
        scale: 1,
        material: {
            color: sphere.material.color.getHex(),
            transparent: sphere.material.transparent,
            opacity: sphere.material.opacity,
            metalness: sphere.material.metalness,
            roughness: sphere.material.roughness
        }
    };

    // 变换控制
    const transformFolder = gui.addFolder('球体变换');
    transformFolder.add(sphere.position, 'x', -100, 100).name('X位置');
    transformFolder.add(sphere.position, 'y', -100, 100).name('Y位置');
    transformFolder.add(sphere.position, 'z', -100, 100).name('Z位置');
    
    // 缩放控制（统一缩放）
    transformFolder.add(sphereCtrl, 'scale', 0.1, 5).name('缩放')
        .onChange(v => sphere.scale.set(v, v, v));

    // 材质控制
    const materialFolder = gui.addFolder('球体材质');
    materialFolder.addColor(sphereCtrl.material, 'color').name('颜色')
        .onChange(v => sphere.material.color.set(v));
    materialFolder.add(sphereCtrl.material, 'transparent').name('透明')
        .onChange(v => sphere.material.transparent = v);
    materialFolder.add(sphereCtrl.material, 'opacity', 0, 1).name('透明度')
        .onChange(v => sphere.material.opacity = v);

    // 光源控制
    const lightFolder = gui.addFolder('光源');
    lightFolder.add(pointLight.position, 'x', -100, 100).name('点光源X');
    lightFolder.add(pointLight.position, 'y', -100, 100).name('点光源Y');
    lightFolder.add(pointLight.position, 'z', -100, 100).name('点光源Z');
    lightFolder.addColor(pointLight, 'color').name('点光源颜色');
    lightFolder.add(pointLight, 'intensity', 0, 2).name('点光源强度');

    // 环境光控制
    lightFolder.add(ambientLight, 'intensity', 0, 2).name('环境光强度');
    lightFolder.addColor(ambientLight, 'color').name('环境光颜色');

    // 重置按钮
    gui.add({
        resetAll: () => {
            // 递归重置控制器
            const resetGUI = (folder) => {
                folder.controllers.forEach(ctrl => {
                    try { ctrl.reset() } catch(e) { /* 忽略特殊控制器 */ }
                });
                folder.folders.forEach(resetGUI);
            };
            resetGUI(gui);
            
            // 手动同步特殊属性
            sphere.scale.set(1, 1, 1);
            scaleCtrl.setValue(1);  // 同步缩放滑块
            
            // 强制材质更新
            sphere.material.needsUpdate = true;
            renderer.render(scene, camera);
        }
    }, 'resetAll').name('重置所有设置');

    // 自动更新材质
    gui.onChange(() => {
        sphere.material.needsUpdate = true;
        renderer.render(scene, camera);
    });
}

// 初始化完成后调用
setupGUI();