import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GuanzhuPage } from '../guanzhu/guanzhu';
import { UserinfoPage } from '../userinfo/userinfo';
import { HttpClient } from '@angular/common/http';
import { HomeDetailPage } from '../homedetail/homedetail';
import { FansPage } from '../fans/fans';


@IonicPage()
@Component({
  selector: 'page-fansuserproject',
  templateUrl: 'fansuserproject.html',
})
export class FansuserprojectPage {
  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  goFans(){this.navCtrl.popTo(FansPage)}
  
  userdetailID;//点开的用户的id
  userdetail;//关注的用户详情数组
  userHead;//用户头像
  userName;//用户名称
  userID;//用户ID
  tag;
  isShow=1;
  ionViewWillEnter(){
    this.userdetailID=localStorage.getItem('userIDdetail');
    console.log(this.userdetailID);
    this.http.post('/api/my/userDetail',{userID:this.userdetailID}).subscribe(data=>{
        this.userdetail=data['userDetail'];
        console.log('注意',this.userdetail);
        this.userHead=this.userdetail[0].head;
        console.log(this.userHead);
        this.userName=this.userdetail[0].userName;
        this.userID=this.userdetail[0].userID;
        if(this.userdetail.imgs==undefined){
          this.isShow=0;
          // this.tag=document.getElementById('ul');
          // console.log(this.tag)
          // this.tag.style.display='none';
          document.getElementById('div2').innerHTML='该用户还未在首页发表过作品'
        }
    })
  }

  detail(projectID){
    if(this.userdetail.imgs==undefined){
      console.log('该用户还未在首页发表过作品')
    }else{
      localStorage.setItem('homedetailID',projectID);
      this.navCtrl.push(HomeDetailPage);
    }
  }
//查看用户详情
  goUserinfo(){
    this.navCtrl.push(UserinfoPage);
  }
}
