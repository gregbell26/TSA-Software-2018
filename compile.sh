#!/bin/bash

echo -e "This will compile Monarch Animation"
echo -e "copyright 2019 Monarch TSA"

if [ -d "closure-build" ]; then
    #clears the build path for everything but the style stuff
    cd closure-build
    mv index.html style/
    cd helperScripts/UI_helper_scripts
    rm *
    cd ..
    rm *
    rmdir *
    cd ..
    cd animationEngine
    rm *
    cd ..
    rm *
    rmdir *
    cd ..

else 
    mkdir closure-build
fi


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

# echo -e "Compilation Complete. Verifying files..."


echo -e "Compilation Complete. Re-generating Project..."

#Moves files into working directory
cd closure-build
mv style/index.html ../closure-build
cd ..

cp -R style/ closure-build/style
cp helperScripts/ccapture.min.js closure-build/
cp helperScripts/jquery-3.3.1.min.js closure-build/

cd closure-build

mkdir helperScripts
mkdir animationEngine
cd helperScripts

#download firebase files
wget https://www.gstatic.com/firebasejs/6.1.1/firebase-app.js
wget https://www.gstatic.com/firebasejs/6.1.1/firebase-auth.js
wget https://www.gstatic.com/firebasejs/6.1.1/firebase-firestore.js
wget https://www.gstatic.com/firebasejs/6.1.1/firebase-database.js

cd ..
mv ccapture.min.js helperScripts/
mv jquery-3.3.1.min.js helperScripts/

mv three.min.js animationEngine/

cd helperScripts

mkdir UI_helper_scripts

cd ..

mv normalStyle.js helperScripts/UI_helper_scripts/
mv mobileStyle.js helperScripts/UI_helper_scripts/


echo -e "Generation Complete."


# EOF FILE