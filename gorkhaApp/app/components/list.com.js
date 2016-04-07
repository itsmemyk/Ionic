import {Input,Output,Component,EventEmitter,View,Pipe,ElementRef,Renderer,DynamicComponentLoader} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {PropertyGetter} from './../pipes/getter.pipe';
import {AxelorRestService} from './../services/axelor.rest';

@Component({
    selector:'field',
    template:``,
    inputs:["name:x-name"]
})
export class AxelorListField {
    static get parameters(){
        return [[AxelorList]];
    }
    
    constructor(list){
        list.addNew(this);
    }  
}

@Component({
    selector:'axelor-template',
    template:`<ng-content></ng-content>`,
    inputs:['renderTemplate:x-template']
})
export class AxelorCustomTemplate {
    static get parameters(){
        return [[AxelorList],[ElementRef],[Renderer]];
    }
    
    constructor(listView,element,render){        
        this.element =  element;    
        listView.CustomTemplate = this;
    }
    
    ngOnInit(){
        this.renderTemplate = this.element._appElement.nativeElement.innerHTML;        
    }
}

@Component({
    selector:'axelor-template-renderer',
    template:`<div #container></div>`,
    inputs:['record','renderHTML']
})
export class AxelorCustomTemplateRenderer {   
    static get parameters(){
        return [[DynamicComponentLoader],[ElementRef]];
    } 
    
    constructor(loader,elementRef){
        this.loader = loader;
        this.elementRef = elementRef;
    }
    
    ngOnInit(){    
        this.loader.loadIntoLocation(toComponent(this.renderHTML,{data:this.record},[IONIC_DIRECTIVES]),this.elementRef,'container');
    }
}

@Component({
    selector:'axelor-list',
    inputs:['model'],
    template:` 
        <ion-list>      
            <ion-item *ngFor="#record of data">
                <axelor-template-renderer [record]="record" [renderHTML]="customLayoutHTML">                      
                </axelor-template-renderer>
            </ion-item>
        </ion-list>        
    `,
    directives: [IONIC_DIRECTIVES,AxelorListField,AxelorCustomTemplate,AxelorCustomTemplateRenderer],
    providers:[PropertyGetter],
    pipes:[PropertyGetter]
})

export class AxelorList {
    
    static get parameters(){
        return [[AxelorRestService],[DynamicComponentLoader],[ElementRef]];
    }
    
    constructor(rest,loader,elementRef){
        this.elementRef = elementRef;
        this.loader = loader;
        this.rest = rest;
        this.fields = [];              
        this.data = [];         
    }
    
    ngOnInit(){
    
        this.customLayoutHTML = ''//                 
        this.rest.entity = this.model;
        
         //console.log(this.customLayoutHTML);
        // var element=this.customLayout.element.nativeElement;
        // console.log("native layout ",element.innerHTML);
        //console.log();
        
        //  let stringHTML = "my name is {{record.name}}";
        //  this.loader.loadIntoLocation(toComponent(stringHTML,{name:'mayank'}),this.elementRef,'loaderContainer')
        //  console.log(this.customLayout.element.nativeElement.innerHTML.toString());                         
    }
    
    ngAfterContentInit(){
        this.customLayoutHTML = this.customLayout.renderTemplate;
        this.customLayoutHTML = this.customLayoutHTML.replace(/ngIf/ig,'*ngIf').replace(/ngFor/ig,'*ngFor');
        this.refreshList();                         
    }
    
    addNew(com){         
        this.fields.push(com);        
    }
    
    refreshList(){
        let searchFields = [];
        
        this.fields.forEach((f)=>{
            searchFields.push(f.name);    
        });
        
        this.searchFields = searchFields;
        
        this.rest.search(this.searchFields,null,40).map(res => res.json()).subscribe((data)=>{
            this.data = data.data;
        },(err)=>{
            console.log("Rest Error",err)
        });
    }
    
    set CustomTemplate(tmpl){
        this.customLayout = tmpl; 
    }
}

function toComponent(template,record, directives = []) {
  @Component({ selector: 'fake-component' })
  @View({ template, directives })
  class FakeComponent { 
      
      constructor(){
          this.record = record.data;
          
          for(var obj in this.record){
              this[obj]=eval('this.record.'+obj);              
          }
          
      }
  }
  return FakeComponent;
}   



/*
@Pipe({
    name:'dataTransform',    
    providers:[PropertyGetter]
})
export class DataTransform{
    static get parameters(){
        return [[PropertyGetter]];    
    }
    
    constructor(getter){
        this.getter = getter;
    }
    
    transform(html,args){
        let record = args[0];
        
        for(var i=0;i<html.length;i++){
            
            if(html[i]==="{"){
                i++;
                var word = '';
                while(html[i] !== "}"){
                    word += html[i];
                    i++;
                }
                var regex = new RegExp("{"+word+"}","g");
                html = html.replace(regex, this.getter.transform(record,[word]));               
            }
        }   
        return html;// this.escapeHTML(html);
    }
}*/