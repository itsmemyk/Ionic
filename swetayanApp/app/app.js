import 'es6-shim';
import {App, Alert, IonicApp, Nav, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {Dashboard} from './pages/dashboard/dashboard';
import {Albums} from './pages/albums/albums';
import {FeedbackPage} from './pages/feedback/feedback';

import {LaunchNavigator} from 'ionic-native';
import {AuthService, AUTH_PROVIDERS} from './services/auth.service';


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [AUTH_PROVIDERS]
})
export class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [AuthService]];
  }

  constructor(app, platform, authService) {
    this.app = app;    
    this.authService = authService;
    
    this.rootPage = LoginPage;      
    
    this.pages = [
      {title:'Dashboard', component: Dashboard, index: 0,  icon: 'happy', isActive:true},
      {title:'My Albums', component: Albums, index: 1,  icon: 'camera', isActive:false},
      {title:'Products', component: Albums, index: 2,  icon: 'cart', isActive:false},
      {title:'Videos', component: Albums, index: 3,  icon: 'videocam', isActive:false},
      {title:'Feedback', component: FeedbackPage, index: 4,  icon: 'send', isActive:false},
      {title:'Map', index: 5,  icon: 'map', isActive:false},
      {title:'Logout', index: 6,  icon: 'log-out', isActive:false}  
    ];      
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();     
      
      document.addEventListener('backbutton', () => {
        var nav = app.getComponent('nav');

        if (nav.canGoBack()) {
          nav.pop();
        }
        else {
           let confirm = Alert.create({
            title: 'Swetayan App',
            message: 'Do you really want to close It?',
            buttons: [
              {
                text: 'No',
                handler: () => {

                }
              },
              {
                text: 'Yes',
                handler: () => {
                  navigator.app.exitApp()
                }
              }
            ]
          });
          nav.present(confirm);
        }
      });
      
      authService.init().then(() => {
          if(authService.auth == true) {
              this.rootPage = Dashboard; 
              console.log("auth",authService.authObject);
              console.log("auth",authService.authObject.cid);                                                  
          }
          else {
              console.log("please do login first");
          }
      })
    }); 
  } 
  
  
  openNavPage(page){
      
         
    let nav = this.app.getComponent('nav');
    
    if(nav){
        this.pages.forEach((ele)=>{
           ele.isActive = false; 
        });
        
        page.isActive = true;    
        console.log(page);
        if(page.component) {
            nav.push(page.component, {tabIndex: page.index});   
        }
        else {
            // console.log(page);
            if( page.title == "Map") {
                LaunchNavigator.navigate([21.211686, 72.822631])
                    .then(
                        success => console.log("Launched navigator"),
                        error => console.log("Error launching navigator", error)
                    );
            } else if ( page.title == "Logout" ) {
                this.authService.clear();
                nav.push(LoginPage);
            }
        }        
    }    
    
  }
}
