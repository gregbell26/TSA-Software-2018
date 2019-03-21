function addCustom2() {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    document.getElementById("FileUpload").appendChild(x);
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
// creates a new file reader
    if (f) {
        var r = new FileReader();
        r.onload = function (e) { //defines a function for when the file reader object is loaded
            if(e.target.result.includes("\r\n")){
            var strin = e.target.result.split("\r\n"); //splits a string at every newline character 
            }
            else{
            var strin=e.target.result.split("\n");
            }
            //alert(typeof strin[0]);
             //console.log(strin[0]);
            parseFile1(strin);
          
            //console.log("Parsed file");
        }
        r.readAsText(f);
    }
    else {
        alert("Failed to load file");
    } 
}

function parseFile1(strina) {
   // console.log("parsefile called");
    var verticies=[];
    var faces=[];
    var vn=[];
    var vt= [];
    var group=false;
    var object=false;
    var name;
    for (var i = 1; i < strina.length-1; i++) {
       // alert(strina[i]); 
        if(strina[i-1][0]=='o'){
            name=strina[i-1];
            object=true;
        }
        if(strina[i][0] == 'v' && strina[i][1] ==' ') {
            if(strina[i][2]==" "){
                strina[i]=strina[i].slice(3);
            }
            else{
                strina[i]=strina[i].slice(2);
            }
        
            verticies.push(strina[i].split(" ").map(parseFloat));
           // alert("SAF");
        }
        if(strina[i][0]=='g'){
            group=true;
        }
        if(strina[i][0]=='f'){ //press f to pay respect
            if(strina[i][2]==" "){
                strina[i]=strina[i].slice(3);
            }
            else{
                strina[i]=strina[i].slice(2);
            }
            
           //strina[i]=strina[i].split(/[\s,\/]/);
           // strina[i].split(" ").map(parseFloat);  //regex for \s and / is /[\s,\/]/
           // alert(strina[i].split);
           //alert(strina[i].split(/[\s,\/]/));
          faces.push(strina[i].split(/[\/\s]/).map(parseFloat));
         
        }
        
        //alert("#2"+strina[i]);
        if(faces.length>1&&(!strina[i+1]||strina[i+1][0]=="v")){
           
            if(group){
                 newCustom2(1, 1, 1, 0, 0, 0, getRandomColor(), '#000000', verticies, faces, i,name);
            faces=[];
            //verticies=[];
            group=false;
            }
            if(object){
                newCustom2(1, 1, 1, 0, 0, 0, getRandomColor(), '#000000', verticies, faces, i,name);

            faces=[];
            object=false;
            }
        }
       
    }
    //console.log(faces[0]);
       // newCustom2(1, 1, 1, 0, 0, 0, '#ff0000', '#000000', verticies, faces);
        //console.log("After newCustom2()");
}
document.getElementById('FileUpload').addEventListener('change', readSingleFile, false); 

