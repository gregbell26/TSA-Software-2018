-//corbin wrote this method, simplified by Jordan
function moveShape(dimension, value) {
    shapes[selectedShape].position[dimension] = Number(value);
    borders[selectedShape].position[dimension] = Number(value);
}




function rotateShape(dimension, value) {
    shapes[selectedShape].rotation[dimension] = Number(value)*Math.PI/180;
    borders[selectedShape].rotation[dimension] = Number(value)*Math.PI/180;
}

function cubeDimension(dimension, value){
    switch(dimension){
        case "x":
            scales[selectedShape][0]=Number(value);
            borders[selectedShape].scale.x = Number(value);
            break;
        case "y":
            scales[selectedShape][1]=Number(value);
            borders[selectedShape].scale.y = Number(value);
            break;
        case "z":
            scales[selectedShape][2]=Number(value);
            borders[selectedShape].scale.z = Number(value);
            break;
    }
}

function removeShape(){
    if(selectedShape >= 0){
        scene.remove(shapes[selectedShape]);
        scene.remove(borders[selectedShape])
        shapes.splice(selectedShape,1);
        scales.splice(selectedShape,1);
        borders.splice(selectedShape,1);
        selectedShape--;
        setSelectedShape(selectedShape);
    }
}

function borderChange(value){
    borders[selectedShape].material.color.set(value);

}



//Gregory wrote this
//Loaders


//get loaded data from arrays
//make a 2d array with all of the data for the shapes
//use a for loop (WITH OUT VARIABLE DECLERATIONS) to create the shapes in a 3js freindly way
//Cry a little


//Array spot 0,i will be the geomtry for the shape
//array spot 1,i will be the border geomrty for the shape
//Array spot 2,i will be scale data for the shape

function printArray(arr){
    for(var i =0; i <arr.length; i++)
        for(var j=0; j < arr[i].length; j++)
            console.log(arr[i][j]);
}

function processShapeData(loadedShapes,loadedScales) {
    var shapeData =[[],[]];
    //var shapeData = [3, loadedShapes.length];
    var newGeometry;
    var borderGeometry;
    var geometryToAdd;
    var borderToAdd;
    var edgyBoi;
    //Creating the table of data.

    const newMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});

    if(loadedShapes.length !== loadedScales.length){
        console.log("Invalid data loaded.");
        shapeData[0][0] =1;
        return shapeData;
    }

    for(var i=0; i<loadedShapes.length; i++) {
        console.log(i);
        newGeometry = null;
        borderGeometry = null;

            if (loadedShapes[i].type === "BoxGeometry") {
                newGeometry = new THREE.BoxGeometry(1, 1, 1);
                borderGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
                newGeometry.name = "cube"
            }
            else if (loadedShapes[i].type === "CylinderGeometry") {
                newGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 100);
                borderGeometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 100);
                newGeometry.name = "cylinder"
            }
            else if (loadedShapes[i].type === "ConeGeometry") {
                newGeometry = new THREE.ConeGeometry(0.5, 1, 100);
                borderGeometry = new THREE.ConeBufferGeometry(0.5, 1, 100);
                newGeometry.name = "cone"
            }
            else if (loadedShapes[i].type === "DodecahedronGeometry") {
                newGeometry = new THREE.DodecahedronGeometry(0.5, 0);
                borderGeometry = new THREE.DodecahedronBufferGeometry(0.5, 0);
                newGeometry.name = "dodecahedron"
            }
            else if (loadedShapes[i].type === "IcosahedronGeometry") {
                newGeometry = new THREE.IcosahedronGeometry(0.5, 0);
                borderGeometry = new THREE.IcosahedronBufferGeometry(0.5, 0);
                newGeometry.name = "icosahedron"
            }
            else if (loadedShapes[i].type === "OctahedronGeometry") {
                newGeometry = new THREE.OctahedronGeometry(0.5, 0);
                borderGeometry = new THREE.OctahedronBufferGeometry(0.5, 0);
                newGeometry.name = "octahedron"
            }
            else if (loadedShapes[i].type === "TetrahedronGeometry") {
                newGeometry = new THREE.TetrahedronGeometry(0.5, 0);
                borderGeometry = new THREE.TetrahedronBufferGeometry(0.5, 0);
                newGeometry.name = "pyramid"
            }
            else if (loadedShapes[i].type === "TorusGeometry") {
                newGeometry = new THREE.TorusGeometry(0.5, 0.25, 200, 200);
                borderGeometry = new THREE.TorusBufferGeometry(0.5, 0.25, 200, 200);
                newGeometry.name = "ring"
            }
            else if (loadedShapes[i].type === "SphereGeometry") {
                newGeometry = new THREE.SphereGeometry(0.5, 100, 100);
                borderGeometry = new THREE.SphereBufferGeometry(0.5, 100, 100);
                newGeometry.name = "sphere"
            }
            else {
                console.log("Invalid shape at location: " + i);
            }
            geometryToAdd = new THREE.Mesh(newGeometry, newMaterial);
            edgyBoi = new THREE.EdgesGeometry(borderGeometry);
            borderToAdd  = new THREE.LineSegments(edgyBoi, new THREE.LineBasicMaterial({color: 0xffffff}));
            shapeData[0][i] = geometryToAdd;
            shapeData[1][i] = borderToAdd;
            //if(loadedShapes.length !== 1)
                //shapeData[2][i] = loadedScales[i];

        }
        //console.log(loadedScales);
        //if (loadedShapes.length === 1)
            //shapeData[2][0] = loadedShapes;
        return shapeData;


}






