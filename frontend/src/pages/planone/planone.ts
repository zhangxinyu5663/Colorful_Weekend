import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlanonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-planone',
  templateUrl: 'planone.html',
})
export class PlanonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  hsID; //首页日程推荐详情ID
  ionViewDidLoad(){
    this.hsID=localStorage.getItem('hsID');
    console.log(this.hsID);
  }
  goBack(){
    this.navCtrl.pop();
  }

}
