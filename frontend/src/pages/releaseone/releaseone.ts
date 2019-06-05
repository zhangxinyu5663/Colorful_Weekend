import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AddPage } from '../add/add';
import { ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ReleaseonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-releaseone',
  templateUrl: 'releaseone.html',
})

export class ReleaseonePage {

  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera) {
  }
  back(){
    this.navCtrl.pop();
  }
  avatar: string = "";  //图像的src
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });

    actionSheet.present().then(value => {
      return value;
    });
  }
  img; //存放照片
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    var that=this;
    this.camera.getPicture(options).then(imageData => {
      console.log('Image URI: ' + imageData);
      // this.avatar = image.slice(7);
      this.img=document.getElementById('img');
      this.img.style.display="block";
      this.avatar='data:image/jpeg;base64,'+imageData;
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      //maximumImagesCount: 1,s
      quality: 100,
      width: 200,
      height: 200,
      outputType:1
    };
   // var that=this;
    this.imagePicker.getPictures(options).then(imageData => {
      // if (imageData.length > 1) {
      //   this.presentAlert();
      // } else if (imageData.length === 1) {

        // console.log('Image URI: ' + imageData[0]);
        //this.avatar = images[0].slice(7);
        this.img=document.getElementById('img');
        this.img.style.display="block";
         this.avatar='data:image/jpeg;base64,'+imageData;
      // }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({title: "上传失败", message: "只能选择一张图片作为头像哦", buttons: ["确定"]});
    alert.present().then(value => {
      return value;
    });
  }

  text;
  userID; //用户ID
  time; //当前时间
  backArr;
  release(){  //发表
    this.time=this.getDate();
    console.log(this.time);
    this.userID=localStorage.getItem('id');
    console.log(this.avatar);
    if(this.avatar===''){
      this.http.post('/api/userPublishTxt',{avatar:this.avatar,text:this.text,userID:this.userID,time:this.time}).subscribe(data=>{
        this.backArr=data;
        if(this.backArr.status==1){
          this.navCtrl.pop();
        }
      });
    }else{
      this.http.post('/api/userPublishUpload',{avatar:this.avatar,text:this.text,userID:this.userID,time:this.time}).subscribe(data=>{
        this.backArr=data;
        if(this.backArr.status==1){
          this.navCtrl.pop();
        }
      });
    }
  }

  month;
  strdate;
  hour;
  minutes;
  getDate(){   //获取当前时间函数
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    this.month = date.getMonth() + 1;
    this.strdate = date.getDate();
    this.hour= date.getHours();
    this.minutes=date.getMinutes();
    if (this.month >= 1 && this.month <= 9) {
        this.month = "0" + this.month;
    }
    if (this.strdate >= 0 && this.strdate <= 9) {
        this.strdate = "0" + this.strdate;
    }
    if (this.hour >= 0 && this.hour <= 9) {
      this.hour = "0" + this.hour;
    }
    if (this.minutes >= 0 && this.minutes <= 9) {
      this.minutes = "0" + this.minutes;
    }
    var currentdate = date.getFullYear() + seperator1 + this.month + seperator1 + this.strdate
            + " " + this.hour+ seperator2 + this.minutes;
            // + seperator2 + date.getSeconds();
    return currentdate;
  }
}

