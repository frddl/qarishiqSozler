import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-browser',
  templateUrl: 'browser.html',
})

export class BrowserPage {

  u = 0;

  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams) {
    this.u = parseInt(this.navParams.get('src'));
  }

  ionViewWillEnter(){
    this.platform.registerBackButtonAction(()=>{
      this.navCtrl.pop();
    });
  }
}
