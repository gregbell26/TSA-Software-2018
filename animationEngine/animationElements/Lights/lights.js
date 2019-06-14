//TODO This will need to be fixed later on these elements need to be changed

//value.innerText = slider.value;


function newLight(type,color,intensity,positionX,positionY,positionZ,color2) {
    const convert = {
        "ambient":"Ambient",
        "point":"Point",
        "directional":"Directional",
        "spot":"Spot",
        "hemisphere":"Hemisphere",
    };
    if(type!=="hemisphere" && type !== "spot"){
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
    }else if (type === "spot"){
        let light = new THREE[convert[type]+"Light"](color, intensity/100);
        light.name = convert[type]+" light";
        lights[lights.length] = light;
        scene.add(light);
        scene.add(light.target);
        selectedLight = lights.length - 1;
        lights[selectedLight].position.x = positionX;
        lights[selectedLight].position.y = positionY;
        lights[selectedLight].position.z = positionZ;
        getId("newLights_select").value = "newLight";
    }
    setSelectedLight(selectedLight);
    for(var i = 0; i < keyFrames.length; i++){
        keyFrames[i].lights.push({intensity: JSON.parse(JSON.stringify(lights[selectedLight].intensity)),
                                  position: JSON.parse(JSON.stringify(lights[selectedLight].position)),
                                  color: JSON.parse(JSON.stringify(lights[selectedLight].color)),
                                  rotation: JSON.parse(JSON.stringify(lights[selectedLight].rotation)),
                                  visible: lights[selectedLight].visible});
    }
}

function moveTarget(dimension, value){
    lights[selectedLight].target.position[dimension] = Number(value);
}

function setTargetList() {
    var selector = document.getElementById("target_select");
    selector.innerHTML = "<option value='defaultTarget'>Default Target</option>";
    let count = {
        "cube":1,
        "cone":1,
        "cylinder":1,
        "dodecahedron":1,
        "icosahedron":1,
        "octahedron":1,
        "pyramid":1,
        "sphere":1,
        "ring":1,
        "text":1,
    };
    for (let i = 0; i < shapes.length; i++){
        var id = shapes[i].uuid;
        let name = shapes[i].geometry.name;
        //shapes[i] is the "index" shape of its type
        let index = count[name];
        count[name]++;
        if (shapes[i].uuid === lights[selectedLight].target.uuid){
            selector.innerHTML += "<option value = "+id+" selected>"+shapes[i].geometry.name+" "+index+"</option>"
        } else {
            selector.innerHTML += "<option value = "+id+">"+shapes[i].geometry.name+" "+index+"</option>"
        }
    }
}

function setTarget(value) {
    let shape;
    if (value === 'defaultTarget') {
        let target = new THREE.Object3D();
        console.log(target);
        scene.remove(lights[selectedLight]);
        lights[selectedLight].target = target;
        console.log(lights[selectedLight].target);
        scene.add(lights[selectedLight].target);
        scene.add(lights[selectedLight]);
        getId("default_target_position").style.display = "inherit";
        console.log(lights[selectedLight].target)
    } else {
        getId("default_target_position").style.display = "none";
    }
    for (let i = 0; i < shapes.length; i++){
        if (shapes[i].uuid === value){
            shape = shapes[i];
        }
    }
    if (shape !== null){
        lights[selectedLight].target = shape;
    } else {
        console.log("No shape with that id exists")
    }
}

function toggleCastShadow(){
    if (showingLight) {
        lights[selectedLight].castShadow = document.getElementById("light_castShadow").checked;
    } else {
        shapes[selectedShape].castShadow = document.getElementById("shape_castShadow").checked;
    }
}

function toggleReceiveShadow() {
    shapes[selectedShape].receiveShadow = document.getElementById("shape_receiveShadow").checked;
}

function removeLight(){
    if (selectedLight >= 0) {
        scene.remove(lights[selectedLight]);
        lights.splice(selectedLight,1);


        selectedLight = -1;

        setSelectedLight(selectedLight);
        for(var i; i < keyFrames.length; i++){
            keyFrames[i].lights.splice(selectedLight,1);
        }
        saveEngine.save(true,true);
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
    let slider = document.getElementById("intensity_slider");
    let value = document.getElementById("intensity_value");
    value.innerHTML = slider.value;
    lights[selectedLight].intensity = (slider.value/100);
}

