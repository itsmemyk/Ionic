import {Page,NavController} from 'ionic-angular';
import {Dashboard} from './../dashboard/dashboard';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    static get parameters(){
        return [[NavController]];
    }
    
    constructor(nav){
        this.nav = nav;
        this.auth = false;
    //    this.login();
        this.authenticate();
    }
    
    authenticate(){
        this.auth = true;
    }
    
    login(){
        this.nav.push(Dashboard);
    }
}
