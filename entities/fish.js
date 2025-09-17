import * as THREE from 'three';

const fishMat = new THREE.MeshLambertMaterial({ color: 0xc0c0c0 });
const fishTailMat = new THREE.MeshLambertMaterial({ color: 0xff4500 });

function createVoxel(x, y, z, w, h, d, mat) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    return mesh;
}

export function createFish(scene, score = 0) {
    const group = new THREE.Group();
    group.name = 'fish';
    group.add(createVoxel(0, 0, 0, 1, 0.5, 0.5, fishMat));
    group.add(createVoxel(0, 0.1, -0.6, 0.2, 0.8, 0.2, fishTailMat));
    const riverWidth = 7;
    const xPos = (Math.random() - 0.5) * riverWidth;
    group.position.set(xPos, 2.1, -12);
    const speedMultiplier = 1 + (score / 500);
    const swimSpeed = (0.05 + Math.random() * 0.05) * speedMultiplier;
    group.userData = {
        velocity: new THREE.Vector3(0, 0, swimSpeed),
        initialX: xPos,
        swimFrequency: Math.random() * 5 + 2,
        swimAmplitude: Math.random() * 0.5 + 0.2,
        swimTimer: Math.random() * Math.PI * 2,
    };
    scene.add(group);
    return group;
}

export function updateFish(fish) {
    if (!fish) return;
    fish.position.add(fish.userData.velocity);
    const ud = fish.userData;
    ud.swimTimer += 0.1;
    fish.position.x = ud.initialX + Math.sin(ud.swimTimer * ud.swimFrequency) * ud.swimAmplitude;
    fish.rotation.y = Math.sin(ud.swimTimer * ud.swimFrequency) * 0.2;
}

export function isFishPastLog(fish) {
    return fish && fish.position.z > 3.5;
}

