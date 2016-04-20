import 'es6-shim';
import {App, Alert, IonicApp, Nav, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import {Dashboard} from './pages/dashboard/dashboard';
import {Albums} from './pages/albums/albums';
import {LaunchNavigator} from 'ionic-native';

@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform]];
  }

  constructor(app, platform ) {
    this.app = app;
    this.rootPage = Dashboard;
    
    this.pages = [
      {title:'Dashboard', component: Dashboard, index: 0,  icon: 'happy', isActive:true},
      {title:'Albums', component: Albums, index: 1,  icon: 'camera', isActive:false},
      {title:'Products', component: Dashboard, index: 2,  icon: 'cart', isActive:false},
      {title:'Videos', component: Dashboard, index: 3,  icon: 'videocam', isActive:false},
      {title:'Feedback', component: LoginPage, index: 4,  icon: 'send', isActive:false},
      {title:'Map', index: 5,  icon: 'map', isActive:false},
      {title:'Logout', component: LoginPage, index: 6,  icon: 'log-out', isActive:false}  
    ];
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      
    });
  }
  
  
  openNavPage(page){
      
         
    let nav = this.app.getComponent('nav');
    
    if(nav){
        this.pages.forEach((ele)=>{
           ele.isActive = false; 
        });
        
        page.isActive = true;    
        
        if(page.component) {
            nav.push(page.component, {tabIndex: page.index,itemIndex: page.itemIndex});   
        }
        else {
            if( page.title == "Map") {
                LaunchNavigator.navigate([21.211686, 72.822631])
                    .then(
                        success => console.log("Launched navigator"),
                        error => console.log("Error launching navigator", error)
                    );
            }
        }        
    }    
    
  }
}
