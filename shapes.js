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