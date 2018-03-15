import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {

  mobileNumber;
  verificationCode;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mobileNumber = navParams.get('mobileNumber');
    this.verificationCode = navParams.get('verificationCode');
  }

}
