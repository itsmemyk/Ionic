import {Component} from 'angular2/core'

@Component({
  selector: 'widget2',
  template: `
    <div>
      I'm widget 2
      
      <ng-content></ng-content>
    </div>
  `,
  directives: []
})
export class Widget2 {}
