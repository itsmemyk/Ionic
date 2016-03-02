import {Alert, Page,NavController, Modal,Events} from 'ionic-framework/ionic';
import {Database} from './../../services/db.service';
import {GroupMember} from './../group-member/member';

@Page({
  templateUrl: 'build/pages/page3/page3.html',
  providers: [Database],
  styles:[`
    
  `]
})

export class Page3 {
    
    static get parameters(){
        return [[NavController],[Database],[Events]];
    }
    
    constructor(nav,db,events){
        this.nav = nav;
        this.db = db;
        this.events = events;
        
        this.refreshGroup();
        this.listen();
    }
    
    
    refreshGroup(){
        this.db.fetch("select g.id,g.name,count(gm.id) as Total from groups g LEFT JOIN group_members gm ON g.id = gm.groupid group by g.id,g.name",true).subscribe((g)=>{
           this.cloneGroups = this.groups = g;
        });
    }
    
    
    filterGroup(q){
        q = q.toLowerCase();
        
        this.groups = this.cloneGroups.filter((item)=>{
            if(item.name.toLowerCase().indexOf(q) !== -1)
                return true;
            else
                return false;
        });
    }
    
    addNewGroup(){
        let prompt = Alert.create({
            title:"New Group",
            body:"Group Title",
            inputs:[
                {
                    name:'name',
                    placeholder:'Name'
                },
            ],
            buttons:[
                {
                    text:'Cancel'
                },
                {
                    text:'Save',
                    handler: (data) =>{
                        
                        if(data.name){
                            this.db.add("groups",{name:data.name});
                            this.refreshGroup();
                        }
                    }
                }
            ]
        });
        
        this.nav.present(prompt);
    }
    
    editGroup(group){
        let prompt = Alert.create({
            title:"Edit Group",
            body:"Group Title",
            inputs:[
                {
                    name:'name',
                    placeholder:'Name',
                    value:group.name
                },
            ],
            buttons:[
                {
                    text:'Cancel'
                },
                {
                    text:'Save',
                    handler: (data) =>{
                        if(data.name){
                            this.db.update("groups",{id:group.id},{name:data.name});
                            this.refreshGroup();
                        }
                    }
                }
            ]
        });
        
        this.nav.present(prompt);
    }
    
    removeGroup(groupId){
        
        let confirm = Alert.create({
          title:"Remove Group",
          body:" Are you sure Want to Remove ?",
          buttons:[{
              text:"Ok",
              handler:()=>{
                this.db.remove("groups",{id:groupId});
                this.refreshGroup();
              }
          },{
              text:"Cancel",
              handler:()=>{      
              }  
          }]
      });
      
      this.nav.present(confirm);
    }
    
    addGroupMember(group,flag=false){
        group.isView = flag;
        
        let modal = Modal.create(GroupMember,group);
        this.nav.present(modal); 
    }
    
    listen(){
        this.events.subscribe("group:updated",()=>{
           this.refreshGroup(); 
        });
    }
}
