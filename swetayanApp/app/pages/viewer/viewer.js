import {Page, NavParams, ViewController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/viewer/viewer.html'
})
export class Viewer {

    static get parameters() {
        return [[ViewController], [NavParams]];
    }

    constructor(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.title = navParams.data.meta.title || "Images";
        this.items = navParams.data.meta.images || [];     
        
        // navParams.data.meta.images.forEach((record) => {
        //     this.items.push(record);
        // })   
        // navParams.data.meta.images.forEach((record) => {
        //     this.items.push(record);
        // })   
        // navParams.data.meta.images.forEach((record) => {
        //     this.items.push(record);
        // })   
        // navParams.data.meta.images.forEach((record) => {
        //     this.items.push(record);
        // })   
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
