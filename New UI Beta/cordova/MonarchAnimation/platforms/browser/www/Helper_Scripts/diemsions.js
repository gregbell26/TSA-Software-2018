/*
* This file contains all of the important diemsions of the everything after UI spacers runs to allow for better
* scaling which we all know makes everything better.
*
* This file is licensed under the Apache 2.0 license.
* That means that you can freely use and modify this code for all uses except for
*    commercial use provided this header is at the top of all files
* Copyright 2018-2019 Monarch TSA
*
*
* list of dependent files:
* newStyle.js
*
*
* Author: Gregory Bell
* Edited 3/26/19
* rev 1
* */


//This object is a god object. All diemsions will be set from it.
//in other words
//DO NOT EDIT IT OR EVERYTHING WILL BREAK.

//Yeah I like PTSD too. That's why I'm not only using javascript objects, but NESTED javascript objects!
var UIDiemsions = {
    //Diemsions for everything in and relative to the nav bar
    std_navBar : {
        defaultPadding : 2,
        defaultUnit : "px",
        nav_height : 0,//the height of the navigation bar
        element_height : 0,//the height of all of the elements on the navigation bar

        button_width : 0,//the width of the button
        status_width : 0,//the width of the status box
        nav_width : 0,//the width of the navigation bar
        menuContainer_width : 0,//the width of the menu container
        leftSpacer_width : 0,
        rightSpacer_width : 0,

        //The placement for the elements
        //Will always be the left value expect for the settings button and right spacer.
        button_placement : [],//array for each element pos set relative to the one in newStyle.js
        spacer_placement : [],//array for the 2 spacers 0 = sp1 1 = sp2
        status_placement : 0, //the left value for the status box
        menuContainer_placement : 0,



    },



};




