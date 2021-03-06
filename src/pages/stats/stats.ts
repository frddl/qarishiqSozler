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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, storage: Storage) {
    storage.get('mobileNumber').then((val) => {
      this.requestStats(val);
      this.mobileNumber = val;
    });
  }

  ionViewWillEnter(){
    this.requestStats(this.mobileNumber);
  } 

  ionViewDidEnter(){
    this.requestStats(this.mobileNumber);
  }

  ionViewDidLoad(){
    this.requestStats(this.mobileNumber);
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

    this.http.post('http://4545.az/appapi/8112-1122/', body, options)
    .subscribe(data => {
      let obj = JSON.parse(data.text());
      this.usrPoints = obj.results.usrpoints;
      this.trueAnswers = obj.results.trueanswers;
    }, error => {
      console.log(error.status);
    });
  }
}
