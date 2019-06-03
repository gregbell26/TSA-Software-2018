class curruption {
    //IP_ - means inprogress
    //CP_ - means completed

    IP_shapes = [];
    IP_lights = [];
    IP_keyframes = [];
    IP_scales = [];
    IP_borders = [];

    CP_shapes = [];
    CP_lights = [];
    CP_keyframes = [];
    CP_scales = [];
    CP_boarders = [];


    compiledData;//What will get sent back to the saveEngine


    //This will be created when ever we need to check data
    constructor(shapesIn, lightsIn, keyframesIn, bordersIn, scalesIn){
        this.IP_shapes = shapesIn;
        this.IP_lights = lightsIn;
        this.IP_keyframes = keyframesIn;
        this.IP_scales = scalesIn;
        this.IP_borders = bordersIn

    }

    //This will check if the
    validData(){
        if((this.IP_shapes && this.IP_keyframes) === undefined || (this.IP_shapes && this.IP_keyframes) == null){
            //this is unrecoverable
            return -100;
        }
        if(this.IP_scales === undefined || this.IP_scales === null){
            if(this.IP_keyframes === null || this.IP_keyframes === undefined){
                for(let i =0; i < this.IP_shapes.length; i++){
                    this.IP_scales.push([1,1,1]);
                }
            }
            else {
                for(let i =0; i < this.IP_shapes; i++){
                    this.IP_scales.push(
                        this.IP_keyframes
                    );
                }
            }
        }



    }

    consistentData(){

    }


    checkData(){
        //Validates the save info
        this.validData();



    }



}