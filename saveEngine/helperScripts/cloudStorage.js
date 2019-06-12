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



// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
//     //handle errors
//     //display message to user
// });

firebase.auth().onAuthStateChanged(function (user) {
    if(user){
        CloudStorage.userSignedIn = true;
        CloudStorage.userName = user.email;
        CloudStorage.userUID = user.uid;
        //set parts to visble
    }
    else{
        CloudStorage.userSignedIn = false;
        CloudStorage.userName = false;
        CloudStorage.userUID = false;
        //set parts to hidden
    }
});

let connectedToServer = firebase.database().ref(".info/connected");
connectedToServer.on("value", function(connected){
    if(connected.value){
        saveEngine.connectionStateChanged(true);
    }
    else{
        saveEngine.connectionStateChanged(false);
    }
});

class CloudStorage{
    static userSignedIn = false;

    static userName;

    static userUID;

    firestore;

    userDataRef;

    saveDataRef;

    firebaseRef;


    downloadedFileIDs;
    downloadedSettings;


    constructor(){
        this.firestore = firebase.firestore();
        this.firebaseRef = firebase.storage().ref();
    }




    generateUserData(){

    }

    createNewUser(email, password){
        //confirm with user that this is good

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
            //handle errors
            //display message to user
        });
        if(this.constructor.userSignedIn) {
            this.userDataRef = this.firestore.collection("userData").doc(this.constructor.userUID);
            this.saveDataRef = this.firestore.collection("saveData").doc(this.constructor.userUID);
            //creates the save system for the user
            this.userDataRef.set({
                fileIDs: [],
                settings: [],
            });
            this.saveDataRef.set({

            });
        }



    }






}