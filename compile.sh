#!/bin/bash

echo -e "This will compile Monarch Animation"
echo -e "\n"
echo -e "copyright 2019 Monarch TSA"

if [ -d "closure-build" ]; then
    cd closure-build
    rm *
    cd ..
else 
    mkdir closure-build
fi

# cd closure-build

echo -e "Compiling Main File (monarchAnimation.min.js)..."
#Builds main file compiles all files into one Excludes the UI controllers, Three, and any prevously compilied files
closure-compiler --js_output_file="monarchAnimation.min.js" --js="**.js" --js="!**mobileStyle.js" --js="!**normalStyle.js" --js="!**three.js" --js="!**.min.js" 
mv monarchAnimation.min.js closure-build/
#Builds modified Three
echo -e "Compiling Three (three.min.js)..."
closure-compiler --js_output_file="three.min.js" --js="**three.js"
mv three.min.js closure-build/

#Builds UI controllers
echo -e "Compiling UI Controllers (mobileStyle.js & normalStyle.js)"
closure-compiler --js_output_file="mobileStyle.js" --js="**mobileStyle.js"
closure-compiler --js_output_file="normalStyle.js" --js="**normalStyle.js"
mv mobileStyle.js closure-build/
mv normalStyle.js closure-build/

echo -e "Complation Complete. Verifying files..."

cd closure-build

if [-f "monarchAnimation.min.js"]; then
echo -e "\"monarchAnimation.min.js\" Exists!"
else
    echo -e "An Error occured while compiling. \"monarchAniamtion.min.js\" Did not compile correctly. Please check syntax and verfy that standard syntax is being used"
    exit
fi

if [-f "mobileStyle.js"]; then
echo -e "\"mobileStyle.js\" Exists!"
else
    echo -e "An Error occured while compiling. \"mobileStyle.js\" Did not compile correctly. Please check syntax and verfy that standard syntax is being used"
    exit
fi

if [-f "normalStyle.js"]; then
echo -e "\"normalStyle.js\" Exists!"
else
    echo -e "An Error occured while compiling. \"normalStyle.js\" Did not compile correctly. Please check syntax and verfy that standard syntax is being used"
    exit
fi

echo -e "Verification Complete. Re-generating Project..."

#Moves files into working directory

cd ..
cp helperScripts/ccapture.min.js closure-build/
cp helperScripts/jquery-3.3.1.min.js closure-build/

cd closure-build

mkdir helperScripts
mkdir animationEngine

cp ccapture.min.js helperScripts/
cp jquery-3.3.1.min.js helperScripts/

cp three.min.js animationEngine/

cd helperScripts

mkdir UI_helper_scripts

cd ..

cp normalStyle.js helperScripts/UI_helper_scripts/
cp mobileStyle.js helperScripts/UI_helper_scripts/

echo -e "Generation Complete."


# EOF FILE