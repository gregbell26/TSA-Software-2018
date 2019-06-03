class conversion {

    static toRenderableArr(stagedArray, arrayType, creationFunct){


    }

    static toOneDArr(stagedArray, arrayType){
        let oneDArray = [];
        if (arrayType === "scales"){
            for(let i =0; i < stagedArray.length; i++){
                oneDArray.push({
                    x: stagedArray[i][0],
                    y: stagedArray[i][1],
                    z: stagedArray[i][2],
                });
            }
        }
        return oneDArray;
    }

    static breakoutShapes(stagedShapes, arrayToExtract){
        let extractedArray = [];
        let currentShape = [];
        if(arrayToExtract === "scales"){
            for(let i =0; i < stagedShapes.length; i++){
                currentShape.push(stagedShapes[i].scaleX);
                currentShape.push(stagedShapes[i].scaleY);
                currentShape.push(stagedShapes[i].scaleZ);
                extractedArray.push(currentShape);
                currentShape.length = 0;
            }
        }
        if(arrayToExtract === "borders"){
            for(let i = 0; i <stagedShapes.length; i++){
                extractedArray.push({
                    visible: stagedShapes[i].borders,
                    material: {
                        color: {
                            r: stagedShapes[i].borderR,
                            g: stagedShapes[i].borderG,
                            b: stagedShapes[i].borderB,

                        },
                    },
                });
            }
        }
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
                    scaleX: stagedArray[1][i].x,
                    scaleY: stagedArray[1][i].y,
                    scaleZ: stagedArray[1][i].z,
                    borders: stagedArray[2][i].visible,
                    borderR: stagedArray[2][i].material.color.r,
                    borderG: stagedArray[2][i].material.color.g,
                    borderB: stagedArray[2][i].material.color.b,
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