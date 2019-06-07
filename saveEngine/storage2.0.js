class saveEngine {
    localStorageEnable;

    cloudStorageEnable;

    localNewSave;

    firstRun = false;

    legacySupport = false;

    localFileName = "";
    localFileID = "init";//will be unique to each save

    //List of local names
    localSaveIdList = [];
    localSaveFriendlyNamesList = [];


    //These are either about to be saved or about to be loaded.
    stagedLights = [];
    stagedShapes = [];
    stagedKeyframes = [];
    stagedScales = [];
    stagedBorders = [];
    //This is for the new engine
    stagedScene = [];


    stagedSettings;


    constructor(localEnable, cloudEnable){
        this.localStorageEnable = localEnable;
        this.cloudStorageEnable = cloudEnable;
        this.loadSettings();
        if(this.firstRun){
            this._generateSessionId();
            localStore.saveToStorage(settings.sessionId, this.localSaveIdList);
            localStore.saveToStorage("settings", this.stagedSettings);
        }
        this.loadSaveList();
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
        if(localStore.exists("settings")){
            this.stagedSettings = localStore.getFromStorage("settings");
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
        if(localStore.exists(settings.sessionId))
            this.localSaveIdList = localStore.getFromStorage(settings.sessionId);
        else{
            this.localSaveIdList = localStore.getFromStorage("fileNames");//This is for legacy support
            this.legacySupport = true;
        }
        //Verifying the IDs exist and if they don't remove them
        for(let i =0; i < this.localSaveIdList.length; i++){
            elementRemoved = false;
            if(!localStore.exists(this.localSaveIdList[i])){
                this.localSaveIdList.splice(i, 1);
                i--;//Make sure that everything will get tested.
                elementRemoved = true;
            }
            if(!elementRemoved) {
                if (!this.legacySupport)
                    this.localSaveFriendlyNamesList.push(localStore.getFromStorage(this.localSaveIdList[i]));
                else
                    this.localSaveFriendlyNamesList.push(this.localSaveIdList[i]);
            }
        }
        if(this.legacySupport)
            localStore.saveToStorage("fileNames", this.localSaveIdList);
        else
            localStore.saveToStorage(settings.sessionId, this.localSaveIdList);
    }

    loadLocalSave(fileID){
        if(this.localStorageEnable && localStore.exists(fileID)){
            console.log("Load Started");
            this.localFileID = fileID;
            this.localFileName = localStore.getFromStorage(fileID);
            if(localStore.getFromStorage(fileID) === "Legacy Mode Save")
                this.legacySupport = true;

            if(this.legacySupport)
                this.localFileName = fileID;

            if(this.legacySupport) {
                this.stagedScales = localStore.getFromStorage(this.getKeyName("scales"));
                this.stagedLights =  localStore.getFromStorage(this.getKeyName("lights"));
                this.stagedShapes =  localStore.getFromStorage(this.getKeyName("shapes"));
                this.stagedScene = new THREE.Scene();
            }
            else{
                this.stagedScene = localStore.loadScene(this.getKeyName("scene"));
                let brokenOutScene = conversion.breakoutScene(this.stagedScene);
                // console.log(this.stagedScene);
                this.stagedShapes = brokenOutScene[0];
                this.stagedScales = brokenOutScene[1];
                this.stagedBorders = brokenOutScene[2];
                this.stagedLights = brokenOutScene[3];
            }
            this.stagedKeyframes =  localStore.getFromStorage(this.getKeyName("keyframes"));

            keyFrames = this.stagedKeyframes;
            shapes = this.stagedShapes;
            scales = this.stagedScales;
            lights = this.stagedLights;
            borders = this.stagedBorders;
            return this.stagedScene;


        }

    }


    createNewLocalSave(newFileName){
        if (this.localStorageEnable && this.localNewSave) {
            this.localFileName = newFileName;
            if(this.legacySupport){
                this.localFileID = newFileName;
                localStore.saveToStorage(this.localFileID, "Legacy Mode Save");
                localStore.saveToStorage(this.getKeyName("lights"), this.stagedLights);
                localStore.saveToStorage(this.getKeyName("shapes"), this.stagedShapes);
                localStore.saveToStorage(this.getKeyName("scales"), this.stagedScales);
            }
            else {
                this._generateFileId();
                localStore.saveToStorage(this.localFileID, this.localFileName);
                this.constructor.incrementSaveNumber();
                this.stagedScene = new THREE.Scene();
                localStore.saveToStorage(this.getKeyName("scene"), this.stagedScene)
            }

            localStore.saveToStorage(this.getKeyName("keyframes"), this.stagedKeyframes);




            this.addNewSave(this.localFileID);
            this.localNewSave = false;
            return this.loadLocalSave(this.localFileID);
        }

    }


    //Savers
    save(localStorage, cloudStorage){
        if(localStorage && this.localStorageEnable){
            if(settings !== this.stagedSettings){
                this.stagedSettings = settings;
                localStore.saveToStorage("settings", this.stagedSettings)
            }
            if(this.legacySupport) {
                if (shapes !== this.stagedShapes) {
                    let combinedArrays = [];
                    this.stagedShapes = shapes;
                    this.stagedBorders = borders;
                    this.stagedScales = scales;
                    combinedArrays.push(this.stagedShapes);
                    combinedArrays.push(this.stagedBorders);
                    localStore.saveToStorage(this.getKeyName("shapes"), conversion.toSavableArr(combinedArrays, "shapes"));

                    localStore.saveToStorage(this.getKeyName("scales"), this.stagedScales);

                }
                if (lights !== this.stagedLights) {
                    this.stagedLights = lights;
                    localStore.saveToStorage(this.getKeyName("lights"), conversion.toSavableArr(this.stagedLights, "lights"));
                }
            }
            else {
                //there is no point in that if statement as something is always changed in the scene
                this.stagedScene = scene;
                localStore.saveToStorage(this.getKeyName("scene"), this.stagedScene);
            }

            if (keyFrames !== this.stagedKeyframes){
                this.stagedSettings = keyFrames;
                localStore.saveToStorage(this.getKeyName("keyFrames"), this.stagedKeyframes);
            }
        }
        if(cloudStorage && this.cloudStorageEnable){

        }
    }




    //Deleters





    //setters
    set localStorageEnable(value){
        this.localStorageEnable = value;
    }

    set cloudStorageEnable(value){
        this.cloudStorageEnable =value;
    }






    //Export/Import Functions







    //Helper functions
    getKeyName(key){
        if(!this.legacySupport){
            if(this.localFileID === "init")
                this._generateFileId();
            key +=":" + this.localFileID;
            return key;
        }

        return key + ":" +this.localFileName;//for legacy support

    }

    addNewSave(saveId){
        this.localSaveIdList.push(saveId);
        if(this.legacySupport) {
            this.localSaveFriendlyNamesList.push(saveId);
            localStore.saveToStorage("fileNames", this.localSaveIdList);

        }
        else {
            this.localSaveFriendlyNamesList.push(localStore.getFromStorage(saveId));
            localStore.saveToStorage(settings.sessionId, this.localSaveIdList);
        }
    }


    static incrementSaveNumber(){
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
        localStore.saveToStorage("settings", settings);

    }

}