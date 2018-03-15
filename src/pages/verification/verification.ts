import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})

export class VerificationPage {

  mobileNumber: string;
  verificationCode: string;
  code: string; 
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mobileNumber = navParams.get('mobileNumber');
    this.verificationCode = navParams.get('verificationCode');

    // console.log(this.mobileNumber + ' ' + this.verificationCode); 
  }

  @ViewChild(IonDigitKeyboardCmp) keyboard;
  keyboardSettings: IonDigitKeyboardOptions = {
    align: 'center',
    width: '100%',
    visible: true,

    rightActionOptions: {
      iconName: 'md-backspace',
      fontSize: '1em'
    },

    roundButtons: false,
    showLetters: false,
    swipeToHide: false,
    theme: 'light'
  }

  enterNumber(key: number) {
    let f = document.getElementsByName('mobileNumber')[0].innerText;
    if (f.length < 10) document.getElementsByName('mobileNumber')[0].innerText += key;
    this.code += key;
  }

  removeNumber(){
    let f = document.getElementsByName('mobileNumber')[0].innerText;
    document.getElementsByName('mobileNumber')[0].innerText = (f.substring(0, f.length - 1));
    this.code = this.code.substring(0, this.code.length - 1);
  }
}
