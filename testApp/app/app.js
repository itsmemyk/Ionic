import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LocalNotifications} from 'ionic-native';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.rootPage = TabsPage;    
    this.counter = 0;
    
    setInterval(() => {
        this.counter ++;
        console.log("current counter", this.counter);
    },1000);
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleLightContent();
      
        document.addEventListener('deviceready', function () {
            // cordova.plugins.backgroundMode is now available
            
            // Android customization
            cordova.plugins.backgroundMode.setDefaults({ text:this.counter, title : "Timer is Running for "+this.counter+"s"});
            // Enable background mode
            cordova.plugins.backgroundMode.enable();
            
            cordova.plugins.backgroundMode.configure({
                silent: true
            })

            console.log("Service started",cordova.plugins.backgroundMode.getDefaults());
            
            // Called when background mode has been activated
            cordova.plugins.backgroundMode.onactivate = function () {                    
                cordova.plugins.backgroundMode.setDefaults({
                     text: " " + this.counter,
                     title : "Timer is Running for "+this.counter+"s"
                });
                console.log("In background", cordova.plugins.backgroundMode.getDefaults());
            }
            
            cordova.plugins.backgroundMode.ondeactivate = function() {
                let data = cordova.plugins.backgroundMode.getDefaults();
                this.counter = parseInt(data.text.trim());                  
                console.log("foreground", data);
            };
        }, false);
    });
  }
}
