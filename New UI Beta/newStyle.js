/*
This file contains all of the javascript for the new UI for Monarch Animation 2019 Edition

This file is licensed under the Apache 2.0 license.
That means that you can freely use and modify this code for all uses except for
    commercial uses provided this header is at the top of all files
Copyright 2018-2019 Monarch TSA

Author Gregory Bell
Edited 3/23/19
Rev 14

 */


//----------------------------CLASS-ADDERS-----------------------------------------
/*
* Adds class to hide the welcome screen in a cool animation
* After it does that is starts all of the needed functions for the program.
* */
function initMainUI(){
    document.getElementById("std_ws_container").classList.add("ws_hide");
    document.getElementById("ws_body").classList.add("ws_hide");
    UISpacer();
}

/*
* Shows and hides menus in a more elegant fashion
* */
var activeMenu ="init";//init value
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

function settingsToggle(){
    if(document.getElementById("std_settings").classList.contains("settings_hide")){
        document.getElementById("std_settings").classList.remove("settings_hide");
        document.getElementById("settings_menu").classList.remove("settings_hide");
        document.getElementById("std_settings").classList.add("settings_show");
        document.getElementById("settings_menu").classList.add("settings_show");
    }
    else{
        document.getElementById("std_settings").classList.remove("settings_show");
        document.getElementById("settings_menu").classList.remove("settings_show");
        document.getElementById("std_settings").classList.add("settings_hide");
        document.getElementById("settings_menu").classList.add("settings_hide");
    }
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
        loadSelector.innerHTML += " <option onclick=\'saveSubSystem.setSaveToLoad = (\" " + opt + " \"); initMainUI();\' > " + opt + "</option>";
    }
}
/*
* This is function that will start the 3js engine's render
* This will moved to init.js
* */
function startRender(){

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
 * This function will space the elements so they look nice
 * List of Elements:
 * nav_shapesList button
 * nav_newShape button
 * nav_camera button
 * nav_scene button
 * std_statusBox text box
 * nav_settings button
 * This function is a mess and I should be able to clean it up if I put forth the effort but I really hate arrays.
 * It will happen soon though
 */
function UISpacer(){
    const topPadding = "2";//px
    const bottomPadding="2";//px
    const navHeight = (document.getElementById("std_nav_bar").clientHeight-4).toString();
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
    selectedElement.style.left =  (document.getElementById("std_nav_bar").clientWidth/2)-(selectedElement.clientWidth/2).toString()+"px";

    selectedElement = document.getElementById("nav_settings");

    selectedElement.style.top = topPadding+"px";
    selectedElement.style.bottom = bottomPadding+"px";
    selectedElement.style.right = "2px";
    selectedElement.style.height = navHeight + "px";

    document.getElementById("std_menu_container").style.width = nextElementLeftPlacement.toString()+"px";
    document.getElementById("std_menu_container").style.top=(parseFloat(navHeight)+2).toString()+"px";

    document.getElementById("std_settings").style.width = document.getElementById("std_menu_container").clientWidth.toString()+"px";
    document.getElementById("std_settings").style.top=(parseFloat(navHeight)+2).toString()+"px";



}
/*
* Hides things for mobile users.
* */
function mobileHider(){

}




//------------------------------------------JQUERY----------------------------------------------------

$(document).ready(function () {
    $(window).resize(function () {
        UISpacer();
    });
});




