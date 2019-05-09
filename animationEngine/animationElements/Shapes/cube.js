//jordan's code
function newCube(x, y, z, posX, posY, posZ, newColor, borderColor){
    //Shape
    var newGeometry = new THREE.BoxGeometry(1, 1, 1);
    var newMaterial = new THREE.MeshLambertMaterial({color: newColor});
    newMaterial.lights = true;
    shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
    var length = scales.length;
    newGeometry.name = "cube";
    scales[length]=[];
    scales[length][0]=x;
    scales[length][1]=y;
    scales[length][2]=z;
    scene.add(shapes[shapes.length-1]);
    selectedShape = shapes.length-1;

    //Borders
    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    var edges = new THREE.EdgesGeometry( geometry );
    var borderToAdd = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: borderColor } ) );
    borderToAdd.scale.x = x;
    borderToAdd.scale.y = y;
    borderToAdd.scale.z = z;
    //scales borders along with shape
    borders.push(borderToAdd);
    scene.add( borderToAdd );
    //adds borders to scene


    setSelectedShape(selectedShape);
    moveShape("x", posX);
    moveShape("y", posY);
    moveShape("z", posZ);

    document.getElementById('diemsions_x').value = x;
    document.getElementById('diemsions_y').value = y;
    document.getElementById('diemsions_z').value = z;

    document.getElementById('position_x').value = posX;
    document.getElementById('position_y').value = posY;
    document.getElementById('position_z').value = posZ;
}

