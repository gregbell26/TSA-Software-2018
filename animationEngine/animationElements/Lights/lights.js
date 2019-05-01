//TODO This will need to be fixed later on these elements need to be changed
let slider = document.getElementById("intensityRange");
let value = document.getElementById("intensityValue");
//value.innerText = slider.value;


function newLight(type,color,intensity,positionX,positionY,positionZ) {
    // let type = document.getElementById("lightSelector").value;
    // switch(type){
    //     case "ambient":
    //         newAmbientLight("#ffffff", 50);
    //         break;
    //     case "point":
    //         newPointLight("#ffffff", 50);
    //         break;
    //     case "directional":
    //         newDirectionalLight("#ffffff", 50);
    //         break;
    //     case "spot":
    //         newSpotLight("#ffffff", 50);
    //         break;
    //     case "hemisphere":
    //         newHemisphereLight("#87CEEB", "#654321", 50);
    //         break;
    // }
    const convert = {
        "ambient":"Ambient",
        "point":"Point",
        "directional":"Directional",
        "spot":"Spot",
        "hemisphere":"Hemisphere",
    }
    if(type!="hemisphere"){
        let light = new THREE[convert[type]+"Light"](color, intensity/100);
        light.name = "Ambient light";
        lights[lights.length] = light;
        scene.add(light);
        selectedLight = lights.length - 1;
        lights[selectedLight].position.x = positionX;
        lights[selectedLight].position.y = positionY;
        lights[selectedLight].position.z = positionZ;
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

