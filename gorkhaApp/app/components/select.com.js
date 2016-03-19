import {Component,EventEmitter,ElementRef} from 'angular2/core';
import {AxelorFormComponent} from './form.com';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {FormControl} from './form.control.com';


@Component({
    selector:'axelor-select-option',
    template:`<ng-content></ng-content>`,
    inputs:["value : x-value","selected : x-checked"]
})

export class SelectOptionComponent extends FormControl{
    
    static get parameters(){
        return [[SelectComponent],[ElementRef]];
    }
    
    constructor(select,ele){        
        super("com.form.control.select.option");
        this.ele = ele;
        this.selected = false; 
        
        select.addCom(this);
    }    
    
    ngAfterContentInit(){
        this.label = this.ele.nativeElement.innerText;
        this.value = this.value || this.label;
        this.label = this.value;
        this.selected = this.selected == 'true' ? true : false;
            
   //     console.log("optvalue",this.selected,this.ele._appElement.nativeElement.innerText);
    }
}


@Component({
    selector:'axelor-select',
    template:`
        <ion-item>
            <ion-label>{{label}}</ion-label>
            <ion-select [(ngModel)]="value" multiple="{{multiple}}">
                <ion-option *ngFor="#opt of optionControls" [value]="opt.value" checked="{{opt.selected}}">
                    {{opt.label}} 
                </ion-option>
            </ion-select>
        </ion-item> 
    `,
    inputs:["multiple : x-multiple","label : x-label","value : x-value","minLen : x-min-length","maxLen : x-max-length","validIf : x-valid-if","validIfMsg : x-valid-if-msg","required : x-required","requiredMsg : x-required-msg","axelorControl","color"],
    output:["updateValue : valueChange","handleInvalid : invalid"],
    directives:[IONIC_DIRECTIVES,SelectOptionComponent],
    styles:[`
        
    `]
})

export class SelectComponent extends FormControl{
    
    static get parameters(){
        return [[AxelorFormComponent]];
    }
    
    constructor(form){        
        super("com.form.control.select",false);                
        form.addCom(this);
        this.multiple = false;
        this.optionControls = [];
    }
    
    ngOnInit(){
        this.validateControl();        
        this.multiple = this.multiple == 'true' ? true : false;                     
    }
    
    ngAfterContentInit(){
        if(this.multiple == false){
            for(let control of this.optionControls){
                if(control.selected){
                    this.value = control.value;
                    break;
                }
            }    
        }   
    }
    
    addCom(option){
        this.optionControls.push(option);
    }
}

