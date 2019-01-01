import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the CreateprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createproject',
  templateUrl: 'createproject.html',
})
export class CreateprojectPage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateprojectPage');
  }
//上传作品图片到服务器
  inputa;
  btn(){
    var imga=document.getElementById('imga');
    var buta=document.getElementById('buta');
    this.inputa=document.getElementById('inputa'); 
    // 2.获取上传的数据
    var getData=this.inputa.files[0];
    console.log(getData.name);
    // 2.1创建格式化数据，
    var fd=new FormData();
    // 2.2格式化数据并以键值对的形式存放到fd对象中
    fd.append('imageIcon',getData);
    // 3.1创建XMLHttpRequest对象
    var xhr=new XMLHttpRequest();
    // 3.2使用open方法,设置请求
    xhr.open('POST','/api/uploadproject',true)
    // 3.3使用send方法发送数据
    xhr.send(fd);
    // 3.4监听发送数据状态
    var that=this;
    xhr.onreadystatechange=function(){
      if(xhr.readyState===4){
        console.log(JSON.stringify(xhr.responseText));

        imga["src"]=xhr.responseText;
        //imga.src='http://192.168.73.144:8080/avatar/1544688041115.jpg';
        //console.log(imga.src);
      }
    }

  }
  //创建系统作品
  projectID;//作品id
  keyword;//关键字
  context;//详情描述
  img;//作品图片
  place;//作品地点
  create(){
    this.projectID=document.getElementById('projectID');
    console.log(this.projectID.value);
    this.place=document.getElementById('place');
    this.keyword=document.getElementById('keyword');console.log(this.keyword.value);
    this.context=document.getElementById('context');console.log(this.context.value);
    this.img=document.getElementById('imga');console.log(this.img.src);
    this.http.post('/api/officialProject/create',{projectID:parseInt(this.projectID.value),imgs:this.img.src,context:this.context.value,keyword:this.keyword.value,place:this.place.value}).subscribe(data=>{
      console.log(data);
    })
  }
}
