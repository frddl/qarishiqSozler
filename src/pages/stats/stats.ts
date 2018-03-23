import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})

export class StatsPage {

  private trueAnswers = '';
  private usrPoints = '';
  private mobileNumber = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage) {
    storage.get('mobileNumber').then((val) => {
      this.requestStats(val);
      this.mobileNumber = val;
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
      this.trueAnswers = obj.results.trueanswers;
    }, error => {
      console.log(error.status);
    });

    setTimeout(() => {
      this.requestStats(mobileNumber);
    }, 1000);
  }
}
