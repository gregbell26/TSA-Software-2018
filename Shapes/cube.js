//jordan's code

function newCube(x, y, z, posX, posY, posZ, newColor){
    var newGeometry = new THREE.BoxGeometry(1 , 1, 1);
    var newMaterial = new THREE.MeshBasicMaterial({color: newColor});
    shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
    var length = scales.length;
    newGeometry.name = "cube"
    scales[length]=[];
    scales[length][0]=x;
    scales[length][1]=y;
    scales[length][2]=z;
    scene.add(shapes[shapes.length-1]);
    selectedShape++;
    setSelectedShape(selectedShape);
    moveShape('x', posX);
    moveShape('y', posY);
    moveShape('z', posZ);
}


function cubeDimension(dimension, value){
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
