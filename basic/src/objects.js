import * as THREE from 'three';

const basicMaterial = new THREE.MeshBasicMaterial();

const boxGeometry = new THREE.BoxGeometry();

export const box = new THREE.Mesh(boxGeometry, basicMaterial);

export const light = new THREE.AmbientLight( 0x404040 );