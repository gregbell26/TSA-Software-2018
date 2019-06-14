/*
core code of movement and stuff here.
you probably don't want to change this stuff, unless were adding a new function that changes how things animate

This file is licensed under the Apache 2.0 license.
That means that you can freely use and modify this code for all uses except for
    commercial uses provided this header is at the top of all files
Copyright 2018-2019 Monarch TSA

Author Jordan M.,  Gregory B., Jesse B.,
 */

let animate = function () {
    if (init) {//to prevent thousands of errors when the program loads
        // console.log("INIT");
        //handling the shapes position in animation
        if (camera.position.x !== xPosition + xCCenter + scene.position.x)
            camera.position.x = xPosition + xCCenter + scene.position.x;
        if (camera.position.y !== yPosition + yCCenter + scene.position.y)
            camera.position.y = yPosition + yCCenter + scene.position.y;
        if (camera.position.z !== zPosition + zCCenter + scene.position.z)
            camera.position.z = zPosition + zCCenter + scene.position.z;
        //points camera to scene
        camera.lookAt((scene.position.x + xCLook), (scene.position.y + yCLook), (scene.position.z + zCLook));
        //handles scaling the shapes in animation
        for (let i = 0; i < shapes.length; i++) {
            if (shapes[i].scale.x !== scales[i][0])
                shapes[i].scale.x = scales[i][0];
            if (shapes[i].scale.y !== scales[i][1])
                shapes[i].scale.y = scales[i][1];
            if (shapes[i].scale.z !== scales[i][2])
                shapes[i].scale.z = scales[i][2];
        }
        renderer.render(scene, camera);
        if (recording) {
            capturer.capture(renderer.domElement);
        }
        //pushes the changes to the screen
    }
    requestAnimationFrame(animate);//Do not delete this... This is the callback function
};
animate();
//makes this executed
