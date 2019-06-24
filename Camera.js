/*
This file contains the code for the camera's movement and stuff

This file is licensed under the Apache 2.0 license.
That means that you can freely use and modify this code for all uses except for
    commercial use provided this header is at the top of all files
Copyright 2018-2019 Monarch TSA

Author Jesse

 */
function moveCamera(dimension,newValue){
    switch(dimension){
        case "x":
            xPosition = newValue;
            break;
        case "y":
            yPosition = newValue;
            break;
        case "z":
            zPosition = newValue;
            break;
    }
}

function changeCameraCenter(dimension,newValue){
    switch(dimension){
        case "x":
            xCCenter = newValue;
            settings.camera.centerPos[0]=newValue;
            break;
        case "y":
            yCCenter = newValue;
            settings.camera.centerPos[1]=newValue;
            break;
        case "z":
            zCCenter = newValue;
            settings.camera.centerPos[2]=newValue;
            break;
    }
}

function changeCameraFocus(dimension,newValue){
    switch(dimension){
        case "x":
            xCLook = newValue;
            settings.camera.focusPos[0]=newValue;
            break;
        case "y":
            yCLook = newValue;
            settings.camera.focusPos[1]=newValue;
            break;
        case "z":
            zCLook = newValue;
            settings.camera.focusPos[2]=newValue;
            break;
    }
}


function changeCameraCircleRotation(){//Changes whether or not the camera moves in a circular fashion during the animation
    circleCameraRotation = document.getElementById("advCamera_circleToggle").checked;
}

function changeCameraLock(){//Changes whether or not the camera is locked during animation to change
    lockCamera = document.getElementById("advCamera_lockToggle").checked;
}

function changeSensitivity(change) {//Changes sensitivity to change
    settings.camera.mouseSensitivity = change;

}
function changeZoomSensitivity(change) {//Changes the Zoom sensitivity to change
    if(change < 0)
        change = change * -1;
    settings.camera.zoomAmount = 1 + change/2;
}



// //triggers on the event that the mouse is down on the document. it creates a custom function that checks if it is in the animation window and creates the mouse handler.
//
$(document).on('change',function(e){
    if(isNaN(yPosition))
        yPosition = 0;
    if(isNaN(xPosition))
        xPosition = 0;
    if(isNaN(zPosition))
        zPosition = 0;
});
var mouseOnTimeline = false;
//
$(document).on('mousedown',function(e){
    if(mobile)
        return;
    if(inAnimationWindow==1) {
        xStart = e.pageX;
        yStart = e.pageY;
        mouseDown = true;
    }
    else if(e.pageY >= window.innerHeight-100 && e.pageY<=window.innerHeight-25){
        mouseOnTimeline = true;
        timelineScrub(e.pageX);
    }
});
$(document).on('mouseup',function(e){
    if(e.pageX>=300 && e.pageY >=50 && e.pageY<window.innerHeight-70) {
        mouseDown = false;
    }
    mouseOnTimeline = false;
});
$(document).on('touchstart',function(e){

    if(e.touches[0].pageY >= 50 && e.touches[0].pageY<window.innerHeight-150) {
        inAnimationWindow = 1;
    }
    else{
        inAnimationWindow = 0;
    }
    if(inAnimationWindow==1) {
        xStart = e.touches[0].pageX;
        yStart = e.touches[0].pageY;
    }
    else if(e.touches[0].pageY >= window.innerHeight-100 && e.touches[0].pageY<=window.innerHeight-25){
        //console.log("Mouse scrub enabled");
        mouseOnTimeline = true;
        timelineScrub(e.touches[0].pageX);
    }
});
$(document).on('touchend',function(e){
    if(e.pageY >=50 && e.pageY<window.innerHeight-70) {
        mouseDown = false;
    }
    mouseOnTimeline = false;
});
$(document).on('keydown',function(e) {
    if (inAnimationWindow==1 && !settingsOpen && !(animationRunning && lockCamera)) {
        if (e.key == "-")
            zoomCameraM(settings.camera.zoomAmount);
        else if (e.key == "=")
            zoomCameraM(1/settings.camera.zoomAmount);
    }
});
$(document).on('wheel',function(e) {
    if(mobile && activeMenu !== "init"){
        return;
    }
    console.log(e.originalEvent.deltaY);
    if (inAnimationWindow==1 && !settingsOpen && !(animationRunning && lockCamera)) {
        if (e.originalEvent.deltaY > 0)
            zoomCameraM(settings.camera.zoomAmount/1.16667);
        else if (e.originalEvent.deltaY < 0)
            zoomCameraM(1/(settings.camera.zoomAmount/1.16667));
    }
});
$(document).on('mouseup',function(e){
    mouseDown=false;
    mouseOnTimeline = false;
});
var timelinePosition = 0;
$(document).ready(function(){
    $(document).on('mousemove', function(e){
        if(e.pageX>=300 && e.pageY >=50 && e.pageY<window.innerHeight-150) {
            inAnimationWindow = 1;
        }
        else{
            inAnimationWindow = 0;
        }
        if(mouseDown && inAnimationWindow==1 && !settingsOpen && !(animationRunning && lockCamera)){

            var MvX = settings.camera.mouseSensitivity*(e.pageX-xStart)/100;
            var MvY = settings.camera.mouseSensitivity*(e.pageY-yStart)/100;
            rotateCamera(MvX,MvY);


            if(e.pageX>=300 && e.pageY >=50 && e.pageY<window.innerHeight-70) {
                xStart = e.pageX;
                yStart = e.pageY;
            }
        }
        if(mouseOnTimeline){
            timelineScrub(e.pageX);
        }
    });
});

$(document).ready(function(){
    $(document).on('touchmove', function(e){

        if(e.touches[0].pageY >= 50 && e.touches[0].pageY<window.innerHeight-150) {
            inAnimationWindow = 1;
        }
        else{
            inAnimationWindow = 0;
        }
        if((activeMenu === "init") && inAnimationWindow==1 && !settingsOpen && !(animationRunning && lockCamera)){

            var MvX = settings.camera.mouseSensitivity*(e.touches[0].pageX-xStart)/100;
            var MvY = settings.camera.mouseSensitivity*(e.touches[0].pageY-yStart)/100;

            rotateCamera(MvX,MvY);


            if(e.touches[0].pageY >=50 && e.touches[0].pageY<window.innerHeight-150) {
                xStart = e.touches[0].pageX;
                yStart = e.touches[0].pageY;
            }
        }
        if(mouseOnTimeline){
            timelineScrub(e.touches[0].pageX);
        }
    });
});

function zoomCameraM(amount) {
    console.log(amount);
    zoom = Math.pow((Math.pow(xPosition, 2) + Math.pow(yPosition, 2) + Math.pow(zPosition, 2)), .5);//zoom calc here
    if(zoom*amount>1*Math.pow(10,100) || zoom * amount < 1*Math.pow(10,-100)){
        xPosition = 10;
        yPosition = 10;
        zPosition = 10;
        showPopUp("popUp_error_body", "You dun messed up", "You have zoomed to infinity and entered easter egg mode, where css styling degrades into madness and everything is pain. " +
            "Remember to save your changes before refreshing the page to end this madness.",-1);
        stylesheetLoader("memeMode");
        return;
    }
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

    if(xPosition < 0) {
        if (cameraRz < 0)
            cameraRz += Math.PI;
        else if (cameraRz > 0)
            cameraRz -= Math.PI;
    }

    if (xPosition !== 0 || zPosition !== 0)
        cameraRy = Math.atan((yPosition) / (Math.pow(Math.pow(xPosition, 2) + Math.pow(zPosition, 2), .5)));
    else if (yPosition > 0)
        cameraRy = Math.PI;
    else if (yPosition < 0)
        cameraRy = -Math.PI;


    yPosition = zoom * Math.sin(cameraRy);
    xPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.cos(cameraRz);
    zPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.sin(cameraRz);
    getId("camera_x").value = xPosition;
    getId("camera_y").value = yPosition;
    getId("camera_z").value = zPosition;


    if(isNaN(yPosition))
        yPosition = 0;
    if(isNaN(xPosition))
        xPosition = 0;
    if(isNaN(zPosition))
        zPosition = 0;

}
//
function rotateCamera(MvX,MvY){
    zoomZ = Math.pow(Math.pow(xPosition,2)+Math.pow(zPosition, 2),.5);
    zoom = Math.pow((Math.pow(zoomZ,2)+Math.pow(yPosition,2)),.5);//zoom calc here
    var cameraRz;
    var cameraRy;
    if(xPosition !== 0)
        cameraRz = Math.atan(zPosition/xPosition);
    else if(zPosition > 0)
        cameraRz = Math.PI;
    else if(zPosition <= 0)
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
    getId("camera_x").value = xPosition;
    getId("camera_y").value = yPosition;
    getId("camera_z").value = zPosition;
    getId("advCamera_centerX").value = xCCenter;
    getId("advCamera_centerY").value = yCCenter;
    getId("advCamera_centerZ").value = zCCenter;

    getId("advCamera_focusX").value = xCLook;
    getId("advCamera_focusY").value = yCLook;
    getId("advCamera_focusZ").value = zCLook;
    if(isNaN(yPosition))
        yPosition = 0;
    if(isNaN(xPosition))
        xPosition = 0;
    if(isNaN(zPosition))
        zPosition = 0;
}
