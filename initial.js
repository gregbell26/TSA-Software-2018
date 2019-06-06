/**
 * This file is responsible for iinitializingall of the stuff
 *
 *
 * Authors Jordan M. Gregory B.
 * Edited 4-22-19
 */


//control variables
var init = false;


var animationRunning = false;
var loopAnimation = false;
var animationTimer;
var selectedShape = -1;
let selectedLight = -1;
var settingsOpen = false;
var usingTutorial = false;
// var capturer = new CCapture( { format: 'webm' } );
var capturer;
//sets up the viewport
var scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");
var camera;
var renderer;


//lists of cool things
var shapes = [];
var lights = [];
var scales = [];
var keyFrames = [];
var borders = [];
// let settings;


//This will set the boxes to what they need to be
window.onload = function(){
    saveSubSystem.loadSettings();
    stylesheetLoader(settings.userInterface.stylesheetPref);
    saveSubSystem.loadSaveNames("ws_loadMenu");
    saveSubSystem.loadSaveNames("localStorage_saveSelector");

    //Sets the HTML elements

    //There is a way to do this dynamically but that is a lot more code and would slow down execution time
    //This static way will work and is plenty fast
    switch(settings.userInterface.stylesheetPref) {
        case "normalMode":
            getId("settings_styleSheetSelector").selectedIndex = 0;
            break;
        case "darkMode":
            getId("settings_styleSheetSelector").selectedIndex = 1;
            break;
        case "amoledMode":
            getId("settings_styleSheetSelector").selectedIndex = 2;
            break;
    }

    getId("settings_mouseSensitivity").value = settings.camera.mouseSensitivity;
    getId("settings_zoomAmount").value = settings.camera.zoomAmount;

    getId("advCamera_centerX").value = settings.camera.centerPos[0];
    getId("advCamera_centerY").value = settings.camera.centerPos[1];
    getId("advCamera_centerZ").value = settings.camera.centerPos[2];

    getId("advCamera_focusX").value = settings.camera.focusPos[0];
    getId("advCamera_focusY").value = settings.camera.focusPos[1];
    getId("advCamera_focusZ").value = settings.camera.focusPos[2];
};

//more variable declarations from toBeSorted

var xPosition = 10;//camera position x
var yPosition = 10;//camera position y
var zPosition = 10;//camera position z
var xStart = 0;//where the mouse started clicking x
var yStart = 0;//where the mouse started clicking y
var xPosStart = xPosition;//the cameras start position x
var yPosStart = yPosition;//the cameras start position y
var xCCenter = 0;//where the camera centers on x
var yCCenter = 0;//where the camera centers on y
var zCCenter = 0;//where the camera centers on z
var xCLook = 0;//where the camera points to x
var yCLook = 0;//where the camera points to y
var zCLook = 0;//where the camera points to z
var shapeCenter = {
    x:0.0,
    y:0.0,
    z:0.0
};
var shapeCenters = [];
var mouseDown = false;//if the right mouse button is pressed down
var inAnimationWindow = 0;//is the mouse in the animation window
var lockCamera = true;//Whether or not the camera can free pan during animation
var circleCameraRotation = false;//Whether or not the camera rotates circularly and in and out rather than straight
var zoom = 5;//the zoom on the cube
var zoomZ = 5;//zoom with only X and Z
//stuff for circular camera rotation
var MvX, MvY;
var Rz1, Ry1;
var Rz2, Ry2;
var zoom1, zoom1Z;
var zoom2, zoom2Z;
var zoomChange, zoomZChange;
//stuff for circular view rotation
var MvXv, MvYv;
var Rz1v, Ry1v;
var Rz2v, Ry2v;
var zoom1v, zoom1Zv;
var zoom2v, zoom2Zv;
var zoomChangev, zoomZChangev;
var showingLight;
var noLook = false;
var cameraDebug = false;
//stuff for circular shape movement
var tempCircleMoveShapes = {
    MvX:0.0,
    MvY:0.0,
    Rz1:0.0,
    Ry1:0.0,
    Rz2:0.0,
    Ry2:0.0,
    zoom1:0.0,
    zoom1Z:0.0,
    zoom2:0.0,
    zoom2Z:0.0
};
var shapesCmove =[];





//Greatness by Gregory


function start(){
    camera = new THREE.PerspectiveCamera(75, UIDiemsions.std_body.window_width/UIDiemsions.std_body.window_height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true, antialias: true });
    renderer.setSize(UIDiemsions.std_body.renderer_width, UIDiemsions.std_body.renderer_height);
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap = THREE.PCFSoftShadowMap;
    document.getElementById("animationEngine_renderArea").appendChild(renderer.domElement);
    var saveSelectorElement = document.getElementById("ws_loadMenu");
    //Making sure that everything is empty
    shapes = [];
    scales =[];
    keyFrames =[];
    borders= [];
    selectedShape = -1;
    selectedLight = -1;
    init=true;
    toggleEditShapeOrLight(false);
    if((saveSelectorElement.options[saveSelectorElement.selectedIndex].value === "Load Save" || !saveSubSystem.openPrevious) && saveSubSystem.isUsingSaves){
        showPopUp("popUp_input_body", "New Save", "Enter Save Name",0);

    //handles savings creates a new one if there is no previous save when starting software
    }
    if(!saveSubSystem.isUsingSaves){
        showPopUp("popUp_error_body", "Warning", "The local save engine has been disabled",-1);
//debugging
    }

    if(saveSubSystem.openPrevious && saveSubSystem.isUsingSaves){
        saveSubSystem.setFileName(saveSelectorElement.options[saveSelectorElement.selectedIndex].value, false);
        keyFrames = saveSubSystem.loadSave();
        getId("element_Information").style.display = 'none';
        getId('currentEditing_type').style.display = 'none';
        // newLight("ambient", "#ffffff", 50);
        //has saves
    }
    getId("localStorage_saveSelector").value = saveSubSystem.fileName;


    onWindowResize();
}

//
