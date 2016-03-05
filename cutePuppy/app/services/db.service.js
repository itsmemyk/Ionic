import {Platform, SqlStorage,Storage} from 'ionic-framework/ionic';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DBManager {
    
    constructor(platform : Platform){
        this.platform = platform;
        
        this.platform.ready().then(()=>{
            this.storage = new Storage(SqlStorage);
        
            this.storage.query('CREATE TABLE IF NOT EXISTS peoples(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)').then((data)=>{
                console.log("Done"+JSON.stringify(data));
            },(err)=>{
                console.log("Error"+JSON.stringify(err));
            });  
        });
    
    }
    
    add(tableName,data){
        
        let {keys:cols,values} = this.getKeyValues(data);
        
        let query = `INSERT INTO ${tableName} (`;
        let patch = '';
        
        cols.forEach(c=>{
            query += `${patch}${c}`
            patch = ',';
        })
        
        patch = '';
        query += ") VALUES ("
        
        values.forEach((v)=>{
           query += `${patch}'${v}'`
            patch = ',';
        });
        
        query += ")";
        
        console.log(query);
        
        /*
        this.platform.ready().then(()=>{            
            this.storage.query(query).then((data)=> {
                console.log("Inserted" + JSON.stringify(data))    
            },(err)=>{
                console.log("SQLite Error" + JSON.stringify(err)); 
            });
        });
        */
    }
    
    update(tableName,where,data){
        
        let {keys:cols,values} = this.getKeyValues(data);
        
        let query = `UPDATE ${tableName} SET `;
        let patch = '';
        let count= 0;
        
        cols.forEach(c=>{
            query += `${patch} ${c}='${values[count]}'`
            patch = ',';
            count++;
        })
        
        query += ` WHERE ${where.id} = ${where.value}`;
        
        console.log(query);
        
    }
    
    fetch(tableName){
        
        return Observable.create(observer =>{
            let result = [];
            
            this.platform.ready().then(()=>{            
                this.storage.query("select * from "+tableName).then((data)=>{
                    let total = data.res.rows.length; 
                    
                    if( total > 0){
                        for(var i=0; i < total; i++){                            
                            result.push(data.res.rows.item(i));
                        }
                    }
                    observer.next(result);
                    observer.complete();
                });
            });    
        });
        
        /*
        return new Promise((resolve,reject) => {
           
            let result = [];
            
            this.platform.ready().then(()=>{            
                this.storage.query("select * from peoples").then((data)=>{
                    let total = data.res.rows.length; 
                    
                    if( total > 0){
                        for(var i=0; i < total; i++){                            
                            result.push(data.res.rows.item(i));
                        }
                    }
                    resolve(result);
                });
            });   
        });
        
        */
    }
    
    getKeyValues(data){
        let cols = [];
        let values = [];
        
        let c = 0;
        
        for(let obj in data){
            values[c] = data[obj];
            cols[c++] = obj;   
        }
        
        return {keys:cols,values:values};
    }
}