import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PicturePage } from '../picture/picture';
import { ReleaseonePage } from '../releaseone/releaseone';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }

  ionViewDidLoad() {
    //this.zans=document.getElementsByClassName('zan');
  }
  goSub(){
    this.navCtrl.push(ReleaseonePage);
  }
  userID; //用户ID
  userzanflag=[]; //用户作品是否被赞过的标志位数组
  usercollectflag=[];
  myPublish=[];
  ionViewWillEnter(){
    //this.zans=document.getElementsByClassName('zan');
    this.userID=localStorage.getItem('id');
    this.http.post('/api/userPublish',{userID:this.userID}).subscribe(data=>{
      this.myPublish=Array.prototype.slice.call(data);
      console.log(this.myPublish);
      for(var i=0;i<this.myPublish.length;i++){
        if(this.myPublish[i].zanflag=='true'){
          this.userzanflag[i]=true;
        }
      }
    });
  }

  flag=false;
  hideList;
  showList(i){ //控制下拉列表的显示与隐藏
    this.hideList=document.getElementsByClassName('hideList');
    if(this.flag==false){
      this.hideList[i].style.display='block';
    }else{
      this.hideList[i].style.display='none';
    }
    this.flag=!this.flag;
  }

  zans; //盛放页面中每个作品的赞的图标的数组
  zannum; //盛放页面中每个作品的赞的数量的数组
  userPID; //用户的作品ID
  zanflag; //赞的标记位
  changeback;
  changebacktwo;
  dianZan(i){
    this.zans=document.getElementsByClassName('zan');

    if(this.myPublish[i].zanflag=='false'){
      this.zans[i].style.color="#fd273f";
      this.userPID=this.myPublish[i].pID;
      this.myPublish[i].zanflag='true';
      this.zanflag=this.myPublish[i].zanflag;
      //console.log(this.userID,this.zanflag);
      this.myPublish[i].zan+=1;
      this.http.post('/api/addUserPublishZan',{userPID:this.userPID,zanflag:this.zanflag,zanNum:this.myPublish[i].zan}).subscribe(data=>{
        this.changeback=data;
        if(this.changeback.status==1){
          console.log('post success');
        }
      });
    }else{
      this.zans[i].style.color="rgb(212, 208, 208)";
      this.myPublish[i].zan-=1;
      this.myPublish[i].zanflag='false';
      this.zanflag=this.myPublish[i].zanflag;
      this.http.post('/api/cancelUserPublishZan',{userPID:this.userPID,zanflag:this.zanflag,zanNum:this.myPublish[i].zan}).subscribe(data=>{
        this.changebacktwo=data;
        if(this.changebacktwo.status==1){
          console.log('post success');
        }
      });
    }
    // this.flag=!this.flag;
  }
}
