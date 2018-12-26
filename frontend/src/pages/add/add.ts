import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PicturePage } from '../picture/picture';
import { ReleaseonePage } from '../releaseone/releaseone';
import { HttpClient } from '@angular/common/http';
import { EditmypublishPage } from '../editmypublish/editmypublish';
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
        // if(this.myPublish[i].collectflag=='true'){
        //   this.usercollectflag[i]=true;
        // }
      }
      console.log(this.userzanflag);
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
  changeback;
  changebacktwo;
  //点赞作品
  dianZan(i){
    this.zans=document.getElementsByClassName('zan');
    this.userPID=this.myPublish[i].pID;
    if(this.myPublish[i].zanflag=='false'){
      this.zans[i].style.color="#fd273f";
      this.myPublish[i].zanflag='true';
      this.userzanflag[i]=true;
      // this.zanflag=this.myPublish[i].zanflag;
      this.myPublish[i].zan+=1;
      this.http.post('/api/addUserPublishZan',{userPID:this.userPID,zanflag:this.myPublish[i].zanflag,zanNum:this.myPublish[i].zan}).subscribe(data=>{
        this.changeback=data;
        if(this.changeback.status==1){
          console.log('点赞成功');
        }
      });
    }else{
      this.zans[i].style.color="rgb(212, 208, 208)";
      this.myPublish[i].zan-=1;
      this.myPublish[i].zanflag='false';
      this.userzanflag[i]=false;
      // this.zanflag=this.myPublish[i].zanflag;
      // console.log(this.zanflag);
      // console.log(this.userPID);
      this.http.post('/api/cancelUserPublishZan',{userPID:this.userPID,zanflag:this.myPublish[i].zanflag,zanNum:this.myPublish[i].zan}).subscribe(data=>{
        this.changebacktwo=data;
        if(this.changebacktwo.status==1){
          console.log('取消点赞');
        }
      });
    }
    // this.flag=!this.flag;
  }

  //收藏作品
  collects; //获取页面所有的作品的星星图标
  changebackthree;
  changebackfour;
  Collect(i){
    this.collects=document.getElementsByClassName('collect');
    this.userPID=this.myPublish[i].pID;
    if(this.myPublish[i].collectflag=='false'){
      this.collects[i].style.color="rgb(252, 249, 63)";
      this.userPID=this.myPublish[i].pID;
      this.myPublish[i].collectflag='true';
      this.usercollectflag[i]=true;
      //console.log(this.userID,this.zanflag);
      this.myPublish[i].collect+=1;
      this.http.post('/api/addUserPublishCollect',{userPID:this.userPID,collectflag:this.myPublish[i].collectflag,collectNum:this.myPublish[i].collect}).subscribe(data=>{
        this.changebackthree=data;
        if(this.changebackthree.status==1){
          console.log('收藏成功');
        }
      });
    }else{
      this.collects[i].style.color="rgb(212, 208, 208)";
      this.myPublish[i].collect-=1;
      this.myPublish[i].collectflag='false';
      this.usercollectflag[i]=false;
      this.http.post('/api/cancelUserPublishCollect',{userPID:this.userPID,collectflag:this.myPublish[i].collectflag,collectNum:this.myPublish[i].collect}).subscribe(data=>{
        this.changebackfour=data;
        if(this.changebackfour.status==1){
          console.log('取消收藏');
        }
      });
    }
  }

  //删除用户作品
  del(pid,i){
    this.hideList=document.getElementsByClassName('hideList');
    this.hideList[i].style.display="none";
    console.log(pid);
    this.http.post('/api/delUserPublish',{pID:pid}).subscribe(data=>{
      if(data['status']==1){
        console.log('删除作品成功');
      }
    });
    this.userID=localStorage.getItem('id');
    this.http.post('/api/userPublish',{userID:this.userID}).subscribe(data=>{
      this.myPublish=Array.prototype.slice.call(data);
      console.log(this.myPublish);
      for(var i=0;i<this.myPublish.length;i++){
        if(this.myPublish[i].zanflag=='true'){
          this.userzanflag[i]=true;
        }
        // if(this.myPublish[i].collectflag=='true'){
        //   this.usercollectflag[i]=true;
        // }
      }
      console.log(this.userzanflag);
    });
  }

  //编辑用户作品
  edit(pid,i){
    localStorage.setItem('userPublishID',pid);
    localStorage.setItem('userPublishNum',i);

    this.navCtrl.push(EditmypublishPage);
  }
}
