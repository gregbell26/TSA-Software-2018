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
}

class Timeline{

}

function playAnimation(frame) {
    if (keyFrames.length !== 0) {
        keyFrames[frame].playAnimation();
    }
}