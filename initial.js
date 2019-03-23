//jordan's code
//controll variables
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
var camera = new THREE.PerspectiveCamera( 75, document.getElementById("mainWindow").offsetWidth/document.getElementById("mainWindow").offsetHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({logarithmicDepthBuffer: true });


//create viewport size
renderer.setSize( document.getElementById("mainWindow").offsetWidth, document.getElementById("mainWindow").offsetHeight );
document.getElementById("mainWindow").appendChild( renderer.domElement );

//lists of cool things
var shapes = [];
let lights = [];
var scales = [];
var keyFrames = [];
var borders = [];
var settings;
window.onload = function(){
    if(localStorage.getItem("settings")===null){
        settings = {
            dark : false,
            zoomAmount : 1.5,
            mouseSensitivity: 1
        }
        localStorage.setItem("settings",JSON.stringify(settings));
    }
    else{
        settings = JSON.parse(localStorage.getItem("settings"));
    }
    document.getElementById("mouseSensitivity").value = settings.mouseSensitivity;
    document.getElementById("zoomSensitivity").value = (settings.zoomAmount-1)*2;
    if(settings.dark){
        document.getElementById("darkSelect").value = "1";
        document.body.style.color = "#FFFFFF";
        document.getElementById("topBar").style.backgroundColor = "#222222";
        $(".objButton").css("background-color","#2C2C2C");
        $(".topButton").css("background-color","#222222");
        $(".objButton").css("color","#FFFFFF");
        $("#sideBar").css("background-color","#222222");
        $("#settingsPage").css("background-color","#222222");
        //creates elements
        $(".addButton").hover(function(){
            $(this).css("background-color", "#228B22");
        }, function(){
            $(this).css("background-color", "#2C2C2C");
        });
        $(".removeButton").hover(function(){
            $(this).css("background-color", "#DD0000");
        }, function(){
            $(this).css("background-color", "#2C2C2C");
        });
        $(".topButton").hover(function(){
            $(this).css("background-color", "#363636");
        }, function(){
            $(this).css("background-color", "#222222");
        });
        //creates the colors of the buttons/menus?
    }
    else{
        document.getElementById("darkSelect").value = "0";
    }
}

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



//Stuff for saves

saveSubSystem.loadSaveNames();//Loads the names of the saves into an arraylist
var div = document.querySelector("#saveFileContainer"),
    frag = document.createDocumentFragment(),
    saveSelector = document.createElement("select");
saveSelector.id = "saveSelector"

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
function start() {
    //Making sure that everything is empty
    shapes = [];
    scales =[];
    keyFrames =[];
    borders= [];
    selectedShape = 0;
    selectedLight = 0;

    if((saveSelector.options[saveSelector.selectedIndex].value === "GET NAME" || !saveSubSystem.openPrevious) && saveSubSystem.isUsingSaves){
        promptResp = 1;
        showPrompt("Please enter a name for your save", "New Animation");
    //handles savings creates a new one if there is no previous save when starting software
    }
    if(!saveSubSystem.isUsingSaves){
        console.log("Save subsystem has been disabled by the user");
//debugging
    }

    if(saveSubSystem.openPrevious && saveSubSystem.isUsingSaves){
        saveSubSystem.setFileName(saveSelector.options[saveSelector.selectedIndex].value, false);
        keyFrames = saveSubSystem.loadSave();
        //has saves
    }
    // addLight();
    // addPointLight();
    showList()

    updateTimeline();
}

//
