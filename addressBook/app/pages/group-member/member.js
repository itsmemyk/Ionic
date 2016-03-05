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
        
        let query = `
            select c.*,gm.id as GroupId from contacts c JOIN group_members gm ON c.id = gm.memberid where gm.groupid = ${this.group.id} UNION ALL select c.*,0 as GroupId from contacts c where c.id NOT IN (select gm.memberid from group_members gm where gm.groupid = ${this.group.id}) 
        `;
        
        this.db.fetch(query,true).subscribe((gm)=>{
           
           if(! this.group.isView){            
                gm.forEach((ele)=>{                             
                    if(ele.GroupId > 0)
                        ele.checked = true;
                    else
                        ele.checked = false;
                        
                    ele.inGroup = ele.checked;
                });
           }
           else {
               gm = gm.filter((ele)=>{
                   if(ele.GroupId > 0)
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