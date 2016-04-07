import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/settings/settings.html',
  directives:[]
})

export class SettingsPage {
  constructor() {
  
      
  }
  
  saveSettings(){
      console.log("settings saved");
  }
}
