import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetPage } from '../set/set';
import { ChangepwdetailsPage } from '../changepwdetails/changepwdetails';

@IonicPage()
@Component({
  selector: 'page-changepw',
  templateUrl: 'changepw.html',
})
export class ChangepwPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goBack(){
    this.navCtrl.popTo(SetPage);
  }
  goDetails(){
    this.navCtrl.push(ChangepwdetailsPage);
  }
}
