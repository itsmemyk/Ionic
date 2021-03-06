import {Page,NavParams} from 'ionic-angular';
import {Page1} from '../page1/page1';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';
import {LoginPage} from '../login/login';
import {CodePage} from '../code/code';
import {CategoryPage} from '../category/category';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters(){
      return [[NavParams]];
  }
  
  constructor(navParams) {
      
    this.tabIndex = navParams.data.tabIndex;
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Page3;
    this.tab2Root = CodePage;
    this.tab3Root = CategoryPage;
  }
}
