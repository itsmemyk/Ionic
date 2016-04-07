import {Page} from 'ionic-angular';

import {TimesheetAdd} from './../add/add';
import {TimesheetTimer} from './../timer/timer';
import {TimesheetToday} from './../today/today';
import {TimesheetStatistics} from './../statistics/statistics';
import {TimesheetDraft} from './../draft/draft';

import {TimesheetMenuComponent} from './../../../components/menu.com';


@Page({
  templateUrl: 'build/pages/timesheet/menu/menu.html',
  directives:[TimesheetMenuComponent]
})

export class TimesheetMenu {
  constructor() {
      this.menuItems = [];
        
      this.menuItems.push({title:'Add Timesheet',component:TimesheetAdd});
      this.menuItems.push({title:'Start / Stop',component:TimesheetTimer});
      this.menuItems.push({title:'Today\'s Task',component:TimesheetToday});
      this.menuItems.push({title:'Statistics',component:TimesheetStatistics});
      this.menuItems.push({title:'Draft',component:TimesheetDraft});
  }
}
