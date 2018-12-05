import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-plantwo',
  templateUrl: 'plantwo.html',
})
export class PlantwoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goBack(){
    this.navCtrl.pop();
  }
}
