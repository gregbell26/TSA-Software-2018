function newSpotLight(color, intensity) {
    let light = new THREE.SpotLight(color, intensity/100);
    light.name = "Spotlight";
    lights[lights.length] = light;
    scene.add(light);
    selectedLight = lights.length - 1;
    setSelectedLight(selectedLight);
}