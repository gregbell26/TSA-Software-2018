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
var mouseSensitivity = 1;//the percent sensitivity
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
            zoom = Math.pow((Math.pow(xPosition,2)+Math.pow(yPosition,2)+Math.pow(zPosition,2)),.5);//zoom calc here
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
            
            if(xPosition !== 0 && zPosition !== 0)
                cameraRy = Math.atan(yPosition/(Math.pow(Math.pow(xPosition,2)+Math.pow(xPosition,2),.5)));
            else if(yPosition > 0)
                cameraRy = Math.PI;
            else if(yPosition < 0)
                cameraRy = -Math.PI;
            
            cameraRz += MvX;
            cameraRy += MvY;
            
            xPosition = zoom * Math.cos(cameraRz);
            yPosition = zoom * Math.sin(cameraRy);
            zPosition = zoom * Math.sin(cameraRz);

            if(e.pageX>=300 && e.pageY >=50) {
                xStart = e.pageX;
                yStart = e.pageY;
                mouseDown = true;
            }
        }
    });
});
