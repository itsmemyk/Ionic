import {Storage, LocalStorage, Events} from 'ionic-angular';
import {Injectable} from 'angular2/core';


@Injectable()
export class DataService {

    static get parameters() {
        return [[Events]];
    }

    constructor(events) {
        this._name = 'datastore';
        this.initData();
        this.events = events;
    }

    get Data() {
        return this.datastore;
    }

    set name(newName) {
        this._name = newName;
        this.initData();
    }

    initData() {
        this.storage = new Storage(LocalStorage, { name: this._name });
        this.datastore = null;

        this.storage.get(this._name).then((data) => {            
            this.datastore = JSON.parse(data);
        });
    }

    get() {
        return this.storage.get(this._name);
    }

    save(item) {
        this.datastore = item;
        let newStore = JSON.stringify(this.datastore);
        this.storage.set(this._name, newStore);
    }

    clear() {
        this.storage.set(this._name, null);
    }
}