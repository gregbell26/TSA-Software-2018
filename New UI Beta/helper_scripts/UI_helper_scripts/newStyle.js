/*
This file contains all of the javascript for the new UI for Monarch Animation 2019 Edition

This file is licensed under the Apache 2.0 license.
That means that you can freely use and modify this code for all uses except for
    commercial use provided this header is at the top of all files
Copyright 2018-2019 Monarch TSA

Author Gregory Bell
Edited 4/6/19
Rev 18

 */


//----------------------------CLASS-ADDERS-----------------------------------------
/*
* Adds class to hide the welcome screen in a cool animation
* After it does that is starts all of the needed functions for the program.
* */
async function initMainUI(){
    if(!document.querySelector("body").requestFullscreen()){
        //do something if we are unable to enter full screen mode
        /*document.querySelector("body").requestFullscreen();*/
    }
    document.getElementById("std_ws_container").classList.add("ws_hide");
    document.getElementById("ws_body").classList.add("ws_hide");
    UISpacer();
    await new Promise(resolve => setTimeout(resolve, 2250));
    for (let el of document.querySelectorAll('#std_ws_container')) el.hidden = true;
    for (let el of document.querySelectorAll('#ws_body')) el.hidden = true;
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

function showSubMenu(subMenu){
    document.getElementById(subMenu).classList.add("subMenu_show");
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

var shownPopUp = "init";
function showPopUp(popUpToShow, popUpContent){
    document.getElementById("std_popUp").classList.add("popUp_show");
    document.getElementById(popUpToShow).classList.add("popUp_show");
    document.getElementById(popUpToShow).children.item(0).textContent = popUpContent;
    shownPopUp = popUpToShow;
}

function hidePopUp() {
    document.getElementById(shownPopUp).classList.remove("popUp_show");
    document.getElementById("std_popUp").classList.remove("popUp_show");
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
        cssToLoad.setAttribute("href", "./style/normalMode_Style.css");
        validStyleSheet = true;
    }

    else if (stylesheetName ==="darkMode"){
        cssToLoad.setAttribute("href", "./style/darkMode_Style.css");
        validStyleSheet =true;
    }

    else if(stylesheetName === "amoledMode"){
        cssToLoad.setAttribute("href", "./style/amoledMode_Style.css");
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
 * This function is about halfway clean. I can prolly do some more cleaning its just that I, well Dont want to
 * This function updates diemsions in diemsions.js
 */
function UISpacer(){
    //functions vars
    var nextLeftElementLoc;
    var nextRightElementLoc;
    var statusWidthHalved;
    //Gets all of the nav buttons by class name then stuffs them into an array
    var elementList = document.getElementsByClassName("std_nav_button");
    elementList = Array.from(elementList);//Converts the list into an array

    //Things to be reset on launch when function runs
    //This hasn't hampered performance in my tests but who knows it might in production
    //So I'm clearing the arrays
    UIDiemsions.std_navBar.button_placement = [];
    UIDiemsions.std_navBar.spacer_placement = [];


    //sets diemsions
    //See parent class for what each of these things do.
    UIDiemsions.std_navBar.nav_height = document.getElementById("std_nav_bar").clientHeight;
    UIDiemsions.std_navBar.element_height = UIDiemsions.std_navBar.nav_height - (UIDiemsions.std_navBar.defaultPadding*2);

    UIDiemsions.std_navBar.button_width = elementList[0].clientWidth;
    UIDiemsions.std_navBar.nav_width = document.getElementById("std_nav_bar").clientWidth;
    UIDiemsions.std_navBar.status_width = document.getElementById("std_statusBox").clientWidth;
    statusWidthHalved = UIDiemsions.std_navBar.status_width/2;
    UIDiemsions.std_navBar.menuContainer_placement = UIDiemsions.std_navBar.nav_height - (UIDiemsions.std_navBar.defaultPadding) ;

    nextLeftElementLoc = UIDiemsions.std_navBar.defaultPadding;
    nextRightElementLoc = UIDiemsions.std_navBar.defaultPadding;

    //Start of the spacing
    //This spaces the buttons bc those are what the rest of the spacing is based off of.
    for(i = 0; i < elementList.length; i++){
        elementList[i].style.top = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
        elementList[i].style.bottom = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
        if(!elementList[i].classList.contains("std_nav_alignRight")) {
            elementList[i].style.left = (nextLeftElementLoc).toString() + UIDiemsions.std_navBar.defaultUnit;
            UIDiemsions.std_navBar.button_placement.push((elementList[i].style.left).toString());
            nextLeftElementLoc += UIDiemsions.std_navBar.button_width + UIDiemsions.std_navBar.defaultPadding;
        }
        else {
            elementList[i].style.right = (nextRightElementLoc).toString() + UIDiemsions.std_navBar.defaultUnit;
            UIDiemsions.std_navBar.button_placement.push((elementList[i].style.right).toString());
            nextRightElementLoc += UIDiemsions.std_navBar.button_width + UIDiemsions.std_navBar.defaultPadding;
        }
    }

    //Sets all of the other things based off of what the
    UIDiemsions.std_navBar.menuContainer_width = nextLeftElementLoc-2;
    UIDiemsions.std_navBar.leftSpacer_width = (UIDiemsions.std_navBar.nav_width/2) - nextLeftElementLoc - statusWidthHalved - UIDiemsions.std_navBar.defaultPadding;
    UIDiemsions.std_navBar.rightSpacer_width = (UIDiemsions.std_navBar.nav_width/2) - nextRightElementLoc - statusWidthHalved - UIDiemsions.std_navBar.defaultPadding;

    UIDiemsions.std_navBar.status_placement = (UIDiemsions.std_navBar.nav_width/2) - (statusWidthHalved);
    UIDiemsions.std_navBar.spacer_placement.push(nextLeftElementLoc.toString() + UIDiemsions.std_navBar.defaultUnit);
    UIDiemsions.std_navBar.spacer_placement.push(nextRightElementLoc.toString() + UIDiemsions.std_navBar.defaultUnit);




///This can be cleaned up a little more
    document.getElementById("std_menu_container").style.width = UIDiemsions.std_navBar.menuContainer_width.toString()+UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("std_menu_container").style.top= UIDiemsions.std_navBar.menuContainer_placement.toString()+UIDiemsions.std_navBar.defaultUnit;

    document.getElementById("std_settings").style.width = UIDiemsions.std_navBar.menuContainer_width.toString()+UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("std_settings").style.top = UIDiemsions.std_navBar.menuContainer_placement.toString()+UIDiemsions.std_navBar.defaultUnit;

    document.getElementById("std_statusBox").style.top = UIDiemsions.std_navBar.defaultPadding.toString()+UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("std_statusBox").style.bottom = UIDiemsions.std_navBar.defaultPadding.toString()+UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("std_statusBox").style.left = UIDiemsions.std_navBar.status_placement.toString()+UIDiemsions.std_navBar.defaultUnit;

    document.getElementById("nav_spacer_left").style.width = (UIDiemsions.std_navBar.leftSpacer_width).toString() +UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("nav_spacer_left").style.top = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("nav_spacer_left").style.bottom = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("nav_spacer_left").style.left = (UIDiemsions.std_navBar.spacer_placement[0]).toString();


    document.getElementById("nav_spacer_right").style.width = (UIDiemsions.std_navBar.rightSpacer_width).toString() +UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("nav_spacer_right").style.top = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("nav_spacer_right").style.bottom = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
    document.getElementById("nav_spacer_right").style.right = (UIDiemsions.std_navBar.spacer_placement[1]).toString();


}
/*
* Hides things for mobile users.
* */
function mobileHider(){
    //this is a lot simpler than I thought it would be
    for (let el of document.querySelectorAll('.monarchAnimation_mobile_hidden')) el.hidden = true;
}




//------------------------------------------JQUERY----------------------------------------------------


