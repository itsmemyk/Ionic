import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

/*
  Generated class for the ListView component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'list-view',
  templateUrl: 'build/components/list-view/list-view.html',
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to your component
})
export class ListView {
  constructor() {
    this.text = 'Hello World';
  }
}
