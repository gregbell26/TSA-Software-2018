function newPointLight(color, intensity) {
    let light = new THREE.PointLight(color, intensity/100);
    light.name = "Point light";
    lights[lights.length] = light;
    scene.add(light);
    selectedLight = lights.length - 1;
    setSelectedLight(selectedLight);
}