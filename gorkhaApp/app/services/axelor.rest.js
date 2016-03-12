import {Storage, LocalStorage, EventEmitter} from 'ionic-angular';
import {Injectable} from 'angular2/core';
import {Http,Headers} from 'angular2/http';
import 'rxjs/Rx';

const RESTURL="http://localhost:8080/axelor-crm/ws/rest/";

@Injectable()
export class AxelorRestService {
    
    static get parameters(){
        return [[Http]];    
    }   
     
    constructor(http){
        this.http = http;
    }
    
    search(){
        
      let url = RESTURL + "com.axelor.code.db.Code/search";
      let data = {
                    "fields":["title","code"],
                    "sortBy":null,
                    "data": {
                       "_domain":null,
                       "_domainContext":{},
                       "operator":"and",
                       "criteria":[]
                    },
                    "limit":40,
                    "offset":0
                 }; 
      
      let headers = new Headers();
      
      headers.append("Accept","application/json");
      headers.append("Content-Type","application/json");
      //headers.append("X-Requested-With","XMLHttpRequest");
        
      return this.http.post(url,JSON.stringify(data),{headers:headers});        
    }
    
    get(){
        let url = RESTURL+"com.axelor.code.db.Code/1";
        
        return this.http.get(url);    
    }
    
    doLogin(){
        let url = RESTURL + "login.jsp";
        
        let data = {"username:":"admin","password":"admin"};
        let headers = new Headers();
        
        headers.append("Accept","application/json");
        headers.append("Content-Type","application/json");
        headers.append("X-Requested-With","XMLHttpRequest");
        headers.append("Authorization","admin admin");
        
        return this.http.post(url,JSON.stringify(data),{headers:headers,withCredentials:true});    
    }
    
    
    
    
    
}