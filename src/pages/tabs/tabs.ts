import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RulesPage } from '../rules/rules';
import { GamePage } from '../game/game';
import { StatsPage } from '../stats/stats';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  statsRoot = StatsPage;
  gameRoot = GamePage;
  rulesRoot = RulesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }
}
