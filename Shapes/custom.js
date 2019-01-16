function newCustom() {
    var newGeometry = new THREE.Geometry();
    var newMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    var v1 = new THREE.Vector3(0, 0, 0);
    var v2 = new THREE.Vector3(0, 500, 0);
    var v3 = new THREE.Vector3(0, 500, 500);

    newGeometry.vertices.push(v1);
    newGeometry.vertices.push(v2);
    newGeometry.vertices.push(v3);

    newGeometry.faces.push(new THREE.Face3(0, 1, 2));


    var length = scales.length;

    newGeometry.name = "custom"
    scales[length] = [];
    scales[length][0] = 10;
    scales[length][1] = 10;
    scales[length][2] = 10;

    shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);
    scene.add(shapes[shapes.length - 1]);
    selectedShape = shapes.length - 1;
    setSelectedShape(selectedShape);

    document.getElementById('dimensionX').value = 10
    document.getElementById('dimensionY').value = 10;
    document.getElementById('dimensionZ').value = 10;
}