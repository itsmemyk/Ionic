import {Component,EventEmitter} from 'angular2/core';
import {Alert,Events,IonicApp,IONIC_DIRECTIVES,NavController,Modal} from 'ionic-angular';
import {AxelorGridField} from './grid.field.com';
import {PropertyGetter} from './../pipes/getter.pipe';
import {AxelorRestService} from './../services/axelor.rest';
import {FormCreator} from './../pages/create/create';
import {FormEditor} from './../pages/edit/edit';

@Component({
    selector:'axelor-grid',
    inputs:['ref','entity','lazyLoading','lazyRecords'],
    outputs:['recordSelected : select'],
    template:`
    <ion-content>
        <div class="axelor-grid" [ngClass]="{filtered:isFiltering}">
            
            <ion-searchbar [(ngModel)]="keyword" (input)="filterRecords()" ></ion-searchbar>
            
            <ion-row class="head" m-t-10>
                <ion-col *ngFor="#heading of fields;" (click)="doSort(heading.name)">
                    <ion-icon class="align-left" name="arrow-dropdown" *ngIf="sort == heading.name && sortAsc"></ion-icon>
                    {{heading.title}}
                    <ion-icon class="align-right" name="arrow-dropup" *ngIf="sort == heading.name && !sortAsc"></ion-icon>
                </ion-col>
                <ion-col>
                    Action
                </ion-col>
            </ion-row>       
            
            <ion-row *ngFor="#record of data; #i = index" class="row-border" (click)="handleRecordClick(record)">
                <ion-col *ngFor="#field of fields;">
                    <label *ngIf="field.name == 'index'">
                        {{i+1}}
                    </label>
                    <div *ngIf="field.name != 'index'">                                        
                        <div [ngSwitch]="field.type">
                            <div *ngSwitchWhen="'image'">
                                <img src='img/{{record | getter:field.name}}' />
                            </div>
                            <div *ngSwitchWhen="'label'">
                                {{record | getter:field.name}}
                            </div>                        
                            <p *ngSwitchDefault>
                                -
                            </p>
                        </div>
                    </div>
                </ion-col>
                <ion-col>
                    <ion-icon name="create" (click)="editRecord(record.id)" m-r-10></ion-icon>
                    <ion-icon name="trash" (click)="removeRecord(record.id)"></ion-icon>
                </ion-col>        
            </ion-row>
            
            <ion-row *ngIf="totalDisplayRecords == 0" class="row-border">
                <ion-col>
                    <p>No Records Found</p>
                </ion-col>
            </ion-row>
            
            <ion-infinite-scroll id="asyncScroller" (infinite)="doRefresh($event)">
                <ion-infinite-scroll-content 
                    loadingSpinner="bubbles">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
            
        </div>
    </ion-content>

    <button clear class="favorite fancy-add" (click)="newRecord()">
        <ion-icon name="add" class="whitey" f-s-20></ion-icon>
    </button>

    `,  
    styles:[`        
        .axelor-grid {
            font-size:1.3rem;
        }
        .axelor-grid ion-row.head {
            background:#eee;
            font-size:1.4rem;
            font-weight:bolder;
        }
        .row-border {
            margin-top:0 !important;
            padding-top:10px;
            border-bottom:1.5px solid #eee;
        }
        .row-border:hover {
            background:#eee;
        }
        ion-col {
            margin:auto;
            position:relative;
            text-align:center;
        }        
    `],
    host:{
      'class':'axelor-grid-com'  
    },
    directives: [IONIC_DIRECTIVES,AxelorGridField],
    providers:[AxelorGridField,PropertyGetter,AxelorRestService],
    pipes:[PropertyGetter]
})

export class AxelorGrid {
    static get parameters(){
        return [[IonicApp],[PropertyGetter],[AxelorRestService],[NavController],[Events]];
    }
    
    constructor(app,getter,rest,nav,events){
        this.events = events;
        this.nav = nav;
        this.axelor = rest;
        this.app = app;
        this.lazyRecords = 0;
        this.limit = 5;
        this.lastIndex  = 5;
        this.getter = getter;
        this.fields = [];   
        this.recordSelected = new EventEmitter();    
        this.sort = "index";
        this.sortAsc = true;
        this.isFiltering = true;     
        this.keyword = "";       
        this.data = [];
        
        
    }
    
    ngOnInit(){           
        this.entityTitle = this.entity.substring(this.entity.lastIndexOf(".")+1);        
        this.axelor.entity = this.entity;
        
        this.events.subscribe(`refresh:${this.entity}:grid:com`,()=>{
           this.refreshGrid(); 
        });                                  
    }
    
    
    ngAfterContentInit(){
        this.formComponent = this.app.getComponent(this.ref);           
        
        this.axelor.login().subscribe(()=>{           
            this.refreshGrid();    
        }); 
    }
    
    /**
     * Field Child Control <field></field>
     */
    
    addNew(com){                
        this.fields.push(com);        
    }
    
    refreshGrid(){
        // console.log(this.fields);
        let searchFields = ["id"];
        
        this.fields.forEach((f)=>{
            if(f.name != "index")
                searchFields.push(f.name);    
        });
        
        // console.log(searchFields);
        
        this.axelor.search(searchFields).map(res => res.json()).subscribe((data)=>{
            
            this.data = data.data;
            
            this.storedData = this.data;
    
            this.lazyLoading = this.lazyLoading == 'true' ? true : false;
            
            this.totalDisplayRecords = this.totalRecords = this.storedData.length;    

            if(this.lazyLoading){
                
                this.lazyRecords = this.lazyRecords || this.lastIndex;                  
                this.lastIndex = parseInt(this.lazyRecords);
                
                if(this.totalRecords < this.lastIndex){
                    this.lastIndex = this.totalRecords;
                }
                    
                this.data = this.storedData.slice(0,this.lastIndex);
                                        
            } else {
                this.lastIndex = this.totalRecords;
            }
            
        },(err)=>{
            console.log("Rest Error",err)
        });
    }
    
    /*
    Search on Record
    */
    
    filterRecords(){
        let q = this.keyword.toLowerCase();
        
        if(q == '' && this.totalRecords > 40){
            this.isFiltering = false;
        }else{
            this.isFiltering = true;
        }
        
        let tempStore = this.storedData.slice(0,this.lastIndex);
        
        this.data = tempStore.filter((record)=>{
            let match=false;
            
            for(let f of this.fields){
                
                if(f.search){   
                                  
                    let value = this.getter.transform(record,[f.name]);    
                                
                    if(value.toLowerCase().indexOf(q) > -1){
                        match = true;
                        break;
                    }   
                }
            }
            return match;
        })
        
        this.totalDisplayRecords = this.data.length;
    }
    
    /*
    Sort on Record
    */
    doSort(col){
        if(this.sort == col){
            this.sortAsc = !this.sortAsc;
        }else {
            this.sortAsc = true;
        }
        
        this.sort = col;
        
        if(this.sortAsc)
            this.data = this.data.sort((v1,v2) => this.getter.transform(v1,[this.sort]) > this.getter.transform(v2,[this.sort]));
        else            
            this.data = this.data.sort((v1,v2) => this.getter.transform(v1,[this.sort]) < this.getter.transform(v2,[this.sort]));
    }
    
    /*
    Click on Record
    */
    handleRecordClick(data){
        this.recordSelected.next(data);
    }
    
    /**
     * Do Refreshing 
     */
    doRefresh(asyncTask){
        this.isFiltering = false;     
        this.isScrolling = true;
        
        console.log("rendering");
        
        setTimeout(()=>{
           
           if(this.totalRecords > this.lastIndex){               
               this.lastIndex++;
               this.pagingGrid();
               asyncTask.complete();
           } else {
               asyncTask.complete();
               asyncTask.enable(false);
           }
           this.isScrolling = false;        
        },50000);
        
        /*setTimeout(()=>{
            if(this.totalRecords <= this.lastIndex){
                asyncTask.enable(false);       
            }else{
                asyncTask.complete();    
                this.lastIndex = this.lastIndex + 1;
                console.log(this.lastIndex);                
            }
            
        },500);    */
    }
    
    pagingGrid(){
        
        this.data.push(tis.storedData[this.lastIndex-1]);
        //console.log(this.storedData,this.lastIndex);
    }
    
    newRecord(){
       let modal = Modal.create(FormCreator,this.formComponent)
       this.nav.present(modal);
    }    
    
    editRecord(id){
       let modal = Modal.create(FormEditor,{hdnId:id,formComponent:this.formComponent})
       this.nav.present(modal);
    }    
    
    removeRecord(id){
       let confirm = Alert.create({
          title:`Remove ${this.entityTitle}`,
          body:" Are you sure Want to Remove ?",
          buttons:[{
              text:"Ok",
              handler:()=>{      
                this.axelor.delete(id).subscribe(()=>{
                    this.refreshGrid();
                    
                    let alert = Alert.create({
                        title:`${this.entityTitle}`,
                        subTitle:"Record Removed!!!",
                        buttons: ["Ok"]
                    });
                    
                    this.nav.present(alert);
                });        
              }
          },{
              text:"Cancel",
              handler:()=>{      
              }  
          }]
      });
      this.nav.present(confirm);
    }
}