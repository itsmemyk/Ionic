import {IONIC_DIRECTIVES,Nav,Events} from 'ionic-angular';
import {Component} from 'angular2/core';

@Component({
    selector:'timesheet-menu',
    template:` 
        <ion-list no-lines class="menu-list">
            <ion-item *ngFor="#item of items" class="menu-list-item" [ngClass]="{highlight:item.css && item.css != ''}" (click)="openPage(item.component,item.events)">
                <ion-icon *ngIf="item.icon" [name]="item.icon"></ion-icon> {{item.title}}
            </ion-item>     
        </ion-list>
    `,
    directives:[IONIC_DIRECTIVES],
    inputs:['items']
})
export class TimesheetMenuComponent {
    
  static get parameters(){
      return [[Nav],[Events]];
  }
   
  constructor(nav,events) {
      this.nav = nav;
      this.events = events;
      this.items = [];
  }
  
  openPage(com,evnts){
      
      if(com){
        this.nav.push(com);   
      }
      
      if(evnts){
          this.events.publish(`${evnts}.click`);
      }
      
  }
  
}