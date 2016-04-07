import {Platform, SqlStorage,Storage} from 'ionic-angular';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Database {
    
    static get parameters(){
        return [[Platform]];
    }
    
    constructor(platform){
        this.platform = platform;
        
        this.platform.ready().then(()=>{
            this.storage = new Storage(SqlStorage);        
        });
    }
    
    create(tableName,data){
        let query = `CREATE TABLE IF NOT EXISTS ${tableName}(`;
        let patch = '';
        
        for(let obj in data){
            query += `${patch} ${obj} ${data[obj]}`;
            patch = ',';   
        }
        
        query += `)`;
        
        this.execute(query);
    }
    drop(tableName){
        let query = `DROP TABLE ${tableName}`;
        
        this.execute(query);
    }
    
    add(tableName,data,numerics=[]){
               
        let {keys:cols,values} = this.getKeyValues(data);
        
        let query = `INSERT INTO ${tableName} (`;
        let patch = '';
        
        cols.forEach(c=>{
            query += `${patch}${c}`
            patch = ',';
        })
        
        patch = '';
        query += ") VALUES ("
        
        let c = 0;
        
        values.forEach((v)=>{
            if(this.in_array(numerics,c)){
                query += `${patch}${v}`     
            }else {
                query += `${patch}'${v}'`
            }
           
            patch = ',';
            c++;
        });
        
        query += ")";
        
        
        this.execute(query);       
    }
    
    update(tableName,where,data,numerics=[]){
        
        let {keys:cols,values} = this.getKeyValues(data);
        
        let query = `UPDATE ${tableName} SET `;
        let patch = '';
        let count= 0;
        
        cols.forEach(c=>{
            if(this.in_array(numerics,count)){
              query += `${patch} ${c}=${values[count]}`
            }else{
              query += `${patch} ${c}='${values[count]}'`   
            }
            patch = ',';
            count++;
        })
        
        query += ` WHERE id = ${where.id}`;
        
       this.execute(query); 
    }  
    
    remove(tableName,where){
       let query = `DELETE from  ${tableName}  WHERE id = ${where.id}`;
       this.execute(query);
    }
    
    fetch(table,plain=false){
        
        let query  ="select * from "+table;
        
        if(plain){
            query = table;    
        }
        
        
        return Observable.create(observer =>{
            let result = [];
            
            this.platform.ready().then(()=>{            
                this.storage.query(query).then((data)=>{
                    let total = data.res.rows.length; 
                    
                    if( total > 0){
                        for(var i=0; i < total; i++){                            
                            result.push(data.res.rows.item(i));
                        }
                    }
                    observer.next(result);
                    observer.complete();
                },(err)=>{
                    console.log(JSON.stringify(err));   
                 }
                );
            });    
        });
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
    
    in_array(array, element) {
        let flag=false;
        for(var i=0;i<array.length;i++) {
            if(array[i] === element){
                flag=true;
                break;
            }
        }
        return flag;
    }
    execute(query){
     //   console.log(query);
       
         this.platform.ready().then(()=>{            
            this.storage.query(query).then((data)=> {
                console.log("Sql Success ")    
            },(err)=>{
                console.log("SQLite Error" + JSON.stringify(err)); 
            });
        });
    }
}