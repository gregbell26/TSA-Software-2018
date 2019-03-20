function newCustom2(x, y, z, posX, posY, posZ, newColor, borderColor, verticies, faces) {
    var newGeometry = new THREE.Geometry();
    var newMaterial = new THREE.MeshBasicMaterial({ color: newColor });
  

//geometry.addAttribute( 'position', new THREE.BufferAttribute( verticies, 3 ) );
//var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
//var mesh = new THREE.Mesh( geometry, material );

  
  for(var i=0; i<verticies.length; i++){

  newGeometry.vertices.push(new THREE.Vector3(verticies[i][0], verticies[i][1], verticies[i][2]));
   
   //console.log(newGeometry.vertices[i]);
   if(verticies[i].length>3){
    //alert(verticies[i]);
}
   //console.log("Added " +verticies[i]);
} 
   // console.log(newGeometry.vertices[0]);
    for( var i=0; i<faces.length; i++){
      for(var i2=0; i2<faces[i].length; i2++){
        if(faces[i][i2]>verticies.length){
          alert("error");
        }
      }
      if(faces[i].length==3){
        if(faces[i][0]<0){
        //alert("ISNegative");
        faces[i][0]=verticies.length+faces[i][0]-1;
        faces[i][1]=verticies.length+faces[i][1]-1;
        faces[i][2]=verticies.length+faces[i][2]-1;
        }
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][1]),(faces[i][2])));
      }
      if(faces[i].length==4){
        if(faces[i][0]<0){
          faces[i][0]=verticies.length+faces[i][0];
          faces[i][1]=verticies.length+faces[i][1];
          faces[i][2]=verticies.length+faces[i][2];
          faces[i][3]=verticies.length+faces[i][3];
        }
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][1]),(faces[i][2])));
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][2]),(faces[i][3])));
      }
      if(faces[i].length==9){
          if(faces[i][0]<0){
            //alert("ISNegative");
            faces[i][0]=verticies.length+faces[i][0];
            faces[i][3]=verticies.length+faces[i][3];
            faces[i][6]=verticies.length+faces[i][6];
          }
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][3]),(faces[i][6])));
      }
      if(faces[i].length==12){
        if(faces[i][0]<0){
          //alert("ISNegative");
          faces[i][0]=verticies.length+faces[i][0];
          faces[i][3]=verticies.length+faces[i][3];
          faces[i][6]=verticies.length+faces[i][6];
          faces[i][9]=verticies.length+faces[i][9];
        }
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][3]),(faces[i][6])));
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][6]),(faces[i][9])));
      }
       // console.log(faces.length);
       //console.log("Added " +faces[i]);
    }
//newGeometry.computeFaceNormals();
    //console.log( newGeometry.geometry.isBufferGeometry );
  
    console.log(verticies.length+" Vertices");
console.log(faces.length+" Faces");
<<<<<<< HEAD
console.log("Shape Ends at "+index);

=======
  
>>>>>>> parent of a010f72... Fixed missing characters in vertices and objects being created too early
    shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);

    var geometry = new THREE.BufferGeometry().fromGeometry(newGeometry); //where error is

    var borderToAdd = new THREE.LineSegments( geometry, new THREE.LineBasicMaterial( { color: borderColor } ) );
    newGeometry.name = "custom2";

    borderToAdd.scale.x = x;
    borderToAdd.scale.y = y;
    borderToAdd.scale.z = z;

    borders.push(borderToAdd);
    //scene.add( borderToAdd );

    var length = scales.length;
    scales[length] = [];
    scales[length][0] = x;
    scales[length][1] = y;
    scales[length][2] = z;

    scene.add(shapes[shapes.length - 1]);
    selectedShape = shapes.length - 1;
    //alert("Called");
    setSelectedShape(selectedShape);
    moveShape("x", posX);
    moveShape('y', posY);
    moveShape('z', posZ);

    document.getElementById('dimensionX').value = x;
    document.getElementById('dimensionY').value = y;
    document.getElementById('dimensionZ').value = z;

    document.getElementById('positionBoxX').value = posX;
    document.getElementById('positionBoxY').value = posY;
    document.getElementById('positionBoxZ').value = posZ;
}