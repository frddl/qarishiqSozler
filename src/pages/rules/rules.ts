import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html',
})

export class RulesPage {

  rules = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private storage: Storage) {
    this.storage.get("mobileNumber").then(val => {
      if (val != null) 
        this.requestRules(val);
    });
  }

  requestRules(mobileNumber){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    
    let body = {
      "token" : "appqs-47421358-fb3f-4596-a259-d2bf7d925718",
      "action" : "rules",
      "msisdn" : "994" + mobileNumber.substr(1)
    };

    this.http.post('http://4545.az/appapi/8112-1122/', body, options)
    .subscribe(data => {
      let obj = JSON.parse(data.text());
      this.rules = obj.results.rules;
    }, error => {
      console.log(error.status);
    });
  }
}
