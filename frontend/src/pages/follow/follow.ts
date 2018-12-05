import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FollowpersonPage } from '../followperson/followperson';
/**
 * Generated class for the FollowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html',
})
export class FollowPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  Page=FollowPage;
  goto(strPage){
    this.Page=strPage;
    this.navCtrl.push(FollowpersonPage);
  }

}
