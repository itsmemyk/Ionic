import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/timesheet/timer/timer.html',
  directives:[]
})

export class TimesheetTimer {
  constructor() { 
      this.status = false;     
      this.startTime = new Date();
      this.endTime = new Date();
      
      this.stamp = new Date();
      this.stamp.setHours(0);
      this.stamp.setMinutes(0);
      this.stamp.setSeconds(0);
  }
  
  startTask(){
      this.status = true;
      this.startTime = new Date();
      
      this.refreshTimer();
  }
  
  refreshTimer(){
      setTimeout(()=>{
          if(this.status==true){
              this.stamp = new Date().getTime() - this.startTime.getTime() - 330*60*1000;            
              this.refreshTimer();
          }
      },1000);
  }
  
  stopTask(){
      this.status = false;
  }
}
