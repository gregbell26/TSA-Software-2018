function toggleColorBorder(checked){//if checked is true turns on the border, if not then turns it off
    if(checked){
        document.getElementById('createColorBorder').style.display = 'inherit'
    }
    else{
        document.getElementById('createColorBorder').style.display = 'none'
    }

}

var xPosition = 10;//camera position x
var yPosition = 10;//camera position y
var zPosition = 10;//camera position z
var xStart = 0;//
var yStart = 0;//
var xPosStart = xPosition;//the cameras start position x
var yPosStart = yPosition;//the cameras start position y
//no x?
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
