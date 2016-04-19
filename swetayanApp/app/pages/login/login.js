import {Page, Nav} from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native';
import {AlbumImage} from './../album-image/albumImage';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
      return [[Nav]];
  }
   
  constructor(nav) {
      this.nav = nav;
      this.scroll = false;
  }
  
  onInput() {
    this.scroll = true;
  }

  onBlur() {
    this.scroll = false;
  }
  
  login() {
      SpinnerDialog.show("Login","Authenticating Credentials",false);
      
      setTimeout(() => {
          SpinnerDialog.hide();
          this.nav.push(AlbumImage);
      },500);
  }
}
