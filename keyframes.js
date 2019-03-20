var timelineScale = 0;

function addFrame(){
    if(usingTutorial){
        confirm("Now change some dimensions, colors, or positions, add a keyframe, then press play.");
        animateArrow(75,15,250,60)
    }
    keyFrames.push(
        {
            //default settings for keyframe
            //collects all of the current states of the items
            duration: 5000,
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
            color: getColors(shapes),
            name: "Frame "+keyFrames.length.toString(),
            borderColor: getColors(borders),
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
    loadKeyList();
    updateTimeline();
}
function updateTimeline(){
    var duration = 0;
    for(var i=0; i<keyFrames.length-1; i++){
        duration+=keyFrames[i].duration;
    }
    timelineScale = duration/(window.innerWidth-20);
    var timeline = document.getElementById("timeline");
    timeline.innerHTML = "";
    var currentX = 10;
    for(var i=0; i<keyFrames.length; i++){
        timeline.innerHTML += ("<div style='position: absolute; left: "+currentX+"px; width: 5px; bottom: 10px; height: 50px; background-color: #00FF00;'></div>");
        currentX+=keyFrames[i].duration/timelineScale;
    }
    console.log("done")
}
//determines whether ot not to repeat the animation
function loop(){
    if(animationRunning){
        loopAnimation = false;
    }
    else{
        loopAnimation = true;
        playAnimation(0);
    }
}
//creates all of the buttons that will set the keyframes. create or remove keyframe, move them, set the speed, etc:
function loadKeyList(){
    document.getElementById('keyList').innerHTML = "";
    for(var i=0; i<keyFrames.length-1; i++){
        var add = "";
        if(i!==0){
            add = `<button class="material-icons" onclick="moveUp(`+i+`)">arrow_upward</button>`
        }
        document.getElementById('keyList').innerHTML+=`<input type="text" value="`+keyFrames[i].name+`" onkeyup="keyName(this.value,`+i+`)" onchange="keyName(this.value,`+i+`)">
<button class='material-icons' onclick='removeFrame(`+i+`)'>close</button>
`+add+`
<button class="material-icons" onclick="moveDown(`+i+`)">arrow_downward</button>
<br>
<input type='number' value='`+keyFrames[i].duration+`' onchange='setSpeed(`+i+`,Number(this.value))' onkeyup='setSpeed(`+i+`,Number(this.value))' style='width: 50px;'>milliseconds
<br>`;
    }
//creates the add keyframe button when a new keyframe is added
    if (keyFrames.length!==0){
        var add = "";
        if(keyFrames.length!==1){
            add = `<button class="material-icons" onclick="moveUp(`+(keyFrames.length - 1)+`)">arrow_upward</button>`
        }
        document.getElementById('keyList').innerHTML += `<input type="text" value="`+keyFrames[i].name+`" onkeyup="keyName(this.value,`+(keyFrames.length - 1)+`)" onchange="keyName(this.value,`+(keyFrames.length - 1)+`)"><button class='material-icons' onclick='removeFrame(` + (keyFrames.length - 1) + `)'>close</button>
`+add+`<br>`;
    }
}

function keyName(name,frame){
    keyFrames[frame].name = name;
}

function removeFrame(frame){
    keyFrames.splice(frame,1);
    loadKeyList();
    updateTimeline();
}

function moveUp(frame){
    var hold = keyFrames[frame];
    keyFrames.splice(frame,1);
    keyFrames.splice(frame-1,0,hold);
    loadKeyList();
    updateTimeline();
}
function moveDown(frame){
    var hold = keyFrames[frame];
    keyFrames.splice(frame,1);
    keyFrames.splice(frame+1,0,hold);
    loadKeyList();
    updateTimeline();
}


//takes all of the properties of the things taken above and sets them to the current viewport. All of the properties for each time is found in each iteration of the array. this takes the values in each keyframe and makes the attributes shift from the original values to the ones in the new frame
function playAnimation(frameValue) {
    if(!animationRunning) {
        console.log('starting');
        animationRunning=true;
        if (frameValue >= 0) {
            var frames = 0;
            var a;
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
                    document.getElementById("playhead").style.left = (11+(timingCounter+prevDuration)/timelineScale)+"px";
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
                            timingCounter = 0;
                        }
                        else {
                            clearInterval(animationTimer);
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
}

//sets speed of animation.
function setSpeed(i, speed){
    console.log(i);
    keyFrames[i].duration = speed;
    updateTimeline();
}

//used to store shape data because the library doesn't like us doing stuff.
function getShapes(s){
    var ret = [];
    for (var i=0; i<s.length; i++){
        ret.push([s[i].position.x,s[i].position.y,s[i].position.z,s[i].rotation.x,s[i].rotation.y,s[i].rotation.z]);
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
        });
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

function getSceneBackground(){

}

function timelineScrub(pageX) {
    var frameValue = (pageX - 10) * timelineScale;
    timelinePosition = frameValue;
    // console.log(frameValue);
    if (frameValue >= 0) {
        var frames = 0;
        var a;
        for (var i = 0; i < keyFrames.length - 1; i++) {
            if (frameValue >= frames && frameValue < frames + keyFrames[i].duration) {
                a = i;
                break;
            } else {
                frames += keyFrames[i].duration;
            }
        }
        if (a != null) {
            document.getElementById("playhead").style.left = (11+frameValue/timelineScale)+"px";
            var timingCounter = frameValue - frames;
            updateAnimation(timingCounter, a);
        }
    }
}

function updateAnimation(timingCounter,a){

    if(lockCamera) {//camera stuff

        //xCLook = keyFrames[a].xCLook + (keyFrames[a+1].xCLook - keyFrames[a].xCLook) / keyFrames[a].duration * timingCounter;
        //yCLook = keyFrames[a].yCLook + (keyFrames[a+1].yCLook - keyFrames[a].yCLook) / keyFrames[a].duration * timingCounter;
        //zCLook = keyFrames[a].zCLook + (keyFrames[a+1].zCLook - keyFrames[a].zCLook) / keyFrames[a].duration * timingCounter;
        // xCCenter = keyFrames[a].xCCenter + (keyFrames[a+1].xCCenter - keyFrames[a].xCCenter) / keyFrames[a].duration * timingCounter;
        // yCCenter = keyFrames[a].yCCenter + (keyFrames[a+1].yCCenter - keyFrames[a].yCCenter) / keyFrames[a].duration * timingCounter;
        // zCCenter = keyFrames[a].zCCenter + (keyFrames[a+1].zCCenter - keyFrames[a].zCCenter) / keyFrames[a].duration * timingCounter;
        // if(timingCounter <= 10 || !animationRunning) {//this stuff only executes the first iteration or through the timeline
        //     zoom1Zv = Math.pow(Math.pow(keyFrames[a].xCLook - keyFrames[a].xPosition, 2) + Math.pow(keyFrames[a].zCLook - keyFrames[a].zPosition, 2), .5);
        //     zoom1v = Math.pow((Math.pow(zoom1Zv, 2) + Math.pow(keyFrames[a].yCLook - keyFrames[a].yPosition, 2)), .5);//zoom1 calc here
        //     console.log("f1zoomZ " + zoom1Zv);
        //     console.log("f1zoom " + zoom1v);
        //     Rz1v = 0;
        //     Ry1v = 0;
        //     if (keyFrames[a].xCLook - keyFrames[a].xPosition !== 0)
        //         Rz1v = Math.atan((keyFrames[a].zCLook - keyFrames[a].zPosition) / (keyFrames[a].xCLook - keyFrames[a].xPosition));
        //     else if (keyFrames[a].zCLook - keyFrames[a].zPosition > 0)
        //         Rz1v = Math.PI;
        //     else if (keyFrames[a].zCLook - keyFrames[a].zPosition < 0)
        //         Rz1v = -Math.PI;
        //     while(Rz1v < -Math.PI || Rz1v > Math.PI) {
        //         if (Rz1v < Math.PI)
        //             Rz1v += 2 * Math.PI;
        //         else if (Rz1v > Math.PI)
        //             Rz1v -= 2 * Math.PI;
        //     }
        //     if (keyFrames[a].xCLook - keyFrames[a].xPosition !== 0 || keyFrames[a].zPosition -  keyFrames[a].zCLook !== 0)
        //         Ry1v = Math.atan((keyFrames[a].yCLook - keyFrames[a].yPosition) / zoom1Zv);
        //     else if (keyFrames[a].yCLook - keyFrames[a].yPosition > 0)
        //         Ry1v = Math.PI;
        //     else if (keyFrames[a].yCLook - keyFrames[a].yPosition < 0)
        //         Ry1v = -Math.PI;
        //
        //     zoom2Zv = Math.pow(Math.pow(keyFrames[a+1].xCLook - keyFrames[a+1].xPosition, 2) + Math.pow(keyFrames[a+1].zCLook - keyFrames[a+1].zPosition, 2), .5);
        //     zoom2v = Math.pow((Math.pow(zoom2Zv, 2) + Math.pow(keyFrames[a + 1].yPosition - keyFrames[a+1].yCLook, 2)), .5);//zoom1 calc here
        //     console.log("f2zoomZ " + zoom2Zv);
        //     console.log("f2zoom " + zoom2v);
        //     Rz2v = 0;
        //     Ry2v = 0;
        //     if (keyFrames[a+1].xCLook - keyFrames[a+1].xPosition !== 0)
        //         Rz2v = Math.atan((keyFrames[a+1].zCLook - keyFrames[a+1].zPosition) / (keyFrames[a+1].xCLook - keyFrames[a+1].xPosition));
        //     else if (keyFrames[a+1].zCLook - keyFrames[a+1].zPosition > 0)
        //         Rz2v = Math.PI;
        //     else if (keyFrames[a+1].zCLook - keyFrames[a+1].zPosition < 0)
        //         Rz2v = -Math.PI;
        //     while(Rz1v < -Math.PI || Rz1v > Math.PI) {
        //         if (Rz1v < Math.PI)
        //             Rz2v += 2 * Math.PI;
        //         else if (Rz1v > Math.PI)
        //             Rz2v -= 2 * Math.PI;
        //     }
        //     if (keyFrames[a+1].xCLook - keyFrames[a+1].xPosition !== 0 || keyFrames[a+1].zCLook - keyFrames[a+1].zPosition !== 0)
        //         Ry2v = Math.atan((keyFrames[a + 1].yCLook - keyFrames[a+1].yPosition) / zoom2Zv);
        //     else if (keyFrames[a+1].yCLook - keyFrames[a+1].yPosition > 0)
        //         Ry2v = Math.PI;
        //     else if (keyFrames[a+1].yCLook - keyFrames[a+1].yPosition < 0)
        //         Ry2v = -Math.PI;
        //
        //     console.log("f1RY " + Ry1v/Math.PI*180+"°");
        //     console.log("f2RY " + Ry2v/Math.PI*180+"°");
        //     console.log("f1RZ " + Rz1v/Math.PI*180+"°");
        //     console.log("f2RZ " + Rz2v/Math.PI*180+"°");
        //
        //     MvXv = Rz2v - Rz1v;
        //     MvYv = Ry2v - Ry1v;
        //     zoomChangev = zoom2v - zoom1v;
        //     zoomZChangev = zoom2Zv - zoom1Zv;
        //     console.log("moving zoom " + zoomChangev);
        //     console.log("moving zoomZ " + zoomZChangev);
        //     console.log("moving X " + MvXv/Math.PI*180+"°");
        //     console.log("moving Y " + MvYv/Math.PI*180+"°");
        // }
        //yCLook = (zoom1v  +  zoomChangev/keyFrames[a].duration * timingCounter) * (Math.sin(Ry1v+MvYv/keyFrames[a].duration * timingCounter));
        //xCLook = (zoom1Zv + zoomZChangev/keyFrames[a].duration * timingCounter) * (Math.cos(Rz1v+MvXv/keyFrames[a].duration * timingCounter));
        //zCLook = (zoom1Zv + zoomZChangev/keyFrames[a].duration * timingCounter) * (Math.sin(Rz1v+MvXv/keyFrames[a].duration * timingCounter));
        //console.log(xCLook);
        //console.log(yCLook);
        //console.log(zCLook);
        // if(circleCameraRotation){//stuff for circular camera rotation
        //     if(timingCounter <= 10 || !animationRunning) {//this stuff only executes the first iteration or through the timeline AND only if the Camera has circular movement
        //         zoom1Z = Math.pow(Math.pow(keyFrames[a].xPosition, 2) + Math.pow(keyFrames[a].zPosition, 2), .5);
        //         zoom1 = Math.pow((Math.pow(zoom1Z, 2) + Math.pow(keyFrames[a].yPosition, 2)), .5);//zoom1 calc here
        //         //console.log("f1zoomZ " + zoom1Z);
        //         //console.log("f1zoom " + zoom1);
        //         Rz1 = 0;
        //         Ry1 = 0;
        //         if (keyFrames[a].xPosition !== 0)
        //             Rz1 = Math.atan(keyFrames[a].zPosition / keyFrames[a].xPosition);
        //         else if (keyFrames[a].zPosition > 0)
        //             Rz1 = Math.PI;
        //         else if (keyFrames[a].zPosition < 0)
        //             Rz1 = -Math.PI;
        //
        //         if (keyFrames[a].xPosition < 0 && Rz1 < 0)
        //             Rz1 += Math.PI;
        //         else if (keyFrames[a].xPosition < 0 && Rz1 > 0)
        //             Rz1 -= Math.PI;
        //
        //         if (keyFrames[a].xPosition !== 0 || keyFrames[a].zPosition !== 0)
        //             Ry1 = Math.atan((keyFrames[a].yPosition) / zoom1Z);
        //         else if (keyFrames[a].yPosition > 0)
        //             Ry1 = Math.PI;
        //         else if (keyFrames[a].yPosition < 0)
        //             Ry1 = -Math.PI;
        //
        //         zoom2Z = Math.pow(Math.pow(keyFrames[a + 1].xPosition, 2) + Math.pow(keyFrames[a + 1].zPosition, 2), .5);
        //         zoom2 = Math.pow((Math.pow(zoom2Z, 2) + Math.pow(keyFrames[a+1].yPosition, 2)), .5);//zoom1 calc here
        //         //console.log("f2zoomZ " + zoom2Z);
        //         //console.log("f2zoom " + zoom2);
        //         Rz2 = 0;
        //         Ry2 = 0;
        //         if (keyFrames[a + 1].xPosition !== 0)
        //             Rz2 = Math.atan(keyFrames[a + 1].zPosition / keyFrames[a + 1].xPosition);
        //         else if (keyFrames[a + 1].zPosition > 0)
        //             Rz2 = Math.PI;
        //         else if (keyFrames[a + 1].zPosition < 0)
        //             Rz2 = -Math.PI;
        //
        //         if (keyFrames[a + 1].xPosition < 0 && Rz2 < 0)
        //             Rz2 += Math.PI;
        //         else if (keyFrames[a + 1].xPosition < 0 && Rz2 > 0)
        //             Rz2 -= Math.PI;
        //
        //         if (keyFrames[a + 1].xPosition !== 0 || keyFrames[a + 1].zPosition !== 0)
        //             Ry2 = Math.atan((keyFrames[a + 1].yPosition) / zoom2Z);
        //         else if (keyFrames[a + 1].yPosition > 0)
        //             Ry2 = Math.PI;
        //         else if (keyFrames[a + 1].yPosition < 0)
        //             Ry2 = -Math.PI;
        //         //console.log("f1RY " + Ry1/Math.PI*180+"°");
        //         //console.log("f2RY " + Ry2/Math.PI*180+"°");
        //         //console.log("f1RZ " + Rz1/Math.PI*180+"°");
        //         //console.log("f2RZ " + Rz2/Math.PI*180+"°");
        //
        //         MvX = Rz2 - Rz1;
        //         MvY = Ry2 - Ry1;
        //         zoomChange = zoom2 - zoom1;
        //         zoomZChange = zoom2Z - zoom1Z;
        //         //console.log("moving zoom " + zoomChange);
        //         //console.log("moving zoomZ " + zoomZChange);
        //         //console.log("moving X " + MvX/Math.PI*180+"°");
        //         //console.log("moving Y " + MvY/Math.PI*180+"°");
        //     }//this stuff only executes every time
        //     yPosition = (zoom1  +  zoomChange/keyFrames[a].duration * timingCounter) * (Math.sin(Ry1+MvY/keyFrames[a].duration * timingCounter));
        //     xPosition = (zoom1Z + zoomZChange/keyFrames[a].duration * timingCounter) * (Math.cos(Rz1+MvX/keyFrames[a].duration * timingCounter));
        //     zPosition = (zoom1Z + zoomZChange/keyFrames[a].duration * timingCounter) * (Math.sin(Rz1+MvX/keyFrames[a].duration * timingCounter));
        //     //console.log(xPosition);
        //     //console.log(yPosition);
        //     //console.log(zPosition);
        //     if(isNaN(yPosition))
        //         yPosition = 0;
        //     if(isNaN(xPosition))
        //         xPosition = 0;
        //     if(isNaN(zPosition))
        //         zPosition = 0;
        //
        // }
        // else {//the default camera movement
            xPosition = keyFrames[a].xPosition + (keyFrames[a + 1].xPosition - keyFrames[a].xPosition) / keyFrames[a].duration * timingCounter;
            yPosition = keyFrames[a].yPosition + (keyFrames[a + 1].yPosition - keyFrames[a].yPosition) / keyFrames[a].duration * timingCounter;
            zPosition = keyFrames[a].zPosition + (keyFrames[a + 1].zPosition - keyFrames[a].zPosition) / keyFrames[a].duration * timingCounter;
        // }
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
        lights[i].position.x = keyFrames[a].lights[i].position.x + (keyFrames[a + 1].lights[i].position.x - keyFrames[a].lights[i].position.x) / keyFrames[a].duration * timingCounter;
        lights[i].position.y = keyFrames[a].lights[i].position.y + (keyFrames[a + 1].lights[i].position.y - keyFrames[a].lights[i].position.y) / keyFrames[a].duration * timingCounter;
        lights[i].position.z = keyFrames[a].lights[i].position.z + (keyFrames[a + 1].lights[i].position.z - keyFrames[a].lights[i].position.z) / keyFrames[a].duration * timingCounter;
    }
}
var recording = false;
function record(){
    recording = true;
    capturer = new CCapture({ format: 'webm' });
    capturer.start();
    playAnimation(0);
}