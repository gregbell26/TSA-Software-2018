//jordan's code

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
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
    var shapeType = document.getElementById("shapeSelector").value;
    switch(shapeType){
        case "cube" :
            addCubeMenu();
            break;
        case "cylinder" :
            addCylinderMenu();
            break;
    }
}

function createShape(){
    var shapeType = document.getElementById("shapeSelector").value;

    switch(shapeType){
        case "cube" :
            newCube(createX, createY, createZ);
            break;
        case "cylinder" :
            newCylinder(createX, createY, createZ);
            break;
    }
}

function removeShape(){
    var shapeType = shapes[selectedShape].geometry.name;

    switch(shapeType){
        case "cube" :
            removeCube();
            break;
        case "cylinder" :
            removeCylinder();
            break;
    }
}

//corbin wrote this method:
function moveShape(dimension, value){
    switch(dimension){
        case "x":
            shapes[selectedShape].position.x = value;
            break;
        case "y":
            shapes[selectedShape].position.y = value;
            break;
        case "z":
            shapes[selectedShape].position.z = value;
            break;
    }

}