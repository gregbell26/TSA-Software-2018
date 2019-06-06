/**
 * This is a helper class for storage
 *
 */

class localStore{

    static exists(key){
        if(localStorage.getItem(key) !== null)
            return true;
        return false;
    }

    static getFromStorage(key){
        let gotten = JSON.parse(localStorage.getItem(key));
        console.log(gotten);
        return gotten;
    }

    static loadScene(key){
        let JSONLoader = new THREE.ObjectLoader();
        let loadedScene = JSONLoader.parse(this.getFromStorage(key));
        return loadedScene;
    }

    static saveToStorage(key,data){
        //If we have time add check to verify that we are saving valid JSON data
        localStorage.setItem(key, JSON.stringify(data));
        console.log("Saved: " + key);
    }
}