/*
This file is licensed under the Apache 2.0 license.
That means that you can freely use and modify this code for all uses except for
    commercial use provided this header is at the top of all files
Copyright 2018-2019 Monarch TSA

 */

onkeyup = function(e){
    e = e || event;
    var map = [];
    map[e.keyCode] = e.type == 'keyup';

}
onkeydown = function(e){
    e = e || event;
    var map = [];
    map[e.keyCode] = e.type == 'keydown';
    if(map[32]){
        mouseOnTimeline = false;
        playAnimation(timelinePosition);
        console.log(timelinePosition);
    }
}