-//corbin wrote this method, simplified by Jordan
function moveShape(dimension, value) {
    shapes[selectedShape].position[dimension] = Number(value);
    borders[selectedShape].position[dimension] = Number(value);
}


function rotateShape(dimension, value) {
    shapes[selectedShape].rotation[dimension] = Number(value)*Math.PI/180;
    borders[selectedShape].rotation[dimension] = Number(value)*Math.PI/180;
}

function cubeDimension(dimension, value){
    switch(dimension){
        case "x":
            scales[selectedShape][0]=Number(value);
            borders[selectedShape].scale.x = Number(value);
            break;
        case "y":
            scales[selectedShape][1]=Number(value);
            borders[selectedShape].scale.y = Number(value);
            break;
        case "z":
            scales[selectedShape][2]=Number(value);
            borders[selectedShape].scale.z = Number(value);
            break;
    }
}

function removeShape(){
    if(selectedShape >= 0){
        scene.remove(shapes[selectedShape]);
        scene.remove(borders[selectedShape])
        shapes.splice(selectedShape,1);
        scales.splice(selectedShape,1);
        borders.splice(selectedShape,1);
        selectedShape--;
        setSelectedShape(selectedShape);
    }
}

function borderChange(value){
    borders[selectedShape].material.color.set(value);

}