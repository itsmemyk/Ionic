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
        return this.value;
    }
    
    get length(){
        return this.value.length;
    }
    
    get number(){
        return isNaN(this.value) ? 0 : parseFloat(this.value);
    }
    
}