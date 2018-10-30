function addFrame(){
    keyFrames.push(
        {
            duration: 5000,
            shapes: getShapes(shapes),
            scales: JSON.parse(JSON.stringify(scales)),
            xPosition: xPosition,
            yPosition: yPosition,
            zPosition: zPosition,
            color: getColors(shapes)
        }
    );
    console.log('frame added');
    console.log(keyFrames)
}

function removeFrame(){

}

function playAnimation(){
    var a = 0;
    var timingCounter = 0;
    animationTimer = setInterval(function(){
        if(timingCounter<keyFrames[a].duration){
            timingCounter+=10;
            xPosition = keyFrames[a].xPosition + (keyFrames[a+1].xPosition-keyFrames[a].xPosition)/keyFrames[a].duration*timingCounter;
            yPosition = keyFrames[a].yPosition + (keyFrames[a+1].yPosition-keyFrames[a].yPosition)/keyFrames[a].duration*timingCounter;
            zPosition = keyFrames[a].zPosition + (keyFrames[a+1].zPosition-keyFrames[a].zPosition)/keyFrames[a].duration*timingCounter;
            for (var i=0; i<keyFrames[a].scales.length; i++){
                scales[i][0]=keyFrames[a].scales[i][0] + (keyFrames[a+1].scales[i][0]-keyFrames[a].scales[i][0])/keyFrames[a].duration*timingCounter;
                scales[i][1]=keyFrames[a].scales[i][1] + (keyFrames[a+1].scales[i][1]-keyFrames[a].scales[i][1])/keyFrames[a].duration*timingCounter;
                scales[i][2]=keyFrames[a].scales[i][2] + (keyFrames[a+1].scales[i][2]-keyFrames[a].scales[i][2])/keyFrames[a].duration*timingCounter;
                shapes[i].position.x = keyFrames[a].shapes[i][0] + (keyFrames[a+1].shapes[i][0]-keyFrames[a].shapes[i][0])/keyFrames[a].duration*timingCounter;
                shapes[i].position.y = keyFrames[a].shapes[i][1] + (keyFrames[a+1].shapes[i][1]-keyFrames[a].shapes[i][1])/keyFrames[a].duration*timingCounter;
                shapes[i].position.z = keyFrames[a].shapes[i][2] + (keyFrames[a+1].shapes[i][2]-keyFrames[a].shapes[i][2])/keyFrames[a].duration*timingCounter;
                shapes[i].material.color.r = keyFrames[a].color[i][0] + (keyFrames[a+1].color[i][0]-keyFrames[a].color[i][0])/keyFrames[a].duration*timingCounter;
                shapes[i].material.color.g = keyFrames[a].color[i][1] + (keyFrames[a+1].color[i][1]-keyFrames[a].color[i][1])/keyFrames[a].duration*timingCounter;
                shapes[i].material.color.b = keyFrames[a].color[i][2] + (keyFrames[a+1].color[i][2]-keyFrames[a].color[i][2])/keyFrames[a].duration*timingCounter;
            }
        }
        else {
            clearInterval(animationTimer);
        }
    },10)
}

function setSpeed(amount, speed){

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