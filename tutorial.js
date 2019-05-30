//the default of loading tutorial is false.
//Tutorial will load on the call of this function
function launchTutorial(){
    showPopUp("popUp_error_body","Tutorial","To begin, click on the shapes box",-1);

    document.getElementById('tutorialArrow').style.display = "block"; //launches tutorial arrow in the current scene

    animateArrow(120, 120);

}

function animateArrow(x, y){
    document.getElementById("tutorialArrow").style.left=x.toString()+"px";
    document.getElementById("tutorialArrow").style.top=y.toString()+"px";


  

}

