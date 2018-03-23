import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';
import { ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {

  myNumber = '';
  smsCode = '';
  sentCode = '';
  showSMSField = false;
  time = 59;
  showSendAgain = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private http: Http, private storage: Storage) {
    
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

  private decrementTime(){
    if (this.time == 1)
      this.showSendAgain = true;

    else {
      this.time--;
      setTimeout(() => {
        this.decrementTime();
      }, 1000);
    }
  }

  public val(){
    this.showSMSField = true;
    this.decrementTime();
  }

  public validateNumber(){
    this.time = 59;
    let n = this.myNumber;
    let numberFormatFlag = n.substr(0, 3) == '050' || n.substr(0, 3) == '051' || n.substr(0, 3) == '055' || n.substr(0, 3) == '070' || n.substr(0, 3) == '077';
    let numberLengthFlag = n.length == 10;
    
    if (!(numberFormatFlag && numberLengthFlag)){
      this.numberErrorToast();
    } else {
      this.showSMSField = true;
      this.decrementTime();
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let body = {
        "token" : "appqs-47421358-fb3f-4596-a259-d2bf7d925718",
        "action" : "smscode",
        "msisdn" : "994" + n.substr(1)
      };
      
      this.http.post('/api', body, options)
      .subscribe(data => {
        let obj = JSON.parse(data.text());
        this.sentCode = obj.results.smscode;

      }, error => {
        console.log(error.status);
      });
    }
  }

  public validateCode(){
    let codeValidationFlag = this.smsCode == this.sentCode;
    if (!codeValidationFlag){
      this.codeErrorToast();
    } else {
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let body = {
        "token" : "appqs-47421358-fb3f-4596-a259-d2bf7d925718",
        "action" : "subscribe",
        "msisdn" : "994" + this.myNumber
      };

      this.http.post('/api', body, options)
      .subscribe(data => {
        let obj = JSON.parse(data.text());
        if (obj.results.subscribe == 1) {
          this.storage.set('authorized', true);
          this.storage.set('mobileNumber', this.myNumber);
          this.navCtrl.push(TabsPage);
        } else 
          this.unexpectedError();
      }, error => {
        console.log(error.status);
      });
    }
  }

  public reSend(){
    this.sentAgainToast();
    this.showSendAgain = false;
    this.validateNumber();
  }

  sentAgainToast() {
    let toast = this.toastCtrl.create({
      message: 'SMS Kod bir daha göndərildi',
      duration: 1500,
      position: 'bottom'
    });
  
    toast.present();
  }

  numberErrorToast() {
    let toast = this.toastCtrl.create({
      message: 'Mobil nömrə düzgün daxil edilməyib',
      duration: 1500,
      position: 'bottom'
    });
  
    toast.present();
  }

  codeErrorToast() {
    let toast = this.toastCtrl.create({
      message: 'SMS kod düzgün daxil edilməyib',
      duration: 1500,
      position: 'bottom'
    });
  
    toast.present();
  }

  unexpectedError(){
    let toast = this.toastCtrl.create({
      message: 'Xəta!',
      duration: 1500,
      position: 'bottom'
    });
  
    toast.present();
  }
}
