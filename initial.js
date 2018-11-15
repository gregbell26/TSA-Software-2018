//jordan's code
var animationRunning = false;//self explainitory
var animationTimer;// NI
var selectedShape = -1;// The index of the selected shape (in shapes[])
var scene = new THREE.Scene();// The THREE.Scene, object
scene.background = new THREE.Color("#000000");
var camera = new THREE.PerspectiveCamera( 75, document.getElementById("mainWindow").offsetWidth/document.getElementById("mainWindow").offsetHeight, 0.1, 1000 );
// the THREE camera object
var renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true });// the THREE render object


renderer.setSize( document.getElementById("mainWindow").offsetWidth, document.getElementById("mainWindow").offsetHeight );
document.getElementById("mainWindow").appendChild( renderer.domElement );
var shapes = [];//array of shape objects
var scales = [];//array for shape scaling
//TODO try to store in shape objects
var keyFrames = [];//array for animation Keyframes
var borders = [];//array for borders of shape
if(localStorage.getItem('keyFrames')==null){
    newCube(2,2,2,0,0,0,"#00FF00","#000000");
    newCube(3,3,1,0,0,0,"#8000FF","#8000FF");
}//TODO GET RID OF THIS!!!
else{
    //shapes = JSON.parse(localStorage.getItem('shapes'));
    shapes = []
    borders = [];
    selectedShape = 0;
    //getting from storage
    var shapeData = JSON.parse(localStorage.getItem('shapes'));//the shapes you got from Storage
    keyFrames = JSON.parse(localStorage.getItem('keyFrames'));
    scales = JSON.parse(localStorage.getItem('scales'));
    console.log(shapeData);
    var type;
    var newGeometry;
    var borderGeometry;
    var edges;
    var borderToAdd;
    const newMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    for(var i=0; i<shapeData.length; i++){
        type = shapeData[i].type;
        if (type =="TextGeometry") {
            console.log('text');
            var loader = new THREE.FontLoader();
            loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

                newGeometry = new THREE.TextGeometry( 'Text test!', {
                    font: font,
                    size: 1,
                    height: 0.05,
                    curveSegments: 6,
                    bevelEnabled: false
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
            //TODO make better
            if (type == "BoxGeometry") {
                newGeometry = new THREE.BoxGeometry(1, 1, 1);
                borderGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
                newGeometry.name = "cube"
            }
            else if (type == "CylinderGeometry") {
                newGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 100);
                borderGeometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 100);
                newGeometry.name = "cylinder"
            }
            else if (type == "ConeGeometry") {
                newGeometry = new THREE.ConeGeometry(0.5, 1, 100);
                borderGeometry = new THREE.ConeBufferGeometry(0.5, 1, 100);
                newGeometry.name = "cone"
            }
            else if (type == "DodecahedronGeometry") {
                newGeometry = new THREE.DodecahedronGeometry(0.5, 0);
                borderGeometry = new THREE.DodecahedronBufferGeometry(0.5, 0);
                newGeometry.name = "dodecahedron"
            }
            else if (type == "IcosahedronGeometry") {
                newGeometry = new THREE.IcosahedronGeometry(0.5, 0);
                borderGeometry = new THREE.IcosahedronBufferGeometry(0.5, 0);
                newGeometry.name = "icosahedron"
            }
            else if (type == "OctahedronGeometry") {
                newGeometry = new THREE.OctahedronGeometry(0.5, 0);
                borderGeometry = new THREE.OctahedronBufferGeometry(0.5, 0);
                newGeometry.name = "octahedron"
            }
            else if (type == "TetrahedronGeometry") {
                newGeometry = new THREE.TetrahedronGeometry(0.5, 0);
                borderGeometry = new THREE.TetrahedronBufferGeometry(0.5, 0);
                newGeometry.name = "praymid"
            }
            else if (type == "TorusGeometry") {
                newGeometry = new THREE.TorusGeometry(0.5, 0.25, 200, 200);
                borderGeometry = new THREE.TorusBufferGeometry(0.5, 0.25, 200, 200);
                newGeometry.name = "ring"
            }
            else if (type == "SphereGeometry") {
                newGeometry = new THREE.SphereGeometry(0.5, 100, 100);
                borderGeometry = new THREE.SphereBufferGeometry(0.5, 100, 100);
                newGeometry.name = "sphere"
            }
            //TODO make it so it dosen't copy 
            shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);
            edges = new THREE.EdgesGeometry( borderGeometry );
            borderToAdd = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
            borders.push(borderToAdd);
            scene.add( borderToAdd );
            scene.add(shapes[shapes.length - 1]);
            shapes[selectedShape].position.x = shapeData[i].positionX;
            shapes[selectedShape].position.y = shapeData[i].positionY;
            shapes[selectedShape].position.z = shapeData[i].positionZ;
            shapes[selectedShape].material.color.r = shapeData[i].r;
            shapes[selectedShape].material.color.g = shapeData[i].g;
            shapes[selectedShape].material.color.b = shapeData[i].b;
            borders[selectedShape].scale.x = scales[selectedShape][0];
            borders[selectedShape].scale.y = scales[selectedShape][1];
            borders[selectedShape].scale.z = scales[selectedShape][2];
            selectedShape++;
        }
    }
}
//
