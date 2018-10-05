//core code of movement and stuff here.
var turnSpeed = 0.0;
var radius = 10;
var animate = function () {
    requestAnimationFrame( animate );
    turnSpeed+=1;
    camera.position.x = radius * Math.sin( THREE.Math.degToRad( turnSpeed ) );
    camera.position.y = radius * Math.sin( THREE.Math.degToRad( turnSpeed ) );
    camera.position.z = radius * Math.cos( THREE.Math.degToRad( turnSpeed ) );
    camera.lookAt(scene.position);
    for (var i=0; i<shapes.length; i++){
        shapes[i].scale.x=scales[i][0];
        shapes[i].scale.y=scales[i][1];
        shapes[i].scale.z=scales[i][2];
    }

    renderer.render( scene, camera );
};
animate();
