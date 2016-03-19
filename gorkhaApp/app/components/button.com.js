import {ElementRef,Component} from 'angular2/core'
import {AxelorFormComponent} from './form.com';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {FormControl} from './form.control.com';


@Component({
    selector:'axelor-button',
    template:`
        <button m-t-20 m-l-20  class="bg-{{color}}">{{label}}</button> 
    `,
    inputs:["label : x-label","value : x-value","minLen : x-min-length","maxLen : x-max-length","validIf : x-valid-if","validIfMsg : x-valid-if-msg","required : x-required","requiredMsg : x-required-msg","axelorControl","color"],
    output:["updateValue : valueChange","handleInvalid : invalid"],
    directives:[IONIC_DIRECTIVES],
    styles:[`
        
    `]
})

export class ButtonComponent extends FormControl{
    
    static get parameters(){
        return [[AxelorFormComponent]];
    }
    
    constructor(form){        
        super("com.form.control.button");                
        form.addCom(this);
        // this.view = view;
    }
    
    ngOnInit(){
        // console.log(this.color);
    }
    
    ngAfterContentInit(){
        // console.log(this.view);
    }
}
