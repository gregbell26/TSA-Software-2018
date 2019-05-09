var user;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB68YeUNb55npqy8OL3UiVHMQQ7weDm4RY",
    authDomain: "tsa-2019.firebaseapp.com",
    databaseURL: "https://tsa-2019.firebaseio.com",
    projectId: "tsa-2019",
    storageBucket: "tsa-2019.appspot.com",
    messagingSenderId: "796284394275"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();

function createAccount(email, password, confirm){
    console.log(email);
    console.log(password);
    console.log(confirm);
    if(password==confirm){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            console.log(error.code);
            alert(error.message);
        });
    }
    else{
        alert("Passwords do not match");
    }
}

function signIn(email, password){
    console.log(email);
    console.log(password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error.code);
        alert(error.message);
    });
}

function signOut(){
    firebase.auth().signOut().then(function() {
        console.log("Signed out");
    }).catch(function(error) {
        console.log(error.code);
        alert(error.message);
    });
}

firebase.auth().onAuthStateChanged(function(usr) {
    if (usr) {
        user = usr;
        console.log("Signed in: "+user.email);
        console.log("UID: "+user.uid);
        document.getElementById("account_sub_signedIn").style.display="inherit";
        document.getElementById("account_sub_signedOut").style.display="none";
    }
    else{
        user = null;
        console.log("Sign out call");
        document.getElementById("account_sub_signedOut").style.display="inherit";
        document.getElementById("account_sub_signedIn").style.display="none";
    }
});

function saveCurrentToCloud(){
    firebase.storage().ref().child(user.uid+"/"+saveSubSystem.fileName+".json").put(saveSubSystem.generateFileForCurrentSave()).then(function(snapshot) {
        console.log('Uploaded file!');
        var json = {};
        json[saveSubSystem.fileName+".json"] = true;
        firestore.collection("lists").doc(user.uid).set(json,{ merge: true });
    });
}
function loadCloudSave(){
    var file = document.getElementById("signedIn_loadSelector").value;
    firebase.storage().ref().child(user.uid+"/"+file).getDownloadURL().then(function(url){
        $.ajax({url:url, success: function(result){
                var res = JSON.parse(result);
                saveSubSystem.saveFromCloud(res,file.split(".json")[0]);
            }});
    });

}