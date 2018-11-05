//corbin wrote this method:
function moveShape(dimension, value) {
    switch (dimension) {
        case "x":
            shapes[selectedShape].position.x = Number(value);
            break;
        case "y":
            shapes[selectedShape].position.y = Number(value);
            break;
        case "z":
            shapes[selectedShape].position.z = Number(value);
            break;
    }
}


function rotateShape(dimension, value) {
    switch (dimension) {
        case "x":
            shapes[selectedShape].rotation.x = Number(value)*Math.PI/180;
            break;
        case "y":
            shapes[selectedShape].rotation.y = Number(value)*Math.PI/180;
            break;
        case "z":
            shapes[selectedShape].rotation.z = Number(value)*Math.PI/180;
            break;
    }
}