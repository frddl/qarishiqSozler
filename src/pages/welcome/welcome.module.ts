import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';
import { VerificationPage } from '../verification/verification';

@NgModule({
  declarations: [
    WelcomePage,
    VerificationPage
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
  ],
})
export class WelcomePageModule {}
