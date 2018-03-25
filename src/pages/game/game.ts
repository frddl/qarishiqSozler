import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Content } from 'ionic-angular';
import swal from 'sweetalert2';
import { SmartAudio } from '../../providers/smart-audio/smart-audio';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})

export class GamePage {

  mobileNumber = '';
  scrambledWord = '';
  scrArr = [];
  oriArr = [];
  originalWord: string;
  msg = '';
  inputWord = '';
  indexes = [];
  usrPoints = 0;
  animateSuccess = false;

  public unregisterBackButtonAction: any;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage, private smartAudio: SmartAudio, public alertCtrl: AlertController, public platform: Platform) {
    storage.get("mobileNumber").then((val) => {
      this.requestStats(val);
      this.requestWord(val);
    });
  }

  requestStats(mobileNumber){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    
    let body = {
      "token" : "appqs-47421358-fb3f-4596-a259-d2bf7d925718",
      "action" : "stat",
      "msisdn" : "994" + mobileNumber.substr(1)
    };

    this.http.post('/api', body, options)
    .subscribe(data => {
      let obj = JSON.parse(data.text());
      this.usrPoints = obj.results.usrpoints;
    }, error => {
      console.log(error.status);
    });
  }

  private newWord(mobileNumber){
    this.scrArr = [];
    this.indexes = [];
    this.inputWord = '';
    this.requestWord(mobileNumber);
  }

  private requestWord(mobileNumber){
    this.mobileNumber = mobileNumber;
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    
    let body = {
      "token" : "appqs-47421358-fb3f-4596-a259-d2bf7d925718",
      "action" : "start",
      "msisdn" : "994" + mobileNumber.substr(1)
    };

    this.http.post('/api', body, options)
    .subscribe(data => {
      let obj = JSON.parse(data.text());
      let msgText = obj.results.msg;
      
      if (msgText != null)
        this.errorMsg(msgText);

      let re = /I/gi;

      this.scrambledWord = obj.results.scrambled;
      this.scrambledWord = this.scrambledWord.replace(re, "İ").toUpperCase();
      
      for (let i = 0; i < this.scrambledWord.length; i++){
        this.scrArr.push(this.scrambledWord.charAt(i));
      }

      this.oriArr.length = this.scrArr.length;
      
      this.originalWord = obj.results.original;
      this.originalWord = this.originalWord.replace(re, "İ").toUpperCase();
      console.log(this.originalWord);
    }, error => {
      console.log(error.status);
    });
  }
  
  private press(letter, index){
    this.smartAudio.play('press');
    let letterButton = document.getElementById(index);
    letterButton.style.display = 'none';
    this.inputWord += letter;
    this.indexes.push(index);
    if (this.inputWord == this.originalWord){
      this.success();
    } else if (this.inputWord.length == this.originalWord.length) {
      this.failure();  
    }
  }

  private success(){
    this.animateSuccess = true;
    setTimeout(() => {
      this.indexes = [];
      this.topUp(this.mobileNumber);
      this.newWord(this.mobileNumber);  
      this.animateSuccess = false;  
    }, 300);
  }

  private failure(){
    for (let k = 0; k < this.originalWord.length; k++){
      setTimeout(() => {
        this.clear();
      }, (50 * (k + 1)));
    }
  }

  private clear(){
    this.smartAudio.play('clear');
    let i = this.indexes.pop();
    let letterButton = document.getElementById(i);
    letterButton.style.display = '';
    this.inputWord = this.inputWord.substr(0, this.inputWord.length - 1);
  }

  private errorMsg(msgText){
    swal({
      title: 'Xəta!',
      text: msgText,
      type: 'info',
      showConfirmButton: false
    }).then((result) => {
        this.newWord(this.mobileNumber);
    })
  }

  private topUp(mobileNumber){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    
    let body = {
      "token" : "appqs-47421358-fb3f-4596-a259-d2bf7d925718",
      "action" : "topup",
      "msisdn" : "994" + mobileNumber.substr(1)
    };

    this.http.post('/api', body, options)
    .subscribe(data => {
      let obj = JSON.parse(data.text());
      this.usrPoints = parseInt(obj.results.usrpoints);
      this.isCorrect();
    }, error => {
      console.log(error.status);
    });
  }

  isCorrect() {
    this.smartAudio.play('coin');
    let f = document.getElementById('points');
    f.style.backgroundColor = '#2AB736';
    
    setTimeout(() => {
      f.style.backgroundColor = '';
    }, 500);
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Qarışıq Söz',
      message: 'Çıxmaq istəyirsiniz?',
      buttons: [
        {
          text: 'Xeyr',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Bəli',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
