/**
 * This is a helper class for storage
 *
 */

class localStore{
    constructor(){

    }

    exists(key){
        return localStorage.getItem(key) !== null;
    }

    getFromStorage(key){
        let gotten = JSON.parse(localStorage.getItem(key));
        return gotten;
    }

    loadScene(key){
        let JSONLoader = new THREE.ObjectLoader();
        let processed = this.getFromStorage(key);
        processed = JSONLoader.parse(processed);
        return processed;
    }

    deleteFromStorage(key){
        localStorage.removeItem(key);
    }

    saveToStorage(key,data){
        //If we have time add check to verify that we are saving valid JSON data
        localStorage.setItem(key, JSON.stringify(data));
        console.log("Saved: " +key);
    }
}