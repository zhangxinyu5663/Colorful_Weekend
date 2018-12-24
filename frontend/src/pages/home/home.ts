import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { PlanonePage } from '../planone/planone';
import { PlantwoPage } from '../plantwo/plantwo';
import { PlanthreePage } from '../planthree/planthree';
import { PlanfourPage } from '../planfour/planfour';
import { PlanfivePage } from '../planfive/planfive';
import { PlansixPage } from '../plansix/plansix';
import { PlansevenPage } from '../planseven/planseven';
import { PlaneightPage } from '../planeight/planeight';
import { HttpClient } from '@angular/common/http';
import { Content01Page } from '../content01/content01';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  obj=[];//用于盛放后端传回的首页推荐作品的类数组对象
  imgs;//用于盛放从后端传回来的图片路径数组
  projectId;//标记是哪个作品
  userID;//用于标记当前是哪个用户登录
  items=[];
  isActive=0;
  isClick(i){
    this.isActive=i;
  }
  goPlan(i){
    i=i+1;
    if(i==1){
      this.navCtrl.push(PlanonePage);
    }else if(i==2){
      this.navCtrl.push(PlantwoPage);
    }else if(i==3){
      this.navCtrl.push(PlanthreePage);
    }else if(i==4){
      this.navCtrl.push(PlanfourPage);
    }else if(i==5){
      this.navCtrl.push(PlanfivePage);
    }else if(i==6){
      this.navCtrl.push(PlansixPage);
    }else if(i==7){
      this.navCtrl.push(PlansevenPage);
    }else if(i==8){
      this.navCtrl.push(PlaneightPage);
    }
  }


  constructor(public modalCtrl:ModalController,public navCtrl: NavController,public http:HttpClient) {
    for (let i = 0; i < 30; i++) {
      this.items.push(this.items.length);
    }
  }
  schedule=[];
  num;
  btn;
  flag=true;
  change(i){
    this.btn=document.getElementsByClassName('btn')[i];
    if(this.flag==true){
      this.num=i;
      this.btn.style.color="black";
    }else{
      this.btn.style.color="#fd273f";
    }
    this.flag=!this.flag;
  }
  ionViewDidLoad(){
    this.userID=localStorage.getItem('userID');
    // this.http.get('/api/homeSchedule').subscribe(data=>{
    //   this.schedule=Array.prototype.slice.call(data);
    //   // for(var i=0;i<this.schedule.length;i++){
    //   //   console.log(this.schedule[i].imgDetail);
    //   // } 
    // });
    this.http.get('/api/home').subscribe(data=>{
      this.obj=Array.prototype.slice.call(data);
      console.log(this.obj);
    })
  }
  detail(i){
    localStorage.setItem('homedetailID',this.obj[i].projectID);
    this.navCtrl.push(Content01Page);
  }

  //点赞
  tag=true;
  heart;
  clickZan(i){
    this.heart = document.getElementsByClassName('heart')[i]; 
    var zan = document.getElementsByClassName('zanNum');
    var zanNum=parseInt(zan[i].innerHTML);
    var isclick=this.heart.getAttribute("isclick");
    if(isclick=="true"){
      this.heart.style.cssText="font-size:17px;";
      zanNum=zanNum+1;
      zan[i].innerHTML=String(zanNum);
      var Bisclick=!Boolean(isclick);
      this.heart.setAttribute('isclick',String(Bisclick));
      console.log(this.obj[i].projectID);
      this.http.post('/api/home/zan',{zanNum:zanNum,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
          console.log(data);
      })
    }
    if(isclick!="true"){
      this.heart.style.cssText="font-size:15px;";
      zanNum=zanNum-1;
      zan[i].innerHTML=String(zanNum);
      isclick="true";
      this.heart.setAttribute('isclick',isclick);
      this.http.post('/api/home/delzan',{zanNum:zanNum,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
        console.log(data);
    })
    }
  }
}
