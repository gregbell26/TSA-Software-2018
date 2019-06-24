/*
*
* This file houses all of the code that runs the timeline. This code has been moved from keyframes.js as to make it cleaner
*
*
* This file is licensed under the Apache 2.0 license.
* That means that you can freely use and modify this code for all uses except for
*     commercial use provided this header is at the top of all files
* Copyright 2018-2019 Monarch TSA
*
* */

var timelineScale = 0;
function updateTimeline(){
    var duration = getTotalAnimationTime();
    let tutorialText = "The duration of the keyframe is in milliseconds. Click on duration and change the duration";
    timelineScale = duration/(window.innerWidth-50);

    var timeline = getId("std_timeline").children.item(1);
    // var durArea = getId("std_timeline").children.item(2);
    timeline.innerHTML = "<span id=\"timeline_playHead\" ></span>";
    // durArea.innerHTML = "";
    getId("timeLine_animationFinish").innerHTML = (getTotalAnimationTime()/1000).toString() + " s";
    var currentX = 5;
    //onclick='showKeyframePopup(" + i + "); tutorialMovement(10, 10," + tutorialText.toString() + ", 0);'
    for(var i=0; i<keyFrames.length; i++){
        timeline.innerHTML += "<div class='timeline_keyframe' style='left: " + currentX + "px'></div>";
        // toggleCheck.push(0)
        timeline.children[i+1].setAttribute('onclick', "showKeyframePopup("+i+"); tutorialMovement(360,210,\"This is the keyframes menu. You can edit stuff for this keyframe like the duration. Duration is in miliseconds. Click comit changes at the bottom to continue.\", 0);")
        // durArea.innerHTML += ("<div class='timeline_text' style='position: absolute; left: "+ currentX + "px;'> <div onclick='let id =" + i + "; timesCheck(id, this)'>" + keyFrames[i].duration +"</div> ms</div>");
        currentX+=keyFrames[i].duration/timelineScale;
    }
    console.log("Updated Time Line")
}

// function timesCheck(id, domElement){
//     if(toggleCheck[id] <3){
//         toggleCheck[id]++;
//         domElement.contentEditable = true;
//     }
//     else {
//         setSpeed(id, parseInt(domElement.innerHTML.split(" ms")));
//         toggleCheck[id] = 0;
//     }
//
// }

function getAnimationTimeUpToIndex(index){
    let totalTime = 0;
    for(let i =0; i < index; i++)
        totalTime += parseInt(keyFrames[i].duration);
    return totalTime;
}

function getTotalAnimationTime(){
    let totalTime = 0;
    for(let i =0; i< keyFrames.length-1; i++) {
        totalTime += parseInt(keyFrames[i].duration);
        //console.log(keyFrames[i].duration)
    }
    return totalTime;
}

//determines whether or not to repeat the animation
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

function keyName(name,frame){
    keyFrames[frame].name = name;
}

function removeFrame(frame){
    addfortutorial("remove_frame");
    if(animationRunning)
        playAnimation(0);
    keyFrames.splice(frame,1);
    updateTimeline();
}

function moveUp(frame){
    var hold = keyFrames[frame];
    keyFrames.splice(frame,1);
    keyFrames.splice(frame-1,0,hold);
    updateTimeline();
}

function moveDown(frame){
    var hold = keyFrames[frame];
    keyFrames.splice(frame,1);
    keyFrames.splice(frame+1,0,hold);
    updateTimeline();
}

//sets speed of animation.
function setSpeed(i, speed){
    console.log(speed);
    keyFrames[i].duration = speed;
    // updateTimeline();
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
            document.getElementById("timeline_playHead").style.left = (1+frameValue/timelineScale)+"px";
            var timingCounter = frameValue - frames;
            updateAnimation(timingCounter, a);
            if(animationRunning) {
                playAnimation()
            }
        }
    }
}

function changeTimelineDuration(value){
    while(value > -keyFrames[keyFrames.length-2].duration){
        keyFrames.splice(keyFrames.length-1,1);
        value+=keyFrames[keyFrames.length-1].duration;
    }
    keyFrames[keyFrames.length-2] += value;
}

function moveKeyframeto(frameNumber, point) {
    var durationToFrame = 0;
    for (var i = 0; i < frameNumber; i++){
        durationToFrame += keyFrames[i].duration;
    }
    console.log("duration to frame: " + durationToFrame);
    var totalDuration = 0;
    for (var i = 0; i < keyFrames.length; i++){
        totalDuration += keyFrames[i];
    }
    if(point < 0 || point > totalDuration){
        console.log("point out of bounds");
        return;
    }
    moveKeyframe(frameNumber,point-durationToFrame);
}

function moveKeyframe(frameNumber, amount) {
    if(frameNumber < 0 || frameNumber >= keyFrames.length){
        console.log("Frame out of bounds");
        return;
    }
    if(frameNumber === 0){
        keyFrames[frameNumber].duration-=amount;
        return;
    }
    console.log("moving: " + amount);
    if (amount < -keyFrames[frameNumber-1].duration) {
        console.log("shifting down");
        var i = 0;
        var move = amount;
        while(move < -keyFrames[frameNumber-1 + i].duration){
            move += keyFrames[frameNumber-1 + i].duration;
            i--;
        }
        move = -move;
        console.log(i+" frames");
        console.log(move+" remainder");
        changeKeyframePosition(frameNumber,frameNumber+i);
        keyFrames[frameNumber].duration += keyFrames[frameNumber+i].duration;
        keyFrames[frameNumber+i-1].duration -= move;
        keyFrames[frameNumber+i].duration = move;
    } else if (amount > keyFrames[frameNumber].duration) {
        console.log("shifting up:");
        var i = 0;
        var move = amount;
        console.log("keyFrames");
        while(move > keyFrames[frameNumber+i].duration){
            move -= keyFrames[frameNumber+i].duration;
            i++;
        }
        console.log(i+" frames");
        console.log(move+" remainder");
        changeKeyframePosition(frameNumber,frameNumber+i);
        keyFrames[frameNumber-1].duration += keyFrames[frameNumber+i].duration;
        keyFrames[frameNumber+i-1].duration -= move;
        keyFrames[frameNumber+i].duration = move;
    } else {
        console.log("within bounds");
        keyFrames[frameNumber-1].duration += amount;
        keyFrames[frameNumber].duration -= amount;
    }
    // updateTimeline();
}

function changeKeyframePosition(frameNumber, targetNumber){
    console.log("moving "+frameNumber+" to "+targetNumber);
    var temp = keyFrames[targetNumber];
    keyFrames[targetNumber] = keyFrames[frameNumber];
    if(targetNumber < frameNumber){
        for(var i = frameNumber; i > targetNumber+1; i--){
            keyFrames[i] = keyFrames[i-1];
        }
        keyFrames[targetNumber+1] = temp;
    }else{
        for(var i = frameNumber; i < targetNumber-1; i++){
            keyFrames[i] = keyFrames[i+1];
        }
        keyFrames[targetNumber-1] = temp;
    }
}


//Time line popup code
//when the user clicks on the keyframe then this poup will popup!
let activeKeyframeIndex = 0;
let keyframePopup = document.getElementById("std_timeline_popUp");

function showKeyframePopup(index){
    if(!keyframePopup)
        keyframePopup = document.getElementById("std_timeline_popUp");
    activeKeyframeIndex = index;
    setKeyframePopupData();

    keyframePopup.style.display = "block";
    keyframePopup.classList.add("timeline_popUp_show");
}

function setKeyframePopupData(){
    keyframePopup.children[0].innerHTML = "Editing Keyframe " + (activeKeyframeIndex+1).toString();

    keyframePopup.children[1].children[0].value = (activeKeyframeIndex+1).toString();
    // keyframePopup.children[3].children[0].value = getAnimationTimeUpToIndex(activeKeyframeIndex).toString();
    //
    //
    // keyframePopup.children[5].children[0].value = keyFrames[activeKeyframeIndex].duration;
    // keyframePopup.children[6].children[0].value = getTotalAnimationTime().toString();

    keyframePopup.children[2].children[0].value = getAnimationTimeUpToIndex(activeKeyframeIndex).toString();


    keyframePopup.children[3].children[0].value = keyFrames[activeKeyframeIndex].duration;
    keyframePopup.children[4].children[0].value = getTotalAnimationTime().toString();

}

function applyChanges(){

    keyFrames[activeKeyframeIndex].duration = parseInt(keyframePopup.children[3].children[0].value);

    if(!(keyFrames.length >= 1)) {
        changeKeyframePosition(activeKeyframeIndex, (parseInt(keyframePopup.children[1].children[0].value) - 1));

        moveKeyframeto(activeKeyframeIndex, parseInt(keyframePopup.children[2].children[0].value));
        changeTimelineDuration(parseInt(keyframePopup.children[4].children[0].value));
    }
    updateTimeline();

}

function hideKeyframePopup(){
    keyframePopup.style.display = "none";
    keyframePopup.classList.remove("timeline_popUp_show");

    keyframePopup.children[0].innerHTML = "";

    keyframePopup.children[1].children[0].value = "";
    // keyframePopup.children[3].children[0].value = "";
    //
    //
    // keyframePopup.children[5].children[0].value = "";
    // keyframePopup.children[6].children[0].value = "";

    keyframePopup.children[2].children[0].value = getAnimationTimeUpToIndex(activeKeyframeIndex).toString();


    keyframePopup.children[3].children[0].value = keyFrames[activeKeyframeIndex].duration;
    keyframePopup.children[4].children[0].value = getTotalAnimationTime().toString();


}