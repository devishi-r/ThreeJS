import * as THREE from 'three'; //constructing 3d scenes
import './index.css'
import gsap from "gsap"; //animations (cross-browser friendly)
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//allows camera to orbit around body

//Scene
const scene=new THREE.Scene();

//const colorArray=["#d79898","#2790b0","#9f68c5","#faebd7",    "#e4d8db"]

//create a sphere:
const geometry=new THREE.SphereGeometry(3, 64, 64);
const material=new THREE.MeshStandardMaterial({
  color: "#2790b0",
})
const mesh=new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizes
const sizes={
  width:window.innerWidth,
  height:window.innerHeight,
}

//light
const light=new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity=1.25;
scene.add(light)

//camera
const camera=new THREE.PerspectiveCamera(
  45, 
  sizes.width/sizes.height, 
  0.1, 
  100)
camera.position.z=20
scene.add(camera);


//renderer
const canvas=document.querySelector(".webgl");
const renderer=new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(2);

//resize
window.addEventListener("resize",() => {
  //update sizes
  sizes.width=window.innerWidth
  sizes.height=window.innerHeight
  //update camera
  camera.aspect=sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height);
})

//controls
const controls=new OrbitControls(camera, canvas); 
controls.enableDamping=true;
controls.enablePan=false;
controls.enableZoom=false;

const loop=() =>{
  //mesh.position.x+=0.1;
  controls.update()
  //light.rotation.x+=0.2
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()


const tl= gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo("nav", {y:"-100%"}, {y:"0%"});
tl.fromTo(".title", {opacity:0}, {opacity:1}); 



/*
//Mouse animation colour
let mouseDown=false;
let rgb=[]
window.addEventListener("mousedown", ()=>(mouseDown=true));
window.addEventListener("mouseup", ()=>(mouseDown=false));

window.addEventListener("mousemove",(e)=>{
  if(mouseDown) {
    rgb=[
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255),
      150,
    ]
    //animation:
    let newColor=new THREE.Color('rgb(${rgb.join(",")})');
    //new THREE.Color('rgb(0, 100, 150)');
    gsap.to(mesh.material.color, {
      r:newColor.r, 
      g:newColor.g,
      b:newColor.b,
    })
  }
})
*/