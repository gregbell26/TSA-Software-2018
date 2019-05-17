
shapesCmove[i].zoom1Z = Math.pow(Math.pow(keyFrames[a].shapes.position.x, 2) + Math.pow(keyFrames[a].shapes.position.z, 2), .5);
shapesCmove[i].zoom1 = Math.pow((Math.pow(shapesCmove[i].zoom1Z, 2) + Math.pow(keyFrames[a].shapes.position.y, 2)), .5);//shapesCmove[i].zoom1 calc here
console.log("f1zoomZ " + shapesCmove[i].zoom1Z);
console.log("f1zoom " + shapesCmove[i].zoom1);
shapesCmove[i].Rz1 = 0;
shapesCmove[i].Ry1 = 0;
if (keyFrames[a].shapes.position.x !== 0)
    shapesCmove[i].Rz1 = Math.atan(keyFrames[a].shapes.position.z / keyFrames[a].shapes.position.x);
else if (keyFrames[a].shapes.position.z > 0)
    shapesCmove[i].Rz1 = Math.PI;
else if (keyFrames[a].shapes.position.z < 0)
    shapesCmove[i].Rz1 = -Math.PI;

if (keyFrames[a].shapes.position.x < 0 && shapesCmove[i].Rz1 < 0)
    shapesCmove[i].Rz1 += Math.PI;
else if (keyFrames[a].shapes.position.x < 0 && shapesCmove[i].Rz1 > 0)
    shapesCmove[i].Rz1 -= Math.PI;

if (keyFrames[a].shapes.position.x !== 0 || keyFrames[a].shapes.position.z !== 0)
    shapesCmove[i].Ry1 = Math.atan((keyFrames[a].shapes.position.y) / shapesCmove[i].zoom1Z);
else if (keyFrames[a].shapes.position.y > 0)
    shapesCmove[i].Ry1 = Math.PI;
else if (keyFrames[a].shapes.position.y < 0)
    shapesCmove[i].Ry1 = -Math.PI;

shapesCmove[i].zoom2Z = Math.pow(Math.pow(keyFrames[a + 1].shapes.position.x, 2) + Math.pow(keyFrames[a + 1].shapes.position.z, 2), .5);
shapesCmove[i].zoom2 = Math.pow((Math.pow(shapesCmove[i].zoom2Z, 2) + Math.pow(keyFrames[a+1].shapes.position.y, 2)), .5);//shapesCmove[i].zoom1 calc here
console.log("f2zoomZ " + shapesCmove[i].zoom2Z);
console.log("f2zoom " + shapesCmove[i].zoom2);
shapesCmove[i].Rz2 = 0;
shapesCmove[i].Ry2 = 0;
if (keyFrames[a + 1].shapes.position.x !== 0)
    shapesCmove[i].Rz2 = Math.atan(keyFrames[a + 1].shapes.position.z / keyFrames[a + 1].shapes.position.x);
else if (keyFrames[a + 1].shapes.position.z > 0)
    shapesCmove[i].Rz2 = Math.PI;
else if (keyFrames[a + 1].shapes.position.z < 0)
    shapesCmove[i].Rz2 = -Math.PI;

if (keyFrames[a + 1].shapes.position.x < 0 && shapesCmove[i].Rz2 < 0)
    shapesCmove[i].Rz2 += Math.PI;
else if (keyFrames[a + 1].shapes.position.x < 0 && shapesCmove[i].Rz2 > 0)
    shapesCmove[i].Rz2 -= Math.PI;

if (keyFrames[a + 1].shapes.position.x !== 0 || keyFrames[a + 1].shapes.position.z !== 0)
    shapesCmove[i].Ry2 = Math.atan((keyFrames[a + 1].shapes.position.y) / shapesCmove[i].zoom2Z);
else if (keyFrames[a + 1].shapes.position.y > 0)
    shapesCmove[i].Ry2 = Math.PI;
else if (keyFrames[a + 1].shapes.position.y < 0)
    shapesCmove[i].Ry2 = -Math.PI;
console.log("f1RY " + shapesCmove[i].Ry1/Math.PI*180+"°");
console.log("f2RY " + shapesCmove[i].Ry2/Math.PI*180+"°");
console.log("f1RZ " + shapesCmove[i].Rz1/Math.PI*180+"°");
console.log("f2RZ " + shapesCmove[i].Rz2/Math.PI*180+"°");

shapesCmove[i].MvX = shapesCmove[i].Rz2 - shapesCmove[i].Rz1;
shapesCmove[i].MvY = shapesCmove[i].Ry2 - shapesCmove[i].Ry1;
shapesCmove[i].zoomChange = shapesCmove[i].zoom2 - shapesCmove[i].zoom1;
shapesCmove[i].zoomZChange = shapesCmove[i].zoom2Z - shapesCmove[i].zoom1Z;
console.log("moving zoom " + shapesCmove[i].zoomChange);
console.log("moving zoomZ " + shapesCmove[i].zoomZChange);
console.log("moving X " + shapesCmove[i].MvX/Math.PI*180+"°");
console.log("moving Y " + shapesCmove[i].MvY/Math.PI*180+"°");


shapes.position.y = (shapesCmove[i].zoom1  +  shapesCmove[i].zoomChange/keyFrames[a].duration * timingCounter) * (Math.sin(shapesCmove[i].Ry1+shapesCmove[i].MvY/keyFrames[a].duration * timingCounter));
shapes.position.x = (shapesCmove[i].zoom1Z + shapesCmove[i].zoomZChange/keyFrames[a].duration * timingCounter) * (Math.cos(shapesCmove[i].Rz1+shapesCmove[i].MvX/keyFrames[a].duration * timingCounter));
shapes.position.z = (shapesCmove[i].zoom1Z + shapesCmove[i].zoomZChange/keyFrames[a].duration * timingCounter) * (Math.sin(shapesCmove[i].Rz1+shapesCmove[i].MvX/keyFrames[a].duration * timingCounter));