import {Page, Nav, Platform} from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native';
import {Dashboard} from './../dashboard/dashboard';
import {AuthService, AUTH_PROVIDERS} from './../../services/auth.service';
import {WSService, WS_PROVIDERS} from './../../services/ws.service';


@Page({
    templateUrl: 'build/pages/login/login.html',
    providers: [WS_PROVIDERS, AUTH_PROVIDERS]
})
export class LoginPage {
    static get parameters() {
        return [[Nav], [Platform], [AuthService], [WSService]];
    }

    constructor(nav, platform, auth, ws) {
        this.auth = auth;
        this.ws = ws;
        this.nav = nav;
        this.scroll = false;

        platform.ready().then(() => {
            window.addEventListener('keyboardWillShow', function() {
                this.scroll = true;
            });
            window.addEventListener('keyboardWillHide', function() {
                this.scroll = false;
            });
        });
    }

    login() {
        //SpinnerDialog.show("Login", "Authenticating Credentials", false);
        
        this.nav.push(Dashboard);    
        /*this.ws.call("http://swetayan.com/Android/login.php?username=admin&password=admin")
            .map(res => res.json())
            .subscribe((result) => {
                console.log(result);
                SpinnerDialog.hide();
                this.nav.push(Dashboard);    
            }, (error) => {
                console.log(error);
                this.nav.push(Dashboard);
            });*/
    }
}
