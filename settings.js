/*
This file is replacing the incredibly segmented settings. This is gonna be similar to the Deimsions.js file
    as that file does what is supposed to without any fuss
This file will also contain global config data

Author Jordan M. Gregory B.
Edited 4/12/18

 */

var settings = {

    version: "1.3.0 rev 0b",

    camera : {
        mouseSensitivity: 0,
        zoomAmount: 0


    },

    userInterface: {
        stylesheetPref: "",
        usingCustomStyle: false,
        customJSPath: "",
        customCSSPath: "",




    },


    setToDefault: function(){
        this.camera.mouseSensitivity = 1;
        this.camera.zoomAmount = 1.5;

        this.userInterface.stylesheetPref = "darkMode";


    },

    updateSettings: function (loadedSettings) {
        if(loadedSettings === "resetAll") {
            this.setToDefault();
            return;
        }

        this.camera.mouseSensitivity = loadedSettings.camera.mouseSensitivity;
        this.camera.zoomAmount = loadedSettings.camera.zoomAmount;

        this.userInterface.stylesheetPref = loadedSettings.userInterface.stylesheetPref;
        if(loadedSettings.userInterface.usingCustomStyle){
            this.userInterface.customJSPath = loadedSettings.userInterface.customJSPath;
            this.userInterface.customCSSPath = loadedSettings.userInterface.customCSSPath;
            //Preform checks if that CSS and JS actually exist
            //if yes then
            //this.userInterface.usingCustomStyle = true;
            //else
            //this.userInterface.usingCustomStyle = false;
            //use default instead
            console.log("ERROR: Custom style failed to load. Defaulting to dark mode.");
            this.userInterface.stylesheetPref = "darkMode";
        }



    }



};