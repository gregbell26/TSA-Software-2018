xCLook = keyFrames[a].xCLook + (keyFrames[a+1].xCLook - keyFrames[a].xCLook) / keyFrames[a].duration * timingCounter;
yCLook = keyFrames[a].yCLook + (keyFrames[a+1].yCLook - keyFrames[a].yCLook) / keyFrames[a].duration * timingCounter;
zCLook = keyFrames[a].zCLook + (keyFrames[a+1].zCLook - keyFrames[a].zCLook) / keyFrames[a].duration * timingCounter;
xCCenter = keyFrames[a].xCCenter + (keyFrames[a+1].xCCenter - keyFrames[a].xCCenter) / keyFrames[a].duration * timingCounter;
yCCenter = keyFrames[a].yCCenter + (keyFrames[a+1].yCCenter - keyFrames[a].yCCenter) / keyFrames[a].duration * timingCounter;
zCCenter = keyFrames[a].zCCenter + (keyFrames[a+1].zCCenter - keyFrames[a].zCCenter) / keyFrames[a].duration * timingCounter;
if(timingCounter <= 10 || !animationRunning) {//this stuff only executes the first iteration or through the timeline
    if(isNaN(keyFrames[0].xCLook))//for legacy builds
        keyFrames[0].xCLook = 0;
    if(isNaN(keyFrames[0].yCLook))
        keyFrames[0].yCLook = 0;
    if(isNaN(keyFrames[0].zCLook))
        keyFrames[0].zCLook = 0;
    if(isNaN(keyFrames[1].xCLook))
        keyFrames[1].xCLook = 0;
    if(isNaN(keyFrames[1].yCLook))
        keyFrames[1].yCLook = 0;
    if(isNaN(keyFrames[1].zCLook))
        keyFrames[1].zCLook = 0;

    zoom1Zv = Math.pow(Math.pow(keyFrames[a].xCLook - xPosition, 2) + Math.pow(keyFrames[a].zCLook - zPosition, 2), .5);
    zoom1v = Math.pow((Math.pow(zoom1Zv, 2) + Math.pow(keyFrames[a].yCLook - yPosition, 2)), .5);//zoom1 calc here
    console.log("f1zoomZ " + zoom1Zv);
    console.log("f1zoom " + zoom1v);
    Rz1v = 0;
    Ry1v = 0;
    if (keyFrames[a].xCLook - xPosition !== 0)
        Rz1v = Math.atan((keyFrames[a].zCLook - zPosition) / (keyFrames[a].xCLook - xPosition));
    else if (keyFrames[a].zCLook - zPosition > 0)
        Rz1v = Math.PI;
    else if (keyFrames[a].zCLook - zPosition < 0)
        Rz1v = -Math.PI;

    if (xPosition < 0 && Rz1v < 0)
        Rz1v += Math.PI;
    else if (xPosition < 0 && Rz1v > 0)
        Rz1v -= Math.PI;

    if (keyFrames[a].xCLook - xPosition !== 0 || zPosition -  keyFrames[a].zCLook !== 0)
        Ry1v = Math.atan((keyFrames[a].yCLook - yPosition) / zoom1Zv);
    else if (keyFrames[a].yCLook - yPosition > 0)
        Ry1v = Math.PI;
    else if (keyFrames[a].yCLook - yPosition < 0)
        Ry1v = -Math.PI;

    zoom2Zv = Math.pow(Math.pow(keyFrames[a+1].xCLook - xPosition, 2) + Math.pow(keyFrames[a+1].zCLook - zPosition, 2), .5);
    zoom2v = Math.pow((Math.pow(zoom2Zv, 2) + Math.pow(yPosition - keyFrames[a+1].yCLook, 2)), .5);//zoom1 calc here
    console.log("f2zoomZ " + zoom2Zv);
    console.log("f2zoom " + zoom2v);
    Rz2v = 0;
    Ry2v = 0;
    if (keyFrames[a+1].xCLook - xPosition !== 0)
        Rz2v = Math.atan((keyFrames[a+1].zCLook - zPosition) / (keyFrames[a+1].xCLook - xPosition));
    else if (keyFrames[a+1].zCLook - zPosition > 0)
        Rz2v = Math.PI;
    else if (keyFrames[a+1].zCLook - zPosition < 0)
        Rz2v = -Math.PI;

    if (keyFrames[a + 1].xPosition < 0 && Rz2v < 0)
        Rz2v += Math.PI;
    else if (keyFrames[a + 1].xPosition < 0 && Rz2v > 0)
        Rz2v -= Math.PI;

    if (keyFrames[a+1].xCLook - xPosition !== 0 || keyFrames[a+1].zCLook - zPosition !== 0)
        Ry2v = Math.atan((keyFrames[a + 1].yCLook - yPosition) / zoom2Zv);
    else if (keyFrames[a+1].yCLook - yPosition > 0)
        Ry2v = Math.PI;
    else if (keyFrames[a+1].yCLook - yPosition < 0)
        Ry2v = -Math.PI;

    console.log("f1RY " + Ry1v/Math.PI*180+"°");
    console.log("f2RY " + Ry2v/Math.PI*180+"°");
    console.log("f1RZ " + Rz1v/Math.PI*180+"°");
    console.log("f2RZ " + Rz2v/Math.PI*180+"°");

    MvXv = Rz2v - Rz1v;
    MvYv = Ry2v - Ry1v;
    zoomChangev = zoom2v - zoom1v;
    zoomZChangev = zoom2Zv - zoom1Zv;
    console.log("moving zoom " + zoomChangev);
    console.log("moving zoomZ " + zoomZChangev);
    console.log("moving X " + MvXv/Math.PI*180+"°");
    console.log("moving Y " + MvYv/Math.PI*180+"°");
}
yCLook = (zoom1v  +  zoomChangev/keyFrames[a].duration * timingCounter) * (Math.sin(Ry1v+MvYv/keyFrames[a].duration * timingCounter))+yPosition;
xCLook = -((zoom1Zv + zoomZChangev/keyFrames[a].duration * timingCounter) * (Math.cos(Rz1v+MvXv/keyFrames[a].duration * timingCounter))-xPosition);
zCLook = -((zoom1Zv + zoomZChangev/keyFrames[a].duration * timingCounter) * (Math.sin(Rz1v+MvXv/keyFrames[a].duration * timingCounter))-zPosition);
console.log(xCLook);
console.log(yCLook);
console.log(zCLook);
circleCameraRotation = keyFrames[a+1].circleCameraRotation;