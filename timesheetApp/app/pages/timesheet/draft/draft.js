import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/timesheet/draft/draft.html',
  directives:[]
})

export class TimesheetDraft {
  constructor() {      
      this.tasks = [];
      
      this.tasks.push({date:new Date(2015,10,24),project:'Project1',duration:'05:25'});
      this.tasks.push({date:new Date(2015,4,14),project:'Project2',duration:'04:35'});
      this.tasks.push({date:new Date(2015,3,24),project:'Project3',duration:'02:45'});
      this.tasks.push({date:new Date(2015,7,24),project:'Project4',duration:'08:16'});
     
  }
}
