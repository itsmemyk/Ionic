import {Pipe,PipeTransform} from 'angular2/core';

@Pipe({
    name:'titlecase'
})

export class TitleCase implements PipeTransform {
    transform(val,args){
        
        let returnValue = "";
        let words = val.toString().split(' ');
        
        words.forEach((word)=>{
            returnValue += word.substring(0,1).toUpperCase()+word.substring(1).toLowerCase() + " ";                    
        });
        
        return returnValue;
    }
}