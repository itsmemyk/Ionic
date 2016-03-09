import {Input,Output,Component,EventEmitter,View,Pipe} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Pipe({
    name:'getter'
})
export class PropertyGetter {
    transform(arr,args){
        let key = args[0];
        let returnValue = '';
        
        for(let ele in arr){
            if(ele == key){
                returnValue=arr[ele];
            }   
        }
        return returnValue;
    }
}

@Component({
    selector:'axelor-list',
    inputs:['data','thumb','title','desc','isAvatar','isAvatarRight'],
    template:`       
        <ion-list>
            <ion-item *ngFor="#item of data">
                <ion-avatar item-left [class.hide]="!isAvatar">
                    <img src="img/{{item | getter:thumb}}" />
                </ion-avatar>
                <h2>{{item | getter:title | uppercase}}</h2>
                <p>{{item | getter:desc }}</p>
            </ion-item>      
        </ion-list>     
    `,
    directives: [IONIC_DIRECTIVES],
    pipes:[PropertyGetter]
})

export class AxelorList {
    constructor(){        
    }
    
    ngOnInit(){
        this.thumb = this.thumb || 'thumb';
        this.title = this.title || 'title';
        this.desc = this.desc || 'desc';      
        this.isAvatar = this.isAvatar == 'false' ? false : true;
        this.isAvatarRight = this.isAvatarRight == 'false' ? false : true;          
    }
}
