let slider = document.getElementById("intensityRange");
let value = document.getElementById("intensityValue");
value.innerText = slider.value;


function newLight() {
    let type = document.getElementById("lightSelector").value;
    switch(type){
        case "ambient":
            newAmbientLight("#ffffff", 50);
            break;
        case "point":
            newPointLight("#ffffff", 50);
            break;
        case "directional":
            newDirectionalLight("#ffffff", 50);
            break;
        case "spot":
            newSpotLight("#ffffff", 50);
            break;
        case "hemisphere":
            newHemisphereLight("#87CEEB", "#654321", 50);
            break;
    }
}

function removeLight(){
    if(selectedLight >= 0){
        scene.remove(lights[selectedLight]);
        lights.splice(selectedLight,1);
        selectedLight--;
        setSelectedLight(selectedLight);
        // saveSubSystem.save();
    }
}

function moveLight(dimension, value) {
    lights[selectedLight].position[dimension] = Number(value);
}

function changeLightColor(value){
    //changes the color of the currently selected light
    lights[selectedLight].color.set(value);
}

function changeGroundLightColor(value){
    //changes the color ground of the currently selected light
    if (lights[selectedLight].type == "HemisphereLight") {
        lights[selectedLight].groundColor.set(value);
    } else {
        changeLightColor(value);
    }

}

function changeIntensity(){
    value.innerHTML = slider.value;
    lights[selectedLight].intensity = (slider.value/100);
}

