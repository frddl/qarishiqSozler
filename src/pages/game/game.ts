import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Content } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})

export class GamePage {

  mobileNumber = '';
  scrambledWord = '';
  originalWord = '';
  msg = '';

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage, private toastCtrl: ToastController) {
    storage.get("mobileNumber").then((val) => {
      this.requestWord(val);
    });
  }

  public checkWord(word){
    let correct = word.toLocaleUpperCase() == this.originalWord;

    console.log(word.toLocaleUpperCase());
    console.log(this.originalWord);

    if (correct){
      this.topUp(this.mobileNumber);
    } else {
      this.isNotCorrect();
    }

    this.requestWord(this.mobileNumber);
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
      this.scrambledWord = obj.results.scrambled;
      this.scrambledWord = this.scrambledWord.toLocaleUpperCase();

      this.originalWord = obj.results.original;
      this.originalWord = this.originalWord.toLocaleUpperCase();
      this.msg = obj.results.msg;
    }, error => {
      console.log(error.status);
    });
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
      this.isCorrect();      
    }, error => {
      console.log(error.status);
    });
  }

  isCorrect() {
    let toast = this.toastCtrl.create({
      message: '+10',
      duration: 1500,
      position: 'top'
    });
  
    toast.present();
  }

  isNotCorrect(){
    let toast = this.toastCtrl.create({
      message: ':(',
      duration: 1500,
      position: 'top'
    });
  
    toast.present();
  }

}
