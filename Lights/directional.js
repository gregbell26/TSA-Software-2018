function newDirectionalLight(color, intensity) {
    let light = new THREE.DirectionalLight(color, intensity/100);
    light.name = "Directional light";
    lights[lights.length] = light;
    scene.add(light);
    selectedLight = lights.length - 1;
    setSelectedLight(selectedLight);
}