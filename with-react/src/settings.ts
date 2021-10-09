import * as THREE from 'three';

// renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.autoClear = false;
renderer.shadowMap.autoUpdate = false;
renderer.outputEncoding = THREE.sRGBEncoding;

// camera
const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 10000);
camera.name = 'camera';
camera.position.set(0, 20, 50);
camera.lookAt(new THREE.Vector3());

// scene
const scene = new THREE.Scene();
scene.name = 'scene';
scene.background = new THREE.Color(0x111111);

// gridHelper
const gridHelper = new THREE.GridHelper(100, 20, 0x666666);
gridHelper.name = 'gridHelper';

// axesHelper
const axesHelper = new THREE.AxesHelper(50);
axesHelper.name = 'axesHelper';

// light
export const light = new THREE.AmbientLight(0x404040);

export const settings = {
  renderer,
  camera,
  scene,
  gridHelper,
  axesHelper,
  initialObjects: [light],
  initialHelpers: [],
};
