import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GuanzhuPage } from '../guanzhu/guanzhu';
/**
 * Generated class for the FollowpersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-followperson',
  templateUrl: 'followperson.html',
})
export class FollowpersonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowpersonPage');
  }
  goguanzhu(){
    this.navCtrl.popTo(GuanzhuPage);
  }
}
