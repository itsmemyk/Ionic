import {Input,Output,Component,EventEmitter,View} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';


@Component({
    selector:'axelor-rate',
    inputs:['rate'],
    outputs: ['updateRate: rateChange']
})

@View({
    template:`
        <div class="{{currentColor}}">
            <ion-icon class="blank-heart" (mouseover)="doRating(0)"> </ion-icon>
            <ion-icon *ngFor="#r of range" name="{{ r <= rate ? 'heart' : 'heart-outline'}}" class="heart-rate" (mouseover)="doRating(r)"></ion-icon>
            <label  class="rate-label bg-{{currentColor}}">{{currentText}}</label>
        </div>                
    `,
    styles:[`
    .heart-rate {
        font-size:4rem;
    }
    .blank-heart {
        height:14px;
        width:17px;
    }
    .rate-label {
        font-size: 3rem;
        padding: 5px 15px;
        margin-left: 1rem;
        color: #fff;
        border-radius:20px;
    }
    `],
    directives: [IONIC_DIRECTIVES]
})

export class AxelorRate {
    
    constructor(){
        this.range = [1,2,3,4,5];
        this.rateText = ["Not Rated","One Star","Two Star","Three Star","Four Star","Five Star"];
        this.rateClass = ["darkGrey","danger","sky","pink","indigo","lime"];        
        this.updateRate = new EventEmitter()
    }        
    
    ngOnInit(){
        let v = this.default || 0;
        this.doRating(v);
    }
    
    doRating(val){
        this.default = this.rate = val;
        this.currentColor = this.rateClass[this.rate];
        this.currentText = this.rateText[this.rate];
        this.updateRate.next(val);
    }
}