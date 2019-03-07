
function changeCameraLock(){//Changes whether or not the camera is locked during animation to change
    lockCamera = document.getElementById("chkbox1").checked;
}

function changeCameraCircleRotation(){//Changes whether or not the camera moves in a circular fashion during the animation
    circleCameraRotation = document.getElementById("chkbox2").checked;
}

function changeSensitivity(change) {//Changes sensitivity to change
    settings.mouseSensitivity = change;
}
function changeZoomSensitivity(change) {//Changes the Zoom sensitivity to change
    if(change < 0)
        change = change * -1;
    settings.zoomAmount = 1 + change/2;
}

$(document).on('mousedown',function(e){
    if(inAnimationWindow==1) {
        xStart = e.pageX;
        yStart = e.pageY;
        mouseDown = true;
    }
    else if(e.pageY>=window.innerHeight-70){
        // console.log("Mouse scrub enabled");
        mouseOnTimeline = true;
        console.log((e.pageX-10)*20);
    }
});
//triggers on the event that the mouse is down on the document. it creates a custom function that checks if it is in the animation window and creates the mouse handler. 

$(document).on('change',function(e){
    if(isNaN(yPosition))
        yPosition = 0;
    if(isNaN(xPosition))
        xPosition = 0;
    if(isNaN(zPosition))
        zPosition = 0;
});
var mouseOnTimeline = false;

$(document).on('mouseup',function(e){
    if(e.pageX>=300 && e.pageY >=50 && e.pageY<window.innerHeight-70) {
        mouseDown = false;
    }
    mouseOnTimeline = false;
});
$(document).on('keydown',function(e) {
    if (inAnimationWindow==1 && !settingsOpen && !(animationRunning && lockCamera)) {
        if (e.key == "-")
            zoomCameraM(settings.zoomAmount);
        else if (e.key == "=")
            zoomCameraM(1/settings.zoomAmount);
    }
});
$(document).on('mouseup',function(e){
    mouseDown=false;
    mouseOnTimeline = false;
});
$(document).ready(function(){
    $(document).on('mousemove', function(e){
        if(e.pageX>=300 && e.pageY >=50 && e.pageY<window.innerHeight-70) {
            inAnimationWindow = 1;
        }
        else{
            inAnimationWindow = 0;
        }
        if(mouseDown && inAnimationWindow==1 && !settingsOpen && !(animationRunning && lockCamera)){

            var MvX = settings.mouseSensitivity*(e.pageX-xStart)/100;
            var MvY = settings.mouseSensitivity*(e.pageY-yStart)/100;
            rotateCamera(MvX,MvY);


            if(e.pageX>=300 && e.pageY >=50 && e.pageY<window.innerHeight-70) {
                xStart = e.pageX;
                yStart = e.pageY;
            }
        }
        if(mouseOnTimeline){
            var frameValue = (e.pageX-10)*20;
            console.log(frameValue);
            if(frameValue>=0){
                var frames = 0;
                var a;
                for(var i=0; i<keyFrames.length-1; i++){
                    if(frameValue>=frames && frameValue<frames+keyFrames[i].duration){
                        a = i;
                        break;
                    }
                    else{
                        frames+=keyFrames[i].duration;
                    }
                }
                if(a!=null) {
                    var timingCounter = frameValue-frames;
                    xPosition = keyFrames[a].xPosition + (keyFrames[a + 1].xPosition - keyFrames[a].xPosition) / keyFrames[a].duration * timingCounter;
                    yPosition = keyFrames[a].yPosition + (keyFrames[a + 1].yPosition - keyFrames[a].yPosition) / keyFrames[a].duration * timingCounter;
                    zPosition = keyFrames[a].zPosition + (keyFrames[a + 1].zPosition - keyFrames[a].zPosition) / keyFrames[a].duration * timingCounter;
                    scene.background.r = keyFrames[a].scene.color[0] + (keyFrames[a + 1].scene.color[0] - keyFrames[a].scene.color[0]) / keyFrames[a].duration * timingCounter;
                    scene.background.g = keyFrames[a].scene.color[1] + (keyFrames[a + 1].scene.color[1] - keyFrames[a].scene.color[1]) / keyFrames[a].duration * timingCounter;
                    scene.background.b = keyFrames[a].scene.color[2] + (keyFrames[a + 1].scene.color[2] - keyFrames[a].scene.color[2]) / keyFrames[a].duration * timingCounter;
                    scene.scale.x = keyFrames[a].scene.scale[0] + (keyFrames[a + 1].scene.scale[0] - keyFrames[a].scene.scale[0]) / keyFrames[a].duration * timingCounter;
                    scene.scale.y = keyFrames[a].scene.scale[1] + (keyFrames[a + 1].scene.scale[1] - keyFrames[a].scene.scale[1]) / keyFrames[a].duration * timingCounter;
                    scene.scale.z = keyFrames[a].scene.scale[2] + (keyFrames[a + 1].scene.scale[2] - keyFrames[a].scene.scale[2]) / keyFrames[a].duration * timingCounter;
                    scene.rotation.x = keyFrames[a].scene.rotation[0] + (keyFrames[a + 1].scene.rotation[0] - keyFrames[a].scene.rotation[0]) / keyFrames[a].duration * timingCounter;
                    scene.rotation.y = keyFrames[a].scene.rotation[1] + (keyFrames[a + 1].scene.rotation[1] - keyFrames[a].scene.rotation[1]) / keyFrames[a].duration * timingCounter;
                    scene.rotation.z = keyFrames[a].scene.rotation[2] + (keyFrames[a + 1].scene.rotation[2] - keyFrames[a].scene.rotation[2]) / keyFrames[a].duration * timingCounter;
                    scene.position.x = keyFrames[a].scene.position[0] + (keyFrames[a + 1].scene.position[0] - keyFrames[a].scene.position[0]) / keyFrames[a].duration * timingCounter;
                    scene.position.y = keyFrames[a].scene.position[1] + (keyFrames[a + 1].scene.position[1] - keyFrames[a].scene.position[1]) / keyFrames[a].duration * timingCounter;
                    scene.position.z = keyFrames[a].scene.position[2] + (keyFrames[a + 1].scene.position[2] - keyFrames[a].scene.position[2]) / keyFrames[a].duration * timingCounter;
                    for (var i = 0; i < keyFrames[a].scales.length; i++) {
                        scales[i][0] = keyFrames[a].scales[i][0] + (keyFrames[a + 1].scales[i][0] - keyFrames[a].scales[i][0]) / keyFrames[a].duration * timingCounter;
                        scales[i][1] = keyFrames[a].scales[i][1] + (keyFrames[a + 1].scales[i][1] - keyFrames[a].scales[i][1]) / keyFrames[a].duration * timingCounter;
                        scales[i][2] = keyFrames[a].scales[i][2] + (keyFrames[a + 1].scales[i][2] - keyFrames[a].scales[i][2]) / keyFrames[a].duration * timingCounter;
                        borders[i].scale.x = keyFrames[a].scales[i][0] + (keyFrames[a + 1].scales[i][0] - keyFrames[a].scales[i][0]) / keyFrames[a].duration * timingCounter;
                        borders[i].scale.y = keyFrames[a].scales[i][1] + (keyFrames[a + 1].scales[i][1] - keyFrames[a].scales[i][1]) / keyFrames[a].duration * timingCounter;
                        borders[i].scale.z = keyFrames[a].scales[i][2] + (keyFrames[a + 1].scales[i][2] - keyFrames[a].scales[i][2]) / keyFrames[a].duration * timingCounter;
                        shapes[i].position.x = keyFrames[a].shapes[i][0] + (keyFrames[a + 1].shapes[i][0] - keyFrames[a].shapes[i][0]) / keyFrames[a].duration * timingCounter;
                        shapes[i].position.y = keyFrames[a].shapes[i][1] + (keyFrames[a + 1].shapes[i][1] - keyFrames[a].shapes[i][1]) / keyFrames[a].duration * timingCounter;
                        shapes[i].position.z = keyFrames[a].shapes[i][2] + (keyFrames[a + 1].shapes[i][2] - keyFrames[a].shapes[i][2]) / keyFrames[a].duration * timingCounter;
                        shapes[i].rotation.x = keyFrames[a].shapes[i][3] + (keyFrames[a + 1].shapes[i][3] - keyFrames[a].shapes[i][3]) / keyFrames[a].duration * timingCounter;
                        shapes[i].rotation.y = keyFrames[a].shapes[i][4] + (keyFrames[a + 1].shapes[i][4] - keyFrames[a].shapes[i][4]) / keyFrames[a].duration * timingCounter;
                        shapes[i].rotation.z = keyFrames[a].shapes[i][5] + (keyFrames[a + 1].shapes[i][5] - keyFrames[a].shapes[i][5]) / keyFrames[a].duration * timingCounter;
                        borders[i].position.x = keyFrames[a].shapes[i][0] + (keyFrames[a + 1].shapes[i][0] - keyFrames[a].shapes[i][0]) / keyFrames[a].duration * timingCounter;
                        borders[i].position.y = keyFrames[a].shapes[i][1] + (keyFrames[a + 1].shapes[i][1] - keyFrames[a].shapes[i][1]) / keyFrames[a].duration * timingCounter;
                        borders[i].position.z = keyFrames[a].shapes[i][2] + (keyFrames[a + 1].shapes[i][2] - keyFrames[a].shapes[i][2]) / keyFrames[a].duration * timingCounter;
                        borders[i].rotation.x = keyFrames[a].shapes[i][3] + (keyFrames[a + 1].shapes[i][3] - keyFrames[a].shapes[i][3]) / keyFrames[a].duration * timingCounter;
                        borders[i].rotation.y = keyFrames[a].shapes[i][4] + (keyFrames[a + 1].shapes[i][4] - keyFrames[a].shapes[i][4]) / keyFrames[a].duration * timingCounter;
                        borders[i].rotation.z = keyFrames[a].shapes[i][5] + (keyFrames[a + 1].shapes[i][5] - keyFrames[a].shapes[i][5]) / keyFrames[a].duration * timingCounter;
                        shapes[i].material.color.r = keyFrames[a].color[i][0] + (keyFrames[a + 1].color[i][0] - keyFrames[a].color[i][0]) / keyFrames[a].duration * timingCounter;
                        shapes[i].material.color.g = keyFrames[a].color[i][1] + (keyFrames[a + 1].color[i][1] - keyFrames[a].color[i][1]) / keyFrames[a].duration * timingCounter;
                        shapes[i].material.color.b = keyFrames[a].color[i][2] + (keyFrames[a + 1].color[i][2] - keyFrames[a].color[i][2]) / keyFrames[a].duration * timingCounter;
                        borders[i].material.color.r = keyFrames[a].borderColor[i][0] + (keyFrames[a + 1].borderColor[i][0] - keyFrames[a].borderColor[i][0]) / keyFrames[a].duration * timingCounter;
                        borders[i].material.color.g = keyFrames[a].borderColor[i][1] + (keyFrames[a + 1].borderColor[i][1] - keyFrames[a].borderColor[i][1]) / keyFrames[a].duration * timingCounter;
                        borders[i].material.color.b = keyFrames[a].borderColor[i][2] + (keyFrames[a + 1].borderColor[i][2] - keyFrames[a].borderColor[i][2]) / keyFrames[a].duration * timingCounter;
                    }
                }
            }
        }
    });
});

function zoomCameraM(amount) {
    zoom = Math.pow((Math.pow(xPosition, 2) + Math.pow(yPosition, 2) + Math.pow(zPosition, 2)), .5);//zoom calc here
    zoom*=amount;
    zoomZ = Math.cos(Math.asin(yPosition / zoom));
    var cameraRz;
    var cameraRy;
    if (xPosition !== 0)
        cameraRz = Math.atan(zPosition / xPosition);
    else if (zPosition > 0)
        cameraRz = Math.PI;
    else if (zPosition < 0)
        cameraRz = -Math.PI;

    if (xPosition < 0 && cameraRz < 0)
        cameraRz += Math.PI;
    else if (xPosition < 0 && cameraRz > 0)
        cameraRz -= Math.PI;

    if (xPosition !== 0 || zPosition !== 0)
        cameraRy = Math.atan((yPosition) / (Math.pow(Math.pow(xPosition, 2) + Math.pow(zPosition, 2), .5)));
    else if (yPosition > 0)
        cameraRy = Math.PI;
    else if (yPosition < 0)
        cameraRy = -Math.PI;

    yPosition = zoom * Math.sin(cameraRy);
    xPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.cos(cameraRz);
    zPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.sin(cameraRz);

    if(isNaN(yPosition))
        yPosition = 0;
    if(isNaN(xPosition))
        xPosition = 0;
    if(isNaN(zPosition))
        zPosition = 0;

}
/**
function zoomCameraA(amount) {
    zoom = Math.pow((Math.pow(xPosition, 2) + Math.pow(yPosition, 2) + Math.pow(zPosition, 2)), .5);//zoom calc here
    zoom+=amount;
    zoomZ = Math.cos(Math.asin(yPosition / zoom));
    var cameraRz;
    var cameraRy;
    if (xPosition !== 0)
        cameraRz = Math.atan(zPosition / xPosition);
    else if (zPosition > 0)
        cameraRz = Math.PI;
    else if (zPosition < 0)
        cameraRz = -Math.PI;

    if (xPosition < 0 && cameraRz > 0)
        cameraRz += Math.PI;
    else if (xPosition < 0 && cameraRz < 0)
        cameraRz -= Math.PI;

    if (xPosition !== 0 || zPosition !== 0)
        cameraRy = Math.atan((yPosition) / (Math.pow(Math.pow(xPosition, 2) + Math.pow(zPosition, 2), .5)));
    else if (yPosition > 0)
        cameraRy = Math.PI;
    else if (yPosition < 0)
        cameraRy = -Math.PI;

    yPosition = zoom * Math.sin(cameraRy);
    xPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.cos(cameraRz);
    zPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.sin(cameraRz);

    if(isNaN(yPosition))
        yPosition = 0;
    if(isNaN(xPosition))
        xPosition = 0;
    if(isNaN(zPosition))
        zPosition = 0;

}*/

function rotateCamera(MvX,MvY){
    zoomZ = Math.pow(Math.pow(xPosition,2)+Math.pow(zPosition, 2),.5);
    zoom = Math.pow((Math.pow(zoomZ,2)+Math.pow(yPosition,2)),.5);//zoom calc here
    var cameraRz;
    var cameraRy;
    if(xPosition !== 0)
        cameraRz = Math.atan(zPosition/xPosition);
    else if(zPosition > 0)
        cameraRz = Math.PI;
    else if(zPosition < 0)
        cameraRz = -Math.PI;

    if(xPosition < 0 && cameraRz < 0)
        cameraRz += Math.PI;
    else if(xPosition < 0 && cameraRz > 0)
        cameraRz -= Math.PI;


    if(xPosition !== 0 || zPosition !== 0)
        cameraRy = Math.atan((yPosition)/zoomZ);
    else if(yPosition > 0)
        cameraRy = Math.PI;
    else if(yPosition < 0)
        cameraRy = -Math.PI;

    cameraRz += MvX;
    cameraRy += MvY;

    yPosition = zoom * Math.sin(cameraRy);
    xPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.cos(cameraRz);
    zPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.sin(cameraRz);

    if(isNaN(yPosition))
        yPosition = 0;
    if(isNaN(xPosition))
        xPosition = 0;
    if(isNaN(zPosition))
        zPosition = 0;
}
