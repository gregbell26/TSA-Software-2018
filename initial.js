//jordan's code
var animationRunning = false;
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

//Stuff for saves

saveSubSystem.loadSaveNames();//Loads the names of the saves into an arraylist
var div = document.querySelector("#saveFileContainer"),
    frag = document.createDocumentFragment(),
    saveSelector = document.createElement("select");

if (saveSubSystem.saveFileNamesList.length !== 0){
    for(var i =0; i < saveSubSystem.saveFileNamesList.length; i++)
        saveSelector.options.add(new Option(saveSubSystem.saveFileNamesList[i], saveSubSystem.saveFileNamesList[i]));//parm 1 is the text displayed to the user
                                                                                                                    //Parm 2 is what the javascript sees
}
saveSelector.options.add(new Option("New Save", "GET NAME"));



frag.appendChild(saveSelector);
div.appendChild(frag);
//---------------------





//Greatness by Gregory
function start() {
    //Making sure that everything is empty
    shapes = [];
    scales =[];
    keyFrames =[];
    borders= [];
    selectedShape = 0;


    if(saveSelector.valueOf() === "GET NAME" || !saveSubSystem.openPrevious){
        var saveName = prompt("Please enter a name for your save", "New Animation");
        if (saveName !== null) {
            console.log("User message received.");
            saveSubSystem.setIsUsingSaves(true);
            saveSubSystem.setFileName(saveName);
        }
    }
    if(!saveSubSystem.isUsingSaves){
        console.log("Save subsystem has been disabled by the user");

    }

    if(saveSubSystem.openPrevious && saveSubSystem.isUsingSaves){
        saveSubSystem.setFileName(saveSelector.valueOf());
        var loadedData = saveSubSystem.loadSave();
        if(loadedData ===1 || loadedData[0][0] === 1){
            console.log("An error occured during loading");
            return;
        }
        for(var i =0; i < loadedData.length; i++) {
            shapes.push(loadedData[0][i]);
            borders.push(loadedData[1][i]);
            scales.push(loadedData[2][i]);

            scene.add(loadedData[1][i]);
            scene.add(loadedData[0][i]);

            shapes[i].position.x = loadedData[0][i].positionX;
            shapes[i].position.y = loadedData[0][i].positionY;
            shapes[i].position.z = loadedData[0][i].positionZ;

            shapes[i].material.color.r = loadedData[0][i].r;
            shapes[i].material.color.g = loadedData[0][i].g;
            shapes[i].material.color.b = loadedData[0][i].b;

            borders[i].scale.x = scales[i][0];
            borders[i].scale.y = scales[i][1];
            borders[i].scale.z = scales[i][2];


        }


    }
}

//