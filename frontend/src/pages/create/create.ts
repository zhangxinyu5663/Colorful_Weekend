import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyPage } from '../my/my';
import { ReleaseonePage } from '../releaseone/releaseone';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goMy(){this.navCtrl.push(MyPage);}
  goSub(){
    this.navCtrl.push(ReleaseonePage);
  }
}
