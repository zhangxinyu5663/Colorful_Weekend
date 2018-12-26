import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FollowpersonPage } from '../followperson/followperson';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  goBack(){this.navCtrl.popTo(FollowpersonPage);}

  userdetailID;//当前关注用户id
  userInfo;//用户详细信息
  ionViewWillEnter(){
    this.userdetailID=localStorage.getItem('userIDdetail');
    console.log(this.userdetailID);
    this.http.post('/api/UserInfo',{userID:this.userdetailID}).subscribe(data=>{
        this.userInfo=data['userInfo'][0];
        console.log(this.userInfo);
        console.log(this.userInfo.head);
    })
  }
}
