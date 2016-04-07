import {Component,EventEmitter,ElementRef} from 'angular2/core';
import {AxelorFormComponent} from './form.com';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {FormControl} from './form.control.com';

@Component({
    selector:'axelor-toggle',
    template:`
        <ion-item>
            <ion-label>{{label}}</ion-label>
            <ion-toggle [(ngModel)]="value" [checked]="checked"></ion-toggle>                        
        </ion-item>
    `,
    inputs:["label : x-label","value : x-value","required : x-required","requiredMsg : x-required-msg","axelorControl","checked : x-checked"],    
    directives:[IONIC_DIRECTIVES],
    styles:[`
        
    `]
})

export class ToggleComponent extends FormControl{
    
    static get parameters(){
        return [[AxelorFormComponent]];
    }
    
    constructor(form,ele){        
        super("com.form.control.toggle");                
        form.addCom(this);
    }
    
    ngOnInit(){
        super.validateControl();           
        this.checked = this.checked == 'true' ? true : false;
    }
}
