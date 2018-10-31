//jordan's code



function showList(){
    var sideBar=document.getElementById('listButtons');
    hideAll();
    document.getElementById("sideBarList").style.display="inherit";
    sideBar.innerHTML="";
    for (var i=0; i<shapes.length; i++){
        //console.log("Shape "+(i+1)+": "+shapes[i]['geometry']['type']);
        sideBar.innerHTML+="<button onclick='setSelectedShape("+i+")'>"+(i+1)+": "+shapes[i]['geometry']['type']+"</button>";
    }
    console.log("Showed List");
}

function cubeMenu() {
    hideAll();
    document.getElementById("sideBarBoxEdit").style.display = "inherit";
    document.getElementById("meshMenu").style.display = "inherit";
    document.getElementById("positionMenu").style.display = "inherit";
    document.getElementById("colorMenu").style.display = "inherit";
    console.log("Showed Cube Menu");
}

function setSelectedShape(num){
    selectedShape = num;
    document.getElementById('boxSelected').innerHTML="#"+(selectedShape+1);
    var color = "#";
    color += rgbToHex(shapes[selectedShape].material.color['r']*255)
    color += rgbToHex(shapes[selectedShape].material.color['g']*255)
    color += rgbToHex(shapes[selectedShape].material.color['b']*255)
    document.getElementById('colorChanger').value = color;
    document.getElementById('positionBoxX').value = shapes[selectedShape].position.x;
    document.getElementById('positionBoxY').value = shapes[selectedShape].position.y;
    document.getElementById('positionBoxZ').value = shapes[selectedShape].position.z;
    if(shapes[selectedShape].geometry.type == "BoxGeometry"){
        document.getElementById('cubeParameterBoxX').value = shapes[selectedShape].scale.x;
        document.getElementById('cubeParameterBoxY').value = shapes[selectedShape].scale.y;
        document.getElementById('cubeParameterBoxZ').value = shapes[selectedShape].scale.z;
        cubeMenu();
    }else if(shapes[selectedShape].geometry.type == "CylinderGeometry"){
        document.getElementById('cylParameterBoxX').value = shapes[selectedShape].scale.x;
        document.getElementById('cylParameterBoxY').value = shapes[selectedShape].scale.y;
        document.getElementById('cylParameterBoxZ').value = shapes[selectedShape].scale.z;
        cylinderMenu();
    }
    console.log("Set Shape Num");
}

function cameraMenu(){
    hideAll();
    document.getElementById('sideBarCamera').style.display="inherit";
    console.log("Showed Camera")

}

function meshMenu(){
    hideAll();
    document.getElementById("meshMenu").style.display="inherit";
    console.log("Showed Mesh")


}

function hideAll(){
    document.getElementById("sideBarList").style.display="none";
    document.getElementById("sideBarBoxEdit").style.display="none";
    document.getElementById("sideBarCamera").style.display="none";
    document.getElementById("sideBarCylinder").style.display="none";
    document.getElementById("colorMenu").style.display="none";
    document.getElementById("meshMenu").style.display="none";
    document.getElementById("positionMenu").style.display="none";
    document.getElementById("keyMenu").style.display="none";
    document.getElementById("shapeMenu").style.display="none";
    document.getElementById("addMenu").style.display="none";
    document.getElementById("createShape").style.display="none";
    console.log("Hide all")
}

function cylinderMenu(){
    hideAll();
    document.getElementById("sideBarCylinder").style.display="inherit";
    document.getElementById("meshMenu").style.display="inherit";
    document.getElementById("positionMenu").style.display="inherit";
    document.getElementById("colorMenu").style.display="inherit";
    console.log("wOw A cIlEnDeR")

}

function colorMenu(){
    hideAll();
    document.getElementById("colorMenu").style.display="inherit";
    console.log("SCOLOR")

}

function dimensionsMenu(){
    hideAll();
    var shapeType = shapes[selectedShape].geometry.name;
    switch(shapeType){
        case "cube":
            document.getElementById("sideBarBoxEdit").style.display="inherit";
            break;
        case "cylinder":
            document.getElementById("sideBarCylinder").style.display="inherit";
            break;
    }
    document.getElementById("positionMenu").style.display="inherit";
    console.log("WOEZER DEM");

}

function shapeMenu(){
    hideAll();
    document.getElementById("shapeMenu").style.display="inherit";
}

function newShapeMenu(){
    hideAll();
    document.getElementById("addMenu").style.display="inherit";
}

function addCylinderMenu(){
    hideAll();
    //document.getElementById("meshMenu").style.display="inherit";
    //document.getElementById("positionMenu").style.display="inherit";
    //document.getElementById("colorMenu").style.display="inherit";
    document.getElementById("createShape").style.display="inherit";
    console.log("wOw A cIlEnDeR")
}

function keyMenu(){
    hideAll();
    document.getElementById("keyMenu").style.display="inherit";
    loadKeyList()
}

function addCubeMenu() {
    hideAll();
    //commented elements  control the wrong shape, same thing with addCylinderMenu. Should be easy fix but I'm lazy -Jordan
    //document.getElementById("meshMenu").style.display = "inherit";
    //document.getElementById("positionMenu").style.display = "inherit";
    //document.getElementById("colorMenu").style.display = "inherit";
    document.getElementById("createShape").style.display="inherit";
    console.log("Showed Cube Menu");
}
