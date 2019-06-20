class SaveEngine {
    localStore = new localStore();
    cloudStorage = new CloudStorage();
    localStorageEnable = false;

    cloudStorageEnable = false;

    localNewSave = false;

    firstRun = false;

    legacySupport = false;

    localFileName = "";
    localFileID = "init";//will be unique to each save
    localFileIndex = 0;

    localStorageUpdateList=[[], []];
    cloudStorageUpdateList=[[], []];


    //List of local names
    localSaveIdList = [];
    localSaveFriendlyNamesList = [];

    //cloud lists
    cloudSaveIdList = [];
    cloudSaveFriendlyNamesList = [];

    //These are either about to be saved or about to be loaded.
    stagedLights = [];
    stagedShapes = [];
    stagedKeyframes = [];
    stagedScales = [];
    stagedBorders = [];
    stagedDefaultTargets = [];
    //This is for the new engine
    stagedScene = [];


    stagedSettings = [];


    constructor(localEnable, cloudEnable){
        this.localStorageEnable = localEnable;
        this.cloudStorageEnable = cloudEnable;
        this.loadSettings();
        if(this.firstRun){
            this._generateSessionId();
            this.localStore.saveToStorage(settings.sessionId, this.localSaveIdList);
            this.localStore.saveToStorage("settings", this.stagedSettings);
        }
        this.loadSaveList();

        if(this.localStorageEnable)
            getId("settings_localStorage").style.display = "inherit";
        if(this.cloudStorageEnable)
            getId("settings_cloudStorage").style.display="inherit";
    }
    //Generators
    _generateFileId(){
        this.localFileID = Base64.encode((this.localFileName + "-" + settings.saveNumber));
    }

    _generateSessionId(){
        settings.sessionId = Base64.encode((navigator.appCodeName + navigator.appName + navigator.platform));
    }

    //Loaders
    loadSettings(){
        if(this.localStore.exists("settings")){
            this.stagedSettings = this.localStore.getFromStorage("settings");
        }
        else {
            this.firstRun = true;
            settings.setToDefault();
            this.stagedSettings = settings;
        }
        settings.updateSettings(this.stagedSettings);
    }




    loadSaveList(){
        var elementRemoved;
        if(this.localStore.exists(settings.sessionId))
            this.localSaveIdList = this.localStore.getFromStorage(settings.sessionId);
        // else{
        //     this.localSaveIdList = this.localStore.getFromStorage("fileNames");//This is for legacy support
        //     this.legacySupport = true;
        // }
        //Verifying the IDs exist and if they don't remove them
        for(let i =0; i < this.localSaveIdList.length; i++){
            elementRemoved = false;
            if(!this.localStore.exists(this.localSaveIdList[i])){
                this.localSaveIdList.splice(i, 1);
                i--;//Make sure that everything will get tested.
                elementRemoved = true;
            }
            if(!elementRemoved) {
                if (!this.legacySupport)
                    this.localSaveFriendlyNamesList.push(this.localStore.getFromStorage(this.localSaveIdList[i]));
                // else
                //     this.localSaveFriendlyNamesList.push(this.localSaveIdList[i]);
            }
        }
        // if(this.legacySupport)
        //     this.localStore.saveToStorage("fileNames", this.localSaveIdList);
        // else
            this.localStore.saveToStorage(settings.sessionId, this.localSaveIdList);


        // if(this.cloudStorageEnable && saveEngine.cloudStorage.userSignedIn){
        //     this.cloudStorage.getUserData();
        //     this.cloudSaveIdList = this.cloudStorage.downloadedFileIDs;
        //     // this.cloudSaveFriendlyNamesList = this.cloudStorage.
        // }
    }

    loadLocalSave(fileID){
        if(this.localStorageEnable && this.localStore.exists(fileID)){
            // console.log("Load Started");
            this.localFileID = fileID;
            this.localFileName = this.localStore.getFromStorage(fileID);
            // console.log(this.localFileID);

            //Finds the index for the the file ID so that we can
            //set the ID later
            for(let i = 0; i < this.localSaveIdList.length; i++)
                if(this.localSaveIdList[i] === this.localFileID)
                    this.localFileIndex = i;
            //
            // if(this.localStore.getFromStorage(fileID) === "Legacy Mode Save")
            //     this.legacySupport = true;
            //
            // if(this.legacySupport) {
            //     this.localFileName = fileID;
            //     this.stagedScales = this.localStore.getFromStorage(this.getKeyName("scales"));
            //     this.stagedLights =  this.localStore.getFromStorage(this.getKeyName("lights"));
            //     this.stagedShapes =  this.localStore.getFromStorage(this.getKeyName("shapes"));
            //     this.stagedScene = new THREE.Scene();
            // }


            // else{
                this.stagedScene = this.localStore.getFromStorage(this.getKeyName("scene"));
                this.stagedScene = conversion.convertJSONToScene(this.stagedScene);
                let brokenOutScene = conversion.breakoutScene(this.stagedScene);
                // console.log(this.stagedScene);
                this.stagedShapes = brokenOutScene[0];
                this.stagedScales = brokenOutScene[1];
                this.stagedBorders = brokenOutScene[2];
                this.stagedLights = brokenOutScene[3];
                this.stagedDefaultTargets = brokenOutScene[5];
            this.stagedScene = brokenOutScene[4];
                if(!this.stagedScene.background)
                    this.stagedScene.background  = new THREE.Color("#000000");
            // }

            this.stagedKeyframes =  this.localStore.getFromStorage(this.getKeyName("keyframes"));

            keyFrames = this.stagedKeyframes;
            shapes = this.stagedShapes;
            scales = this.stagedScales;
            lights = this.stagedLights;
            borders = this.stagedBorders;
            defaultTargets = this.stagedDefaultTargets;
            updateTimeline();
            return this.stagedScene;


        }

    }

    downloadCloudSave(idToDownload){
        if(this.cloudStorageEnable && saveEngine.cloudStorage.userSignedIn){
//             watch(saveEngine.cloudStorage.downloadData, function(prop, action, newvalue, oldvalue){
// alert("HOE");
//                 saveEngine.stagedScene = newvalue.scene;
//                 saveEngine.stagedKeyframes = newvalue.keyframes;
//                 saveEngine.localFileName = newvalue.name;
//                 saveEngine.localFileID = idToDownload;
//                 saveEngine.localStore.saveToStorage(saveEngine.localFileID, saveEngine.localFileName);
//                 saveEngine.localStore.saveToStorage(saveEngine.getKeyName("scene"), saveEngine.stagedScene);
//                 saveEngine.localStore.saveToStorage(saveEngine.getKeyName("keyframes"), saveEngine.stagedKeyframes);
//                 let exists = false;
//                 for(let i = 0; i < saveEngine.localSaveIdList.length; i++){
//                     if(saveEngine.localSaveIdList[i]===idToDownload)
//                         exists = true;
//                 }
//                 if(!exists) {
//                     saveEngine.addNewSave(saveEngine.localFileID);
//                 }
//
//                 keyFrames = saveEngine.stagedKeyframes;
//                 shapes = saveEngine.stagedShapes;
//                 scales = saveEngine.stagedScales;
//                 lights = saveEngine.stagedLights;
//                 borders = saveEngine.stagedBorders;
//                 updateTimeline();
//                 scene = saveEngine.stagedScene;
//
//                 unwatch(saveEngine.cloudStorage.downloadData, this);
//             });
            this.cloudStorage.downloadSave(idToDownload);


        }

    }


    createNewLocalSave(newFileName){
        if (this.localStorageEnable && this.localNewSave) {
            this.localFileName = newFileName;
            // if(this.legacySupport){
            //     this.localFileID = newFileName;
            //     this.localStore.saveToStorage(this.localFileID, "Legacy Mode Save");
            //     this.localStore.saveToStorage(this.getKeyName("lights"), this.stagedLights);
            //     this.localStore.saveToStorage(this.getKeyName("shapes"), this.stagedShapes);
            //     this.localStore.saveToStorage(this.getKeyName("scales"), this.stagedScales);
            // }
            // else {
                this._generateFileId();
                this.localStore.saveToStorage(this.localFileID, this.localFileName);
                this.incrementSaveNumber();
                this.stagedScene = new THREE.Scene();
                this.stagedScene.background = new THREE.Color("#000000");
                this.localStore.saveToStorage(this.getKeyName("scene"), this.stagedScene);
            // }

            this.localStore.saveToStorage(this.getKeyName("keyframes"), this.stagedKeyframes);



            this.addNewSave(this.localFileID);

            this.localNewSave = false;

            for(let i = 0; i < this.localStorageUpdateList[0].length; i++)
                this.setLocalStorageSelectorElement(this.localStorageUpdateList[0][i], this.localStorageUpdateList[1][i], false);

            if(saveEngine.cloudStorage.userSignedIn) {
                for (let i = 0; i < this.cloudStorageUpdateList[0].length; i++)
                    this.setCloudStorageSelectorElement(this.cloudStorageUpdateList[0][i], this.cloudSaveFriendlyNamesList[1][i], false);
            }

            return this.loadLocalSave(this.localFileID);
        }

    }


    //Savers
    save(localStorage, cloudStorage){
        this.stagedSettings = settings;
        this.stagedScene = scene;
        this.stagedKeyframes = keyFrames;

        if(localStorage && this.localStorageEnable){
            // if(settings !== this.stagedSettings){
                this.localStore.saveToStorage("settings", this.stagedSettings)
            // }
            // if(this.legacySupport) {
            //             //     if (shapes !== this.stagedShapes) {
            //             //         let combinedArrays = [];
            //             //         this.stagedShapes = shapes;
            //             //         this.stagedBorders = borders;
            //             //         this.stagedScales = scales;
            //             //         combinedArrays.push(this.stagedShapes);
            //             //         combinedArrays.push(this.stagedBorders);
            //             //         this.localStore.saveToStorage(this.getKeyName("shapes"), conversion.toSavableArr(combinedArrays, "shapes"));
            //             //
            //             //         this.localStore.saveToStorage(this.getKeyName("scales"), this.stagedScales);
            //             //
            //             //     }
            //             //     if (lights !== this.stagedLights) {
            //             //         this.stagedLights = lights;
            //             //         this.localStore.saveToStorage(this.getKeyName("lights"), conversion.toSavableArr(this.stagedLights, "lights"));
            //             //     }
            //             // }
            // else {
                //there is no point in that if statement as something is always changed in the scene
                this.localStore.saveToStorage(this.getKeyName("scene"), this.stagedScene);
            // }

            //if (keyFrames !== this.stagedKeyframes){
            // if(true){//TEMP
                this.localStore.saveToStorage(this.getKeyName("keyframes"), this.stagedKeyframes);
            // }
        }
        if(cloudStorage && this.cloudStorageEnable && saveEngine.cloudStorage.userSignedIn){
            this.cloudStorage.saveToCloud(this.localFileName, this.localFileID, this.stagedKeyframes, this.stagedScene, this.stagedSettings);
        }
    }




    //Deleters
    deleteLocalSave(idToDelete){
        if(this.localStorageEnable) {
            let oldID = this.localFileID;
            this.localFileID = idToDelete;
            let indexToDelete = this.localSaveIdList.findIndex(saves => saves === idToDelete);
            this.localSaveIdList.splice(indexToDelete, 1);
            this.localSaveFriendlyNamesList.splice(indexToDelete, 1);
            this.localStore.saveToStorage(settings.sessionId, this.localSaveIdList);
            // if (this.legacySupport) {
            //     this.localStore.deleteFromStorage(this.getKeyName("shapes"));
            //     this.localStore.deleteFromStorage(this.getKeyName("scales"));
            //     this.localStore.deleteFromStorage(this.getKeyName("lights"));
            // } else

                this.localStore.deleteFromStorage(this.getKeyName(scene));
            this.localStore.deleteFromStorage(this.getKeyName(keyFrames));

            if (oldID === idToDelete) {
                location.reload();
                return;
            }
            this.localFileID = oldID;
            for(let i = 0; i < this.localStorageUpdateList[0].length; i++)
                this.setLocalStorageSelectorElement(this.localStorageUpdateList[0][i], this.localStorageUpdateList[1][i], false);

            if(saveEngine.cloudStorage.userSignedIn) {
                for (let i = 0; i < this.cloudStorageUpdateList[0].length; i++)
                    this.setCloudStorageSelectorElement(this.cloudStorageUpdateList[0][i], this.cloudSaveFriendlyNamesList[1][i], false);
            }
        }
    }

    deleteCloudSave(idToDelete){
        if(this.cloudStorageEnable){
            this.cloudStorage.deleteCloudSave(idToDelete);
        }
    }


    //getters

    // get localFileName(){
    //     return this.localFileName;
    // }



    //setters
    set localStorageEnable(value){
        this.localStorageEnable = value;
        if(!this.localStorageEnable)
            getId("settings_localStorage").style.display = "none";

        else
            getId("settings_localStorage").style.display = "inherit";

    }

    set cloudStorageEnable(value){
        this.cloudStorageEnable = value;
        if(!this.cloudStorageEnable)
            getId("settings_cloudStorage").style.display="none";
        else
            getId("settings_cloudStorage").style.display="inherit";
    }

    setLocalStorageSelectorElement(domSelectElement, defaultValue, updateNeeded){
        let saveId;
        let saveFriendlyName;
        let selectorElement =  document.getElementById(domSelectElement);
        selectorElement.innerHTML = "";
        if(defaultValue !== "none"){
            selectorElement.innerHTML += " <option> " + defaultValue + "</option>";
        }
        for (var i = 0; i < this.localSaveIdList.length; i++) {
            saveId = this.localSaveIdList[i];
            saveFriendlyName = this.localSaveFriendlyNamesList[i];
            selectorElement.innerHTML += " <option value=" + saveId + "> " + saveFriendlyName + "</option>";
        }
        if(updateNeeded){
            this.localStorageUpdateList[0].push(domSelectElement);
            this.localStorageUpdateList[1].push(defaultValue);
        }
    }

    setCloudStorageSelectorElement(domSelectElement, defaultValue, updateNeeded){
        if(this.cloudStorageEnable) {
            let saveId;
            let saveFriendlyName;
            let selectorElement = document.getElementById(domSelectElement);
            selectorElement.innerHTML = "";
            if (defaultValue !== "none") {
                selectorElement.innerHTML += " <option> " + defaultValue + "</option>";
            }
            if(saveEngine.cloudStorage.userSignedIn) {
                for (var i = 0; i < this.cloudSaveIdList.length; i++) {
                    saveId = this.cloudSaveIdList[i];
                    saveFriendlyName = this.cloudSaveFriendlyNamesList[i];
                    selectorElement.innerHTML += " <option value=" + saveId + "> " + saveFriendlyName + "</option>";
                }
            }
            if (updateNeeded) {
                this.cloudStorageUpdateList[0].push(domSelectElement);
                this.cloudStorageUpdateList[1].push(defaultValue);
            }
        }
    }

    forceLoadSelectUpdate(){
        for(let i = 0; i < this.localStorageUpdateList[0].length; i++)
            this.setLocalStorageSelectorElement(this.localStorageUpdateList[0][i], this.localStorageUpdateList[1][i], false);
        if(saveEngine.cloudStorage.userSignedIn) {
            for (let i = 0; i < this.cloudStorageUpdateList[0].length; i++)
                this.setCloudStorageSelectorElement(this.cloudStorageUpdateList[0][i], this.cloudSaveFriendlyNamesList[1][i], false);
        }
    }









    //Export/Import Functions







    //Helper functions
    getKeyName(key){
        // if(!this.legacySupport){
            if(this.localFileID === "init")
                this._generateFileId();
            key +=":" + this.localFileID;
            return key;
        // }

        // return key + ":" +this.localFileName;//for legacy support

    }

    addNewSave(saveId){
        this.localSaveIdList.push(saveId);
        // if(this.legacySupport) {
        //     this.localSaveFriendlyNamesList.push(saveId);
        //     this.localStore.saveToStorage("fileNames", this.localSaveIdList);
        //
        // }
        // else {
            this.localSaveFriendlyNamesList.push(this.localStore.getFromStorage(saveId));
            this.localStore.saveToStorage(settings.sessionId, this.localSaveIdList);
        // }
    }


    incrementSaveNumber(){
        var workingSaveNumber = parseInt(settings.saveNumber);
        workingSaveNumber++;
        //for some reason the switch statement didn't work.
        if(workingSaveNumber >= 1000)
            settings.saveNumber = workingSaveNumber.toString();
        else if(workingSaveNumber >=100)
            settings.saveNumber = "0" + workingSaveNumber.toString();
        else if(workingSaveNumber >=10)
            settings.saveNumber = "00" + workingSaveNumber.toString();
        else if(workingSaveNumber >=1)
            settings.saveNumber = "000" +workingSaveNumber.toString();
        this.localStore.saveToStorage("settings", settings);

    }


    //true: we are connected
    //false: we are disconnected
    static connectionStateChanged(connected){

    }

}