import {Pipe} from 'angular2/core';

@Pipe({
    name:'getter'
})
export class PropertyGetter {
    transform(arr,args){
        let key = args[0];
        
        if(key.indexOf(".") > -1){
            let allKeys = key.split(".");             
            
            for(let i=0;i<allKeys.length-1;i++){
                arr = arr[allKeys[i]];
                key = allKeys[i+1];
            }            
        }
        
        let returnValue = '';
        
        for(let ele in arr){
            if(ele.toLowerCase() == key.toLowerCase()){
                returnValue=arr[ele];
            }   
        }
        return returnValue;
    }
}