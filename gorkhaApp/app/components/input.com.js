import {Input,Output,Component,EventEmitter,View} from 'angular2/core';
import {AxelorFormComponent} from './form.com';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {FormControl} from './form.control.com';

// @Component({
//     selector:'axelor-input',    
//     outputs:['updateInput : inputChange'],
//     inputs:['input','type','label','placeholder','xField : x-field']    
// })

// @View({
//     template:`
//         <ion-item>
//             <ion-label floating>{{label}}</ion-label>
//             <ion-input [type]="type" #txt (keyup)="onChange(txt.value)" [placeholder]="placeholder"></ion-input>        
//         </ion-item>         
//     `,
//     directives:[IONIC_DIRECTIVES],
// })

// export class AxelorInput {
    
//     constructor(){
//         this.type = this.type || "text";
//         this.placeholder = this.placeholder || "";
//         this.updateInput =  new EventEmitter();
//     }
    
//     ngOnInit(){
//         console.log(this.xField);
//     }
    
//     onChange(v){
//         this.input = v;
//         this.updateInput.next(this.input);
//     }
// }



@Component({
    selector:'axelor-input',
    template:`
        <ion-item [ngClass]="{invalidstate:!valid}">
            <ion-label floating>{{label}}</ion-label>
            <ion-input type="text" [(ngModel)]="value"></ion-input>                        
        </ion-item>
        <div m-l-20 m-t-5 [ngClass]="{hide:valid}" class="error-msg">{{errorMessage}}</div>
    `,
    inputs:["label : x-label","value : x-value","minLen : x-min-length","maxLen : x-max-length","regex : x-regex","regexMsg : x-regex-msg","validIf : x-valid-if","validIfMsg : x-valid-if-msg","required : x-required","requiredMsg : x-required-msg","axelorControl"],
    output:["updateValue : valueChange","handleInvalid : invalid"],
    directives:[IONIC_DIRECTIVES],
    styles:[`
        
    `]
})

export class InputComponent extends FormControl{
    
    static get parameters(){
        return [[AxelorFormComponent]];
    }
    
    constructor(form){        
        super("com.form.control.input");                
        form.addCom(this);
    }
    
    ngOnInit(){
        super.validateControl();        
    }
}
