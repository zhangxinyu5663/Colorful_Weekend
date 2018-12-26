import { Component, style } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyPage } from '../my/my';
import { FansmyPage } from '../fansmy/fansmy';
import { HttpClient } from '@angular/common/http';
import { FollowpersonPage } from '../followperson/followperson';



@IonicPage()
@Component({
  selector: 'page-fans',
  templateUrl: 'fans.html',
})
export class FansPage {
  num;
  btn;
  flag=true;
  change(i,userID){
    this.btn=document.getElementsByClassName('btn')[i];
    if(this.flag==true){
      this.num=i;
      document.getElementsByClassName('btn')[i].innerHTML = "已关注";
      this.btn.style.backgroundColor="grey";
      this.http.post('/api/homedetail/attentUser',{userID:this.userID,ToUserID:userID}).subscribe(data=>{
        console.log(data);
      })
    }else{
      this.btn.style.backgroundColor="#fd273f";
      document.getElementsByClassName('btn')[i].innerHTML = "关注";
      this.http.post('/api/homedetail/delAttentUser',{userID:this.userID,ToUserID:userID}).subscribe(data=>{
        console.log(data);
      })
    }
    this.flag=!this.flag;
  }
  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  goMy(){this.navCtrl.push(MyPage);}
  goFan(){this.navCtrl.push(FansmyPage);}

  userID;//用于标记是哪个用户
  fans;//盛放我关注的作品数组
  ionViewWillEnter(){
    this.userID=localStorage.getItem('userID');
    console.log(this.userID);
    this.http.post('/api/my/fans',{userID:this.userID}).subscribe(data=>{
        this.fans=data['fans'];
        console.log(this.fans);
        
    })
  }
  gofollow( fansUserID ){
    localStorage.setItem("userIDdetail",fansUserID);
    this.navCtrl.push(FollowpersonPage);
  }
}
