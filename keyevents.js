onkeyup = function(e){
    e = e || event;
    var map = [];
    map[e.keyCode] = e.type == 'keyup';

}
onkeydown = function(e){
    e = e || event;
    var map = [];
    map[e.keyCode] = e.type == 'keydown';
    console.log(map);
    if(map[32] && mouseOnTimeline){
        console.log("keyDown")
        mouseOnTimeline = false;
        playAnimation(timelinePosition);
    }
}