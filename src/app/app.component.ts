import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { SmartAudio } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage : Storage, smartAudio : SmartAudio) {
    statusBar.backgroundColorByHexString("#000000");
    statusBar.backgroundColorByName("black"); 
    statusBar.styleBlackOpaque();
    
    platform.ready().then(() => {
      splashScreen.hide();
    
      storage.get('authorized').then((val) => {
        if (val == true) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = WelcomePage;
        }

        smartAudio.preload('coin', 'assets/audio/coin.mp3');
        smartAudio.preload('press', 'assets/audio/build.mp3');
        smartAudio.preload('clear', 'assets/audio/dig.mp3');
      });
    });
  }
}
