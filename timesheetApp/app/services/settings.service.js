import {Injectable} from 'angular2/core';
import {DataService} from './local.storage';

@Injectable()
export class Settings {

    static get parameters() {
        return [[DataService]];
    }

    constructor(localStore) {
        this.localStore = localStore;
        this.localStore.name = "settings.config";

        this.url = '';
        this.username = '';
        this.password = '';
        this.weekStart = 'monday';
        this.auth = false;

        this.localStore.get().then((res) => {
            if (res != null) {
                let settings = JSON.parse(res);

                this.url = settings.url;
                this.username = settings.username;
                this.password = settings.password;
                this.weekStart = settings.weekStart;
                this.auth = true;
            }
        });
    }

    get settingsObject() {
        return {
            url: this.url,
            username: this.username,
            password: this.password,
            weekStart: this.weekStart,
            auth: this.auth
        };
    }

    save(data) {
        this.localStore.save(data);
    }
}
