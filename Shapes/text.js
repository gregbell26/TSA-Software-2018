function newText(x, y, z, posX, posY, posZ, newColor, borderColor){
    console.log(document.getElementById('createText').value);
    let myText = document.getElementById('createText').value;
    document.getElementById('createText').value = "";


    let loader = new THREE.FontLoader();
    loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        let newGeometry = new THREE.TextGeometry( myText, {
            font: font,
            size: 1,
            height: 0.05,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 0.05,
            bevelSegments: 2.5
        } );
        let newMaterial = new THREE.MeshLambertMaterial({color: newColor});
        newMaterial.lights = true;
        shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
        let length = scales.length;
        newGeometry.name = "text";
        scales[length]=[];
        scales[length][0]=x;
        scales[length][1]=y;
        scales[length][2]=z;
        scene.add(shapes[shapes.length-1]);
        selectedShape = shapes.length-1;
        let geometry = new THREE.TextBufferGeometry( myText, {
            font: font,
            size: 1,
            height: 0.05,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 0.05,
            bevelSegments: 2.5
        } );
        let edges = new THREE.EdgesGeometry( geometry );
        let borderToAdd = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: borderColor } ) );
        borderToAdd.scale.x = x;
        borderToAdd.scale.y = y;
        borderToAdd.scale.z = z;
        borders.push(borderToAdd);
        scene.add(borderToAdd);
        setSelectedShape(selectedShape);
        moveShape("x", posX);
        moveShape("y", posY);
        moveShape("z", posZ);

        document.getElementById('dimensionX').value = x;
        document.getElementById('dimensionY').value = y;
        document.getElementById('dimensionZ').value = z;

        document.getElementById('positionBoxX').value = posX;
        document.getElementById('positionBoxY').value = posY;
        document.getElementById('positionBoxZ').value = posZ;
    } );

}
