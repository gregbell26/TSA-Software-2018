/*function save(){

    console.log('saved')
}*/

/**
 * Wow
 * This is a special form of torture
 * Java script objects are a thing from hell
 * @type {{isUsingSaves: boolean, currentVer: number, fileName: string, startSaveSubSystem: saveSubSystem.startSaveSubSystem, function: *}}
 */

var saveSubSystem =
{
    isUsingSaves : false,
    currentVer : 0,
    fileName : "",


    startSaveSubSystem :function (isUsingSaves, loadPreviousSave, saveToLoad) {
        if (isUsingSaves) {
            this.currentVer++;
            console.log("Starting save subsystem....");
            if (!loadPreviousSave) {
                console.log("Creating new save....");
                localStorage.setItem(this.fileName, "1");
            }


        }

    },


    save: function() {

        this.currentVer++;
        localStorage.setItem(this.fileName, this.currentVer);
        //make better
        localStorage.setItem('keyFrames' + this.fileName,JSON.stringify(keyFrames));
        localStorage.setItem('shapes' + this.fileName,JSON.stringify(this.convertShapeObjs()));
        localStorage.setItem('scales' + this.fileName ,JSON.stringify(scales));
        localStorage.setItem("EOF SAVE: " + this.fileName);
        console.log("Save of " + this.fileName + " complete.")
        //???
        //profit

    },


    loadSave: function (saveToLoad) {
        //check name with local save
        //if not then print error
        //if so then load save

    },

//Todo Redo this function
    convertShapeObjs : function () {
        var arr = [];
        for (var i = 0; i < shapes.length; i++) {
            arr.push({
                type: shapes[i].geometry.type,
                positionX: shapes[i].position.x,
                positionY: shapes[i].position.y,
                positionZ: shapes[i].position.z,
                r: shapes[i].material.color.r,
                g: shapes[i].material.color.g,
                b: shapes[i].material.color.b,
            })
        }
        return arr;
    },

    saveSet : function(name) {

    },

    loadSet: function (name) {

    }
};


//LOL
//I value my sanity
//Im not touching this shit

//everything below here is for Firebase.
    function cloudSave() {
        var obj = {};
        obj.keyFrames = keyFrames;
        obj.shapes = convertShapeObjs();
        obj.scales = scales;
        console.log(obj);
        firebase.database().ref(uid).set(obj);
    }

    function cloudGet() {
        firebase.database().ref(uid).once("value", function (data) {
            var obj = data.val();
            keyFrames = obj.keyFrames;
            scales = obj.scales;
            shapes = [];
            var shapeData = obj.shapes;
            console.log(shapeData);
            selectedShape = 0;
            for (var i = 0; i < shapeData.length; i++) {
                var type = shapeData[i].type;
                if (type == "BoxGeometry") {
                    var newGeometry = new THREE.BoxGeometry(1, 1, 1);
                    var newMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
                    shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);
                    newGeometry.name = "cube";
                    loadCloudShape(shapeData);
                }
                else if (type == "CylinderGeometry") {
                    var newGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 100);
                    var newMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
                    shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);
                    newGeometry.name = "cylinder";
                    loadCloudShape(shapeData);
                }
            }
        })
    }

    function loadCloudShape(shapeData) {
        scene.add(shapes[shapes.length - 1]);
        shapes[selectedShape].position.x = shapeData[i].positionX;
        shapes[selectedShape].position.y = shapeData[i].positionY;
        shapes[selectedShape].position.z = shapeData[i].positionZ;
        shapes[selectedShape].material.color.r = shapeData[i].r;
        shapes[selectedShape].material.color.g = shapeData[i].g;
        shapes[selectedShape].material.color.b = shapeData[i].b;
        selectedShape++;
    }
