
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

    loadLocalSave(fileID, hotLoad){
        if(this.localStorageEnable && localStore.exists(fileID)){
            this.localFileID = fileID;
            this.localFileName = localStore.getFromStorage(fileID);
            if(this.legacySupport){
                this.localFileName = fileID;
            }
            this.stagedLights =  localStore.getFromStorage(this.getKeyName("lights"));
            this.stagedShapes =  localStore.getFromStorage(this.getKeyName("shapes"));
            this.stagedKeyframes =  localStore.getFromStorage(this.getKeyName("keyframes"));
            this.stagedScales =  localStore.getFromStorage(this.getKeyName("scales"));


            //Todo corruption detection


            lights =this.stagedShapes;
            shapes =this.stagedShapes;
            keyFrames = this.stagedKeyframes;
            scales = this.stagedScales;
        }

    }


    createNewLocalSave(newFileName, hotLoad){
        if (this.localStorageEnable && this.localNewSave) {
            this.localFileName = newFileName;
            if(this.legacySupport){
                this.localFileID = newFileName;
                localStore.saveToStorage(this.localFileID, "Legacy Mode Save");
            }
            else {
                this._generateFileId();
                localStore.saveToStorage(this.localFileID, this.localFileName);
                this.constructor.incrementSaveNumber();
            }

            localStore.saveToStorage(this.getKeyName("lights"), this.stagedLights);
            localStore.saveToStorage(this.getKeyName("shapes"), this.stagedShapes);
            localStore.saveToStorage(this.getKeyName("keyframes"), this.stagedKeyframes);
            localStore.saveToStorage(this.getKeyName("scales"), this.stagedScales);

            this.addNewSave(this.localFileID);
            this.localNewSave = false;
            this.loadLocalSave(this.localFileID, hotLoad);
        }

    }

    _hotLoad(){
        //Clear renderer of all elements
        //push keyframes and scales
        //run create light routines

        lights =this.stagedShapes;
        shapes =this.stagedShapes;
        keyFrames = this.stagedKeyframes;
        scales = this.stagedScales;

        //settings.updateSettings(this.stagedSettings);

    }

    //Savers
    save(localStorage, cloudStorage){
        if(localStorage && this.localStorageEnable){
            if(settings !== this.stagedSettings){
                this.stagedSettings = settings;
                localStore.saveToStorage("settings", this.stagedSettings)
            }
            if (keyFrames !== this.stagedKeyframes){
                this.stagedSettings = keyFrames;
                localStorage.saveToStorage(this.getKeyName("keyFrames"), this.stagedSettings);
            }
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