//jordan's code

setSelectedShape(1);

function showList(){
    var sideBar=document.getElementById('sideBarList');
    hideAll();
    document.getElementById("sideBarList").style.display="inherit";
    sideBar.innerHTML="";
    for (var i=0; i<shapes.length; i++){
        //console.log("Shape "+(i+1)+": "+shapes[i]['geometry']['type']);
        sideBar.innerHTML+="<a onclick='setSelectedShape("+i+")'>"+(i+1)+": "+shapes[i]['geometry']['type']+"</a><br>";
    }
}
function cubeMenu(){
    hideAll();
    document.getElementById("sideBarBoxEdit").style.display="inherit";
}
function setSelectedShape(num){
    selectedShape = num;
    document.getElementById('boxSelected').innerHTML="#"+(selectedShape+1);
    hideAll();
    document.getElementById("sideBarBoxEdit").style.display="inherit";
    var color = "#";
    color += rgbToHex(shapes[selectedShape].material.color['r']*255)
    color += rgbToHex(shapes[selectedShape].material.color['g']*255)
    color += rgbToHex(shapes[selectedShape].material.color['b']*255)
    document.getElementById('colorChanger').value = color;
    document.getElementById('parameterBoxX').value = shapes[selectedShape].scale.x;
    document.getElementById('parameterBoxY').value = shapes[selectedShape].scale.y;
    document.getElementById('parameterBoxZ').value = shapes[selectedShape].scale.z;
    document.getElementById('positionBoxX').value = shapes[selectedShape].position.x;
    document.getElementById('positionBoxY').value = shapes[selectedShape].position.y;
    document.getElementById('positionBoxZ').value = shapes[selectedShape].position.z;
}

function cameraMenu(){
    hideAll();
    document.getElementById('sideBarCamera').style.display="inherit";
}

function meshMenu(){
    hideAll()
    document.getElementById("meshMenu").style.display="inherit";

}

function hideAll(){
    document.getElementById("sideBarList").style.display="none";
    document.getElementById("sideBarBoxEdit").style.display="none";
    document.getElementById("sideBarCamera").style.display="none";
    document.getElementById("sideBarCylinder").style.display="none";
    document.getElementById("colorMenu").style.display="none";
    document.getElementById("meshMenu").style.display="none";

}
function cylinderMenu(){
    hideAll();
    document.getElementById("sideBarCylinder").style.display="inherit";
}
function colorMenu(){
    hideAll();
    document.getElementById("colorMenu").style.display="inherit";
}