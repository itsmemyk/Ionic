import {Page, Nav, Platform} from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native';
import {Dashboard} from './../dashboard/dashboard';

@Page({
    templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
    static get parameters() {
        return [[Nav], [Platform]];
    }

    constructor(nav, platform) {
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
        SpinnerDialog.show("Login", "Authenticating Credentials", false);

        setTimeout(() => {
            SpinnerDialog.hide();
            this.nav.push(Dashboard);
        }, 500);
    }
}
