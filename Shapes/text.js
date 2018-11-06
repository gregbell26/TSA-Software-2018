function newText(x, y, z, posX, posY, posZ, newColor){
    var loader = new THREE.FontLoader();
    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        var newGeometry = new THREE.TextGeometry( 'Hello three.js!', {
            font: font,
            size: 1,
            height: 0.05,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize: 0.05,
            bevelSegments: 2.5
        } );
        var newMaterial = new THREE.MeshBasicMaterial({color: newColor});
        shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
        var length = scales.length;
        newGeometry.name = "text"
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
    } );

}
