import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FollowPage } from '../follow/follow';

//  IonicPage,
/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinePage');
  }
  gofollow(){
    this.navCtrl.push(FollowPage);
  }
}
