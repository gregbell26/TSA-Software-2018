class Keyframe {
    _frameShapes;
    _frameLights;
    _frameBorders;
    _frameScales;
    _frameDuration;
    _frameScene;
    constructor(shapes, lights, borders, scales, duration, scene){
        this._frameShapes = shapes;
        this._frameLights = lights;
        this._frameBorders = borders;
        this._frameScales = scales;
        this._frameDuration = duration;
        this._frameScene = scene;
        keyFrames.push(this);
    }

//getters
    get frameShapes() {
        return this._frameShapes;
    }

    get frameLights() {
        return this._frameLights;
    }

    get frameBorders() {
        return this._frameBorders;
    }

    get frameScales() {
        return this._frameScales;
    }

    get frameDuration() {
        return this._frameDuration;
    }

    get frameScene() {
        return this._frameScene;
    }

//setters
    set frameShapes(value) {
        this._frameShapes = value;
    }

    set frameLights(value) {
        this._frameLights = value;
    }

    set frameBorders(value) {
        this._frameBorders = value;
    }

    set frameScales(value) {
        this._frameScales = value;
    }

    set frameDuration(value) {
        this._frameDuration = value;
    }

    set frameScene(value) {
        this._frameScene = value;
    }

    playAnimation() {
        if (!(this === keyFrames[keyFrames.length - 1]) && !animationRunning){
            timelineButtonToggle('timeline_play');
            console.log('starting');
            animationRunning=true;
            var frames = 0;
            var timingCounter;
            var prevDuration=0;
            timingCounter = keyFrames.indexOf(this) - frames;
            animationTimer = setInterval(function () {
                document.getElementById("timeline_playHead").style.left = (11+(timingCounter+prevDuration)/timelineScale)+"px";

            }, 10);
        }
    }

    updateScene() {

    }

    moveKeyframe(amount){
        if(amount < 0){

        }else if(amount){

        }else{

        }

    }
}

class Timeline{

}

function playAnimation(frame) {
    if (keyFrames.length !== 0) {
        keyFrames[frame].playAnimation();
    }
}

function addFrame() {
    if(usingTutorial){
        confirm("Now change some diemsions, colors, or positions, add a keyframe, then press play.");
        animateArrow(75,15,250,60)
    }
    var frame = new Keyframe(getShapes(shapes), getLights(lights), getShapes(borders), scales, 5000, {
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

var recording = false;
function record(){
    recording = true;
    capturer = new CCapture({ format: 'webm' });
    capturer.start();
    playAnimation(0);
}