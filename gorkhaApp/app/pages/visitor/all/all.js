import {Page,Events,NavController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/visitor/all/all.html',    
})

export class AllVisitor {
    
    static get parameters(){
        return [[NavController],[Events]]
    }
    
    constructor(nav,events){
        this.nav = nav;
        this.events = events;
        this.visitors = [];
        
    }
    
    doRefresh(asyncTask){
        
        console.log(asyncTask);
        
        setTimeout(()=>{
        this.visitors.push({name:"abc",desc:"10:30 AM - 04:50 PM",img:"img/avatar7.png"});
        this.visitors.push({name:"xyz",desc:"10:30 AM - 04:50 PM",img:"img/avatar8.png"});
        this.visitors.push({name:"pqr",desc:"10:30 AM - 04:50 PM",img:"img/avatar9.png"});
        this.visitors.push({name:"mno",desc:"10:30 AM - 04:50 PM",img:"img/avatar10.png"});
        this.visitors.push({name:"wxy",desc:"10:30 AM - 04:50 PM",img:"img/avatar11.png"});
        
            asyncTask.complete();   
        },15000);
        
    }
}