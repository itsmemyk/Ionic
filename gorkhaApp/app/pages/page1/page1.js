import {Page} from 'ionic-angular';
import {Today} from './../../components/date.com';
import {AxelorRate} from './../../components/rating.com';
import {AxelorInput} from './../../components/input.com';
import {AxelorList} from './../../components/listview.com';

//export class 
@Page({
  templateUrl: 'build/pages/page1/page1.html',
  directives: [Today,AxelorRate,AxelorInput,AxelorList]
})

export class Page1 {
    
    constructor(){
        this.rate = 0;
        this.txt = "";
        
        this.peoples = [];
        this.peoples.push({name:"Virat",img:"avatar10.png",info:"Cricketer"});
        this.peoples.push({name:"Mayank",img:"avatar13.png",info:"Self"});
        this.peoples.push({name:"Hetal",img:"avatar15.ico",info:"Friend"});
        this.peoples.push({name:"Drashti",img:"avatar14.ico",info:"Friend"});
    }
    
    changed(event){
        //console.log("changedIt"+event.now);
    }
    
    rateChanged(event){
    }
}
