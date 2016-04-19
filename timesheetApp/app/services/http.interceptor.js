import {Http, Headers, RequestOptions, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {SettingsService, SETTINGS_PROVIDERS} from './settings.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HttpInterceptor {

    static get parameters() {
        return [[Http], [SettingsService]];
    }

    constructor(http, settings) {
        this.http = http;

        let _build = this.http._backend._browserXHR.build;
        this.http._backend._browserXHR.build = () => {
            let _xhr = _build();
            _xhr.withCredentials = true;
            return _xhr;
        };

        this.settings = settings;
    }

    login(baseUrl, loginData) {
        let url = baseUrl || `${this.settings.url}/login.jsp`;
        let data = loginData || {
                                    "username": this.settings.username,
                                    "password": this.settings.password
                                };

        return this.http.post(url, JSON.stringify(data), this.getRequestOptions());
    }

    get(url) {
        return this.intercept(this.http.get(url, this.getRequestOptions()));
    }

    post(url, data) {
        return this.intercept(this.http.post(url, JSON.stringify(data), this.getRequestOptions()));
    }
    
    put(url, data) {
        return this.intercept(this.http.put(url, JSON.stringify(data), this.getRequestOptions()));
    }
    
    delete(url) {
        return this.intercept(this.http.delete(url, this.getRequestOptions()));
    }
    
    getRequestOptions(options = null) {
        if (options == null) {
            options = new RequestOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }

        options.headers.append("Accept", "application/json");
        options.headers.append("Content-Type", "application/json");
        options.headers.append("X-Requested-With", "XMLHttpRequest");

        return options;
    }

    intercept(observable) {
        return observable.retry(2).catch((err, source) => {
            if (err.status == 401 && !err.url.endsWith("/login.jsp")) {
                this.login().subscribe();
            } else {
                Observable.throw(err);
            }
        })
    }
}

export var INTERCEPTOR_PROVIDERS = [HttpInterceptor, SETTINGS_PROVIDERS];