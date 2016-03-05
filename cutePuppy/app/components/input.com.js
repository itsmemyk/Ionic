import {Input,Output,Component,EventEmitter,View} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-framework/ionic';

@Component({
    selector:'axelor-input',    
    outputs:['updateInput : inputChange']
    
})

@View({
    template:`
        <ion-label clearInput>{{label}}</ion-label>
        <ion-input [type]="type" #txt (keyup)="onChange(txt.value)" [placeholder]="placeholder"></ion-input>         
    `,
    directives:[IONIC_DIRECTIVES],
})

export class AxelorInput {
    @Input() type: string;
    @Input() label: string;
    @Input() placeholder: string;
    
    private input: number;
    
    private updateInput: EventEmitter = new EventEmitter();
    
    constructor(){
        this.type = this.type || "text";
        this.placeholder = this.placeholder || "number";
    }
    
    onChange(v){
        this.input = v;
        console.log(this.input);
        this.updateInput.next(this.input);
    }
}