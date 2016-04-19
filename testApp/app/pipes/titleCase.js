import {Injectable, Pipe} from 'angular2/core';

/*
  Generated class for the TitleCase pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'title-case'
})
@Injectable()
export class TitleCase {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    value = value + ''; // make sure it's a string
    return value.toLowerCase();
  }
}
