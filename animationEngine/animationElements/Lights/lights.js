//TODO This will need to be fixed later on these elements need to be changed
let slider = document.getElementById("intensity_slider");
let value = document.getElementById("intensity_value");
//value.innerText = slider.value;


function newLight(type,color,intensity,positionX,positionY,positionZ,color2) {
    const convert = {
        "ambient":"Ambient",
        "point":"Point",
        "directional":"Directional",
        "spot":"Spot",
        "hemisphere":"Hemisphere",
    };
    if(type!=="hemisphere"){
        let light = new THREE[convert[type]+"Light"](color, intensity/100);
        light.name = convert[type]+" light";
        lights[lights.length] = light;
        scene.add(light);
        selectedLight = lights.length - 1;
        lights[selectedLight].position.x = positionX;
        lights[selectedLight].position.y = positionY;
        lights[selectedLight].position.z = positionZ;
        getId("newLights_select").value = "newLight";
    }else if (type === "hemisphere"){
        let light = new THREE[convert[type]+"Light"](color, color2, intensity/100);
        light.name = convert[type]+" light";
        lights[lights.length] = light;
        scene.add(light);
        selectedLight = lights.length - 1;
        positionY = -1;
        lights[selectedLight].position.x = positionX;
        lights[selectedLight].position.y = positionY;
        lights[selectedLight].position.z = positionZ;
    }
    setSelectedLight(selectedLight);
}

function removeLight(){
    if (selectedLight >= 0) {
        scene.remove(lights[selectedLight]);
        lights.splice(selectedLight,1);


        selectedLight = -1;

        setSelectedLight(selectedLight);
        saveSubSystem.save();
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
    if (lights[selectedLight].type === "HemisphereLight") {
        lights[selectedLight].groundColor.set(value);
    } else {
        changeLightColor(value);
    }

}

function changeIntensity(){
    value.innerHTML = slider.value;
    lights[selectedLight].intensity = (slider.value/100);
}

