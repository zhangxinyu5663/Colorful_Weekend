import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GuanzhuPage } from '../guanzhu/guanzhu';
import { UserinfoPage } from '../userinfo/userinfo';
import { HttpClient } from '@angular/common/http';
import { Content01Page } from '../content01/content01';

@IonicPage()
@Component({
  selector: 'page-followperson',
  templateUrl: 'followperson.html',
})
export class FollowpersonPage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  goguanzhu(){this.navCtrl.popTo(GuanzhuPage);}
  
  userdetailID;//关注用户的id
  userdetail;//关注的用户详情数组
  userHead;//用户头像
  userName;//用户名称
  userID;//用户ID
  ionViewWillEnter(){
    this.userdetailID=localStorage.getItem('userIDdetail');
    console.log(this.userdetailID);
    this.http.post('/api/my/attentUserDetail',{userID:this.userdetailID}).subscribe(data=>{
        this.userdetail=data['MyattentionUser'];
        console.log(this.userdetail);
        this.userHead=this.userdetail[0].head;
        this.userName=this.userdetail[0].userName;
        this.userID=this.userdetail[0].userID;
    })
  }

  detail(projectID){
    localStorage.setItem('homedetailID',projectID);
    this.navCtrl.push(Content01Page);
  }
//查看用户详情
  goUserinfo(){
    this.navCtrl.push(UserinfoPage);
  }
}
