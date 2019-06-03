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
        

    }

    consistentData(){

    }


    checkData(){


    }



}