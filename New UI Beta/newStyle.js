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

}s


//---------------------------------PSEUDO-FUNCTIONS-----------------------------------------
/*
* Pseudo function for populating list with save names
* Need to tie in with saveSubSystem
* */
function loadSaveNames() {
    var loadSelector = document.getElementById("ws_loadMenu");
    var options = ["3","32", "fdghjkl", "fghytfvbnm", "BULL"];
// Populate list with options:
    var opt;
    for (var i = 0; i < options.length; i++) {
        opt = options[i];
        loadSelector.innerHTML += " <option onclick=\'saveSubSystem.setSaveToLoad = \" " + opt + " \"; hideWelcomeScreen();\' > " + opt + "</option>";
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
/*
* Hides things for mobile users.
* */
function mobileHider(){

}

