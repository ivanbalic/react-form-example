import Campaign from '../models/Campaign';
import * as dataBase from './dataBase';

class DataService {

    fetchData(sessionId) {
        
        return new Promise((resolve, reject) => {

            const response = dataBase.getData(sessionId);

            if (response.status === 200) {
                resolve(response);
            } else {
                const reason = new Error(response.message);
                reject(reason);
            }
        })
        .then(response => {

            if(response.status === 200){
                console.log(response.message);
                return JSON.parse(response.data);
            } else {
                throw new Error(response.message);
            }
        })
        .then(items => {

            const mappedItems = items.map(item => {
                return new Campaign(item);
            });
            
            return mappedItems;
        })
        .catch(error => console.log(error.message));
    }

    editCampaign(index, payload){

        return new Promise((resolve, reject) => {

            const response = dataBase.editStorageElement(index, payload);
          
            if (response.status === 200) {
                resolve(response);
            } else {
                const reason = new Error(response.message);
                reject(reason);
            }
        });
    }
        
    addCampaign(payload){
    
        return new Promise((resolve, reject) => {

            const response = dataBase.addToStorage(payload);
            
            if (response.status === 200) {
                resolve(response);
            } else {
                const reason = new Error(response.message);
                reject(reason);
            }
        });
    
    }
}

export const dataService = new DataService();
