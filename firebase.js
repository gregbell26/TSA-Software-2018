var config = {
    apiKey: "AIzaSyA869DhxfjeXQIJ1dPsLzn8UggNUVYYHaY",
    authDomain: "tsa2019-software.firebaseapp.com",
    databaseURL: "https://tsa2019-software.firebaseio.com",
    projectId: "tsa2019-software",
    storageBucket: "tsa2019-software.appspot.com",
    messagingSenderId: "894831766771"
};
firebase.initializeApp(config);
//inits database
var database = firebase.database();
var uid; //user id.
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log(user);
        uid = user.uid;
    } else {
        // User is signed out.
        // ...
    }
});
function signInWithGoogle() {
    console.log('this is working')
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user)
    }).catch(function(error) {
        //put error code here.
    });
}