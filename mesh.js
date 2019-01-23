/*//Materials

var basicMesh = new THREE.MeshBasicMaterial();
var depthMesh = new THREE.MeshDepthMaterial();
var rainbowMesh = new THREE.MeshNormalMaterial();

function mesh(meshType) {
    var curColor = shapes[selectedShape].material.color;
    switch (meshType) {
        case "basic":
            shapes[selectedShape].material=basicMesh;
            shapes[selectedShape].material.color = curColor;
            break;
        case "depth":
            //depthMesh.wireframe = true;
            shapes[selectedShape].material=depthMesh;
            shapes[selectedShape].material.color = curColor;
            break;
        case "rainbow":
            //rainbowMesh.wireframe = true;
            shapes[selectedShape].material=rainbowMesh;
            shapes[selectedShape].material.color = curColor;
            break;



    }

    console.log("Updated Mesh");

}

*/