var shapes = [];
var scales = [[2,2,2],[3,3,1]];
var x = 1;
var y = 1;
var z = 1;
var selectedShape = 1;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, document.getElementById("mainWindow").offsetWidth/document.getElementById("mainWindow").offsetHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( document.getElementById("mainWindow").offsetWidth, document.getElementById("mainWindow").offsetHeight );
document.getElementById("mainWindow").appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1,1,1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
shapes[0] = new THREE.Mesh( geometry, material );
var geometry2 = new THREE.BoxGeometry( 1, 1,1);
var material2 = new THREE.MeshBasicMaterial( { color: 0x8000ff } );
shapes[1] = new THREE.Mesh( geometry2, material2 );
scene.add(shapes[0]);
scene.add(shapes[1]);
camera.position.z = 5;
var move = 0.01;