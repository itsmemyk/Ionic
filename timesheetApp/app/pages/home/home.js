import {Page,Nav,Events,Alert} from 'ionic-angular';
import {TimesheetMenu} from './../timesheet/menu/menu';
import {ExpensesMenu} from './../expenses/menu/menu';
import {LeavesMenu} from './../leaves/menu/menu';
import {SettingsPage} from './../settings/settings';

import {TimesheetMenuComponent} from './../../components/menu.com';

@Page({
  templateUrl: 'build/pages/home/home.html',
  directives:[TimesheetMenuComponent]
})
export class HomePage {
  
  static get parameters(){
    return [[Events],[Nav]];    
  }
  
  constructor(events,nav) {
      this.nav = nav;
      this.events = events;
      this.menuItems = [];
      
      this.menuItems.push({icon:'alarm',title:'Timesheet',component:TimesheetMenu});
      this.menuItems.push({icon:'list-box',title:'Expenses',component:ExpensesMenu});
      this.menuItems.push({icon:'calendar',title:'Leave Requests',component:LeavesMenu});
      this.menuItems.push({icon:'settings',title:'Settings',component:SettingsPage});
      this.menuItems.push({css:'highlight',icon:'shuffle',title:'Synchronize',events:"synchronize"});
      this.listen();
  }
  
  
  listen(){
      this.events.subscribe("synchronize.click",()=>{
          let confirm = Alert.create({
            title: 'Synchronize with ERP',
            message: 'Do you really want to synchronize with ERP? <br/> <p class="red">If you say yes, you won\'t be able to change or see your entries </p>',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('Agree clicked');
                    }
                }
            ]
          });
          this.nav.present(confirm);
      });
  }
  
}
