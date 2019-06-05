import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { SetPage } from '../set/set';
import { CollectionPage } from '../collection/collection';
import { FansPage } from '../fans/fans';
import { GuanzhuPage } from '../guanzhu/guanzhu';
import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { ZanPage } from '../zan/zan';

// SecurityContext 
@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera) {
  }
  mine=[] ;
  ID;
  avatar: string = "";  //图像的src

  // ionViewDidLoad(){
  //   this.ID=localStorage.getItem('id');
  //   this.http.post('/api/mine',{id:this.ID}).subscribe(data=>{
  //     this.mine=Array.prototype.slice.call(data); //将类数组对象转换为数组
  //     console.log(this.mine)
  //     this.avatar=this.mine[0].head;
  //   });
  // }
  ionViewWillEnter(){
    this.ID=localStorage.getItem('id');
    this.http.post('/api/mine',{id:this.ID}).subscribe(data=>{
      this.mine=Array.prototype.slice.call(data); //将类数组对象转换为数组
      console.log(this.mine)
      this.avatar=this.mine[0].head;
    });
  }
  goCollection(){this.navCtrl.push(CollectionPage);}
  goGuanzhu(){this.navCtrl.push(GuanzhuPage);}
  goSet(){this.navCtrl.push(SetPage)}
  goZan(){this.navCtrl.push(ZanPage )}
  goFans(){this.navCtrl.push(FansPage);}

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
      that.img=document.getElementById('img');
      that.avatar='data:image/jpeg;base64,'+imageData;
      that.http.post('/api/userHeadUpload',{avatar:that.avatar,userID:that.ID}).subscribe(data=>{
        // if(data['status']==1){
        //   this.http.post('/api/mine',{id:this.ID}).subscribe(data=>{
        //     this.mine=Array.prototype.slice.call(data); //将类数组对象转换为数组
        //     this.avatar=this.mine[0].head;
        //   });
        // }
          });
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
   var that=this;
    this.imagePicker.getPictures(options).then(imageData => {
      that.img=document.getElementById('img');
      that.avatar='data:image/jpeg;base64,'+imageData;
      that.http.post('/api/userHeadUpload',{avatar:that.avatar,userID:that.ID}).subscribe(data=>{
    // if(data['status']==1){
    //   this.http.post('/api/mine',{id:this.ID}).subscribe(data=>{
    //     this.mine=Array.prototype.slice.call(data); //将类数组对象转换为数组
    //     this.avatar=this.mine[0].head;
    //   });
    // }
      });
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

  // this.http.post('/api/userHeadUpload',{avatar:this.avatar,userID:this.userID}).subscribe(data=>{
  //   // if(data['status']==1){
  //   //   this.http.post('/api/mine',{id:this.ID}).subscribe(data=>{
  //   //     this.mine=Array.prototype.slice.call(data); //将类数组对象转换为数组
  //   //     this.avatar=this.mine[0].head;
  //   //   });
  //   // }
  // });
}