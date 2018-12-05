import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZanPage } from './zan';

@NgModule({
  declarations: [
    ZanPage,
  ],
  imports: [
    IonicPageModule.forChild(ZanPage),
  ],
})
export class ZanPageModule {}
