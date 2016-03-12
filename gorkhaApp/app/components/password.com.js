import {Component,EventEmitter} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
    selector:'axelor-password',
    template:`
        <ion-item [ngClass]="{invalidstate:!valid}">
            <ion-label floating>{{label}}</ion-label>
            <ion-input #txt type="password" [(ngModel)]="value"></ion-input>                        
        </ion-item>
        <div m-l-20 m-t-5 [ngClass]="{hide:valid}" class="error-msg">{{errorMessage}}</div>
    `,
    inputs:["label : x-label","value : x-value","axelorControl"],
    output:["updateValue : valueChange","handleInvalid : invalid"],
    directives:[IONIC_DIRECTIVES],
    styles:[`
        
    `]
})

export class PasswordComponent {
    
    constructor(){
        
        this.updateValue = new EventEmitter();
        this.handleInvalid = new EventEmitter();
        this.value = "";
        this.valid = true;
        this.errorMessage = "required!!";        
    }
    
    ngOnInit(){
        this.label = this.label || "";    
        
        console.log(this.axelorControl);    
    }
    
    ngOnChanges(){
        console.log("dhfkjhhf");
        this.type();
    }
    
    ngDoCheck(){
        console.log("786");
    }
    
    type(){
        
        if(this.value.length >= 6 && this.value.length <= 10)
            this.valid = true;
        else {
            this.errorMessage = ` Invalid ${this.label}` ;
            this.valid = false;
        }    
    }
}