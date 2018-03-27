import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import { GamePage } from '../../pages/game/game';

@Injectable()
export class NetworkProvider {

  isConnected = true;
  networkAlert = this.alertCtrl.create();
  deviceNetworkStatus = true;

  constructor(public network: Network, public alertCtrl: AlertController) {
    
  }

  detectNetwork(){
    this.deviceNetworkStatus = navigator.onLine;
    this.checkNetwork(this.deviceNetworkStatus);
  
    this.network.onConnect().subscribe(data => {    
      if (!this.isConnected || !this.deviceNetworkStatus){
        this.deviceNetworkStatus = true;
        this.networkAlert.dismiss();
      }

      this.isConnected = true;
    }, error => console.error(error));
   
    this.network.onDisconnect().subscribe(data => {
      this.isConnected = false;
      this.checkNetwork(this.isConnected);
    }, error => console.error(error));
  }

  checkNetwork(state){
    if (!state || !this.deviceNetworkStatus){
      this.networkAlert = this.alertCtrl.create({
        title: 'Qarışıq Söz',
        message: 'Davam etmək üçün internet bağlantınızın aktiv olduğuna əmin olun.',
      })
      this.networkAlert.onWillDismiss(() => this.checkNetwork(this.isConnected && this.deviceNetworkStatus));
      this.networkAlert.present();
    }
  }
}
