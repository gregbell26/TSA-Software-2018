function newCone(x, y, z, posX, posY, posZ, newColor, borderColor){
    var newGeometry = new THREE.ConeGeometry( 0.5, 1, 100);
    var newMaterial = new THREE.MeshBasicMaterial({color: newColor});
    shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
    var length = scales.length;
    newGeometry.name = "cone"
    scales[length]=[];
    scales[length][0]=x;
    scales[length][1]=y;
    scales[length][2]=z;
    scene.add(shapes[shapes.length-1]);
    selectedShape = shapes.length-1;
    var geometry = new THREE.ConeBufferGeometry( 0.5, 1, 100);
    var edges = new THREE.EdgesGeometry( geometry );
    var borderToAdd = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: borderColor } ) );
    borderToAdd.scale.x = x;
    borderToAdd.scale.y = y;
    borderToAdd.scale.z = z;
    borders.push(borderToAdd);
    scene.add( borderToAdd );
    setSelectedShape(selectedShape);
    moveShape("x", posX);
    moveShape("y", posY);
    moveShape("z", posZ);
}