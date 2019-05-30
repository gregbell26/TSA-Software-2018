//the default of loading tutorial is false. 
//Tutorial will load on the call of this function
function launchTutorial(){
  // document.getElementById("welcomeScreen").style.display = "none"; //removes welcome screen 

     showPopUp("popUp_error_body","Tutorial","To begin, click on the shapes box",-1);

    document.getElementById('tutorialArrow').style.display = "inherit"; //launches tutorial arrow in the current scene

     animateArrow(15, 75, 120, 120);
}

var animateArrowTime;
function animateArrow(startT, endT, startL, endL){
    animateArrowTime = 0;
    let arrowAnimate = setInterval( function(){
        animateArrowTime+=7.5;
        if(animateArrowTime<200){
            document.getElementById('tutorialArrow').style.top = startT + (endT-startT)/200*animateArrowTime + "px";
            document.getElementById('tutorialArrow').style.left = startL + (endL-startL)/200*animateArrowTime + "px";
        }

        else{
            clearInterval(arrowAnimate);
            document.getElementById('tutorialArrow').style.top = endT + "px";
            document.getElementById('tutorialArrow').style.left = endL + "px";
        }
    }, 10);
}
