let createVertices = [];
let createFaces = [];
function newCustom(x, y, z, posX, posY, posZ, newColor, borderColor, vertices, faces){
    // GEOMETRY
    let newGeometry = new THREE.Geometry(1, 1, 1);

    if (vertices.length !== 0){
        for (let i = 0; i < vertices.length; i++){
            createVertices.push(vertices[i])
        }
    }

    if (faces.length !== 0){
        for (let i = 0; i < vertices.length; i++) {
            createFaces.push(faces[i]);
        }
    }

    for (let i = 0; i < createVertices.length; i++){
        newGeometry.vertices.push(createVertices[i]);
    }

    for (let i = 0; i < createFaces.length; i++){
        newGeometry.faces.push(createFaces[i]);
    }

    //Borders
    let geometry = new THREE.BufferGeometry().fromGeometry(newGeometry);
    let borderToAdd = new THREE.LineSegments( geometry, new THREE.LineBasicMaterial( { color: borderColor } ) );
    borderToAdd.scale.x = x;
    borderToAdd.scale.y = y;
    borderToAdd.scale.z = z;
    borders.push(borderToAdd);
    scene.add( borderToAdd );

    // MESH with GEOMETRY, and Normal MATERIAL
    let newMaterial = new THREE.MeshLambertMaterial({color: newColor});
    newMaterial.lights = true;
    shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);
    let length = scales.length;
    newGeometry.name = "custom";
    scales[length]=[];
    scales[length][0]=x;
    scales[length][1]=y;
    scales[length][2]=z;
    scene.add(shapes[shapes.length-1]);
    selectedShape = shapes.length-1;

    setSelectedShape(selectedShape);
    moveShape("x", posX);
    moveShape('y', posY);
    moveShape('z', posZ);

    document.getElementById('dimensionX').value = x;
    document.getElementById('dimensionY').value = y;
    document.getElementById('dimensionZ').value = z;

    document.getElementById('positionBoxX').value = posX;
    document.getElementById('positionBoxY').value = posY;
    document.getElementById('positionBoxZ').value = posZ;

    createVertices.length = 0;
    createFaces.length = 0;
    loadCreateFaceList();
    loadCreateVectorList();
}

function createVertex(){
    createVertices.push(
        new THREE.Vector3(0, 0, 0),
    );
    console.log('vector added');
    console.log(createVertices);
    loadCreateVectorList();
}

function cancelVector(vector){
    createVertices.splice(vector,1);
    loadCreateVectorList()
}

function loadCreateVectorList(){
    document.getElementById('createVectorList').innerHTML = "";

    for(let i = 0; i < createVertices.length; i++){
        let add = "";
        document.getElementById('createVectorList').innerHTML+=`<input id="xCreateCoord" type="number" value="`+createVertices[i].x+`" onkeyup="createVertices[`+i+`].setX(this.value)" onchange="createVertices[`+i+`].setX(this.value)">X
        <input id="yCreateCoord" type="number" value="`+createVertices[i].y+`" onkeyup="createVertices[`+i+`].setY(this.value)" onchange="createVertices[`+i+`].setY(this.value)">Y
        <input id="zCreateCoord" type="number" value="`+createVertices[i].z+`" onkeyup="createVertices[`+i+`].setZ(this.value)" onchange="createVertices[`+i+`].setZ(this.value)">Z
        <button class='material-icons' onclick='cancelVector(`+i+`)'>close</button>
        `+add+`
        <br>`;
    }

    console.log('vector list loaded')
}


function cancelCustom(){
    createVertices.length = 0;
    createFaces.length = 0;
    document.getElementById('createVectorList').innerHTML = "";
    document.getElementById('createFaceList').innerHTML = "";
    shapeMenu();
}


//Create Faces
function createFace(){
    createFaces.push(
        new THREE.Face3(0, 1, 2),
    );
    console.log('face added');
    console.log(createFaces);
    loadCreateFaceList();
}

function cancelFace(face){
    createFaces.splice(face, 1);
    loadCreateFaceList()
}

function loadCreateFaceList(){
    document.getElementById('createFaceList').innerHTML = "";
    for(let i = 0; i < createFaces.length; i++){
        let add = ""
        document.getElementById('createFaceList').innerHTML+=`<input id="xCreatePoint" type="number" value="`+createFaces[i].a+`" onkeyup="createFaces[`+i+`].copy(new THREE.Face3(this.value, createFaces[`+i+`].b, createFaces[`+i+`].c))" onchange="createFaces[`+i+`].copy(new THREE.Face3(this.value, createFaces[`+i+`].b, createFaces[`+i+`].c))">A
        <input id="yCreatePoint" type="number" value="`+createFaces[i].b+`" onkeyup="createFaces[`+i+`].copy(new THREE.Face3(createFaces[`+i+`].a, this.value, createFaces[`+i+`].c))" onchange="createFaces[`+i+`].copy(new THREE.Face3(createFaces[`+i+`].a, this.value, createFaces[`+i+`].c))">B
        <input id="zCreatePoint" type="number" value="`+createFaces[i].c+`" onkeyup="createFaces[`+i+`].copy(new THREE.Face3(createFaces[`+i+`].a, createFaces[`+i+`].b, this.value))" onchange="createFaces[`+i+`].copy(new THREE.Face3(createFaces[`+i+`].a, createFaces[`+i+`].b, this.value))">C
        <button class='material-icons' onclick='cancelFace(`+i+`)'>close</button>
        `+add+`
        <br>`;
    }
    console.log('face list loaded')
}
