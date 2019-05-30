import { getDiffieHellman } from "crypto";

//the default of loading tutorial is false. 
//Tutorial will load on the call of this function
function launchTutorial(){
  // document.getElementById("welcomeScreen").style.display = "none"; //removes welcome screen 

    showPopUp("popUp_error_body","Tutorial","To begin, click on the shapes box",-1);

    document.getElementById('tutorialArrow').style.display = "block"; //launches tutorial arrow in the current scene

    animateArrow(120, 120);
}

function animateArrow(x, y){
    document.getElementbyId(tutorialArrow).style.left=toString(x)+"px";
    document.getElementbyId(tutorialArrow).style.top=toString(y)+"px";
  

}

