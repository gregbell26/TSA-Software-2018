function addFrame(){
    if(usingTutorial){
        confirm("Now change some dimensions, colors, or positions, add a keyframe, then press play.")
        usingTutorial = false;
        document.getElementById("tutorialArrow").style.display="none";
    }
    keyFrames.push(
        {
            duration: 5000,
            shapes: getShapes(shapes),
            scales: JSON.parse(JSON.stringify(scales)),
            xPosition: xPosition,
            yPosition: yPosition,
            zPosition: zPosition,
            color: getColors(shapes),
            name: "Frame "+keyFrames.length.toString(),
            borderColor: getColors(borders),
            scene: {
                color: [scene.background.r,scene.background.g,scene.background.b],
                scale: [scene.scale.x, scene.scale.y, scene.scale.z],
                rotation: [scene.rotation.x, scene.rotation.y, scene.rotation.z],
                position: [scene.position.x, scene.position.y, scene.position.z],
            }
        }
    );
    console.log('frame added');
    console.log(keyFrames);
    loadKeyList();
}

function loop(){
    if(animationRunning){
        loopAnimation = false;
    }
    else{
        loopAnimation = true;
        playAnimation();
    }
}

function loadKeyList(){
    document.getElementById('keyList').innerHTML = "";
    for(var i=0; i<keyFrames.length-1; i++){
        var add = ""
        if(i!=0){
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

    if (keyFrames.length!=0){
        var add = "";
        if(keyFrames.length!=1){
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
    loadKeyList()
}

function moveUp(frame){
    var hold = keyFrames[frame];
    keyFrames.splice(frame,1);
    keyFrames.splice(frame-1,0,hold);
    loadKeyList();
}
function moveDown(frame){
    var hold = keyFrames[frame];
    keyFrames.splice(frame,1);
    keyFrames.splice(frame+1,0,hold);
    loadKeyList();
}

function playAnimation() {
    if(!animationRunning) {
        console.log('starting');
        animationRunning=true;
        var a = 0;
        var timingCounter = 0;
        animationTimer = setInterval(function () {
            if (timingCounter < keyFrames[a].duration) {
                timingCounter += 10;
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
            else {
                if (a < keyFrames.length - 2) {
                    a++;
                    timingCounter = 0;
                    console.log(a)
                }
                else if (loopAnimation){
                    a = 0;
                    timingCounter = 0;
                }
                else {
                    clearInterval(animationTimer);
                    console.log('done')
                    animationRunning = false;
                }
            }
        }, 10);
    }
}

//sets speed of animation.
function setSpeed(i, speed){
    console.log(i);
    keyFrames[i].duration = speed;
}

//used to store shape data because the library doesn't like us doing stuff.
function getShapes(s){
    var ret = [];
    for (var i=0; i<s.length; i++){
        ret.push([s[i].position.x,s[i].position.y,s[i].position.z,s[i].rotation.x,s[i].rotation.y,s[i].rotation.z]);
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