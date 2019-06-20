//jordan's code

function showList(){
    //Brings up a list of all of the shapes that current exist in the scene. Called when the "Show List" button is clicked.
    let shapesList=document.getElementById('shapesList_shapes').children[0];
    let lightsList = document.getElementById("shapesList_lights").children[0];
    shapesList.innerHTML="";
    lightsList.innerHTML="";

    for (let i=0; i<shapes.length; i++){
        shapesList.innerHTML+="<li class='elementList_body' onclick='setSelectedShape("+i+")'>" + shapes[i].geometry.name +
            "<div style='display: block;margin-left: 5px;width: 20px; float: left;height: 20px;background-color: #"+shapes[i].material.color.getHexString()+";'</li>"
    }
    for (let i = 0; i < lights.length; i++){
        lightsList.innerHTML+="<li class='elementList_body' onclick='setSelectedLight("+i+")'>" + lights[i].name +
            "<div style='display: block;margin-left: 5px;width: 20px; float: left;height: 20px;background-color: #"+lights[i].color.getHexString()+";'</li>"
    }
}

function setSelectedShape(num){
    selectedShape = num;
    toggleEditShapeOrLight(false);
    if(num === -1){
        //showMenu("menu_newShapes");
        document.getElementById("element_Information").style.display = 'none';
        document.getElementById('currentEditing_type').style.display = 'none';
        return;
    }
    else{
        document.getElementById("element_Information").style.display = 'initial';
        document.getElementById('currentEditing_type').style.display = 'initial';
    }
    //document.getElementById('boxSelected').innerHTML="#"+(selectedShape+1);
    console.log(shapes[selectedShape].material.color.getHexString());
    document.getElementById('element_color').children[0].value = "#"+shapes[selectedShape].material.color.getHexString();
    document.getElementById("element_border_color").children[0].value = "#"+borders[selectedShape].material.color.getHexString();
    document.getElementById('position_x').value = shapes[selectedShape].position.x;
    document.getElementById('position_y').value = shapes[selectedShape].position.y;
    document.getElementById('position_z').value = shapes[selectedShape].position.z;
    document.getElementById('rotation_x').value = (shapes[selectedShape].rotation.x*180/Math.PI);
    document.getElementById('rotation_y').value = (shapes[selectedShape].rotation.y*180/Math.PI);
    document.getElementById('rotation_z').value = (shapes[selectedShape].rotation.z*180/Math.PI);
    document.getElementById('diemsions_x').value = scales[selectedShape][0];
    document.getElementById('diemsions_y').value = scales[selectedShape][1];
    document.getElementById('diemsions_z').value = scales[selectedShape][2];
    document.getElementById('borders').checked = borders[selectedShape].visible;
    document.getElementById("shape_castShadow").checked = shapes[selectedShape].castShadow;
    document.getElementById("shape_receiveShadow").checked = shapes[selectedShape].receiveShadow;
    if (shapes[selectedShape].visible){
        getId("element_visibility_button").innerHTML = "<span class='button_body' id='element_visibility_button'>Hide Element</span>"
    } else {
        getId("element_visibility_button").innerHTML = "<span class='button_body' id='element_visibility_button'>Show Element</span>"
    }
    showMenu("menu_newShapes");
}

function setSelectedLight(num) {
    selectedLight = num;
    if(num === -1){
        //howMenu("menu_newShapes");
        document.getElementById("element_Information").style.display = 'none';
        document.getElementById('currentEditing_type').style.display = 'none';
        return;
    }
    else{
        document.getElementById("element_Information").style.display = 'initial';
        document.getElementById('currentEditing_type').style.display = 'initial';
    }
    if (lights[selectedLight].name === "Hemisphere light"){
        document.getElementById("element_border_color").children[0].value = "#"+lights[selectedLight].groundColor.getHexString();
    }
    toggleEditShapeOrLight(true);
    document.getElementById("element_color").children[0].value = "#"+lights[selectedLight].color.getHexString();
    document.getElementById("position_x").value = lights[selectedLight].position.x;
    document.getElementById("position_y").value = lights[selectedLight].position.y;
    document.getElementById("position_z").value = lights[selectedLight].position.z;
    document.getElementById("intensity_slider").value = lights[selectedLight].intensity * 100;
    document.getElementById("intensity_value").innerHTML = lights[selectedLight].intensity * 100 + "";
    document.getElementById("light_castShadow").checked = lights[selectedLight].castShadow;
    if(lights[selectedLight].name === "Spot Light" && lights[selectedLight].target.isObject3D()) {
        document.getElementById("target_x").value = lights[selectedLight].target.position.x;
        document.getElementById("target_y").value = lights[selectedLight].target.position.y;
        document.getElementById("target_z").value = lights[selectedLight].target.position.z;
    }
    if (lights[selectedLight].visible){
        getId("element_visibility_button").innerHTML = "<span class='button_body' id='element_visibility_button'>Hide Element</span>"
    } else {
        getId("element_visibility_button").innerHTML = "<span class='button_body' id='element_visibility_button'>Show Element</span>"
    }
    showMenu("menu_newShapes");
    // lightEditMenu();
}

function hideAll(){
    //used to make correct menus show up, and the wrong menus don't show up. This is called every time we open a menu.
    // document.getElementById("sideBarList").style.display="none";
    // document.getElementById("sideBarBoxEdit").style.display="none";
    // document.getElementById("sideBarCamera").style.display="none";
    // document.getElementById("colorMenu").style.display="none";
    // document.getElementById("positionMenu").style.display="none";
    // document.getElementById("keyMenu").style.display="none";
    // document.getElementById("shapeMenu").style.display="none";
    // document.getElementById("addMenu").style.display="none";
    // document.getElementById("rotateMenu").style.display="none";
    // document.getElementById("sceneMenu").style.display='none';
    // document.getElementById('createTextMenu').style.display = 'none';
    // document.getElementById('createCustomMenu').style.display = 'none';
    // document.getElementById("lightMenu").style.display='none';
    // document.getElementById("addLightMenu").style.display="none";
    // document.getElementById("lightEditMenu").style.display="none";
    // console.log("Hide all")
}

function shapeMenu(){
    // hideAll();
    document.getElementById("shapeMenu").style.display="inherit";
    // if(usingTutorial){
    //     if(confirm("Now create a shape")){
    //        // animateArrow(15, 75, 120, 120);
    //     }
    //     else{
    //         usingTutorial = false;
    //     }
    // }
    tutorialMovement(15, 75, "Now create a shape", false);
}

function borderVisibility(){
    let checked = document.getElementById("borders").checked;
    if(checked){
        borders[selectedShape].visible = true;
        document.getElementById("element_border_color").style.display="inherit";
    }else{
        borders[selectedShape].visible = false;
        document.getElementById("element_border_color").style.display="none";
    }
}

function toggleEditShapeOrLight(isLight){
    showingLight = isLight;
    if(isLight){
        getId("currentEditing_type").innerHTML = "light";
        getId("currentEditing_dimensions").style.display="none";
        getId("currentEditing_intensity").style.display="inherit";
        getId("currentEditing_rotation").style.display="none";
        getId("currentEditing_borders").style.display="none";
        getId("currentEditing_shape_shadows").style.display="none";
        getId("default_target_position").style.display = "none";
        if (lights[selectedLight].name === "Hemisphere light"){
            getId("element_border_color").style.display="inherit";
            getId("currentEditing_positions").style.display="inherit";
            getId("currentEditing_spotlight_parameters").style.display="none";
        } else if (lights[selectedLight].name === "Ambient light") {
            getId("currentEditing_positions").style.display="none";
            getId("element_border_color").style.display="none";
            getId("currentEditing_spotlight_parameters").style.display="none";
        } else if (lights[selectedLight].name === "Spot light") {
            getId("currentEditing_positions").style.display="inherit";
            getId("element_border_color").style.display="none";
            getId("currentEditing_spotlight_parameters").style.display="inherit";
            if (lights[selectedLight].target.type === "Object3D"){
                getId("default_target_position").style.display = "inherit";
            }
            setTargetList();
        }else {
            getId("currentEditing_positions").style.display="inherit";
            getId("element_border_color").style.display="none";
            getId("currentEditing_spotlight_parameters").style.display="none";
        }
    }
    else{
        tutorialMovement(100,120,"13", 0);
        getId("currentEditing_type").innerHTML = "shape";
        getId("currentEditing_dimensions").style.display="inherit";
        getId("currentEditing_intensity").style.display="none";
        getId("currentEditing_rotation").style.display="inherit";
        getId("currentEditing_positions").style.display="inherit";
        getId("currentEditing_borders").style.display="inherit";
        getId("currentEditing_spotlight_parameters").style.display="none";
        getId("currentEditing_shape_shadows").style.display="inherit";
        getId("default_target_position").style.display = "none";
        if (borders.length > 0){
            if (document.getElementById('borders').checked === true){
                getId("element_border_color").style.display="inherit";
            } else {
                getId("element_border_color").style.display="none";
            }
        }else {
            getId("element_border_color").style.display="inherit";
        }
    }
}