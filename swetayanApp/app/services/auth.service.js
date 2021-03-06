import {Injectable} from 'angular2/core';
import {DataService} from './local.storage';

@Injectable()
export class AuthService {

    static get parameters() {
        return [[DataService]];
    }

    constructor(localStore) {
        this.localStore = localStore;
        this.localStore.name = "user.auth";

        this.user = {};
        this.auth = false;                      
    }

    init() {
        return new Promise( (resolve, reject) => {
           this.localStore.get().then((res) => {
                let userInfo = JSON.parse(res);
                
                if (userInfo != null) {               
                    this.user = userInfo.user;
                    this.auth = true;
                }
                resolve();
            });
        });
    }
    
    get authObject() {
        return {
            user: this.user,
            auth: this.auth
        };
    }

    save(data) {
        this.localStore.save(data);
    }

    clear() {
        this.localStore.clear();
    }
}

export var AUTH_PROVIDERS = [AuthService, DataService]