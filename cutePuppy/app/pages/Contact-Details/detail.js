import {Page, NavParams} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';

@Page({
    templateUrl: 'build/pages/Contact-Details/detail.html'
})

export class Detail{
    constructor(navParams: NavParams){
        this.navParams = navParams;
        console.log("nav");
        //let temp = this.navParams.data;
        this.contact = this.navParams.data;
        
        //this.contact = {name:temp.name, mobileNo: temp.mobileNo, createdOn: temp.createdOn, updatedOn: temp.updatedOn};
    }
}