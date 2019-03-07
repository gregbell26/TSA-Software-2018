/**
 * @type {{isUsingSaves: boolean, currentVer: number, fileName: string, startSaveSubSystem: saveSubSystem.startSaveSubSystem, function: *}}
 */

$(document).on('change', function (e) {
    //Saves the file any time something is changed.
    if (saveSubSystem.isUsingSaves){
        saveSubSystem.save();
    }
});


var saveSubSystem = {
    isUsingSaves : false,
    openPrevious : false,
    currentVer : 0,
    fileName : "",
    saveFileNamesList : [],

    loadedKeyframes : [],
    loadedShapes : [],
    loadedScales : [],


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
        //saves the current file.
        if (this.isUsingSaves) {
            this.currentVer++;
            localStorage.setItem(this.fileName, this.currentVer);
            localStorage.setItem('keyFrames:' + this.fileName, JSON.stringify(keyFrames));
            localStorage.setItem('shapes:' + this.fileName, JSON.stringify(this.convertShapeObjs()));
            localStorage.setItem('scales:' + this.fileName, JSON.stringify(scales));
            console.log("Save of " + this.fileName + " complete.")
        }

    },

    addText: function(){
        //used to track a TextGeometry so that the text can be rebuilt when the application is reloaded.
        var value = document.getElementById("createText").value;
        var currentText = localStorage.getItem("text:"+this.fileName);
        if(currentText==null){
          localStorage.setItem("text:"+this.fileName,JSON.stringify([value]));
        }
        else{
          var parsed = JSON.parse(currentText);
          parsed.push(value);
          localStorage.setItem("text:"+this.fileName,JSON.stringify(parsed));
        }
    },

    removeText: function(text){
        //called whenever a text object is removed from the scene.
        var parsed = JSON.parse(localStorage.getItem("text:"+this.fileName));
        var index = parsed.indexOf(text);
        if(index>=0){
            parsed.splice(index,1);
            localStorage.setItem("text:"+this.fileName,JSON.stringify(parsed));
        }
    },


    loadSave: function () {
        //loads the save with the file name.
        if(localStorage.getItem(this.fileName) !== null){
            this.currentVer = localStorage.getItem(this.fileName);
            this.loadedKeyframes = JSON.parse(localStorage.getItem("keyFrames:"+this.fileName));
            this.loadedScales = JSON.parse(localStorage.getItem("scales:"+this.fileName));
            this.loadedShapes = JSON.parse(localStorage.getItem("shapes:"+this.fileName));
            processShapeData(this.loadedShapes, this.loadedScales, JSON.parse(localStorage.getItem("text:"+this.fileName)));
        }
        else{
            console.log("Save not found.");
            return;
        }
        return this.loadedKeyframes;

    },

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
                borderR: borders[i].material.color.r,
                borderG: borders[i].material.color.g,
                borderB: borders[i].material.color.b,
            })
        }
        return arr;
    },

    loadSaveNames : function () {
        //gets a list of all available saves.
        if(localStorage.getItem("fileNames") !== null) {
            this.saveFileNamesList = JSON.parse(localStorage.getItem("fileNames"));
        }
    }


};