import {Page,Modal, NavController,Events} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {Database} from './../../services/db.service';
import {ContactDetail} from './../contact-detail/detail';

@Page({
  templateUrl: 'build/pages/page2/page2.html',
  providers: [Database]
})

export class Page2 {
 
    static get parameters(){
        return [[NavController],[Database],[Events]];
    }
    
    constructor(navController,db,events){
        this.nav = navController;
        this.db = db;
        this.events = events;
        this.listen();
    }   
    
    ngOnInit(){
        this.favouriteList();
    }
    
    favouriteList(){
        this.db.fetch("contacts").subscribe((c)=>{
            this.cloneContacts = this.contacts = c.filter((v)=> v.is_fav == 1).sort((v1,v2) => v1.name.toLowerCase() > v2.name.toLowerCase());
            this.totalContact = this.contacts.length;            
        })
    }
    
    filterContact(q){
        //console.log(q);
        
        q = q.toLowerCase();
        
        this.contacts = this.cloneContacts.filter((item)=>{
            if(item.name.toLowerCase().indexOf(q) !== -1 || item.description.toLowerCase().indexOf(q) !== -1)
                return true;
            else
                return false;
        });
        this.totalContact = this.contacts.length;
    }
    
    listen(){
        this.events.subscribe("record:updated",()=>{
           this.favouriteList(); 
        });
    }
    
    viewContact(contact){
        let modal = Modal.create(ContactDetail,contact);
        this.nav.present(modal);
    }
}
