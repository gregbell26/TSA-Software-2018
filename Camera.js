


function changeSensitivity(change) {//Changes sensitivity to change
    mouseSensitivity = change;
}
function changeZoomSensitivity(change) {//Changes the Zoom sensitivity to change
    zoomAmount = 1 + change/2;
}

$(document).on('mousedown',function(e){
    if(inAnimationWindow==1) {
        xStart = e.pageX;
        yStart = e.pageY;
        mouseDown = true;
    }
});
$(document).on('change',function(e){
    if(isNaN(yPosition))
        yPosition = 0;
    if(isNaN(xPosition))
        xPosition = 0;
    if(isNaN(zPosition))
        zPosition = 0;
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

        if(isNaN(yPosition))
            yPosition = 0;
        if(isNaN(xPosition))
            xPosition = 0;
        if(isNaN(zPosition))
            zPosition = 0;
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

            if(isNaN(yPosition))
                yPosition = 0;
            if(isNaN(xPosition))
                xPosition = 0;
            if(isNaN(zPosition))
                zPosition = 0;

            if(e.pageX>=300 && e.pageY >=50) {
                xStart = e.pageX;
                yStart = e.pageY;
            }
        }
    });
});