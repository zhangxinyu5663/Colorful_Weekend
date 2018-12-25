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

  imgs;//用于盛放从后端传回来的图片路径数组
  projectId;//作品ID
  userID;//用于标记当前是哪个用户登录 用户ID
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

  obj=[];//用于盛放后端传回的首页推荐作品的类数组对象
  Myzan=[];
  Flag=[];//标记心是否被点击过
  ionViewWillEnter(){
    this.userID=localStorage.getItem('id');
    this.heart = document.getElementsByClassName('heart'); 
    this.http.get('/api/homeSchedule').subscribe(data=>{
      this.schedule=Array.prototype.slice.call(data);
      // for(var i=0;i<this.schedule.length;i++){
      //   console.log(this.schedule[i].imgDetail);
      // } 
    });

    this.http.get('/api/home').subscribe(data=>{
      this.obj=Array.prototype.slice.call(data);
      //console.log(this.obj);
      for(var k=0;k<this.obj.length;k++){
        this.Flag[k]=false;
      }
      this.http.post('/api/zan',{userID:this.userID}).subscribe(data=>{
        this.Myzan=data['Myzan'];
        //console.log(this.Myzan);  
        for(var j=0;j<this.Myzan.length;j++){
          for(var i=0;i<this.obj.length;i++){
            if(this.Myzan[j].projectID == this.obj[i].projectID){
              //console.log(this.obj[i].projectID);
              this.heart[i].style.color="#fd273f";
              this.Flag[i]=true;
            }
          }
        }
        //console.log(this.Flag);
      });
    });
  }
  detail(i){
    localStorage.setItem('homedetailID',this.obj[i].projectID);
    this.navCtrl.push(Content01Page,{zanflag:this.Flag[i]});
  }

  //点赞
  tag=true;
  heart;
  homeProjectZanFlag=[];
  zanflag;
  
  clickZan(i){
    this.heart = document.getElementsByClassName('heart')[i]; 
    var zanNum = document.getElementsByClassName('zanNum');
    //console.log(zanNum[i].innerHTML);
    if(this.Flag[i]==false){
      this.heart.style.color="#fd273f";
      // var zanNum=parseInt(zanNum[i].innerHTML);
      this.obj[i].zan+=1;
      this.zanflag='true';
      //var isclick=this.heart.getAttribute("isclick");
      // if(isclick=="true"){
      //   this.heart.style.cssText="font-size:17px;";
      //   zanNum=zanNum+1;
      //   zan[i].innerHTML=String(zanNum);
      //   var Bisclick=!Boolean(isclick);
      //   this.heart.setAttribute('isclick',String(Bisclick));
      //   console.log(this.obj[i].projectID);
      this.http.post('/api/home/addZan',{zanNum:this.obj[i].zan,userID:this.userID,projectID:this.obj[i].projectID,zanflag:this.zanflag}).subscribe(data=>{
          //console.log(data);
      });
      this.Flag[i]=true;
    }else{
      this.heart.style.color="rgb(212, 208, 208)";
      this.obj[i].zan-=1;
      this.http.post('/api/home/delzan',{zanNum:this.obj[i].zan,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
        //console.log(data);
      });
      this.Flag[i]=false;
    }
    // if(isclick!="true"){
    //   this.heart.style.cssText="font-size:15px;";
    //   zanNum=zanNum-1;
    //   zan[i].innerHTML=String(zanNum);
    //   isclick="true";
    //   this.heart.setAttribute('isclick',isclick);
    //   this.http.post('/api/home/delzan',{zanNum:zanNum,userID:this.userID,projectID:this.obj[i].projectID}).subscribe(data=>{
    //     console.log(data);
    // })
    //}
  }

}
