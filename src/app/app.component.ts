import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { NetworkProvider } from '../providers/network/network';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage : Storage, public network: NetworkProvider) {
    statusBar.backgroundColorByHexString("#000000");
    network.detectNetwork();

    platform.ready().then(() => {
      storage.get('authorized').then((val) => {
        if (val == true) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = WelcomePage;
        }

        splashScreen.hide();
      });
    });
  }
}
