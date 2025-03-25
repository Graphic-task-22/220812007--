import * as THREE from 'three';

// 风向（全局变量）
const windDirection = new THREE.Vector3(1, 0, 0).normalize(); // 风向向量
const windStrength = 0.5; // 风强度

// 加载多张精灵图
const textureLoader = new THREE.TextureLoader();
const textures = [
    textureLoader.load('src/assets/sprites/snowflake2.png'),
    textureLoader.load('src/assets/sprites/snowflake5.png'),
    textureLoader.load('src/assets/sprites/spark1.png'),
];

// 创建多个精灵
const sprites = [];
const spriteCount = 2000; // 精灵数量
const areaSize = 500; // 随机分布区域大小

for (let i = 0; i < spriteCount; i++) {
    // 随机选择一张贴图
    const texture = textures[Math.floor(Math.random() * textures.length)];
    const material = new THREE.SpriteMaterial({
        map: texture,
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    const sprite = new THREE.Sprite(material);

    // 随机初始位置
    sprite.position.set(
        (Math.random() - 0.5) * areaSize,
        (Math.random() - 0.5) * areaSize,
        (Math.random() - 0.5) * areaSize
    );

    // 随机缩放
    const scale = Math.random() * 5 + 2; // 缩放范围：2-7
    sprite.scale.set(scale, scale, 1);

    // 存储精灵对象
    sprites.push(sprite);
}

// 更新函数（让精灵随风运动）
function updateSprites() {
    sprites.forEach(sprite => {
        // 随风移动
        sprite.position.x += windDirection.x * windStrength * Math.random();
        sprite.position.y += windDirection.y * windStrength * Math.random();
        sprite.position.z += windDirection.z * windStrength * Math.random();

        // 边界检测（超出范围后重置位置）
        if (sprite.position.x > areaSize / 2) sprite.position.x = -areaSize / 2;
        if (sprite.position.y > areaSize / 2) sprite.position.y = -areaSize / 2;
        if (sprite.position.z > areaSize / 2) sprite.position.z = -areaSize / 2;
    });
}

// 导出精灵数组和更新函数
export { sprites, updateSprites };

// // 导出精灵数组和更新函数
// export { sprites, updateSprites };

// const material = new THREE.SpriteMaterial({
//      map: texture,
//      blending: THREE.AdditiveBlending  //加法混合
// });
// const sprite = new THREE.Sprite(material);

// sprite.position.set(0, 100, 0);
// sprite.scale.set(10, 10, 1);

// export { sprite };