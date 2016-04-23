import {Page, Nav, Platform} from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native';
import {Dashboard} from './../dashboard/dashboard';
import {AuthService, AUTH_PROVIDERS} from './../../services/auth.service';
import {WSService, WS_PROVIDERS} from './../../services/ws.service';

@Page({
    templateUrl: 'build/pages/feedback/feedback.html',
    providers: [AUTH_PROVIDERS, WS_PROVIDERS]
})
export class FeedbackPage {
    static get parameters() {
        return [[Nav], [Platform], [WSService], [AuthService]];
    }

    constructor(nav, platform, ws, auth) {
        this.nav = nav;
        this.ws = ws;
        this.auth = auth;
        this.scroll = false;
        this.message = "";
        
        platform.ready().then(() => {
            window.addEventListener('keyboardWillShow', function() {
                this.scroll = true;
            });
            window.addEventListener('keyboardWillHide', function() {
                this.scroll = false;
            });
        });
        this.auth.init();        
    }

    send() {
        SpinnerDialog.show("Sending", "Feedback is submitting", false);
        
        this.ws.sendFeedback({customerId:this.auth.user.cid, message: this.message}).subscribe(()=>{
            this.nav.push(Dashboard);    
        },() => {
            SpinnerDialog.hide();
        })
    }
}
