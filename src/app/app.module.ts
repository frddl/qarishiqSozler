import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from '../pages/welcome/welcome';
import { GamePage } from '../pages/game/game';
import { VerificationPage } from '../pages/verification/verification';
import { IonDigitKeyboard } from '../components/ion-digit-keyboard/ion-digit-keyboard.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';
import { RulesPage } from '../pages/rules/rules';
import { StatsPage } from '../pages/stats/stats';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    VerificationPage,
    GamePage,
    TabsPage,
    RulesPage,
    StatsPage
  ],
  imports: [
    BrowserModule,
    IonDigitKeyboard,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    VerificationPage,
    GamePage,
    TabsPage,
    RulesPage,
    StatsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ] 
})
export class AppModule {}
