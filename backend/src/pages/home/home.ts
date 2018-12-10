import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { UserdetailPage } from '../userdetail/userdetail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private http:HttpClient,public modalCtrl: ModalController) {

  }
  num=1;
  user=[];
  userDetail=[];
  fun(i){
    this.num=i;
    if(i==1){
      this.endOne(i);
    }else if(i==2){
      this.endTwo(i);
    }
  }
  endOne(i){
    console.log(i);
    this.http.get('/api/info').subscribe(data=>{
      console.log(data);
      this.user=Array.prototype.slice.call(data); 
    });
  }
  endTwo(i){

  }

  userID;
  back;
  freeze(i){  //冻结账号
    // console.log(i);
    // console.log(this.user[i].ID);
    this.userID=this.user[i].ID;
    var btn=document.getElementsByClassName('freeze')[i];
    btn.innerHTML='已冻结';
    this.http.post('/api/freezeUser',{id:this.userID}).subscribe(data=>{
      this.back=data;
      console.log(this.back.info);
    });
  }
  unfreeze(j){  //解冻账号
    this.userID=this.user[j].ID;
    console.log(this.userID);
    var btn=document.getElementsByClassName('unfreeze')[j];
    btn.innerHTML='已解冻';
    this.http.post('/api/unfreezeUser',{id:this.userID}).subscribe(data=>{
      this.back=data;
      console.log(this.back.info);
    });
  } 

  ucheck(k){ //查看用户详情
    this.userID=this.user[k].ID;
    console.log(this.userID);
    localStorage.setItem("userdetailID",this.userID);
    // localStorage.removeItem("detailID");
    let profileModal = this.modalCtrl.create(UserdetailPage);
    profileModal.present();
  }
}
