setSelectedShape(1)

function showList(){
    var sideBar=document.getElementById('sideBarList');
    document.getElementById("sideBarBoxEdit").style.display="none";
    document.getElementById("sideBarList").style.display="inherit";
    sideBar.innerHTML="";
    for (var i=0; i<shapes.length; i++){
        //console.log("Shape "+(i+1)+": "+shapes[i]['geometry']['type']);
        sideBar.innerHTML+="<a onclick='setSelectedShape("+i+")'>"+(i+1)+": "+shapes[i]['geometry']['type']+"</a><br>";
    }
}
function cubeMenu(){
    document.getElementById("sideBarBoxEdit").style.display="inherit";
    document.getElementById("sideBarList").style.display="none";
}
function setSelectedShape(num){
    selectedShape = num;
    document.getElementById('boxSelected').innerHTML="#"+(selectedShape+1);
    document.getElementById("sideBarBoxEdit").style.display="inherit";
    document.getElementById("sideBarList").style.display="none";
    var color = "#";
    color += rgbToHex(shapes[selectedShape].material.color['r']*255)
    color += rgbToHex(shapes[selectedShape].material.color['g']*255)
    color += rgbToHex(shapes[selectedShape].material.color['b']*255)
    document.getElementById('colorChanger').value = color;
    document.getElementById('parameterBoxX').value = shapes[selectedShape].scale.x;
    document.getElementById('parameterBoxY').value = shapes[selectedShape].scale.y;
    document.getElementById('parameterBoxZ').value = shapes[selectedShape].scale.z;
}

