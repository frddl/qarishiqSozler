import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { VerificationPage } from '../pages/verification/verification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = VerificationPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString("#000000");
      statusBar.backgroundColorByName("black"); 
      statusBar.styleBlackOpaque();
      splashScreen.hide();
    });

  }
}
