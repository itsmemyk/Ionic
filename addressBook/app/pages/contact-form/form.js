import {Component} from 'angular2/core';
import {Page,Alert,ViewController,NavController,NavParams} from 'ionic-framework/ionic';
import {Page1} from './../page1/page1';
import {TabsPage} from './../tabs/tabs';
import {Database} from './../../services/db.service';

@Page({
  templateUrl: 'build/pages/contact-form/form.html',
  providers: [Database],
  styles:[`
    ion-avatar {
        cursor: pointer;
    }
    ion-label {
        padding-left: 10px;
        color:#3F51B5 !important;
    }
    ion-input,ion-textarea {
        padding-left: 13px;
        background: #eee;
    }
 
  `]
})

export class ContactForm {
    
    static get parameters(){
        return [[ViewController],[Database],[NavController],[NavParams]];
    }
    
    constructor(viewCtrl,db,nav,navParams){
        this.editContact=false;
        this.viewCtrl = viewCtrl;
        this.db = db;
        this.nav = nav;
        this.navParams = navParams;
        
        this.contact = {    
            id:0,
            name:"",
            mobile:"",
            description:"",
            thumb:"",
            is_fav:0,
            createdOn:Date.now()    
        };
       
    }
   
    ngOnInit(){
        this.icons = ["avatar1.png","avatar9.png","avatar6.png","avatar7.png","avatar8.png","avatar10.png","avatar11.png","avatar12.png","avatar13.png","avatar14.ico","avatar15.ico","avatar14.png"];
        this.contact.thumb = this.icons[0];     
        
         if(this.navParams.data.id != undefined){
            this.editContact = true;
            this.contact = this.navParams.data;
        }
    }
    
    dismiss() {
        this.viewCtrl.dismiss();
    }
    
    selectIcon(icon){
        this.contact.thumb = icon;
    }
    
    save(){
            
        if( ! this.editContact){
            delete this.contact.id;
            this.db.add("contacts",this.contact,[4]);
        }else {
            let id = this.contact.id;
            delete this.contact.id;
            this.db.update("contacts",{id:id},this.contact,[4]);
        }
        
        this.nav.push(TabsPage);
    }
}