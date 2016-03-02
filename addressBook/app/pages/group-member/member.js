import {Page,NavController,NavParams,ViewController,Events} from 'ionic-framework/ionic';
import {Database} from './../../services/db.service';
import {Page3} from './../page3/page3';


@Page({
    templateUrl:'build/pages/group-member/member.html',
    providers:[Database]
})

export class GroupMember{
    static get parameters() {
        return [[ViewController],[NavController],[Database],[NavParams],[Events]];
    }
    
    constructor(viewCtrl,nav,db,params,events){
        this.viewCtrl = viewCtrl;
        this.nav = nav;
        this.db = db;
        this.params = params;
        this.events = events;
        this.group = params.data;
        
        this.listen();
        
        this.checkboxes = [];
    }
    
    ngOnInit(){
        this.memberList();
    }
    
    dismiss(){
        this.viewCtrl.dismiss();
    }
    
    memberList(){
        
        this.db.fetch('select * from group_members where groupid = '+this.group.id,true).subscribe((groupContacts)=>{            
            this.groupContacts = groupContacts;    
        })
        
        this.db.fetch('select * from contacts ',true).subscribe((gm)=>{
           
           if(! this.group.isView){            
                gm.forEach((ele)=>{                             
                    if(this.groupContacts.find((v)=> v.memberid == ele.id ))
                        ele.checked = true;
                    else
                        ele.checked = false;
                        
                        ele.inGroup = ele.checked;
                });
           }
           else {
               gm = gm.filter((ele)=>{
                   if(this.groupContacts.find((v)=> v.memberid == ele.id ))
                        return true;
                    else
                        return false; 
               });
           }
           
           this.cloneMembers = this.members = gm.sort((v1,v2) => v1.name.toLowerCase() > v2.name.toLowerCase());;
        });
    }
    
    listen(){
        this.events.subscribe("record:updated",()=>{
           this.memberList(); 
        });
    }
    
    // test(){
    //     console.log("work");
    // }
    
    saveGroupMembers(){
        this.members.forEach((ele)=>{
           if(ele.checked){
               if(ele.inGroup == false){
                   this.db.add("group_members",{groupid:this.group.id,memberid:ele.id},[0,1]);
                   this.events.publish("group:updated");
               }
           } else {
               if(ele.inGroup == true){
                   this.db.execute(`delete from group_members where groupid=${this.group.id} and memberid=${ele.id}`)
                   this.events.publish("group:updated");
               }
           }
        });
        
        this.nav.pop();
    }
}