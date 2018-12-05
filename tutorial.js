var usingTutorial = false;

function launchTutorial(){
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById('tutorialArrow').style.display = "inherit";
    setTimeout(function(){
        confirm("To create a shape, click on the button with the cube");
    }, 10);

    usingTutorial = true;
}

function tutorialMoveArrowNewShape(){
    animateArrow(-60,-10,106,120);
}
var animateArrowTime;
function animateArrow(startT, endT, startL, endL){
    animateArrowTime = 0;
    var arrowAnimate = setInterval( function(){
        animateArrowTime+=10;
        console.log(animateArrowTime);
        if(animateArrowTime<200){
            document.getElementById('tutorialArrow').style.top = startT + (endT-startT)/200*animateArrowTime + "px";
            document.getElementById('tutorialArrow').style.left = startL + (endL-startL)/200*animateArrowTime + "px";
        }
        else{
            clearInterval(arrowAnimate);
        }
    }, 10);
}