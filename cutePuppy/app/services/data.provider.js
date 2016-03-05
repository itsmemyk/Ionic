import {Storage, LocalStorage, Events} from 'ionic-framework/ionic';
import {Injectable} from 'angular2/core';


@Injectable()
export class DataService {
    
    constructor(events: Events){
        this.storage = new Storage(LocalStorage, {name:'contacts'});
        this.contacts = null;
        
        this.storage.get('contacts').then((contacts) => {
            this.contacts = JSON.parse(contacts);
        });  
        
        this.events = events;
    }
    
    getAll(){
        return this.storage.get('contacts');
    }
    
    get(index){
        return this.contacts[index];
    }
    
    save(item){
        if( ! this.contacts){
            this.contacts = [item];
        }else {
            this.contacts.push(item);
        }
        this.restore();    
        
        this.events.publish("record:add");
    }
    
    update(index, item){
        this.contacts[index] = item;
        this.restore();
        
        this.events.publish("record:update");
    }
    
    restore(){
        let newStore = JSON.stringify(this.contacts);
        this.storage.set('contacts', newStore);
    }
    
    remove(index){
        this.contacts.splice(index,1);
        this.restore();
        this.events.publish("record:remove");
    }
}