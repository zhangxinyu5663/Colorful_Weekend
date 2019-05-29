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
  ionViewWillEnter(){
    this.ID=localStorage.getItem('id');
    this.http.post('/api/mine',{id:this.ID}).subscribe(data=>{
      this.mine=Array.prototype.slice.call(data); //将类数组对象转换为数组
      this.avatar=this.mine[0].head;
    });
  }
  goCollection(){this.navCtrl.push(CollectionPage);}
  goGuanzhu(){this.navCtrl.push(GuanzhuPage);}
  goSet(){this.navCtrl.push(SetPage)}
  goZan(){this.navCtrl.push(ZanPage )}
  goFans(){this.navCtrl.push(FansPage);}

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
  userID;
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
      that.img=document.getElementById('img');
      that.userID=localStorage.getItem('id');
      // that.img.style.display="block";
      this.avatar='data:image/jpeg;base64,'+imageData;
      this.http.post('/api/userHeadUpload',{avatar:this.avatar,userID:this.userID}).subscribe(data=>{
        if(data['status']==1){
          console.log('头像更换成功');
        }
      });
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      //maximumImagesCount: 1,
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
        // this.img.style.display="block";
        this.avatar='data:image/jpeg;base64,'+imageData;
        this.http.post('/api/userHeadUpload',{avatar:this.avatar,userID:this.userID}).subscribe(data=>{
          if(data['status']==1){
            console.log('头像更换成功');
          }
        });
      // }
    }, error => {
      console.log('Error: ' + error);
    });
  }

}