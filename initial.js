//jordan's code
var animationRunning = false;
var loopAnimation = false;
var animationTimer;
var selectedShape = -1;
var scene = new THREE.Scene();
scene.background = new THREE.Color("#000000");
var camera = new THREE.PerspectiveCamera( 75, document.getElementById("mainWindow").offsetWidth/document.getElementById("mainWindow").offsetHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true });


renderer.setSize( document.getElementById("mainWindow").offsetWidth, document.getElementById("mainWindow").offsetHeight );
document.getElementById("mainWindow").appendChild( renderer.domElement );

//lists of cool things
var shapes = [];
var scales = [];
var keyFrames = [];
var borders = [];

//more variable declarations from toBeSorted

var xPosition = 10;//camera position x
var yPosition = 10;//camera position y
var zPosition = 10;//camera position z
var xStart = 0;//where the mouse started clicking x
var yStart = 0;//where the mouse started clicking y
var xPosStart = xPosition;//the cameras start position x
var yPosStart = yPosition;//the cameras start position y

var mouseDown = false;//if the right mouse button is pressed down
var zoomAmount = 1.5;// the zoom multiplier for one key press
var zoomSensitivity = 1.00;//the percent sensitivity
var mouseSensitivity = 1.00;//the percent sensitivity
var inAnimationWindow = 0;//is the mouse in the animation window


var zoom = 5;//the zoom on the cube
var zoomZ = 5;//zoom with only X and Z

//Stuff for saves

saveSubSystem.loadSaveNames();//Loads the names of the saves into an arraylist
var div = document.querySelector("#saveFileContainer"),
    frag = document.createDocumentFragment(),
    saveSelector = document.createElement("select");

if (saveSubSystem.saveFileNamesList.length !== 0){
    for(var i =0; i < saveSubSystem.saveFileNamesList.length; i++) {
        saveSelector.options.add(new Option(saveSubSystem.saveFileNamesList[i], saveSubSystem.saveFileNamesList[i]));//parm 1 is the text displayed to the user
        //Parm 2 is what the javascript sees
    }
}
saveSelector.options.add(new Option("New Save", "GET NAME"));



frag.appendChild(saveSelector);
div.appendChild(frag);
//---------------------


var dialog = document.querySelector('dialog');

function showPrompt(title, defaultText){
    document.getElementById("popupTitle").innerHTML = title;
    document.getElementById("popupInput").innerHTML = defaultText;
    dialog.showModal();
}

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
        }
    }
}

//Greatness by Gregory
function start() {
    //Making sure that everything is empty
    shapes = [];
    scales =[];
    keyFrames =[];
    borders= [];
    selectedShape = 0;

    if((saveSelector.options[saveSelector.selectedIndex].value === "GET NAME" || !saveSubSystem.openPrevious) && saveSubSystem.isUsingSaves){
        promptResp = 1;
        showPrompt("Please enter a name for your save", "New Animation");

    }
    if(!saveSubSystem.isUsingSaves){
        console.log("Save subsystem has been disabled by the user");

    }

    if(saveSubSystem.openPrevious && saveSubSystem.isUsingSaves){
        saveSubSystem.setFileName(saveSelector.options[saveSelector.selectedIndex].value, false);
        keyFrames = saveSubSystem.loadSave();

    }
}

//