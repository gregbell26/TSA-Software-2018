/*
This file contains all of the javascript for the new UI for Monarch Animation 2019 Edition

This file is licensed under the Apache 2.0 license.
That means that you can freely use and modify this code for all uses except for
    commercial use provided this header is at the top of all files
Copyright 2018-2019 Monarch TSA

Author Gregory Bell
Edited 4/17/19
Rev 20

 */


//----------------------------CLASS-ADDERS-----------------------------------------
/*
* Adds class to hide the welcome screen in a cool animation
* After it does that is starts all of the needed functions for the program.
* */
async function initMainUI(){
    getId("std_ws_container").classList.add("ws_hide");
    getId("ws_body").classList.add("ws_hide");
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
  
    //getId("std_menu_container").style.display = "inherit";
    if(menuToShow==='menu_newShapes' && selectedShape!==-1 && showingLight){
       addfortutorial("light_menu");
    }

    if(menuToShow==='menu_newShapes' && selectedShape!==-1 && !showingLight){
       addfortutorial("shape_menu");
    }
    if(activeMenu !== "init") {
        getId(activeMenu).classList.remove("menu_show");
        getId(activeMenu).classList.add("menu_hidden");
    }

    // if(activeMenu ==="menu_newShapes"){
    //     getId("element_Information").style.display = 'none';
    //     getId('currentEditing_type').style.display = 'none';
    // }

    getId(menuToShow).classList.remove("menu_hidden");
    getId(menuToShow).classList.add("menu_show");

    activeMenu = menuToShow;
}

function timelineButtonToggle(buttonToToggle){
    if(getId(buttonToToggle).classList.contains("timeline_buttonToggled")) {
        getId(buttonToToggle).classList.remove("timeline_buttonToggled");

    }
    else{
        getId(buttonToToggle).classList.add("timeline_buttonToggled");
    }
    iconSwapper(buttonToToggle, "swap");
}

function settingsToggle(){
    if(getId("std_settings").classList.contains("settings_hide")){
        getId("std_settings").classList.remove("settings_hide");
        getId("settings_menu").classList.remove("settings_hide");
        getId("std_settings").classList.add("settings_show");
        getId("settings_menu").classList.add("settings_show");
    }
    else{
        getId("std_settings").classList.remove("settings_show");
        getId("settings_menu").classList.remove("settings_show");
        getId("std_settings").classList.add("settings_hide");
        getId("settings_menu").classList.add("settings_hide");
    }
}






//----------------------------STYLE-FUNCTIONS--------------------------------------------------
function iconSwapper(target, mode){
    if(target ==="all"){
        if(mode === "darkMode"){
            for (let el of document.querySelectorAll('.std_icon_normal')) el.style.display = "none";
            for (let el of document.querySelectorAll('.std_icon_dark')) el.style.display = "block";
        }
        else {
            for (let el of document.querySelectorAll('.std_icon_dark')) el.style.display = "none";
            for (let el of document.querySelectorAll('.std_icon_normal')) el.style.display = "block";
        }
    }
    //if we are swapping a specific one do this
    else{
        if(mode === "swap"){
            if(getId(target).children[0].style.display === "block"){
                getId(target).children[0].style.display = "none";
                getId(target).children[1].style.display = "block";

            }
            else if (getId(target).children[1].style.display === "block"){
                getId(target).children[1].style.display = "none";
                getId(target).children[0].style.display = "block";

            }
        }
    }

}

/*
* Dynamically loads style sheets and allows for different themes to be easily created
* */
var stylesheetLoaded = false;
var defautStyle = true;
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
        iconSwapper("all", "normalMode")
    }

    else if (stylesheetName ==="darkMode"){
        cssToLoad.setAttribute("href", "./style/darkMode_Style.css");
        validStyleSheet =true;
        iconSwapper("all", "darkMode")
    }

    else if(stylesheetName === "amoledMode"){
        cssToLoad.setAttribute("href", "./style/amoledMode_Style.css");
        validStyleSheet =true;
        iconSwapper("all", "darkMode")
    }
    else if(stylesheetName ==="memeMode"){
        cssToLoad.setAttribute("href", "./style/memeMode_style.css");
        validStyleSheet =true;
        iconSwapper("all", "normalMode")
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
    UIDiemsions.std_navBar.nav_height = getId("std_nav_bar").clientHeight;
    UIDiemsions.std_navBar.element_height = UIDiemsions.std_navBar.nav_height - (UIDiemsions.std_navBar.defaultPadding*2);

    UIDiemsions.std_navBar.button_width = elementList[0].clientWidth;
    UIDiemsions.std_navBar.nav_width = getId("std_nav_bar").clientWidth;
    UIDiemsions.std_navBar.status_width = getId("std_statusBox").clientWidth;
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

    //Sets all of the other things based off of what the for loop set
    UIDiemsions.std_navBar.menuContainer_width = nextLeftElementLoc-2;
    UIDiemsions.std_navBar.leftSpacer_width = (UIDiemsions.std_navBar.nav_width/2) - nextLeftElementLoc - statusWidthHalved - UIDiemsions.std_navBar.defaultPadding;
    UIDiemsions.std_navBar.rightSpacer_width = (UIDiemsions.std_navBar.nav_width/2) - nextRightElementLoc - statusWidthHalved - UIDiemsions.std_navBar.defaultPadding;

    UIDiemsions.std_navBar.status_placement = (UIDiemsions.std_navBar.nav_width/2) - (statusWidthHalved);
    UIDiemsions.std_navBar.spacer_placement.push(nextLeftElementLoc.toString() + UIDiemsions.std_navBar.defaultUnit);
    UIDiemsions.std_navBar.spacer_placement.push(nextRightElementLoc.toString() + UIDiemsions.std_navBar.defaultUnit);


    // if(window.innerWidth<=500 || isMobile()){
    //     UIDiemsions.std_navBar.menuContainer_width = window.innerWidth;
    //     getId("std_statusBox").style.display = "none";
    // }
    // else{
    //     getId("std_statusBox").style.display = "inherit";
    // }
///This can be cleaned up a little more
    getId("std_menu_container").style.width = UIDiemsions.std_navBar.menuContainer_width.toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("std_menu_container").style.top= UIDiemsions.std_navBar.menuContainer_placement.toString()+UIDiemsions.std_navBar.defaultUnit;

    getId("std_settings").style.width = getId("std_menu_container").style.width;
    getId("std_settings").style.top = getId("std_menu_container").style.top;

    getId("std_statusBox").style.top = UIDiemsions.std_navBar.defaultPadding.toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("std_statusBox").style.bottom = UIDiemsions.std_navBar.defaultPadding.toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("std_statusBox").style.left = UIDiemsions.std_navBar.status_placement.toString()+UIDiemsions.std_navBar.defaultUnit;

    getId("nav_spacer_left").style.width = (UIDiemsions.std_navBar.leftSpacer_width).toString() +UIDiemsions.std_navBar.defaultUnit;
    getId("nav_spacer_left").style.top = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("nav_spacer_left").style.bottom = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("nav_spacer_left").style.left = (UIDiemsions.std_navBar.spacer_placement[0]).toString();

    
    getId("nav_spacer_right").style.width = (UIDiemsions.std_navBar.rightSpacer_width).toString() +UIDiemsions.std_navBar.defaultUnit;
    getId("nav_spacer_right").style.top = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("nav_spacer_right").style.bottom = (UIDiemsions.std_navBar.defaultPadding).toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("nav_spacer_right").style.right = (UIDiemsions.std_navBar.spacer_placement[1]).toString();
    UIDiemsions.std_body.body_height = getId("std_body").clientHeight;
    UIDiemsions.std_body.body_width = getId("std_body").clientWidth;
    UIDiemsions.std_body.renderer_top = UIDiemsions.std_navBar.nav_height;
    UIDiemsions.std_body.renderer_left = UIDiemsions.std_navBar.menuContainer_width;
    // if(window.innerWidth<=500 || isMobile()){
    //     UIDiemsions.std_body.renderer_left = 0;
    // }
    UIDiemsions.std_body.renderer_height = UIDiemsions.std_body.body_height- UIDiemsions.std_navBar.nav_height - UIDiemsions.std_timeline.timeline_height;
    UIDiemsions.std_body.renderer_width = UIDiemsions.std_body.body_width - UIDiemsions.std_navBar.menuContainer_width;

    getId("animationEngine_renderArea").style.top =(UIDiemsions.std_body.renderer_top).toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("animationEngine_renderArea").style.left =(UIDiemsions.std_body.renderer_left).toString()+UIDiemsions.std_navBar.defaultUnit;

    getId("std_menu_container").style.height =
        (UIDiemsions.std_body.body_height - UIDiemsions.std_navBar.nav_height - UIDiemsions.std_timeline.timeline_height).toString() + UIDiemsions.std_navBar.defaultUnit;

    getId("std_settings").style.height = getId("std_menu_container").style.height;

}
/*
* Hides things for mobile users.
* */
function mobileHider(){
    //this is a lot simpler than I thought it would be
    for (let el of document.querySelectorAll('.std_mobile_hidden')) el.hidden = true;
}


/*
-------------------------------JQUERY---------------------------------------------------
 */
$(document).ready(function () {
    getId("std_statusBox").children[0].innerHTML = "READY";
    getId("std_statusBox").children[1].innerHTML = settings.version;


});

//When the user resizes the program rerun UI spacer
$(window).resize(function () {
    UISpacer();
    onWindowResize();
});

function mobileHideSideBar(){
    getId("std_menu_container").style.display = "none";
}

