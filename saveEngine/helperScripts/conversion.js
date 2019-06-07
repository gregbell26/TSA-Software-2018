class conversion {


    static isShape(tst){
        try {
            if (tst.geometry.type === "BoxGeometry"
                || tst.geometry.type === "ConeGeometry"
                || tst.geometry.type === "CylinderGeometry"
                || tst.geometry.type === "Geometry"//this is for OBJs
                || tst.geometry.type === "DodecahedronGeometry"
                || tst.geometry.type === "IcosahedronGeometry"
                || tst.geometry.type === "OctahedronGeometry"
                || tst.geometry.type === "TetrahedronGeometry"
                || tst.geometry.type === "SphereGeometry"
                || tst.geometry.type === "TorusGeometry"
                || tst.geometry.type === "TextGeometry"
            )
                return true;
            return false;
        } catch (TypeError) {
            return false;
            //Because apparently if (tst === undefined) doesn't work
        }

    }

    static isLight(tst){
        try {
            if(tst.type === "PointLight"
                || tst.type === "AmbientLight"
                || tst.type === "DirectionalLight"
                || tst.type === "SpotLight"
                || tst.type === "HemisphereLight")
                return true;
            return false;
        }catch (TypeError) {
            return false
        }


    }

    static isBoarder(tst){
        try{
            if(tst.type === "LineSegments")
                return true;
            return false;
        }catch (TypeError) {
            return false;
        }



    }

    static convertJSONToScene(JSONString){
        if(JSONString.object.type !== "Scene")
            return;
        let JSONLoader = new THREE.ObjectLoader();
        // JSONLoader.load(
        //     JSONString,
        //     function (obj) {
        //         return obj;
        //     },
        //     function (progress){
        //         console.log(progress.loaded / progress.total * 100 + "% loaded");
        //     },
        //     function (error) {
        //         console.error("Load Failed due to ");
        //         console.error(error);
        //     }
        // );

        JSONLoader.parse(
            JSONString,
            function (parsedJSON) {
                return parsedJSON;
            },

            );

    }

    static toRenderableArr(stagedArray, arrayType, creationFunct){


    }


    static breakoutScene(stagedScene){
        let extractedArray = [[],[],[], [], Object];
        if(stagedScene.children !== undefined) {
            for (let i = 0; i < stagedScene.children.length; i++) {
                console.log(i);
                if (this.isShape(stagedScene.children[i])) {
                    // Object.defineProperty(stagedScene.children[i], 'scale', {
                    //     value: extractedArray[1][i],
                    // });
                    //stagedScene.children[i].scale = extractedArray[1][i];
                    extractedArray[0].push(stagedScene.children[i]);
                    extractedArray[1].push([stagedScene.children[i].scale.x, stagedScene.children[i].scale.y, stagedScene.children[i].scale.z]);

                } else if (this.isBoarder(stagedScene.children[i])) {
                    // Object.defineProperty(stagedScene.children[i], 'scale', {
                    //     value: [stagedScene.children[i].scale.x, stagedScene.children[i].scale.y, stagedScene.children[i].scale.z]
                    // });
                    //stagedScene.children[i].scale = [stagedScene.children[i].x, stagedScene.children[i].y, stagedScene.children[i].z];
                    extractedArray[2].push(stagedScene.children[i]);
                }
                else if (this.isLight(stagedScene.children[i]))//this might break things as im assuming that only lights are the extra element so we are pushing this to lights
                    extractedArray[3].push(stagedScene.children[i]);

            }
        }
        extractedArray[4] = stagedScene;
        console.log(extractedArray);
        return extractedArray;

    }

    static toSavableArr(stagedArray, arrayType){
        let savableArray =[];

        if(arrayType ==="lights"){
            for(let i = 0; i < stagedArray.length; i++){
                savableArray.push({
                    type: stagedArray[i].type,
                    positionX: stagedArray[i].position.x,
                    positionY: stagedArray[i].position.y,
                    positionZ: stagedArray[i].position.z,
                    r: stagedArray[i].color.r,
                    g: stagedArray[i].color.g,
                    b: stagedArray[i].color.b,
                    intensity: stagedArray[i].intensity,
                });
                if(stagedArray[i].name === "Hemisphere light"){
                    savableArray[i] += {
                        r2: stagedArray[i].groundColor.r,
                        g2: stagedArray[i].groundColor.g,
                        b2: stagedArray[i].groundColor.b,
                    };

                }

            }

        }

        else if (arrayType === "shapes"){
            for(let i =0; i < stagedArray[0].length; i++){
                savableArray.push({
                    type: stagedArray[0][i].geometry.type,
                    positionX: stagedArray[0][i].position.x,
                    positionY: stagedArray[0][i].position.y,
                    positionZ: stagedArray[0][i].position.z,
                    r: stagedArray[0][i].material.color.r,
                    g: stagedArray[0][i].material.color.g,
                    b: stagedArray[0][i].material.color.b,
                    borders: stagedArray[1][i].visible,
                    borderR: stagedArray[1][i].material.color.r,
                    borderG: stagedArray[1][i].material.color.g,
                    borderB: stagedArray[1][i].material.color.b,
                });

            }

        }
        else{
            savableArray = stagedArray;
        }
        console.log(savableArray);//DEBUG
        return savableArray;

    }


}