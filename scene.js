function scenePosition(dimension,value){
    scene.position[dimension]=Number(value);
}

function sceneScale(dimension, value){
    scene.scale[dimension]=Number(value);
}

function sceneBackground(value){
    scene.background= new THREE.Color(value);
}

function sceneRotation(dimension,value){
    scene.rotation[dimension] = Number(value)*Math.PI/180;
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = document.getElementById("mainWindow").offsetWidth/document.getElementById("mainWindow").offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( document.getElementById("mainWindow").offsetWidth, document.getElementById("mainWindow").offsetHeight );

}