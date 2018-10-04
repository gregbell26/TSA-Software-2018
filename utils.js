//jordan's code

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function changeColor(value){
    shapes[selectedShape].material.color.set(value);
}

function rgbToHex (num) {
    var hex = Number(num).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};


