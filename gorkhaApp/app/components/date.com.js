import {Component,Input,Output,EventEmitter} from 'angular2/core';

@Component({
    selector:'today',
    template:`
        <h1> {{today|date:'medium'}}</h1>
    `,
    inputs:['id'],
    outputs:['dateChange']    
})

export class Today{
    
    constructor(){
       this.today = Date.now();
       this.dateChange = new EventEmitter();
                
        //console.log("heii");
       
       setInterval(()=>{
            this.today = Date.now();
            this.dateChange.next({now:this.today});
        },1000);
    }
    
}