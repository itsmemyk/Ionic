import {Page,Platform} from 'ionic-angular';
import {Settings} from './../../services/settings.service';
import {DataService} from './../../services/local.storage';

@Page({
  templateUrl: 'build/pages/settings/settings.html',
  directives:[],
  providers:[DataService,Settings]
})

export class SettingsPage {
  
  static get parameters(){
      return [[Platform],[Settings]];
  }
  
  constructor(platform, settingService) {
    this.settingService = settingService;
    
    this.platform = platform;
    
    this.platform.ready().then(() => {
        this.settings = settingService.settingsObject;
        console.log(settingService.settingsObject);    
    });
  }
  
  saveSettings(){
      
      this.settingService.save(this.settings);
  }
}
