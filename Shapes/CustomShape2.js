function newCustom2(x, y, z, posX, posY, posZ, newColor, borderColor, verticies, faces) {
    var newGeometry = new THREE.Geometry();
    var newMaterial = new THREE.MeshLambertMaterial({ color: newColor });
    newMaterial.lights = true;
  // console.log(verticies);
   
    for(var i=0; i<verticies.length; i++){
   newGeometry.vertices.push(new THREE.Vector3(verticies[i][0], verticies[i][1], verticies[i][2]));
   //console.log("Added " +verticies[i]);
    }
    
    for( var i=0; i<faces.length; i++){
        newGeometry.faces.push(new THREE.Face3((faces[i][0]-1),(faces[i][1]-1),(faces[i][2]-1)));
       //console.log("Added " +faces[i]);
    }


    shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);


    var geometry = new THREE.BufferGeometry().fromGeometry(newGeometry);
    var borderToAdd = new THREE.LineSegments( geometry, new THREE.LineBasicMaterial( { color: borderColor } ) );
    newGeometry.name = "custom2";

    borderToAdd.scale.x = x;
    borderToAdd.scale.y = y;
    borderToAdd.scale.z = z;

    borders.push(borderToAdd);
    scene.add( borderToAdd );

    var length = scales.length;
    scales[length] = [];
    scales[length][0] = x;
    scales[length][1] = y;
    scales[length][2] = z;

    scene.add(shapes[shapes.length - 1]);
    selectedShape = shapes.length - 1;

    setSelectedShape(selectedShape);
    moveShape("x", posX);
    moveShape('y', posY);
    moveShape('z', posZ);

    document.getElementById('dimensionX').value = x;
    document.getElementById('dimensionY').value = y;
    document.getElementById('dimensionZ').value = z;

    document.getElementById('positionBoxX').value = posX;
    document.getElementById('positionBoxY').value = posY;
    document.getElementById('positionBoxZ').value = posZ;
}