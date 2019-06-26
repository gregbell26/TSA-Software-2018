const firebaseConfig = {
    apiKey: "AIzaSyDbwUcLJqhpSwhET7bL54mRUd28FfZ9x_A",
    authDomain: "monarchanimation-cloudstorage.firebaseapp.com",
    databaseURL: "https://monarchanimation-cloudstorage.firebaseio.com",
    projectId: "monarchanimation-cloudstorage",
    storageBucket: "monarchanimation-cloudstorage.appspot.com",
    messagingSenderId: "5911128418",
    appId: "1:5911128418:web:a62eabfd3b182b60"
};

firebase.initializeApp(firebaseConfig);




firebase.auth().onAuthStateChanged(function (user) {
    try {
        if (user) {
            console.log("Signed In");
            saveEngine.cloudStorage.userSignedIn = true;
            saveEngine.cloudStorage.userName = user.email;
            saveEngine.cloudStorage.userUID = user.uid;
            saveEngine.cloudStorage.generateUserData();//this will only run if a new user signed in.
            saveEngine.cloudStorage.getUserData();//this will download the user's saveIDs
            saveEngine.cloudSaveIdList = this.downloadedFileIDs;
            document.getElementById("account_sub_signedIn").style.display = "inherit";
            document.getElementById("account_sub_signedOut").style.display = "none";
        } else {
            console.log("Signed Out");
            saveEngine.cloudStorage.userSignedIn = false;
            // saveEngine.cloudStorage.userName = false;
            // saveEngine.cloudStorage.userUID = false;
            document.getElementById("account_sub_signedOut").style.display = "inherit";
            document.getElementById("account_sub_signedIn").style.display = "none";
        }
    }
    catch (TypeError) {
        //If the save engine hasn't been loaded yet then catch the error
        console.log("error")
    }
});


class CloudStorage{


    constructor(){
        this.userSignedIn = false;

        this.userName =  "";

        this.userUID=  "";

        this.firestore=  {};

        this.userDataRef=  "";

        this.saveDataRef=  "";

        //this.firebaseRef=  "";

        this.newUser = false;

        this.downloadedFileIDs=  [];
        this.downloadedSettings=  {};

        this.firestore = firebase.firestore();
        // this.firebaseRef = firebase.storage().ref();

        this.downloadData = {
            name: "default",
            keyframes: "default",
            scene: "default",
        };
    }




    generateUserData(){
        if(this.constructor.userSignedIn && this.newUser) {
            this.userDataRef = this.firestore.collection("userData").doc(saveEngine.cloudStorage.userUID);
            this.saveDataRef = this.firestore.collection("saveData").doc("data").collection(saveEngine.cloudStorage.userUID);
            //creates the save system for the user
            this.userDataRef.set({
                fileIDs: JSON.stringify([]),
                settings: JSON.stringify(saveEngine.stagedSettings),
            });
            //There is no need to save no data
            // this.saveDataRef.doc("test").set({
            //
            // });
            this.newUser = false;
        }
    }

    getUserData(){
        // let cont = false;
        // if(!this.userDataRef){
            this.userDataRef = this.firestore.collection("userData").doc(saveEngine.cloudStorage.userUID);
            this.saveDataRef = this.firestore.collection("saveData").doc("data").collection(saveEngine.cloudStorage.userUID);
        // }
        this.userDataRef.get().then(function(data){
            if(data.exists) {

                saveEngine.cloudStorage.downloadedFileIDs = JSON.parse(data.data().fileIDs);
                saveEngine.cloudStorage.downloadedSettings = JSON.parse(data.data().settings);
                // cont = true;
                console.log(JSON.parse(data.data().fileIDs));

                for(let i =0; i< saveEngine.cloudStorage.downloadedFileIDs.length; i++){
                    //this might cause issues down the line
                    saveEngine.cloudStorage.saveDataRef.doc(saveEngine.cloudStorage.downloadedFileIDs[i]).get().then(function(data){
                        if(data.exists) {
                            saveEngine.cloudSaveFriendlyNamesList.push(data.data().name);
                        }
                        else{
                            saveEngine.cloudStorage.downloadedFileIDs.splice(i,1);
                            i--;
                        }
                    });

                }

                saveEngine.cloudSaveIdList = saveEngine.cloudStorage.downloadedFileIDs;

            }
            else {
                // cont = false;
            }
        });



    }

    createNewUser(email, password){
        showPopUp("popUp_confirm_body", "Confirm Account Creation", "Email: " + email, 3);
        saveEngine.cloudStorage.userName = email;
        saveEngine.cloudStorage.userUID = Base64.encode(password);//this is incredibly insecure.
        this.newUser = true;
    }

    signIn(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
            //handle errors
            //display message to user
            console.log(error)
        });
    }

    signOut(){
        showPopUp("popUp_confirm_body", "Confirm", "Do you want to sign out?", 4);

    }

    saveToCloud(saveName, saveID, keyframes, scene, settings ){
        if(saveEngine.cloudStorage.userSignedIn){
            let combinedSaveData = {
                name: saveName,
                keyframes: JSON.stringify(keyframes),
                scene: JSON.stringify(scene),
            };
            let newCloudSave = true;
            for(let i = 0; i < this.downloadedFileIDs.length; i++){
                if(this.downloadedFileIDs[i]===saveID)
                    newCloudSave = false;
            }
            if(newCloudSave)
                this.downloadedFileIDs.push(saveID);

            //the saves
            this.userDataRef.set({
                fileIDs: JSON.stringify(this.downloadedFileIDs),
                settings: JSON.stringify(settings),
            }, {merge: true});

            this.saveDataRef.doc(saveID).set(combinedSaveData, {merge: true});


        }
        else{
            return -5;//user isn't signed in
        }
    }


    // downloadComplete = false;
    downloadSave(saveIDtoGet){
        this.saveDataRef.doc(saveIDtoGet).get().then(function (data) {
            if(data.exists) {
                saveEngine.cloudStorage.downloadData = data.data();
                // saveEngine.cloudStorage.downloadComplete = true;
                saveEngine.stagedScene = conversion.convertJSONToScene(JSON.parse(data.data().scene));
                saveEngine.stagedKeyframes = JSON.parse(data.data().keyframes);
                saveEngine.localFileName = data.data().name;
                saveEngine.localFileID = saveIDtoGet;

                saveEngine.localStore.saveToStorage(saveEngine.localFileID, saveEngine.localFileName);
                saveEngine.localStore.saveToStorage(saveEngine.getKeyName("scene"), saveEngine.stagedScene);
                saveEngine.localStore.saveToStorage(saveEngine.getKeyName("keyframes"), saveEngine.stagedKeyframes);
                let exists = false;
                for(let i = 0; i < saveEngine.localSaveIdList.length; i++){
                    if(saveEngine.localSaveIdList[i]===saveIDtoGet)
                        exists = true;
                }
                if(!exists) {
                    saveEngine.addNewSave(saveEngine.localFileID);
                }

                scene = saveEngine.loadLocalSave(saveIDtoGet);
            }
            else {
                console.log("save not found")
            }
        });
    }

    deleteCloudSave(saveIDtoDelete){
        for(let i =0; i < this.downloadedFileIDs.length; i++) {
            if (this.downloadedFileIDs[i] === saveIDtoDelete)
                this.downloadedFileIDs.splice(i, 1);
        }
        this.saveDataRef.doc(saveIDtoDelete).delete();
        this.userDataRef.set({
            fileIDs: JSON.stringify(this.downloadedFileIDs),
        }, {merge: true});
        saveEngine.cloudSaveIdList = this.downloadedFileIDs;


    }






}