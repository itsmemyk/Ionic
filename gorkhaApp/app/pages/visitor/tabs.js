import {Page,NavParams,Events} from 'ionic-angular';
import {AllVisitor} from './all/all';
import {LiveVisitor} from './live/live';
import {ExpectedVisitor} from './expected/expected';
import {CheckInVisitor} from './checkin/checkin';
import {CheckOutVisitor} from './checkout/checkout';

import {LoginPage} from '../login/login';

@Page({
  template: `  
        <ion-tabs [selectedIndex]="tabIndex" orange>
            <ion-tab [root]="tab1Root" tabTitle="All" tabIcon="list-box"></ion-tab>
            <ion-tab [root]="tab2Root" tabTitle="Live" tabIcon="stopwatch"></ion-tab>
            <ion-tab [root]="tab3Root" tabTitle="Expected" tabIcon="calendar"></ion-tab>
            <ion-tab [root]="tab4Root" tabTitle="CheckIn" tabIcon="checkmark-circle"></ion-tab>
            <ion-tab [root]="tab5Root" tabTitle="CheckOut" tabIcon="checkmark-circle-outline"></ion-tab>
        </ion-tabs>  
  `
})
export class VisitorTabsPage {
  static get parameters(){
      return [[NavParams],[Events]];
  }
  
  constructor(navParams,events) {
      
    this.tabIndex = navParams.data.tabIndex;
    this.events = events;
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = AllVisitor;
    this.tab2Root = LiveVisitor;
    this.tab3Root = ExpectedVisitor;
    this.tab4Root = CheckInVisitor;
    this.tab5Root = CheckOutVisitor;
    
    //this.events.subscribe()
  }
}
