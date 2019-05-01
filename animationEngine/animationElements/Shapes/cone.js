function newCone(x, y, z, posX, posY, posZ, newColor, borderColor){
    var newGeometry = new THREE.ConeGeometry( 0.5, 1, 100); //function in three js that creates a new shape. 
    var newMaterial = new THREE.MeshLambertMaterial({color: newColor});
    newMaterial.lights = true;
    shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);  //merges the cone and the material into a shape
    var length = scales.length; 
    newGeometry.name = "cone"

    scales[length]=[];
    scales[length][0]=x;
    scales[length][1]=y;
    scales[length][2]=z;

    scene.add(shapes[shapes.length-1]); //adds the shape to the scene.
    selectedShape = shapes.length-1; 
    var geometry = new THREE.ConeBufferGeometry( 0.5, 1, 100); //creates the borders
    var edges = new THREE.EdgesGeometry( geometry ); // finds the edges for the borders
    var borderToAdd = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: borderColor } ) ); //adds the lines of the given material color where the edges are 
    
    borderToAdd.scale.x = x;
    borderToAdd.scale.y = y;
    borderToAdd.scale.z = z;
//scales the borders along with the shape 
    
    borders.push(borderToAdd); //pushes borders
    scene.add( borderToAdd ); //adds border to scene
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
