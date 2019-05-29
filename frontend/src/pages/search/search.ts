import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SearchresultPage } from '../searchresult/searchresult';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  goBack(){
    this.navCtrl.pop();
  }

  fun(i){
    if(i==1){
      localStorage.setItem('searchText','美食');
    }else if(i==2){
      localStorage.setItem('searchText','电影');
    }else if(i==3){
      localStorage.setItem('searchText','游玩');
    }else{
      localStorage.setItem('searchText','拍照');
    }
    this.navCtrl.push(SearchresultPage);
  }

  searchText;
  search(){
    localStorage.setItem('searchText',this.searchText);
    this.navCtrl.push(SearchresultPage);
  }

}
