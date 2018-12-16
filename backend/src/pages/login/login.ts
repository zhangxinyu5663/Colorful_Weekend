import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user;
  pwd;
  arr;
  constructor(private http:HttpClient,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  btn(){
    console.log(this.user);
    localStorage.setItem('userName',this.user);
    this.http.post('/api/login',{user:this.user,pwd:this.pwd}).subscribe(data=>{
        this.arr=data;
        console.log(this.arr);
        if(this.arr.status==1){ //密码验证成功
            this.navCtrl.push(HomePage);
        }else if(this.arr.status==0){
          const alert = this.alertCtrl.create({
            title: '登录失败',
            subTitle: '您不是管理员',
            buttons: ['返回']
          });
          alert.present();
        }else{
          const alert2 = this.alertCtrl.create({
            title: '登录失败',
            subTitle: '请输入正确的密码信息',
            buttons: ['返回']
          });
          alert2.present();          
        }
      });
  }
}
