//jordan's code

function showList(){
    var sideBar=document.getElementById('listButtons');
    hideAll();
    document.getElementById("sideBarList").style.display="inherit";
    sideBar.innerHTML="";
    for (var i=0; i<shapes.length; i++){
        //console.log("Shape "+(i+1)+": "+shapes[i]['geometry']['type']);
        sideBar.innerHTML+="<button onclick='setSelectedShape("+i+")'>"+(i+1)+": "+shapes[i].geometry.name+" <div style='width: 14px; height: 14px; background-color: #"+shapes[i].material.color.getHexString()+"; display: inline-block'></div></button>";
    }
    console.log("Showed List");
}

function setSelectedShape(num){
    selectedShape = num;
    document.getElementById('boxSelected').innerHTML="#"+(selectedShape+1);
    var color = "#";
    color += rgbToHex(shapes[selectedShape].material.color['r']*255)
    color += rgbToHex(shapes[selectedShape].material.color['g']*255)
    color += rgbToHex(shapes[selectedShape].material.color['b']*255)
    document.getElementById('colorChanger').value = color;
    document.getElementById("borderColor").value = "#"+borders[selectedShape].material.color.getHexString();
    document.getElementById('positionBoxX').value = shapes[selectedShape].position.x;
    document.getElementById('positionBoxY').value = shapes[selectedShape].position.y;
    document.getElementById('positionBoxZ').value = shapes[selectedShape].position.z;
    document.getElementById('rotateBoxX').value = (shapes[selectedShape].rotation.x*180/Math.PI);
    document.getElementById('rotateBoxY').value = (shapes[selectedShape].rotation.y*180/Math.PI);
    document.getElementById('rotateBoxZ').value = (shapes[selectedShape].rotation.z*180/Math.PI);
    document.getElementById('dimensionX').value = shapes[selectedShape].scale.x;
    document.getElementById('dimensionY').value = shapes[selectedShape].scale.y;
    document.getElementById('dimensionZ').value = shapes[selectedShape].scale.z;
    editMenu();
    console.log("Set Shape Num");
}

function cameraMenu(){
    hideAll();
    document.getElementById('sideBarCamera').style.display="inherit";
    document.getElementById('xPositionBox').value = xPosition;
    document.getElementById('yPositionBox').value = yPosition;
    document.getElementById('zPositionBox').value = zPosition;
    console.log("Showed Camera")

}

function meshMenu(){
    hideAll();
    document.getElementById("meshMenu").style.display="inherit";
    console.log("Showed Mesh")


}

function hideAll(){
    //used to make correct menus show up, and the wrong menus don't show up. This is called every time we open a menu.
    document.getElementById("sideBarList").style.display="none";
    document.getElementById("sideBarBoxEdit").style.display="none";
    document.getElementById("sideBarCamera").style.display="none";
    document.getElementById("colorMenu").style.display="none";
    document.getElementById("meshMenu").style.display="none";
    document.getElementById("positionMenu").style.display="none";
    document.getElementById("keyMenu").style.display="none";
    document.getElementById("shapeMenu").style.display="none";
    document.getElementById("addMenu").style.display="none";
    document.getElementById("createShape").style.display="none";
    document.getElementById("rotateMenu").style.display="none";
    document.getElementById("sceneMenu").style.display='none';
    console.log("Hide all")
}

function editMenu() {
    hideAll();
    document.getElementById("sideBarBoxEdit").style.display = "inherit";
    document.getElementById("meshMenu").style.display = "inherit";
    document.getElementById("positionMenu").style.display = "inherit";
    document.getElementById("colorMenu").style.display = "inherit";
    document.getElementById("rotateMenu").style.display="inherit";
    console.log("Showed Menu");
}

function colorMenu(){
    hideAll();
    document.getElementById("colorMenu").style.display="inherit";
    console.log("COLOR")

}

function shapeMenu(){
    hideAll();
    document.getElementById("shapeMenu").style.display="inherit";
}

function newShapeMenu(){
    hideAll();
    document.getElementById("addMenu").style.display="inherit";
}

function addShapeMenu(){
    hideAll();
    document.getElementById("createShape").style.display="inherit";
}

function keyMenu(){
    hideAll();
    document.getElementById("keyMenu").style.display="inherit";
    loadKeyList()
}

function sceneMenu() {
    hideAll();
    document.getElementById("sceneMenu").style.display='inherit';

}


function borderVisibility(){
    var checked = document.getElementById("borderVisibility").checked;
    if(checked){
        borders[selectedShape].visible = true;
        document.getElementById("borderMenu").style.display="inherit";
    }else{
        borders[selectedShape].visible = false;
        document.getElementById("borderMenu").style.display="none";
    }
}