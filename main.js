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

var animate = function () {
    requestAnimationFrame( animate );
    //Animation settings
    for (var i=0; i<shapes.length; i++){
        shapes[i].rotation.x+=move;
        shapes[i].rotation.y+=move;
        shapes[i].rotation.z+=move;
        shapes[i].scale.x=scales[i][0];
        shapes[i].scale.y=scales[i][1];
        shapes[i].scale.z=scales[i][2];
    }

    renderer.render( scene, camera );
};
animate();
setSelectedShape(1);

function showList(){
    var sideBar=document.getElementById('sideBarList');
    document.getElementById("sideBarBoxEdit").style.display="none";
    document.getElementById("sideBarList").style.display="inherit";
    sideBar.innerHTML="";
    for (var i=0; i<shapes.length; i++){
        //console.log("Shape "+(i+1)+": "+shapes[i]['geometry']['type']);
        sideBar.innerHTML+="<a onclick='setSelectedShape("+i+")'>"+(i+1)+": "+shapes[i]['geometry']['type']+"</a><br>";
    }
}
function setSelectedShape(num){
    selectedShape = num;
    document.getElementById('boxSelected').innerHTML="#"+(selectedShape+1);
    document.getElementById("sideBarBoxEdit").style.display="inherit";
    document.getElementById("sideBarList").style.display="none";
    var color = "#";
    color += rgbToHex(shapes[selectedShape].material.color['r']*255)
    color += rgbToHex(shapes[selectedShape].material.color['g']*255)
    color += rgbToHex(shapes[selectedShape].material.color['b']*255)
    document.getElementById('colorChanger').value = color;
    document.getElementById('parameterBoxX').value = shapes[selectedShape].scale.x;
    document.getElementById('parameterBoxY').value = shapes[selectedShape].scale.y;
    document.getElementById('parameterBoxZ').value = shapes[selectedShape].scale.z;
}

function cubeMenu(){
    document.getElementById("sideBarBoxEdit").style.display="inherit";
    document.getElementById("sideBarList").style.display="none";
}
function newCube(){
    document.getElementById("sideBarBoxEdit").style.display="inherit";
    document.getElementById("sideBarList").style.display="none";
    var newGeometry = new THREE.BoxGeometry(1,1,1);
    var color = getRandomColor();
    var newMaterial = new THREE.MeshBasicMaterial({color: color})
    shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
    var length = scales.length;
    scales[length]=[];
    scales[length][0]=1;
    scales[length][1]=1;
    scales[length][2]=1;
    scene.add(shapes[shapes.length-1]);
    shapes[length].rotation.x = shapes[0].rotation.x;
    shapes[length].rotation.y = shapes[0].rotation.y;
    shapes[length].rotation.z = shapes[0].rotation.z;
    selectedShape++;
    setSelectedShape(selectedShape);
}
function boxDimension(dimension,value){

    switch(dimension){
        case "x":
            scales[selectedShape][0]=value;
            break;
        case "y":
            scales[selectedShape][1]=value;
            break;
        case "z":
            scales[selectedShape][2]=value;
            break;
    }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function changeColor(value){
    shapes[selectedShape].material.color.set(value);
}
function removeCube(){
    scene.remove(shapes[selectedShape]);
    shapes.splice(selectedShape,1);
    scales.splice(selectedShape,1);
    selectedShape--;
    setSelectedShape(selectedShape);
}
function rgbToHex (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

function moveShape(dimension, value){
    switch(dimension){
        case "x":
            shapes[selectedShape].position.x = value;
            break;
        case "y":
            shapes[selectedShape].position.y = value;
            break;
        case "z":
            shapes[selectedShape].position.z = value;
            break;
    }
}
