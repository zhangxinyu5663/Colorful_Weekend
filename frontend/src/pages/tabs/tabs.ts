import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ModalController, NavController } from 'ionic-angular';
import { AddPage } from '../add/add';
import { MyPage } from '../my/my';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;//消息
  tab3Root = ContactPage;//日程
  tab4Root = MyPage;//我的
  tab5Root = AddPage;
  constructor(public modalCtrl:ModalController,public navCtrl: NavController) {

  }
  // ionViewDidLoad(){
  //   document.querySelector('#tab-t0-2').addEventListener('click',()=>{
  //     let profileModal=this.modalCtrl.create(AddPage);
  //     profileModal.present();
      
  //   },false)
  // }
}
  