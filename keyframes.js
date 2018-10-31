function addFrame(){
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
        }
    );
    console.log('frame added');
    console.log(keyFrames);
    loadKeyList();
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
                for (var i = 0; i < keyFrames[a].scales.length; i++) {
                    scales[i][0] = keyFrames[a].scales[i][0] + (keyFrames[a + 1].scales[i][0] - keyFrames[a].scales[i][0]) / keyFrames[a].duration * timingCounter;
                    scales[i][1] = keyFrames[a].scales[i][1] + (keyFrames[a + 1].scales[i][1] - keyFrames[a].scales[i][1]) / keyFrames[a].duration * timingCounter;
                    scales[i][2] = keyFrames[a].scales[i][2] + (keyFrames[a + 1].scales[i][2] - keyFrames[a].scales[i][2]) / keyFrames[a].duration * timingCounter;
                    shapes[i].position.x = keyFrames[a].shapes[i][0] + (keyFrames[a + 1].shapes[i][0] - keyFrames[a].shapes[i][0]) / keyFrames[a].duration * timingCounter;
                    shapes[i].position.y = keyFrames[a].shapes[i][1] + (keyFrames[a + 1].shapes[i][1] - keyFrames[a].shapes[i][1]) / keyFrames[a].duration * timingCounter;
                    shapes[i].position.z = keyFrames[a].shapes[i][2] + (keyFrames[a + 1].shapes[i][2] - keyFrames[a].shapes[i][2]) / keyFrames[a].duration * timingCounter;
                    shapes[i].material.color.r = keyFrames[a].color[i][0] + (keyFrames[a + 1].color[i][0] - keyFrames[a].color[i][0]) / keyFrames[a].duration * timingCounter;
                    shapes[i].material.color.g = keyFrames[a].color[i][1] + (keyFrames[a + 1].color[i][1] - keyFrames[a].color[i][1]) / keyFrames[a].duration * timingCounter;
                    shapes[i].material.color.b = keyFrames[a].color[i][2] + (keyFrames[a + 1].color[i][2] - keyFrames[a].color[i][2]) / keyFrames[a].duration * timingCounter;
                }
            }
            else {
                if (a < keyFrames.length - 2) {
                    a++;
                    timingCounter = 0;
                    console.log(a)
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

function setSpeed(i, speed){
    console.log(i);
    keyFrames[i].duration = speed;
}

function getShapes(s){
    var ret = [];
    for (var i=0; i<s.length; i++){
        ret.push([s[i].position.x,s[i].position.y,s[i].position.z]);
    }
    return ret;
}
function getColors(s){
    var ret = [];
    for (var i=0; i<s.length; i++){
        ret.push([s[i].material.color.r,s[i].material.color.g,s[i].material.color.b]);
    }
    return ret;
}