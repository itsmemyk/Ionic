import {IONIC_DIRECTIVES,Page,Platform,IonicApp,System,NavController,Modal} from 'ionic-angular';
import {Component,View,ViewChild,ViewContainerRef,TemplateRef,DynamicComponentLoader,Injector,ElementRef} from 'angular2/core';
import {Http} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';

import {AxelorFormComponent} from './../../components/form.com';

import {OneToManyComponent} from './../../components/one.to.many.com.js';

import {AxelorInput,InputComponent} from './../../components/input.com';
import {PasswordComponent} from './../../components/password.com';
import {SelectComponent,SelectOptionComponent} from './../../components/select.com';
import {ButtonComponent} from './../../components/button.com';
import {ToggleComponent} from './../../components/toggle.com';

import {CardComponent} from './../../components/card.com';

import {AxelorRestService} from './../../services/axelor.rest';
import {FormCreator} from './../create/create';

import {AxelorSearchComponent} from './../../components/search.com';

import {AxelorList,AxelorListField,AxelorCustomTemplate} from './../../components/list.com';

import 'rxjs/Rx';

import {Widget1} from './widget1';
import {Widget2} from './widget2';

import {CodePage} from './../code/code';

@Page({
  templateUrl: 'build/pages/page3/page3.html',
  directives: [PasswordComponent,AxelorFormComponent,ButtonComponent,Widget1,SelectComponent,SelectOptionComponent,InputComponent,OneToManyComponent,AxelorSearchComponent,AxelorList,AxelorListField,AxelorCustomTemplate,IONIC_DIRECTIVES,CardComponent,ToggleComponent],
  providers: [AxelorRestService]
})

export class Page3 {
    
    static get parameters(){
        return [[Http],[AxelorRestService],[IonicApp],[Platform],[DynamicComponentLoader],[Injector],[ElementRef],[NavController]];    
    }
    
    constructor(http,axelor,app,platform,loader,injector,elementRef,nav){
        this.nav = nav;
        this.elementRef = elementRef;
        this.injector = injector;
        this.loader = loader;
        this.axelor = axelor;
        this.app = app;
        this.platform = platform;
        this.username = "";
        this.password = "";

                             
        http.get('build/pages/page3/layout.html').subscribe((res)=>{
            this.loader.loadIntoLocation(toComponent(res._body,[AxelorFormComponent,InputComponent,CardComponent,ToggleComponent,IONIC_DIRECTIVES]),this.elementRef,'formcontainer');
        });     

        // let d = new Date();
        
        // d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
        // let expires = "expires=" + d.toUTCString();
        // document.cookie = "rememberMe=deleteMe; Path=/axelor-crm; Max-Age=0; Expires=Wed, 16-Mar-2016 07:06:16 GMT ;JSESSIONID=D76A7EE9B6BC329B978CB71C8BC3A128; Path=/axelor-crm/; HttpOnly";
        
        
        //this.axelor.doLogin();
        
        // this.axelor.doLogin().subscribe(data=>{
        //     console.log(data);
        // },error=>{
        //     console.log(error);
        // });
        
        this.axelor.entity = "com.axelor.code.db.Code";
       
        // this.axelor.login().subscribe(()=>{
            
        //     // this.axelor.get(2).subscribe(data=>{
        //     //     console.log("getted",data);
        //     // },error=>{
        //     //     console.log(error);
        //     // });  
            
        //     // this.axelor.post(3, {code:"test",title:"testing"}).subscribe(data=>{
        //     //     console.log("Added",data);
        //     // },error=>{
        //     //     console.log(error);
        //     // });  
        // });
        
        
        // this.axelor.ready().then(()=>{          
        //     this.axelor.put({code:"test",title:"testing"}).subscribe(data=>{
        //         console.log("Added",data);
        //     },error=>{
        //         console.log(error);
        //     });  
        // })
        
        // this.axelor.login().subscribe(log =>{
            
        // });
               
        
        
        
      //  this.axelor.getAll();
      
      
      this.platform.ready().then(() => {                 
        this.widget  = this.app.getComponent("customRenderer");
        //console.log(this.widget);
        // System.import("./widget1").then(comp=> this.loader.loadNextToLocation(comp["widget1"],this.widget));         
      });
    }
    
    ngOnInit(){
        
    }
    
    ngAfterContentInit(){
        // var btn = document.querySelector("body /deep/ #btn1");
        // setTimeout(function(){
        //    btn.dispatchEvent(new Event("custom"));
        // },5000);                
    }
    
    changed(data){
        console.log(data);
    }
    
    saveData(values){
        console.log("values",values);
    }
    
    clickMe(){
        console.log("clicked");
    }
    
    test(){
      //  let modal = Modal.create(FormCreator,this.widget)
     //   this.nav.present(modal);
        // console.log(this.widget);
        //console.log(document.getElementsById("customRenderer"));
        // this.loader.loadIntoLocation(toComponent(this.formText),this.elementRef,'dynamicWidget')
        //this.loader.loadAsRoot(com,'#dynamicWidget',this.injector);
    }
    
    
    submittedData(values){
        console.log(values);
    }
}


function toComponent(template, directives = []) {
  @Component({ selector: 'fake-component' })
  @View({ template, directives })
  class FakeComponent {}
  
  return FakeComponent;
}