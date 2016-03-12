import {Page,Alert,NavController} from 'ionic-angular';
import {Today} from './../../components/date.com';
import {AxelorRate} from './../../components/rating.com';
import {AxelorInput} from './../../components/input.com';
import {AxelorList} from './../../components/listview.com';
import {AxelorGrid} from './../../components/grid.com';
import {AxelorGridField} from './../../components/grid.field.com';

//export class 
@Page({
  templateUrl: 'build/pages/page1/page1.html',
  directives: [Today,AxelorRate,AxelorInput,AxelorList,AxelorGrid,AxelorGridField]
})

export class Page1 {
    
    static get parameters(){
        return [[NavController]];
    }
    
    constructor(nav){
        this.nav = nav;
        this.rate = 0;
        this.txt = "";
        this.value = 'init';
        this.peoples = [];
        this.peoples.push({name:"Virat",fullName:{firstName:'Virat',lastName:'Kohli'},img:"avatar10.png",info:{more:{content:"Cricketer"}}});
        this.peoples.push({name:"Mayank",fullName:{firstName:'Mayank',lastName:'Mah'},img:"avatar13.png",info:{more:{content:"Self"}}});
        this.peoples.push({name:"Hetal",fullName:{firstName:'Hetal',lastName:'Vaghela'},img:"avatar15.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Drashti",fullName:{firstName:'Drashti',lastName:'Kohli'},img:"avatar14.ico",info:{more:{content:"Friend"}}});        
    }
    
    changed(event){
        //console.log("changedIt"+event.now);
    }
    
    rateChanged(event){
    }
    
    viewPeople(people){
        /*
        let alert = Alert.create({
            title:'Record Data',
            subTitle:'<b>'+JSON.stringify(people)+'</b>',
            buttons: ['Ok']    
        }); 
        this.nav.present(alert);*/
    }
}
