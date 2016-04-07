import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/timesheet/today/today.html',
  directives:[]
})

export class TimesheetToday {
  constructor() {  
      this.tasks = [];
      
      this.tasks.push({date:new Date(2015,10,24),title:'Name Task 1',project:'Project',duration:'05:25'});
      this.tasks.push({date:new Date(2015,4,14),title:'Name Task 2',project:'Project',duration:'04:35'});
      this.tasks.push({date:new Date(2015,3,24),title:'Name Task 3',project:'Project',duration:'02:45'});
      this.tasks.push({date:new Date(2015,7,24),title:'Name Task 4',project:'Project',duration:'08:16'});
        
  }
}
