import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FollowpersonPage } from '../followperson/followperson';

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  goBack(){this.navCtrl.popTo(FollowpersonPage);}
 
}
