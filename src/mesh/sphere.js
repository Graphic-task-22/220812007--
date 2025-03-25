import * as THREE from "three";

// 球体
var sphereGeometry = new THREE.SphereGeometry(40,40,40);

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load('src/assets/earth_day_4096.jpg');

var sphereMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xffffff ,
    opacity:1,
    transparent:true,
    map: texture
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.set(0,40,0);

export default sphere;
