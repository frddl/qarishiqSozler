import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';

@Injectable()
export class NetworkProvider {

  isConnected = true;
  private networkAlert: any;
  private deviceNetworkStatus = true;
  public alertPresented: any;

  constructor(public network: Network, public alertCtrl: AlertController) {
    this.alertPresented = false;
    //this.deviceNetworkStatus = navigator.onLine;
    //this.checkNetwork(this.deviceNetworkStatus);
  }

  detectNetwork(){
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
      let v = this;
      if (!v.alertPresented){
        this.networkAlert = this.alertCtrl.create({
          title: 'Qarışıq Söz',
          message: 'Davam etmək üçün internet bağlantınızın aktiv olduğuna əmin olun.' + this,
        })
        this.networkAlert.onWillDismiss(() => {
          this.checkNetwork(this.isConnected && this.deviceNetworkStatus);
          v.alertPresented = false;
        });
        this.networkAlert.present();
      }
    }
  }
}
