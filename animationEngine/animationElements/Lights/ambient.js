function newAmbientLight(color, intensity) {
    let light = new THREE.AmbientLight(color, intensity/100);
    light.name = "Ambient light";
    lights[lights.length] = light;
    scene.add(light);
    selectedLight = lights.length - 1;
    // setSelectedLight(selectedLight);
}