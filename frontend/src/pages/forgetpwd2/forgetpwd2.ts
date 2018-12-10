import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ForgetpwdPage } from '../forgetpwd/forgetpwd';
import { ChangepwdalertPage } from '../changepwdalert/changepwdalert';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the Forgetpwd2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpwd2',
  templateUrl: 'forgetpwd2.html',
})
export class Forgetpwd2Page {
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Forgetpwd2Page');
  }

  pwd;
  againpwd;
  phone;
  arr;
  back(){
    this.navCtrl.push(ForgetpwdPage);
  }
  sure(){
    if(this.pwd!=this.againpwd){
      const alert1 = this.alertCtrl.create({
        title: '设置密码异常',
        subTitle: '两次密码不一致',
        buttons: ['OK']
      });
      alert1.present();
    }else{
      this.phone=localStorage.getItem('phone');
      this.http.post('/api/changePwd',{phone:this.phone,pwd:this.againpwd}).subscribe(data=>{
        this.arr=data;
        if(this.arr.status==1){
          console.log('修改密码成功');
          this.navCtrl.push(ChangepwdalertPage);
        }
      })
    }
  }
}
