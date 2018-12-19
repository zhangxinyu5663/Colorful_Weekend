import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
// import { SetPage } from '../set/set';
import {  PhonenumPage } from '../phonenum/phonenum';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-changephone',
  templateUrl: 'changephone.html',
})
export class ChangephonePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public http:HttpClient) {
  }
  // goBack(){this.navCtrl.push(SetPage);}
  goPhonenum(){
    this.navCtrl.pop();
  }

  code; //双向数据绑定
  phoneinp; //手机号的输入框
  codeinp; //验证码的输入框
  codeshow; //显示验证码的div
  userID;

  gainCode(){  //获取验证码函数
    var val=document.getElementById('gaincode'); //获取按钮
    var countdown=30;
    val.setAttribute("disabled", "true"); //不能点击
    val.innerHTML=countdown + "s后<br>重新发送";
    countdown--;
    var timer=setInterval(function(){ //倒计时
      if (countdown == 0) {
        val.innerHTML="获取验证码";
        countdown = 30;
        clearInterval(timer);
        val.removeAttribute("disabled");  //可点击
      } else {
        val.setAttribute("disabled", "true"); //不能点击
        val.innerHTML=countdown + "s后<br>重新发送";
        countdown--;
      }
    },1000);

    var seed = new Array(
      'abcdefghijklmnopqrstuvwxyz',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      '0123456789'
    ); //创建需要的数据数组
    var idx;
    var result = ''; //返回的结果变量
    for (var i=0; i<6; i++){
      idx = Math.floor(Math.random()*3); //获得随机数据的整数部分-获取一个随机整数
      result += seed[idx].substr(Math.floor(Math.random()*(seed[idx].length)), 1);//根据随机数获取数据中一个值
    }
    var div=document.getElementById('codeShow');
    var num=Math.floor(Math.random()*20+1);
    div.style.backgroundImage='url(../assets/imgs/codebackimg/back'+num+'.png)';//设置验证码的背景图片
    div.style.display='block';
    div.innerHTML=result;
  }

  goTips(){
    this.codeinp=document.getElementById('codeinp');
    this.codeshow=document.getElementById('codeShow');
    if(this.codeinp.value!=this.codeshow.innerHTML.toLocaleLowerCase()) {
      const alert1 = this.alertCtrl.create({
        title: '验证失败',
        subTitle: '请输入正确的验证码信息',
        buttons: ['OK']
      });
      alert1.present();
      var div=document.getElementById('codeShow');
      div.style.display="none";
      this.codeinp.value='';
    // let alert = this.alertCtrl.create({
    //   subTitle: '更换成功!',
    //   buttons: ['确定']
    // });
    // alert.present();
    // this.navCtrl.push(PhonenumPage);
    }else{
      this.userID=localStorage.getItem('id');
      this.http.post('/api/changePhone',{phone:this.phoneinp,id:this.userID}).subscribe(data=>{
        const alert2 = this.alertCtrl.create({
          title: '更换成功',
          subTitle: '更换手机号成功',
          buttons: ['OK']
        });
        alert2.present();
      });
    }
  }
}
