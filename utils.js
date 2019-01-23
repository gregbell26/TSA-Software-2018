 //jordan's code
function changeColor(value){
    shapes[selectedShape].material.color.set(value);
}

function rgbToHex (num) {
    var hex = Number(num).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

function addShape(){
    if(usingTutorial){
        confirm("Now define the dimensions, position, rotation, and color");
        confirm("When you are done, click on the key icon");
    }
    document.getElementById('createTextMenu').style.display = 'none';
    var shapeType = document.getElementById("shapeSelector").value;
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
        case "tube" :
            newTube(0, 0, 0, 0, 0, 0, "#ff0000", "#000000");
            break;
    }
}