import {Component} from 'angular2/core';
import {Page,ViewController,NavParams} from 'ionic-framework/ionic';

@Page({
  templateUrl: 'build/pages/contact-detail/detail.html',  
  styles:[`
    ion-card {
        position:relative;
    }
    ion-card img {
        display: block;
        width: 80%;
        height: 80%;
        margin: 10px auto;
    }
    .fab-heart {
        z-index: 50;
    }
  `]
})

export class ContactDetail {
    
    static get parameters(){
        return [[ViewController],[NavParams]];
    }
    
    constructor(viewCtrl,navParams){
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.contact = navParams.data;     
        
        this.contact.createdDate = parseInt(this.contact.createdOn); 
    }
    
    dismiss() {
        this.viewCtrl.dismiss();
    }
}