const videoBg = document.querySelector(".videoBg");
const webglContainer = document.querySelector("#webgl-container");
const changeCameraBtn = document.querySelector(".changeCameraBtn");
const closeViewerBtn = document.querySelector(".closeViewerBtn");
const header = document.querySelector("#header");
const nav = document.querySelector("#navi");
const container = document.querySelector("#container");
const itemInfo = document.querySelector("#itemInfo");

$(document).on("click", ".item .showDetail", function () {
  setTimeout(() => {
    const viewModelBtn = document.querySelector(".viewModelBtn");

    viewModelBtn.addEventListener("click", () => {
      videoBg.classList.toggle("turnOnOff");
      changeCameraBtn.classList.toggle("turnOnOff");
      webglContainer.classList.toggle("turnOnOff");
      closeViewerBtn.classList.toggle("turnOnOff");

      header.classList.toggle("turnOffOn");
      nav.classList.toggle("turnOffOn");
      container.classList.toggle("turnOffOn");
      itemInfo.classList.toggle("turnOffOn");
    });
  }, 100);

  closeViewerBtn.addEventListener("click", () => {
    console.log("hi");
    videoBg.classList.toggle("turnOnOff");
    changeCameraBtn.classList.toggle("turnOnOff");
    webglContainer.classList.toggle("turnOnOff");
    closeViewerBtn.classList.toggle("turnOnOff");

    header.classList.toggle("turnOffOn");
    nav.classList.toggle("turnOffOn");
    container.classList.toggle("turnOffOn");
    itemInfo.classList.toggle("turnOffOn");
  });
});

// background Camera video
let front = false;
let constraints = {
  audio: false,
  video: { facingMode: front ? "user" : "environment" },
};
turnVideo();

function turnVideo() {
  let video = document.getElementById("videoInput");
  function successCallback(stream) {
    video.srcObject = stream;
    video.play();
  }
  function errorCallback(error) {
    console.log(error);
  }

  navigator.getUserMedia(constraints, successCallback, errorCallback);

  console.log(constraints.video.facingMode);
}

const btn = document.querySelector(".changeCameraBtn");
btn.addEventListener("click", () => {
  front = !front;
  console.log(front);
  turnVideo();
});

// three js

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const canvas = document.querySelector("#webgl-container");
let renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 카메라와 마우스 상호작용을 위해 OrbitControls를 설정합니다.
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 1.0; // 마우스로 카메라를 회전시킬 속도입니다. 기본값(Float)은 1입니다.
controls.zoomSpeed = 1.2; // 마우스 휠로 카메라를 줌 시키는 속도 입니다. 기본값(Float)은 1입니다.
controls.panSpeed = 0.8; // 패닝 속도 입니다. 기본값(Float)은 1입니다.
controls.minDistance = 5; // 마우스 휠로 카메라 거리 조작시 최소 값. 기본값(Float)은 0 입니다.
controls.maxDistance = 100; // 마우스 휠로 카메라 거리 조작시 최대 값. 기본값(Float)은 무제한 입니다.

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update(); // 마우스로인해 변경된 카메라값을 업데이트 합니다.
}

animate();

// 비디오
