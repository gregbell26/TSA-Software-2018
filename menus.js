//jordan's code

function showList(){
    //Brings up a list of all of the shapes that current exist in the scene. Called when the "Show List" button is clicked.
    let shapesList=document.getElementById('shapesList_shapes').children[0];
    let lightsList = document.getElementById("shapesList_lights").children[0];
    shapesList.innerHTML="";
    lightsList.innerHTML="";

    for (let i=0; i<shapes.length; i++){
        //console.log("Shape "+(i+1)+": "+shapes[i]['geometry']['type']);
        //sideBar.innerHTML+="<button onclick='setSelectedShape("+i+")'>"+(i+1)+": "+shapes[i].geometry.name+" <div style='width: 14px; height: 14px; background-color: #"+shapes[i].material.color.getHexString()+"; display: inline-block'></div></button><br>";

        shapesList.innerHTML+="<li class='elementList_body' onclick='setSelectedShape("+i+")'>" + shapes[i].geometry.name +
            "<div style='display: block;margin-left: 5px;width: 20px; float: left;height: 20px;background-color: #"+shapes[i].material.color.getHexString()+";'</li>"
    }
    for (let i = 0; i < lights.length; i++){
        lightsList.innerHTML+="<li class='elementList_body' onclick='setSelectedLight("+i+")'>" + lights[i].name +
            "<div style='display: block;margin-left: 5px;width: 20px; float: left;height: 20px;background-color: #"+lights[i].color.getHexString()+";'</li>"
    }
    //console.log("Showed List");
    if(usingTutorial){
        usingTutorial = false;
        document.getElementById("tutorialArrow").style.display="none";
    }
}

function setSelectedShape(num){
    selectedShape = num;
    toggleEditShapeOrLight(false);
    if(num === -1){
        showMenu("menu_newShapes");
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
    document.getElementById('element_color').value = "#"+shapes[selectedShape].material.color.getHexString();
    document.getElementById("element_border_color").value = "#"+borders[selectedShape].material.color.getHexString();
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
    showMenu("menu_newShapes");
}

function setSelectedLight(num) {
    selectedLight = num;
    if(num === -1){
        showMenu("menu_newShapes");
        document.getElementById("element_Information").style.display = 'none';
        document.getElementById('currentEditing_type').style.display = 'none';
        return;
    }
    else{
        document.getElementById("element_Information").style.display = 'initial';
        document.getElementById('currentEditing_type').style.display = 'initial';
    }
    if (lights[selectedLight].name === "Hemisphere light"){
        document.getElementById("element_border_color").value = "#"+lights[selectedLight].groundColor.getHexString();
    }
    toggleEditShapeOrLight(true);
    document.getElementById("element_color").value = "#"+lights[selectedLight].color.getHexString();
    document.getElementById("position_x").value = lights[selectedLight].position.x;
    document.getElementById("position_y").value = lights[selectedLight].position.y;
    document.getElementById("position_z").value = lights[selectedLight].position.z;
    document.getElementById("intensity_slider").value = lights[selectedLight].intensity * 100;
    document.getElementById("intensity_value").innerHTML = lights[selectedLight].intensity * 100 + "";
    showMenu("menu_newShapes");
    // lightEditMenu();
}

function cameraMenu(){
    hideAll();
    document.getElementById('sideBarCamera').style.display="inherit";
    document.getElementById('xPositionBox').value = xPosition;
    document.getElementById('yPositionBox').value = yPosition;
    document.getElementById('zPositionBox').value = zPosition;
    document.getElementById('xCCenterBox').value = xCCenter;
    document.getElementById('yCCenterBox').value = yCCenter;
    document.getElementById('zCCenterBox').value = zCCenter;
    document.getElementById('xCLookBox').value = xCLook;
    document.getElementById('yCLookBox').value = yCLook;
    document.getElementById('zCLookBox').value = zCLook;
    console.log("Showed Camera")

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

function editMenu() {
    // hideAll();
    // document.getElementById("sideBarBoxEdit").style.display = "inherit";
    // document.getElementById("positionMenu").style.display = "inherit";
    // document.getElementById("colorMenu").style.display = "inherit";
    // document.getElementById("rotateMenu").style.display="inherit";
    // console.log("Showed Menu");
}

function colorMenu(){
    // hideAll();
    document.getElementById("colorMenu").style.display="inherit";
    console.log("COLOR")

}

function shapeMenu(){
    // hideAll();
    document.getElementById("shapeMenu").style.display="inherit";
    if(usingTutorial){
        if(confirm("Now create a shape")){
            animateArrow(15, 75, 120, 120);
        }
        else{
            usingTutorial = false;
        }
    }
}

function newShapeMenu(){
    // hideAll();
    document.getElementById("addMenu").style.display="inherit";
    if(usingTutorial){
        animateArrow(75, 95, 120, 90);
    }
}

function newLightMenu() {
    // hideAll();
    document.getElementById("addLightMenu").style.display="inherit";
}

function lightEditMenu(){
    // hideAll();
    document.getElementById("lightEditMenu").style.display="inherit";
    if (lights[selectedLight].type == "HemisphereLight"){
        document.getElementById("hemisphereLightColor").style.display="inherit";
    }else {
        document.getElementById("hemisphereLightColor").style.display="none";
    }
}


function keyMenu(){
    // hideAll();
    document.getElementById("keyMenu").style.display="inherit";
    loadKeyList();
    if(usingTutorial){
        confirm("Use the \"Add keyframe\" button to mark the start of your animation")
        animateArrow(15,75,240,250);
    }
}

function sceneMenu() {
    // // // hideall();
    document.getElementById("sceneMenu").style.display='inherit';

}

function lightMenu() {
// hideAll();
    document.getElementById("lightMenu").style.display='inherit';
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

function hideShowCHK2() {
    if(document.getElementById('chkbox1').checked)
        document.getElementById('chkbox2').show();
    else
        document.getElementById('chkbox2').hide();
}

function openSettings(){
    document.getElementById("settingsPage").style.display = "inherit";
    document.getElementById("settingsBackground").style.display = "inherit";
    settingsOpen = true;
}
function closeSettings(){
    document.getElementById("settingsPage").style.display = "none";
    document.getElementById("settingsBackground").style.display = "none";
    document.getElementById("userPage").style.display = "none";
    settingsOpen = false;
}

function mouseSenseSet(value){
    if(!isNaN(Number(value))){
        settings.mouseSensitivity = Number(value);
        localStorage.setItem("settings",JSON.stringify(settings));
    }
}

function zoomSet(value){
    if(!isNaN(Number(value))){
        console.log("changingZoom")
        changeZoomSensitivity(value);
        localStorage.setItem("settings",JSON.stringify(settings));
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
        if (lights[selectedLight].name === "Hemisphere light"){
            getId("element_border_color").style.display="inherit";
            getId("currentEditing_positions").style.display="inherit";
        } else if (lights[selectedLight].name === "Ambient light") {
            getId("currentEditing_positions").style.display="none";
            getId("element_border_color").style.display="none";
        } else {
            getId("currentEditing_positions").style.display="inherit";
            getId("element_border_color").style.display="none";
        }
    }
    else{
        getId("currentEditing_type").innerHTML = "shape";
        getId("currentEditing_dimensions").style.display="inherit";
        getId("currentEditing_intensity").style.display="none";
        getId("currentEditing_rotation").style.display="inherit";
        getId("currentEditing_positions").style.display="inherit";
        getId("currentEditing_borders").style.display="inherit";
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