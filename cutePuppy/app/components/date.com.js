import {Page} from 'ionic-framework/ionic';
import {Component,Input,Output,EventEmitter} from 'angular2/core';

@Component({
    selector:'today',
    template:
    `<h1> {{today|date:'medium'}}</h1>
     <h2> {{id}}</h2> 
    `
})

export class Today{
    @Input() id: String;
    @Output() dateChange = new EventEmitter(); 
    
    constructor(){
        this.today = Date.now();
        //console.log("heii");
        
        setInterval(()=>{
            this.today = Date.now();
            this.dateChange.next({now:this.today});
        },1000);
    }
    
}