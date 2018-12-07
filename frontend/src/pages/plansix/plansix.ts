import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-plansix',
  templateUrl: 'plansix.html',
})
export class PlansixPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goBack(){
    this.navCtrl.pop();
  }
}

