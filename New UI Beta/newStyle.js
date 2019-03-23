/*
*
* This is the new style for the Animation program.
* Will include dark Mode Detector, icon spacer, Suicide notes, And More!
*
*
*
* */


//----------------------------CLASS-ADDERS-----------------------------------------
/*
* Adds class to hide the welcome screen in a cool animation
* */
function hideWelcomeScreen(){
    document.getElementById("welcomeScreen").classList.add("ws_hide");
    document.getElementById("ws_body").classList.add("ws_hide");
    navBarSpacer();
}

/*
* Shows and hides menus in a more elegant fashion
* */
var activeMenu ="init";
function showMenu(menuToShow){
    if(activeMenu !== "init") {
        document.getElementById(activeMenu).classList.remove("menu_show");
        document.getElementById(activeMenu).classList.add("menu_hidden");
    }

    document.getElementById(menuToShow).classList.remove("menu_hidden");
    document.getElementById(menuToShow).classList.add("menu_show");

    activeMenu = menuToShow;
}

function timelineButtonToggle(buttonToToggle){
    if(document.getElementById(buttonToToggle).classList.contains("timeline_buttonToggled"))
        document.getElementById(buttonToToggle).classList.remove("timeline_buttonToggled");
    else{
        document.getElementById(buttonToToggle).classList.add("timeline_buttonToggled");
    }
}

function timelineMasterToggle(mode){
    if(mode === "show")
        document.getElementById("std_timeline").classList.add("timeline_show");
    else if (mode === "hide")
        document.getElementById("std_timeline").classList.remove("timeline_show");

}


//---------------------------------PSEUDO-FUNCTIONS-----------------------------------------
/*
* Pseudo function for populating list with save names
* Need to tie in with saveSubSystem
* */
function loadSaveNames() {
    var loadSelector = document.getElementById("ws_loadMenu");
    var options = ["3","32", "fdghjkl", "fghytfvbnm", "BULL"];
// Populate list with options
    var opt;
    for (var i = 0; i < options.length; i++) {
        opt = options[i];
        loadSelector.innerHTML += " <option onclick=\'saveSubSystem.setSaveToLoad = (\" " + opt + " \"); hideWelcomeScreen();\' > " + opt + "</option>";
    }
}



//----------------------------STYLE-FUNCTIONS--------------------------------------------------
/*
* Dynamically loads style sheets and allows for different themes to be easily created
* */
var stylesheetLoaded = false;
var loadedStyleTag= "";
function stylesheetLoader(stylesheetName){
    var validStyleSheet=false;
    var cssToLoad=document.createElement("link");
    cssToLoad.setAttribute("rel", "stylesheet");
    cssToLoad.setAttribute("type", "text/css");

    if(stylesheetLoaded){
        document.getElementsByTagName("head")[0].removeChild(loadedStyleTag);
        stylesheetLoaded=false;
        loadedStyleTag = "";

    }
    if(stylesheetName === "normalMode"){
        cssToLoad.setAttribute("href", "normalMode_Style.css");
        validStyleSheet = true;
    }

    else if (stylesheetName ==="darkMode"){
        cssToLoad.setAttribute("href", "darkMode_Style.css");
        validStyleSheet =true;
    }

    else if(stylesheetName === "mobile"){
        cssToLoad.setAttribute("href", "mobileMode_Style.css");
        mobileHider();
        validStyleSheet = true;
    }
    else {
        console.log("ERROR: Invalid CSS")
    }

    if(validStyleSheet) {
        document.getElementsByTagName("head")[0].appendChild(cssToLoad);
        stylesheetLoaded = true;
        loadedStyleTag = cssToLoad;
    }
}

/**
 * This function will space the elements on the nav bar
 * List of Elements:
 * nav_shapesList button
 * nav_newShape button
 * nav_camera button
 * nav_scene button
 * std_statusBox text box
 * nav_settings button
 * This function is a mess and I should be able to clean it up if I put forth the effort but I really hate arrays.
 * It will happen soon though
 * @param paddingAmount the amount padding to apply inbetween the buttons
 */
function navBarSpacer(){
    const topPadding = "2";//px
    const bottomPadding="2";//px
    const navHeight = (document.getElementById("nav_menu").clientHeight-4).toString();
    var nextElementLeftPlacement = 2;//px
    var selectedElement;
    //This is a cheap and lazy but it should work
    selectedElement = document.getElementById("nav_shapesList");

    selectedElement.style.top = topPadding+"px";
    selectedElement.style.bottom = bottomPadding+"px";
    selectedElement.style.left = nextElementLeftPlacement.toString()+"px";
    selectedElement.style.height = navHeight + "px";

    nextElementLeftPlacement += selectedElement.clientWidth+2;
    selectedElement = document.getElementById("nav_newShape");

    selectedElement.style.top = topPadding+"px";
    selectedElement.style.bottom = bottomPadding+"px";
    selectedElement.style.left = nextElementLeftPlacement.toString()+"px";
    selectedElement.style.height = navHeight + "px";

    nextElementLeftPlacement += selectedElement.clientWidth+2;
    selectedElement = document.getElementById("nav_camera");

    selectedElement.style.top = topPadding+"px";
    selectedElement.style.bottom = bottomPadding+"px";
    selectedElement.style.left = nextElementLeftPlacement.toString()+"px";
    selectedElement.style.height = navHeight + "px";

    nextElementLeftPlacement += selectedElement.clientWidth+2;
    selectedElement = document.getElementById("nav_scene");

    selectedElement.style.top = topPadding+"px";
    selectedElement.style.bottom = bottomPadding+"px";
    selectedElement.style.left = nextElementLeftPlacement.toString()+"px";
    selectedElement.style.height = navHeight + "px";

    nextElementLeftPlacement += selectedElement.clientWidth;//This is being set now so that we can use it later in the menu container.

    selectedElement = document.getElementById("std_statusBox");

    selectedElement.style.top = topPadding+"px";
    selectedElement.style.bottom = bottomPadding+"px";
    selectedElement.style.height = navHeight + "px";
    selectedElement.style.left =  (document.getElementById("nav_menu").clientWidth/2)-(selectedElement.clientWidth/2).toString()+"px";

    selectedElement = document.getElementById("nav_settings");

    selectedElement.style.top = topPadding+"px";
    selectedElement.style.bottom = bottomPadding+"px";
    selectedElement.style.right = "2px";
    selectedElement.style.height = navHeight + "px";

    document.getElementById("menu_container").style.width = nextElementLeftPlacement.toString()+"px";
    document.getElementById("menu_container").style.top=(parseFloat(navHeight)+2).toString()+"px";


}
/*
* Hides things for mobile users.
* */
function mobileHider(){

}




//------------------------------------------JQUERY----------------------------------------------------

$(document).ready(function () {
    console.log("Doc is ready");
    $(window).resize(function () {
        console.log("resize");
        navBarSpacer();
    });
});




