import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  isName:string="bus";
  constructor(public modalCtrl:ModalController,public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    document.querySelector('#addcalendar').addEventListener('click',()=>{
      let profileModal=this.modalCtrl.create(CalendarPage);
      profileModal.present();
      
    },false)
  }
}
