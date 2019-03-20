let usingTutorial = false;
//the default of loading tutorial is false. 
//Tutorial will load on the call of this function
function launchTutorial(){
    document.getElementById("welcomeScreen").style.display = "none"; //removes welcome screen
    document.getElementById('tutorialArrow').style.display = "inherit"; //launches tutorial arrow in the current scene
    setTimeout(function(){
        if(confirm("To create a shape, click on the button with the cube")){
            animateArrow(-60,15,106,120); //brings arrow to the position
            usingTutorial = true; 
        }
    }, 10);

}

let animateArrowTime;
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
