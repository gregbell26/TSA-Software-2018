class Keyframe {
    frameShapes;
    frameLights;
    frameBorders;
    frameScales;
    frameDuration;
    frameScene;
    xPosition;
    yPosition;
    zPosition;
    xCCenter;
    yCCenter;
    zCCenter;
    xCLook;
    yCLook;
    zCLook;
    circleCameraRotation;
    index;
    constructor(shapes, lights, borders, scales, duration, scene, xPos, yPos, zPos, xCCen, yCCen, zCCen, xCL, yCL, zCL, circle){
        this.frameShapes = shapes;
        this.frameLights = lights;
        this.frameBorders = borders;
        this.frameScales = scales;
        this.frameDuration = duration;
        this.frameScene = scene;
        this.xPosition = xPos;
        this.yPosition = yPos;
        this.zPosition = zPos;
        this.xCCenter = xCCen;
        this.yCCenter = yCCen;
        this.zCCenter = zCCen;
        this.xCLook = xCL;
        this.yCLook = yCL;
        this.zCLook = zCL;
        this.circleCameraRotation = circle;
        this.index = keyFrames.length;
        keyFrames.push(this);
    }

    //setters
    set frameShapes(value) {
        this.frameShapes = value;
    }

    set frameLights(value) {
        this.frameLights = value;
    }

    set frameBorders(value) {
        this.frameBorders = value;
    }

    set frameScales(value) {
        this.frameScales = value;
    }

    set frameDuration(value) {
        this.frameDuration = value;
    }

    set frameScene(value) {
        this.frameScene = value;
    }

    set xPosition(value) {
        this.xPosition = value;
    }

    set yPosition(value) {
        this.yPosition = value;
    }

    set zPosition(value) {
        this.zPosition = value;
    }

    set xCCenter(value) {
        this.xCCenter = value;
    }

    set yCCenter(value) {
        this.yCCenter = value;
    }

    set zCCenter(value) {
        this.zCCenter = value;
    }

    set xCLook(value) {
        this.xCLook = value;
    }

    set yCLook(value) {
        this.yCLook = value;
    }

    set zCLook(value) {
        this.zCLook = value;
    }

    set circleCameraRotation(value) {
        this.circleCameraRotation = value;
    }

    removeFrameShape(id){
        var shapeIndex = -1;
        for (let i = 0; i < this.frameShapes.length; i++) {
            if (id === this.frameShapes[i].uuid) {
                shapeIndex = i;
            }
        }
        if (shapeIndex === -1){
            console.log("Error: No shape exists with this id");
        } else {
            this.frameShapes.splice(shapeIndex, 1);
        }
    }

    updateScene(timingCounter) {
        if(lockCamera) {//camera stuff
            xCLook = this.xCLook + (keyFrames[this.index+1].xCLook - this.xCLook) / this.frameDuration * timingCounter;
            yCLook = this.yCLook + (keyFrames[this.index+1].yCLook - this.yCLook) / this.frameDuration * timingCounter;
            zCLook = this.zCLook + (keyFrames[this.index+1].zCLook - this.zCLook) / this.frameDuration * timingCounter;
            xCCenter = this.xCCenter + (keyFrames[this.index+1].xCCenter - this.xCCenter) / this.frameDuration * timingCounter;
            yCCenter = this.yCCenter + (keyFrames[this.index+1].yCCenter - this.yCCenter) / this.frameDuration * timingCounter;
            zCCenter = this.zCCenter + (keyFrames[this.index+1].zCCenter - this.zCCenter) / this.frameDuration * timingCounter;
            //if(timingCounter <= 10 || !animationRunning) {//this stuff only executes the first iteration or through the timeline
            if(isNaN(keyFrames[0].xCLook))//for legacy builds
                keyFrames[0].xCLook = 0;
            if(isNaN(keyFrames[0].yCLook))
                keyFrames[0].yCLook = 0;
            if(isNaN(keyFrames[0].zCLook))
                keyFrames[0].zCLook = 0;
            if(isNaN(keyFrames[1].xCLook))
                keyFrames[1].xCLook = 0;
            if(isNaN(keyFrames[1].yCLook))
                keyFrames[1].yCLook = 0;
            if(isNaN(keyFrames[1].zCLook))
                keyFrames[1].zCLook = 0;

            zoom1Zv = Math.pow(Math.pow(this.xCLook - xPosition, 2) + Math.pow(this.zCLook - zPosition, 2), .5);
            zoom1v = Math.pow((Math.pow(zoom1Zv, 2) + Math.pow(this.yCLook - yPosition, 2)), .5);//zoom1 calc here
            if(cameraDebug) {
                console.log("f1zoomZ " + zoom1Zv);
                console.log("f1zoom " + zoom1v);
            }
            Rz1v = 0;
            Ry1v = 0;
            if (this.xCLook - xPosition !== 0)
                Rz1v = Math.atan((this.zCLook - zPosition) / (this.xCLook - xPosition));
            else if (this.zCLook - zPosition > 0)
                Rz1v = Math.PI;
            else if (this.zCLook - zPosition < 0)
                Rz1v = -Math.PI;

            if (xPosition < 0 && Rz1v < 0)
                Rz1v += Math.PI;
            else if (xPosition < 0 && Rz1v > 0)
                Rz1v -= Math.PI;

            if (this.xCLook - xPosition !== 0 || zPosition -  this.zCLook !== 0)
                Ry1v = Math.atan((this.yCLook - yPosition) / zoom1Zv);
            else if (this.yCLook - yPosition > 0)
                Ry1v = Math.PI;
            else if (this.yCLook - yPosition < 0)
                Ry1v = -Math.PI;

            zoom2Zv = Math.pow(Math.pow(keyFrames[this.index+1].xCLook - xPosition, 2) + Math.pow(keyFrames[this.index+1].zCLook - zPosition, 2), .5);
            zoom2v = Math.pow((Math.pow(zoom2Zv, 2) + Math.pow(yPosition - keyFrames[this.index+1].yCLook, 2)), .5);//zoom1 calc here
            if(cameraDebug) {
                console.log("f2zoomZ " + zoom2Zv);
                console.log("f2zoom " + zoom2v);
            }
            Rz2v = 0;
            Ry2v = 0;
            if (keyFrames[this.index+1].xCLook - xPosition !== 0)
                Rz2v = Math.atan((keyFrames[this.index+1].zCLook - zPosition) / (keyFrames[this.index+1].xCLook - xPosition));
            else if (keyFrames[this.index+1].zCLook - zPosition > 0)
                Rz2v = Math.PI;
            else if (keyFrames[this.index+1].zCLook - zPosition < 0)
                Rz2v = -Math.PI;

            if (keyFrames[this.index + 1].xPosition < 0 && Rz2v < 0)
                Rz2v += Math.PI;
            else if (keyFrames[this.index + 1].xPosition < 0 && Rz2v > 0)
                Rz2v -= Math.PI;

            if (keyFrames[this.index+1].xCLook - xPosition !== 0 || keyFrames[this.index+1].zCLook - zPosition !== 0)
                Ry2v = Math.atan((keyFrames[this.index + 1].yCLook - yPosition) / zoom2Zv);
            else if (keyFrames[this.index+1].yCLook - yPosition > 0)
                Ry2v = Math.PI;
            else if (keyFrames[this.index+1].yCLook - yPosition < 0)
                Ry2v = -Math.PI;
            if(cameraDebug) {
                console.log("f1RY " + Ry1v / Math.PI * 180 + "°");
                console.log("f2RY " + Ry2v / Math.PI * 180 + "°");
                console.log("f1RZ " + Rz1v / Math.PI * 180 + "°");
                console.log("f2RZ " + Rz2v / Math.PI * 180 + "°");
            }
            MvXv = Rz2v - Rz1v;
            MvYv = Ry2v - Ry1v;
            zoomChangev = zoom2v - zoom1v;
            zoomZChangev = zoom2Zv - zoom1Zv;
            if(cameraDebug) {
                console.log("moving zoom " + zoomChangev);
                console.log("moving zoomZ " + zoomZChangev);
                console.log("moving X " + MvXv/Math.PI*180+"°");
                console.log("moving Y " + MvYv/Math.PI*180+"°");
            }
            //yCLook = (zoom1v  +  zoomChangev/this.frameDuration * timingCounter) * (Math.sin(Ry1v+MvYv/this.frameDuration * timingCounter))+yPosition;
            //xCLook = -((zoom1Zv + zoomZChangev/this.frameDuration * timingCounter) * (Math.cos(Rz1v+MvXv/this.frameDuration * timingCounter))-xPosition);
            //zCLook = -((zoom1Zv + zoomZChangev/this.frameDuration * timingCounter) * (Math.sin(Rz1v+MvXv/this.frameDuration * timingCounter))-zPosition);
            if(cameraDebug) {
                console.log(xCLook);
                console.log(yCLook);
                console.log(zCLook);
            }
            circleCameraRotation = keyFrames[this.index+1].circleCameraRotation;
            if(circleCameraRotation){//stuff for circular camera rotation
                if(timingCounter <= 10 || !animationRunning) {//this stuff only executes the first iteration or through the timeline AND only if the Camera has circular movement
                    zoom1Z = Math.pow(Math.pow(this.xPosition, 2) + Math.pow(this.zPosition, 2), .5);
                    zoom1 = Math.pow((Math.pow(zoom1Z, 2) + Math.pow(this.yPosition, 2)), .5);//zoom1 calc here
                    if(cameraDebug) {
                        console.log("f1zoomZ " + zoom1Z);
                        console.log("f1zoom " + zoom1);
                    }
                    Rz1 = 0;
                    Ry1 = 0;
                    if (this.xPosition !== 0)
                        Rz1 = Math.atan(this.zPosition / this.xPosition);
                    else if (this.zPosition > 0)
                        Rz1 = Math.PI;
                    else if (this.zPosition < 0)
                        Rz1 = -Math.PI;

                    if (this.xPosition < 0 && Rz1 < 0)
                        Rz1 += Math.PI;
                    else if (this.xPosition < 0 && Rz1 > 0)
                        Rz1 -= Math.PI;

                    if (this.xPosition !== 0 || this.zPosition !== 0)
                        Ry1 = Math.atan((this.yPosition) / zoom1Z);
                    else if (this.yPosition > 0)
                        Ry1 = Math.PI;
                    else if (this.yPosition < 0)
                        Ry1 = -Math.PI;

                    zoom2Z = Math.pow(Math.pow(keyFrames[this.index + 1].xPosition, 2) + Math.pow(keyFrames[this.index + 1].zPosition, 2), .5);
                    zoom2 = Math.pow((Math.pow(zoom2Z, 2) + Math.pow(keyFrames[this.index+1].yPosition, 2)), .5);//zoom1 calc here
                    if(cameraDebug) {
                        console.log("f2zoomZ " + zoom2Z);
                        console.log("f2zoom " + zoom2);
                    }
                    Rz2 = 0;
                    Ry2 = 0;
                    if (keyFrames[this.index + 1].xPosition !== 0)
                        Rz2 = Math.atan(keyFrames[this.index + 1].zPosition / keyFrames[this.index + 1].xPosition);
                    else if (keyFrames[this.index + 1].zPosition > 0)
                        Rz2 = Math.PI;
                    else if (keyFrames[this.index + 1].zPosition < 0)
                        Rz2 = -Math.PI;

                    if (keyFrames[this.index + 1].xPosition < 0 && Rz2 < 0)
                        Rz2 += Math.PI;
                    else if (keyFrames[this.index + 1].xPosition < 0 && Rz2 > 0)
                        Rz2 -= Math.PI;

                    if (keyFrames[this.index + 1].xPosition !== 0 || keyFrames[this.index + 1].zPosition !== 0)
                        Ry2 = Math.atan((keyFrames[this.index + 1].yPosition) / zoom2Z);
                    else if (keyFrames[this.index + 1].yPosition > 0)
                        Ry2 = Math.PI;
                    else if (keyFrames[this.index + 1].yPosition < 0)
                        Ry2 = -Math.PI;
                    if(cameraDebug) {
                        console.log("f1RY " + Ry1 / Math.PI * 180 + "°");
                        console.log("f2RY " + Ry2 / Math.PI * 180 + "°");
                        console.log("f1RZ " + Rz1 / Math.PI * 180 + "°");
                        console.log("f2RZ " + Rz2 / Math.PI * 180 + "°");
                    }
                    MvX = Rz2 - Rz1;
                    MvY = Ry2 - Ry1;
                    zoomChange = zoom2 - zoom1;
                    zoomZChange = zoom2Z - zoom1Z;
                    if(cameraDebug) {
                        console.log("moving zoom " + zoomChange);
                        console.log("moving zoomZ " + zoomZChange);
                        console.log("moving X " + MvX / Math.PI * 180 + "°");
                        console.log("moving Y " + MvY / Math.PI * 180 + "°");
                    }
                }//this stuff only executes every time
                yPosition = (zoom1  +  zoomChange/this.frameDuration * timingCounter) * (Math.sin(Ry1+MvY/this.frameDuration * timingCounter));
                xPosition = (zoom1Z + zoomZChange/this.frameDuration * timingCounter) * (Math.cos(Rz1+MvX/this.frameDuration * timingCounter));
                zPosition = (zoom1Z + zoomZChange/this.frameDuration * timingCounter) * (Math.sin(Rz1+MvX/this.frameDuration * timingCounter));
                if(cameraDebug) {
                    console.log(xPosition);
                    console.log(yPosition);
                    console.log(zPosition);
                }
                if(isNaN(yPosition))
                    yPosition = 0;
                if(isNaN(xPosition))
                    xPosition = 0;
                if(isNaN(zPosition))
                    zPosition = 0;

            }
            else {//the default camera movement
                xPosition = this.xPosition + (keyFrames[this.index + 1].xPosition - this.xPosition) / this.frameDuration * timingCounter;
                yPosition = this.yPosition + (keyFrames[this.index + 1].yPosition - this.yPosition) / this.frameDuration * timingCounter;
                zPosition = this.zPosition + (keyFrames[this.index + 1].zPosition - this.zPosition) / this.frameDuration * timingCounter;
            }
        }//non camera stuff
        scene.background.r = this.frameScene.color[0] + (keyFrames[this.index + 1].scene.color[0] - this.frameScene.color[0]) / this.frameDuration * timingCounter;
        scene.background.g = this.frameScene.color[1] + (keyFrames[this.index + 1].scene.color[1] - this.frameScene.color[1]) / this.frameDuration * timingCounter;
        scene.background.b = this.frameScene.color[2] + (keyFrames[this.index + 1].scene.color[2] - this.frameScene.color[2]) / this.frameDuration * timingCounter;
        scene.scale.x = this.frameScene.scale[0] + (keyFrames[this.index + 1].scene.scale[0] - this.frameScene.scale[0]) / this.frameDuration * timingCounter;
        scene.scale.y = this.frameScene.scale[1] + (keyFrames[this.index + 1].scene.scale[1] - this.frameScene.scale[1]) / this.frameDuration * timingCounter;
        scene.scale.z = this.frameScene.scale[2] + (keyFrames[this.index + 1].scene.scale[2] - this.frameScene.scale[2]) / this.frameDuration * timingCounter;
        scene.rotation.x = this.frameScene.rotation[0] + (keyFrames[this.index + 1].scene.rotation[0] - this.frameScene.rotation[0]) / this.frameDuration * timingCounter;
        scene.rotation.y = this.frameScene.rotation[1] + (keyFrames[this.index + 1].scene.rotation[1] - this.frameScene.rotation[1]) / this.frameDuration * timingCounter;
        scene.rotation.z = this.frameScene.rotation[2] + (keyFrames[this.index + 1].scene.rotation[2] - this.frameScene.rotation[2]) / this.frameDuration * timingCounter;
        scene.position.x = this.frameScene.position[0] + (keyFrames[this.index + 1].scene.position[0] - this.frameScene.position[0]) / this.frameDuration * timingCounter;
        scene.position.y = this.frameScene.position[1] + (keyFrames[this.index + 1].scene.position[1] - this.frameScene.position[1]) / this.frameDuration * timingCounter;
        scene.position.z = this.frameScene.position[2] + (keyFrames[this.index + 1].scene.position[2] - this.frameScene.position[2]) / this.frameDuration * timingCounter;
        for (var i = 0; i < this.frameScales.length; i++) {//individual stuff for shapes
            shapes[i].visible = this.frameShapes[i].visible;
            scales[i][0] = this.frameScales[i][0] + (keyFrames[this.index + 1].scales[i][0] - this.frameScales[i][0]) / this.frameDuration * timingCounter;
            scales[i][1] = this.frameScales[i][1] + (keyFrames[this.index + 1].scales[i][1] - this.frameScales[i][1]) / this.frameDuration * timingCounter;
            scales[i][2] = this.frameScales[i][2] + (keyFrames[this.index + 1].scales[i][2] - this.frameScales[i][2]) / this.frameDuration * timingCounter;
            borders[i].scale.x = this.frameScales[i][0] + (keyFrames[this.index + 1].scales[i][0] - this.frameScales[i][0]) / this.frameDuration * timingCounter;
            borders[i].scale.y = this.frameScales[i][1] + (keyFrames[this.index + 1].scales[i][1] - this.frameScales[i][1]) / this.frameDuration * timingCounter;
            borders[i].scale.z = this.frameScales[i][2] + (keyFrames[this.index + 1].scales[i][2] - this.frameScales[i][2]) / this.frameDuration * timingCounter;
            shapes[i].position.x = this.frameShapes[i].position.x + (keyFrames[this.index + 1].shapes[i].position.x - this.frameShapes[i].position.x) / this.frameDuration * timingCounter;
            shapes[i].position.y = this.frameShapes[i].position.y + (keyFrames[this.index + 1].shapes[i].position.y - this.frameShapes[i].position.y) / this.frameDuration * timingCounter;
            shapes[i].position.z = this.frameShapes[i].position.z + (keyFrames[this.index + 1].shapes[i].position.z - this.frameShapes[i].position.z) / this.frameDuration * timingCounter;
            shapes[i].rotation.x = this.frameShapes[i].rotation.x + (keyFrames[this.index + 1].shapes[i].rotation.x - this.frameShapes[i].rotation.x) / this.frameDuration * timingCounter;
            shapes[i].rotation.y = this.frameShapes[i].rotation.y + (keyFrames[this.index + 1].shapes[i].rotation.y - this.frameShapes[i].rotation.y) / this.frameDuration * timingCounter;
            shapes[i].rotation.z = this.frameShapes[i].rotation.z + (keyFrames[this.index + 1].shapes[i].rotation.z - this.frameShapes[i].rotation.z) / this.frameDuration * timingCounter;
            borders[i].position.x = this.frameShapes[i].position.x + (keyFrames[this.index + 1].shapes[i].position.x - this.frameShapes[i].position.x) / this.frameDuration * timingCounter;
            borders[i].position.y = this.frameShapes[i].position.y + (keyFrames[this.index + 1].shapes[i].position.y - this.frameShapes[i].position.y) / this.frameDuration * timingCounter;
            borders[i].position.z = this.frameShapes[i].position.z + (keyFrames[this.index + 1].shapes[i].position.z - this.frameShapes[i].position.z) / this.frameDuration * timingCounter;
            borders[i].rotation.x = this.frameShapes[i].rotation.x + (keyFrames[this.index + 1].shapes[i].rotation.x - this.frameShapes[i].rotation.x) / this.frameDuration * timingCounter;
            borders[i].rotation.y = this.frameShapes[i].rotation.y + (keyFrames[this.index + 1].shapes[i].rotation.y - this.frameShapes[i].rotation.y) / this.frameDuration * timingCounter;
            borders[i].rotation.z = this.frameShapes[i].rotation.z + (keyFrames[this.index + 1].shapes[i].rotation.z - this.frameShapes[i].rotation.z) / this.frameDuration * timingCounter;
            shapes[i].material.color.r = this.frameShapes[i].material.color.r + (keyFrames[this.index + 1].color[i][0] - this.frameShapes[i].material.color.r) / this.frameDuration * timingCounter;
            shapes[i].material.color.g = this.frameShapes[i].material.color.g + (keyFrames[this.index + 1].color[i][1] - this.frameShapes[i].material.color.g) / this.frameDuration * timingCounter;
            shapes[i].material.color.b = this.frameShapes[i].material.color.b + (keyFrames[this.index + 1].color[i][2] - this.frameShapes[i].material.color.b) / this.frameDuration * timingCounter;
            borders[i].material.color.r = this.frameBorders[i].material.color.r + (keyFrames[this.index + 1].borderColor[i][0] - this.frameBorders[i].material.color.r) / this.frameDuration * timingCounter;
            borders[i].material.color.g = this.frameBorders[i].material.color.g + (keyFrames[this.index + 1].borderColor[i][1] - this.frameBorders[i].material.color.g) / this.frameDuration * timingCounter;
            borders[i].material.color.b = this.frameBorders[i].material.color.b + (keyFrames[this.index + 1].borderColor[i][2] - this.frameBorders[i].material.color.b) / this.frameDuration * timingCounter;
        }
        for(var i=0; i<lights.length; i++){
            if(this.frameLights[i]!=null && keyFrames[this.index + 1].lights[i]!=null){
                lights[i].position.x = this.frameLights[i].position.x + (keyFrames[this.index + 1].lights[i].position.x - this.frameLights[i].position.x) / this.frameDuration * timingCounter;
                lights[i].position.y = this.frameLights[i].position.y + (keyFrames[this.index + 1].lights[i].position.y - this.frameLights[i].position.y) / this.frameDuration * timingCounter;
                lights[i].position.z = this.frameLights[i].position.z + (keyFrames[this.index + 1].lights[i].position.z - this.frameLights[i].position.z) / this.frameDuration * timingCounter;
                lights[i].color.r = this.frameLights[i].color.r + (keyFrames[this.index + 1].frameLights[i].color.r - this.frameLights[i].color.r) / this.frameDuration * timingCounter;
                lights[i].color.g = this.frameLights[i].color.g + (keyFrames[this.index + 1].frameLights[i].color.g - this.frameLights[i].color.g) / this.frameDuration * timingCounter;
                lights[i].color.b = this.frameLights[i].color.b + (keyFrames[this.index + 1].frameLights[i].color.b - this.frameLights[i].color.b) / this.frameDuration * timingCounter;
                lights[i].intensity = this.frameLights[i].intensity + (keyFrames[this.index + 1].frameLights[i].index - this.frameLights[i].index) / this.frameDuration * timingCounter;
            }
        }
    }

    moveKeyframe(amount){
        if(amount < 0){

        }else if(amount){

        }else{

        }

    }
}

function playAnimation(timeStartMS) {
    if (!(this === keyFrames[keyFrames.length - 1]) && !animationRunning && keyFrames.length !== 0){
        timelineButtonToggle('timeline_play');
        console.log('starting');
        animationRunning=true;
        var frames = 0;
        var timingCounter;
        var prevDuration=0;
        var a;
        for (var i = 0; i < keyFrames.length - 1; i++) {
            if (timeStartMS >= frames && timeStartMS < frames + keyFrames[i].duration) {
                a = i;
                break;
            } else {
                frames += keyFrames[i].duration;
                prevDuration+=keyFrames[i].duration;
            }
        }
        if (a != null) {
            timingCounter = timeStartMS - frames;
            animationTimer = setInterval(function () {
                document.getElementById("timeline_playHead").style.left = (11+(timingCounter+prevDuration)/timelineScale)+"px";
                if (timingCounter < keyFrames[a].duration) {
                    timingCounter += 10;
                    keyFrames[a].updateScene(timingCounter);
                }
                else {
                    if (a < keyFrames.length - 2) {
                        prevDuration+=keyFrames[a].duration;
                        a++;
                        timingCounter = 0;
                    }
                    else if (loopAnimation){
                        a = 0;
                        timingCounter = 0;
                        timelineButtonToggle('timeline_repeat');
                    }
                    else {
                        clearInterval(animationTimer);
                        timelineButtonToggle('timeline_play');
                        console.log('done');
                        animationRunning = false;
                        if(recording){
                            recording = false;
                            capturer.stop();
                            capturer.save();
                        }
                    }
                }
            }, 10);
        }
    }
}

function addFrame() {
    if(usingTutorial){
        confirm("Now change some diemsions, colors, or positions, add a keyframe, then press play.");
        animateArrow(75,15,250,60)
    }
    var frame = new Keyframe(shapes, lights, borders, scales, 5000, {
        color: [scene.background.r, scene.background.g, scene.background.b],
        scale: [scene.scale.x, scene.scale.y, scene.scale.z],
        rotation: [scene.rotation.x, scene.rotation.y, scene.rotation.z],
        position: [scene.position.x, scene.position.y, scene.position.z],
    });
    keyFrames.push(frame);
    console.log('frame added');
    console.log(keyFrames);
    loadKeyList();
    updateTimeline();
}

function loop(){
    if(animationRunning){
        loopAnimation = false;
        timelineButtonToggle('timeline_repeat');
    }
    else{
        timelineButtonToggle('timeline_repeat');
        loopAnimation = true;
        playAnimation(0);
    }
}


var recording = false;
function record(){
    recording = true;
    capturer = new CCapture({ format: 'webm' });
    capturer.start();
    playAnimation(0);
}

class timeline{
    keyframes = [];
}