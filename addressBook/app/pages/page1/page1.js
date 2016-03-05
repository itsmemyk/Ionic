import {Page , NavController, Modal, Alert, Events} from 'ionic-framework/ionic';
import {Inject,Injectable,Pipe,PipeTransform} from 'angular2/core';
import {ContactForm} from './../contact-form/form';
import {Database} from './../../services/db.service';
import {ContactDetail} from './../contact-detail/detail';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  styles: [`
    
  `],
  providers: [Database]
})

export class Page1 {
    
   static get parameters() {
     return [[NavController],[Database],[Events]];
   }
    
    constructor(nav,db,events) {
        this.nav = nav;
        this.db = db;    
        this.events = events;
        
        //this.db.create("group_members",{id:"INTEGER PRIMARY KEY AUTOINCREMENT",groupid:"INTEGER REFERENCES groups(id)",memberid:"INTEGER REFERENCES contacts(id)"})
    }
    
    ngOnInit(){
        this.refreshList();
    }
    
    refreshList(){
        this.db.fetch("contacts").subscribe((c)=>{
            this.cloneContacts = this.contacts = c.sort((v1,v2) => v1.name.toLowerCase() > v2.name.toLowerCase());
        })
        
        this.publishEvents();
    }
    
    filterContact(q){
        q = q.toLowerCase();
        
        this.contacts = this.cloneContacts.filter((item)=>{
            if(item.name.toLowerCase().indexOf(q) !== -1 || item.description.toLowerCase().indexOf(q) !== -1)
                return true;
            else
                return false;
        });
    }
    
    addNewContact(){
        let form = Modal.create(ContactForm);
        this.nav.present(form);
    }
    
    editContact(contact){
        //console.log(contact);
        let form2 = Modal.create(ContactForm,contact);
        this.nav.present(form2);
    }
    
    toggleFavourite(id,fav){
        let msg = "Favourite Added!!!";
        
        if(fav){
            fav=0;
            msg = "Ooops..Favourite Removed!!";   
        }
        else
            fav=1;
            
        this.db.update("contacts",{id:id},{is_fav:fav},[0]);
        
        let alert = Alert.create({
            title:"Contact",
            subTitle:msg,
            buttons: ["Ok"]
        });
        
        this.nav.present(alert);
        this.refreshList();
    }
    
    removeContact(id){
      let confirm = Alert.create({
          title:"Remove Contact",
          body:" Are you sure Want to Remove ?",
          buttons:[{
              text:"Ok",
              handler:()=>{
                this.db.remove("contacts",{id:id});
                this.refreshList();
              }
          },{
              text:"Cancel",
              handler:()=>{      
              }  
          }]
      });
      
      this.nav.present(confirm);
    }
    
    viewContact(contact){
        let modal = Modal.create(ContactDetail,contact);
        this.nav.present(modal);
    }
    
    publishEvents(){
        this.events.publish("record:updated");
    }
}
