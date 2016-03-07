import {Page,Events,NavController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/visitor/checkout/checkout.html',    
})

export class CheckOutVisitor {
    
    static get parameters(){
        return [[NavController],[Events]]
    }
    
    constructor(nav,events){
        this.nav = nav;
        this.events = events;
        
    }
}