import {Platform, Page,Events,NavController,Config} from 'ionic-angular';
import {Pipe} from 'angular2/core';


@Pipe({name: 'repeat'})
export class RepeatPipe{
  transform(value, args) {
    if (args.length == 0) {
      throw new Error('repeat pipe requires one argument');
    }
    let times = args[0];
    return value.repeat(times);
  }
}


@Page({
    templateUrl: 'build/pages/visitor/all/all.html',
    pipes: [RepeatPipe]    
})

export class AllVisitor {
    
    static get parameters(){
        return [[Platform],[NavController],[Events],[Config]]
    }
    
    constructor(platform,nav,events,config){
        this.platform = platform;
        this.nav = nav;
        this.events = events;
        this.visitors = [];
        
        this.platform.ready().then(()=>{
            console.log("title"+config.get('appTitle'));    
        });
    }
    
    doRefresh(asyncTask){
        
        this.refresheer = asyncTask;
                
        setTimeout(()=>{
            this.visitors.push({name:"VV0"+Math.round(Math.random()*11),desc:"10:30 AM - 04:50 PM",img:"img/avatar13.png"});        
            asyncTask.complete(); 
           
        },1000);
        
    }
    
    ngAfterContentChecked(){
        //console.log("view  content checked");
    }
    
    ngOnDestroy(){
    }
}
