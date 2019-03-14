/*
*
* This is the new style for the Animation program.
* Will include dark Mode Detector, icon spacer, Suicide notes, And More!
*
*
*
* */



/*
* Adds class to hide the welcome screen in a cool animation
* */
function hideWelcomeScreen(){
    document.getElementById("welcomeScreen").classList.add("ws_hide");
    document.getElementById("ws_body").classList.add("ws_hide");
}


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

function navMenuIconSpacer(paddingDistance){

}

function showMenu(menuToShow){

}
function darkModeLoader(arg){
    var cssToLoad=document.createElement("link");
    if(arg === "DEVLOCK"){
        cssToLoad.setAttribute("rel", "stylesheet");
        cssToLoad.setAttribute("type", "text/css");
        cssToLoad.setAttribute("href", "normalMode_Style.css");
        document.getElementsByTagName("head")[0].appendChild(cssToLoad);
    }

}