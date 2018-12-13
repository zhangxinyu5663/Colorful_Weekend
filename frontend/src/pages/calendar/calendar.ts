import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  // event:string='briefcase';
  public typeTxt:any;
  close(){
    this.navCtrl.pop();
  }
  switchType() {
    console.log(this.typeTxt);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  

}
