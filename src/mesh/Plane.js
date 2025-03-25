import * as THREE from "three";

const uvs = new Float32Array([
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0
]);

const geometry = new THREE.PlaneGeometry(200,100,100,100);

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('src/assets/FloorsCheckerboard_S_Diffuse.jpg');

const material = new THREE.MeshLambertMaterial({ 
    // color: 0x00ff00,
    // opacity:0.8,
    // transparent:true,
    map: texture
});

// 创建存储所有平面的数组
const planes = [];

// 创建多个平面实例并设置不同位置
const planePositions = [
    { x: -180, y: 0, z: -200 },
    { x: -50, y: 0, z: -200 },
    { x: 150, y: 0, z: -200 },
    { x: -180, y: 0, z: -100 },
    { x: -50, y: 0, z: -100 },
    { x: 150, y: 0, z: -100 },
    { x: -180, y: 0, z: 0 },
    { x: -50, y: 0, z: 0 },
    { x: 150, y: 0, z: 0 },
    { x: -180, y: 0, z: 100 },
    { x: -50, y: 0, z: 100 },
    { x: 150, y: 0, z: 100 },
    { x: -180, y: 0, z: 200 },
    { x: -50, y: 0, z: 200 },
    { x: 150, y: 0, z: 200 },
  ];

  planePositions.forEach(pos => {
    const plane = new THREE.Mesh(geometry, material.clone());
    plane.position.set(pos.x, pos.y, pos.z);
    plane.rotation.x = -Math.PI/2;
    planes.push(plane); // 将每个平面添加到数组
  });

export default planes;