import {Storage, LocalStorage, EventEmitter} from 'ionic-angular';
import {Injectable} from 'angular2/core';
import {Http,Headers,HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

const BASEURL="http://localhost:8080/axelor-demo/"
const RESTURL=BASEURL+"ws/rest/";

@Injectable()
export class AxelorRestService {
    
    static get parameters(){
        return [[Http]];    
    }   
     
    constructor(http){
        this.http = http;
            
        let _build = this.http._backend._browserXHR.build;
        
        this.http._backend._browserXHR.build = () => {
                let _xhr =  _build();
                _xhr.withCredentials = true;
                return _xhr;
        };
        
        this._entity = "";
        
        let headers = new Headers();
            
        headers.append("Accept","application/json");   
        headers.append("Content-Type","application/json"); 
        headers.append("X-Requested-With","XMLHttpRequest");       
        
        this.headers = headers;
    }
    
    ready(){
        return new Promise((resolve,reject)=>{
             this.http.head(BASEURL).subscribe((data)=>{
                console.log("Initaized");
                resolve(true);   
            });
        });
    }
    
    set entity(newEntity){
        this._entity = RESTURL + newEntity;    
    }
    
    get entity(){
        return this._entity;
    }
    
    login(loginData){
        
      let url = BASEURL + "login.jsp";
      
      let data = {
                    "username":"admin",
                    "password":"admin"
                    };
      
      data = loginData || data;
                           
      return this.http.post(url,JSON.stringify(data),{headers:this.headers});
    }
    
    logout(){
        let url = BASEURL + "logout";
       
        return this.http.get(url);
    }
    
    search(fields=[],sortBy=null,limit=40,offset=0){
            
      let url = this._entity + "/search";
        
      let data = {
                    "fields":fields,
                    "sortBy":sortBy,
                    "data": {
                       "_domain":null,
                       "_domainContext":{},
                       "operator":"and",
                       "criteria":[]
                    },
                    "limit":limit,
                    "offset":offset
                 }; 
        
      return this.http.post(url,JSON.stringify(data),{headers:this.headers});        
    }
    
    get(id){
        let url = this._entity + "/" + id ;
        
        return this.http.get(url);    
    }     
    
    getAll(offset=0,limit=40){
        
        let url = `${this._entity}?offset=${offset}&limit=${limit}`;
        
        return this.http.get(url);    
    }    
            
    fetch(id,fields=[]){
        let url = this._entity + "/" + id + "/fetch";
        
        let data = {fields : fields};
        
        return this.http.post(url,JSON.stringify(data),{headers:this.headers});    
    }    
    
    post(id,data){
        let url = this._entity + "/" + id;
        let postData = {data:data};
        
        return this.http.post(url,JSON.stringify(postData),{headers:this.headers});
    }   
    
    // postAll(id,data){
    //     let url = this._entity + "/" + id;
    //     let postData = {data:data};
        
    //     return this.http.post(url,JSON.stringify(postData),{headers:this.headers});
    // }   
    
    put(data){
        let url = this._entity ;
        let putData = {data:data};
        
        return this.http.put(url,JSON.stringify(putData),{headers:this.headers});
    }
    
    delete(id){
        let url = this._entity + "/" + id;
        return this.http.delete(url,{headers:this.headers});
    }
    
    deleteAll(removeDatas){
        let url = this._entity + "/removeAll";        
        let data = {records:removeDatas};
         
        return this.http.post(url,JSON.stringify(data),{headers:this.headers});
    }
    
    fields(modelName){
        modelName = modelName || this._entity;
        
        let url = BASEURL+"ws/meta/fields/"+modelName;        
        return this.http.get(url,{headers:this.headers});    
    }
    
    models(){
        let url = BASEURL+"ws/meta/models";        
        return this.http.get(url,{headers:this.headers});
    }
    
    executeMethod() {
        
    }
    
    executeAction() {
        
    }
}