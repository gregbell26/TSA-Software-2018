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

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}