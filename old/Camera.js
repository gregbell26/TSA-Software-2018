//
// function changeCameraLock(){//Changes whether or not the camera is locked during animation to change
//     lockCamera = document.getElementById("chkbox1").checked;
// }
//
// function changeCameraCircleRotation(){//Changes whether or not the camera moves in a circular fashion during the animation
//     circleCameraRotation = document.getElementById("chkbox2").checked;
// }
//
// function changeSensitivity(change) {//Changes sensitivity to change
//     settings.mouseSensitivity = change;
// }
// function changeZoomSensitivity(change) {//Changes the Zoom sensitivity to change
//     if(change < 0)
//         change = change * -1;
//     settings.zoomAmount = 1 + change/2;
// }
//
// $(document).on('mousedown',function(e){
//     if(inAnimationWindow==1) {
//         xStart = e.pageX;
//         yStart = e.pageY;
//         mouseDown = true;
//     }
//     else if(e.pageY>=window.innerHeight-70){
//         // console.log("Mouse scrub enabled");
//         mouseOnTimeline = true;
//         timelineScrub(e.pageX);
//     }
// });
// //triggers on the event that the mouse is down on the document. it creates a custom function that checks if it is in the animation window and creates the mouse handler.
//
// $(document).on('change',function(e){
//     if(isNaN(yPosition))
//         yPosition = 0;
//     if(isNaN(xPosition))
//         xPosition = 0;
//     if(isNaN(zPosition))
//         zPosition = 0;
// });
// var mouseOnTimeline = false;
//
// $(document).on('mouseup',function(e){
//     if(e.pageX>=300 && e.pageY >=50 && e.pageY<window.innerHeight-70) {
//         mouseDown = false;
//     }
//     mouseOnTimeline = false;
// });
// $(document).on('keydown',function(e) {
//     if (inAnimationWindow==1 && !settingsOpen && !(animationRunning && lockCamera)) {
//         if (e.key == "-")
//             zoomCameraM(settings.zoomAmount);
//         else if (e.key == "=")
//             zoomCameraM(1/settings.zoomAmount);
//     }
// });
// $(document).on('mouseup',function(e){
//     mouseDown=false;
//     mouseOnTimeline = false;
// });
// var timelinePosition = 0;
// $(document).ready(function(){
//     $(document).on('mousemove', function(e){
//         if(e.pageX>=300 && e.pageY >=50 && e.pageY<window.innerHeight-70) {
//             inAnimationWindow = 1;
//         }
//         else{
//             inAnimationWindow = 0;
//         }
//         if(mouseDown && inAnimationWindow==1 && !settingsOpen && !(animationRunning && lockCamera)){
//
//             var MvX = settings.mouseSensitivity*(e.pageX-xStart)/100;
//             var MvY = settings.mouseSensitivity*(e.pageY-yStart)/100;
//             rotateCamera(MvX,MvY);
//
//
//             if(e.pageX>=300 && e.pageY >=50 && e.pageY<window.innerHeight-70) {
//                 xStart = e.pageX;
//                 yStart = e.pageY;
//             }
//         }
//         if(mouseOnTimeline){
//             timelineScrub(e.pageX);
//         }
//     });
// });
//
// function zoomCameraM(amount) {
//     zoom = Math.pow((Math.pow(xPosition, 2) + Math.pow(yPosition, 2) + Math.pow(zPosition, 2)), .5);//zoom calc here
//     zoom*=amount;
//     zoomZ = Math.cos(Math.asin(yPosition / zoom));
//     var cameraRz;
//     var cameraRy;
//     if (xPosition !== 0)
//         cameraRz = Math.atan(zPosition / xPosition);
//     else if (zPosition > 0)
//         cameraRz = Math.PI;
//     else if (zPosition < 0)
//         cameraRz = -Math.PI;
//
//     if (xPosition < 0 && cameraRz < 0)
//         cameraRz += Math.PI;
//     else if (xPosition < 0 && cameraRz > 0)
//         cameraRz -= Math.PI;
//
//     if (xPosition !== 0 || zPosition !== 0)
//         cameraRy = Math.atan((yPosition) / (Math.pow(Math.pow(xPosition, 2) + Math.pow(zPosition, 2), .5)));
//     else if (yPosition > 0)
//         cameraRy = Math.PI;
//     else if (yPosition < 0)
//         cameraRy = -Math.PI;
//
//     yPosition = zoom * Math.sin(cameraRy);
//     xPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.cos(cameraRz);
//     zPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.sin(cameraRz);
//
//     if(isNaN(yPosition))
//         yPosition = 0;
//     if(isNaN(xPosition))
//         xPosition = 0;
//     if(isNaN(zPosition))
//         zPosition = 0;
//
// }
//
// function rotateCamera(MvX,MvY){
//     zoomZ = Math.pow(Math.pow(xPosition,2)+Math.pow(zPosition, 2),.5);
//     zoom = Math.pow((Math.pow(zoomZ,2)+Math.pow(yPosition,2)),.5);//zoom calc here
//     var cameraRz;
//     var cameraRy;
//     if(xPosition !== 0)
//         cameraRz = Math.atan(zPosition/xPosition);
//     else if(zPosition > 0)
//         cameraRz = Math.PI;
//     else if(zPosition < 0)
//         cameraRz = -Math.PI;
//
//     if(xPosition < 0 && cameraRz < 0)
//         cameraRz += Math.PI;
//     else if(xPosition < 0 && cameraRz > 0)
//         cameraRz -= Math.PI;
//
//
//     if(xPosition !== 0 || zPosition !== 0)
//         cameraRy = Math.atan((yPosition)/zoomZ);
//     else if(yPosition > 0)
//         cameraRy = Math.PI;
//     else if(yPosition < 0)
//         cameraRy = -Math.PI;
//
//     cameraRz += MvX;
//     cameraRy += MvY;
//
//     yPosition = zoom * Math.sin(cameraRy);
//     xPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.cos(cameraRz);
//     zPosition = (zoom * Math.cos(Math.asin(yPosition/zoom))) * Math.sin(cameraRz);
//
//     if(isNaN(yPosition))
//         yPosition = 0;
//     if(isNaN(xPosition))
//         xPosition = 0;
//     if(isNaN(zPosition))
//         zPosition = 0;
// }
