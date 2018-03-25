import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer, Platform, AlertController } from 'ionic-angular';
import { GamePage } from '../game/game';
import { StatsPage } from '../stats/stats';
import { SmartAudio } from '../../providers/smart-audio/smart-audio';
import { BrowserPage } from '../browser/browser';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  statsRoot = StatsPage;
  gameRoot = GamePage;
  soundOn = true;
  pressedBack = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController , public platform: Platform , public fab: FabContainer, public smartAudio: SmartAudio, public global: GlobalProvider) {
    this.storage.get('sound').then((val) => {
      this.soundOn = val;
    });
  }

  ionViewWillEnter(){
    this.platform.registerBackButtonAction(()=>{
      if (!this.pressedBack)
        this.presentConfirm();
    });
  }

  presentConfirm() {
    this.pressedBack = !this.pressedBack;

    let alert = this.alertCtrl.create({
      title: 'Qarışıq Söz',
      message: 'Çıxmaq istəyirsiniz?',
      buttons: [
        {
          text: 'XEYR',
          role: 'cancel',
          handler: () => {
            this.pressedBack = !this.pressedBack;
          }
        },
        {
          text: 'BƏLİ',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }

  popupContact() {
    let alert = this.alertCtrl.create({
      title: 'Əlaqə',
      subTitle: '\nE-mail: support@simtoday.net\nTel: (012) 404 1558',
      buttons: ['OK']
    });
    
    alert.present();
  }

  sound(){
    this.smartAudio.playSound = !this.smartAudio.playSound;
    this.soundOn = !this.soundOn;
    this.storage.set('sound', this.soundOn);
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
  
  public fabToggled(): void {
    this.global.isOpen = !this.global.isOpen;
  }

  close(fab: FabContainer){
    fab.close();
    this.global.isOpen = false;
  }
}
