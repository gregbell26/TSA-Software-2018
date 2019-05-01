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

        document.getElementById('diemsions_x').value = x;
        document.getElementById('diemsions_y').value = y;
        document.getElementById('diemsions_z').value = z;

        document.getElementById('position_x').value = posX;
        document.getElementById('position_y').value = posY;
        document.getElementById('position_z').value = posZ;
    } );

}
