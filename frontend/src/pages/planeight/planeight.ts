import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-planeight',
  templateUrl: 'planeight.html',
})
export class PlaneightPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goBack(){
    this.navCtrl.pop();
  }
}