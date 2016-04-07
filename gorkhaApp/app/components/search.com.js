import {Pipe,Component,EventEmitter,ElementRef} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {AxelorRestService} from './../services/axelor.rest';

@Pipe({
    name:'titlecase'
})
export class TitleCase {
    transform(val,args){
        return val.substring(0,1).toUpperCase() + val.substring(1).toLowerCase() 
    }    
}

@Component({
    selector:'axelor-search',
    template:`
    
    <form (submit)="doSearch" class="axelor-search">
        <ion-card>
            <ion-card-header>
                Advance Search 
            </ion-card-header>
            <ion-card-content>
                <ion-row>
                    <ion-col width-20>
                        <ion-radio [checked]="operator == 'and'" value="and"  (click)="operator='and'"></ion-radio> <label>And</label>
                    </ion-col>
                    <ion-col  width-20>
                        <ion-radio [checked]="operator == 'or'" value="or" (click)="operator='or'"></ion-radio> <label>OR</label>                        
                    </ion-col>
                    <ion-col>
                        <ion-checkbox [(ngModel)]="showArchieved"></ion-checkbox> <label>Archieved</label>
                    </ion-col>
                </ion-row>
                
                <ion-row *ngFor="#filterOption of filterOptions">
                    <ion-col>                        
                        <ion-select [(ngModel)]="filterOption.fieldName">   
                            <ion-option value="">Select</ion-option>                         
                            <ion-option *ngFor="#option of fields" [value]="option.name">{{option.title}}</ion-option>
                        </ion-select>
                    </ion-col>
                    <ion-col>
                        <ion-select [(ngModel)]="filterOption.operator">
                            <ion-option value="">Select</ion-option>
                            <ion-option *ngFor="#option of operatorOptions" [value]="option.key">{{option.value}}</ion-option>
                        </ion-select>
                    </ion-col>
                    <ion-col>                                                
                        <ion-input [(ngModel)]="filterOption.value" placeholder="type"></ion-input>                        
                    </ion-col>
                </ion-row>
                
                <button light (click)="addFilter()">Add</button>
                <button light (click)="clearFilter()">Clear</button>
                <button light (click)="applyFilter()">Apply</button>
                
            </ion-card-content>
        </ion-card>
     </form>
    `,
    inputs:["entity"],
    styles:[`
        .axelor-search label {            
            position: relative;
            top: -3px;
            left: 5px;
        }
        .axelor-search ion-select {
            max-width:100%;
            position:relative;
        }
        .axelor-search ion-input {
            border-bottom:2px solid #bdbdbd;
        }
    `],
    directives:[IONIC_DIRECTIVES],
    providers:[AxelorRestService],
    pipes:[TitleCase]
})

export class AxelorSearchComponent {
    
    static get parameters(){
        return [[AxelorRestService]];
    }
    
    constructor(rest){
        this.rest = rest;
        this.operator = "and";
        this.showArchieved = false;
        this.fields = [];
        this.operatorOptions = [
                                {key:"=",value:"equals",allow:["all"]},
                                {key:"!=",value:"not equal",allow:["all"]},
                                {key:">=",value:"greater or equal"},
                                {key:"<=",value:"less or equal"},
                                {key:">",value:"greater than"},
                                {key:"<",value:"less than"},
                                {key:"between",value:"in range"},
                                {key:"notBetween",value:"not in range"},
                                {key:"like",value:"contains"},
                                {key:"notLike",value:"doesnt contain"},
                                {key:"isNull",value:"is null"},
                                {key:"notNull",value:"is not null"},
                               ];
        
        this.filterOptions = [{fieldName:"",operator:"",value:""}];
    }
    
    ngOnInit(){
        
        this.rest.entity = this.entity;
        
        this.rest.fields(this.entity).map(res=>res.json()).subscribe((data)=>{
            this.fields = data.data.fields.sort((v1,v2) => v1 > v2);
            console.log(data);
        })
    }
    
    addFilter(){
        this.filterOptions.push({fieldName:"",operator:"",value:""});
    }
    
    clearFilter(){
        this.filterOptions = [{fieldName:"",operator:"",value:""}];
    }
    
    applyFilter(){
        console.log(this.filterOptions);
    }
}


