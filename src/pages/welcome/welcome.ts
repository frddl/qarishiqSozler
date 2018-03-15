import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';
import { ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { VerificationPage } from '../verification/verification';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  myNumber = "";
  smsCode = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private http: Http) {
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
    this.myNumber += key;
  }

  removeNumber(){
    let f = document.getElementsByName('mobileNumber')[0].innerText;
    document.getElementsByName('mobileNumber')[0].innerText = (f.substring(0, f.length - 1));
    this.myNumber = this.myNumber.substring(0, this.myNumber.length - 1);
  }

  public validateNumber(){
    let n = this.myNumber;
    let numberFormatFlag = n.substr(0, 3) == '050' || n.substr(0, 3) == '051' || n.substr(0, 3) == '055' || n.substr(0, 3) == '070' || n.substr(0, 3) == '077';
    let numberLengthFlag = n.length == 10;

    if (!(numberFormatFlag && numberLengthFlag)){
      this.presentToast();
    } else {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let body = {
        "token" : "appqs-47421358-fb3f-4596-a259-d2bf7d925718",
        "action" : "smscode",
        "msisdn" : "994" + n.substr(1)
      };

      this.http.post('/api/', body, options)
      .subscribe(data => {
        let obj = JSON.parse(data.text());
        console.log(obj.results.smscode);
        this.smsCode = obj.results.smscode;
        this.navCtrl.push(VerificationPage, {
          mobileNumber : this.myNumber,
          validationCode : this.smsCode 
        });

      }, error => {
        console.log(error.status);
      });
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Mobil nömrə düzgün daxil edilməyib',
      duration: 1500,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      // do nothing
    });
  
    toast.present();
  }
}
