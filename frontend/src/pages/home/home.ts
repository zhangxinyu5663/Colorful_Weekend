import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Content02Page } from '../content02/content02';
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
import { Content03Page } from '../content03/content03';
import { Content04Page } from '../content04/content04';
import { Content05Page } from '../content05/content05';
import { Content06Page } from '../content06/content06';
import { Content12Page } from '../content12/content12';
import { Content11Page } from '../content11/content11';
import { Content10Page } from '../content10/content10';
import { Content09Page } from '../content09/content09';
import { Content08Page } from '../content08/content08';
import { Content07Page } from '../content07/content07';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  obj=[];//用于盛放后端传回的首页推荐作品的类数组对象
  imgs;//用于盛放从后端传回来的图片路径数组
  projectId;//标记是哪个作品
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
      this.items.push( this.items.length );
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
    this.http.get('/api/homeSchedule').subscribe(data=>{
      this.schedule=Array.prototype.slice.call(data);
    });
    this.http.get('/api/home').subscribe(data=>{
      this.obj=Array.prototype.slice.call(data);
      console.log(this.obj);
    })

    // document.querySelector('#content12').addEventListener('click',()=>{
    //   let profileModal=this.modalCtrl.create(Content12Page);
    //   profileModal.present();    
    // },false)
  }
  detail(i){
    localStorage.setItem('homedetailID',this.obj[i].projectID);
    // let profileModal=this.modalCtrl.create(Content01Page);
    // profileModal.present();  
    this.navCtrl.push(Content01Page);
  }
}
