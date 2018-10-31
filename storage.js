function save(){
    localStorage.setItem('keyFrames',JSON.stringify(keyFrames));
    localStorage.setItem('shapes',JSON.stringify(convertShapeObjs()));
    localStorage.setItem('scales',JSON.stringify(scales));
    console.log('saved')
}
function convertShapeObjs(){
    var arr= [];
    for (var i=0; i<shapes.length; i++){
        arr.push({
            type: shapes[i].geometry.type,
            positionX:shapes[i].position.x,
            positionY:shapes[i].position.y,
            positionZ:shapes[i].position.z,
            r: shapes[i].material.color.r,
            g: shapes[i].material.color.g,
            b: shapes[i].material.color.b,
        })
    }
    return arr;
}

function saveSet(name){

}

function loadSet(name){

}

function cloudSave(){
    
}