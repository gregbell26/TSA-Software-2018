/*function save(){
    localStorage.setItem('keyFrames',JSON.stringify(keyFrames));
    localStorage.setItem('shapes',JSON.stringify(convertShapeObjs()));
    localStorage.setItem('scales',JSON.stringify(scales));
    console.log('saved')
}*/


function startSaveSubSystem(isUsingSaves){
    //check if we are using saves
    //LAUGHS AT JORDEN

}


function save() {
    //check for changes
    //set new version number
    //Save name as file name
    //save all data
    //print message to console
    //???
    //profit

}


function loadSave(name){
    //check name with local save
    //if not then print error
    //if so then load save

}

//Todo Redo this function
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


//everything below here is for Firebase.
function cloudSave(){
    var obj = {};
    obj.keyFrames = keyFrames;
    obj.shapes = convertShapeObjs();
    obj.scales = scales;
    console.log(obj);
    firebase.database().ref(uid).set(obj);
}

function cloudGet(){
    firebase.database().ref(uid).once("value", function(data){
        var obj = data.val();
        keyFrames = obj.keyFrames;
        scales = obj.scales;
        shapes = [];
        var shapeData = obj.shapes;
        console.log(shapeData);
        selectedShape = 0;
        for(var i=0; i<shapeData.length; i++){
            var type = shapeData[i].type;
            if(type=="BoxGeometry"){
                var newGeometry = new THREE.BoxGeometry(1 , 1, 1);
                var newMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
                shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
                newGeometry.name = "cube";
                loadCloudShape(shapeData);
            }
            else if (type=="CylinderGeometry"){
                var newGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 100);
                var newMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
                shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
                newGeometry.name = "cylinder";
                loadCloudShape(shapeData);
            }
        }
    })
}

function loadCloudShape(shapeData){
    scene.add(shapes[shapes.length-1]);
    shapes[selectedShape].position.x = shapeData[i].positionX;
    shapes[selectedShape].position.y = shapeData[i].positionY;
    shapes[selectedShape].position.z = shapeData[i].positionZ;
    shapes[selectedShape].material.color.r = shapeData[i].r;
    shapes[selectedShape].material.color.g = shapeData[i].g;
    shapes[selectedShape].material.color.b = shapeData[i].b;
    selectedShape++;
}