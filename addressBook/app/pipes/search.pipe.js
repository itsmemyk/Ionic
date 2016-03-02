import {Inject,Injectable,Pipe,PipeTransform} from 'angular2/core';

@Pipe({name:'searchContact'})
export class SearchContact implements PipeTransform{
    transform(items:any, args:any[]) {
        
        let q = args[0];
        
        return items.filter((item)=>{
            if(item.name.indexOf(q) !== -1 || item.description.indexOf(q) !== -1)
                return true;
            else
                return false;
        });
    }   
}