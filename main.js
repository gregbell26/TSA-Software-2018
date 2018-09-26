
var x = 1;
var y = 1;
var z = 1;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, document.getElementById("mainWindow").offsetWidth/document.getElementById("mainWindow").offsetHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( document.getElementById("mainWindow").offsetWidth, document.getElementById("mainWindow").offsetHeight );
document.getElementById("mainWindow").appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 2,2,1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
var geometry2 = new THREE.BoxGeometry( 1, 1,1);
var material2 = new THREE.MeshBasicMaterial( { color: 0x8000ff } );
var cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube );
scene.add(cube2);
var colorChange=false
camera.position.z = 5;
var move = 0.01;
var animate = function () {
    requestAnimationFrame( animate );
    //Animation settings
    /*if(cube2.scale.x>=2 && !colorChange){
        colorChange=true;
        console.log("done")
        cube2.material.color.setHex( 0xff0000 );
    }*/
    cube.rotation.x += move;
    cube.rotation.y += move;
    cube2.rotation.x += move;
    cube2.rotation.y += move;
    /*cube2.scale.x+=0.01;
    cube2.scale.y+=0.01;
    cube2.scale.z+=0.01*/
    cube2.scale.x=x;
    cube2.scale.y=y;
    cube2.scale.z=z;

    renderer.render( scene, camera );
};
function changeBoxDims(dimension,value){
    if(dimension=="x"){
        x=value;
    }
    else if(dimension=="y"){
        y=value;
    }
    else if(dimension=="z"){
        z=value;
    }
    console.log("INFORMATION: New deminsion for " + "Cube 1 " + dimension + " =" + value)

}
animate();