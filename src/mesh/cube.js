import * as THREE from "three";

// 创建BoxGeometry（立方体）对象
const geometry = new THREE.BoxGeometry(50, 50, 50);

// 加载环境贴图
// 加载周围环境6个方向贴图
// 上下左右前后6张贴图构成一个立方体空间
// 'px.jpg', 'nx.jpg'：x轴正方向、负方向贴图  p:正positive  n:负negative
// 'py.jpg', 'ny.jpg'：y轴贴图// 'pz.jpg', 'nz.jpg'：z轴贴图
const textureCube = new THREE.CubeTextureLoader()
.setPath('src/assets/env')
.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);
// CubeTexture表示立方体纹理对象，父类是纹理对象Texture 

const material = new THREE.MeshStandardMaterial({
    metalness: 1.0,
    roughness: 0.2,
    envMap: textureCube, //设置pbr材质环境贴图
})   
// Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
const cube = new THREE.Mesh(geometry, material);

cube.position.set(100,25,100);

export default cube;