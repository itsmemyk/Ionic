import {Page} from 'ionic-angular';

import {LeavesAdd} from './../add/add';
import {LeavesList} from './../list/list';

import {TimesheetMenuComponent} from './../../../components/menu.com';


@Page({
  templateUrl: 'build/pages/leaves/menu/menu.html',
  directives:[TimesheetMenuComponent]
})

export class LeavesMenu {
  constructor() {
      this.menuItems = [];
        
      this.menuItems.push({title:'Add leave Request',component:LeavesAdd});
      this.menuItems.push({title:'See leave Request',component:LeavesList});
      
  }
}
