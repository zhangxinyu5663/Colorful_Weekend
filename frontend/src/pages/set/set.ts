import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';
import { ChangepwPage } from '../changepw/changepw';
import { SetdataPage } from '../setdata/setdata';
import { AccountPage } from '../account/account';
import { PhonenumPage } from '../phonenum/phonenum';
import { MyPage } from '../my/my';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public app:App,public modalCtrl:ModalController) {
  }
  userID;//用户ID
  arr; //从后端返回的数据
  phoneStr; //手机号
  ionViewWillEnter(){
    this.userID=localStorage.getItem('id');
    this.http.post('/api/queryPhone',{id:this.userID}).subscribe(data=>{
      this.arr=data;
      this.phoneStr=this.arr[0].phoneNumber;
      this.phoneStr=this.phoneStr.substr(0,3)+"****"+this.phoneStr.substr(7);
    })
  }
  // goBack(){this.navCtrl.push(MyPage);}
  goBack(){this.navCtrl.pop();}
  goChangePw(){
    this.navCtrl.push(ChangepwPage);
    // let profileModal=this.modalCtrl.create(ChangepwPage);
    // profileModal.present();
  }
  goSetdata(){this.navCtrl.push(SetdataPage);}
  goAccount(){this.navCtrl.push(AccountPage);}
  goPhonenum(){this.navCtrl.push(PhonenumPage);}
  goLogin(){
    //this.navCtrl.push(LoginPage);
    this.app.getRootNavs()[0].setRoot(LoginPage);
  }


}
