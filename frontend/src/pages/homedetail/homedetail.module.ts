import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDetailPage } from './homedetail';

@NgModule({
  declarations: [
    HomeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDetailPage),
  ],
})
export class HomedetailPageModule {}
