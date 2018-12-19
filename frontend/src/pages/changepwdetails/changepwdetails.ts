import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { SetPage } from '../set/set';
import { ChangepwPage } from '../changepw/changepw';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-changepwdetails',
  templateUrl: 'changepwdetails.html',
})
export class ChangepwdetailsPage {

  constructor(public navCtrl: NavController,public navParams: NavParams,public alertCtrl: AlertController,public http:HttpClient,public modalCtrl:ModalController) {
  }
  // goBack(){this.navCtrl.push(SetPage);}
  goChangepw(){this.navCtrl.pop();}
  userID;
  pwdinp;
  againpwdinp;
  arr;
  goTips(){
    // let alert = this.alertCtrl.create({
    //   subTitle: '修改成功!',
    //   buttons: ['确定']
    // });
    // alert.present();
    // this.navCtrl.push(SetPage);
    this.userID=localStorage.getItem('id');
    if(this.pwdinp.length<6 || this.pwdinp.length>16){
      const alert3 = this.alertCtrl.create({
        title: '修改密码异常',
        subTitle: '请输入6-16位密码',
        buttons: ['OK']
      });
      alert3.present();
    }else if(this.pwdinp!=this.againpwdinp){
      const alert1 = this.alertCtrl.create({
        title: '修改密码异常',
        subTitle: '两次密码不一致',
        buttons: ['OK']
      });
      alert1.present();
    }else{
      this.http.post('/api/changePwdtwo',{pwd:this.againpwdinp,id:this.userID}).subscribe(data=>{
        this.arr=data;
        if(this.arr.status==1){
          const alert2 = this.alertCtrl.create({
            title: '修改密码成功',
            subTitle: '您的密码已修改成功',
            buttons: ['OK']
          });
          alert2.present();
          // this.navCtrl.push(SetPage);
          // let profileModal=this.modalCtrl.create(SetPage);
          // profileModal.present();
        }
      })
    }
  }

  clearone(){
    this.pwdinp='';
  }

  cleartwo(){
    this.againpwdinp='';
  }
}
