//jordan's code
var x = 1;
var y = 1;
var z = 1;
var animationRunning = false;
var animationTimer;
var selectedShape = 0;
var scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");
var camera = new THREE.PerspectiveCamera( 75, document.getElementById("mainWindow").offsetWidth/document.getElementById("mainWindow").offsetHeight, 0.1, 1000 );
var theta = 0;
var renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true });
var xPosition = 10;
var yPosition = 10;
var zPosition = 10;


renderer.setSize( document.getElementById("mainWindow").offsetWidth, document.getElementById("mainWindow").offsetHeight );
document.getElementById("mainWindow").appendChild( renderer.domElement );


camera.position.z = 5;
var move = 0.01;

var shapes = [];
var scales = [];
var keyFrames = [];
if(localStorage.getItem('keyFrames')==null){
    shapes = [];
    scales = [[2,2,2],[3,3,1]];
    keyFrames = [];
    var geometry = new THREE.BoxGeometry( 1,1,1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    geometry.name="cube";
    shapes[0] = new THREE.Mesh( geometry, material );
    var geometry2 = new THREE.BoxGeometry( 1, 1,1);
    var material2 = new THREE.MeshBasicMaterial( { color: 0x8000ff } );
    geometry2.name="cube";
    shapes[1] = new THREE.Mesh( geometry2, material2 );
    scene.add(shapes[0]);
    scene.add(shapes[1]);
    selectedShape++;
}
else{
    //shapes = JSON.parse(localStorage.getItem('shapes'));
    shapes = [];
    var shapeData = JSON.parse(localStorage.getItem('shapes'));
    keyFrames = JSON.parse(localStorage.getItem('keyFrames'));
    scales = JSON.parse(localStorage.getItem('scales'));
    console.log(shapeData);
    for(var i=0; i<shapeData.length; i++){
        var type = shapeData[i].type;
        var newGeometry;
        if (type =="TextGeometry") {
            console.log('text');
            var loader = new THREE.FontLoader();
            loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

                var newGeometry = new THREE.TextGeometry( 'Text test!', {
                    font: font,
                    size: 1,
                    height: 0.05,
                    curveSegments: 6,
                    bevelEnabled: true,
                    bevelThickness: 0.5,
                    bevelSize: 0.05,
                    bevelSegments: 2.5
                } );
                newGeometry.name="text";
                const newMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
                shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);
                scene.add(shapes[shapes.length - 1]);
                shapes[selectedShape].position.x = shapeData[i].positionX;
                shapes[selectedShape].position.y = shapeData[i].positionY;
                shapes[selectedShape].position.z = shapeData[i].positionZ;
                shapes[selectedShape].material.color.r = shapeData[i].r;
                shapes[selectedShape].material.color.g = shapeData[i].g;
                shapes[selectedShape].material.color.b = shapeData[i].b;
                selectedShape++;
            } );
        }
        else {
            if (type == "BoxGeometry") {
                newGeometry = new THREE.BoxGeometry(1, 1, 1);
                newGeometry.name = "cube"
            }
            else if (type == "CylinderGeometry") {
                newGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 100);
                newGeometry.name = "cylinder"
            }
            else if (type == "ConeGeometry") {
                newGeometry = new THREE.ConeGeometry(0.5, 1, 100);
                newGeometry.name = "cone"
            }
            else if (type == "DodecahedronGeometry") {
                newGeometry = new THREE.DodecahedronGeometry(0.5, 0);
                newGeometry.name = "dodecahedron"
            }
            else if (type == "IcosahedronGeometry") {
                newGeometry = new THREE.IcosahedronGeometry(0.5, 0);
                newGeometry.name = "icosahedron"
            }
            else if (type == "OctahedronGeometry") {
                newGeometry = new THREE.OctahedronGeometry(0.5, 0);
                newGeometry.name = "octahedron"
            }
            else if (type == "TetrahedronGeometry") {
                newGeometry = new THREE.TetrahedronGeometry(0.5, 0);
                newGeometry.name = "praymid"
            }
            else if (type == "TorusGeometry") {
                newGeometry = new THREE.TorusGeometry(0.5, 0.25, 200, 200);
                newGeometry.name = "ring"
            }
            else if (type == "SphereGeometry") {
                newGeometry = new THREE.SphereGeometry(0.5, 100, 100);
                newGeometry.name = "sphere"
            }
            const newMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
            shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);
            scene.add(shapes[shapes.length - 1]);
            shapes[selectedShape].position.x = shapeData[i].positionX;
            shapes[selectedShape].position.y = shapeData[i].positionY;
            shapes[selectedShape].position.z = shapeData[i].positionZ;
            shapes[selectedShape].material.color.r = shapeData[i].r;
            shapes[selectedShape].material.color.g = shapeData[i].g;
            shapes[selectedShape].material.color.b = shapeData[i].b;
            selectedShape++;
        }
    }
}
//