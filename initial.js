//jordan's code
var shapes;
var scales;
var keyFrames;
if(localStorage.getItem('keyFrames')==null){
     shapes = [];
     scales = [[2,2,2],[3,3,1]];
     keyFrames = [];
}
else{
    //shapes = JSON.parse(localStorage.getItem('shapes'));
    shapes = [];
    keyFrames = JSON.parse(localStorage.getItem('keyFrames'));
    scales = JSON.parse(localStorage.getItem('scales'));
}

var x = 1;
var y = 1;
var z = 1;
var animationTimer;
var timingCounter;
var selectedShape = 1;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, document.getElementById("mainWindow").offsetWidth/document.getElementById("mainWindow").offsetHeight, 0.1, 1000 );
var theta = 0;
var renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true });
var xPosition = 10;
var yPosition = 10;
var zPosition = 10;


renderer.setSize( document.getElementById("mainWindow").offsetWidth, document.getElementById("mainWindow").offsetHeight );
document.getElementById("mainWindow").appendChild( renderer.domElement );
var geometry = new THREE.BoxGeometry( 1,1,1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
shapes[0] = new THREE.Mesh( geometry, material );
var geometry2 = new THREE.BoxGeometry( 1, 1,1);
var ambientLight = new THREE.AmbientLight(0xfff);
var material2 = new THREE.MeshBasicMaterial( { color: 0x8000ff } );
shapes[1] = new THREE.Mesh( geometry2, material2 );
scene.add(ambientLight);
scene.add(shapes[0]);
scene.add(shapes[1]);

camera.position.z = 5;
var move = 0.01;
