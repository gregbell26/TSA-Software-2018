
//corbin wrote this method, simplified by Jordan

function moveElement(dimension, value) {
    if(showingLight){
        lights[selectedLight].position[dimension] = Number(value);
    }
    else{
        shapes[selectedShape].position[dimension] = Number(value);
        borders[selectedShape].position[dimension] = Number(value);
    }
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
function removeElement(){
    if(showingLight){removeLight();}
    else{removeShape();}
}
function removeShape(){
    if(selectedShape >= 0){
        //
        // For keyFrames2.0
        scene.remove(shapes[selectedShape]);
        scene.remove(borders[selectedShape]);
        shapes.splice(selectedShape,1);
        scales.splice(selectedShape,1);
        borders.splice(selectedShape,1);
        selectedShape = -1;
        //it's so you can't press remove again, feel free to remove to improve
        setSelectedShape(selectedShape);

        for(var i = 0; i < keyFrames.length; i++){
            keyFrames[i].shapes.splice(selectedShape,1);
            keyFrames[i].scales.splice(selectedShape,1);
        }
        saveEngine.save(true,false);

    }
}

function toggleVisibility() {
    let buttonText = getId("element_visibility").children[0];
    let visible;
    if (showingLight) {
        visible = lights[selectedLight].visible;
        if (visible){
            lights[selectedLight].visible = false;
            buttonText.innerHTML = "Show Element"
        }else {
            lights[selectedLight].visible = true;
            buttonText.innerHTML = "Hide Element"
        }
    } else {
        visible = shapes[selectedShape].visible;
        if (visible){
            shapes[selectedShape].visible = false;
            buttonText.innerHTML = "Show Element"
        }else {
            shapes[selectedShape].visible = true;
            buttonText.innerHTML = "Hide Element"
        }
    }
}

function borderChange(value){
    if(showingLight){
        changeGroundLightColor(value);
    }
    else{
        borders[selectedShape].material.color.set(value);
    }
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


function duplicateCurrentShape(){
    let shape = shapes[selectedShape];
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
            // saveSubSystem.addText();
            newText(scales[selectedShape][0], scales[selectedShape][1], scales[selectedShape][2], shape.position.x,
                shape.position.y, shape.position.z, "#" + shape.material.color.getHexString(),
                "#" + borders[selectedShape].material.color.getHexString());
            saveEngine.save(true,false);
            break;
    }
    saveEngine.save(true,false);
}

function newShape(type,x,y,z,posX,posY,posZ,color,border,text){
    if(type!=="custom" && type!=="text" && type!=="textIn"){
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
                showPopUp("popUp_error_body", "Error", "Invalid Shape",-1);

                break;
        }

        type = type.charAt(0).toUpperCase() + type.substring(1, type.length);
        var newMaterial = new THREE.MeshLambertMaterial({color: color});
        newMaterial.lights = true;
        shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
        var length = scales.length;
        newGeometry.name = type;
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
        moveElement("x", posX);
        moveElement("y", posY);
        moveElement("z", posZ);

        document.getElementById('diemsions_x').value = x;
        document.getElementById('diemsions_y').value = y;
        document.getElementById('diemsions_z').value = z;

        document.getElementById('position_x').value = posX;
        document.getElementById('position_y').value = posY;
        document.getElementById('position_z').value = posZ;
        // getId("shapeList_shapes").innerHTML+="<button onclick='setSelectedShape("+selectedShape+");showMenu(\"menu_newShapes\");' style='color:black'>"+type+"</button><br>";
        getId("newShapes_select").selectedIndex = 0;
    }
    else if(type==="TextIn"){
        showPopUp("popUp_input_body", "New Text", "Enter Text",1);
    }
    else if(type==="Text"){
        let loader = new THREE.FontLoader();
        loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
            let newGeometry = new THREE.TextGeometry( text, {
                font: font,
                size: 1,
                height: 0.05,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.5,
                bevelSize: 0.05,
                bevelSegments: 2.5
            } );
            let newMaterial = new THREE.MeshLambertMaterial({color: color});
            newMaterial.lights = true;
            shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
            let length = scales.length;
            newGeometry.name = text;
            scales[length]=[];
            scales[length][0]=x;
            scales[length][1]=y;
            scales[length][2]=z;
            scene.add(shapes[shapes.length-1]);
            selectedShape = shapes.length-1;
            let geometry = new THREE.TextBufferGeometry( text, {
                font: font,
                size: 1,
                height: 0.05,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.5,
                bevelSize: 0.05,
                bevelSegments: 2.5
            } );
            let edges = new THREE.EdgesGeometry( geometry );
            let borderToAdd = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: border } ) );
            borderToAdd.scale.x = x;
            borderToAdd.scale.y = y;
            borderToAdd.scale.z = z;
            borders.push(borderToAdd);
            scene.add(borderToAdd);
            setSelectedShape(selectedShape);
            moveElement("x", posX);
            moveElement("y", posY);
            moveElement("z", posZ);

            document.getElementById('diemsions_x').value = x;
            document.getElementById('diemsions_y').value = y;
            document.getElementById('diemsions_z').value = z;

            document.getElementById('position_x').value = posX;
            document.getElementById('position_y').value = posY;
            document.getElementById('position_z').value = posZ;
            //getId("shapeList_shapes").innerHTML+="<button onclick='setSelectedShape("+selectedShape+");showMenu(\"menu_newShapes\");' style='color:black'>"+type+"</button><br>";
            getId("newShapes_select").selectedIndex = 0;
        } );
    }


    for(var i = 0; i < keyFrames.length; i++){
        keyFrames[i].shapes.push([0,0,0,0,0,0,false]);
        keyFrames[i].scales.push([0,0,0]);
        keyFrames[i].color.push([0,0,0]);
        keyFrames[i].borderColor.push([0,0,0]);
    }
}

function getId(id){
    return document.getElementById(id);
}