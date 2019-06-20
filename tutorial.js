//the default of loading tutorial is false.
//Tutorial will load on the call of this function

let usingTutorial = false;
let tutorialPopUp = document.getElementById("std_tutorial_popUp");


function launchTutorial(){
    if (!tutorialPopUp)
        tutorialPopUp = document.getElementById("std_tutorial_popUp");
    // showPopUp("popUp_error_body","Tutorial","To begin, click on the shapes box",-1);
    usingTutorial = true;
    tutorialMovement(120,150,"The Assets Menu gives you access to all of the elements like lighing and shapes. Follow the arrow and click on the assets button.", 0);

    // document.getElementById('tutorial_arrow').style.display = "block"; //launches tutorial arrow in the current scene

    // moveArrow(120, 120);
}

function moveArrow(x, y){
    document.getElementById("tutorial_arrow").style.left=x.toString()+"px";
    document.getElementById("tutorial_arrow").style.top=y.toString()+"px";
}


function tutorialMovement(arrowX, arrowY, promptText, isFinal){
    if(usingTutorial) {
        document.getElementById('tutorial_arrow').style.display = "block"; //launches tutorial arrow in the current scene
        if (isFinal) {
            tutorialPopUp.children[2].children[0].setAttribute("onclick", "" +
                "exitTutorial();")
        } else {
            tutorialPopUp.children[2].children[0].setAttribute("onclick", "" +
                "moveArrow(" + arrowX + ", " + arrowY + "); " +
                "hideTutorialPopup();" );
        }
        showTutorialPopup(promptText);
    }

}

function showTutorialPopup(bodyText) {
    if(usingTutorial){
        if (!tutorialPopUp) {
            tutorialPopUp = document.getElementById("std_tutorial_popUp");
        }

        tutorialPopUp.children[1].innerHTML = bodyText;

        tutorialPopUp.style.display = "block";
        tutorialPopUp.classList.add("tutorial_popUp_show");

    }
}

function exitTutorial(){
    usingTutorial = false;
    moveArrow(0,0);
    document.getElementById('tutorial_arrow').style.display = "none";
    hideTutorialPopup()
}

function hideTutorialPopup(){
    if(!tutorialPopUp)
        tutorialPopUp = document.getElementById("std_tutorial_popUp");

    tutorialPopUp.style.display = "none";
    tutorialPopUp.classList.remove("tutorial_popUp_show");
    tutorialPopUp.children[2].children[0].setAttribute("onclick", "");
}

