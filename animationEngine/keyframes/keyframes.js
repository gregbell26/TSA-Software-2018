function addFrame(){
    if(usingTutorial){
        confirm("Now change some diemsions, colors, or positions, add a keyframe, then press play.");
        animateArrow(75,15,250,60)
    }
    if(!scene.background){
        scene.background = new THREE.Color("#000000");
    }

    keyFrames.push(
        {
            //default settings for keyframe
            //collects all of the current states of the items
            duration: 2000,
            shapes: getShapes(shapes),
            scales: JSON.parse(JSON.stringify(scales)),
            xPosition: xPosition,
            yPosition: yPosition,
            zPosition: zPosition,
            xCCenter:xCCenter,
            yCCenter:yCCenter,
            zCCenter:zCCenter,
            xCLook: xCLook,
            yCLook: yCLook,
            zCLook: zCLook,
            circleCameraRotation: circleCameraRotation,
            color: getColors(shapes),
            name: "Frame "+keyFrames.length.toString(),
            borderColor: getColors(borders),
            borderVisible: borders.visible,
            scene: {
                color: [scene.background.r, scene.background.g, scene.background.b],
                scale: [scene.scale.x, scene.scale.y, scene.scale.z],
                rotation: [scene.rotation.x, scene.rotation.y, scene.rotation.z],
                position: [scene.position.x, scene.position.y, scene.position.z],
            },
            lights: getLights(lights)
        }
    );
    console.log('frame added');
    console.log(keyFrames);
    updateTimeline();
}

//creates all of the buttons that will set the keyframes. create or remove keyframe, move them, set the speed, etc:
function loadKeyList(){
    console.log("Load Key List Called ");
}

//takes all of the properties of the things taken above and sets them to the current viewport.
// All of the properties for each time is found in each iteration of the array. this takes the values
// in each keyframe and makes the attributes shift from the original values to the ones in the new frame
function playAnimation(frameValue) {
    var dontRun = false;
    if (keyFrames.length === 0){
        dontRun = true;
    }
    if(!animationRunning && !dontRun) {
        timelineButtonToggle('timeline_play');
        console.log('starting');
        animationRunning=true;
        if (frameValue >= 0) {
            var frames = 0;
            var a; //current keyframe
            var timingCounter;
            var prevDuration=0;
            for (var i = 0; i < keyFrames.length - 1; i++) {
                if (frameValue >= frames && frameValue < frames + keyFrames[i].duration) {
                    a = i;
                    break;
                } else {
                    frames += keyFrames[i].duration;
                    prevDuration+=keyFrames[i].duration;
                }
            }
            if (a != null) {
                timingCounter = frameValue - frames;
                animationTimer = setInterval(function () {
                    document.getElementById("timeline_playHead").style.left = (11+(timingCounter+prevDuration)/timelineScale)+"px";
                    if (timingCounter < keyFrames[a].duration) {
                        timingCounter += 10;
                        updateAnimation(timingCounter,a);
                    }
                    else {
                        if (a < keyFrames.length - 2) {
                            prevDuration+=keyFrames[a].duration;
                            a++;
                            timingCounter = 0;
                        }
                        else if (loopAnimation){
                            a = 0;
                            prevDuration=0;
                            timingCounter = 0;
                            document.getElementById("timeline_playHead").style.left = (1)+"px";
                            //timelineButtonToggle('timeline_repeat');
                        }
                        else {
                            clearInterval(animationTimer);
                            timelineButtonToggle('timeline_play');
                            console.log('done');
                            animationRunning = false;
                            if(recording){
                                timelineButtonToggle("timeline_record");
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
}

//used to store shape data because the library doesn't like us doing stuff.
function getShapes(s){
    var ret = [];
    for (var i=0; i<s.length; i++){
        ret.push([s[i].position.x,s[i].position.y,s[i].position.z,s[i].rotation.x,s[i].rotation.y,s[i].rotation.z,s[i].visible]);
    }
    return ret;
}

function getLights(s){
    var ret = [];
    for(var i=0; i<s.length; i++){
        ret.push({
            intensity: JSON.parse(JSON.stringify(s[i].intensity)),
            position: JSON.parse(JSON.stringify(s[i].position)),
            color: JSON.parse(JSON.stringify(s[i].color)),
            rotation: JSON.parse(JSON.stringify(s[i].rotation)),
            visible: s[i].visible
        });
        // if(s[i].type === "hemisphereLight"){
        //     ret[i] += {color2:JSON.parse(JSON.stringify(s[i].groundColor))}
        // }
    }

    return ret;
}

//used to store color values because the library doesn't like us doing stuff.
function getColors(s){
    var ret = [];
    for (var i=0; i<s.length; i++){
        ret.push([s[i].material.color.r,s[i].material.color.g,s[i].material.color.b]);
    }
    return ret;
}

function updateAnimation(timingCounter,a){

    if(lockCamera) {//camera stuff

        xCLook = keyFrames[a].xCLook + (keyFrames[a+1].xCLook - keyFrames[a].xCLook) / keyFrames[a].duration * timingCounter;
        yCLook = keyFrames[a].yCLook + (keyFrames[a+1].yCLook - keyFrames[a].yCLook) / keyFrames[a].duration * timingCounter;
        zCLook = keyFrames[a].zCLook + (keyFrames[a+1].zCLook - keyFrames[a].zCLook) / keyFrames[a].duration * timingCounter;
        xCCenter = keyFrames[a].xCCenter + (keyFrames[a+1].xCCenter - keyFrames[a].xCCenter) / keyFrames[a].duration * timingCounter;
        yCCenter = keyFrames[a].yCCenter + (keyFrames[a+1].yCCenter - keyFrames[a].yCCenter) / keyFrames[a].duration * timingCounter;
        zCCenter = keyFrames[a].zCCenter + (keyFrames[a+1].zCCenter - keyFrames[a].zCCenter) / keyFrames[a].duration * timingCounter;
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

            zoom1Zv = Math.pow(Math.pow(keyFrames[a].xCLook - xPosition, 2) + Math.pow(keyFrames[a].zCLook - zPosition, 2), .5);
            zoom1v = Math.pow((Math.pow(zoom1Zv, 2) + Math.pow(keyFrames[a].yCLook - yPosition, 2)), .5);//zoom1 calc here
        if(cameraDebug) {
            console.log("f1zoomZ " + zoom1Zv);
            console.log("f1zoom " + zoom1v);
        }
            Rz1v = 0;
            Ry1v = 0;
            if (keyFrames[a].xCLook - xPosition !== 0)
                Rz1v = Math.atan((keyFrames[a].zCLook - zPosition) / (keyFrames[a].xCLook - xPosition));
            else if (keyFrames[a].zCLook - zPosition > 0)
                Rz1v = Math.PI;
            else if (keyFrames[a].zCLook - zPosition < 0)
                Rz1v = -Math.PI;

            if (xPosition < 0 && Rz1v < 0)
                Rz1v += Math.PI;
            else if (xPosition < 0 && Rz1v > 0)
                Rz1v -= Math.PI;

            if (keyFrames[a].xCLook - xPosition !== 0 || zPosition -  keyFrames[a].zCLook !== 0)
                Ry1v = Math.atan((keyFrames[a].yCLook - yPosition) / zoom1Zv);
            else if (keyFrames[a].yCLook - yPosition > 0)
                Ry1v = Math.PI;
            else if (keyFrames[a].yCLook - yPosition < 0)
                Ry1v = -Math.PI;

            zoom2Zv = Math.pow(Math.pow(keyFrames[a+1].xCLook - xPosition, 2) + Math.pow(keyFrames[a+1].zCLook - zPosition, 2), .5);
            zoom2v = Math.pow((Math.pow(zoom2Zv, 2) + Math.pow(yPosition - keyFrames[a+1].yCLook, 2)), .5);//zoom1 calc here
        if(cameraDebug) {
            console.log("f2zoomZ " + zoom2Zv);
            console.log("f2zoom " + zoom2v);
        }
            Rz2v = 0;
            Ry2v = 0;
            if (keyFrames[a+1].xCLook - xPosition !== 0)
                Rz2v = Math.atan((keyFrames[a+1].zCLook - zPosition) / (keyFrames[a+1].xCLook - xPosition));
            else if (keyFrames[a+1].zCLook - zPosition > 0)
                Rz2v = Math.PI;
            else if (keyFrames[a+1].zCLook - zPosition < 0)
                Rz2v = -Math.PI;

            if (keyFrames[a + 1].xPosition < 0 && Rz2v < 0)
                Rz2v += Math.PI;
            else if (keyFrames[a + 1].xPosition < 0 && Rz2v > 0)
                Rz2v -= Math.PI;

            if (keyFrames[a+1].xCLook - xPosition !== 0 || keyFrames[a+1].zCLook - zPosition !== 0)
                Ry2v = Math.atan((keyFrames[a + 1].yCLook - yPosition) / zoom2Zv);
            else if (keyFrames[a+1].yCLook - yPosition > 0)
                Ry2v = Math.PI;
            else if (keyFrames[a+1].yCLook - yPosition < 0)
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
        //yCLook = (zoom1v  +  zoomChangev/keyFrames[a].duration * timingCounter) * (Math.sin(Ry1v+MvYv/keyFrames[a].duration * timingCounter))+yPosition;
        //xCLook = -((zoom1Zv + zoomZChangev/keyFrames[a].duration * timingCounter) * (Math.cos(Rz1v+MvXv/keyFrames[a].duration * timingCounter))-xPosition);
        //zCLook = -((zoom1Zv + zoomZChangev/keyFrames[a].duration * timingCounter) * (Math.sin(Rz1v+MvXv/keyFrames[a].duration * timingCounter))-zPosition);
        if(cameraDebug) {
            console.log(xCLook);
            console.log(yCLook);
            console.log(zCLook);
        }
        circleCameraRotation = keyFrames[a+1].circleCameraRotation;
        if(circleCameraRotation){//stuff for circular camera rotation
            if(timingCounter <= 10 || !animationRunning) {//this stuff only executes the first iteration or through the timeline AND only if the Camera has circular movement
                zoom1Z = Math.pow(Math.pow(keyFrames[a].xPosition, 2) + Math.pow(keyFrames[a].zPosition, 2), .5);
                zoom1 = Math.pow((Math.pow(zoom1Z, 2) + Math.pow(keyFrames[a].yPosition, 2)), .5);//zoom1 calc here
                if(cameraDebug) {
                    console.log("f1zoomZ " + zoom1Z);
                    console.log("f1zoom " + zoom1);
                }
                Rz1 = 0;
                Ry1 = 0;
                if (keyFrames[a].xPosition !== 0)
                    Rz1 = Math.atan(keyFrames[a].zPosition / keyFrames[a].xPosition);
                else if (keyFrames[a].zPosition > 0)
                    Rz1 = Math.PI;
                else if (keyFrames[a].zPosition < 0)
                    Rz1 = -Math.PI;

                if (keyFrames[a].xPosition < 0 && Rz1 < 0)
                    Rz1 += Math.PI;
                else if (keyFrames[a].xPosition < 0 && Rz1 > 0)
                    Rz1 -= Math.PI;

                if (keyFrames[a].xPosition !== 0 || keyFrames[a].zPosition !== 0)
                    Ry1 = Math.atan((keyFrames[a].yPosition) / zoom1Z);
                else if (keyFrames[a].yPosition > 0)
                    Ry1 = Math.PI;
                else if (keyFrames[a].yPosition < 0)
                    Ry1 = -Math.PI;

                zoom2Z = Math.pow(Math.pow(keyFrames[a + 1].xPosition, 2) + Math.pow(keyFrames[a + 1].zPosition, 2), .5);
                zoom2 = Math.pow((Math.pow(zoom2Z, 2) + Math.pow(keyFrames[a+1].yPosition, 2)), .5);//zoom1 calc here
                    if(cameraDebug) {
                        console.log("f2zoomZ " + zoom2Z);
                        console.log("f2zoom " + zoom2);
                    }
                Rz2 = 0;
                Ry2 = 0;
                if (keyFrames[a + 1].xPosition !== 0)
                    Rz2 = Math.atan(keyFrames[a + 1].zPosition / keyFrames[a + 1].xPosition);
                else if (keyFrames[a + 1].zPosition > 0)
                    Rz2 = Math.PI;
                else if (keyFrames[a + 1].zPosition < 0)
                    Rz2 = -Math.PI;

                if (keyFrames[a + 1].xPosition < 0 && Rz2 < 0)
                    Rz2 += Math.PI;
                else if (keyFrames[a + 1].xPosition < 0 && Rz2 > 0)
                    Rz2 -= Math.PI;

                if (keyFrames[a + 1].xPosition !== 0 || keyFrames[a + 1].zPosition !== 0)
                    Ry2 = Math.atan((keyFrames[a + 1].yPosition) / zoom2Z);
                else if (keyFrames[a + 1].yPosition > 0)
                    Ry2 = Math.PI;
                else if (keyFrames[a + 1].yPosition < 0)
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
            yPosition = (zoom1  +  zoomChange/keyFrames[a].duration * timingCounter) * (Math.sin(Ry1+MvY/keyFrames[a].duration * timingCounter));
            xPosition = (zoom1Z + zoomZChange/keyFrames[a].duration * timingCounter) * (Math.cos(Rz1+MvX/keyFrames[a].duration * timingCounter));
            zPosition = (zoom1Z + zoomZChange/keyFrames[a].duration * timingCounter) * (Math.sin(Rz1+MvX/keyFrames[a].duration * timingCounter));
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
            xPosition = keyFrames[a].xPosition + (keyFrames[a + 1].xPosition - keyFrames[a].xPosition) / keyFrames[a].duration * timingCounter;
            yPosition = keyFrames[a].yPosition + (keyFrames[a + 1].yPosition - keyFrames[a].yPosition) / keyFrames[a].duration * timingCounter;
            zPosition = keyFrames[a].zPosition + (keyFrames[a + 1].zPosition - keyFrames[a].zPosition) / keyFrames[a].duration * timingCounter;
        }
    }//non camera stuff
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
    for (var i = 0; i < keyFrames[a].scales.length; i++) {//individual stuff for shapes
        shapes[i].visible = keyFrames[a+1].shapes[i][6];
        borders[i].visible = keyFrames[a+1].shapes[i][6] && keyFrames[a+1].borderVisible;
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
    for(var i=0; i<lights.length; i++){
        if(keyFrames[a].lights[i]!=null && keyFrames[a+1].lights[i]!=null){
            lights[i].visible = keyFrames[a].lights.visible;
            lights[i].position.x = keyFrames[a].lights[i].position.x + (keyFrames[a + 1].lights[i].position.x - keyFrames[a].lights[i].position.x) / keyFrames[a].duration * timingCounter;
            lights[i].position.y = keyFrames[a].lights[i].position.y + (keyFrames[a + 1].lights[i].position.y - keyFrames[a].lights[i].position.y) / keyFrames[a].duration * timingCounter;
            lights[i].position.z = keyFrames[a].lights[i].position.z + (keyFrames[a + 1].lights[i].position.z - keyFrames[a].lights[i].position.z) / keyFrames[a].duration * timingCounter;
        }
    }
}
var recording = false;
function record(){
    recording = true;
    capturer = new CCapture({
        format: 'webm',
        frameRate: 60,
        name: saveEngine.localFileName,
    });
    timelineButtonToggle("timeline_record");
    capturer.start();
    playAnimation(0);
    //timelineButtonToggle("timeline_record");
}