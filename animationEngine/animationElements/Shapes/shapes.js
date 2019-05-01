
//corbin wrote this method, simplified by Jordan

function moveShape(dimension, value) {
    shapes[selectedShape].position[dimension] = Number(value);
    borders[selectedShape].position[dimension] = Number(value);
}

function postitionShape(dimension, value) {
    shapes[selectedShape].position[dimension] = Number(value);
    borders[selectedShape].position[dimension] = Number(value);
}

function rotateShape(dimension, value) {
    shapes[selectedShape].rotation[dimension] = Number(value)*Math.PI/180;
    borders[selectedShape].rotation[dimension] = Number(value)*Math.PI/180;
}
var hasMovedZ = false;
function resizeShape(dimension, value){
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
            // if(usingTutorial && !hasMovedZ){
            //     hasMovedZ = true;
            //     document.getElementById("tutorialArrow").style.display="inherit";
            //     animateArrow(95, 15, 120, 240);
            // }
            break;
    }
}

function removeShape(){
    if(selectedShape >= 0){
        if(shapes[selectedShape].geometry.type=="TextGeometry"){
            saveSubSystem.removeText(shapes[selectedShape].geometry.parameters.text);
        }
        scene.remove(shapes[selectedShape]);
        scene.remove(borders[selectedShape]);
        shapes.splice(selectedShape,1);
        scales.splice(selectedShape,1);
        borders.splice(selectedShape,1);
        selectedShape--;
        setSelectedShape(selectedShape);
        saveSubSystem.save();
    }
}

function borderChange(value){
    borders[selectedShape].material.color.set(value);

}

function toggleColorBorder(checked){//if checked is true turns on the border, if not then turns it off
    if(checked){
        document.getElementById('createColorBorder').style.display = 'inherit'
    }
    else{
        document.getElementById('createColorBorder').style.display = 'none'
    }

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

function convertColor(r,g,b){
    r*=255;
    g*=255;
    b*=255;
    var returnieBoi = "#";
    var a = r.toString(16);
    if(a.length==1){
        a = "0" + a;
    }
    returnieBoi +=a;
    a = g.toString(16);
    if(a.length==1){
        a = "0" + a;
    }
    returnieBoi +=a;
    a = b.toString(16);
    if(a.length==1){
        a = "0" + a;
    }
    returnieBoi +=a;

    return returnieBoi;

}

function processShapeData(loadedShapes,loadedScales, loadedText) {
    var shapeData =[[],[]];
    //var shapeData = [3, loadedShapes.length];
    var newGeometry;
    var borderGeometry;
    var currentTextIndex = 0;
    var geometryToAdd;
    var borderToAdd;
    var edgyBoi;
    //Creating the table of data.

    //const newMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});

    if(loadedShapes.length !== loadedScales.length){
        console.log("Invalid data loaded.");
        shapeData[0][0] =1;
        return shapeData;
    }

    for(var i=0; i<loadedShapes.length; i++) {
        //console.log(i);
        newGeometry = null;
        borderGeometry = null;

            if (loadedShapes[i].type === "BoxGeometry") {
                newCube(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }
            else if (loadedShapes[i].type === "CylinderGeometry") {
                newCylinder(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }
            else if (loadedShapes[i].type === "ConeGeometry") {
                newCone(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }
            else if (loadedShapes[i].type === "CustomGeometry2") {
            /*newGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 100);
              borderGeometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 100);
              newGeometry.name = "cylinder"*/
            newCustom2()
            }
            else if (loadedShapes[i].type === "DodecahedronGeometry") {
                newDodecahedron(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }
            else if (loadedShapes[i].type === "IcosahedronGeometry") {
                newIcosahedron(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }
            else if (loadedShapes[i].type === "OctahedronGeometry") {
                newOctahedron(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }
            else if (loadedShapes[i].type === "TetrahedronGeometry") {
                newPyramid(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }
            else if (loadedShapes[i].type === "TorusGeometry") {
                newRing(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }
            else if (loadedShapes[i].type === "SphereGeometry") {
                newSphere(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }
            else if (loadedShapes[i].type === "TextGeometry") {
                document.getElementById('createText').value = loadedText[currentTextIndex];
                currentTextIndex++;
                newText(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))

            }/*else if (loadedShapes[i].geometry.name === "custom") {
                 document.getElementById('xCreateCoord').value = loadedText[currentTextIndex];
                 document.getElementById('yCreateCoord').value = loadedText[currentTextIndex];
                 document.getElementById('zCreateCoord').value = loadedText[currentTextIndex];

                 document.getElementById('xCreatePoint').value = loadedText[currentTextIndex];
                 document.getElementById('yCreatePoint').value = loadedText[currentTextIndex];
                 document.getElementById('zCreatePoint').value = loadedText[currentTextIndex];

                 newCustom(loadedScales[i][0], loadedScales[i][1], loadedScales[i][2], loadedShapes[i].positionX, loadedShapes[i].positionY, loadedShapes[i].positionZ, convertColor(loadedShapes[i].r, loadedShapes[i].g, loadedShapes[i].b) , convertColor(loadedShapes[i].borderR || 0, loadedShapes[i].borderG || 0, loadedShapes[i].borderB || 0))
            }*/
            else {
                console.log("Invalid shape at location: " + i);
            }
            /*geometryToAdd = new THREE.Mesh(newGeometry, newMaterial);
            edgyBoi = new THREE.EdgesGeometry(borderGeometry);
            borderToAdd  = new THREE.LineSegments(edgyBoi, new THREE.LineBasicMaterial({color: 0xff0000}));
            shapeData[0][i] = geometryToAdd;
            shapeData[1][i] = borderToAdd;*/
            //if(loadedShapes.length !== 1)
                //shapeData[2][i] = loadedScales[i];

        }
        //console.log(loadedScales);
        //if (loadedShapes.length === 1)
            //shapeData[2][0] = loadedShapes;
        //return shapeData;


}

function duplicateCurrentShape(){
    let shape = shapes[selectedShape];
    saveSubSystem.save();
    switch(shape.geometry.name){
        case "cube" :
            console.log("Start duplication");
            newCube(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            break;
        case "cylinder" :
            newCylinder(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            break;
        case "cone" :
            newCone(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            break;
        case "dodecahedron" :
            newDodecahedron(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            break;
        case "icosahedron" :
            newIcosahedron(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            break;
        case "octahedron" :
            newOctahedron(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            break;
        case "pyramid" :
            newPyramid(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            break;
        case "ring" :
            newRing(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            break;
        case "sphere" :
            newSphere(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            break;
        case "custom":
            newCustom(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString(), shape.geometry.vertices, shape.geometry.faces);
            break;
        case "text" :
            document.getElementById('createText').value = shape.geometry.parameters.text;
            saveSubSystem.addText();
            newText(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            saveSubSystem.save();
            break;
    }
}

function newShape(type,x,y,z,posX,posY,posZ,color,border){
    if(type!="custom" && type!="text"){
        var newGeometry, geometry;
        switch(type){
            case "cube":
                newGeometry = new THREE.BoxGeometry(1, 1, 1);
                geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
                break;
            case "cone":
                newGeometry = new THREE.ConeGeometry( 0.5, 1, 100);
                geometry = new THREE.ConeBufferGeometry( 0.5, 1, 100);
                break;
            case "cylinder":
                newGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 100);
                geometry = new THREE.CylinderBufferGeometry( 0.5, 0.5, 1, 100);
                break;
            case "dodecahedron":
                newGeometry = new THREE.DodecahedronGeometry( 0.5, 0);
                geometry = new THREE.DodecahedronBufferGeometry( 0.5,0);
                break;
            case "icosahedron":
                newGeometry = new THREE.IcosahedronGeometry( 0.5, 0);
                geometry = new THREE.IcosahedronBufferGeometry( 0.5,0);
                break;
            case "octahedron":
                newGeometry = new THREE.OctahedronGeometry( 0.5, 0);
                geometry = new THREE.OctahedronBufferGeometry( 0.5,0);
                break;
            case "pyramid":
                newGeometry = new THREE.TetrahedronGeometry( 0.5, 0);
                geometry = new THREE.TetrahedronBufferGeometry( 0.5,0);
                break;
            case "ring":
                newGeometry = new THREE.TorusGeometry( 0.5, 0.25, 200, 200);
                geometry = new THREE.TorusBufferGeometry( 0.5, 0.25, 200, 200);
                break;
            case "sphere":
                newGeometry = new THREE.SphereGeometry(0.5, 100, 100);
                geometry = new THREE.SphereBufferGeometry(0.5, 100, 100);
                break;
            default:
                newGeometry = new THREE.BoxGeometry(1, 1, 1);
                geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
                break;
        }
        var newMaterial = new THREE.MeshLambertMaterial({color: color});
        newMaterial.lights = true;
        shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
        var length = scales.length;
        newGeometry.name = "cube";
        scales[length]=[];
        scales[length][0]=x;
        scales[length][1]=y;
        scales[length][2]=z;
        scene.add(shapes[shapes.length-1]);
        selectedShape = shapes.length-1;

        //Borders
        var edges = new THREE.EdgesGeometry( geometry );
        var borderToAdd = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: border } ) );
        borderToAdd.scale.x = x;
        borderToAdd.scale.y = y;
        borderToAdd.scale.z = z;
        //scales borders along with shape
        borders.push(borderToAdd);
        scene.add( borderToAdd );
        //adds borders to scene

        setSelectedShape(selectedShape);
        moveShape("x", posX);
        moveShape("y", posY);
        moveShape("z", posZ);

        document.getElementById('diemsions_x').value = x;
        document.getElementById('diemsions_y').value = y;
        document.getElementById('diemsions_z').value = z;

        document.getElementById('position_x').value = posX;
        document.getElementById('position_y').value = posY;
        document.getElementById('position_z').value = posZ;
    }
}

function getId(str){
    return document.getElementById(str);
}