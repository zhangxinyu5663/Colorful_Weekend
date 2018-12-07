import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
// import { SetPage } from '../set/set';
import {  PhonenumPage } from '../phonenum/phonenum';


@IonicPage()
@Component({
  selector: 'page-changephone',
  templateUrl: 'changephone.html',
})
export class ChangephonePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController) {
  }
  // goBack(){this.navCtrl.push(SetPage);}
  goPhonenum(){this.navCtrl.push(PhonenumPage);}
  goTips(){
    let alert = this.alertCtrl.create({
      subTitle: '更换成功!',
      buttons: ['确定']
    });
    alert.present();
    this.navCtrl.push(PhonenumPage);
  }
  
}
