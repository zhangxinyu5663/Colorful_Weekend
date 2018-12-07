import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-planfive',
  templateUrl: 'planfive.html',
})
export class PlanfivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goBack(){
    this.navCtrl.pop();
  }
}

