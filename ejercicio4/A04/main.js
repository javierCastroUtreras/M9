import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(-3);
camera.position.setX(40);

renderer.render(scene, camera);

// cono

const geometry = new THREE.ConeGeometry( 5, 20, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

const cone = new THREE.Mesh( geometry, material );
scene.add( cone );
cone.position.z = 60;
cone.position.x = -120;

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(270));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('fondo.jpg');
scene.background = spaceTexture;

// cubo

const cuboTexture = new THREE.TextureLoader().load('image/animal1.png');


const cubo = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: cuboTexture}));

scene.add(cubo);

// luna

const moonTexture = new THREE.TextureLoader().load('image/animal3.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

//otra figura
const animal2 = new THREE.TextureLoader().load('image/animal2.png');

const capsule = new THREE.Mesh(
  new THREE.CapsuleGeometry( 1, 1, 4, 8 ),
  new THREE.MeshBasicMaterial( { map: animal2} )
);

scene.add(capsule);
capsule.position.y = 0;
capsule.position.z = 10;
capsule.position.setX(-10);

//otra figura2


const rare = new THREE.Mesh(
  new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
  new THREE.MeshBasicMaterial( { map: animal2} ),
  new THREE.Mesh( geometry, material )
);

scene.add(rare);
rare.position.y = 20;
rare.position.z = 100;
rare.position.setX(-90);

//otra figura3

const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );


const heart = new THREE.Mesh(
  new THREE.ShapeGeometry( heartShape ),
  new THREE.MeshBasicMaterial( { color: 0x01ff00 } ),
  new THREE.Mesh( geometry, material )
);

scene.add(heart);
heart.position.y = -10;
heart.position.z = 120;
heart.position.setX(-50);



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  cubo.rotation.y += 0.01;
  cubo.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  cone.rotation.x += 0.05;
  cone.rotation.y += 0.05;
  cone.rotation.z += 0.01;

  capsule.rotation.x += 0.05;
  capsule.rotation.y += 0.05;
  capsule.rotation.z += 0.01;

  rare.rotation.x += 0.05;
  rare.rotation.y += 0.05;
  rare.rotation.z += 0.01;

  heart.rotation.x += 0.5;
  heart.rotation.y += 0.5;
  heart.rotation.z += 0.5;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
