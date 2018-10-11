//Materials
import * as THREE from "./three";

var basicMesh = new THREE.MeshBasicMaterial();
var depthMesh = new THREE.MeshDepthMaterial();
var rainbowMesh = new THREE.MeshNormalMaterial();

function mesh(meshType) {
    switch (meshType) {
        case "basic":
            shapes[selectedShape]=basicMesh;
            break;
        case "depth":
            shapes[selectedShape]=depthMesh;
            break;
        case "rainbow":
            shapes[selectedShape]=rainbowMesh;
            break;



    }

    console.log("Updated Mesh");

}