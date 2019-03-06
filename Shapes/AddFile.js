function addCustom2() {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    document.getElementById("FileUpload").appendChild(x);
}
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var strin = e.target.result.split("\n");
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
    for (var i = 0; i < strina.length; i++) {
        if (strina[i][0] == 'v' && strina[i][1] !=='n') {
            strina[i] = strina[i].slice(2);
            verticies.push(strina[i].split(" ").map(parseFloat));
        }
        if(strina[i][0]=='f'){
            strina[i] = strina[i].slice(2);
            faces.push(strina[i].split(" ").map(parseFloat));
        }
    }
    //console.log(faces[0]);
        newCustom2(1, 1, 1, 0, 0, 0, '#ff0000', '#000000', verticies, faces);
        //console.log("After newCustom2()");
}
document.getElementById('FileUpload').addEventListener('change', readSingleFile, false); 

