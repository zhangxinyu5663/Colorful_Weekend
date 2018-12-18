import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChangepwPage } from '../changepw/changepw';
import { SetdataPage } from '../setdata/setdata';
import { AccountPage } from '../account/account';
import { PhonenumPage } from '../phonenum/phonenum';
import { MyPage } from '../my/my';
import { LoginPage } from '../login/login';
@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  // goBack(){this.navCtrl.push(MyPage);}
  goBack(){this.navCtrl.pop();}
  goChangePw(){this.navCtrl.push(ChangepwPage);}
  goSetdata(){this.navCtrl.push(SetdataPage);}
  goAccount(){this.navCtrl.push(AccountPage);}
  goPhonenum(){this.navCtrl.push(PhonenumPage);}
  goLogin(){this.navCtrl.push(LoginPage);}

  // ionViewDidEnter(){
  //   let elements = document.querySelectorAll(".tabbar");
  //   if (elements != null) {
  //      Object.keys(elements).map((key) => {
  //         elements[key].style.display = 'none';
  //     });
  //   }   
  // }
  //ionic当退出页面的时候触发的方法
  // ionViewWillLeave() {
  //   let elements = document.querySelectorAll(".tabbar");
  //   if (elements != null) {
	//     Object.keys(elements).map((key) => {
  //   		elements[key].style.display = 'flex';
	//     });
  //   }
  // }

}
