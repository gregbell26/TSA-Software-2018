function toggleColorBorder(checked){
    if(checked){
        document.getElementById('createColorBorder').style.display = 'inherit'
    }
    else{
        document.getElementById('createColorBorder').style.display = 'none'
    }

}

var xStart = 0;
var yStart = 0;
var xPosStart = xPosition;
var yPosStart = yPosition;
var mouseDown = false;
$(document).on('mousedown',function(e){
    console.log('mouse down')
    xStart = e.pageX;
    yStart = e.pageY;
    console.log(xStart);
    console.log(yStart);
    mouseDown = true;
})
$(document).on('mouseup',function(e){
    console.log('mouse up')
    mouseDown=false;
})
$(document).ready(function(){
    $(document).on('mousemove', function(e){
        console.log('mousemove')
        if(mouseDown){
            console.log(true);
            xPosition = xPosStart - (e.pageX-xStart)/10;
            yPosition = yPosStart - (e.pageY-yStart)/10;
        }
    });
});