if(keyFrames[a].shapes[i].circleRotation) {
    if (timingCounter <= 10 || !animationRunning) {//this stuff only executes the first iteration or through the timeline
        if (isNaN(keyFrames[0].shapes[i].position.x))//for legacy builds
            keyFrames[0].shapes[i].position.x = 0;
        if (isNaN(keyFrames[0].shapes[i].position.y))
            keyFrames[0].shapes[i].position.y = 0;
        if (isNaN(keyFrames[0].shapes[i].position.z))
            keyFrames[0].shapes[i].position.z = 0;
        if (isNaN(keyFrames[1].shapes[i].position.x))
            keyFrames[1].shapes[i].position.x = 0;
        if (isNaN(keyFrames[1].shapes[i].position.y))
            keyFrames[1].shapes[i].position.y = 0;
        if (isNaN(keyFrames[1].shapes[i].position.z))
            keyFrames[1].shapes[i].position.z = 0;

        zoom1Zv = Math.pow(Math.pow(keyFrames[a].shapes[i].position.x - keyFrames[a].shapes[i].rCenter.x, 2) + Math.pow(keyFrames[a].shapes[i].position.z - keyFrames[a].keyFrames[a].shapes[i].rCenter.z, 2), .5);
        zoom1v = Math.pow((Math.pow(zoom1Zv, 2) + Math.pow(keyFrames[a].shapes[i].position.y - keyFrames[a].keyFrames[a].shapes[i].rCenter.y, 2)), .5);//zoom1 calc here
        console.log("f1zoomZ " + zoom1Zv);
        console.log("f1zoom " + zoom1v);
        Rz1v = 0;
        Ry1v = 0;
        if (keyFrames[a].shapes[i].position.x - keyFrames[a].shapes[i].rCenter.x !== 0)
            Rz1v = Math.atan((keyFrames[a].shapes[i].position.z - keyFrames[a].keyFrames[a].shapes[i].rCenter.z) / (keyFrames[a].shapes[i].position.x - keyFrames[a].shapes[i].rCenter.x));
        else if (keyFrames[a].shapes[i].position.z - keyFrames[a].keyFrames[a].shapes[i].rCenter.z > 0)
            Rz1v = Math.PI;
        else if (keyFrames[a].shapes[i].position.z - keyFrames[a].keyFrames[a].shapes[i].rCenter.z < 0)
            Rz1v = -Math.PI;

        if (keyFrames[a].shapes[i].rCenter.x < 0 && Rz1v < 0)
            Rz1 += Math.PI;
        else if (keyFrames[a].shapes[i].rCenter.x < 0 && Rz1v > 0)
            Rz1 -= Math.PI;

        if (keyFrames[a].shapes[i].position.x - keyFrames[a].shapes[i].rCenter.x !== 0 || keyFrames[a].keyFrames[a].shapes[i].rCenter.z - keyFrames[a].shapes[i].position.z !== 0)
            Ry1v = Math.atan((keyFrames[a].shapes[i].position.y - keyFrames[a].keyFrames[a].shapes[i].rCenter.y) / zoom1Zv);
        else if (keyFrames[a].shapes[i].position.y - keyFrames[a].keyFrames[a].shapes[i].rCenter.y > 0)
            Ry1v = Math.PI;
        else if (keyFrames[a].shapes[i].position.y - keyFrames[a].keyFrames[a].shapes[i].rCenter.y < 0)
            Ry1v = -Math.PI;

        zoom2Zv = Math.pow(Math.pow(keyFrames[a + 1].shapes[i].position.x - keyFrames[a].shapes[i].rCenter.x, 2) + Math.pow(keyFrames[a + 1].shapes[i].position.z - keyFrames[a].keyFrames[a].shapes[i].rCenter.z, 2), .5);
        zoom2v = Math.pow((Math.pow(zoom2Zv, 2) + Math.pow(keyFrames[a].keyFrames[a].shapes[i].rCenter.y - keyFrames[a + 1].shapes[i].position.y, 2)), .5);//zoom1 calc here
        console.log("f2zoomZ " + zoom2Zv);
        console.log("f2zoom " + zoom2v);
        Rz2v = 0;
        Ry2v = 0;
        if (keyFrames[a + 1].shapes[i].position.x - keyFrames[a].shapes[i].rCenter.x !== 0)
            Rz2v = Math.atan((keyFrames[a + 1].shapes[i].position.z - keyFrames[a].keyFrames[a].shapes[i].rCenter.z) / (keyFrames[a + 1].shapes[i].position.x - keyFrames[a].shapes[i].rCenter.x));
        else if (keyFrames[a + 1].shapes[i].position.z - keyFrames[a].keyFrames[a].shapes[i].rCenter.z > 0)
            Rz2v = Math.PI;
        else if (keyFrames[a + 1].shapes[i].position.z - keyFrames[a].keyFrames[a].shapes[i].rCenter.z < 0)
            Rz2v = -Math.PI;

        if (keyFrames[a + 1].shapes[i].rCenter.x < 0 && Rz2 < 0)
            Rz2 += Math.PI;
        else if (keyFrames[a + 1].shapes[i].rCenter.x < 0 && Rz2 > 0)
            Rz2 -= Math.PI;

        if (keyFrames[a + 1].shapes[i].position.x - keyFrames[a].shapes[i].rCenter.x !== 0 || keyFrames[a + 1].shapes[i].position.z - keyFrames[a].keyFrames[a].shapes[i].rCenter.z !== 0)
            Ry2v = Math.atan((keyFrames[a + 1].shapes[i].position.y - keyFrames[a].keyFrames[a].shapes[i].rCenter.y) / zoom2Zv);
        else if (keyFrames[a + 1].shapes[i].position.y - keyFrames[a].keyFrames[a].shapes[i].rCenter.y > 0)
            Ry2v = Math.PI;
        else if (keyFrames[a + 1].shapes[i].position.y - keyFrames[a].keyFrames[a].shapes[i].rCenter.y < 0)
            Ry2v = -Math.PI;

        console.log("f1RY " + Ry1v / Math.PI * 180 + "°");
        console.log("f2RY " + Ry2v / Math.PI * 180 + "°");
        console.log("f1RZ " + Rz1v / Math.PI * 180 + "°");
        console.log("f2RZ " + Rz2v / Math.PI * 180 + "°");

        MvXv = Rz2v - Rz1v;
        MvYv = Ry2v - Ry1v;
        zoomChangev = zoom2v - zoom1v;
        zoomZChangev = zoom2Zv - zoom1Zv;
        console.log("moving zoom " + zoomChangev);
        console.log("moving zoomZ " + zoomZChangev);
        console.log("moving X " + MvXv / Math.PI * 180 + "°");
        console.log("moving Y " + MvYv / Math.PI * 180 + "°");
    }
    shapes[i].position.y = (zoom1v + zoomChangev / keyFrames[a].duration * timingCounter) * (Math.sin(Ry1v + MvYv / keyFrames[a].duration * timingCounter)) + keyFrames[a].keyFrames[a].shapes[i].rCenter.y;
    shapes[i].position.x = -((zoom1Zv + zoomZChangev / keyFrames[a].duration * timingCounter) * (Math.cos(Rz1v + MvXv / keyFrames[a].duration * timingCounter)) - keyFrames[a].shapes[i].rCenter.x);
    shapes[i].position.z = -((zoom1Zv + zoomZChangev / keyFrames[a].duration * timingCounter) * (Math.sin(Rz1v + MvXv / keyFrames[a].duration * timingCounter)) - keyFrames[a].keyFrames[a].shapes[i].rCenter.z);
    borders[i].position.x = shapes[i].position.x;
    borders[i].position.y = shapes[i].position.y;
    borders[i].position.z = shapes[i].position.z;
    console.log(shapes[i].position.x);
    console.log(shapes[i].position.y);
    console.log(shapes[i].position.z);
}else{
    shapes[i].position.x = keyFrames[a].shapes[i][0] + (keyFrames[a + 1].shapes[i][0] - keyFrames[a].shapes[i][0]) / keyFrames[a].duration * timingCounter;
    shapes[i].position.y = keyFrames[a].shapes[i][1] + (keyFrames[a + 1].shapes[i][1] - keyFrames[a].shapes[i][1]) / keyFrames[a].duration * timingCounter;
    shapes[i].position.z = keyFrames[a].shapes[i][2] + (keyFrames[a + 1].shapes[i][2] - keyFrames[a].shapes[i][2]) / keyFrames[a].duration * timingCounter;
    borders[i].position.x = keyFrames[a].shapes[i][0] + (keyFrames[a + 1].shapes[i][0] - keyFrames[a].shapes[i][0]) / keyFrames[a].duration * timingCounter;
    borders[i].position.y = keyFrames[a].shapes[i][1] + (keyFrames[a + 1].shapes[i][1] - keyFrames[a].shapes[i][1]) / keyFrames[a].duration * timingCounter;
    borders[i].position.z = keyFrames[a].shapes[i][2] + (keyFrames[a + 1].shapes[i][2] - keyFrames[a].shapes[i][2]) / keyFrames[a].duration * timingCounter;
}