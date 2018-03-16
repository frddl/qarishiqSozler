import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    
    storage.get('mobileNumber').then((val) => {
      this.mobileNumber = val;
    });

    let body = {
      "token" : "appqs-47421358-fb3f-4596-a259-d2bf7d925718",
      "action" : "start",
      "msisdn" : "994" + this.mobileNumber.substr(1)
    };

    this.http.post('/api/', body, options)
    .subscribe(data => {
      let obj = JSON.parse(data.text());
      console.log(obj);
      this.scrambledWord = obj.results.scrambled;
      this.originalWord = obj.results.original;
      this.msg = obj.results.msg;
      // this.navCtrl.push(GamePage, { });
    }, error => {
      console.log(error.status);
    });
  }

}
