import {Page,Alert,NavController,Events} from 'ionic-framework/ionic';
import {DataService} from './../../services/data.provider';
import {Detail} from './../Contact-Details/detail';

@Page({
  templateUrl: 'build/pages/page2/page2.html',
  providers: [DataService]
})
export class Page2 {
  
  constructor(db: DataService, nav: NavController, events : Events) {
      this.contact = {name:'', mobileNo:'', createdOn: Date.now(), updatedOn:Date.now(), isFavourite:false};
      this.db = db;
      this.editMode=false;
      this.refreshList();
      this.nav = nav;
      this.segment = 'all';
      this.events = events;
      this.notify();
  }
  
  refreshList(){
      this.db.getAll().then((contacts)=>{
         this.cloneContacts = this.contacts = JSON.parse(contacts) || []; 
         this.favContacts = this.contacts.filter((c)=>{
            return c.isFavourite; 
         });
      });
      this.contact = {name:'', mobileNo:'', createdOn: Date.now(), updatedOn:Date.now(), isFavourite:false};
      this.editMode = false;
  }
  
  saveContact(){
      this.contact.updatedOn = Date.now();
      
      if(this.editMode){
          console.log("edit");
          let index = this.contacts.indexOf(this.contact);
          this.db.update(index,this.contact);
      }
      else {
          this.contact.createdOn = Date.now();    
          this.db.save(this.contact);
      }
      this.refreshList();      
  }
  
  editContact(item){
    this.editMode = true;   
    this.contact = item; 
  }

  removeContact(item){
      
      let confirm = Alert.create({
          title:"Remove Contact",
          body:" Are you sure Want to Remove ?",
          buttons:[{
              text:"Ok",
              handler:()=>{      
                let index = this.contacts.indexOf(item);      
                this.db.remove(index);
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
  
  searchContact(meta){
      let q = meta.value.toLowerCase();
      //console.log(q +" "+ this.cloneContacts.length);
      if( q.trim() == ''){
          this.refreshList();
      }else {
          
          this.contacts = this.cloneContacts.filter((people)=>{
              if(people.name.toLowerCase().indexOf(q) > -1 || people.mobileNo.toLowerCase().indexOf(q) > -1){
                  return true;
              }else {
                  return false;
              }
          });
          
           this.favContacts = this.contacts.filter((c)=>{
            return c.isFavourite; 
         });
      }
  }
  
  viewContact(contact){
      this.nav.push(Detail, contact);
  }
  
  favouriteContact(contact){
     
     if(contact.isFavourite === false){
         
        contact.isFavourite=true;
        
        let alert = Alert.create({
            title:"Contact",
            subTitle:"Favourite Added!!!",
            buttons: ["Ok"]
        });
        
        this.nav.present(alert);
        let index = this.contacts.indexOf(contact);
        this.db.update(index,contact);  
        this.refreshList();   
     }
  }
  
  
  notify(){
    this.events.subscribe("record:add",(msg)=>{
        let alert = Alert.create({
            title:"Contact",
            subTitle:"Record Added!!!",
            buttons: ["Ok"]
        });
        
        this.nav.present(alert);
    });   
    
     this.events.subscribe("record:update",(msg)=>{
        let alert = Alert.create({
            title:"Contact",
            subTitle:"Record Updated!!!",
            buttons: ["Ok"]
        });
        
        this.nav.present(alert);
    });      
    
     this.events.subscribe("record:remove",(msg)=>{
        let alert = Alert.create({
            title:"Contact",
            subTitle:"Record Removed!!!",
            buttons: ["Ok"]
        });
        
        this.nav.present(alert);
    });         
  }
}
