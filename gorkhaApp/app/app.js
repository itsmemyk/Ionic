import {App, Platform, IonicApp, Config} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {VisitorTabsPage} from './pages/visitor/tabs';
import {Dashboard} from './pages/dashboard/dashboard';
import {LoginPage} from './pages/login/login';
import {Page1} from './pages/page1/page1';
import {Page2} from './pages/page2/page2';


@App({
  templateUrl: 'build/app.html',
  config: {
      mode :'md'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform],[IonicApp],[Config]];
  }

  constructor(platform,app,config) {
    
    
    //this.rootPage = VisitorTabsPage;
    
    this.rootPage = TabsPage;
    this.app = app;
    
       
    
    
    this.pages = [
      {title:'Dashboard', component: Dashboard, index: 0,  icon: 'happy', isActive:true},
      {title:'Live Visitors', component: VisitorTabsPage, index: 0, icon: 'people', isActive:false},
      {title:'Check In/Out', component: VisitorTabsPage, index: 3,  icon: 'checkmark-circle', isActive:false},
      {title:'Events', component: VisitorTabsPage, index: 0,  icon: 'calendar', isActive:false},
      {title:'Family', component: VisitorTabsPage, index: 0,  icon: 'happy', isActive:false},
      {title:'Staff', component: VisitorTabsPage, index: 0,  icon: 'body', isActive:false},
      {title:'Vehicles', component: VisitorTabsPage, index: 0,  icon: 'car', isActive:false},
      {title:'Logout', component: VisitorTabsPage, index: 2,  icon: 'log-out', isActive:false}  
    ];
    
    platform.ready().then(() => {
        
      config.set('title','Digital Gorkha');
        
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
    
  }
  
  
  openNavPage(page){
      
         
    let nav = this.app.getComponent('nav');
    
    if(nav){
        this.pages.forEach((ele)=>{
           ele.isActive = false; 
        });
        
        page.isActive = true;    
        
        nav.setRoot(page.component, {tabIndex: page.index,itemIndex: page.itemIndex});
    }    
    
  }
  
}
