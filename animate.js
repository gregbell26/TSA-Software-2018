//core code of movement and stuff here.
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
