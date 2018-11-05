//core code of movement and stuff here.
//you probably don't want to change this stuff, unless were adding a new function that changes how things animate
var animate = function () {
    requestAnimationFrame( animate );

    camera.position.x = xPosition
    camera.position.y = yPosition
    camera.position.z = zPosition
    camera.lookAt(scene.position);
    for (var i=0; i<shapes.length; i++){
        shapes[i].scale.x=scales[i][0];
        shapes[i].scale.y=scales[i][1];
        shapes[i].scale.z=scales[i][2];
    }

    renderer.render( scene, camera );
};
animate();
