//core code of movement and stuff here.
//you probably don't want to change this stuff, unless were adding a new function that changes how things animate
var animate = function () {
    requestAnimationFrame( animate );
        if (camera.position.x != xPosition)
            camera.position.x = xPosition + xCCenter + scene.position.x;
        if (camera.position.y != yPosition)
            camera.position.y = yPosition + yCCenter + scene.position.y;
        if (camera.position.z != zPosition)
            camera.position.z = zPosition + zCCenter + scene.position.z;
    //handling the shapes position in animation
    camera.lookAt((scene.position.x+xCCenter),(scene.position.y+yCCenter),(scene.position.z+zCCenter));
    //points camera to scene
    for (var i=0; i<shapes.length; i++){
        if(shapes[i].scale.x!=scales[i][0])
            shapes[i].scale.x=scales[i][0];
        if(shapes[i].scale.y!=scales[i][1])
            shapes[i].scale.y=scales[i][1];
        if(shapes[i].scale.z!=scales[i][2])
            shapes[i].scale.z=scales[i][2];
    }
//handles scaling the shapes in animation
    renderer.render( scene, camera );
    //pushes the changes to the screen
};
animate();
//makes this executed
