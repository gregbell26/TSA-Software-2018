/*
* Is the API to link the front end to the back end. This will simplify code development and stuff
* I might want to add an object that has all of the HTML elements. Then I can build the website's content off off of that
*
* This file is licensed under the Apache 2.0 license.
* That means that you can freely use and modify this code for all uses except for
*    commercial use provided this header is at the top of all files
* Copyright 2018-2019 Monarch TSA
*
* Author Gregory Bell
* Edited 4/6/19
* Rev 1
* */

/**
 * Sets the status box's status
 * @param dataToSet what data should be set
 * @param type if its an error or info
 */

function setStatus(dataToSet, type){
    var statusBoxText = document.getElementById("status_body");
    statusBoxText.textContent = dataToSet;
    //type will change the color of the text based on if its an error
    //I don't know if I care enough to implement it though and I need to take to the rest of the team
}


/**
 * this function will update the menu depending on what is selected.
 */
function updateMenu(){
    //do some neat shit
}


/**
 * When the user adds an element show that element on the UI
 * @param shapesList array of shapes that are being displayed
 * @param lightsList array of lights that are being displayed
 */
function updateElemntLists(shapesList, lightsList){
    var shapesMasterList; //the list that the user interacts with for shapes
    var lightsMasterList; //the list of lights that the user interacts with
    if(shapesList.length !== 0){
        for(var i = 0; i < shapesList.length; i++){
            //update the list of elements
        }
    }
    if(lightsList.length !== 0){
        for(var i =0; i<lightsList.length; i++){
            //update the list of elements
        }
    }
}








/*
-------------------------------JQUERY---------------------------------------------------
 */
$(document).ready(function () {
    //When the user resizes the program rerun UI spacer
    $(window).resize(function () {
        UISpacer();
    });
});

