function addFrame(){
    keyFrames.push(
        {
            duration: 5000,
            shapes: JSON.parse(JSON.stringify(shapes)),
            scales: JSON.parse(JSON.stringify(scales)),
            xPosition: xPosition,
            yPosition: yPosition,
            zPosition: zPosition,
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
            }
        }
        else {
            clearInterval(animationTimer);
        }
    },10)
}

function setSpeed(amount, speed){

}