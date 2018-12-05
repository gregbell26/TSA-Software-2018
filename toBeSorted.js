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
var xStart = 0;//where the mouse started clicking x
var yStart = 0;//where the mouse started clicking y
var xPosStart = xPosition;//the cameras start position x
var yPosStart = yPosition;//the cameras start position y

var mouseDown = false;//if the right mouse button is pressed down
var mouseSensitivity = 100;//the percent sensitivity
var zoom = 5;//the zoom on the cube
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
            var MvX = mouseSensitivity*(e.pageX-xStart)/100;
            var MvY = mouseSensitivity*(e.pageY-yStart)/100;
            var cameraRx;
            var cameraRy;
            if(xPostiton != 0)
                cameraRx = atan(zPosition/xPosition);
            else if(zPosition > 0)
                cameraRx = Math.PI;
            else if(zPosition < 0)
                cameraRx = -Math.PI;
                
            if(xPostion < 0 && cameraRx > 0)
                cameraRx += Math.PI;
            else if(xPostion < 0 && cameraRx < 0)
                cameraRx -= Math.PI;
            
            if(xPostiton != 0)
                cameraRy = atan(yPosition/xPosition);
            else if(yPosition > 0)
                cameraRy = Math.PI;
            else if(yPosition < 0)
                cameraRy = -Math.PI;
                
            if(xPostion < 0 && cameraRy > 0)
                cameraRy += Math.PI;
            else if(xPostion < 0 && cameraRy < 0)
                cameraRy -= Math.PI;
            
            xPosition = xPosStart - (e.pageX-xStart)/10;
            yPosition = yPosStart - (e.pageY-yStart)/10;
        }
    });
});
