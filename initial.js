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
    for(var i =0; i < saveSubSystem.saveFileNamesList.length; i++) {
        saveSelector.options.add(new Option(saveSubSystem.saveFileNamesList[i], saveSubSystem.saveFileNamesList[i]));//parm 1 is the text displayed to the user
        //Parm 2 is what the javascript sees
    }
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
    //console.log(saveSelector.options[saveSelector.selectedIndex].value);


    if(saveSelector.options[saveSelector.selectedIndex].value === "GET NAME" || !saveSubSystem.openPrevious){
        var saveName = prompt("Please enter a name for your save", "New Animation");
        if (saveName !== null) {
            console.log("User message received.");
            saveSubSystem.setIsUsingSaves(true);
            saveSubSystem.setFileName(saveName, true);
        }
    }
    if(!saveSubSystem.isUsingSaves){
        console.log("Save subsystem has been disabled by the user");

    }

    if(saveSubSystem.openPrevious && saveSubSystem.isUsingSaves){
        var loadedData = [[],[]];
        saveSubSystem.setFileName(saveSelector.options[saveSelector.selectedIndex].value, false);
        loadedData = saveSubSystem.loadSave();
        for(var i =0; i <loadedData.length; i++)
            for(var j=0; j < loadedData[i].length; j++)
                console.log(loadedData[i][j]);

        if(loadedData[0][0] === 1){
            console.log("An error occured during loading");
            return;
        }
        for(var i =0; i < loadedData.length; i++) {
            shapes[i] =loadedData[0][i];
            borders[i] =loadedData[1][i];
            //scales.push(loadedData[2][i]);
            scales = saveSubSystem.loadedScales;//This seems to work better
            console.log(scales);

//This is throwing undefined errors for some reason-- The parameter is there its just not correct...
            //Might want to try to create a new object then just adding the parameters... But that would be extreamly taxing on the ram and the cpu as I can't delete an object that is no longer in use because javascript sucks.
            /*shapes[i].positionX = loadedData[0][i].positionX;
            shapes[i].positionY = loadedData[0][i].positionY;
            shapes[i].positionZ = loadedData[0][i].positionZ;

            shapes[i].material.color.r = loadedData[0][i].r;
            shapes[i].material.color.g = loadedData[0][i].g;
            shapes[i].material.color.b = loadedData[0][i].b;


            shapes[i].scale.x = scales[i][0];
            shapes[i].scale.y = scales[i][1];
            shapes[i].scale.z = scales[i][2];




            borders[i].scale.x = scales[i][0];
            borders[i].scale.y = scales[i][1];
            borders[i].scale.z = scales[i][2];*/

            scene.add(shapes[i]);//The issue is that 3JS isn't reconising the 3js object that is created else where as a 3js object
            //That causes the entire program to freak out
            //I think there should be a way create a new object from a created object.
            //But other than that the loading works as intended and it does load the files from memory as intended

            //scene.add(shapes[i]);


        }


    }
}

//