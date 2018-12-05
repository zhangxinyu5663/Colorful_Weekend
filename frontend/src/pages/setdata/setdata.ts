import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SetPage } from '../set/set';
@IonicPage()
@Component({
  selector: 'page-setdata',
  templateUrl: 'setdata.html',
})
export class SetdataPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController) {

  }
  goBack(){this.navCtrl.push(SetPage);}
  goTips(){
    let alert = this.alertCtrl.create({
      subTitle: '修改成功!',
      buttons: ['确认']
    });
    alert.present();
  }
  // 该死的第二种方法的ts文件
  //list=[{"key":"male","value":'男',"chek":true},{"key":"female","value":'女',"chek":false}];
  // data={"key":"female","value":'女',"chek":false};
  // public  chekFun(i){
  //   let me=this;
  //   this.list.forEach(function(data,inde,array) {
  //     if(i==inde){
  //       data.chek=true;
  //       me.data=data;
  //     }else{
  //       data.chek=false
  //     }
  //   });
  // }
}
