import {Page,Events,NavController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/visitor/live/live.html',    
})

export class LiveVisitor {
    
    static get parameters(){
        return [[NavController],[Events]]
    }
    
    constructor(nav,events){
        this.nav = nav;
        this.events = events;
        
    }
}