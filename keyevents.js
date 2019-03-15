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