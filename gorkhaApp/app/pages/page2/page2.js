import {Page} from 'ionic-angular';
import {Today} from './../../components/date.com';
import {AxelorRate} from './../../components/rating.com';
import {AxelorInput} from './../../components/input.com';
import {AxelorList} from './../../components/listview.com';
import {AxelorGrid} from './../../components/grid.com';
import {AxelorGridField} from './../../components/grid.field.com';


@Page({
  templateUrl: 'build/pages/page2/page2.html',
  directives: [Today,AxelorRate,AxelorInput,AxelorList,AxelorGrid,AxelorGridField]
})
export class Page2 {
    
    constructor(){
        this.peoples = [];
        this.peoples.push({name:"Virat",fullName:{firstName:'Virat',lastName:'Kohli'},img:"avatar10.png",info:{more:{content:"Cricketer"}}});
        this.peoples.push({name:"Anushka",fullName:{firstName:'Anushka',lastName:'Sharma'},img:"avatar15.ico",info:{more:{content:"Actresses"}}});
        this.peoples.push({name:"Mayank",fullName:{firstName:'Mayank',lastName:'Mah'},img:"avatar13.png",info:{more:{content:"Self"}}});
        this.peoples.push({name:"Hetal",fullName:{firstName:'Hetal',lastName:'Vaghela'},img:"avatar15.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Drashti",fullName:{firstName:'Drashti',lastName:'Gopani'},img:"avatar14.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Virat1",fullName:{firstName:'Virat1',lastName:'Kohli'},img:"avatar10.png",info:{more:{content:"Cricketer"}}});
        this.peoples.push({name:"Anushka1",fullName:{firstName:'Anushka2',lastName:'Sharma'},img:"avatar15.ico",info:{more:{content:"Actresses"}}});
        this.peoples.push({name:"Mayank1",fullName:{firstName:'Mayank3',lastName:'Mah'},img:"avatar13.png",info:{more:{content:"Self"}}});
        this.peoples.push({name:"Hetal1",fullName:{firstName:'Hetal4',lastName:'Vaghela'},img:"avatar15.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Drashti1",fullName:{firstName:'Drashti5',lastName:'Gopani'},img:"avatar14.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Virat",fullName:{firstName:'Virat',lastName:'Kohli'},img:"avatar10.png",info:{more:{content:"Cricketer"}}});
        this.peoples.push({name:"Anushka",fullName:{firstName:'Anushka',lastName:'Sharma'},img:"avatar15.ico",info:{more:{content:"Actresses"}}});
        this.peoples.push({name:"Mayank",fullName:{firstName:'Mayank',lastName:'Mah'},img:"avatar13.png",info:{more:{content:"Self"}}});
        this.peoples.push({name:"Hetal",fullName:{firstName:'Hetal',lastName:'Vaghela'},img:"avatar15.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Drashti",fullName:{firstName:'Drashti',lastName:'Gopani'},img:"avatar14.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Virat1",fullName:{firstName:'Virat1',lastName:'Kohli'},img:"avatar10.png",info:{more:{content:"Cricketer"}}});
        this.peoples.push({name:"Anushka1",fullName:{firstName:'Anushka2',lastName:'Sharma'},img:"avatar15.ico",info:{more:{content:"Actresses"}}});
        this.peoples.push({name:"Mayank1",fullName:{firstName:'Mayank3',lastName:'Mah'},img:"avatar13.png",info:{more:{content:"Self"}}});
        this.peoples.push({name:"Hetal1",fullName:{firstName:'Hetal4',lastName:'Vaghela'},img:"avatar15.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Drashti1",fullName:{firstName:'Drashti5',lastName:'Gopani'},img:"avatar14.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Virat",fullName:{firstName:'Virat',lastName:'Kohli'},img:"avatar10.png",info:{more:{content:"Cricketer"}}});
        this.peoples.push({name:"Anushka",fullName:{firstName:'Anushka',lastName:'Sharma'},img:"avatar15.ico",info:{more:{content:"Actresses"}}});
        this.peoples.push({name:"Mayank",fullName:{firstName:'Mayank',lastName:'Mah'},img:"avatar13.png",info:{more:{content:"Self"}}});
        this.peoples.push({name:"Hetal",fullName:{firstName:'Hetal',lastName:'Vaghela'},img:"avatar15.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Drashti",fullName:{firstName:'Drashti',lastName:'Gopani'},img:"avatar14.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Virat1",fullName:{firstName:'Virat1',lastName:'Kohli'},img:"avatar10.png",info:{more:{content:"Cricketer"}}});
        this.peoples.push({name:"Anushka1",fullName:{firstName:'Anushka2',lastName:'Sharma'},img:"avatar15.ico",info:{more:{content:"Actresses"}}});
        this.peoples.push({name:"Mayank1",fullName:{firstName:'Mayank3',lastName:'Mah'},img:"avatar13.png",info:{more:{content:"Self"}}});
        this.peoples.push({name:"Hetal1",fullName:{firstName:'Hetal4',lastName:'Vaghela'},img:"avatar15.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Drashti1",fullName:{firstName:'Drashti5',lastName:'Gopani'},img:"avatar14.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Virat",fullName:{firstName:'Virat',lastName:'Kohli'},img:"avatar10.png",info:{more:{content:"Cricketer"}}});
        this.peoples.push({name:"Anushka",fullName:{firstName:'Anushka',lastName:'Sharma'},img:"avatar15.ico",info:{more:{content:"Actresses"}}});
        this.peoples.push({name:"Mayank",fullName:{firstName:'Mayank',lastName:'Mah'},img:"avatar13.png",info:{more:{content:"Self"}}});
        this.peoples.push({name:"Hetal",fullName:{firstName:'Hetal',lastName:'Vaghela'},img:"avatar15.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Drashti",fullName:{firstName:'Drashti',lastName:'Gopani'},img:"avatar14.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Virat1",fullName:{firstName:'Virat1',lastName:'Kohli'},img:"avatar10.png",info:{more:{content:"Cricketer"}}});
        this.peoples.push({name:"Anushka1",fullName:{firstName:'Anushka2',lastName:'Sharma'},img:"avatar15.ico",info:{more:{content:"Actresses"}}});
        this.peoples.push({name:"Mayank1",fullName:{firstName:'Mayank3',lastName:'Mah'},img:"avatar13.png",info:{more:{content:"Self"}}});
        this.peoples.push({name:"Hetal1",fullName:{firstName:'Hetal4',lastName:'Vaghela'},img:"avatar15.ico",info:{more:{content:"Friend"}}});
        this.peoples.push({name:"Drashti1",fullName:{firstName:'Drashti5',lastName:'Gopani'},img:"avatar14.ico",info:{more:{content:"Friend"}}}); 
    }
}
