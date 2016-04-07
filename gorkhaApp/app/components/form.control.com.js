import {Component,EventEmitter} from 'angular2/core';

export class FormControl {    
    constructor(control,resetValue=true){
        this.label = "";
        this.formControl = control || "com.form.control";            
        this.updateValue = new EventEmitter();
        this.handleInvalid = new EventEmitter();
        
        if(resetValue)
             this.value = "";
            
        this.valid = true;  
        this.errorMessage = "required!!";        
        this.axelorControl = "";        
    }        
    
    validateControl(){
        if(this.axelorControl.trim() === ""){
            throw new Error(`Axelor-Form Child Control ${this.formControl} Must Initialized with the axelorControl Attribute`);
        }
    }
    
    setValidityTrue(){
        this.valid = true;
        this.errorMessage = "";
    }
    
    setValidity(valid,validMessage){
        this.valid = valid;
        this.errorMessage = validMessage;    
    }
    
    validate(){
        
    }
    
    toString(){
        return this.value;
    }
    
    valueOf(){
        let returnValue;
        
        switch(this.type){
            case 'text':
                returnValue = this.value;
                break;          
            case 'time':
                returnValue = this.time;
                break;
            case 'date':
                returnValue = this.date;
                break;                 
            case 'number':
                returnValue = this.number;
                break;                                  
        }
        
        return returnValue;
    }
    
    get length(){
        return this.value.length;
    }
    
    get number(){
        return isNaN(this.value) ? 0 : parseFloat(this.value);
    }
    
    get date(){
        return new Date(this.value);
    }
    
    get time(){
        var dt = new Date();
        var stt = new Date((dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear() + " " + this.value);
        return stt.getTime();    
    }
    
}