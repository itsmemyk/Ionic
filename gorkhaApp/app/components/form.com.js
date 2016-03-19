import {Component,EventEmitter,ElementRef} from 'angular2/core';
import {PasswordComponent} from './password.com';
import {IONIC_DIRECTIVES} from 'ionic-angular';


@Component({
    selector:'axelor-form',
    inputs:['entity','abstract'],  
    outputs:['saveHandler: onsave'],  
    template:`
        <form post="#" (submit)="doSubmit($event)" *ngIf="!abstract">
            <ion-list>            
                <ng-content></ng-content> 
            </ion-list>
        </form>
    `,
    directives:[IONIC_DIRECTIVES,PasswordComponent],
    styles:[`
        
    `]
})

export class AxelorFormComponent {
    
    static get parameters(){
        return [[ElementRef]];
    }
    
    constructor(ele){        
        this.formControls = [];
        this.valid = false;    
        this.abstract = true;
        
        this.saveHandler = new EventEmitter();
        // console.log("form init")            
    }
    
    ngOnInit(){
        this.abstract = this.abstract == 'false' ? false : true;
        this.entityTitle = this.entity.substring(this.entity.lastIndexOf(".")+1);        
                
        // console.log(this.entity);
        // console.log("form-controls",this.formControls);
    }    
    
    
    addCom(com){
        // console.log(this.formControls.find((c)=> c.axelorControl == com.axelorControl));
        // if( this.formControls.find((c)=> c.axelorControl == com.axelorControl) === undefined) 
        
        this.formControls.push(com);
        // else
        //     throw new Error("AxelorControl Must be Unique !! "+com.axelorControl+" ambiguous")
                        
    }
    
    getComValue(id,fc){
        let returnValue = "";
        
        id = id.trim();
        
        let control = this.formControls.find((c)=> c.axelorControl == id);
        
        if(control){
            returnValue = "'"+control.value+"'";
        }else {
            returnValue = id;
        }
        
        return returnValue;
    }
    
    doSubmit(e){
        e.preventDefault();
        
        let formValues = {};
        
        for(let fc of this.formControls){           
            
            let Value = fc.value ? fc.value : "";
            
            if (fc.required === 'true' && Value.trim() === '') {          
                fc.valid = false;
                fc.errorMessage = fc.requiredMsg || "Required !!!";                
            }
            else if( fc.minLen && (Value.length < parseInt(fc.minLen)) ){            
                let msg = ` Invalid !! Min Length ${fc.minLen}` ;
                fc.setValidity(false,msg);                
            }
            else if( fc.maxLen && (Value.length < parseInt(fc.maxLen)) ){            
                let msg = ` Invalid !! Min Length ${fc.maxLen}` ;
                fc.setValidity(false,msg);                
            }        
            else if( fc.regex && !(new RegExp(fc.regex).test(Value)) ){            
                let msg = fc.regexMsg || "Not Matched";
                fc.setValidity(false,msg);                
            }        
            else if (fc.validIf) {
                
                let expr = fc.validIf;
                let exprs = expr.split(' ');
                let evaluteExpr = expr;
                
                this.formControls.forEach((com)=>{
                    if(com.axelorControl ){                     
                        evaluteExpr = evaluteExpr.replace(com.axelorControl,"'"+com.value+"'");                        
                    }                         
                });
                
                // console.log(eval("fc == 'hetman'"))
                // exprs.forEach((ele)=>{
                //     evaluteExpr += " "+this.getComValue(ele,fc);    
                // });
                
                evaluteExpr = evaluteExpr.replace(/this/g,"fc");
                
                // console.log(eval(evaluteExpr),evaluteExpr);
                
                // console.log(eval("fc.toString() === '123'"));
                
                if( ! eval(evaluteExpr) ) {
                    let msg = fc.validIfMsg || "Invalid Value !!" ;
                    fc.setValidity(false,msg);
                }
                else {
                    fc.setValidityTrue();    
                }           
                
                // expr = expr.replace("===","==");
                // expr = expr.replace("!==","!=");
                
                // if(expr.indexOf("==") > -1) {
                //     let condition = expr.split("==");
                    
                //     let a = this.getComValue(condition[0],fc);
                //     let b = this.getComValue(condition[1],fc);
                    
                //     // console.log("first",a,b,fc);
                    
                //     if( a != b ) {
                //         let msg = fc.validIfMsg || "Not Matched !!" ;
                //         fc.setValidity(false,msg);
                //     }
                //     else {
                //         fc.setValidityTrue();    
                //     }           
                // }
                // else if(expr.indexOf("!=") > -1) {
                //     let condition = expr.split("!=");
                    
                //     let a = this.getComValue(condition[0],fc);
                //     let b = this.getComValue(condition[1],fc);
                    
                //     //  console.log(a,b);
                    
                //     if( a == b ) {
                //         let msg = fc.validIfMsg || "Not Matched !!" ;
                //         fc.setValidity(false,msg);
                //     }
                //     else {
                //         fc.setValidityTrue();    
                //     }           
                // }      
            } 
            else {
                fc.setValidityTrue();
            }
            
            if(fc.axelorControl)
                formValues[fc.axelorControl] = fc.value;
        }
        
        this.validate();
        
        if(this.valid == false){
            
            // this.invalidHandler.next();
            
        }else{
            
            this.saveHandler.next(formValues);
            
    //        console.log("Called POST "+this.entity)
        }        
    }
    
    
    validate(){
        this.valid = true;
        
        for(let fc of this.formControls){
            if(fc.valid === false){
                this.valid = false;
                break;
            }    
        }
        
    }
}