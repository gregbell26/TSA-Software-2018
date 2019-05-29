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
    getId("std_menu_container").style.display = "inherit";
    if(activeMenu !== "init") {
        getId(activeMenu).classList.remove("menu_show");
        getId(activeMenu).classList.add("menu_hidden");
    }

    getId(menuToShow).classList.remove("menu_hidden");
    getId(menuToShow).classList.add("menu_show");

    activeMenu = menuToShow;
}

function hideSubMenu(subMenu){
    getId(subMenu).hidden =true;
}

function showSubMenu(subMenu){
    getId(subMenu).hidden = false;
}

function timelineButtonToggle(buttonToToggle){
    if(getId(buttonToToggle).classList.contains("timeline_buttonToggled"))
        getId(buttonToToggle).classList.remove("timeline_buttonToggled");
    else{
        getId(buttonToToggle).classList.add("timeline_buttonToggled");
    }
}

function timelineMasterToggle(mode){
    if(mode === "show")
        getId("std_timeline").classList.add("timeline_show");
    else if (mode === "hide")
        getId("std_timeline").classList.remove("timeline_show");

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

var shownPopUp = "init";
function showPopUp(popUpToShow, popUpContent, otherText, mode){
    getId("std_popUp").classList.add("popUp_show");
    getId(popUpToShow).classList.add("popUp_show");
    getId(popUpToShow).children.item(0).textContent = popUpContent;
    getId(popUpToShow).children.item(1).children.item(3).innerHTML = otherText;
    getId(popUpToShow).children.item(2).setAttribute('onclick', "popUpAction("+mode+"); hidePopUp();");

    shownPopUp = popUpToShow;
}
function popUpAction(num){
    if(num==0){
        saveSubSystem.setFileName(getPopUpInput(), true);
    }
    else if(num==1){
        newShape("text",0,0,0,0,0,0,'#FF0000','#000000',getPopUpInput());
        saveSubSystem.addText(getPopUpInput());
    }
    getId(getId(shownPopUp).children.item(1).children.item(0).value = "");
}

function getPopUpInput() {
    if(shownPopUp !== "init" && shownPopUp.includes("input")){
        return getId(shownPopUp).children.item(1).children.item(0).value;
    }
    return "";
}

function hidePopUp() {
    getId(shownPopUp).classList.remove("popUp_show");
    getId("std_popUp").classList.remove("popUp_show");
}


//---------------------------------PSEUDO-FUNCTIONS-----------------------------------------
/*
* Pseudo function for populating list with save names
* Need to tie in with saveSubSystem
* */
function loadSaveNames() {
    var loadSelector = getId("ws_loadMenu");
    var options = ["3","32", "fdghjkl", "fghytfvbnm", "BULL"];
// Populate list with options
    var opt;
    for (var i = 0; i < options.length; i++) {
        opt = options[i];
        loadSelector.innerHTML += " <option onclick=\'saveSubSystem.setSaveToLoad = (\" " + opt + " \"); initMainUI();\' > " + opt + "</option>";
    }
}



//----------------------------STYLE-FUNCTIONS--------------------------------------------------
function iconSwapper(target, mode){
    // if(mode !== "darkMode" || mode !=="normalMode")//early break case
    //     return -1;

    if(target ==="all"){
        if(mode === "darkMode"){
            for (let el of document.querySelectorAll('.std_icon_normal')) el.style.display = "none";
            for (let el of document.querySelectorAll('.std_icon_dark')) el.style.display = "block";
            return 1;
        }
        else {
            for (let el of document.querySelectorAll('.std_icon_dark')) el.style.display = "none";
            for (let el of document.querySelectorAll('.std_icon_normal')) el.style.display = "block";
            return 2;
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


    if(window.innerWidth<=500 || isMobile()){
        UIDiemsions.std_navBar.menuContainer_width = window.innerWidth;
        getId("std_statusBox").style.display = "none";
    }
    else{
        getId("std_statusBox").style.display = "inherit";
    }
///This can be cleaned up a little more
    getId("std_menu_container").style.width = UIDiemsions.std_navBar.menuContainer_width.toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("std_menu_container").style.top= UIDiemsions.std_navBar.menuContainer_placement.toString()+UIDiemsions.std_navBar.defaultUnit;

    getId("std_settings").style.width = UIDiemsions.std_navBar.menuContainer_width.toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("std_settings").style.top = UIDiemsions.std_navBar.menuContainer_placement.toString()+UIDiemsions.std_navBar.defaultUnit;

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
    if(window.innerWidth<=500 || isMobile()){
        UIDiemsions.std_body.renderer_left = 0;
    }
    UIDiemsions.std_body.renderer_height = UIDiemsions.std_body.body_height- UIDiemsions.std_navBar.nav_height;
    UIDiemsions.std_body.renderer_width = UIDiemsions.std_body.body_width - UIDiemsions.std_navBar.menuContainer_width;

    getId("animationEngine_renderArea").style.top =(UIDiemsions.std_body.renderer_top).toString()+UIDiemsions.std_navBar.defaultUnit;
    getId("animationEngine_renderArea").style.left =(UIDiemsions.std_body.renderer_left).toString()+UIDiemsions.std_navBar.defaultUnit;
    // getId("animationEngine_renderArea").style.height =(UIDiemsions.std_body.renderer_height).toString()+UIDiemsions.std_navBar.defaultUnit;
    // getId("animationEngine_renderArea").style.width =(UIDiemsions.std_body.renderer_width).toString()+UIDiemsions.std_navBar.defaultUnit;



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

    //When the user resizes the program rerun UI spacer
    $(window).resize(function () {
        UISpacer();
        onWindowResize();
    });
});

function mobileHideSideBar(){
    getId("std_menu_container").style.display = "none";
}

function isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return true;
    }
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        return true;
    }
    return false;
}