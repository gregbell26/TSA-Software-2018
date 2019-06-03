//TODO This will need to be fixed later on these elements need to be changed
let slider = document.getElementById("intensity_slider");
let value = document.getElementById("intensity_value");
//value.innerText = slider.value;


function newLight(type,color,intensity,positionX,positionY,positionZ) {
    const convert = {
        "ambient":"Ambient",
        "point":"Point",
        "directional":"Directional",
        "spot":"Spot",
        "hemisphere":"Hemisphere",
    };
    if(type!=="hemisphere"){
        let light = new THREE[convert[type]+"Light"](color, intensity/100);
        console.log(light);
        light.name = convert[type] + " light";
        lights[lights.length] = light;
        scene.add(light);
        selectedLight = lights.length - 1;
        lights[selectedLight].position.x = positionX;
        lights[selectedLight].position.y = positionY;
        lights[selectedLight].position.z = positionZ;
        getId("shapeList_lights").innerHTML+="<button onclick='setSelectedLight("+selectedLight+");showMenu(\"menu_newShapes\");' style='color:black'>"+type+"</button><br>";
        getId("newLights_select").value = "newLight";
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

