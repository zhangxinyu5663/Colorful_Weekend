import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PicturePage } from '../picture/picture';
import { AddPage } from '../add/add';
import { ActionSheetController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera) {
  }
  back(){
    this.navCtrl.pop();
  }
  addpicture(){
    this.navCtrl.push(PicturePage);
  }
  

  //显示菜单
//   showMenu(){
//     let actionSheet = this.actionSheetCtrl.create(
//         { 
//           buttons: [ 
//               { text: '从手机相册选择', 
//                 handler: () => {
//                   this.navCtrl.push(PicturePage);
//                    console.log('select clicked'); 
//                    this. showInfo("点击了选择相册");
//                 }
//               }, 
//               { text: '拍照', 
//                 handler: () => { 
//                     console.log('take-picture clicked'); 
//                     this. showInfo("点击了拍照");
//                 } 
//               },
//                { text: '取消', 
//                  //删除数据
//                  role: 'cancel', 
//                  handler: () => { 
//                      console.log('Cancel clicked'); 
//                     } 
//                }] 
//         }); 

//         //显示下拉菜单
//         actionSheet.present();
// }

// //显示toast消息
// showInfo(msg){
//     let toast = this.toastCtrl.create({
//         message: msg, //提示消息
//         duration: 3000,//3秒后自动消失
//         position: 'bottom',//位置top,bottom
//         showCloseButton:true, //是否显示关闭按钮
//         closeButtonText:"关闭" //关闭按钮字段
//     });

//     //关闭后执行的操作
//     toast.onDidDismiss(() => { console.log('toast被关闭之后执行'); });

//     //显示toast
//     toast.present();//符合触发条件后立即执行显示。
// }


// //进入界面资源还没有加载完成的情况
// ionViewDidLoad() {
//     console.log('ionViewDidLoad ReleaseonePage');

//     // document.getElementById();
//     var tabs = document.getElementsByClassName('tabbar').item(0);
//     tabs['style'].display = 'none';
//  }

//  //当已经进入界面的情况
//  ionViewDidEnter(){

//  }

//  //离开页面的时候，设置显示下面的tabbar
//  ionViewWillLeave(){
//     var tabs = document.getElementsByClassName('tabbar').item(0);
//     tabs['style'].display = 'flex';
//  }
  avatar: string = "";
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
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then(imageData => {
      console.log('Image URI: ' + imageData);
      // this.avatar = image.slice(7);
      this.avatar='data:image/jpeg;base64,'+imageData;
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 200,
      height: 200
    };
    this.imagePicker.getPictures(options).then(images => {
      if (images.length > 1) {
        this.presentAlert();
      } else if (images.length === 1) {
        console.log('Image URI: ' + images[0]);
        this.avatar = images[0].slice(7);
      }
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
}

