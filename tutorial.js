//the default of loading tutorial is false.
//Tutorial will load on the call of this function

let usingTutorial = false;
let tutorialPopUp = document.getElementById("std_tutorial_popUp");


function launchTutorial(){
    if (!tutorialPopUp)
        tutorialPopUp = document.getElementById("std_tutorial_popUp");
    // showPopUp("popUp_error_body","Tutorial","To begin, click on the shapes box",-1);
    usingTutorial = true;
addfortutorial('start');
    // document.getElementById('tutorial_arrow').style.display = "block"; //launches tutorial arrow in the current scene

    // moveArrow(120, 120);
}

function moveArrow(x, y){
    document.getElementById("tutorial_arrow").style.left=x.toString()+"px";
    document.getElementById("tutorial_arrow").style.top=y.toString()+"px";
}
var tutorialnum=0;
function addfortutorial(msg){
tutorialnum++;
switch (tutorialnum){
    case 1:
        if(msg=='start')
            tutorialMovement(120, -100, "The assets menu gives you access to all of the elements like lighing and shapes click this button to access it.", 0);
        break;
    case 2:
            if(msg=='animation_element_menu')
            tutorialMovement(200,30,'To create a shape, click Create Shape', 0);
       else
       tutorialnum--;
            break;
    case 3:
            if(msg=='new_shape')
            tutorialMovement(150,410,'Now click on the shape you want. Once you create it, scroll down to the Diementions options and change the x dimention', 0);
       else
       tutorialnum--;
            break; 
    case 4:
        if(msg=='dimenX')
            tutorialMovement(200,220,'Now press TAB and change the next value', 0);
       else
       tutorialnum--;
            break; 
    case 5:
            if(msg=='dimenY')
            tutorialMovement(200,220,'Now create a light so that you can see the shape. Scroll all the way up in the menu and follow the arrow.',0);
       else
       tutorialnum--;
            break;  
    case 6:
        if(msg=='light_menu')
            tutorialMovement(50,-100,"This is the light editor. You can change the intensity and position of most lights. Some lights have specific settings. There is also a shapes editor. To get there, click on the assets list button.", 0);
       else
       tutorialnum--;
            break;  
    case 7:
            if(msg=='shape_list')
            tutorialMovement(270,10,'Here you can find a list of all assets in the scene, click on the shape to edit it.', 0);
        else
        tutorialnum--;
            break;  
    case 8: 
    if(msg=='shape_menu')
            tutorialMovement(120,430,"Now you can make an animation. To do so, add a keyframe by clicking on the keyframe button.", false);
        else
        tutorialnum--;
            break;  
    case 9:
        if(msg=='add_frame')
            tutorialMovement(120,(window.innerHeight-125),'Now change the X DIMENTION of the shape',0);
        else
        tutorialnum--;
            break; 
    case 10:
            if(msg=='dimenX'){
            JQuerry("#element_information").scrollTo("#element_visibility");
            tutorialMovement(120,430,'Now add Another Keyframe',0);
            }
        else
        tutorialnum--;
            break;
    case 11:
            if(msg=='add_frame')
            tutorialMovement(300,(window.innerHeight-245),'Now you have an animation set up. Press the play button to play the animation',0);
        else
        tutorialnum--;
            break;
    case 12:
            if(msg=='play')
            tutorialMovement(370,(window.innerHeight-245),'You can also pause an animation by pressing the play button again. You can also loop the animation. Click the button to the right of the play button to loop the animation to do so.', 0);
        else
        tutorialnum--;
            break;
    case 13:
            if(msg=='loop')
            tutorialMovement(190,(window.innerHeight-245),'Now if you want to delete a keyframe, you can do so. Click Continue and follow the arrow to delete the last keyframe', 0);
        else 
        tutorialnum--;
            break;
    case 14:
            if(msg=='remove_frame')
            tutorialMovement(120, (window.innerHeight-245),'You can also hide the shape. Go back to the shapes options menu at the left, scroll all the way down, and click on HIDE ELEMENT', 0);
        break;
    case 15:
            if(msg=='hide_shape')
            tutorialMovement(1180,-100,'You are now done with the tutorial. To view our advanced features, go to settings.', 0);
        break;
    case 16:
            if(msg=='setting_menu')
            tutorialMovement(1180,-100,'Here you will find advanced and saving options. A thorough list and explanation of all buttons can be seen at the bottom.',0)
        else
        tutorialnum--;
            break;
}
}
function tutorialMovement(arrowX, arrowY, promptText, isFinal){

    if(usingTutorial) {
        document.getElementById('tutorial_arrow').style.display = "block"; //launches tutorial arrow in the current scene
        if (isFinal) {
            tutorialPopUp.children[2].children[0].setAttribute("onclick", "" +
                "exitTutorial();")
        } else {
            tutorialPopUp.children[2].children[0].setAttribute("onclick", "" +
                "hideTutorialPopup();" );
        }
        moveArrow(arrowX, arrowY);
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

