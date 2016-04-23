import {Page, NavParams, Loading, Nav, Modal} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';
import {LazyLoadImageDirective} from 'ng2-lazyload-image';
import {Observable} from 'rxjs/Observable';
import {WSService, WS_PROVIDERS} from './../../services/ws.service';
import 'rxjs/Rx';
import {Viewer} from './../viewer/viewer';
import {ActionSheet} from 'ionic-native';

@Page({
    templateUrl: 'build/pages/products/products.html',
    providers: [WS_PROVIDERS],
    directives: [LazyLoadImageDirective]
})
export class Products {

    static get parameters() {
        return [[NavParams], [WSService], [Nav]];
    }

    constructor(navParams, ws, nav) {
        this.nav = nav;
        this.products = [];

        let loading = Loading.create({
            spinner: 'crescent',
            content: 'Loading',
        });

        nav.present(loading);

        ws.getProducts({}).map(res => res.json()).subscribe((res) => {
            if (res.status == 1) {
                let data = res.data.filter((product) => {
                    if (product.images) {
                        return true;
                    } else {
                        return false;
                    }
                })

                data.forEach((record) => {
                    record.description = record.description || "";
                    record.images.forEach((img) => {
                        img.image = "http://swetayan.com/Admin/media/product/small/" + img.imageurl;
                    })
                })
                this.products = data;
                console.log(this.products);
            }
            loading.dismiss();
        },        
        () => {
          loading.dismiss();  
        });

    }

    doInfinite(infiniteScroll) {
        setTimeout(() => {
            infiniteScroll.enable(false);
            infiniteScroll.complete();
        }, 500);
    }

    doShare(product) {

        let buttonLabels = ['Via Facebook', 'Via Twitter', 'Via Whatsapp', 'Via Instagram', 'Others'];

        ActionSheet.show({
            'title': 'Share image?',
            'buttonLabels': buttonLabels,
            'addCancelButtonWithLabel': 'Cancel',
        }).then(buttonIndex => {
            switch (buttonIndex) {
                case 1:
                    SocialSharing.shareViaFacebook(product.title + " (Swetayan Studio Product)", product.images[0].image, null);
                    break;
                case 2:
                    SocialSharing.shareViaTwitter(product.title + " (Swetayan Studio Product)", product.images[0].image, null);
                    break;
                case 3:
                    SocialSharing.shareViaWhatsApp(product.title + " (Swetayan Studio Product)", product.images[0].image, null);
                    break;
                case 4:
                    SocialSharing.shareViaInstagram(product.title + " (Swetayan Studio Product)", product.images[0].image, null);
                    break;
                default:
                    SocialSharing.share("Product : " + product.title, "Swetayan Studio", product.images[0].image, null);
                    break;
            }
        });
    }
    
    view(data) {
        let viewer = Modal.create(Viewer,{meta:data});
        this.nav.present(viewer);
    }
}
