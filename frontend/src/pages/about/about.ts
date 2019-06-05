import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ZanPage } from '../zan/zan';
import { CommentPage } from '../comment/comment';
import { AtPage } from '../at/at';
import { HttpClient } from '@angular/common/http';
import { HomeDetailPage } from '../homedetail/homedetail';

// import {  }
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  close(){
    this.navCtrl.pop();
  }

  isActive=0;
  isClick(i){
    this.isActive=i;
  }
  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }
  userID;//用于标记是哪个用户
  Mycomment;//我评论的
  commentMy;//评论我的
  ionViewWillEnter(){
    this.userID=localStorage.getItem('id');
    this.http.post('/api/comment',{userID:this.userID}).subscribe(data=>{
        this.commentMy=data['commentMy'];
        this.Mycomment=data['Mycomment'];
        console.log(this.Mycomment);
        
    })
  }
  good:string="a";

  goProject(i){
    localStorage.setItem('homedetailID',this.Mycomment[i].ProjectID);
    this.navCtrl.push(HomeDetailPage);
  }

}
