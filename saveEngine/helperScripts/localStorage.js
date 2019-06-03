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
        return JSON.parse(localStorage.getItem(key));
    }

    static saveToStorage(key,data){
        //If we have time add check to verify that we are saving valid JSON data
        localStorage.setItem(key, JSON.stringify(data));
    }
}