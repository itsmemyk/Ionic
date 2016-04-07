import {Storage, LocalStorage, Events} from 'ionic-angular';
import {Injectable,Component} from 'angular2/core';
import {AxelorRestService} from './axelor.rest';
import 'rxjs/Rx';

@Component({
    providers:[AxelorRestService]
})
export class DataService {
    
    static get parameters(){
        return [[Events],[AxelorRestService]];
    }
    
    constructor(events,rest){
        this.rest = rest;
        this.storage = new Storage(LocalStorage, {name:'auth'});
        this.auth = false;
        this.user = {username:"",password:""};
        this.fill();        
    }
    
    fill(){
        let user = this.storage.get('credentials');
        
        if(user){
            this.user = JSON.parse(user._result);
        }
    }
        
    authenticate(){       
        return this.rest.login(this.user);
    }
    
    save(credentials){
        let newStore = JSON.stringify(credentials);
        this.storage.set('credentials', newStore);
    }    
    
}