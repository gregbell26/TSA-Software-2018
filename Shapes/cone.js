function newCone(x, y, z, posX, posY, posZ, newColor){
    var newGeometry = new THREE.ConeGeometry( 0.5, 0.5, 1, 100);
    var newMaterial = new THREE.MeshBasicMaterial({color: newColor});
    shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
    var length = scales.length;
    newGeometry.name = "cone"
    scales[length]=[];
    scales[length][0]=x;
    scales[length][1]=y;
    scales[length][2]=z;
    scene.add(shapes[shapes.length-1]);
    selectedShape++;
    setSelectedShape(selectedShape);
    moveShape(x, posX);
    moveShape(y, posY);
    moveShape(z, posZ);
}

function coneDimension(dimension,value){
    switch(dimension){
        case "x":
           scales[selectedShape][0]=value;
            break;
        case "y":
            scales[selectedShape][1]=value;
            break;
        case "z":
            scales[selectedShape][2]=value;
            break;
    }
}