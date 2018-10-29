//jordan's code

function newCube(){
    var newGeometry = new THREE.BoxGeometry(1,1,1);
    var color = getRandomColor();
    var newMaterial = new THREE.MeshBasicMaterial({color: color});
    shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
    var length = scales.length;
    scales[length]=[];
    scales[length][0]=1;
    scales[length][1]=1;
    scales[length][2]=1;
    scene.add(shapes[shapes.length-1]);
    selectedShape++;
    setSelectedShape(selectedShape);
}


function cubeDimension(dimension,value){
    switch(dimension){
        case "x":
            scales[selectedShape][0]=Number(value);
            break;
        case "y":
            scales[selectedShape][1]=Number(value);
            break;
        case "z":
            scales[selectedShape][2]=Number(value);
            break;
    }
}

//corbin wrote this method:
function moveShape(dimension, value){
    switch(dimension){
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
function removeCube(){
    if(selectedShape >= 0){
        scene.remove(shapes[selectedShape]);
        shapes.splice(selectedShape,1);
        scales.splice(selectedShape,1);
        selectedShape--;
        setSelectedShape(selectedShape);
    }
}