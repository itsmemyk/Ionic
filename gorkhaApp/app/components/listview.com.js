import {Input,Output,Component,EventEmitter,View,Pipe} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {PropertyGetter} from './../pipes/getter.pipe';

@Component({
    selector:'axelor-list',
    inputs:['data','thumb','title','desc','isAvatar','isAvatarRight','isCRUD'],
    template:`       
     <ion-list>
        <ion-item-sliding *ngFor="#item of data">
            <ion-item>
                <ion-avatar item-left [class.hide]="!isAvatar">
                    <img src="img/{{item[thumb]}}" />
                </ion-avatar>
                <h2>{{item[title] | uppercase}}</h2>
                <p>{{item[desc] }}</p>
            </ion-item>               
            <ion-item-options>
                <button favorite>
                    <ion-icon name="create"></ion-icon>
                    Edit
                </button>
                <button light>
                    <ion-icon name="trash"></ion-icon>
                    Delete
                </button>
            </ion-item-options>
        </ion-item-sliding>
     </ion-list>
    `,
    directives: [IONIC_DIRECTIVES],
    pipes:[PropertyGetter]
})

export class AxelorList {
    constructor(){
        this.isCRUD = true;        
    }
    
    ngOnInit(){
        this.thumb = this.thumb || 'thumb';
        this.title = this.title || 'title';
        this.desc = this.desc || 'desc';      
        
        this.isAvatar = this.isAvatar == 'false' ? false : true;
        this.isAvatarRight = this.isAvatarRight == 'false' ? false : true;          
    }
}
