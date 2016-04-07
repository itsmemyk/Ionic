import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Settings} from './settings.service';
import 'rxjs/Rx';

@Injectable()
export class RestService {

    static get parameters() {
        return [[Http], [Settings]];
    }

    constructor(http, settings) {
        this.http = http;
        this.settings = settings;

        let _build = this.http._backend._browserXHR.build;
        this.http._backend._browserXHR.build = () => {
            let _xhr = _build();
            _xhr.withCredentials = true;
            return _xhr;
        };

        this._baseURL = settings.url + "/";
        this._entity = "";

        this.headers = new Headers();
        this.headers.append("Accept", "application/json");
        this.headers.append("Content-Type", "application/json");
        this.headers.append("X-Requested-With", "XMLHttpRequest");
    }

    set entity(newEntity) {
        this._entity = this._baseURL + "ws/rest/" + newEntity;
    }

    get entity() {
        return this._entity;
    }

    login(baseUrl, loginData) {
        baseUrl = baseUrl || this._baseURL;
        let url = `${baseUrl}login.jsp`;
        let data = {
            "username": this.settings.username,
            "password": this.settings.password
        };

        data = loginData || data;

        return this.http.post(url, JSON.stringify(data), { headers: this.headers });
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

        return this.http.post(url, JSON.stringify(data), { headers: this.headers });
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
        return this.http.post(url, JSON.stringify(data), { headers: this.headers });
    }

    post(id, data) {
        let url = this._entity + "/" + id;
        let postData = { data: data };
        return this.http.post(url, JSON.stringify(postData), { headers: this.headers });
    }

    put(data) {
        let url = this._entity;
        let putData = { data: data };
        return this.http.put(url, JSON.stringify(putData), { headers: this.headers });
    }

    delete(id) {
        let url = this._entity + "/" + id;
        return this.http.delete(url, { headers: this.headers });
    }

    deleteAll(removeDatas) {
        let url = this._entity + "/removeAll";
        let data = { records: removeDatas };

        return this.http.post(url, JSON.stringify(data), { headers: this.headers });
    }

    action(actionName, data) {
        let url = this._entity + ":" + actionName;
        let postData = { data: data };
        return this.http.post(url, JSON.stringify(postData), { headers: this.headers });
    }

    fields(modelName) {
        modelName = modelName || this._entity;
        let url = this._baseURL + "ws/meta/fields/" + modelName;
        return this.http.get(url, { headers: this.headers });
    }

    models() {
        let url = this._baseURL + "ws/meta/models";
        return this.http.get(url, { headers: this.headers });
    }
}