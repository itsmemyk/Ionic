import {Input,Output,Component,EventEmitter,View} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-framework/ionic';


@Component({
    selector:'axelor-rate',
    outputs: ['updateRate: rateChange']
})

@View({
    template:`
        <ion-icon class="blank-heart" (mouseover)="doRating(0)"> </ion-icon>
        <ion-icon *ngFor="#r of range" name="{{ r <= rate ? 'heart' : 'heart-outline'}}" (mouseover)="doRating(r)"></ion-icon>
        <label class="{{currentColor}}">{{currentText}}</label>                
    `,
    styles:[`
    .blank-heart {
        height:14px;
        width:17px;
    }
    .white, .red,.yellow,.orange,.blue,.green {
        font-size: 12px;
        padding: 3px 10px;
        margin-left: 10px;
        color: #fff;
        border-radius:20px;
    }
    .white {
        color:#000;
        background:#eee;
    }
    .red {
        background:#E91E63;
    }
    .yellow {
        background:#FFEB3B;
        color:#000;
    }
    .orange {
        background:#FF9800;
    }
    .blue {
        background:#03A9F4;
    }
    .green {
        background:#4CAF50;
    }
    `],
    directives: [IONIC_DIRECTIVES]
})

export class AxelorRate {
    
    private range:Array<number> = [1,2,3,4,5];
    private rate:number;
    private rateText:string[] = ["Not Rated","One Star","Two Star","Three Star","Four Star","Five Star"];
    private rateClass:string[] = ["white","red","yellow","orange","blue","green"];
    private currentText:string;
    private currentColor:string;
    
    @Input() default:number;
    @Input() updateRate: EventEmitter = new EventEmitter();

    constructor(){
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