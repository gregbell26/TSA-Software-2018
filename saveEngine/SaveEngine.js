class SaveEngine {

    constructor(localEnable, cloudEnable){
        this._localStorageEnable = localEnable;
        this._cloudStorageEnable = cloudEnable;

        this.localStore = new LocalStore();
        this.cloudStorage = new CloudStorage();


        this.localNewSave = false;

        this.firstRun = false;

        this.legacySupport = false;

        this.localFileName = "";
        this.localFileID = "init";//will be unique to each save
        this.localFileIndex = 0;

        this.localStorageUpdateList=[[], []];
        this.cloudStorageUpdateList=[[], []];


        //List of local names
        this.localSaveIdList = [];
        this.localSaveFriendlyNamesList = [];

        //cloud lists
        this.cloudSaveIdList = [];
        this.cloudSaveFriendlyNamesList = [];

        //These are either about to be saved or about to be loaded.
        this.stagedLights = [];
        this.stagedShapes = [];
        this.stagedKeyframes = [];
        this.stagedScales = [];
        this.stagedBorders = [];
        this.stagedDefaultTargets = [];
        //This is for the new engine
        this.stagedScene = [];


        this.stagedSettings = [];

        this.loadSettings();
        if(this.firstRun){
            this._generateSessionId();
            this.localStore.saveToStorage(settings.sessionId, this.localSaveIdList);
            this.localStore.saveToStorage("settings", this.stagedSettings);
        }
        this.loadSaveList();

        if(this._localStorageEnable)
            getId("settings_localStorage").style.display = "inherit";
        if(this._cloudStorageEnable)
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

            }
        }

        this.localStore.saveToStorage(settings.sessionId, this.localSaveIdList);

    }

    loadLocalSave(fileID){
        if(this._localStorageEnable && this.localStore.exists(fileID)){
            this.localFileID = fileID;
            this.localFileName = this.localStore.getFromStorage(fileID);

            //Finds the index for the the file ID so that we can set the ID later
            for(let i = 0; i < this.localSaveIdList.length; i++)
                if(this.localSaveIdList[i] === this.localFileID)
                    this.localFileIndex = i;

                this.stagedScene = this.localStore.getFromStorage(this.getKeyName("scene"));
                this.stagedScene = conversion.convertJSONToScene(this.stagedScene);
                let brokenOutScene = conversion.breakoutScene(this.stagedScene);
                this.stagedShapes = brokenOutScene[0];
                this.stagedScales = brokenOutScene[1];
                this.stagedBorders = brokenOutScene[2];
                this.stagedLights = brokenOutScene[3];
                this.stagedDefaultTargets = brokenOutScene[5];
            this.stagedScene = brokenOutScene[4];
                if(!this.stagedScene.background)
                    this.stagedScene.background  = new THREE.Color("#000000");

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
        if (idToDownload !== "default") {
            if(this._cloudStorageEnable && saveEngine.cloudStorage.userSignedIn){
                this.cloudStorage.downloadSave(idToDownload);
                getId("signedIn_loadSelector").selectedIndex = 0;
            }
        }
    }


    createNewLocalSave(newFileName){
        if (this._localStorageEnable  && this.localNewSave) {
            this.localFileName = newFileName;

            this._generateFileId();
            this.localStore.saveToStorage(this.localFileID, this.localFileName);
            this.incrementSaveNumber();
            this.stagedScene = new THREE.Scene();
            this.stagedScene.background = new THREE.Color("#000000");
            this.localStore.saveToStorage(this.getKeyName("scene"), this.stagedScene);

            this.localStore.saveToStorage(this.getKeyName("keyframes"), this.stagedKeyframes);



            this.addNewSave(this.localFileID);

            this.localNewSave = false;

            for(let i = 0; i < this.localStorageUpdateList[0].length; i++)
                this.setLocalStorageSelectorElement(this.localStorageUpdateList[0][i], this.localStorageUpdateList[1][i], false);

            if(saveEngine.cloudStorage.userSignedIn) {
                for (let i = 0; i < this.cloudStorageUpdateList[0].length; i++)
                    this.setCloudStorageSelectorElement(this.cloudStorageUpdateList[0][i], this.cloudStorageUpdateList[1][i], false);
            }

            return this.loadLocalSave(this.localFileID);
        }

    }


    //Savers
    save(localStorage, cloudStorage){
        //Updates the staged data with the new data from the animation engine
        this.stagedSettings = settings;
        this.stagedScene = scene;
        this.stagedKeyframes = keyFrames;

        if(localStorage && this._localStorageEnable){
                this.localStore.saveToStorage("settings", this.stagedSettings)

            this.localStore.saveToStorage(this.getKeyName("scene"), this.stagedScene);

            this.localStore.saveToStorage(this.getKeyName("keyframes"), this.stagedKeyframes);
        }
        if(cloudStorage && this._cloudStorageEnable && this.cloudStorage.userSignedIn){
            this.cloudStorage.saveToCloud(this.localFileName, this.localFileID, this.stagedKeyframes, this.stagedScene, this.stagedSettings);
        }
    }




    //Deleters
    deleteLocalSave(idToDelete){
        if(this._localStorageEnable) {
            let oldID = this.localFileID;
            this.localFileID = idToDelete;
            let indexToDelete = this.localSaveIdList.findIndex(saves => saves === idToDelete);
            this.localSaveIdList.splice(indexToDelete, 1);
            this.localSaveFriendlyNamesList.splice(indexToDelete, 1);
            this.localStore.saveToStorage(settings.sessionId, this.localSaveIdList);
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
                    this.setCloudStorageSelectorElement(this.cloudStorageUpdateList[0][i], this.cloudStorageUpdateList[1][i], false);
            }
        }
    }

    deleteCloudSave(idToDelete){
        if(this._cloudStorageEnable){
            this.cloudStorage.deleteCloudSave(idToDelete);
        }
    }

    //getters
    


    //setters
    set setLocalStorageEnable(value){
        this._localStorageEnable = value;
        if(!this._localStorageEnable)
            getId("settings_localStorage").style.display = "none";

        else
            getId("settings_localStorage").style.display = "inherit";

    }

    set setCloudStorageEnable(value){
        this._cloudStorageEnable = value;
        if(!this._cloudStorageEnable)
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
        if(this._cloudStorageEnable) {
            let saveId;
            let saveFriendlyName;
            let selectorElement = document.getElementById(domSelectElement);
            selectorElement.innerHTML = "";
            if (defaultValue !== "none") {
                selectorElement.innerHTML += " <option value='default'> " + defaultValue + "</option>";
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
        if(this.cloudStorage.userSignedIn) {
            for (let i = 0; i < this.cloudStorageUpdateList[0].length; i++)
                this.setCloudStorageSelectorElement(this.cloudStorageUpdateList[0][i], this.cloudStorageUpdateList[1][i], false);
        }
    }

    //Helper functions
    getKeyName(key){
        if(this.localFileID === "init")
            this._generateFileId();
        key +=":" + this.localFileID;
        return key;

    }

    addNewSave(saveId){
        //this adds a save to the save ID array then saves it into storage

        this.localSaveIdList.push(saveId);
        this.localSaveFriendlyNamesList.push(this.localStore.getFromStorage(saveId));
        this.localStore.saveToStorage(settings.sessionId, this.localSaveIdList);
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


}