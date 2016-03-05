import {App, Platform} from 'ionic-framework/ionic';
import {IonicApp} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {TabsPage} from './pages/tabs/tabs';
import {Page1} from './pages/page1/page1'
import {Page2} from './pages/page2/page2'
import {Page3} from './pages/page3/page3'

@App({
  templateUrl:'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

export class MyApp {
  constructor( app : IonicApp, platform : Platform) {
      
    this.rootPage = TabsPage;
    this.app = app;
    
    this.pages = [
      {title:'Weather', component: TabsPage, index: 0, icon: 'rainy'},
      {title:'Contact', component: TabsPage, index: 1, icon: 'people'},
      {title:'Test', component: TabsPage, index: 2, icon: 'Map'}  
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
