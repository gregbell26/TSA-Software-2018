/**
 * This file is responseable for initilaizing all of the stuff
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
// var capturer = new CCapture( { format: 'webm' } );
var capturer;
//sets up the viewport
var scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");
var camera = new THREE.PerspectiveCamera( 75, document.getElementById("animationEngine_renderArea").offsetWidth/document.getElementById("animationEngine_renderArea").offsetHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true });
renderer.setSize( document.getElementById("animationEngine_renderArea").offsetWidth, document.getElementById("animationEngine_renderArea").offsetHeight );

document.getElementById("animationEngine_renderArea").appendChild( renderer.domElement );


// function initRenderer(){
//     camera = new THREE.PerspectiveCamera(75, UIDiemsions.std_body.window_width/UIDiemsions.std_body.window_height, 0.1, 1000);
//     renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true });
//     renderer.setSize(UIDiemsions.std_body.renderer_width, UIDiemsions.std_body.renderer_height);
//     document.getElementById("animationEngine_renderArea").appendChild(renderer.domElement);
// }



//create viewport size
// renderer.setSize( document.getElementById("mainWindow").offsetWidth, document.getElementById("mainWindow").offsetHeight );
// document.getElementById("mainWindow").appendChild( renderer.domElement );

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

    //Sets the HTML elements

    //There is a way to do this dynamically but that is a lot more code and would slow down execution time
    //This static way will work and is plenty fast
    switch(settings.userInterface.stylesheetPref) {
        case "normalMode":
            document.getElementById("settings_styleSheetSelector").selectedIndex = 0;
            break;
        case "darkMode":
            document.getElementById("settings_styleSheetSelector").selectedIndex = 1;
            break;
        case "amoledMode":
            document.getElementById("settings_styleSheetSelector").selectedIndex = 2;
            break;
    }

    document.getElementById("settings_mouseSensitivity").value = settings.camera.mouseSensitivity;
    document.getElementById("settings_zoomAmount").value = settings.camera.zoomAmount;

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



var dialog = document.querySelector('dialog');

function showPrompt(title, defaultText){
    document.getElementById("popupTitle").innerHTML = title;
    document.getElementById("popupInput").innerHTML = defaultText;
    dialog.showModal();
}
//another messagebox

var promptResp = 0;

function promptResponse(value) {
    console.log(value);
    if (promptResp == 1) {
        var saveName = value;
        if (saveName !== null) {
            console.log("User message received.");
            saveSubSystem.setIsUsingSaves(true);
            saveSubSystem.setFileName(saveName, true);
            dialog.close();
            updateTimeline();
        }
    }
}

//Greatness by Gregory
var buttonClicked = false;

function start() {
    camera = new THREE.PerspectiveCamera(75, UIDiemsions.std_body.window_width/UIDiemsions.std_body.window_height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true });
    renderer.setSize(UIDiemsions.std_body.renderer_width, UIDiemsions.std_body.renderer_height);
    document.getElementById("animationEngine_renderArea").appendChild(renderer.domElement);
    var saveSelectorElement = document.getElementById("ws_loadMenu");
    //Making sure that everything is empty
    shapes = [];
    scales =[];
    keyFrames =[];
    borders= [];
    selectedShape = 0;
    selectedLight = 0;

    if((saveSelectorElement.options[saveSelectorElement.selectedIndex].value === "Load Save" || !saveSubSystem.openPrevious) && saveSubSystem.isUsingSaves){
        /*promptResp = 1;*/
        /*showPrompt("Please enter a name for your save", "New Animation");*/
        showPopUp("popUp_input_body", "New Save", "Enter Save Name", "buttonClicked = true;");
        // while(!buttonClicked){
        //
        // }
        saveSubSystem.setFileName(getPopUpInput(), true);
    //handles savings creates a new one if there is no previous save when starting software
    }
    if(!saveSubSystem.isUsingSaves){
        console.log("Save subsystem has been disabled by the user");
//debugging
    }

    if(saveSubSystem.openPrevious && saveSubSystem.isUsingSaves){
        saveSubSystem.setFileName(saveSelectorElement.options[saveSelectorElement.selectedIndex].value, false);
        keyFrames = saveSubSystem.loadSave();
        //has saves
    }
    // addLight();
    // addPointLight();


    //showList();

    //updateTimeline();


    init=true;
}

//
