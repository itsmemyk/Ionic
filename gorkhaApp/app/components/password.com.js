import {Component,EventEmitter,ElementRef} from 'angular2/core';
import {AxelorFormComponent} from './form.com';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {FormControl} from './form.control.com';

@Component({
    selector:'axelor-password',
    template:`
        <ion-item [ngClass]="{invalidstate:!valid}">
            <ion-label floating>{{label}}</ion-label>
            <ion-input #txt type="password" [(ngModel)]="value"></ion-input>                        
        </ion-item>
        <div m-l-20 m-t-5 [ngClass]="{hide:valid}" class="error-msg">{{errorMessage}}</div>
    `,
    inputs:["label : x-label","value : x-value","minLen : x-min-length","maxLen : x-max-length","regex : x-regex","regexMsg : x-regex-msg","validIf : x-valid-if","validIfMsg : x-valid-if-msg","required : x-required","requiredMsg : x-required-msg","axelorControl"],
    output:["updateValue : valueChange","handleInvalid : invalid"],
    directives:[IONIC_DIRECTIVES],
    styles:[`
        
    `]
})

export class PasswordComponent extends FormControl{
    
    static get parameters(){
        return [[AxelorFormComponent],[ElementRef]];
    }
    
    constructor(form,ele){        
        super("com.form.control.password");                
        form.addCom(this);
    }
    
    ngOnInit(){
        super.validateControl();           
    }
}
