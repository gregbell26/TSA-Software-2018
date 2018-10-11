//Materials

var basicMesh = new THREE.MeshBasicMaterial();
var depthMesh = new THREE.MeshDepthMaterial();
var rainbowMesh = new THREE.MeshNormalMaterial();

function mesh(meshType) {
    switch (meshType) {
        case "basic":
            shapes[selectedShape].material=basicMesh;
            break;
        case "depth":
            shapes[selectedShape].material=depthMesh;
            break;
        case "rainbow":
            shapes[selectedShape].material=rainbowMesh;
            break;



    }

    console.log("Updated Mesh");

}