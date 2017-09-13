// - Polish box material
// - Scrolling effect with boxes
// - experiment with lighting

import * as THREE from 'three';
import * as TWEEN from 'es6-tween';

import Cube from './Cube.js';

let camera;
let scene;
let renderer;
let parent;
let mouse;
let raycaster;

const cubes = [];

function render() {

  renderer.render(scene, camera);

}

function animate() {

  requestAnimationFrame(animate);

  TWEEN.update();

  for (const cube of cubes) {

    cube.mesh.rotation.x = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
    cube.mesh.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;

  }

  render();

}

function onDocumentMouseDown(event) {

  event.preventDefault();

  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  let selectedCube;

  if (intersects.length > 0) {

    for (const cube of cubes) {

      if (cube.mesh.uuid === intersects[0].object.uuid) {

        selectedCube = cube;

      }
    }

    if (Math.floor(intersects[0].object.position.z) < 5) {

      selectedCube.focusCube(camera);

    }
    else {

      selectedCube.unfocusCube();

    }
  }
}

function onDocumentTouchDown(event) {

  event.preventDefault();

  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;

  onDocumentMouseDown(event);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function init() {

  const container = document.createElement('div');
  container.setAttribute('class', 'banner');
  document.body.appendChild(container);

  const title = document.createElement('div');
  title.innerHTML = 'Brandon Morrissey';
  container.appendChild(title);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.z = 70;

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('touchstart', onDocumentTouchDown, false);
  window.addEventListener('resize', onWindowResize, false);

  parent = new THREE.Object3D();

  cubes.push(new Cube(-90, 0, 0, 'Title', 0xDB3069, parent));
  cubes.push(new Cube(-45, 0, 0, 'Title', 0xE0DFD5, parent));
  cubes.push(new Cube(0, 0, 0, 'Titlebelt', 0x82DDF0, parent));
  cubes.push(new Cube(45, 0, 0, 'Title', 0x48BF84, parent));
  cubes.push(new Cube(90, 0, 0, 'Title', 0x8783D1, parent));

  scene.add(parent);

}

init();
animate();