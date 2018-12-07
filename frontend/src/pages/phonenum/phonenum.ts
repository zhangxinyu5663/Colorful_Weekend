import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangephonePage } from '../changephone/changephone';
import { SetPage } from '../set/set';


@IonicPage()
@Component({
  selector: 'page-phonenum',
  templateUrl: 'phonenum.html',
})
export class PhonenumPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goChangePhone(){this.navCtrl.push(ChangephonePage);}
  goBack(){this.navCtrl.push(SetPage);}
}
