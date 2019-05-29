import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { PlanonePage } from '../planone/planone';
import { HttpClient } from '@angular/common/http';
import { SearchPage } from '../search/search';
import { HomeDetailPage } from '../homedetail/homedetail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  obj=[];//用于盛放后端传回来的首页推荐作品的类数组对象
  schedule=[]; //首页推荐日程
  // imgsURL;//用于盛放从后端传回来的图片路径数组
  projectId;//作品ID
  userID;//用于标记当前是哪个用户登录 用户ID
  // items=[];
  isActive=0; //用于标记首页两个导航按钮，并且跳转至对应的页面 0表示推荐 1表示日程

  isClick(i){
    this.isActive=i;
  }

  constructor(public modalCtrl:ModalController,public navCtrl: NavController,public http:HttpClient) {
    // for (let i = 0; i < 30; i++) {
    //   this.items.push(this.items.length);
    // }
  }

  // num;
  // btn;
  // flag=true;

  // change(i){
  //   this.btn=document.getElementsByClassName('btn')[i];
  //   if(this.flag==true){
  //     this.num=i;
  //     this.btn.style.color="black";
  //   }else{
  //     this.btn.style.color="#fd273f";
  //   }
  //   this.flag=!this.flag;
  // }

  Myzan=[]; //我赞过的所有作品
  Flag=[];//标记心是否被点击过
   
  //刚进入页面时触发
  ionViewWillEnter(){
    this.userID=localStorage.getItem('id');
    this.http.get('/api/homeSchedule').subscribe(data=>{
      this.schedule=Array.prototype.slice.call(data);
    });

    this.http.get('/api/home').subscribe(data=>{
      this.obj=Array.prototype.slice.call(data);
      console.log(this.obj);
      for(var k=0;k<this.obj.length;k++){
        this.Flag[k]=false;
      }
      this.http.post('/api/zan',{userID:this.userID}).subscribe(data=>{
        this.Myzan=data['Myzan'];
        for(var j=0;j<this.Myzan.length;j++){
          for(var i=0;i<this.obj.length;i++){
            if(this.Myzan[j].projectID == this.obj[i].projectID){
              this.Flag[i]=true;
            }
          }
        }
      });
    });
  }

  //点赞
  clickZan(i){
    if(this.Flag[i]==false){
      this.obj[i].zan+=1;
      this.http.post('/api/home/addZan',{zanNum:this.obj[i].zan,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
          //console.log(data);
      });
      this.Flag[i]=true;
    }else{
      this.obj[i].zan-=1;
      this.http.post('/api/home/delzan',{zanNum:this.obj[i].zan,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
      });
      this.Flag[i]=false;
    }
  }
  
  //点击推荐日程 跳转至首页推荐日程详情页
  goPlan(i){
    localStorage.setItem('hsID',this.schedule[i].hsID);
    this.navCtrl.push(PlanonePage);
  }
  
  //跳转至首页推荐详情页
  toHomeDetail(i){
    localStorage.setItem('homedetailID',this.obj[i].projectID);
    this.navCtrl.push(HomeDetailPage);
  }

  //跳转至搜索页
  toSearch(){
    this.navCtrl.push(SearchPage);
  }

}
