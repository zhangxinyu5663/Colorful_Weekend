import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-planseven',
  templateUrl: 'planseven.html',
})
export class PlansevenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goBack(){
    this.navCtrl.pop();
  }
}

