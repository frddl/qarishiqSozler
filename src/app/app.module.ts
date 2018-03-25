import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, FabContainer } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { GamePage } from '../pages/game/game';
import { IonDigitKeyboard } from '../components/ion-digit-keyboard/ion-digit-keyboard.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';
import { StatsPage } from '../pages/stats/stats';
import { SmartAudio } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';
import { BrowserPage } from '../pages/browser/browser';
import { GlobalProvider } from '../providers/global/global';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    GamePage,
    TabsPage,
    StatsPage,
    BrowserPage
  ],
  imports: [
    BrowserModule,
    IonDigitKeyboard,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      platforms : {
        android : {
          scrollAssist: false,
          autoFocusAssist: false
        },
        
        ios : {
          scrollAssist: false,
          autoFocusAssist: false
        },
      }
    }),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    GamePage,
    TabsPage,
    StatsPage,
    BrowserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FabContainer,
    NativeAudio,
    SmartAudio,
    TabsPage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
  ] 
})
export class AppModule {}
