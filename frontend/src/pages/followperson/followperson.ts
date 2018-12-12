import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GuanzhuPage } from '../guanzhu/guanzhu';
import { UserinfoPage } from '../userinfo/userinfo';

@IonicPage()
@Component({
  selector: 'page-followperson',
  templateUrl: 'followperson.html',
})
export class FollowpersonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goguanzhu(){this.navCtrl.popTo(GuanzhuPage);}
  goUserinfo(){this.navCtrl.push(UserinfoPage);}
}
