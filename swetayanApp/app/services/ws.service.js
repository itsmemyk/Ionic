import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

const BASE_URL = "http://swetayan.com/Android/"; 

@Injectable()
export class WSService {

    static get parameters() {
        return [[Http]];
    }

    constructor(http) {
        this.http = http;                
    }

    get(url) {
        return this.http.get(url);
    }
    
    post(url, data) {
        return this.http.post(url, JSON.stringify(data));
    }
    
    login(username, password) {
        return this.get(BASE_URL+`login.php?username=${username}&password=${password}`);
    }
    
    getProfile(data) {
        return this.post(BASE_URL+"get.php?q=profile",data);
    }
    
    getCustomerAlbum(data) {
        return this.post(BASE_URL+"get.php?q=albums",data);
    }
    
    getProducts(data) {
        return this.post(BASE_URL+"get.php?q=products",data);
    }
    
    getVideos(data) {
        return this.post(BASE_URL+"get.php?q=videos",data);
    }
    
    getSliders(data) {
        return this.post(BASE_URL+"get.php?q=sliders",data);
    }
    
    changePassword(data) {
        return this.post(BASE_URL+"post.php?q=change-password",data);
    }
    
    sendFeedback(data) {
        return this.post(BASE_URL+"post.php?q=feedback",data);
    }
}

export var WS_PROVIDERS = [WSService]