import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {HttpInterceptor, INTERCEPTOR_PROVIDERS} from './http.interceptor';
import 'rxjs/Rx';

@Injectable()
export class RestService {

    static get parameters() {
        return [[HttpInterceptor]];
    }

    constructor(http) {
        this.http = http;
        this.settings = http.settings;

        this._baseURL = this.settings.url + "/";
        this._entity = "";
    }

    set entity(newEntity) {
        this._entity = this._baseURL + "ws/rest/" + newEntity;
    }

    get entity() {
        return this._entity;
    }

    login(baseUrl, loginData) {
        return this.http.login(baseUrl, loginData);
    }

    logout() {
        let url = `${this._baseURL}logout`;
        return this.http.get(url);
    }

    search(fields = [], sortBy = null, limit = 40, offset = 0) {

        let url = this._entity + "/search";
        let data = {
            "fields": fields,
            "sortBy": sortBy,
            "data": {
                "_domain": null,
                "_domainContext": {},
                "operator": "and",
                "criteria": []
            },
            "limit": limit,
            "offset": offset
        };

        return this.http.post(url, data);
    }

    get(id) {
        let url = this._entity + "/" + id;
        return this.http.get(url);
    }

    getAll(offset = 0, limit = 40) {
        let url = `${this._entity}?offset=${offset}&limit=${limit}`;
        return this.http.get(url);
    }

    fetch(id, fields = []) {
        let url = this._entity + "/" + id + "/fetch";
        let data = { fields: fields };
        return this.http.post(url, data);
    }

    post(id, data) {
        let url = this._entity + "/" + id;
        let postData = { data: data };
        return this.http.post(url, postData);
    }

    put(data) {
        let url = this._entity;
        let putData = { data: data };
        return this.http.put(url, putData);
    }

    delete(id) {
        let url = this._entity + "/" + id;
        return this.http.delete(url);
    }

    deleteAll(removeDatas) {
        let url = this._entity + "/removeAll";
        let data = { records: removeDatas };

        return this.http.post(url, data);
    }

    action(actionName, data) {
        let url = this._entity + ":" + actionName;
        let postData = { data: data };
        return this.http.post(url, postData);
    }

    fields(modelName) {
        modelName = modelName || this._entity;
        let url = this._baseURL + "ws/meta/fields/" + modelName;
        return this.http.get(url);
    }

    models() {
        let url = this._baseURL + "ws/meta/models";
        return this.http.get(url);
    }
}

export var REST_PROVIDERS = [RestService, HttpInterceptor, INTERCEPTOR_PROVIDERS];