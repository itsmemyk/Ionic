import {Page,Events,NavController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/visitor/expected/expected.html',    
})

export class ExpectedVisitor {
    
    static get parameters(){
        return [[NavController],[Events]]
    }
    
    constructor(nav,events){
        this.nav = nav;
        this.events = events;
        
    }
}