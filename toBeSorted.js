function toggleColorBorder(checked){
    if(checked){
        document.getElementById('createColorBorder').style.display = 'inherit'
    }
    else{
        document.getElementById('createColorBorder').style.display = 'none'
    }

}


var screen = document.getElementById("mainWindow");
screen.onmousedown = function(event){
    function dragScreen(event){
        xPosition += movementX;
        yPosition += movementY;
    }

    document.addEventListener('mousemove', dragScreen);

    ball.onmouseup = function() {
        document.removeEventListener('mousemove', dragScreen);
        ball.onmouseup = null;
    };
}