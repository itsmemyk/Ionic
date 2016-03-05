import {Pipe, PipeTransform} from 'angular2/core';


@Pipe({name:"repeat"})
export class RepeatPipe implements PipeTransform{
    transform(val: any,args: any[]=[]){
        
        console.log(val);
        console.log(args);
        
        if(args.length === 0 ){
            throw new Error("RepeatPipe requires one Argument")
        }
        
        let [times] = args;
            
        return val.repeat(times);
    }
}