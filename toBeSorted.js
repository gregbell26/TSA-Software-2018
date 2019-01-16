function toggleColorBorder(checked){//if checked is true turns on the border, if not then turns it off
    if(checked){
        document.getElementById('createColorBorder').style.display = 'inherit'
    }
    else{
        document.getElementById('createColorBorder').style.display = 'none'
    }

}

function changeSensitivity(change) {//Changes sensitivity to change
    mouseSensitivity = change;
}
function changeZoomSensitivity(change) {//Changes the Zoom sensitivity to change
    zoomAmount = 1 + change/2;
}

var xPosition = 10;//camera position x
var yPosition = 10;//camera position y
var zPosition = 10;//camera position z
var xStart = 0;//where the mouse started clicking x
var yStart = 0;//where the mouse started clicking y
var xPosStart = xPosition;//the cameras start position x
var yPosStart = yPosition;//the cameras start position y

var mouseDown = false;//if the right mouse button is pressed down
var zoomAmount = 1.5;// the zoom multiplier for one key press
var zoomSensitivity = 1.00;//the percent sensitivity
var mouseSensitivity = 1.00;//the percent sensitivity
var inAnimationWindow = 0;//is the mouse in the animation window


var zoom = 5;//the zoom on the cube
var zoomZ = 5;//zoom with only X and Z
$(document).on('mousedown',function(e){
    if(inAnimationWindow==1) {
        xStart = e.pageX;
        yStart = e.pageY;
        mouseDown = true;
    }
});
$(document).on('mouseup',function(e){
    if(e.pageX>=300 && e.pageY >=50) {
        mouseDown = false;
    }
});
$(document).on('keydown',function(e) {
    if (inAnimationWindow==1) {
        zoom = Math.pow((Math.pow(xPosition, 2) + Math.pow(yPosition, 2) + Math.pow(zPosition, 2)), .5);//zoom calc here
        if (e.key == "-")
            zoom *= zoomAmount;
        else if (e.key == "=")
            zoom /= zoomAmount;
        zoomZ = Math.cos(Math.asin(yPosition / zoom));
        var cameraRz;
        var cameraRy;
        if (xPosition !== 0)
            cameraRz = Math.atan(zPosition / xPosition);
    else if (zPosition > 0)
        cameraRz = Math.PI;
    else if (zPosition < 0)
        cameraRz = -Math.PI;
    if (xPosition < 0 && cameraRz > 0)
        cameraRz += Math.PI;
    else if (xPosition < 0 && cameraRz < 0)
        cameraRz -= Math.PI;

    if (xPosition !== 0 || zPosition !== 0)
        cameraRy = Math.atan((yPosition) / (Math.pow(Math.pow(xPosition, 2) + Math.pow(zPosition, 2), .5)));
    else if (yPosition > 0)
        cameraRy = Math.PI;
    else if (yPosition < 0)
        cameraRy = -Math.PI;

        yPosition = zoom * Math.sin(cameraRy);
        xPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.cos(cameraRz);
        zPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.sin(cameraRz);
}
});
$(document).on('mouseup',function(e){
    mouseDown=false;
});
$(document).ready(function(){
    $(document).on('mousemove', function(e){
        if(e.pageX>=300 && e.pageY >=50) {
            inAnimationWindow = 1;
        }
        if(mouseDown && inAnimationWindow==1){
            zoomZ = Math.pow(Math.pow(xPosition,2)+Math.pow(zPosition, 2),.5);
            zoom = Math.pow((Math.pow(zoomZ,2)+Math.pow(yPosition,2)),.5);//zoom calc here

            var MvX = mouseSensitivity*(e.pageX-xStart)/100;
            var MvY = mouseSensitivity*(e.pageY-yStart)/100;
            var cameraRz;
            var cameraRy;
            if(xPosition !== 0)
                cameraRz = Math.atan(zPosition/xPosition);
            else if(zPosition > 0)
                cameraRz = Math.PI;
            else if(zPosition < 0)
                cameraRz = -Math.PI;
            if(xPosition < 0 && cameraRz > 0)
                cameraRz += Math.PI;
            else if(xPosition < 0 && cameraRz < 0)
                cameraRz -= Math.PI;



            if(xPosition !== 0 || zPosition !== 0)
                cameraRy = Math.atan((yPosition)/zoomZ);
            else if(yPosition > 0)
                cameraRy = Math.PI;
            else if(yPosition < 0)
                cameraRy = -Math.PI;

            cameraRz += MvX;
            cameraRy += MvY;

            yPosition = zoom * Math.sin(cameraRy);
            xPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.cos(cameraRz);
            zPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.sin(cameraRz);


            if(e.pageX>=300 && e.pageY >=50) {
                xStart = e.pageX;
                yStart = e.pageY;
            }
        }
    });
});
