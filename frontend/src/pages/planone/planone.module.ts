import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanonePage } from './planone';

@NgModule({
  declarations: [
    PlanonePage,
  ],
  imports: [
    IonicPageModule.forChild(PlanonePage),
  ],
})
export class PlanonePageModule {}
