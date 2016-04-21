import {Page, Nav, Platform} from 'ionic-angular';
import {SpinnerDialog} from 'ionic-native';
import {} from './../dashboard/dashboard';

@Page({
    templateUrl: 'build/pages/feedback/feedback.html'
})
export class FeedbackPage {
    static get parameters() {
        return [[Nav], [Platform]];
    }

    constructor(nav, platform) {
        this.nav = nav;
        this.scroll = false;

        platform.ready().then(() => {
            window.addEventListener('keyboardWillShow', function() {
                this.scroll = true;
            });
            window.addEventListener('keyboardWillHide', function() {
                this.scroll = false;
            });
        });
    }

    send() {
        SpinnerDialog.show("Sending", "Feedback is submitting", false);

        setTimeout(() => {
            SpinnerDialog.hide();
            this.nav.push(Dashboard);
        }, 2000);
    }
}
