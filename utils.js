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
    document.getElementById('createText').style.display = 'none';
    var shapeType = document.getElementById("shapeSelector").value;
    addShapeMenu();
    if(shapeType=='text'){
        document.getElementById('createText').style.display = 'inherit';
    }
}

function createShape(){
    var shapeType = document.getElementById("shapeSelector").value;
    var setColor = document.getElementById("colorSet").value;
    var posX = document.getElementById("createPositionX").value;
    var posY = document.getElementById("createPositionY").value;
    var posZ = document.getElementById("createPositionZ").value;
    var borderColor = document.getElementById('createColorBorder').value;
    var createX = document.getElementById('createParameterX').value;
    var createY = document.getElementById('createParameterY').value;
    var createZ = document.getElementById('createParameterZ').value;

    switch(shapeType){
        case "cube" :
            newCube(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
        case "cylinder" :
            newCylinder(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
        case "cone" :
            newCone(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
        case "dodecahedron" :
            newDodecahedron(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
        case "icosahedron" :
            newIcosahedron(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
        case "octahedron" :
            newOctahedron(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
        case "pyramid" :
            newPyramid(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
        case "ring" :
            newRing(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
        case "sphere" :
            newSphere(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
        case "text" :
           newText(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
           break;
        case "tube" :
            newTube(createX, createY, createZ, posX, posY, posZ, setColor, borderColor);
            break;
    }

}


