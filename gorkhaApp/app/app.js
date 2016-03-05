import {App, Platform, IonicApp} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';


@App({
  templateUrl: 'build/app.html',
  config: {
      mode :'md'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform],[IonicApp]];
  }

  constructor(platform,app) {
    this.rootPage = LoginPage;
    this.app = app;
    
    
    this.pages = [
      {title:'Page1', component: TabsPage, index: 0, icon: 'rainy', isActive:true},
      {title:'Page2', component: TabsPage, index: 1, icon: 'people', isActive:false},
      {title:'Page3', component: TabsPage, index: 2, icon: 'map', isActive:false}  
    ];
    
    platform.ready().then(() => {
    
    
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
        console.log("page",page);    
        nav.setRoot(page.component, {tabIndex: page.index});
    }    
    
  }
}
