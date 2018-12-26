import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";

/**
 * Generated class for the EditmypublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editmypublish',
  templateUrl: 'editmypublish.html',
})
export class EditmypublishPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera) {
  }
  pID; //用户作品ID
  mypublish=[];
  text; //双向数据绑定  文字
  avatar; //双向数据绑定 图片的src
  img; //图片id
  ionViewDidLoad() {
    this.pID=localStorage.getItem('userPublishID');
    this.img=document.getElementById('img');
    this.img.style.display="block";
    this.http.post('/api/specificUserPublish',{pID:this.pID}).subscribe(data=>{
    this.mypublish=Array.prototype.slice.call(data);
    this.text=this.mypublish[0].text;
    this.avatar=this.mypublish[0].pictureORvideo;
   });
  }

  // avatar: string = "";  //图像的src
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
  // img; //存放照片
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
      that.img.style.display="block";
      this.avatar='data:image/jpeg;base64,'+imageData;
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

  //返回
  back(){
    this.navCtrl.pop();
  }

  userID;
  backArr;
  //保存
  save(){
    this.userID=localStorage.getItem('id');
    this.pID=localStorage.getItem('userPublishID');
    console.log(this.userID);
    this.http.post('/api/edit/userPublish',{userID:this.userID,avatar:this.avatar,text:this.text,pID:this.pID}).subscribe(data=>{
      this.backArr=data;
      if(this.backArr.status==1){
        this.navCtrl.pop();
      }
    });
  //   this.navCtrl.pop();
  // }
  }


}
