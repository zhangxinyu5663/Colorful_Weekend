import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FollowpersonPage } from '../followperson/followperson';
import { MyPage } from '../my/my';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the GuanzhuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guanzhu',
  templateUrl: 'guanzhu.html',
})
export class GuanzhuPage {
  num;
  btn;
  flag=true;
  //取消关注和关注
  change(i,userID){
    this.btn=document.getElementsByClassName('btn')[i];
    if(this.flag==true){
      this.num=i;
      document.getElementsByClassName('btn')[i].innerHTML = "关注";
      this.btn.style.backgroundColor="#fd273f";
      this.http.post('/api/homedetail/delAttentUser',{userID:this.userID,ToUserID:userID}).subscribe(data=>{
        console.log(data);
      })
    }else{
      this.btn.style.backgroundColor="grey";
      document.getElementsByClassName('btn')[i].innerHTML = "已关注";
      this.http.post('/api/homedetail/attentUser',{userID:this.userID,ToUserID:userID}).subscribe(data=>{
        console.log(data);
      })
    }
    this.flag=!this.flag;
  }
  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  userID;//用于标记是哪个用户
  Myattention;//我关注的人
  ionViewWillEnter(){
    this.userID=localStorage.getItem('id');
    console.log(this.userID);
    this.http.post('/api/my/attentUser',{userID:this.userID}).subscribe(data=>{
        this.Myattention=data['Myattention'];
        console.log(this.Myattention);
        
    })
  }
  
  gofollow( attentionUserID ){
    localStorage.setItem("userIDdetail",attentionUserID);
    this.navCtrl.push(FollowpersonPage);
  }
  goMy(){this.navCtrl.pop();}
 
  detail(projectID){
    //localStorage.setItem('homedetailID',projectID);
    this.navCtrl.push(FollowpersonPage);
  }

}
