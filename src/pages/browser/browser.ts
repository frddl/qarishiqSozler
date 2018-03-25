import { Component, createPlatformFactory } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-browser',
  templateUrl: 'browser.html',
})

export class BrowserPage {

  u = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.u = parseInt(this.navParams.get('src'));
  }
}
