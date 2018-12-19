import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { SetPage } from '../set/set';
import { ChangepwdetailsPage } from '../changepwdetails/changepwdetails';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-changepw',
  templateUrl: 'changepw.html',
})
export class ChangepwPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public alertCtrl:AlertController,public modalCtrl:ModalController) {
  }
  pwdinp;  //密码输入框
  userID;  //用户ID
  arr; //从后端返回的数据
  goBack(){
    //this.navCtrl.push(SetPage);
    this.navCtrl.pop();
  }
  goDetails(){
    this.userID=localStorage.getItem('id');
    console.log(this.userID);
    this.http.post('/api/queryPwd',{id:this.userID}).subscribe(data=>{
      this.arr=data;
      if(this.arr[0].password==this.pwdinp){
        this.navCtrl.push(ChangepwdetailsPage);
        // let profileModal=this.modalCtrl.create(ChangepwdetailsPage);
        // profileModal.present();
      }else{
        const alert = this.alertCtrl.create({
          title: '密码错误',
          subTitle: '请输入正确的密码信息',
          buttons: ['OK']
        });  
        alert.present();
      }
    });
  }

  clear(){ //清空输入框
    this.pwdinp='';
  }
}
