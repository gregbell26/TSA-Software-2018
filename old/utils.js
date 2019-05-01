 //jordan's code
function changeColor(value){
    //changes the color of the currently selected shape
    shapes[selectedShape].material.color.set(value);
}

function rgbToHex (num) {
    //creates a hex value out of a number, used to set the html color elements, which require hex strings.
    let hex = Number(num).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

function addShape(){
    if(usingTutorial){
        //moves the tutorial arrow around.
        confirm("Now define the diemsions, position, rotation, and color");
        confirm("When you are done, click on the key icon");
        document.getElementById("tutorialArrow").style.display="none";
    }
    document.getElementById('createTextMenu').style.display = 'none';
    let shapeType = document.getElementById("shapeSelector").value;
    saveSubSystem.save();
    //creates a 0x0x0 shape based on the selector element, with a red color and black borders.
    switch(shapeType){
        case "cube" :
            newCube(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "cylinder" :
            newCylinder(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "cone" :
            newCone(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "custom" :
            hideAll();
            document.getElementById('createCustomMenu').style.display = 'inherit';
            break;
        case "custom2" :
            hideAll();
            document.getElementById('FileUpload').style.display='inherit';
            break;
        case "dodecahedron" :
            newDodecahedron(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "icosahedron" :
            newIcosahedron(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "octahedron" :
            newOctahedron(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "pyramid" :
            newPyramid(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "ring" :
            newRing(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "sphere" :
            newSphere(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
        case "text" :
            hideAll();
            document.getElementById('createTextMenu').style.display = 'inherit';
            break;
    }
}
