import { Component, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  @ViewChild(IonDigitKeyboardCmp) keyboard;
  keyboardSettings: IonDigitKeyboardOptions = {
    align: 'center',
    width: '100%',
    visible: true,

    leftActionOptions: {
        iconName: 'md-backspace',
        fontSize: '1em'
    },

    rightActionOptions: {
        iconName: 'md-checkmark-circle-outline',
        fontSize: '1em'
    },

    roundButtons: false,
    showLetters: false,
    swipeToHide: false,
    theme: 'light'
  }

  enterNumber(key: number) {
    document.getElementsByName('mobileNumber')[0].innerText += key;
    
  }

  removeNumber(){

  }

  validateNumber(){

  }
}
