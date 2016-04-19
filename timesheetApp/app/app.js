import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {ORM, ORM_PROVIDERS} from './services/db.models';
import {SettingsService, SETTINGS_PROVIDERS} from './services/settings.service';

import {HomePage} from './pages/home/home';
import {SettingsPage} from './pages/settings/settings';

@App({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
    providers: [ORM_PROVIDERS, SETTINGS_PROVIDERS]
})
export class MyApp {
    static get parameters() {
        return [[Platform], [ORM], [SettingsService]];
    }

    constructor(platform, db, settings) {

        platform.ready().then(() => {
            db.init();
            
            if (settings.auth) {
                this.rootPage = HomePage;
            } else {
                this.rootPage = SettingsPage;
            }

            StatusBar.styleDefault();
        });
    }
}
