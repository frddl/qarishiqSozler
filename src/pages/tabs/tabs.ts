import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabList, FabContainer, Platform, AlertController } from 'ionic-angular';
import { GamePage } from '../game/game';
import { StatsPage } from '../stats/stats';
import { SmartAudio } from '../../providers/smart-audio/smart-audio';
import { BrowserPage } from '../browser/browser';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  statsRoot = StatsPage;
  gameRoot = GamePage;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController , public platform: Platform , public fab: FabContainer, public smartAudio: SmartAudio) {
  
  }

  a() {

  }

  navigate(dir){
    let url = "";

    switch(dir) { 
      case 'winners': { 
        url = "1"; 
        break; 
      } 
      case 'gifts': { 
        url = "2"; 
        break; 
      } 
      case 'rules': {
        url = "3";
        break;
      }
   } 

    this.navCtrl.push(BrowserPage, {
      src: url
    });
  }
  
  close(fab: FabContainer){
    fab.close();
  }
}
