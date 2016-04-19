import {Page, Alert, Nav, Platform} from 'ionic-angular';
import {SettingsService, SETTINGS_PROVIDERS} from './../../services/settings.service';
import {RestService, REST_PROVIDERS} from './../../services/rest.service';
import {HomePage} from './../home/home';

@Page({
    templateUrl: 'build/pages/settings/settings.html',
    directives: [],
    providers: [SETTINGS_PROVIDERS, REST_PROVIDERS]
})

export class SettingsPage {

    static get parameters() {
        return [[Nav], [Platform], [SettingsService], [RestService]];
    }

    constructor(nav, platform, settingService, rest) {
        this.nav = nav;
        this.rest = rest;
        
        // settingService.clear();
        this.settingService = settingService;

        this.platform = platform;

        this.platform.ready().then(() => {
            this.settings = settingService.settingsObject;
        });
    }

    saveSettings() {

        this.rest.login(this.settings.url + "/login.jsp", { username: this.settings.username, password: this.settings.password })
            .subscribe((res) => {
                // console.log("success", res);
                this.settingService.clear();
                this.settingService.save(this.settings);
                
                this.nav.push(HomePage);
                
            }, (error) => {
                // console.log("error",error);
                
                let msg = 'Something goes wrong';

                if (error.status == 401) {
                    msg = 'Invalid Credentials';
                } else if (error.status == 404) {
                    msg = 'Invalid Domain URL'
                }

                let alert = Alert.create({
                    title: 'Error while connect!',
                    subTitle: msg,
                    buttons: ['OK']
                });
                this.nav.present(alert);
            });
    }
}
