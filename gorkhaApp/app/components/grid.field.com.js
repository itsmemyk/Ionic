import {Component} from 'angular2/core';
import {AxelorGrid} from './grid.com';

@Component({
    selector:'field',    
    template:`
        {{name}}
    `,
    inputs:['name','type','title','search']           
})


export class AxelorGridField {    
    
    static get parameters(){
        return [[AxelorGrid]];
    }
    
    constructor(grid){
        grid.addNew(this);
    }    
    
    ngOnInit(){
        this.type = this.type || 'label';
        this.title = this.title || this.name;
        this.search = this.search == 'true' ? true : false;        
    }
}