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

    document.getElementById('dimensionX').value = x;
    document.getElementById('dimensionY').value = y;
    document.getElementById('dimensionZ').value = z;
//gets dimention from menu and sets them
    document.getElementById('positionBoxX').value = posX;
    document.getElementById('positionBoxY').value = posY;
    document.getElementById('positionBoxZ').value = posZ;
    //gets position from menu and sets them
}

