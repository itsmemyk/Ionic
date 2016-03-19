import {Component,EventEmitter,ElementRef} from 'angular2/core';
import {AxelorFormComponent} from './form.com';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {FormControl} from './form.control.com';

@Component({
    selector:'axelor-password',
    template:`
        <ion-item [ngClass]="{invalidstate:!valid}">
            <ion-label floating>{{label}}</ion-label>
            <ion-checkbox [(ngModel)]="value"></ion-input>                        
        </ion-item>
    `,
    inputs:["label : x-label","value : x-value","required : x-required","requiredMsg : x-required-msg","axelorControl"],
    output:["updateValue : valueChange","handleInvalid : invalid"],
    directives:[IONIC_DIRECTIVES],
    styles:[`
        
    `]
})

export class CheckboxComponent extends FormControl{
    
    static get parameters(){
        return [[AxelorFormComponent]];
    }
    
    constructor(form,ele){        
        super("com.form.control.checkbox");                
        form.addCom(this);
    }
    
    ngOnInit(){
        super.validateControl();           
    }
}
