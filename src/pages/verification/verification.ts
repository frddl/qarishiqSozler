import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonDigitKeyboardCmp, IonDigitKeyboardOptions } from '../../components/ion-digit-keyboard';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})

export class VerificationPage {

  mobileNumber: string;
  verificationCode: string;
  code: string; 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl : ToastController, private http : Http , private storage : Storage) {
    this.mobileNumber = navParams.get('mobileNumber');
    this.verificationCode = navParams.get('verificationCode');

    console.log(this.mobileNumber + ' ' + this.verificationCode); 

    //storage.set('mobileNumber', this.mobileNumber);
    //storage.set('verificationCode', this.verificationCode);
    storage.get('mobileNumber').then((val) => {
      console.log('Mobile number:', val);
    });

    storage.get('verificationCode').then((val) => {
      console.log('Verification code:', val);
    });
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
    let f = document.getElementsByName('code')[0].innerText;
    console.log(f);
    if (f.length < 4) {
      document.getElementsByName('code')[0].innerText += key;
      this.code += key;
    }
  }

  removeNumber(){
    let f = document.getElementsByName('code')[0].innerText;
    document.getElementsByName('code')[0].innerText = (f.substring(0, f.length - 1));
    //this.code = this.code.substring(0, this.code.length - 1);
  }

  public validateCode(){
    console.log('code',this.code);
    console.log('ver',this.verificationCode); 
    console.log(typeof(this.code) + ' ' + typeof(this.verificationCode))
      
    /*
     if ((this.code === this.verificationCode)){
      console.log(typeof(this.code) + ' ' + typeof(this.verificationCode))
      this.presentToast();
    } else {
      console.log('success');
     
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers });

      let body = {
        "token" : "appqs-47421358-fb3f-4596-a259-d2bf7d925718",
        "action" : "subscribe",
        "msisdn" : "994" + this.mobileNumber.substr(1)
      };

      this.http.post('/api/', body, options)
      .subscribe(data => {
        let obj = JSON.parse(data.text());
        // console.log(obj.results.smscode);
        console.log(obj);
        
        this.smsCode = obj.results.smscode;
        
        this.navCtrl.push(VerificationPage, {
          mobileNumber : this.myNumber,
          verificationCode : this.smsCode 
        });
        
        
      }, error => {
        console.log(error.status);
      });
      
    }
    */
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'SMS kod düzgün daxil edilməyib',
      duration: 1500,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      // do nothing
    });
  
    toast.present();
  }
}
