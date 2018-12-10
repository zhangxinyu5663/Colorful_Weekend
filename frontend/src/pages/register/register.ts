import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Register2Page } from '../register2/register2';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public http:HttpClient) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad RegisterPage');
  }

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

  phone; //双向数据绑定
  pwd;  //双向数据绑定
  againpwd; //双向数据绑定
  code; //双向数据绑定
  phoneinp; //手机号的输入框
  codeinp; //验证码的输入框
  pwdinp; //密码的输入框
  againpwdinp; //确认密码的输入框
  codeshow; //显示验证码的div
  judge;  //从后端返回的关于注册验证的信息
  arr; //从后端返回的关于注册是否成功的信息

  // reminderPhone(){ //手机号输入错误提醒
  //   this.phoneinp=document.getElementById('phoneinp');
  //   if( this.phoneinp.value.length!=11){
  //     var reminder=document.getElementById('reminder');
  //     reminder.innerHTML='!&nbsp;请输入正确的手机号';
  //   }
  // }

  resetPhone(){ //重置手机号输入框
    var reminder=document.getElementById('reminder');
    reminder.innerHTML='';
    this.phoneinp=document.getElementById('phoneinp');
    this.phoneinp.value='';
  }

  reminderPwd(){ //密码输入错误提醒
    var remindertwo=document.getElementById('remindertwo');
    this.pwdinp=document.getElementById('pwdinp');
    if(this.pwdinp.value.length<6 ||this.pwdinp.value.length>16){
      remindertwo.innerHTML='!&nbsp;请输入6-16位密码';
    }
  }
  resetPwd(){ //重置密码输入框
    var remindertwo=document.getElementById('remindertwo');
    remindertwo.innerHTML='';
    this.pwdinp=document.getElementById('pwdinp');
    this.pwdinp.value='';
  }

  verifyPwd(){  //判断两次密码是否输入一致
    if(this.pwd!=this.againpwd){
      var reminderthree=document.getElementById('reminderthree');
      reminderthree.innerHTML='!&nbsp;两次密码不一致';
    }
  }

  resetagainPwd(){  //重置确认密码输入框
    this.againpwdinp=document.getElementById('againpwdinp');
    this.againpwdinp.value='';
    var reminderthree=document.getElementById('reminderthree');
    reminderthree.innerHTML='';
  }

  register(){ //注册验证
    
    this.codeinp=document.getElementById('codeinp');
    this.codeshow=document.getElementById('codeShow');
    this.phoneinp=document.getElementById('phoneinp');
    this.pwdinp=document.getElementById('pwdinp');
    this.againpwdinp=document.getElementById('againpwdinp');

    // if(this.phoneinp.innerHTML=='' || this.pwdinp.innerHTML=='' || this.againpwdinp.innerHTML=='' || this.codeinp.innerHTML==''){
    //   const alert3 = this.alertCtrl.create({
    //     title: '注册失败',
    //     subTitle: '请输入完整的信息',
    //     buttons: ['OK']
    //   });
    //   alert3.present();
    // }
    if(this.pwd!=this.againpwd){
      const alert3 = this.alertCtrl.create({
        title: '注册失败',
        subTitle: '两次密码不一致',
        buttons: ['OK']
      });  
      alert3.present();    

    }else if(this.codeinp.value!=this.codeshow.innerHTML.toLocaleLowerCase()) {
      const alert2 = this.alertCtrl.create({
        title: '注册失败',
        subTitle: '请输入正确的验证码信息',
        buttons: ['OK']
      });
      alert2.present();
      var div=document.getElementById('codeShow');
      div.style.display="none";
      this.codeinp.value='';
    }else{
      this.http.post('/api/phoneVerify',{phone:this.phone}).subscribe(data=>{
        this.judge=data;
        if(this.judge.status==0){
          const alert1 = this.alertCtrl.create({
            title: '注册失败',
            subTitle: '该手机号已被注册',
            buttons: ['OK']
          });
          alert1.present();
          var div=document.getElementById('codeShow');
          div.style.display="none";
          this.codeinp.value='';
        }else{
            this.http.post('/api/register',{phone:this.phone,pwd:this.againpwd}).subscribe(data=>{
              this.arr=data;
                if(this.arr.status==1){
                  console.log('注册成功');
                  this.navCtrl.push(Register2Page);
                }
            });
            //this.navCtrl.push(Register2Page);
        }
      });
    }
  }
  back(){
    this.navCtrl.push(LoginPage); //返回到登录页
  }
}

