var shownPopUp = "init";
function showPopUp(popUpToShow, popUpContent, otherText, mode){
    getId("std_popUp").classList.add("popUp_show");
    getId(popUpToShow).classList.add("popUp_show");
    getId(popUpToShow).children.item(0).textContent = popUpContent;
    if(getId(popUpToShow).children.item(1).classList.contains("std_input_text"))
        getId(popUpToShow).children.item(1).children.item(3).innerHTML = otherText;
    else
        getId(popUpToShow).children.item(1).innerHTML = otherText;
    getId(popUpToShow).children.item(2).setAttribute('onclick', "popUpAction("+mode+"); hidePopUp();");

    shownPopUp = popUpToShow;
}
function popUpAction(action){
    if(action===0){
        saveEngine.createNewLocalSave(getPopUpInput());
        // scene.background = new THREE.Color("#000000");
    }
    else if(action===1){
        newShape("text",1,1,1,0,0,0,'#FF0000','#000000',getPopUpInput());
        //saveSubSystem.addText(getPopUpInput());
    }
    else if(action===2){
        saveEngine.createNewLocalSave(getPopUpInput());
        launchTutorial();
    }
    else if(action === 3){
        firebase.auth().createUserWithEmailAndPassword(saveEngine.cloudStorage.userName, Base64.decode(saveEngine.cloudStorage.userUID)).catch(function(error){
            //handle errors
            //display message to user
        });
    }
    else if (action === 4){
        firebase.auth().signOut();
    }
    else if (action===100){
        location.reload();
    }
    else{
        return;
    }
    if(action !== (3||100)) {
        getId(getId(shownPopUp).children.item(1).children.item(0).value = "");
    }
}

function getPopUpInput() {
    if(shownPopUp !== "init" && shownPopUp.includes("input")){
        return getId(shownPopUp).children.item(1).children.item(0).value;
    }
    return "";
}

function hidePopUp() {
    getId(shownPopUp).classList.remove("popUp_show");
    getId("std_popUp").classList.remove("popUp_show");
}