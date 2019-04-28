var camera, scene, renderer, mesh;
var clock, controller, fire;
var keyboard = {};

var player = {
    height: 1.8,
    speed: 0.2,
    turnSpeed: Math.PI * 0.02
};
var meshFloor;


function init() {
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(20, 15, 5);
    camera.lookAt(new THREE.Vector3(30,0,20));

    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 0.8, 10000);
    light.position.set(-3, 1000, -3);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);
    //SMOKE
    var loader = new THREE.TextureLoader();
    loader.crossOrigin = '';

    var fireTex = loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/212131/Fire.png");

    var wireframeMat = new THREE.MeshBasicMaterial({
        color : new THREE.Color(0xffffff),
        wireframe : true
    });

    fire = new THREE.Fire(fireTex);

    var wireframe = new THREE.Mesh(fire.geometry, wireframeMat.clone());
    fire.add(wireframe);
    wireframe.visible = true;
    wireframe.visible = false;
    
    console.log(fire);
    fire.position.set(0, 0, 0);
    fire.position.set(0, 9, 0);
    fire.scale.set(5, 10, 5);
    scene.add(fire);
    //SHIP

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('model/Windmill.mtl', function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('model/Windmill.obj', function (mesh) {
            mesh.scale.set(1, 1, 1);
            mesh.position.set(0,0,0);
            scene.add(mesh);
        });
    });
    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [65, 83, 68];

    controls.addEventListener('change', render);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);
    // renderer.setClearColor(0xffffff);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    delta = clock.getDelta();
    controls.update();   
    var t = clock.elapsedTime;
     fire.update(t); 
    render();   
}
function render(){
    renderer.render(scene, camera);
}
window.onload = init;