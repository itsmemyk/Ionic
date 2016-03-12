import {Input,Output,Component,EventEmitter,View} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
    selector:'axelor-input',    
    outputs:['updateInput : inputChange'],
    inputs:['input','type','label','placeholder','xField : x-field']    
})

@View({
    template:`
        <ion-item>
            <ion-label floating>{{label}}</ion-label>
            <ion-input [type]="type" #txt (keyup)="onChange(txt.value)" [placeholder]="placeholder"></ion-input>        
        </ion-item>         
    `,
    directives:[IONIC_DIRECTIVES],
})

export class AxelorInput {
    
    constructor(){
        this.type = this.type || "text";
        this.placeholder = this.placeholder || "";
        this.updateInput =  new EventEmitter();
    }
    
    ngOnInit(){
        console.log(this.xField);
    }
    
    onChange(v){
        this.input = v;
        this.updateInput.next(this.input);
    }
}