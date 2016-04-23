import {Page, Nav, Platform, Alert} from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native';
import {Dashboard} from './../dashboard/dashboard';
import {AuthService, AUTH_PROVIDERS} from './../../services/auth.service';
import {WSService, WS_PROVIDERS} from './../../services/ws.service';
import {NgForm} from 'angular2/common';
import { FormBuilder, Validators, Control, ControlGroup, FORM_DIRECTIVES} from 'angular2/common';

@Page({
    templateUrl: 'build/pages/login/login.html',
    providers: [WS_PROVIDERS, AUTH_PROVIDERS],
    directives: [FORM_DIRECTIVES]
})
export class LoginPage {
    static get parameters() {
        return [[FormBuilder], [Nav], [Platform], [AuthService], [WSService]];
    }

    constructor(fb, nav, platform, auth, ws) {
        this.auth = auth;
        this.ws = ws;
        this.nav = nav;
        this.scroll = false;
        
        this.userForm = fb.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
        
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

        this.ws.login(this.userForm.value.username,this.userForm.value.password)
            .map(res => res.json())
            .subscribe((result) => {
                SpinnerDialog.hide();                                

                if (result.success == 1) {                    
                    this.auth.save({user:result.data});
                    this.nav.push(Dashboard);
                }
                else {
                    let alert = Alert.create({
                        title: 'Login!',
                        subTitle: 'Invalid Credentials!',
                        buttons: ['OK']
                    });
                    this.nav.present(alert);
                }

            }, (error) => {
                SpinnerDialog.hide();
            });
    }
    
    emailValidator(control) {        
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }
}


