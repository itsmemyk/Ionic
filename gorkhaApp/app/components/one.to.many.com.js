import {Component,EventEmitter,ElementRef} from 'angular2/core';
import {AxelorFormComponent} from './form.com';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {FormControl} from './form.control.com';
import {AxelorRestService} from './../services/axelor.rest';

@Component({
    selector:'axelor-reference',
    template:`
        <ion-item>
            <ion-label>{{label}}</ion-label>
            <ion-select [(ngModel)]="value" multiple="{{multiple}}">
                <ion-option *ngFor="#opt of optionControls" [value]="opt" checked="{{opt.selected}}">
                    {{opt.label}} 
                </ion-option>
            </ion-select>
        </ion-item> 
        <div m-l-20 m-t-5 [ngClass]="{hide:valid}" class="error-msg">{{errorMessage}}</div>
    `,
    inputs:["entity","label : x-label","value : x-value","validIf : x-valid-if","validIfMsg : x-valid-if-msg","required : x-required","requiredMsg : x-required-msg","axelorControl"],
    output:["updateValue : valueChange","handleInvalid : invalid"],
    directives:[IONIC_DIRECTIVES],
    styles:[`
        
    `],
    providers:[AxelorRestService]
})

export class OneToManyComponent extends FormControl{
    
    static get parameters(){
        return [[AxelorFormComponent],[AxelorRestService]];
    }
    
    constructor(form,rest){
           
        super("com.form.control.one.to.many");                
        form.addCom(this);
        this.rest = rest;     
        this.optionControls = [];
    }
    
    ngOnInit(){
        this.validateControl();     
        
        // console.log(this.entity);
        
        this.rest.entity = this.entity;
        
        
        this.rest.fields(this.entity).map((res)=>res.json()).subscribe((data)=>{
            let fields = data.data.fields;
            let primary = "id";
            let nameColumn = "id";
            
            for(let field of fields){
                if(field.nameColumn === true){
                    nameColumn = field.name;
                }
                
                if(field.primary === true){
                    primary = field.name;
                }
            }
            
            this.rest.search([primary,nameColumn]).map(res=>res.json()).subscribe((json)=>{
                this.optionControls = [];
                
                json.data.forEach((ele)=>{
                    this.optionControls.push({label:ele[nameColumn],value:ele[primary],selected:false})
                //    console.log(ele[nameColumn],ele[primary]);                        
                });
            });
        });

        
        this.multiple = this.multiple == 'true' ? true : false;                     
    }
    
    ngAfterContentInit(){
        for(let control of this.optionControls){
            if(control.selected){
                this.value = control.value;
                break;
            }
        }               
    }
}

