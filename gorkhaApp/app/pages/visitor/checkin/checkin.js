import {Page,Events,NavController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/visitor/checkin/checkin.html',    
})

export class CheckInVisitor {
    
    static get parameters(){
        return [[NavController],[Events]]
    }
    
    constructor(nav,events){
        this.nav = nav;
        this.events = events;
        
    }
}