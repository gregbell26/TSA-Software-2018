function newCylinder(){
    var newGeometry = new THREE.CylinderGeometry( 3, 3, 5,100 );
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
function removeCylinder(){
    if(selectedShape >= 0){
        scene.remove(shapes[selectedShape]);
        shapes.splice(selectedShape,1);
        scales.splice(selectedShape,1);
        selectedShape--;
        setSelectedShape(selectedShape);
    }
}