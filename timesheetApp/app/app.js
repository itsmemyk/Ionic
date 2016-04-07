import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {Database} from './services/db.sqlite';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers:[Database]
})
export class MyApp {
  static get parameters() {
    return [[Platform],[Database]];
  }

  constructor(platform,database) {
    this.rootPage = HomePage;
    this.db = database;
    
    platform.ready().then(() => {
      
      this.db.create("json_data",{"model":"text primary key not null","records":"text"})
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
