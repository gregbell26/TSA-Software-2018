/**
 * This is the save system..
 * It used to be pretty
 * Then new features got added
 *
 * TODO Clean this mess up
 */

$(document).on('change', function (e) {
    //Saves the file any time something is changed.
    if (saveSubSystem.isUsingSaves){
        saveSubSystem.save();
    }
});


let saveSubSystem = {
    isUsingSaves : false,
    openPrevious : false,
    currentVer : 0,
    fileName : "",
    saveFileNamesList : [],

    loadedSettings: Object,
    loadedKeyframes : [],
    loadedShapes : [],
    loadedScales : [],
    loadedLights: [],


    setFileName : function(fileName, newFile) {
        console.log("Replacing active file name");
        console.log("Old Name: " + this.fileName);
        console.log("New Name: " + fileName);
        this.fileName = fileName;
        if (newFile) {
            this.saveFileNamesList.push(this.fileName);
            localStorage.setItem("fileNames", JSON.stringify(this.saveFileNamesList));
            console.log("Saved new file. FILE DATA IS NOT SAVED");
        }

    },

    setIsUsingSaves: function(usingSaves, loading){
        console.log("New status " + usingSaves);
        this.isUsingSaves = usingSaves;
        console.log("New loading status: " + loading);
        this.openPrevious = loading;
    },


    save: function() {
        this.saveSettings();
        //saves the current file.
        if (this.isUsingSaves) {
            this.currentVer++;
            localStorage.setItem(this.fileName, this.currentVer);
            localStorage.setItem('keyFrames:' + this.fileName, JSON.stringify(keyFrames));
            localStorage.setItem('shapes:' + this.fileName, JSON.stringify(this.convertShapeObjs()));
            localStorage.setItem('lights:' + this.fileName, JSON.stringify(this.convertLightObjs()));
            localStorage.setItem('scales:' + this.fileName, JSON.stringify(scales));
            console.log("Save of " + this.fileName + " complete.")
        }

    },

    saveSettings: function(){
        localStorage.setItem("settings", JSON.stringify(settings))
    },

    addText: function(value){
        //used to track a TextGeometry so that the text can be rebuilt when the application is reloaded.
        let currentText = localStorage.getItem("text:"+this.fileName);
        if(currentText==null){
          localStorage.setItem("text:"+this.fileName,JSON.stringify([value]));
        }
        else{
          let parsed = JSON.parse(currentText);
          parsed.push(value);
          localStorage.setItem("text:"+this.fileName,JSON.stringify(parsed));
        }
    },

    removeText: function(text){
        //called whenever a text object is removed from the scene.
        let parsed = JSON.parse(localStorage.getItem("text:"+this.fileName));
        let index = parsed.indexOf(text);
        if(index>=0){
            parsed.splice(index,1);
            localStorage.setItem("text:"+this.fileName,JSON.stringify(parsed));
        }
    },

    loadSettings: function(){
        if (localStorage.getItem("settings") === null){
            settings.updateSettings("resetAll");
        }
        else {
            this.loadedSettings = JSON.parse(localStorage.getItem("settings"));
            settings.updateSettings(this.loadedSettings);
        }
        this.saveSettings();
    },


    loadSave: function () {
        //loads the save with the file name.
        if(localStorage.getItem(this.fileName) !== null){
            this.currentVer = localStorage.getItem(this.fileName);
            this.loadedKeyframes = JSON.parse(localStorage.getItem("keyFrames:"+this.fileName));
            this.loadedScales = JSON.parse(localStorage.getItem("scales:"+this.fileName));
            this.loadedShapes = JSON.parse(localStorage.getItem("shapes:"+this.fileName));
            this.loadedLights = JSON.parse(localStorage.getItem("lights:"+this.fileName));
            processShapeData(this.loadedShapes, this.loadedScales, JSON.parse(localStorage.getItem("text:"+this.fileName)));
            this.loadLights();
            moveCamera("x",10);
            moveCamera("y",10);
            moveCamera("z",10);
            getId("camera_x").value = 10;
            getId("camera_y").value = 10;
            getId("camera_z").value = 10;
            if(settings.mouseSensitivity==null){
                settings.mouseSensitivity = 1;
            }
            if(settings.zoomAmount==null){
                settings.zoomAmount = 1.5;
            }
        }
        else{
            console.log("Save not found.");
            return;
        }
        return this.loadedKeyframes;

    },

    loadLights: function(){
        if(this.loadedLights==null){
            return;
        }
        for(var i=0; i<this.loadedLights.length; i++){
            var type;
            switch(this.loadedLights[i].type){
              case "PointLight":
                  type = 'point';
                  break;
              case "AmbientLight":
                  type = 'ambient';
                  break;
              case "DirectionalLight":
                  type = 'directional';
                  break;
              case "SpotLight":
                  type = 'spot';
                  break;
              case "HemisphereLight":
                  type = 'hemisphere';
                  break;
              default:
                  type = 'ambient';
                  break;
            }
            if (type === "hemisphere"){
                newLight(type,convertColor(this.loadedLights[i].r,this.loadedLights[i].g,this.loadedLights[i].b),this.loadedLights[i].intensity*100,this.loadedLights[i].positionX,this.loadedLights[i].positionY,this.loadedLights[i].positionZ,convertColor(this.loadedLights[i].r2,this.loadedLights[i].g2,this.loadedLights[i].b2));
            }else{
                newLight(type,convertColor(this.loadedLights[i].r,this.loadedLights[i].g,this.loadedLights[i].b),this.loadedLights[i].intensity*100,this.loadedLights[i].positionX,this.loadedLights[i].positionY,this.loadedLights[i].positionZ);
            }
        }
    },

    //this code contains bugs. Runtime. My favorite.
    deleteSave: function(saveToDelete) {
        if (localStorage.getItem(saveToDelete) !== null) {
            this.saveFileNamesList.splice(this.saveFileNamesList.indexOf(saveToDelete),1);
            localStorage.setItem("fileNames", JSON.stringify(this.saveFileNamesList));
            localStorage.removeItem(saveToDelete);
            //At this point the save is no longer accessible but it is still taking up space
            localStorage.removeItem("keyFrames:" + saveToDelete);
            localStorage.removeItem("scales:" + saveToDelete);
            localStorage.removeItem("shapes:" + saveToDelete);

            //the save should now be deleted
            if (saveToDelete === this.fileName)
                location.reload(true);//Get a new page from the sever other wise chrome chache will make git commit die
        }
        else {
            this.saveFileNamesList.pop(saveToDelete)//Removes old save from file name list
            localStorage.setItem("fileNames", JSON.stringify(this.saveFileNamesList));//saves that.
        }

    },

    convertShapeObjs : function () {
        //converts the Three.js shapes into a savable array of JSONs.
        let arr = [];
        for (let i = 0; i < shapes.length; i++) {
            arr.push({
                type: shapes[i].geometry.type,
                positionX: shapes[i].position.x,
                positionY: shapes[i].position.y,
                positionZ: shapes[i].position.z,
                r: shapes[i].material.color.r,
                g: shapes[i].material.color.g,
                b: shapes[i].material.color.b,
                borders: borders[i].visible,
                borderR: borders[i].material.color.r,
                borderG: borders[i].material.color.g,
                borderB: borders[i].material.color.b,
            })
        }
        return arr;
    },

    convertLightObjs : function () {
        //converts the Three.js lights into a savable array of JSONs.
        let arr = [];
        for (let i = 0; i < lights.length; i++) {
            if (lights[i].name === "Hemisphere light"){
                arr.push({
                    type: lights[i].type,
                    positionX: lights[i].position.x,
                    positionY: lights[i].position.y,
                    positionZ: lights[i].position.z,
                    r: lights[i].color.r,
                    g: lights[i].color.g,
                    b: lights[i].color.b,
                    r2: lights[i].groundColor.r,
                    g2: lights[i].groundColor.g,
                    b2: lights[i].groundColor.b,
                    intensity: lights[i].intensity,
                })
            } else {
                arr.push({
                    type: lights[i].type,
                    positionX: lights[i].position.x,
                    positionY: lights[i].position.y,
                    positionZ: lights[i].position.z,
                    r: lights[i].color.r,
                    g: lights[i].color.g,
                    b: lights[i].color.b,
                    intensity: lights[i].intensity,
                })
            }
        }
        return arr;
    },

    loadSaveNames : function (htmlOptionElement) {
        //gets a list of all available saves.
        if(localStorage.getItem("fileNames") === null)
            return;
        this.saveFileNamesList = JSON.parse(localStorage.getItem("fileNames"));
        var loadSelector = document.getElementById(htmlOptionElement);
        var opt;
        for (var i = 0; i < this.saveFileNamesList.length; i++) {
            opt = this.saveFileNamesList[i];
            loadSelector.innerHTML += " <option> " + opt + "</option>";
        }


    },

    generateFileForCurrentSave : function (){
        let textVal;
        if(localStorage.getItem("text:"+this.fileName)!=null){
            textVal = JSON.parse(localStorage.getItem("text:"+this.fileName));
        }
        let json = {
            edits: parseInt(localStorage.getItem(this.fileName)),
            keyFrames: keyFrames,
            scales: scales,
            shapes: this.convertShapeObjs(),
            text: textVal,
        };
        return this.createBlobText(JSON.stringify(json));
    },

    createBlobText : function (text) {
            let data = new Blob([text], {type: 'text/plain'});
            return data;
    },

    saveFromCloud : function(result,name){
        localStorage.setItem(name, result.edits);
        localStorage.setItem('keyFrames:' + name, JSON.stringify(result.keyFrames));
        localStorage.setItem('shapes:' + name, JSON.stringify(result.shapes));
        localStorage.setItem('scales:' + name, JSON.stringify(result.scales));
        console.log("Save of " + name + " complete.");
        let list = JSON.parse(localStorage.getItem("fileNames"));
        list.push(name);
        localStorage.setItem("fileNames",JSON.stringify(list));
        if(name===this.fileName){
            location.reload();
        }
    },





};