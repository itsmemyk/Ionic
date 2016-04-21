import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
export class WSService {

    static get parameters() {
        return [[Http]];
    }

    constructor(http) {
        this.http = http;        
    }

    call(url) {
        return this.http.get(url);
    }
}

export var WS_PROVIDERS = [WSService]