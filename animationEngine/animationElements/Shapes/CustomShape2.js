function newCustom2(x, y, z, posX, posY, posZ, newColor, borderColor, verticies, faces, index, name) {
    var newGeometry = new THREE.Geometry();
    var newMaterial = new THREE.MeshBasicMaterial({ color: newColor });
  

//geometry.addAttribute( 'position', new THREE.BufferAttribute( verticies, 3 ) );
//var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
//var mesh = new THREE.Mesh( geometry, material );

  console.log(faces);
  for(var i=0; i<verticies.length; i++){

  newGeometry.vertices.push(new THREE.Vector3(verticies[i][0], verticies[i][1], verticies[i][2]));
   
   //console.log(newGeometry.vertices[i]);
   if(verticies[i].length>3){
    alert(i+" "+verticies[i]+ " Is a vertex4");
}
   //console.log("Added " +verticies[i]);
} 
   // console.log(newGeometry.vertices[0]);
    for( var i=0; i<faces.length; i++){
      for(var i2=0; i2<faces[i].length; i2++){
        if(faces[i][i2]>verticies.length){
        //  alert("error");
        }
      }
      if(isNaN(faces[i][faces[i].length-1])){
        faces[i].pop();
      }
      if(faces[i].length==3){
        if(faces[i][0]<0){
        //alert("ISNegative");
        faces[i][0]=verticies.length+faces[i][0];
        faces[i][1]=verticies.length+faces[i][1];
        faces[i][2]=verticies.length+faces[i][2];
        }
        else if(faces[i][0]>0){  
          faces[i][0]-=1;
        faces[i][1]-=1;
        faces[i][2]-=1;
        }
       
          newGeometry.faces.push(new THREE.Face3((faces[i][1]),(faces[i][2]),(faces[i][0])));
      }
      if(faces[i].length==4){
        if(faces[i][0]<0){
          faces[i][0]=verticies.length+faces[i][0];
          faces[i][1]=verticies.length+faces[i][1];
          faces[i][2]=verticies.length+faces[i][2];
                }
        else if(faces[i][0]>0){
          faces[i][0]-=1;
        faces[i][1]-=1;
        faces[i][2]-=1;
        faces[i][3]-=1;
        }
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][1]),(faces[i][2])));
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][2]),(faces[i][3])));
      }
      if(faces[i].length==6){
        if(faces[i][0]<0){
        //alert("ISNegative");
        faces[i][0]=verticies.length+faces[i][0];
        faces[i][2]=verticies.length+faces[i][2];
        faces[i][4]=verticies.length+faces[i][4];
        }
        else if(faces[i][0]>0){  
          faces[i][0]-=1;
        faces[i][2]-=1;
        faces[i][4]-=1;
        }
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][2]),(faces[i][4])));
      }
      if(faces[i].length==8){
        if(faces[i][0]<0){
        //alert("ISNegative");
        faces[i][0]=verticies.length+faces[i][0];
        faces[i][2]=verticies.length+faces[i][2];
        faces[i][4]=verticies.length+faces[i][4];
        faces[i][6]=verticies.length+faces[i][6];
        }
        else if(faces[i][0]>0){  
          faces[i][0]-=1;
        faces[i][2]-=1;
        faces[i][4]-=1;
        faces[i][6]-=1;
        }
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][2]),(faces[i][4])));
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][4]),(faces[i][6])));
      }
      if(faces[i].length==9){
          if(faces[i][0]<0){
            faces[i][0]=verticies.length+faces[i][0];
            faces[i][3]=verticies.length+faces[i][3];
            faces[i][6]=verticies.length+faces[i][6];
          }
          else if(faces[i][0]>0){
            faces[i][0]-=1;
          faces[i][3]-=1;
          faces[i][6]-=1;
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
        else if(faces[i][0]>0){
          //alert(faces[i]);
          faces[i][0]-=1;
        faces[i][3]-=1;
        faces[i][6]-=1;
        faces[i][9]-=1;
        //alert(faces[i][0]);
        }
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][3]),(faces[i][6])));
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][6]),(faces[i][9])));
      }
      if(faces[i].length==18){
        if(faces[i][0]<0){
          //alert("ISNegative");
          faces[i][0]=verticies.length+faces[i][0];
          faces[i][3]=verticies.length+faces[i][3];
          faces[i][6]=verticies.length+faces[i][6];
          faces[i][9]=verticies.length+faces[i][9];
          faces[i][12]=verticies.length+faces[i][12];
          faces[i][15]=verticies.length+faces[i][15];
        }
        else if(faces[i][0]>0){
          //alert(faces[i]);
          faces[i][0]-=1;
        faces[i][3]-=1;
        faces[i][6]-=1;
        faces[i][9]-=1;
        faces[i][12]-=1;
        faces[i][15]-=1;
        //alert(faces[i][0]);
        }
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][3]),(faces[i][6])));
          newGeometry.faces.push(new THREE.Face3((faces[i][0]),(faces[i][6]),(faces[i][9])));
          newGeometry.faces.push(new THREE.Face3((faces[i][9]),(faces[i][12]),(faces[i][15])));
      }
       // console.log(faces.length);
       //console.log("Added " +faces[i]);
    }
//newGeometry.computeFaceNormals();ji
    //console.log( newGeometry.geometry.isBufferGeometry );
  
    console.log(verticies.length+" Vertices");
console.log(faces.length+" Faces");
console.log("Shape Ends at "+index);

    shapes[shapes.length] = new THREE.Mesh(newGeometry, newMaterial);

    var geometry = new THREE.BufferGeometry().fromGeometry(newGeometry); //where error is

    var borderToAdd = new THREE.LineSegments( geometry, new THREE.LineBasicMaterial( { color: borderColor } ) );
    if(name != null){
      newGeometry.name=name;
    }
    else{
      newGeometry.name="Uploaded_Shape";
    }

    scene.add(shapes[shapes.length - 1]);
    selectedShape = shapes.length - 1;
    
    borderToAdd.scale.x = x;
    borderToAdd.scale.y = y;
    borderToAdd.scale.z = z;

    borders.push(borderToAdd);
    scene.add( borderToAdd );

    var length = scales.length;
    scales[length] = [];
    scales[length][0] = x;
    scales[length][1] = y;
    scales[length][2] = z;

    //alert("Called");
    setSelectedShape(selectedShape);
    moveShape("x", posX);
    moveShape('y', posY);
    moveShape('z', posZ);

    document.getElementById('diemsions_x').value = x;
    document.getElementById('diemsions_y').value = y;
    document.getElementById('diemsions_z').value = z;

    document.getElementById('position_x').value = posX;
    document.getElementById('position_y').value = posY;
    document.getElementById('position_z').value = posZ;

}