import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SetPage } from '../set/set';
import { ChangepwPage } from '../changepw/changepw';

@IonicPage()
@Component({
  selector: 'page-changepwdetails',
  templateUrl: 'changepwdetails.html',
})
export class ChangepwdetailsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController) {
  }
  // goBack(){this.navCtrl.push(SetPage);}
  goChangepw(){this.navCtrl.push(ChangepwPage);}
  goTips(){
    let alert = this.alertCtrl.create({
      subTitle: '修改成功!',
      buttons: ['确定']
    });
    alert.present();
    this.navCtrl.push(SetPage);
  }
}
