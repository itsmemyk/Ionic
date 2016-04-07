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
      console.log(this.startTime);
      console.log(this.endTime);
      
  }
  
  startTask(){
      this.status = true;
      
  }
  
  refreshTimer(){
      setTimeout(()=>{
          if(status==true){
              
          }
      },1000);
  }
  
  stopTask(){
      this.status = false;
  }
}
