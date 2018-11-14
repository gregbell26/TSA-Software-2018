function newTube(x, y, z, posX, posY, posZ, newColor){
    var path = new CustomSinCurve( 10 );
    var newGeometry = new THREE.TubeGeometry( path, 100 ,0.5, 20, false );
    var newMaterial = new THREE.MeshBasicMaterial({color: newColor});
    shapes[shapes.length]=new THREE.Mesh(newGeometry, newMaterial);
    var length = scales.length;
    newGeometry.name = "tube"
    scales[length]=[];
    scales[length][0]=x;
    scales[length][1]=y;
    scales[length][2]=z;
    scene.add(shapes[shapes.length-1]);
    selectedShape = shapes.length-1;
    setSelectedShape(selectedShape);
    moveShape("x", posX);
    moveShape("y", posY);
    moveShape("z", posZ);
}

function CustomSinCurve( scale ) {

    THREE.Curve.call( this );

    this.scale = ( scale === undefined ) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t ) {

    var tx = t * 3 - 1.5;
    var ty = Math.sin( 2 * Math.PI * t );
    var tz = 0;

    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

};