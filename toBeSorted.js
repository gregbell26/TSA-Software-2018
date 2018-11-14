var xPosition = 10;
var yPosition = 10;
var zPosition = 10;
var xStart = 0;
var yStart = 0;
var xPosStart = xPosition;
var yPosStart = yPosition;
var mouseDown = false;
$(document).on('mousedown',function(e){
    if(e.pageX>=300 && e.pageY >=50) {
        xStart = e.pageX;
        yStart = e.pageY;
        mouseDown = true;
    }
})
$(document).on('mouseup',function(e){
    mouseDown=false;
})
$(document).ready(function(){
    $(document).on('mousemove', function(e){
        if(mouseDown){
            xPosition = xPosStart - (e.pageX-xStart)/10;
            yPosition = yPosStart - (e.pageY-yStart)/10;
        }
    });
});