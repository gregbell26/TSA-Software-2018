//corbin wrote this method, simplified by Jordan
function moveShape(dimension, value) {//Moves a shape value units in the direction of dimension x=0, y=1, x=2    
    shapes[selectedShape].position[dimension] = Number(value);
    borders[selectedShape].position[dimension] = Number(value);
}


function rotateShape(dimension, value) {//Rotates the selected shape value degrees in the direction of dimension x=0, y=1, x=2
    shapes[selectedShape].rotation[dimension] = Number(value)*Math.PI/180;
    borders[selectedShape].rotation[dimension] = Number(value)*Math.PI/180;
}

function cubeDimension(dimension, value){//scales the selected shapes in dimension x=0, y=1, x=2 by value
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

function removeShape(){//removes the selected shape
    if(selectedShape >= 0){
        scene.remove(shapes[selectedShape]);
        scene.remove(borders[selectedShape])
        shapes.splice(selectedShape,1);
        scales.splice(selectedShape,1);
        borders.splice(selectedShape,1);
        selectedShape--;
        //why?
        setSelectedShape(selectedShape);
    }
}

function borderChange(value){//Sets the boreder to value in (in what, hex?) NYI
    borders[selectedShape].material.color.set(value);

}
