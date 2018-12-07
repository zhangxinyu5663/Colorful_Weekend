import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyPage } from '../my/my';

@IonicPage()
@Component({
  selector: 'page-fans',
  templateUrl: 'fans.html',
})
export class FansPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goMy(){this.navCtrl.push(MyPage);}
}
