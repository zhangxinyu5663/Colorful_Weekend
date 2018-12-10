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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items=[];
  isActive=0;
  isClick(i){
    this.isActive=i;
  }

  goPlan1(){this.navCtrl.push(PlanonePage);}
  goPlan2(){this.navCtrl.push(PlantwoPage);}
  goPlan3(){this.navCtrl.push(PlanthreePage);}
  goPlan4(){this.navCtrl.push(PlanfourPage);}
  goPlan5(){this.navCtrl.push(PlanfivePage);}   
  goPlan6(){this.navCtrl.push(PlansixPage);}
  goPlan7(){this.navCtrl.push(PlansevenPage);}
  goPlan8(){this.navCtrl.push(PlaneightPage);}


  constructor(public modalCtrl:ModalController,public navCtrl: NavController,public http:HttpClient) {
    for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
  }
  schedule=[];
  ionViewDidLoad(){
    this.http.get('/api/homeSchedule').subscribe(data=>{
      this.schedule=Array.prototype.slice.call(data);
      // for(var i=0;i<this.schedule.length;i++){
      //   console.log(this.schedule[i].imgDetail);
      // }
    });
    document.querySelector('#content02').addEventListener('click',()=>{
      let profileModal=this.modalCtrl.create(Content02Page);
      profileModal.present();    
    },false)
  }
  // ionViewDidLoad(){
  //   document.querySelector('#content02').addEventListener('click',()=>{
  //     let profileModal=this.modalCtrl.create(Content02Page);
  //     profileModal.present();
      
  //   },false)
  // }
}
